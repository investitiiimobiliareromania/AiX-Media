import { config } from 'dotenv';
config({ path: '.env.local' });

import { createAdminClient } from '../src/lib/supabase/admin';

async function main() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('articles').select('*').limit(5);

  console.log('=== DB ARTICLES ROWS ===');
  if (error) {
    console.error('Error fetching articles:', error);
  } else if (data) {
    data.forEach((row) => {
      console.log(`id: "${row.id}", slug: "${row.slug}", category_id: "${row.category_id}" (${typeof row.category_id})`);
    });
  }
}

main().catch(console.error);
