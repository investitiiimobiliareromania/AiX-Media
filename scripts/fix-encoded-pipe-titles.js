/* eslint-disable @typescript-eslint/no-require-imports */
// fix-encoded-pipe-titles.js
// Run with: node scripts/fix-encoded-pipe-titles.js
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing Supabase URL or service role key in .env.local');
  process.exit(1);
}

// Patterns for encoded pipe variations (including encoded ampersand)
const patterns = [
  /&#124;/g,
  /&#x7C;/gi,
  /&#x7c;/gi,
  /&vert;/gi,
  /&#038;#124;/g,
  /&#38;#124;/g,
  /&amp;#124;/g,
  /&amp;amp;#124;/g,
  /\\u0026#124;/g,
  /\\\\u0026#124;/g,
  /&#038;/g, // replace encoded ampersand that may precede a pipe
];

function decodeTitle(title) {
  let cleaned = title;
  for (const regex of patterns) {
    if (regex.source === '#038') {
      // replace encoded ampersand with literal '&'
      cleaned = cleaned.replace(regex, '&');
    } else {
      cleaned = cleaned.replace(regex, '|');
    }
  }
  return cleaned;
}

async function fetchAllArticles() {
  const url = `${SUPABASE_URL}/rest/v1/articles?select=id,title`;
  const res = await fetch(url, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

async function updateTitle(id, newTitle) {
  const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${id}&select=title`;
  const payload = { title: newTitle };
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`PATCH failed for ${id}: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

async function selectById(id) {
  const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${id}&select=title`;
  const res = await fetch(url, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (!res.ok) {
    throw new Error(`SELECT failed for ${id}: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

async function main() {
  console.log('Fetching all articles...');
  const articles = await fetchAllArticles();

  const toFix = articles.filter(a => patterns.some(p => p.test(a.title)));
  console.log(`Found ${toFix.length} article(s) with encoded pipes.`);

  let success = 0;
  let failed = 0;

  for (const article of toFix) {
    const cleaned = decodeTitle(article.title);
    if (cleaned === article.title) continue; // nothing to change
    try {
      await updateTitle(article.id, cleaned);
      const after = await selectById(article.id);
      const persisted = after[0]?.title;
      if (persisted === cleaned) {
        console.log(`✅ Fixed ${article.id}`);
        success++;
      } else {
        console.error(`❌ Verification mismatch for ${article.id}`);
        failed++;
      }
    } catch (e) {
      console.error(`❌ Error processing ${article.id}:`, e.message);
      failed++;
    }
  }

  // Final verification
  const finalArticles = await fetchAllArticles();
  const remaining = finalArticles.filter(a => patterns.some(p => p.test(a.title)));
  console.log('=== FINAL REPORT ===');
  console.log('Affected titles found:', toFix.length);
  console.log('Successfully corrected:', success);
  console.log('Failed updates:', failed);
  console.log('Remaining encoded pipe titles:', remaining.length);
}

main();
