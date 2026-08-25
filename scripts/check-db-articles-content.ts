import { createAdminClient } from '../src/lib/supabase/admin';

async function checkArticlesContent() {
  const supabase = createAdminClient();
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, content')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  console.log(`Fetched ${articles.length} articles from Supabase DB:\n`);

  let truncatedCount = 0;
  for (const art of articles) {
    const isTruncated = art.content.includes('[…]') || art.content.includes('[...]') || art.content.length < 300;
    if (isTruncated) truncatedCount++;

    console.log(`[${art.id}] "${art.title}"`);
    console.log(`    Slug       : ${art.slug}`);
    console.log(`    Content Len: ${art.content.length} chars`);
    console.log(`    Truncated  : ${isTruncated ? 'YES (contains […] or short)' : 'NO'}`);
    console.log(`    Content End: "...${art.content.slice(-80)}"\n`);
  }

  console.log(`SUMMARY: ${truncatedCount} / ${articles.length} sampled articles are truncated with […]`);
}

checkArticlesContent().catch(console.error);
