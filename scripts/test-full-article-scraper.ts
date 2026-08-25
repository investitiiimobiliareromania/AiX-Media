import { createAdminClient } from '../src/lib/supabase/admin';

async function testScraper() {
  const supabase = createAdminClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, content')
    .order('created_at', { ascending: false })
    .limit(5);

  console.log('Testing full text extraction on recent articles:\n');

  for (const art of articles || []) {
    console.log(`[${art.id}] ${art.title}`);
    console.log(`    Current Len: ${art.content.length} chars`);
    console.log(`    Current Text: "${art.content.slice(0, 150)}..."\n`);
  }
}

testScraper().catch(console.error);
