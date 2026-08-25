/**
 * Checks if a cover image URL is valid (rejects generic placeholders, icons, tracking pixels).
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    // Reject known generic placeholder
    if (path.includes('photo-1486406146926-c627a92ad1ab')) return false;
    // Reject common invalid patterns such as logos, icons, placeholders, SVGs, generic defaults
    const invalidSubstrings = ['logo', 'icon', 'placeholder', '.svg', 'flag-eu', 'flag-us', 'featured-default', 'default.jpg', '1200x630.png', 'hotnews.jpg'];
    for (const sub of invalidSubstrings) {
      if (path.includes(sub)) return false;
    }
    // Reject tracking pixels or 1x1 images
    if (parsed.searchParams.get('w') === '1' && parsed.searchParams.get('h') === '1') return false;
    const w = parsed.searchParams.get('w');
    const h = parsed.searchParams.get('h');
    if ((w && Number(w) <= 1) || (h && Number(h) <= 1)) return false;
    return true;
  } catch {
    return false;
  }
}
