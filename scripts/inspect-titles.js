/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/inspect-titles.js
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

const ids = [
  'b068d1ea-db02-4dec-80ec-677e45c9c75f',
  'c057d4aa-9ed5-4453-819d-a81d05b286d5',
  '688d8fac-189d-4a08-aabe-5843c7fab39f',
  '07edfa74-e594-4d97-9bba-b5910d53ddf0',
  '6660ea31-1329-410b-8703-5e71ec7faf80',
  '9274d515-8d8f-43f1-89ca-3e26206963a8',
  'a8186058-bfd1-4cec-b109-faf95d668f3a',
];

(async () => {
  const filter = ids.map(id => encodeURIComponent(id)).join(',');
  const url = `${supabaseUrl}/rest/v1/articles?id=in.(${filter})&select=id,title`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error('Fetch error', res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  data.forEach(a => {
    console.log('---');
    console.log('ID:', a.id);
    console.log('Raw title:', a.title);
    console.log('Escaped JSON:', JSON.stringify(a.title));
  });
})();
