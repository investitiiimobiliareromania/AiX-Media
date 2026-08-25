
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
import { createAdminClient } from '@/lib/supabase/admin';
import { Database } from '@/types/database.types'; // used for typing
// import type { ArticleRow } from '@/types/database.types'; // removed unused import

import { extractImage } from '@/lib/rss-ingestion';

/**
 * Backfill articles with missing or generic placeholder cover images.
 *
 * Steps:
 * 1. Retrieve all articles.
 * 2. Identify rows where `cover_image_url` is null/empty or matches the known generic placeholder.
 * 3. Extract real images from stored `content`.
 * 4. Update the row if a new URL is found.
 * 5. Log a summary of operations.
 */
async function backfillCoverImages() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Supabase URL not set; skipping backfill script.');
    return;
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('articles').select('id, slug, cover_image_url, content');
  if (error) {
    console.error('Fetch error', error);
    return;
  }
  const articles = data as Database['public']['Tables']['articles']['Row'][];


  const placeholder = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab';
  let updatedCount = 0;
  let totalProcessed = 0;

  for (const article of articles ?? []) {
    totalProcessed++;
    const current = article.cover_image_url;
    const needsUpdate = !current || current.startsWith(placeholder);
    if (!needsUpdate) continue;

    const extracted = article.content ? extractImage(article.content) : null;
    const newUrl = extracted && !extracted.startsWith(placeholder) ? extracted : null;

    // Log the operation details as required
    const recoveryMethod = newUrl ? 'extracted from content' : 'set to NULL';
    if (newUrl !== current) {
      const updatePayload: Database['public']['Tables']['articles']['Update'] = { cover_image_url: newUrl };
      const { error: updErr } = await supabase.from('articles').update(updatePayload).eq('id', article.id);
      if (!updErr) {
        updatedCount++;
        console.log(`UPDATE | id:${article.id} slug:${article.slug} old:${current} new:${newUrl} method:${recoveryMethod}`);
      } else {
        console.error(`Failed to update article ${article.id}:`, updErr);
      }
    } else {
      // No change needed, still log for audit
      console.log(`SKIP | id:${article.id} slug:${article.slug} current:${current} (no update)`);
    }
  }

  console.log(`--- Summary ---`);
  console.log(`Total articles scanned: ${totalProcessed}`);
  console.log(`Articles updated: ${updatedCount}`);
}

backfillCoverImages().catch((e) => console.error('Backfill script error:', e));
