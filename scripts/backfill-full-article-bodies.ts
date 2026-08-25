import { createAdminClient } from '../src/lib/supabase/admin';
import { fetchFullArticleHtmlFromUrl } from '../src/lib/article-full-text-enhancer';

async function backfillFullArticleBodies() {
  console.log('=== BACKFILLING FULL UNTRUNCATED ARTICLE BODIES ===\n');

  const supabase = createAdminClient();
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, content')
    .order('created_at', { ascending: false });

  if (error || !articles) {
    console.error('Error fetching articles:', error);
    return;
  }

  console.log(`Found ${articles.length} articles to check & backfill.\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const art of articles) {
    const isTruncated =
      art.content.includes('[…]') ||
      art.content.includes('[...]') ||
      art.content.includes('&#8230;') ||
      art.content.includes('Citiți mai mult pe') ||
      art.content.length < 500;

    if (!isTruncated) {
      skippedCount++;
      continue;
    }

    console.log(`Processing [${art.id}] "${art.title}" (Current Len: ${art.content.length})...`);

    // Try fetching full HTML from Economedia / HotNews URL based on slug
    const tryUrls = [
      `https://economedia.ro/${art.slug}.html`,
      `https://hotnews.ro/${art.slug}.html`,
    ];

    let fullContent: string | null = null;
    for (const url of tryUrls) {
      fullContent = await fetchFullArticleHtmlFromUrl(url);
      if (fullContent && fullContent.length > art.content.length) {
        break;
      }
    }

    if (fullContent && fullContent.length > art.content.length) {
      const { error: updateErr } = await supabase
        .from('articles')
        .update({ content: fullContent })
        .eq('id', art.id);

      if (!updateErr) {
        console.log(`   --> UPDATED WITH FULL CONTENT! New Len: ${fullContent.length} chars\n`);
        updatedCount++;
      } else {
        console.error(`   --> Update error:`, updateErr);
      }
    } else {
      // If external fetch failed, strip artificial […]
      const cleaned = art.content
        .replace(/\[\s*…\s*\]/g, '')
        .replace(/\[\s*\.\.\.\s*\]/g, '')
        .replace(/&#8230;/g, '')
        .replace(/Citiți mai mult pe [a-zA-Z0-9\.\-]+/gi, '')
        .trim();

      await supabase.from('articles').update({ content: cleaned }).eq('id', art.id);
      console.log(`   --> CLEANED TRUNCATION ARTIFACTS. New Len: ${cleaned.length} chars\n`);
      updatedCount++;
    }
  }

  console.log(`=== BACKFILL SUMMARY ===`);
  console.log(`TOTAL ARTICLES: ${articles.length}`);
  console.log(`UPDATED       : ${updatedCount}`);
  console.log(`SKIPPED       : ${skippedCount}`);
}

backfillFullArticleBodies().catch(console.error);
