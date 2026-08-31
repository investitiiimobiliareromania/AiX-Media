import { cleanEditorialText, normalizeArticleString, parseArticleContentToBlocks } from './article-normalizer';
import { decodeHtmlEntities, normalizeTitle } from './html-entities';

/**
 * Enterprise HTML sanitizer helper
 */
export function sanitizeHtml(input?: string | null): string {
  if (!input) return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href=["']?\s*javascript:[^"'>]*["']?/gi, 'href="#"')
    .replace(/src=["']?\s*javascript:[^"'>]*["']?/gi, 'src=""');
}

/**
 * Strips literal Markdown and JSX syntax artifacts while strictly preserving
 * legitimate content, numbers, punctuation, dashes, quotes, currency, and symbols.
 */
export function cleanText(input?: string | null): string {
  if (!input || typeof input !== 'string') return '';

  const withoutEntities = decodeHtmlEntities(input);
  const withoutMarkup = cleanEditorialText(withoutEntities);

  return withoutMarkup
    // 1. Remove code blocks
    .replace(/```[a-zA-Z]*\n?([\s\S]*?)```/g, '$1')
    // 2. Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // 3. Remove images ![alt](url) -> alt
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // 4. Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 5. Remove bold-italic (***text*** or ___text___)
    .replace(/(\*{3}|_{3})(.*?)\1/g, '$2')
    // 6. Remove bold (**text** or __text__)
    .replace(/(\*{2}|_{2})(.*?)\1/g, '$2')
    // 7. Remove italic (*text* or _text_) with word boundary checks
    .replace(/(?<!\w)(\*|_)(.*?)\1(?!\w)/g, '$2')
    // 8. Remove strikethrough (~~text~~)
    .replace(/~~(.*?)~~/g, '$1')
    // 9. Remove markdown headers (# Title, ## Subtitle, etc.) at line starts
    .replace(/^[ \t]*#{1,6}[ \t]+/gm, '')
    // 10. Remove blockquotes (> Quote) at line starts
    .replace(/^[ \t]*>[ \t]*/gm, '')
    // 11. Normalize markdown bullet lists (- Item, * Item, + Item) to clean bullets • 
    .replace(/^[ \t]*[-*+][ \t]+/gm, '• ')
    // 12. Strip leftover tag syntax
    .replace(/<[^>]+>/g, '')
    // 13. Clean trailing whitespace on lines
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

export {
  cleanEditorialText,
  normalizeArticleString,
  parseArticleContentToBlocks,
  decodeHtmlEntities,
  normalizeTitle,
};




