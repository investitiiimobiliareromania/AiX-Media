import { createAdminClient } from '@/lib/supabase/admin';

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

    // Remove scripts, styles, ads, and navigation noise
    const cleanHtml = htmlText
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<ins\b[^<]*(?:(?!<\/ins>)<[^<]*)*<\/ins>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    // Target article body content container
    let bodyHtml = '';

    // Match Economedia / HotNews / G4Media / Profit.ro article containers
    const entryMatch =
      cleanHtml.match(/<div[^>]*class=["'][^"']*(?:entry-content|article-body|single-content|post-content|article-text)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
      cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

    if (entryMatch && entryMatch[1]) {
      bodyHtml = entryMatch[1];
    } else {
      bodyHtml = cleanHtml;
    }

    // Extract all <p>, <h3>, <h4>, <ul>, <blockquote> paragraphs
    const paragraphs: string[] = [];
    const pRegex = /<(p|h2|h3|h4|ul|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match;

    while ((match = pRegex.exec(bodyHtml)) !== null) {
      const tag = match[1]!.toLowerCase();
      let innerText = match[2] || '';

      // Strip inner tags except strong, em, b, i, a
      innerText = innerText
        .replace(/<(?!\/?(strong|b|em|i|a|img)\b)[^>]+>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Filter out boilerplate signatures / share links / short noise
      if (
        innerText.length > 20 &&
        !innerText.toLowerCase().includes('abonează-te') &&
        !innerText.toLowerCase().includes('citește și') &&
        !innerText.toLowerCase().includes('foto:') &&
        !innerText.includes('&#8230;') &&
        !innerText.endsWith('[…]')
      ) {
        if (tag.startsWith('h')) {
          paragraphs.push(`<h3 className="text-xl font-bold text-white mt-6 mb-3 font-serif">${innerText}</h3>`);
        } else if (tag === 'blockquote') {
          paragraphs.push(
            `<blockquote className="p-4 rounded-xl bg-neutral-900 border-l-4 border-amber-500 italic text-neutral-300 font-serif my-4">${innerText}</blockquote>`
          );
        } else {
          paragraphs.push(`<p className="leading-[1.85] font-serif text-neutral-200 text-base sm:text-lg mb-5">${innerText}</p>`);
        }
      }
    }

    if (paragraphs.length >= 2) {
      return paragraphs.join('\n');
    }

    return null;
  } catch (err) {
    console.error(`[FullArticleEnhancer] Failed to fetch full text from ${url}:`, err);
    return null;
  }
}

export async function ensureFullArticleContent(article: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}): Promise<string> {
  const needsExpansion =
    article.content.includes('[…]') ||
    article.content.includes('[...]') ||
    article.content.includes('&#8230;') ||
    article.content.length < 500;

  if (!needsExpansion) {
    return article.content;
  }

  // Try to construct source URL from slug or search
  const tryUrl = `https://economedia.ro/${article.slug}.html`;
  const fullContent = await fetchFullArticleHtmlFromUrl(tryUrl);

  if (fullContent && fullContent.length > article.content.length) {
    // Update Supabase DB in background
    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.from('articles').update({ content: fullContent }).eq('id', article.id);
    } catch (dbErr) {
      console.error('[FullArticleEnhancer] Error updating Supabase DB:', dbErr);
    }

    return fullContent;
  }

  // Clean trailing [...] from current content
  const cleanedContent = article.content
    .replace(/\[\s*…\s*\]/g, '')
    .replace(/\[\s*\.\.\.\s*\]/g, '')
    .replace(/&#8230;/g, '')
    .trim();

  return cleanedContent;
}
