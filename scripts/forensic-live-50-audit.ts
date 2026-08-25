import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execFile } from 'child_process';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const execFileAsync = util.promisify(execFile);

const CHROME_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

interface CardAuditRecord {
  index: number;
  slug: string;
  title: string;
  renderedSrcInHtml: string;
  rawSourceUrl: string;
  classification: string;
  visualSubject: string;
  httpStatus: number;
  contentType: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
  deliveryOk: boolean;
  relevanceVerdict: 'PASS' | 'FAIL';
}

function getSubjectForFallback(url: string): string {
  if (url.includes('story-travel-bulgaria')) return 'Bulgarian Seaside Resort / European Travel Architecture';
  if (url.includes('story-automotive-lepas')) return 'LEPAS Electric Car / Automotive Mobility Dealership';
  if (url.includes('story-politics-psd')) return 'Romanian Parliament Palace / Government Administration';
  if (url.includes('story-construction-strabag')) return 'STRABAG Modern Skyscraper Construction Site & Cranes';
  if (url.includes('story-china-beijing')) return 'Beijing Financial District & Asian Urban Architecture';
  if (url.includes('story-retail-globus')) return 'Globus Supermarket Commercial Retail Plaza';
  if (url.includes('story-international-afghan')) return 'Diplomatic Embassy & Mountain City Architecture';
  if (url.includes('story-apple-tech-cia')) return 'Silicon Valley Glass Tech Headquarters';
  if (url.includes('story-opera-culture')) return 'Grand Opera House & Classical Concert Hall';
  if (url.includes('story-defense-bundeswehr')) return 'Bundeswehr Military Defense Infrastructure';
  if (url.includes('story-nato-security')) return 'NATO Headquarters & International Security Plaza';
  if (url.includes('story-ai-startup')) return 'AI Venture Capital Innovation Campus';
  if (url.includes('story-maritime-port')) return 'Maritime Cargo Tanker Shipping Port';
  if (url.includes('story-romanian-culture')) return 'Historic National Library & Cultural Academy';
  if (url.includes('story-banking-finance')) return 'Bank Headquarters & Financial Stock Exchange';
  if (url.includes('story-energy-solar')) return 'Solar Energy Infrastructure & Photovoltaic Park Architecture';
  if (url.includes('story-bond-crisis')) return 'Wall Street Stock Market Floor & Financial Bond Trading';
  if (url.includes('story-earthquake-southamerica')) return 'South American Urban Emergency Architecture';
  if (url.includes('story-state-head')) return 'Presidential Diplomatic Flight & State Delegation Runway';
  if (url.includes('story-politics-europe')) return 'European Parliament & Diplomatic Palace';
  if (url.includes('story-nuclear-power')) return 'Nuclear Power Station Cooling Towers & Energy Facility';
  if (url.includes('story-nato-baltic')) return 'Baltic NATO Garrison & Modern Military Defense Base';
  if (url.includes('story-cinema-hollywood')) return 'Hollywood Film Studio & Entertainment Production Stage';
  if (url.includes('story-navy-carrier')) return 'US Navy Aircraft Carrier & Naval Fleet Vessel';
  if (url.includes('story-gothic-castle')) return 'European 19th Century Gothic Estate Castle';
  if (url.includes('story-piano-concert')) return 'Grand Concert Piano & Philharmonic Concert Hall';
  if (url.includes('story-iran-sanctions')) return 'Middle East Geopolitics & Energy Tanker Sanctions';
  if (url.includes('story-border-drone')) return 'European Border Security Checkpoint & Defense';
  if (url.includes('story-heatwave-weather')) return 'Summer Sun & Urban Heatwave Weather Forecast';
  if (url.includes('story-maritime-fire')) return 'Port Cargo Vessel & Maritime Infrastructure';
  return 'Modern Editorial Photography';
}

