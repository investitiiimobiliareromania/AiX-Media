import { createAdminClient } from '../src/lib/supabase/admin';
import { normalizeArticleString, cleanEditorialText, isBoilerplateParagraph } from '../src/lib/article-normalizer';

async function repairDatabaseArticles() {
  console.log('=== DATABASE ARTICLE CONTENT SANITATION & REPAIR ===\n');

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
    const raw = article.content || '';
    const hasHtml = /<[a-z][\s\S]*>/i.test(raw);
    const hasSvg = /\bsvg\b/i.test(raw);
    const hasClassName = raw.includes('className');
    const hasClass = raw.includes('class=');
    const hasVsCode = raw.includes('vscode');
    const hasBoilerplate =
      raw.includes('Lasă un răspuns') ||
      raw.includes('Anulează răspunsul') ||
      raw.includes('Cele mai noi articole') ||
      raw.includes('EUR: 5,2489') ||
      raw.includes('<b>EUR:</b>');

    const isCorrupt = hasHtml || hasSvg || hasClassName || hasClass || hasVsCode || hasBoilerplate;

    const normalized = normalizeArticleString(raw);

    if (isCorrupt || (normalized !== raw && normalized.length > 0)) {
      console.log(`[REPAIRING] id: ${article.id}, slug: ${article.slug}`);
      console.log(`  Issues: html=${hasHtml}, svg=${hasSvg}, className=${hasClassName}, vsCode=${hasVsCode}, boilerplate=${hasBoilerplate}`);
      console.log(`  Original length: ${raw.length} -> Normalized length: ${normalized.length}`);

      const { error: updateError } = await supabaseAdmin
        .from('articles')
        .update({ content: normalized })
        .eq('id', article.id);

      if (updateError) {
        console.error(`  ERROR updating article ${article.id}:`, updateError);
      } else {
        console.log(`  -> SUCCESS: Cleaned & stored`);
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
