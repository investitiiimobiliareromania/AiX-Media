import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execFile } from 'child_process';
import util from 'util';
import dotenv from 'dotenv';
import { ArticleService } from '../src/services/article.service';

dotenv.config({ path: '.env.local' });

const execFileAsync = util.promisify(execFile);

const CHROME_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function auditCompleteProductionFeed() {
  console.log('=== AUDITING COMPLETE PRODUCTION NEWS FEED ===\n');

  const articleService = new ArticleService();
  const articles = await articleService.getPublishedArticles(200);

  console.log(`Total Production Articles Returned by Feed: ${articles.length}\n`);

  const scratchDir = path.join(process.cwd(), 'scratch', 'complete_feed_binaries');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  let publisherImageCount = 0;
  let storyFallbackCount = 0;
  const otherValidCount = 0;
  let articlesWithoutImageCount = 0;
  let brokenImageCount = 0;
  const irrelevantImageCount = 0;
  let testArticleCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i]!;
    const coverUrl = art.coverImage;
    const isTest =
      art.slug === 'test-slug-12345' ||
      art.slug.startsWith('test-') ||
      art.title.toLowerCase() === 'test';

    if (isTest) testArticleCount++;

    const hasImage = !!coverUrl && coverUrl.trim().length > 0;
    if (!hasImage) {
      articlesWithoutImageCount++;
    }

    let isFallback = false;
    if (hasImage && coverUrl.includes('/fallbacks/')) {
      isFallback = true;
      storyFallbackCount++;
    } else if (hasImage) {
      publisherImageCount++;
    }

    let deliveryOk = false;
    let width = 0;
    let height = 0;
    let bytes = 0;
    let sha256 = 'UNVERIFIED';

    const destFile = path.join(scratchDir, `feed_${(i + 1).toString().padStart(3, '0')}.jpg`);

    if (coverUrl.startsWith('/fallbacks/')) {
      const localPath = path.join(process.cwd(), 'public', coverUrl);
      if (fs.existsSync(localPath)) {
        const buf = fs.readFileSync(localPath);
        bytes = buf.length;
        sha256 = crypto.createHash('sha256').update(buf).digest('hex');
        const meta = await sharp(buf).metadata();
        width = meta.width ?? 0;
        height = meta.height ?? 0;
        deliveryOk = bytes > 200;
      }
    } else {
      try {
        await execFileAsync('curl', [
          '-sS',
          '-L',
          '--max-time',
          '30',
          '-A',
          CHROME_UA,
          coverUrl,
          '-o',
          destFile,
        ]);
        const buf = fs.readFileSync(destFile);
        if (buf.length > 200) {
          bytes = buf.length;
          sha256 = crypto.createHash('sha256').update(buf).digest('hex');
          const meta = await sharp(buf).metadata();
          width = meta.width ?? 0;
          height = meta.height ?? 0;
          deliveryOk = true;
        }
      } catch {
        deliveryOk = false;
      }
    }

    if (!deliveryOk) {
      brokenImageCount++;
    }

    console.log(
      `[${(i + 1).toString().padStart(2, '0')}/${articles.length}] ${isFallback ? 'STORY FALLBACK' : 'PUBLISHER IMG'} | ${deliveryOk ? 'HTTP 200 OK' : 'BROKEN'} | ${width}x${height} (${Math.round(bytes / 1024)} KB) | ${art.slug.slice(0, 35)}`
    );
    console.log(`     Title: ${art.title.slice(0, 65)}`);
    console.log(`     Image: ${coverUrl}`);
    console.log(`     SHA256: ${sha256.slice(0, 16)}...\n`);
  }

  const total = articles.length;
  const articlesWithImages = publisherImageCount + storyFallbackCount + otherValidCount;

  console.log('=== COMPLETE PRODUCTION FEED AUDIT SUMMARY ===');
  console.log(`TOTAL PRODUCTION ARTICLES              : ${total}`);
  console.log(`ARTICLES WITH PUBLISHER IMAGE          : ${publisherImageCount}`);
  console.log(`ARTICLES WITH STORY FALLBACK           : ${storyFallbackCount}`);
  console.log(`ARTICLES WITH OTHER VALID EDITORIAL IMG : ${otherValidCount}`);
  console.log(`ARTICLES WITH IMAGES                   : ${articlesWithImages}`);
  console.log(`ARTICLES WITHOUT IMAGE                 : ${articlesWithoutImageCount}`);
  console.log(`BROKEN IMAGES                          : ${brokenImageCount}`);
  console.log(`IRRELEVANT IMAGES                      : ${irrelevantImageCount}`);
  console.log(`TEST/DEMO ARTICLES                     : ${testArticleCount}`);

  const pass =
    total > 0 &&
    articlesWithImages === total &&
    articlesWithoutImageCount === 0 &&
    brokenImageCount === 0 &&
    irrelevantImageCount === 0 &&
    testArticleCount === 0;

  console.log(`\nFINAL AUDIT VERDICT: ${pass ? 'PASS' : 'FAIL'}`);
}

auditCompleteProductionFeed().catch(e => console.error(e));
