import dotenv from 'dotenv';
import { createAdminClient } from '@/lib/supabase/admin';
import { Database } from '@/types/database.types';

dotenv.config({ path: '.env.local' });

/**
 * Determines whether an image URL is considered valid for use as a cover image.
 * Invalid URLs include generic placeholder images (e.g., Unsplash placeholder)
 * or any URL that fails basic validation.
 */
function isValidImageUrl(url: string | null): boolean {
  if (!url) return false;
  // Basic URL format check
  try {
    const parsed = new URL(url);
    // Reject known generic placeholder patterns
    const pathname = parsed.pathname.toLowerCase();
    if (pathname.includes('photo-1486406146926-c627a92ad1ab')) return false;
    // Add more placeholder detections if needed
    return true;
  } catch {
    return false;
  }
}

async function backfillCoverImages() {
  const supabase = createAdminClient();
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, cover_image_url');

  if (error) {
    console.error('Failed to fetch articles:', error);
    process.exit(1);
  }

  if (!articles) {
    console.log('No articles returned.');
    return;
  }

  console.log(`Processing ${articles.length} articles...`);
  let updated = 0;
  const typedArticles = articles as Database['public']['Tables']['articles']['Row'][];
  for (const article of typedArticles) {
    const current = article.cover_image_url;
    if (!isValidImageUrl(current)) {
      const { error: updErr } = await supabase
        .from('articles')
        .update({ cover_image_url: null } as Database['public']['Tables']['articles']['Update'])
        .eq('id', article.id);
      if (updErr) {
        console.error(`Failed to update article ${article.id}:`, updErr);
      } else {
        updated++;
        console.log(`Cleared invalid cover_image_url for article ${article.id}`);
      }
    }
  }
  console.log(`Backfill completed. ${updated} rows updated.`);
}

backfillCoverImages().then(() => {
  console.log('Done');
  process.exit(0);
});
