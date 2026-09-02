/**
 * AIX MEDIA — CENTRALIZED ARTICLE CONTENT NORMALIZATION & PARSING PIPELINE
 * 
 * Provides deterministic sanitization and AST block parsing for all news articles:
 * - Purges JSX/React attributes (className, target, rel, data-*, style)
 * - Purges scraper boilerplate (Lasă un răspuns, Cele mai noi articole, exchange rate bars, ads)
 * - Purges transport artifacts (svg, <svg>, [image], ![image], vscode-file://)
 * - Normalizes mixed Markdown/HTML links (<a href="[url](url)"> -> clean href)
 * - Preserves legitimate editorial content, typography, Romanian diacritics, numbers, currency
 */

export interface EditorialBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'list';
  level?: 2 | 3;
  text: string;
  items?: string[];
}

export interface InlineSegment {
  type: 'text' | 'bold' | 'italic' | 'link';
  text: string;
  href?: string;
}

import { decodeHtmlEntities } from './html-entities';

/**
 * Filter list for known publisher boilerplate phrases that should never appear in article bodies.
 */
const BOILERPLATE_PATTERNS = [
  /^lasă un răspuns/i,
  /^anulează răspunsul/i,
  /^cele mai noi articole/i,
  /^comentarii/i,
  /^urmărește-ne în discover/i,
  /^urmărește-ne pe google news/i,
  /^- articolul continuă mai jos -/i,
  /^abonează-te la newsletter/i,
  /^citește și:/i,
  /^citiți și:/i,
  /^citește continuarea pe/i,
  /^citiți mai mult pe/i,
  /^foto:\s*[a-zA-Z0-9\s,\.\-]+$/i,
  /^sursa:\s*[a-zA-Z0-9\s,\.\-]+$/i,
  /^politica de confidențialitate/i,
  /^termeni și condiții/i,
  /^acord de utilizare/i,
  /^descarcă aplicația/i,
  // Currency ticker headers scraped accidentally
  /^(?:<b>)?\s*EUR:\s*(?:<\/b>)?\s*(?:<i>)?\s*[\d\.,]+\s*(?:<\/i>)?\s*(?:<b>)?\s*USD:/i,
  /^(?:<b>)?\s*ROBOR\s*3M:/i,
  /^curs valutar\s*bnr\s*•/i,
];

/**
 * Checks if a paragraph is boilerplate scraper noise.
 */
export function isBoilerplateParagraph(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return true;

  // Single word artifacts like "svg", "[image]", "undefined", "null"
  if (/^(svg|image|undefined|null|none|reclamă|publicitate)$/i.test(trimmed)) return true;

  for (const pattern of BOILERPLATE_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }

  return false;
}

/**
 * Cleans a single string from implementation markup, transport syntax, and scraper debris.
 */
