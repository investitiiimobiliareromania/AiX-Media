/* eslint-disable */
import fs from 'fs';
import path from 'path';
import { siteConfig } from '../src/config/site';
import { verifiedNewsArticles } from '../src/lib/news-service';
import { institutionalDossiers } from '../src/lib/institutional-company-dossiers';
import { bvbCompanies } from '../src/lib/bvb-data';
import { verifiedVideos, verifiedShorts } from '../src/config/youtube';

interface SeoIssue {
  type: 'error' | 'warning';
  file?: string;
  message: string;
}

const issues: SeoIssue[] = [];

function check(condition: boolean, message: string, file?: string) {
  if (!condition) {
    issues.push({ type: 'error', message, file });
  }
}

console.log('=== AIX MEDIA — COMPREHENSIVE AUTOMATED TECHNICAL SEO & ENTITY GRAPH GATE ===\n');

// 1. Site Configuration & Domain Standards
console.log('1. Auditing Site Configuration...');
check(siteConfig.url === 'https://aixmedia.cristianvaduva.com', `siteConfig.url must be https://aixmedia.cristianvaduva.com, got "${siteConfig.url}"`);
check(siteConfig.language === 'ro', `siteConfig.language must be "ro", got "${siteConfig.language}"`);
check(siteConfig.locale === 'ro_RO', `siteConfig.locale must be "ro_RO", got "${siteConfig.locale}"`);
check(!('twitterHandle' in siteConfig) || (siteConfig as any).twitterHandle !== '@aixmedia', 'Found prohibited twitterHandle "@aixmedia" in siteConfig');

// 2. Prohibited Patterns & Leaks in src/
console.log('2. Scanning Source Code for Canonical, NoIndex & Social Leaks...');
const prohibitedRegexes = [
  { regex: /canonical:\s*["']https?:\/\/(?!aixmedia\.cristianvaduva\.com)[^"']*vercel\.app/i, desc: 'Vercel deployment canonical found' },
  { regex: /canonical:\s*["']https?:\/\/localhost/i, desc: 'Localhost canonical found' },
  { regex: /robots:\s*\{[^}]*index:\s*false/i, desc: 'Accidental noindex rule in public metadata' },
  { regex: /["']@aixmedia["']/i, desc: 'Found fake Twitter/X handle "@aixmedia"' },
  { regex: /twitter\.com\/aixmedia/i, desc: 'Found fake twitter.com/aixmedia URL' },
  { regex: /x\.com\/aixmedia/i, desc: 'Found fake x.com/aixmedia URL' },
];

function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        scanDirectory(fullPath);
      }
    } else if (/\.(tsx|ts|js|jsx|json|html)$/.test(entry.name)) {
      if (entry.name === 'seo-check.ts' || entry.name === 'content-integrity-check.js') continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const rule of prohibitedRegexes) {
        if (rule.regex.test(content)) {
          issues.push({ type: 'error', file: fullPath, message: `${rule.desc}: matched ${rule.regex}` });
        }
      }
    }
  }
}

scanDirectory(path.join(process.cwd(), 'src'));

// 3. Duplicate Titles & Descriptions Check
console.log('3. Checking for Duplicate Metadata Titles & Descriptions...');
const titlesSeen = new Map<string, string>();
const descriptionsSeen = new Map<string, string>();

verifiedNewsArticles.forEach((art) => {
  const ref = `Article: /news/${art.slug}`;
  if (titlesSeen.has(art.title)) {
    issues.push({ type: 'error', message: `Duplicate article title "${art.title}" between ${ref} and ${titlesSeen.get(art.title)}` });
  } else {
    titlesSeen.set(art.title, ref);
  }

  if (descriptionsSeen.has(art.excerpt)) {
    issues.push({ type: 'error', message: `Duplicate article description between ${ref} and ${descriptionsSeen.get(art.excerpt)}` });
  } else {
    descriptionsSeen.set(art.excerpt, ref);
  }
});

// 4. Articles SEO & NewsArticle Completeness
console.log('4. Validating Published News Articles Metadata & NewsArticle Schema...');
check(verifiedNewsArticles.length > 0, 'Zero raw news articles found in news-service.ts');

verifiedNewsArticles.forEach((art, idx) => {
  const ref = art.slug || art.id || `Article #${idx}`;
  check(Boolean(art.title && art.title.trim().length > 10), `Article [${ref}] has missing or overly short title`);
  check(Boolean(art.excerpt && art.excerpt.trim().length > 20), `Article [${ref}] has missing or overly short excerpt`);
  check(Boolean(art.slug && !art.slug.includes(' ')), `Article [${ref}] has invalid slug`);
  check(Boolean(art.image && (art.image.startsWith('http') || art.image.startsWith('/'))), `Article [${ref}] has missing or invalid cover image`);
  check(Boolean(art.publishedAt), `Article [${ref}] has missing publishedAt date`);
  check(Boolean(art.author), `Article [${ref}] has missing author`);
  check(!art.content.includes('[…]') && !art.content.includes('[...]'), `Article [${ref}] has truncated body content`);
});

// 5. Company Dossiers & Corporation Schema Completeness
console.log('5. Validating Company Dossiers & BVB Entities...');
const allCompanies = [...institutionalDossiers, ...bvbCompanies];
check(allCompanies.length > 0, 'Zero company profiles found in datasets');

allCompanies.forEach((comp) => {
  const ref = comp.slug || comp.name;
  check(Boolean(comp.name && comp.name.trim().length > 2), `Company [${ref}] has missing name`);
  check(Boolean(comp.slug && !comp.slug.includes(' ')), `Company [${ref}] has invalid slug`);
  const desc = (comp as any).executiveSummary || (comp as any).description;
  check(Boolean(desc && desc.trim().length > 15), `Company [${ref}] has missing or overly short description`);
});

// 6. Video & Media SEO Completeness
console.log('6. Validating Media Entities (Videos)...');
verifiedVideos.forEach((vid) => {
  check(Boolean(vid.id && vid.id.length === 11), `Video [${vid.title}] has invalid YouTube ID "${vid.id}"`);
  check(Boolean(vid.title && vid.title.length > 5), `Video [${vid.id}] has missing title`);
  check(Boolean(vid.url && vid.url.startsWith('https://www.youtube.com')), `Video [${vid.id}] has invalid URL`);
});

// 7. Report & Exit
console.log('\n=== AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All technical SEO, structured data, entity graphs, canonicals, and metadata checks passed with 0 errors.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} SEO issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err.file ? `[${err.file}] ` : ''}${err.message}`);
  });
  process.exit(1);
}
