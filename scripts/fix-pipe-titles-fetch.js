// scripts/fix-pipe-titles-fetch.js
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or anon key missing');
  process.exit(1);
}

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

const pipePatterns = [
  /&#124;/g,
  /&#x7C;/gi,
  /&#x7c;/gi,
  /&vert;/gi,
  /&amp;#124;/gi,
  /&amp;amp;#124;/gi,
  /\\u0026#124;/gi,
  /\\\\u0026#124;/gi,
  /\\\\\\u0026#124;/gi,
];
function decodePipe(str) {
  let result = str;
  for (const p of pipePatterns) {
    result = result.replace(p, '|');
  }
  return result;
}

async function fetchEncoded() {
  const url = `${supabaseUrl}/rest/v1/articles?select=id,title&title=ilike.*%26%23124%3B*`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error('Fetch error', res.status, await res.text());
    process.exit(1);
  }
  return await res.json();
}

async function updateTitle(id, newTitle) {
  const url = `${supabaseUrl}/rest/v1/articles?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ title: newTitle }),
  });
  if (!res.ok) {
    console.error('Update error', id, res.status, await res.text());
    return false;
  }
  return true;
}

(async () => {
  const articles = await fetchEncoded();
  if (articles.length === 0) {
    console.log('No encoded titles found');
    return;
  }
  let updated = 0;
  for (const a of articles) {
    const corrected = decodePipe(a.title);
    if (corrected !== a.title) {
      const ok = await updateTitle(a.id, corrected);
      if (ok) {
        updated++;
        console.log(`Updated article ${a.id}`);
      }
    }
  }
  console.log(`Total titles corrected: ${updated}`);
})();
