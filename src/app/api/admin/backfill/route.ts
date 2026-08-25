import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createAdminClient();
  const placeholder = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab';
  
  const { data: articles, error: fetchErr } = await supabase
    .from('articles')
    .select('id, slug, cover_image_url');

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr }, { status: 500 });
  }

  let updatedCount = 0;
  const log: string[] = [];

  for (const article of articles || []) {
    if (article.cover_image_url?.startsWith(placeholder)) {
      const { error: updErr } = await supabase
        .from('articles')
        .update({ cover_image_url: null })
        .eq('id', article.id);

      if (!updErr) {
        updatedCount++;
        log.push(`Updated ${article.slug} to NULL`);
      } else {
        log.push(`Failed ${article.slug}: ${updErr.message}`);
      }
    }
  }

  return NextResponse.json({
    ok: true,
    totalScanned: articles?.length ?? 0,
    updatedCount,
    log,
  });
}
