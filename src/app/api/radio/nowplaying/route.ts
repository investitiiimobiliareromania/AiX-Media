import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://stream.aixmedia.ro/api/nowplaying', {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('Non‑2xx response');
    const data = await res.json();
    // Expected fields may vary; map safely
    const normalized = {
      isLive: !!data.isLive,
      artist: data.artist || null,
      title: data.title || null,
      album: data.album || null,
      art: data.art || null,
      stationName: data.stationName || 'AiX Media Radio',
      listeners: typeof data.listeners === 'number' ? data.listeners : 0,
    };
    return NextResponse.json(normalized, { status: 200 });
  } catch (err) {
    clearTimeout(timeout);
    const safeResponse = {
      isLive: false,
      artist: null,
      title: null,
      album: null,
      art: null,
      stationName: 'AiX Media Radio',
      listeners: 0,
    };
    return NextResponse.json(safeResponse, { status: 200 });
  }
}
