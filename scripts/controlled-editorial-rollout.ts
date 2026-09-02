import { config } from 'dotenv';
config({ path: '.env.local' });

import { articleService } from '../src/services/article.service';
import { createAdminClient } from '../src/lib/supabase/admin';
import { normalizeTitle } from '../src/lib/html-entities';
import { Database } from '../src/types/database.types';
import { detectMultiVerticalCategory, EXPANDED_FEEDS } from './editorial-ingestion-dry-run';

function generateSlug(title: string): string {
  const normalized = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const cleanSlug = normalized.slice(0, 90).replace(/-$/, '');
  return cleanSlug || `stire-aix-${Date.now()}`;
}

async function runControlledEditorialRollout() {
  console.log('=== AIX MEDIA — CONTROLLED MULTI-VERTICAL EDITORIAL ROLLOUT ===\n');

  const supabaseAdmin = createAdminClient();
  const existingArticles = await articleService.getPublishedArticles(500);
  const existingSlugs = new Set(existingArticles.map((a) => a.slug));
  const existingTitles = new Set(existingArticles.map((a) => a.title.toLowerCase()));

  console.log(`[INITIAL STATE] Existing Published Articles: ${existingArticles.length}`);

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const feed of EXPANDED_FEEDS) {
    console.log(`\nProcessing Feed: ${feed.name} (${feed.url})...`);
    try {
      const response = await fetch(feed.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'AiX-Media-NewsBot/1.0 (+https://media.aixluxury.com)',
          Accept: 'application/rss+xml, application/xml, text/xml',
        },
      });

      if (!response.ok) {
        console.error(`  ✗ Feed ${feed.name} returned HTTP ${response.status}`);
        continue;
      }

      const xmlText = await response.text();
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match;

      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemContent = match[1];
        if (!itemContent) continue;

        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
        const descMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/i);
        const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

        if (!titleMatch || !titleMatch[1]) continue;

        const rawTitle = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]+>/g, '').trim();
        const rawDesc = descMatch && descMatch[1] ? descMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]+>/g, '').trim() : rawTitle;
        const pubDate = pubDateMatch && pubDateMatch[1] ? pubDateMatch[1] : new Date().toUTCString();

        const cleanTitle = normalizeTitle(rawTitle);
        const slug = generateSlug(cleanTitle);

        if (existingSlugs.has(slug) || existingTitles.has(cleanTitle.toLowerCase())) {
          totalSkipped++;
          continue;
        }

        const fullText = `${cleanTitle} ${rawDesc}`;
        const category = detectMultiVerticalCategory(fullText);

        // Controlled Rollout Cap: Maximum 3 new articles per batch
        if (totalInserted >= 3) break;

        const bodyContent = `${rawDesc}\n\nSursa: ${feed.sourceAttribution}`;
        const wordCount = bodyContent.split(/\s+/).filter(Boolean).length;
        const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

        const payload: Database['public']['Tables']['articles']['Insert'] = {
          title: cleanTitle,
          slug,
          excerpt: rawDesc.slice(0, 250) || cleanTitle,
          content: bodyContent,
          cover_image_url: null,
          category_id: null,
          status: 'published',
          publish_date: new Date(pubDate).toISOString(),
          seo_title: cleanTitle.slice(0, 100),
          seo_description: rawDesc.slice(0, 255),
          read_time: `${readTimeMinutes} min read`,
          view_count: 0,
        };

        const { error: insertErr } = await supabaseAdmin.from('articles').insert([payload]);

        if (!insertErr) {
          totalInserted++;
          existingSlugs.add(slug);
          existingTitles.add(cleanTitle.toLowerCase());
          console.log(`  ✓ PUBLISHED ARTICLE: /news/${slug} (Category: /${category})`);
          console.log(`    Title: "${cleanTitle}"`);
        } else {
          console.error(`  ✗ Insert error for "${cleanTitle}":`, insertErr);
        }
      }
    } catch (err) {
      console.error(`  ✗ Error processing feed ${feed.name}:`, err);
    }

    if (totalInserted >= 3) break;
  }

  const updatedArticles = await articleService.getPublishedArticles(500);
  console.log(`\n[ROLLOUT COMPLETE] Total Published Articles Now: ${updatedArticles.length}`);
  console.log(`- Total Inserted: ${totalInserted}`);
  console.log(`- Total Skipped (Duplicates): ${totalSkipped}`);

  console.log('\n=== CONTROLLED ROLLOUT VERDICT ===');
  if (totalInserted > 0) {
    console.log('EDITORIAL EXPANSION: PASS');
  } else {
    console.log('EDITORIAL EXPANSION: NO NEW ARTICLES (DUPLICATES SKIPPED)');
  }
}

runControlledEditorialRollout().catch((err) => {
  console.error('Rollout error:', err);
  process.exit(1);
});
