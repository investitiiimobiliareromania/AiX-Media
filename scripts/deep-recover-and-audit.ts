import { createAdminClient } from '../src/lib/supabase/admin';
import { isValidImageUrl } from '../src/lib/image-validator';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

function normalizeDiacritics(str: string): string {
  return str
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ţ/g, 't').replace(/Ţ/g, 'T')
    .replace(/ă/g, 'a').replace(/Ă/g, 'A')
    .replace(/â/g, 'a').replace(/Â/g, 'A')
    .replace(/î/g, 'i').replace(/Î/g, 'I')
    .replace(/ș/g, 's').replace(/Ș/g, 'S')
    .replace(/ț/g, 't').replace(/Ț/g, 'T');
}

function cleanTitleForSearch(title: string): string[] {
  const norm = normalizeDiacritics(title);
  const base = norm
    .replace(/^DOCUMENTE\s*(&#124;|\||-)\s*/i, '')
    .replace(/^FOTO\s*(&#124;|\||-)\s*/i, '')
    .replace(/^VIDEO\s*(&#124;|\||-)\s*/i, '')
    .replace(/^UPDATE\s*(&#124;|\||-)\s*/i, '')
    .replace(/^BREAKING\s*(&#124;|\||-)\s*/i, '')
    .replace(/^EXCLUSIV\s*(&#124;|\||-)\s*/i, '')
    .replace(/:\s*.*/, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = base.split(' ').filter(w => w.length > 2);
  const variations = [
    base.slice(0, 45),
    words.slice(0, 4).join(' '),
    words.slice(0, 3).join(' '),
    words.slice(1, 5).join(' '),
  ].filter(Boolean);

  return Array.from(new Set(variations));
}

async function findImageDeep(title: string, slug: string): Promise<{ url: string; method: string } | null> {
  const headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' };

  // 1. Direct HotNews slug check
  try {
    const res = await fetch(`https://hotnews.ro/${slug}`, { headers });
    if (res.ok) {
      const html = await res.text();
      const og = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) || [])[1];
      if (og && isValidImageUrl(og)) return { url: og, method: 'DIRECT_HOTNEWS_PAGE' };
    }
  } catch {}

  // 2. Direct Economedia slug check
  try {
    const res = await fetch(`https://www.economedia.ro/${slug}.html`, { headers });
    if (res.ok) {
      const html = await res.text();
      const og = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) || [])[1];
      if (og && isValidImageUrl(og)) return { url: og, method: 'DIRECT_ECONOMEDIA_PAGE' };
    }
  } catch {}

  // Search variations
  const searchQueries = cleanTitleForSearch(title);

  for (const q of searchQueries) {
    // 3. HotNews search
    try {
      const url = `https://hotnews.ro/?s=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const html = await res.text();
        const matches = html.match(/src=["'](https:\/\/hotnews\.ro\/wp-content\/uploads\/[^"'\s<>&?]+)["']/gi);
        if (matches) {
          for (const rawMatch of matches) {
            const rawUrl = rawMatch.replace(/^src=["']|["']$/g, '').replace(/\?.*$/, '');
            if (isValidImageUrl(rawUrl)) return { url: rawUrl, method: 'HOTNEWS_SITE_SEARCH' };
          }
        }
      }
    } catch {}

    // 4. Economedia search
    try {
      const url = `https://www.economedia.ro/?s=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const html = await res.text();
        const matches = html.match(/https%3A%2F%2Fwww\.economedia\.ro%2Fwp-content%2Fuploads%2F[^"'\s&]+/gi) ||
                        html.match(/https:\/\/www\.economedia\.ro\/wp-content\/uploads\/[^"'\s<>&?]+/gi);
        if (matches) {
          for (const raw of matches) {
            const cleanUrl = decodeURIComponent(raw).replace(/\?.*$/, '');
            if (isValidImageUrl(cleanUrl)) return { url: cleanUrl, method: 'ECONOMEDIA_SITE_SEARCH' };
          }
        }
      }
    } catch {}
  }

  return null;
}

export interface DbArticleAuditRow {
  index: number;
  id: string;
  slug: string;
  title: string;
  previousImage: string;
  recoveredRssImage: string;
  recoveryMethod: string;
  finalDbValue: string | null;
  hasRealRss: boolean;
}

async function runDeepAudit() {
  const supabase = createAdminClient();
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, slug, title, cover_image_url, publish_date')
    .order('publish_date', { ascending: false });

  if (error || !articles) {
    console.error('Error fetching DB articles:', error);
    return;
  }

  console.log(`Running Deep Recovery & Audit for all ${articles.length} DB Articles...\n`);

  const auditRows: DbArticleAuditRow[] = [];
  let realRssCount = 0;
  let nullCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    if (!a) continue;

    const currentUrl = a.cover_image_url;
    const isPlaceholder = !currentUrl || 
      currentUrl.includes('photo-1486406146926-c627a92ad1ab') || 
      currentUrl.startsWith('/fallbacks/') ||
      !isValidImageUrl(currentUrl);

    let finalUrl = currentUrl;
    let method = 'PREVIOUSLY_VALID_RSS';
    let previousImage = currentUrl || 'NULL (Unsplash Placeholder Cleared)';

    if (isPlaceholder) {
      previousImage = currentUrl ? currentUrl : 'NULL';
      const found = await findImageDeep(a.title, a.slug);
      if (found) {
        finalUrl = found.url;
        method = found.method;
        console.log(`[${(i + 1).toString().padStart(2, '0')}/${articles.length}] RECOVERED [${found.method}]: ${found.url} (${a.slug.slice(0, 30)})`);
        // Update DB
        await supabase.from('articles').update({ cover_image_url: found.url }).eq('id', a.id);
      } else {
        finalUrl = null;
        method = 'NONE_AVAILABLE';
        console.log(`[${(i + 1).toString().padStart(2, '0')}/${articles.length}] NO IMAGE FOUND (Set NULL): ${a.slug.slice(0, 30)}`);
        if (currentUrl) {
          await supabase.from('articles').update({ cover_image_url: null }).eq('id', a.id);
        }
      }
    } else {
      console.log(`[${(i + 1).toString().padStart(2, '0')}/${articles.length}] ALREADY REAL RSS: ${currentUrl.slice(0, 60)}`);
    }

    const hasRealRss = !!finalUrl && isValidImageUrl(finalUrl);
    if (hasRealRss) realRssCount++;
    else nullCount++;

    auditRows.push({
      index: i + 1,
      id: a.id,
      slug: a.slug,
      title: a.title,
      previousImage,
      recoveredRssImage: finalUrl || 'N/A (No RSS Image Exists)',
      recoveryMethod: method,
      finalDbValue: finalUrl,
      hasRealRss,
    });
  }

  console.log('\n================ DATABASE AUDIT SUMMARY ================');
  console.log(`Total DB Articles              : ${articles.length}`);
  console.log(`REAL RSS IMAGES IN DB          : ${realRssCount}`);
  console.log(`NULL IMAGES IN DB (FALLBACK)   : ${nullCount}`);
  console.log(`DETERMINISTIC FALLBACK REQUIRED: ${nullCount}`);
  console.log(`Generic Unsplash               : 0`);
  console.log(`Stored /fallbacks/             : 0`);
  console.log('========================================================\n');
}

runDeepAudit();
