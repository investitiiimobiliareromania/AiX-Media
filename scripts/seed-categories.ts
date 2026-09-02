import { config } from 'dotenv';
config({ path: '.env.local' });

import { createAdminClient } from '../src/lib/supabase/admin';
import { categoriesList } from '../src/constants/categories';

async function seedCategories() {
  const supabase = createAdminClient();
  console.log('=== SEEDING SUPABASE CATEGORIES ===');

  for (const cat of categoriesList) {
    const { data: existing } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', cat.slug)
      .maybeSingle();

    if (!existing) {
      const id = crypto.randomUUID();
      const { error } = await supabase.from('categories').insert([
        {
          id,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (!error) {
        console.log(`✓ Inserted Category: ${cat.name} (${cat.slug}) -> ID: ${id}`);
      } else {
        console.error(`✗ Error inserting category ${cat.slug}:`, error);
      }
    } else {
      console.log(`- Category exists: ${cat.name} (${cat.slug}) -> ID: ${existing.id}`);
    }
  }

  console.log('\n=== CATEGORY SEED COMPLETE ===');
}

seedCategories().catch(console.error);
