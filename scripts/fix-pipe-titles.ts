import { createClient } from '../src/lib/supabase/client';

// Regex patterns for various encoded pipe representations
const pipeRegexes: RegExp[] = [
  /&#124;/g,
  /&#x7C;/gi,
  /&vert;/gi,
  /&amp;#124;/gi,
  /&amp;amp;#124;/gi,
  /\\u0026#124;/gi,
  /\\\\u0026#124;/gi,
  /\\\\\\u0026#124;/gi,
];

function decodePipe(text: string): string {
  let result = text;
  for (const re of pipeRegexes) {
    result = result.replace(re, '|');
  }
  return result;
}

async function fixTitles() {
  const supabase = createClient();
  // Search for titles containing any of the primary patterns; using ilike for simplicity
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id,title')
    .ilike('title', `%&#124;%`);

  if (error) {
    console.error('Fetch error:', error);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log('No encoded titles found');
    return;
  }

  let updated = 0;
  for (const a of articles) {
    const original = a.title as string;
    const corrected = decodePipe(original);
    if (corrected !== original) {
      const { error: updErr } = await supabase
        .from('articles')
        .update({ title: corrected })
        .eq('id', a.id);
      if (updErr) {
        console.error(`Update failed for ${a.id}:`, updErr);
        continue;
      }
      updated++;
      console.log(`Updated title for article ${a.id}`);
    }
  }
  console.log(`Total titles corrected: ${updated}`);
}

fixTitles().catch((e) => {
  console.error('Unexpected error:', e);
  process.exit(1);
});
