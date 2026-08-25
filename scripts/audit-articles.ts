

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
import { createAdminClient } from '@/lib/supabase/admin';
import { Database } from '@/types/database.types';

type ArticleRow = Database['public']['Tables']['articles']['Row'];

async function audit() {
  const supabase = createAdminClient();
  const { data: articles, error } = await supabase.from('articles')
    .select('id,cover_image_url');
  if (error) {
    console.error('Fetch error', error);
    return;
  }
  const total = articles?.length ?? 0;
  const nullCount = articles?.filter((a) => !a.cover_image_url).length ?? 0;
  const placeholderCount = articles?.filter((a) => a.cover_image_url?.startsWith('https://images.unsplash.com/')).length ?? 0;
  const fallbackCount = articles?.filter((a) => (a.cover_image_url || '').startsWith('/fallbacks/')).length ?? 0;
  const distinct = new Set(articles?.map((a) => a.cover_image_url)).size;
  console.log('Total articles:', total);
  console.log('NULL cover_image_url:', nullCount);
  console.log('Generic Unsplash placeholders:', placeholderCount);
  console.log('Fallback URLs stored in DB:', fallbackCount);
  console.log('Distinct cover_image_url count:', distinct);
}

audit();
