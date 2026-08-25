/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import dotenv from 'dotenv';
import { createAdminClient } from '@/lib/supabase/admin';
dotenv.config({ path: '.env.local' });

async function stats() {
  const supabase = createAdminClient();
  type ArticleRow = Database['public']['Tables']['articles']['Row'];
  const { data: articles, error } = await supabase.from<ArticleRow>('articles').select('id, cover_image_url').eq('status', 'published');
  if (error) { console.error('Error fetching articles', error); return; }
  const total = articles?.length ?? 0;
  const nullCount = articles?.filter(a => !a.cover_image_url).length ?? 0;
  const placeholder = 'images.unsplash.com/photo-1486406146926-c627a92ad1ab';
  const placeholderCount = articles?.filter(a => a.cover_image_url && a.cover_image_url.includes(placeholder)).length ?? 0;
  const urlMap: Record<string, number> = {};
  articles?.forEach(a => {
    const url = a.cover_image_url || '';
    if (url) urlMap[url] = (urlMap[url] || 0) + 1;
  });
  const duplicateUrls = Object.entries(urlMap).filter(([,cnt]) => cnt > 1);
  console.log('Total articles:', total);
  console.log('NULL cover_image_url:', nullCount);
  console.log('Placeholder count:', placeholderCount);
  console.log('Duplicate URLs (>1):', duplicateUrls.map(([url,cnt])=>`${url} (${cnt})`).join(', '));
}

stats().catch(e=>console.error(e));