export function cleanEditorialText(input?: string | null): string {
  if (!input || typeof input !== 'string') return '';

  const cleaned = decodeHtmlEntities(input)
    // 1. Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // 2. Remove script and style tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // 3. Fix markdown URLs embedded inside HTML href/src attributes: href="[url](url)" -> href="url"
    .replace(/(href|src)=["']\[([^\]]+)\]\(([^)]+)\)["']/gi, '$1="$3"')
    // 4. Remove SVG tags and standalone "svg" words resulting from icon stripping
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/\b(svg)\b(?!\s*[\w\d])/gi, '')
    // 5. Remove vscode-file URLs
    .replace(/vscode-file:\/\/[^\s"'><]+/gi, '')
    // 6. Remove [image] and ![image] placeholders
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\[\s*image\s*\]/gi, '')
    // 7. Remove JSX className / class / style / target / rel attributes from tags
    .replace(/<\s*([a-zA-Z0-9]+)[^>]*>/g, (fullMatch, tagName) => {
      const lower = tagName.toLowerCase();
      // Keep only allowed semantic tags
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'strong', 'i', 'em', 'blockquote', 'ul', 'ol', 'li', 'br', 'hr'].includes(lower)) {
        return `<${lower}>`;
      }
      if (lower === 'a') {
        const hrefMatch = fullMatch.match(/href=["']([^"']+)["']/i);
        if (hrefMatch && hrefMatch[1]) {
          let href = hrefMatch[1].trim();
          const mdUrlMatch = href.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (mdUrlMatch && mdUrlMatch[2]) {
            href = mdUrlMatch[2].trim();
          }
          if (/^(https?:\/\/|\/|mailto:)/i.test(href)) {
            return `<a href="${href}">`;
          }
        }
        return '<a>';
      }
      return '';
    })
    .replace(/<\/\s*([a-zA-Z0-9]+)\s*>/g, (fullMatch, tagName) => {
      const lower = tagName.toLowerCase();
      if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'strong', 'i', 'em', 'blockquote', 'ul', 'ol', 'li', 'a'].includes(lower)) {
        return `</${lower}>`;
      }
      return '';
    })
    // 8. Clean leftover brackets & symbols
    .replace(/\[\s*…\s*\]/g, '')
    .replace(/\[\s*\.\.\.\s*\]/g, '')
    // 9. Clean redundant whitespace
    .replace(/[ \t]+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Parses inline string into structured segments (bold, italic, link, plain text)
 * without using raw innerHTML.
 */
export function parseInlineSegments(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  if (!text) return segments;

  // Normalize HTML tags inside inline string to clean markdown or tokens
  const working = text
    // Replace <strong> and <b> with **token**
    .replace(/<\/?(strong|b)>/gi, '**')
    // Replace <em> and <i> with *token*
    .replace(/<\/?(em|i)>/gi, '*')
    // Replace <a href="url">text</a> with [text](url)
    .replace(/<a\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<\/?a[^>]*>/gi, '');

  // Regex tokenizing links [text](url), bold **text**, italic *text*
  const tokenRegex = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(working)) !== null) {
    // Push plain text before token
    if (match.index > lastIndex) {
      const plain = working.slice(lastIndex, match.index);
      if (plain) {
        segments.push({ type: 'text', text: plain });
      }
    }

    if (match[1] && match[2]) {
      // Link [text](url)
      segments.push({
        type: 'link',
        text: match[1],
        href: match[2],
      });
    } else if (match[3]) {
      // Bold **text**
      segments.push({
        type: 'bold',
        text: match[3],
      });
    } else if (match[4]) {
      // Italic *text*
      segments.push({
        type: 'italic',
        text: match[4],
      });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  // Push remaining plain text
  if (lastIndex < working.length) {
    const trailing = working.slice(lastIndex);
    if (trailing) {
      segments.push({ type: 'text', text: trailing });
    }
  }

  return segments.length > 0 ? segments : [{ type: 'text', text }];
}

/**
 * Parses article content into clean, semantic EditorialBlocks.
 */
export function parseArticleContentToBlocks(content?: string | null): EditorialBlock[] {
  if (!content || typeof content !== 'string') return [];

  const rawCleaned = cleanEditorialText(content);
  const blocks: EditorialBlock[] = [];

  // Check if content contains block HTML tags (<p>, <h3>, <blockquote>, <ul>)
  if (/<(p|h2|h3|h4|blockquote|ul|ol)\b/i.test(rawCleaned)) {
    const blockRegex = /<(p|h2|h3|h4|blockquote|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match: RegExpExecArray | null;
    let foundHtmlBlocks = false;

    while ((match = blockRegex.exec(rawCleaned)) !== null) {
      foundHtmlBlocks = true;
      const tag = match[1]!.toLowerCase();
      const rawInner = match[2] || '';

      if (tag === 'ul' || tag === 'ol') {
        const itemMatches = Array.from(rawInner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi));
        const items = itemMatches
          .map((im) => cleanEditorialText(im[1]))
          .filter((t) => t.length > 0 && !isBoilerplateParagraph(t));

        if (items.length > 0) {
          blocks.push({
            type: 'list',
            text: '',
            items,
          });
        }
      } else if (tag === 'blockquote') {
        const quoteText = cleanEditorialText(rawInner);
        if (quoteText.length > 0 && !isBoilerplateParagraph(quoteText)) {
          blocks.push({
            type: 'blockquote',
            text: quoteText,
          });
        }
      } else if (tag.startsWith('h')) {
        const headingText = cleanEditorialText(rawInner).replace(/<[^>]+>/g, '');
        if (headingText.length > 0 && !isBoilerplateParagraph(headingText)) {
          blocks.push({
            type: 'heading',
            level: tag === 'h2' ? 2 : 3,
            text: headingText,
          });
        }
      } else {
        const pText = cleanEditorialText(rawInner);
        if (pText.length > 0 && !isBoilerplateParagraph(pText)) {
          blocks.push({
            type: 'paragraph',
            text: pText,
          });
        }
      }
    }

    if (foundHtmlBlocks && blocks.length > 0) {
      return blocks;
    }
  }

  // Fallback: Split by double newlines and parse markdown / plain text
  const rawParagraphs = rawCleaned.split(/\n\n+/);

  for (const rawPara of rawParagraphs) {
    const trimmed = rawPara.trim();
    if (!trimmed || isBoilerplateParagraph(trimmed)) continue;

    // Check for Markdown heading
    const headingMatch = trimmed.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch && headingMatch[1]) {
      const hText = cleanEditorialText(headingMatch[1]);
      if (hText && !isBoilerplateParagraph(hText)) {
        blocks.push({
          type: 'heading',
          level: trimmed.startsWith('## ') ? 2 : 3,
          text: hText,
        });
      }
      continue;
    }

    // Check for Markdown blockquote
    if (trimmed.startsWith('>')) {
      const qText = cleanEditorialText(trimmed.replace(/^>[ \t]*/gm, ''));
      if (qText && !isBoilerplateParagraph(qText)) {
        blocks.push({
          type: 'blockquote',
          text: qText,
        });
      }
      continue;
    }

    // Check for bullet list
    if (/^[•\-\*]\s+/m.test(trimmed)) {
      const lines = trimmed.split('\n');
      const listItems: string[] = [];
      const nonListLines: string[] = [];

      for (const line of lines) {
        const cleanLine = line.trim();
        if (/^[•\-\*]\s+/.test(cleanLine)) {
          const itemText = cleanEditorialText(cleanLine.replace(/^[•\-\*]\s+/, ''));
          if (itemText && !isBoilerplateParagraph(itemText)) {
            listItems.push(itemText);
          }
        } else if (cleanLine) {
          nonListLines.push(cleanLine);
        }
      }

      if (nonListLines.length > 0) {
        const pText = cleanEditorialText(nonListLines.join(' '));
        if (pText && !isBoilerplateParagraph(pText)) {
          blocks.push({ type: 'paragraph', text: pText });
        }
      }

      if (listItems.length > 0) {
        blocks.push({
          type: 'list',
          text: '',
          items: listItems,
        });
      }
      continue;
    }

    // Standard paragraph
    const pText = cleanEditorialText(trimmed);
    if (pText && !isBoilerplateParagraph(pText)) {
      blocks.push({
        type: 'paragraph',
        text: pText,
      });
    }
  }

  return blocks;
}

/**
 * Produces clean normalized plain/markdown text from any raw input string.
 */
export function normalizeArticleString(content?: string | null): string {
  const blocks = parseArticleContentToBlocks(content);
  if (blocks.length === 0) return '';

  return blocks
    .map((b) => {
      if (b.type === 'heading') {
        return `### ${b.text}`;
      }
      if (b.type === 'blockquote') {
        return `> ${b.text}`;
      }
      if (b.type === 'list' && b.items) {
        return b.items.map((i) => `• ${i}`).join('\n');
      }
      return b.text;
    })
    .join('\n\n');
}
