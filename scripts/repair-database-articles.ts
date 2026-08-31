import { createAdminClient } from '../src/lib/supabase/admin';
import { normalizeArticleString } from '../src/lib/article-normalizer';
import { normalizeTitle } from '../src/lib/html-entities';
import { cleanText } from '../src/lib/sanitizer';

async function repairDatabaseArticles() {
  console.log('=== DATABASE ARTICLE TITLE & CONTENT SANITATION & REPAIR ===\n');

  const supabaseAdmin = createAdminClient();
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('id, slug, title, excerpt, content');

  if (error) {
    console.error('Failed to fetch articles from Supabase:', error);
    process.exit(1);
  }

  console.log(`Auditing ${articles.length} articles from Supabase...\n`);

  let repairedCount = 0;
  let cleanCount = 0;

  for (const article of articles) {
    const rawTitle = article.title || '';
    const rawExcerpt = article.excerpt || '';
    const rawContent = article.content || '';

    const normalizedTitle = normalizeTitle(rawTitle);
    const normalizedExcerpt = cleanText(rawExcerpt);
    const normalizedContent = normalizeArticleString(rawContent);

    const titleChanged = normalizedTitle !== rawTitle;
    const excerptChanged = normalizedExcerpt !== rawExcerpt;
    const contentChanged = normalizedContent !== rawContent;

    if (titleChanged || excerptChanged || contentChanged) {
      console.log(`[REPAIRING] id: ${article.id}, slug: ${article.slug}`);
      if (titleChanged) {
        console.log(`  Title:   "${rawTitle}" -> "${normalizedTitle}"`);
      }
      if (excerptChanged) {
        console.log(`  Excerpt: "${rawExcerpt.slice(0, 80)}..." -> "${normalizedExcerpt.slice(0, 80)}..."`);
      }
      if (contentChanged) {
        console.log(`  Content: length ${rawContent.length} -> length ${normalizedContent.length}`);
      }

      const { error: updateError } = await supabaseAdmin
        .from('articles')
        .update({
          title: normalizedTitle,
          excerpt: normalizedExcerpt,
          content: normalizedContent,
        })
        .eq('id', article.id);

      if (updateError) {
        console.error(`  ERROR updating article ${article.id}:`, updateError);
      } else {
        console.log(`  -> SUCCESS: Cleaned & stored in database`);
        repairedCount++;
      }
    } else {
      cleanCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Sanitation Complete! Clean: ${cleanCount}, Repaired: ${repairedCount}`);
  console.log(`========================================\n`);
}

repairDatabaseArticles().catch(console.error);
