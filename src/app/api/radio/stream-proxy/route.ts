import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use Node.js runtime for streaming responses

const ALLOWED_STREAM_HOSTS = new Set(['stream2.srr.ro', 'stream.aixmedia.ro']);
const ALLOWED_STREAM_PATHS = new Set([
  '/rra',
  '/bucurestifm',
  '/rrc',
  '/radiocluj',
  '/radiotimisoara',
  '/rri1',
  '/rrm',
]);

function isAllowedStreamUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    
    // Strict protocol check
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    // Hostname allowlist check
    const hostname = parsed.hostname.toLowerCase();
    if (!ALLOWED_STREAM_HOSTS.has(hostname)) {
      return false;
    }

    // Port check: allow default or port 8000 for SRR
    const port = parsed.port;
    if (port !== '' && port !== '80' && port !== '443' && port !== '8000') {
      return false;
    }

    // Path check
    const path = parsed.pathname.toLowerCase();
    if (!ALLOWED_STREAM_PATHS.has(path)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  if (!isAllowedStreamUrl(targetUrl)) {
    return new NextResponse('Forbidden: Invalid or unapproved stream target', { status: 403 });
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
