// scripts/update-pipe-titles.js
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

// Patterns for e

// Fetch all articles (id and title)
async function fetchEncoded() {
  const url = `${supabaseUrl}/rest/v1/articles?select=id,title`;
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
    console.error('Update error for', id, res.status, await res.text());
    return false;
  }
  return true;
}
function decodePipe(str) {
  let prev;
  let current = str;
  do {
    prev = current;
    // Convert literal backslashes before u0026 into '&'
    current = current.replace(/\\+u0026/g, '&');
    // Decode HTML ampersand entities
    current = current.replace(/&amp;/gi, '&');
    current = current.replace(/&#038;/gi, '&');
    current = current.replace(/&#38;/gi, '&');
    // Replace pipe representations with '|'
    current = current.replace(/&#124;/gi, '|');
    current = current.replace(/&#x7c;/gi, '|');
    current = current.replace(/&vert;/gi, '|');
  } while (current !== prev);
  return current;
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
