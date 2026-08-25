import http from 'http';
import https from 'https';

const streams = [
  { name: 'Radio România Actualități', url: 'http://stream2.srr.ro:8000/rra' },
  { name: 'Radio România Cultural', url: 'http://stream2.srr.ro:8000/rrc' },
  { name: 'București FM', url: 'http://stream2.srr.ro:8000/bucurestifm' },
  { name: 'Radio România Muzical', url: 'http://stream2.srr.ro:8000/rrm' },
  { name: 'BBC World Service', url: 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service' },
  { name: 'NPR News & Business', url: 'https://npr-ice.streamguys1.com/live.mp3' },
  { name: 'France Info Business', url: 'https://icecast.radiofrance.fr/franceinfo-midfi.mp3' },
  { name: 'Swiss Radio Jazz/Business', url: 'https://stream.srg-ssr.ch/m/rsj/mp3_128' },
];

async function checkStream(name: string, url: string): Promise<void> {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      console.log(`[${name}] Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}`);
      req.destroy();
      resolve();
    });
    req.on('error', (err) => {
      console.log(`[${name}] Error: ${err.message}`);
      resolve();
    });
    req.setTimeout(5000, () => {
      console.log(`[${name}] Timeout`);
      req.destroy();
      resolve();
    });
  });
}

async function run() {
  console.log('Testing radio streams...');
  for (const s of streams) {
    await checkStream(s.name, s.url);
  }
}

run();
