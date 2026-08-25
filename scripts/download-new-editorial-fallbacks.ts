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

const NEW_EDITORIAL_ASSETS: AssetDef[] = [
  { key: 'story-bond-crisis.jpg', photoId: 'photo-1590283603385-17ffb3a7f29f', label: 'Wall Street Bond Crisis & Financial Market' },
  { key: 'story-earthquake-southamerica.jpg', photoId: 'photo-1518684079-3c830dcef090', label: 'South American Urban Emergency Architecture' },
  { key: 'story-state-head.jpg', photoId: 'photo-1540959733332-eab4deabeeaf', label: 'Presidential Diplomatic Airport Arrival' },
  { key: 'story-politics-europe.jpg', photoId: 'photo-1526470608268-f674ce90ebd4', label: 'European Parliament & Diplomatic Palace' },
  { key: 'story-nuclear-power.jpg', photoId: 'photo-1513836279014-a89f7a76ae86', label: 'Nuclear Power Station Cooling Towers' },
  { key: 'story-nato-baltic.jpg', photoId: 'photo-1544620347-c4fd4a3d5957', label: 'Baltic NATO Defense Base & Garrison' },
  { key: 'story-cinema-hollywood.jpg', photoId: 'photo-1489599849927-2ee91cede3ba', label: 'Hollywood Cinema Studio & Film Theater' },
  { key: 'story-navy-carrier.jpg', photoId: 'photo-1509316975850-ff9c5deb0cd9', label: 'US Navy Aircraft Carrier Vessel' },
  { key: 'story-gothic-castle.jpg', photoId: 'photo-1518709268805-4e9042af9f23', label: 'European 19th Century Gothic Estate Castle' },
  { key: 'story-piano-concert.jpg', photoId: 'photo-1520523839897-bd0b52f945a0', label: 'Grand Concert Piano & Philharmonic Hall' },
];

async function downloadNewEditorialAssets() {
  const fallbacksDir = path.join(process.cwd(), 'public', 'fallbacks');
  if (!fs.existsSync(fallbacksDir)) fs.mkdirSync(fallbacksDir, { recursive: true });

  console.log('=== DOWNLOADING HIGH-END EDITORIAL PHOTOGRAPHY ASSETS ===\n');

  for (let i = 0; i < NEW_EDITORIAL_ASSETS.length; i++) {
    const item = NEW_EDITORIAL_ASSETS[i]!;
    const url = `https://images.unsplash.com/${item.photoId}?q=80&w=1200&h=896&auto=format&fit=crop`;
    const dest = path.join(fallbacksDir, item.key);

    console.log(`[${i + 1}/${NEW_EDITORIAL_ASSETS.length}] Downloading ${item.label} (${item.key}) ...`);
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

downloadNewEditorialAssets().catch(e => console.error(e));
