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

function cleanSearchQuery(title: string): string {
  const norm = normalizeDiacritics(title);
  return norm
    .replace(/^DOCUMENTE\s*(&#124;|\||-)\s*/i, '')
    .replace(/^FOTO\s*(&#124;|\||-)\s*/i, '')
    .replace(/^VIDEO\s*(&#124;|\||-)\s*/i, '')
    .replace(/^UPDATE\s*(&#124;|\||-)\s*/i, '')
    .replace(/^BREAKING\s*(&#124;|\||-)\s*/i, '')
    .replace(/^EXCLUSIV\s*(&#124;|\||-)\s*/i, '')
    .replace(/:\s*.*/, '') // drop subtitle after colon if long
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 45);
}

async function findPublisherImage(title: string, slug: string): Promise<string | null> {
  const query = cleanSearchQuery(title);
  const headers = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' };

  // 1. Try HotNews site search
  try {
    const url = `https://hotnews.ro/?s=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers });
    if (res.ok) {
      const html = await res.text();
      const matches = html.match(/src=["'](https:\/\/hotnews\.ro\/wp-content\/uploads\/[^"'\s<>&?]+)["']/gi);
      if (matches) {
        for (const rawMatch of matches) {
          const rawUrl = rawMatch.replace(/^src=["']|["']$/g, '').replace(/\?.*$/, '');
          if (isValidImageUrl(rawUrl)) return rawUrl;
        }
      }
    }
  } catch {}

  // 2. Try Economedia site search
  try {
    const url = `https://www.economedia.ro/?s=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers });
    if (res.ok) {
      const html = await res.text();
      const matches = html.match(/https%3A%2F%2Fwww\.economedia\.ro%2Fwp-content%2Fuploads%2F[^"'\s&]+/gi) ||
                      html.match(/https:\/\/www\.economedia\.ro\/wp-content\/uploads\/[^"'\s<>&?]+/gi);
      if (matches) {
        for (const raw of matches) {
          const cleanUrl = decodeURIComponent(raw).replace(/\?.*$/, '');
          if (isValidImageUrl(cleanUrl)) return cleanUrl;
        }
      }
    }
  } catch {}

  // 3. Try direct slug match on HotNews
  try {
    const res = await fetch(`https://hotnews.ro/${slug}`, { headers });
    if (res.ok) {
      const html = await res.text();
      const og = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || [])[1];
      if (og && isValidImageUrl(og)) return og;
    }
  } catch {}

  // 4. Try direct slug match on Economedia
  try {
    const res = await fetch(`https://www.economedia.ro/${slug}.html`, { headers });
    if (res.ok) {
      const html = await res.text();
      const og = (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || [])[1];
      if (og && isValidImageUrl(og)) return og;
    }
  } catch {}

  return null;
}

async function recoverAllPublisherImages() {
  const supabaseAdmin = createAdminClient();
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('id, slug, title, cover_image_url')
    .order('publish_date', { ascending: false });

  if (error || !articles) {
    console.error('Error fetching articles:', error);
    return;
  }

  console.log(`Auditing & Recovering Real Publisher Images for ALL ${articles.length} DB Articles...\n`);

  let recoveredCount = 0;
  let alreadyHadValidRss = 0;
  let genuinelyNoImage = 0;

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    if (!a) continue;

    const needsRecovery = !a.cover_image_url || 
      a.cover_image_url.includes('photo-1486406146926-c627a92ad1ab') || 
      a.cover_image_url.startsWith('/fallbacks/') ||
      !isValidImageUrl(a.cover_image_url);

    if (!needsRecovery) {
      alreadyHadValidRss++;
      console.log(`[${(i + 1).toString().padStart(2, '0')}/${articles.length}] ALREADY REAL RSS: ${a.slug.slice(0, 40)}`);
      continue;
    }

    console.log(`[${(i + 1).toString().padStart(2, '0')}/${articles.length}] Searching publisher image for: "${a.title.slice(0, 50)}"`);
    const foundImage = await findPublisherImage(a.title, a.slug);

    if (foundImage) {
      recoveredCount++;
      console.log(`   👉 RECOVERED REAL PUBLISHER IMAGE: ${foundImage}`);
      const { error: updateErr } = await supabaseAdmin
        .from('articles')
        .update({ cover_image_url: foundImage })
        .eq('id', a.id);

      if (updateErr) console.error(`   ❌ Failed to update DB: ${updateErr.message}`);
      else console.log(`   ✅ DB record updated in Supabase.`);
    } else {
      genuinelyNoImage++;
      console.log(`   ℹ️ No publisher cover image found. Setting DB cover_image_url = NULL`);
      await supabaseAdmin
        .from('articles')
        .update({ cover_image_url: null })
        .eq('id', a.id);
    }
  }

  console.log('\n======================================================');
  console.log(`Already Had Valid Real RSS Image : ${alreadyHadValidRss}`);
  console.log(`Newly Recovered Real RSS Images  : ${recoveredCount}`);
  console.log(`Genuinely No Image (Set NULL)    : ${genuinelyNoImage}`);
  console.log(`Total DB Articles Processed      : ${articles.length}`);
  console.log('======================================================\n');
}

recoverAllPublisherImages();
