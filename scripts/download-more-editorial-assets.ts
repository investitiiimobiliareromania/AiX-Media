import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execFile } from 'child_process';
import util from 'util';

const execFileAsync = util.promisify(execFile);

interface AssetDef {
  key: string;
  photoId: string;
  label: string;
}

const MORE_EDITORIAL_ASSETS: AssetDef[] = [
  { key: 'story-iran-sanctions.jpg', photoId: 'photo-1578575437130-527eed3abbec', label: 'Middle East Geopolitics & Energy Tanker Sanctions' },
  { key: 'story-border-drone.jpg', photoId: 'photo-1544620347-c4fd4a3d5957', label: 'European Border Security Checkpoint & Defense' },
  { key: 'story-heatwave-weather.jpg', photoId: 'photo-1507525428034-b723cf961d3e', label: 'Summer Sun & Urban Heatwave Weather Forecast' },
  { key: 'story-maritime-fire.jpg', photoId: 'photo-1524522173746-f628baad3644', label: 'Port Cargo Vessel & Maritime Infrastructure' },
];

async function downloadMoreEditorialAssets() {
  const fallbacksDir = path.join(process.cwd(), 'public', 'fallbacks');
  if (!fs.existsSync(fallbacksDir)) fs.mkdirSync(fallbacksDir, { recursive: true });

  console.log('=== DOWNLOADING ADDITIONAL STORY-SPECIFIC ASSETS ===\n');

  for (let i = 0; i < MORE_EDITORIAL_ASSETS.length; i++) {
    const item = MORE_EDITORIAL_ASSETS[i]!;
    const url = `https://images.unsplash.com/${item.photoId}?q=80&w=1200&h=896&auto=format&fit=crop`;
    const dest = path.join(fallbacksDir, item.key);

    console.log(`[${i + 1}/${MORE_EDITORIAL_ASSETS.length}] Downloading ${item.label} (${item.key}) ...`);
    try {
      await execFileAsync('curl', ['-sS', '-L', '--max-time', '20', '-A', 'Mozilla/5.0', url, '-o', dest]);
      const buf = fs.readFileSync(dest);
      const meta = await sharp(buf).metadata();
      console.log(`       Saved: ${meta.width}x${meta.height}, ${buf.length} bytes, format: ${meta.format}`);
    } catch (err) {
      console.error(`       Error downloading ${item.key}:`, err);
    }
  }
}

downloadMoreEditorialAssets().catch(e => console.error(e));
