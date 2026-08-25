import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execFile } from 'child_process';
import util from 'util';

const execFileAsync = util.promisify(execFile);

interface StoryFallbackDef {
  key: string;
  photoId: string;
  label: string;
}

const STORY_FALLBACKS: StoryFallbackDef[] = [
  { key: 'story-travel-bulgaria.jpg', photoId: 'photo-1533105079780-92b9be482077', label: 'Bulgaria Travel / Leisure' },
  { key: 'story-automotive-lepas.jpg', photoId: 'photo-1552519507-da3b142c6e3d', label: 'LEPAS Automotive / Mobility' },
  { key: 'story-politics-psd.jpg', photoId: 'photo-1541872703-74c5e44368f9', label: 'Government / Institutional Administration' },
  { key: 'story-construction-strabag.jpg', photoId: 'photo-1503387762-592deb58ef4e', label: 'Heavy Construction & Tower Development' },
  { key: 'story-china-beijing.jpg', photoId: 'photo-1470071459604-3b5ec3a7fe05', label: 'Beijing Asian Financial District Skyline' },
  { key: 'story-retail-globus.jpg', photoId: 'photo-1578916171728-46686eac8d58', label: 'Retail Supermarket & Commercial Center' },
  { key: 'story-international-afghan.jpg', photoId: 'photo-1512453979798-5ea266f8880c', label: 'International Diplomacy / Embassy City' },
  { key: 'story-apple-tech-cia.jpg', photoId: 'photo-1519389950473-47ba0277781c', label: 'Silicon Valley Glass Tech Headquarters' },
  { key: 'story-opera-culture.jpg', photoId: 'photo-1514525253161-7a46d19cd819', label: 'Grand Opera Concert Hall & Theater' },
  { key: 'story-defense-bundeswehr.jpg', photoId: 'photo-1544620347-c4fd4a3d5957', label: 'Defense Infrastructure & Military Tech' },
  { key: 'story-nato-security.jpg', photoId: 'photo-1486406146926-c627a92ad1ab', label: 'NATO & International Security HQ' },
  { key: 'story-ai-startup.jpg', photoId: 'photo-1531482615713-2afd69097998', label: 'AI Venture Capital Innovation Hub' },
  { key: 'story-maritime-port.jpg', photoId: 'photo-1524522173746-f628baad3644', label: 'Maritime Tanker & Cargo Logistics Port' },
  { key: 'story-romanian-culture.jpg', photoId: 'photo-1524995997946-a1c2e315a42f', label: 'Historic Cultural Academy & Library' },
  { key: 'story-banking-finance.jpg', photoId: 'photo-1507679799987-c73779587ccf', label: 'Bank Headquarters & Stock Exchange' },
];

async function downloadStoryFallbacks() {
  const fallbacksDir = path.join(process.cwd(), 'public', 'fallbacks');
  if (!fs.existsSync(fallbacksDir)) fs.mkdirSync(fallbacksDir, { recursive: true });

  console.log('=== DOWNLOADING STORY-AWARE EDITORIAL PHOTOGRAPHY FALLBACKS ===\n');

  for (let i = 0; i < STORY_FALLBACKS.length; i++) {
    const item = STORY_FALLBACKS[i]!;
    const url = `https://images.unsplash.com/${item.photoId}?q=80&w=1200&h=896&auto=format&fit=crop`;
    const dest = path.join(fallbacksDir, item.key);

    console.log(`[${i + 1}/${STORY_FALLBACKS.length}] Downloading ${item.label} (${item.key}) ...`);
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

downloadStoryFallbacks().catch(e => console.error(e));
