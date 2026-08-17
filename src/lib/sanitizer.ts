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
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href=["']?\s*javascript:[^"'>]*["']?/gi, 'href="#"')
    .replace(/src=["']?\s*javascript:[^"'>]*["']?/gi, 'src=""');
}

/**
 * Strips literal Markdown syntax artifacts while strictly preserving
 * legitimate content, numbers, punctuation, dashes, quotes, currency, and symbols.
 * 
 * Preserves:
 * - #1, EP #2 (issue/rank numbering)
 * - BET-TR, Cluj-Napoca (hyphenated names/tickers)
 * - 2026–2027 (en-dash)
 * - BNR — Piața monetară (em-dash)
 * - EUR/RON (slashes)
 * - +8,4% (plus signs and percentages)
 * - €1,2 milioane (currency symbols and numbers)
 * - Top 5 (standard text)
 * - 2026.08.17 (dates)
 */
export function cleanText(input?: string | null): string {
  if (!input || typeof input !== 'string') return '';

  return input
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
    // 12. Clean trailing whitespace on lines
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}


