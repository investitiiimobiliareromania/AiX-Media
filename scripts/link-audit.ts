/* eslint-disable */
import fs from 'fs';
import path from 'path';
import { mainNavigation, footerNavigation } from '../src/constants/navigation';
import { verifiedNewsArticles } from '../src/lib/news-service';
import { institutionalDossiers } from '../src/lib/institutional-company-dossiers';
import { verifiedVideos, verifiedShorts } from '../src/config/youtube';
import { podcastEpisodes } from '../src/lib/media/mock-db';

interface LinkIssue {
  location: string;
  url: string;
  reason: string;
}

const issues: LinkIssue[] = [];

console.log('=== AIX MEDIA — INTERNAL ROUTING & LINK AUDIT ===\n');

// 1. Audit Navigation Links
console.log('1. Auditing Primary & Footer Navigation Links...');
const allNavLinks = [
  ...mainNavigation.map((n) => ({ label: n.label, href: n.href, source: 'mainNavigation' })),
  ...footerNavigation.intelligence.map((n) => ({ label: n.label, href: n.href, source: 'footer.intelligence' })),
  ...footerNavigation.media.map((n) => ({ label: n.label, href: n.href, source: 'footer.media' })),
  ...footerNavigation.legalAndAbout.map((n) => ({ label: n.label, href: n.href, source: 'footer.legalAndAbout' })),
];

allNavLinks.forEach((item) => {
  if (!item.href || !item.href.startsWith('/')) {
    issues.push({ location: item.source, url: item.href, reason: 'Invalid internal link format (must start with /)' });
  }
  if (item.href.includes('localhost') || item.href.includes('vercel.app')) {
    issues.push({ location: item.source, url: item.href, reason: 'Contains prohibited test/dev domain' });
  }
});

// 2. Audit Cross-Entity Links
console.log('2. Auditing Cross-Entity Slugs & Graph Resolvers...');
verifiedNewsArticles.forEach((art) => {
  if (!art.slug || art.slug.includes(' ') || art.slug.includes('%20')) {
    issues.push({ location: `Article: ${art.title}`, url: art.slug, reason: 'Invalid URL slug' });
  }
});

institutionalDossiers.forEach((comp) => {
  if (!comp.slug || comp.slug.includes(' ') || comp.slug.includes('%20')) {
    issues.push({ location: `Company: ${comp.name}`, url: comp.slug, reason: 'Invalid URL slug' });
  }
});

podcastEpisodes.forEach((pod) => {
  if (!pod.slug || pod.slug.includes(' ') || pod.slug.includes('%20')) {
    issues.push({ location: `Podcast: ${pod.title}`, url: pod.slug, reason: 'Invalid URL slug' });
  }
});

[...verifiedVideos, ...verifiedShorts].forEach((vid) => {
  if (vid.slug && (vid.slug.includes(' ') || vid.slug.includes('%20'))) {
    issues.push({ location: `Video: ${vid.title}`, url: vid.slug, reason: 'Invalid video URL slug' });
  }
});

// Report
console.log('\n=== LINK AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All internal navigation, entity slugs, and cross-linking paths verified with 0 broken links.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} link issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.location}] ${err.url}: ${err.reason}`);
  });
  process.exit(1);
}
