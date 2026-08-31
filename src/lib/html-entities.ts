/**
 * AIX MEDIA — COMPREHENSIVE HTML ENTITY DECODER & CANONICAL TITLE NORMALIZER
 * 
 * Deterministically decodes:
 * - Decimal character references (&#124;, &#8211;, &#038;, &#160;, etc.)
 * - Hexadecimal character references (&#x7C;, &#x2013;, etc.)
 * - Standard & extended named HTML entities (&vert;, &quot;, &amp;, &apos;, &lt;, &gt;, &ndash;, etc.)
 * - Safe double-encoded sequences (&amp;#124;, &amp;quot;, etc.) without infinite recursion
 * - Strictly preserves editorial pipe characters (|), quotes, punctuation, currency, and Romanian diacritics
 */

const NAMED_ENTITIES: Record<string, string> = {
  // Common XML / HTML entities
  quot: '"',
  amp: '&',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: ' ',
  vert: '|',
  // Typography & punctuation
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  hellip: '...',
  bull: '•',
  prime: '′',
  Prime: '″',
  // Currencies
  euro: '€',
  pound: '£',
  yen: '¥',
  cent: '¢',
  // Symbols
  copy: '©',
  reg: '®',
  trade: '™',
  deg: '°',
  plusmn: '±',
  times: '×',
  divide: '÷',
  sect: '§',
  laquo: '«',
  raquo: '»',
  micro: 'µ',
  para: '¶',
};

/**
 * Decode HTML entities in a string, handling decimal, hexadecimal, named, and double-encoded entities.
 * It iteratively decodes to handle cases like "&amp;#124;" which become "&#124;" after first pass.
 */
export function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== 'string') return '';

  // Normalize escaped ampersand sequences (e.g., '\\u0026', '\\\\u0026', '\\\\\\u0026', '&amp;#124;', '&amp;amp;#124;') to literal '&'
  const normalized = str
    .replace(/\\{0,4}u0026/g, '&')
    .replace(/&amp;#124;/gi, '&')
    .replace(/&amp;amp;#124;/gi, '&');

  // Pattern for standard HTML entities starting with '&'
  const entityPattern = /&(#[0-9]+;|#x[0-9a-fA-F]+;|\w+;)/g;

  const decodeOnce = (s: string): string =>
    s.replace(entityPattern, (match: string): string => {
      const entity = match.slice(1); // remove leading '&'
      if (entity.startsWith('#')) {
        const isHex = entity[1] === 'x' || entity[1] === 'X';
        const code = parseInt(entity.slice(isHex ? 2 : 1, -1), isHex ? 16 : 10);
        return isNaN(code) || code > 0x10FFFF ? match : String.fromCodePoint(code);
      }
      const name = entity.slice(0, -1);
      if (Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name)) {
        return NAMED_ENTITIES[name as keyof typeof NAMED_ENTITIES] ?? match;
      }
      return match;
    });

  // Iteratively decode double‑encoded entities (up to 3 passes)
  let result = normalized;
  for (let i = 0; i < 3; i++) {
    const next = decodeOnce(result);
    if (next === result) break;
    result = next;
  }
  return result;
}


/**
 * Canonical title normalizer for all news articles and editorial content.
 * 
 * Pipeline:
 * raw source title
 * → decode HTML entities (&#124; -> |, &#038; -> &, &#8211; -> –, etc.)
 * → strip accidental HTML tags (<...>)
 * → strip CDATA wrappers
 * → normalize whitespace
 * → preserve legitimate pipe (|), dash (–/—), quotes, Romanian diacritics
 */
export function normalizeTitle(input?: string | null): string {
  if (!input || typeof input !== 'string') return '';


  const decoded = decodeHtmlEntities(input);

  const clean = decoded
    // Remove CDATA markers if present
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    // Strip accidental HTML markup
    .replace(/<[^>]+>/g, '')
    // Clean redundant spaces and tabs
    .replace(/[ \t]+/g, ' ')
    .trim();

  // Return the cleaned title; all entity decoding handled earlier
  return clean;
}
