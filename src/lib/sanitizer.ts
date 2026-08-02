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

