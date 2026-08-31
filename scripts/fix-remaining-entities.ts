// scripts/fix-remaining-entities.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createAdminClient } from '../src/lib/supabase/admin';
import { normalizeTitle } from '../src/lib/html-entities';

async function fix() {
  // Verify service role key presence without leaking its value
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('Service Role: PRESENT');
  } else {
    console.error('Service Role: MISSING');
    process.exit(1);
  }

  const client = createAdminClient();
  const { data: articles, error } = await client
    .from('articles')
    .select('id,title');

  if (error) {
    console.error('Failed to fetch articles:', error);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log('No articles with HTML entity pipe found.');
    return;
  }

  let updated = 0;
  let failed = 0;
  for (const a of articles) {
    const clean = normalizeTitle(a.title as string);
    if (clean !== a.title) {
      // Update title
      const { error: updErr } = await client
        .from('articles')
        .update({ title: clean })
        .eq('id', a.id);
      if (updErr) {
        console.error(`Failed to update article ${a.id}:`, updErr);
        failed++;
        continue;
      }
      // Fetch updated record to verify
      const { data: fetched, error: fetchErr } = await client
        .from('articles')
        .select('title')
        .eq('id', a.id)
        .single();
      if (fetchErr) {
        console.error(`Failed to fetch updated article ${a.id}:`, fetchErr);
        failed++;
        continue;
      }
      if (fetched?.title !== clean) {
        console.error(`Verification failed for article ${a.id}: expected '${clean}' but got '${fetched?.title}'`);
        failed++;
        continue;
      }
      console.log(`Updated article ${a.id}: "${a.title}" -> "${clean}"`);
      updated++;
    }
  }

  console.log(`Finished. Updated ${updated} articles, ${failed} failures.`);
  if (failed > 0) {
    process.exit(1);
  }
}

fix().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
