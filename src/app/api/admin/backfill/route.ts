import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function timingSafeSecretCheck(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!provided || !expected || typeof provided !== 'string' || typeof expected !== 'string') {
    return false;
  }
  try {
    const hashProvided = crypto.createHash('sha256').update(provided).digest();
    const hashExpected = crypto.createHash('sha256').update(expected).digest();
    return crypto.timingSafeEqual(hashProvided, hashExpected);
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed. Use POST for backfill operations.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method Not Allowed. Use POST for backfill operations.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method Not Allowed. Use POST for backfill operations.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'Unauthorized: Endpoint authentication not configured' },
      { status: 401 }
    );
  }

  const authHeader = req.headers.get('authorization');
  const customHeader = req.headers.get('x-admin-secret') || req.headers.get('x-cron-secret');
  const { searchParams } = new URL(req.url);
  const secretParam = searchParams.get('secret');

  const providedSecret = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7).trim()
    : (customHeader || secretParam);

  if (!timingSafeSecretCheck(providedSecret, cronSecret)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing secret' },
      { status: 401 }
    );
  }

  try {
    const supabase = createAdminClient();
    const placeholder = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab';
    
    const { data: articles, error: fetchErr } = await supabase
      .from('articles')
      .select('id, slug, cover_image_url');

    if (fetchErr) {
      console.error('[Admin Backfill API] Fetch error:', fetchErr);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    let updatedCount = 0;

    for (const article of articles || []) {
      if (article.cover_image_url?.startsWith(placeholder)) {
        const { error: updErr } = await supabase
          .from('articles')
          .update({ cover_image_url: null })
          .eq('id', article.id);

        if (!updErr) {
          updatedCount++;
        } else {
          console.error(`[Admin Backfill API] Update failed for ${article.slug}:`, updErr);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      totalScanned: articles?.length ?? 0,
      updatedCount,
    });
  } catch (err) {
    console.error('[Admin Backfill API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


