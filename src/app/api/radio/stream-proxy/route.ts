import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use Node.js runtime for streaming responses

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Icy-MetaData': '1',
      },
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      return new NextResponse(`Upstream stream returned status ${upstreamRes.status}`, { status: 502 });
    }

    const contentType = upstreamRes.headers.get('content-type') || 'audio/mpeg';

    return new NextResponse(upstreamRes.body as unknown as ReadableStream, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Radio Stream Proxy Error:', error);
    return new NextResponse('Failed to connect to radio stream', { status: 500 });
  }
}
