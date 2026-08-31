// scripts/verify-pipe-titles.js
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

// Full patterns for encoded pipe characters (same as update script)
const fullPipePatterns = [
  /\u0026#124;/g,
  /\u0026#x7C;/gi,
  /\u0026x7C;/gi,
  /\u0026x7c;/gi,
  /\u0026vert;/gi,
  /\u0026amp;#124;/gi,
  /\u0026amp;amp;#124;/gi,
  /\u0026#038;#124;/gi,
  /\u0026#38;#124;/gi,
];

function decodePipe(text) {
  if (!text) return text;
  let decoded = text;
  for (const pattern of fullPipePatterns) {
    decoded = decoded.replace(pattern, '|');
  }
  return decoded;
}

async function fetchAll() {
  const url = `${supabaseUrl}/rest/v1/articles?select=id,title&limit=1000`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error('Fetch error', res.status, await res.text());
    process.exit(1);
  }
  return await res.json();
}

(async () => {
  const articles = await fetchAll();
  const remaining = [];
  for (const a of articles) {
    const corrected = decodePipe(a.title);
    if (corrected !== a.title) {
      remaining.push({ id: a.id, title: a.title });
    }
  }
  if (remaining.length === 0) {
    console.log('All article titles are clean. No encoded pipe characters remain.');
  } else {
    console.log(`Found ${remaining.length} titles still containing encoded pipes:`);
    remaining.forEach(p => console.log(`${p.id}: ${p.title}`));
  }
})();
