import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execFile } from 'child_process';
import util from 'util';

const execFileAsync = util.promisify(execFile);

// 10 Genuinely different architectural building photography IDs
const photoIds = [
  'photo-1545324418-cc1a3fa10c00', // 0: Modern apartment / residential building exterior
  'photo-1577495508048-b635879837f1', // 1: High-rise glass skyscraper facade
  'photo-1506146332389-18140dc7b2fb', // 2: Modern urban architectural geometry
  'photo-1479839672679-a46483c0e7c8', // 3: European city office building architecture
  'photo-1512917774080-9991f1c4c750', // 4: Luxury residential tower exterior
  'photo-1507679799987-c73779587ccf', // 5: Corporate headquarters glass building
  'photo-1486325212027-8081e485255e', // 6: Contemporary glass office complex
  'photo-1554469384-e58fac16e23a', // 7: Modern glass building skyscraper facade
  'photo-1497366216548-37526070297c', // 8: Commercial business center architecture
  'photo-1513694203232-719a280e022f', // 9: Modern architectural pavilion & glass facade
];

async function downloadAll() {
  const fallbacksDir = path.join(process.cwd(), 'public', 'fallbacks');
  if (!fs.existsSync(fallbacksDir)) fs.mkdirSync(fallbacksDir, { recursive: true });

  console.log('Downloading 10 distinct architectural photography fallbacks...\n');

  for (let i = 0; i < photoIds.length; i++) {
    const id = photoIds[i];
    const url = `https://images.unsplash.com/${id}?q=80&w=1200&h=896&auto=format&fit=crop`;
    const dest = path.join(fallbacksDir, `fallback-${i}.jpg`);

    console.log(`[${i}/9] Downloading ${id} -> fallback-${i}.jpg ...`);
    try {
      await execFileAsync('curl', ['-sS', '-L', '--max-time', '20', '-A', 'Mozilla/5.0', url, '-o', dest]);
      const buf = fs.readFileSync(dest);
      const meta = await sharp(buf).metadata();
      console.log(`       Saved: ${meta.width}x${meta.height}, ${buf.length} bytes, format: ${meta.format}`);
    } catch (err) {
      console.error(`       Error downloading fallback-${i}.jpg:`, err);
    }
  }
}

downloadAll().catch(e => console.error(e));
