import { createAdminClient } from '@/lib/supabase/admin';
import { cleanEditorialText, isBoilerplateParagraph, normalizeArticleString } from './article-normalizer';

/**
 * Fetches and semantically extracts full article body content from a publisher source URL.
 * Strictly ignores site navigation, headers, currency tickers, ads, Google buttons, social widgets,
 * and comment sections.
 */
export async function fetchFullArticleHtmlFromUrl(url: string): Promise<string | null> {
  if (!url || !url.startsWith('http')) return null;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const htmlText = await res.text();

    // 1. Remove scripts, styles, ads, SVGs, and header/footer structures before container matching
    const strippedHtml = htmlText
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
      .replace(/<div[^>]*class=["'][^"']*(?:exchange|curs|header-rates|share|social|sgb-google-button|comments|comment-respond|ad|banner|widget)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<ins\b[^<]*(?:(?!<\/ins>)<[^<]*)*<\/ins>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    // 2. Target specific editorial body container (Economedia, HotNews, G4Media, Profit.ro)
    const entryMatch =
      strippedHtml.match(/<div[^>]*class=["'][^"']*(?:single__text|entry-content|article-body|article__content|single-content|post-content|article-text|main-article-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
      strippedHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

    const bodyHtml = entryMatch && entryMatch[1] ? entryMatch[1] : strippedHtml;

    // 3. Extract clean paragraphs, subheadings, and blockquotes
    const blockMatches = Array.from(bodyHtml.matchAll(/<(p|h2|h3|h4|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi));
    const cleanParagraphs: string[] = [];

    for (const match of blockMatches) {
      const tag = match[1]!.toLowerCase();
      const rawText = match[2] || '';
      const text = cleanEditorialText(rawText);

      if (text.length > 20 && !isBoilerplateParagraph(text)) {
        if (tag.startsWith('h')) {
          cleanParagraphs.push(`### ${text}`);
        } else if (tag === 'blockquote') {
          cleanParagraphs.push(`> ${text}`);
        } else {
          cleanParagraphs.push(text);
        }
      }
    }

    if (cleanParagraphs.length >= 1) {
      return cleanParagraphs.join('\n\n');
    }

    return null;
  } catch (err) {
    console.error(`[FullArticleEnhancer] Failed to fetch full text from ${url}:`, err);
    return null;
  }
}

/**
 * Ensures full editorial content for an article, sanitizing and normalizing the result.
 */
export async function ensureFullArticleContent(article: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}): Promise<string> {
  const currentCleaned = normalizeArticleString(article.content);

  const needsExpansion =
    currentCleaned.includes('[…]') ||
    currentCleaned.includes('[...]') ||
    currentCleaned.includes('&#8230;') ||
    currentCleaned.length < 400;

  if (!needsExpansion && currentCleaned.length >= 400) {
    return currentCleaned;
  }

  // Try to construct source URL from slug or search
  const tryUrl = `https://economedia.ro/${article.slug}.html`;
  const fullContent = await fetchFullArticleHtmlFromUrl(tryUrl);

  if (fullContent && fullContent.length > currentCleaned.length) {
    const normalizedFull = normalizeArticleString(fullContent);

    // Update Supabase DB in background with clean normalized content
    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.from('articles').update({ content: normalizedFull }).eq('id', article.id);
    } catch (dbErr) {
      console.error('[FullArticleEnhancer] Error updating Supabase DB:', dbErr);
    }

    return normalizedFull;
  }

  return currentCleaned;
}