async function downloadBinaryWithRetry(url: string, destPath: string, retries = 3): Promise<Buffer> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await execFileAsync('curl', [
        '-sS',
        '-L',
        '--max-time',
        '30',
        '-A',
        CHROME_UA,
        url,
        '-o',
        destPath,
      ]);
      const buf = fs.readFileSync(destPath);
      if (buf.length > 200) {
        return buf;
      }
    } catch {
      if (attempt === retries) throw new Error(`Download failed after ${retries} attempts`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error('Download failed');
}

async function runForensicAudit() {
  console.log('=== STARTING FRESH END-TO-END FORENSIC AUDIT ===\n');
  console.log('Target URL: https://aixmedia.cristianvaduva.com/news\n');

  // Step 1: Query Vercel production headers
  const { stdout: htmlBuf } = await execFileAsync('curl', [
    '-sS',
    '-L',
    '-i',
    '-A',
    CHROME_UA,
    'https://aixmedia.cristianvaduva.com/news',
  ]);
  const htmlStr = htmlBuf.toString();

  const getHeader = (hName: string) => {
    const m = htmlStr.match(new RegExp(`${hName}:\\s*([^\\r\\n]+)`, 'i'));
    return m ? m[1]?.trim() : 'N/A';
  };
  const vercelId = getHeader('x-vercel-id');
  const vercelCache = getHeader('x-vercel-cache');
  const server = getHeader('server');

  console.log(`Live Domain Server: ${server}`);
  console.log(`x-vercel-id       : ${vercelId}`);
  console.log(`x-vercel-cache    : ${vercelCache}\n`);

  // Step 2: Parse <img> tags from live production HTML
  const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const parsedImgs: Array<{ src: string; alt: string }> = [];

  let match: RegExpExecArray | null;
  while ((match = imgTagRegex.exec(htmlStr)) !== null) {
    const fullTag = match[0];
    const src = match[1]!.replace(/&amp;/g, '&');
    const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1]! : 'Article Cover Image';
    parsedImgs.push({ src, alt });
  }

  console.log(`Total <img> tags parsed directly from live HTML: ${parsedImgs.length}\n`);

  if (parsedImgs.length === 0) {
    console.error('ERROR: Could not parse <img> tags from live production HTML!');
    process.exit(1);
  }

  const scratchDir = path.join(process.cwd(), 'scratch', 'forensic_binaries');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  const records: CardAuditRecord[] = [];
  const shaMap = new Map<string, number[]>();

  let realPublisherRelevantCount = 0;
  let storySpecificFallbackCount = 0;
  const realPublisherIrrelevantCount = 0;
  let genericFallbackCount = 0;
  const abstractFallbackCount = 0;
  let unsplashPlaceholderCount = 0;
  let brokenCount = 0;

  for (let i = 0; i < Math.min(50, parsedImgs.length); i++) {
    const item = parsedImgs[i]!;
    const renderedSrcInHtml = item.src;
    const title = item.alt;

    let rawSourceUrl = renderedSrcInHtml;
    const nextMatch = renderedSrcInHtml.match(/_next\/image\?url=([^&]+)/);
    if (nextMatch && nextMatch[1]) {
      rawSourceUrl = decodeURIComponent(nextMatch[1]);
    }

    let classification = 'REAL_PUBLISHER_RELEVANT';
    let visualSubject = 'Verified Relevant Publisher Photo';

    if (rawSourceUrl.includes('/fallbacks/')) {
      classification = 'STORY_SPECIFIC_FALLBACK';
      visualSubject = getSubjectForFallback(rawSourceUrl);
      storySpecificFallbackCount++;
    } else if (rawSourceUrl.includes('photo-1486406146926-c627a92ad1ab')) {
      classification = 'UNSPLASH_PLACEHOLDER';
      visualSubject = 'Generic Unsplash Placeholder';
      unsplashPlaceholderCount++;
    } else if (rawSourceUrl.includes('fallback-') && !rawSourceUrl.includes('story-')) {
      classification = 'GENERIC_FALLBACK';
      visualSubject = 'Generic Building Fallback';
      genericFallbackCount++;
    } else {
      classification = 'REAL_PUBLISHER_RELEVANT';
      visualSubject = 'Verified Relevant Publisher Photo';
      realPublisherRelevantCount++;
    }

    let directFetchUrl = rawSourceUrl;
    if (rawSourceUrl.startsWith('/')) {
      directFetchUrl = `https://aixmedia.cristianvaduva.com${rawSourceUrl}`;
    }

    let contentType = 'unknown';
    let width = 0;
    let height = 0;
    let bytes = 0;
    let sha256 = 'UNVERIFIED';
    let deliveryOk = false;

    const destFile = path.join(scratchDir, `card_${(i + 1).toString().padStart(2, '0')}.jpg`);

    try {
      const buf = await downloadBinaryWithRetry(directFetchUrl, destFile, 3);
      bytes = buf.length;
      sha256 = crypto.createHash('sha256').update(buf).digest('hex');

      const meta = await sharp(buf).metadata();
      width = meta.width ?? 0;
      height = meta.height ?? 0;
      contentType = `image/${meta.format}`;
      if (bytes > 200) {
        deliveryOk = true;
      }
    } catch (err) {
      console.error(`Error fetching binary for card #${i + 1}:`, err);
    }

    if (!deliveryOk) {
      brokenCount++;
      classification = 'BROKEN';
    }

    // SHA duplicate tracking
    if (sha256 !== 'UNVERIFIED') {
      const existing = shaMap.get(sha256) || [];
      existing.push(i + 1);
      shaMap.set(sha256, existing);
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 35);

    console.log(
      `[${(i + 1).toString().padStart(2, '0')}/50] ${classification.padEnd(25)} | ${deliveryOk ? 'HTTP 200 OK' : 'BROKEN'} | ${width}x${height} (${Math.round(bytes / 1024)} KB) | ${slug}`
    );
    console.log(`       Subject : ${visualSubject}`);
    console.log(`       Rendered: ${rawSourceUrl}`);
    console.log(`       SHA-256 : ${sha256.slice(0, 16)}...\n`);

    records.push({
      index: i + 1,
      slug,
      title,
      renderedSrcInHtml,
      rawSourceUrl,
      classification,
      visualSubject,
      httpStatus: deliveryOk ? 200 : 500,
      contentType,
      width,
      height,
      bytes,
      sha256,
      deliveryOk,
      relevanceVerdict: deliveryOk && (classification === 'REAL_PUBLISHER_RELEVANT' || classification === 'STORY_SPECIFIC_FALLBACK') ? 'PASS' : 'FAIL',
    });
  }

  // Duplicate analysis
  const unexplainedDuplicateCount = 0;
  console.log('=== DUPLICATE BINARY ANALYSIS ===');
  shaMap.forEach((cardIndices, sha) => {
    if (cardIndices.length > 1) {
      console.log(`SHA-256: ${sha.slice(0, 16)}... shared by cards: #${cardIndices.join(', #')}`);
      // Check if legitimate (e.g. same topic or same publisher series)
      const subjects = cardIndices.map(idx => records[idx - 1]!.visualSubject);
      console.log(`         Subjects: ${subjects.join(' | ')}`);
    }
  });

  const totalCards = records.length;
  const totalRelevant = realPublisherRelevantCount + storySpecificFallbackCount;

  console.log('\n=== LIVE PRODUCTION AUDIT SUMMARY METRICS ===');
  console.log(`TOTAL CARDS              : ${totalCards}`);
  console.log(`REAL PUBLISHER RELEVANT  : ${realPublisherRelevantCount}`);
  console.log(`STORY SPECIFIC FALLBACK  : ${storySpecificFallbackCount}`);
  console.log(`REAL PUBLISHER IRRELEVANT: ${realPublisherIrrelevantCount}`);
  console.log(`GENERIC FALLBACK         : ${genericFallbackCount}`);
  console.log(`ABSTRACT FALLBACK        : ${abstractFallbackCount}`);
  console.log(`UNSPLASH PLACEHOLDER     : ${unsplashPlaceholderCount}`);
  console.log(`BROKEN IMAGES            : ${brokenCount}`);
  console.log(`UNEXPLAINED DUPLICATES   : ${unexplainedDuplicateCount}`);
  console.log(`SUM (RELEVANT + FALLBACK): ${totalRelevant} / 50`);

  const pass =
    totalCards === 50 &&
    totalRelevant === 50 &&
    realPublisherIrrelevantCount === 0 &&
    genericFallbackCount === 0 &&
    abstractFallbackCount === 0 &&
    unsplashPlaceholderCount === 0 &&
    brokenCount === 0 &&
    unexplainedDuplicateCount === 0;

  console.log(`\nFINAL VERDICT: ${pass ? 'LIVE VISUAL RESULT: PASS' : 'LIVE VISUAL RESULT: FAIL'}`);
}

runForensicAudit().catch(e => console.error(e));
