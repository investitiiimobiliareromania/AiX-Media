// fetch-remaining-encoded.js
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

// Query for any encoded pipe patterns in titles
const url = `${supabaseUrl}/rest/v1/articles?select=id,title&title=ilike.*%26%23124%3B*`;

(async () => {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error('Fetch error', res.status, await res.text());
    process.exit(1);
  }
  const articles = await res.json();
  if (articles.length === 0) {
    console.log('No remaining encoded titles found');
  } else {
    console.log('Remaining encoded titles:');
    articles.forEach(a => console.log(`${a.id}: ${a.title}`));
  }
})();
