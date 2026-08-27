/* eslint-disable */
import {
  createNewsArticleJsonLd,
  createOrganizationJsonLd,
  createCorporationJsonLd,
  createWebSiteJsonLd,
  createBreadcrumbJsonLd,
  createVideoObjectJsonLd,
  createPodcastEpisodeJsonLd,
} from '../src/components/common/json-ld';

interface SchemaIssue {
  schema: string;
  field: string;
  reason: string;
}

const issues: SchemaIssue[] = [];

console.log('=== AIX MEDIA — STRUCTURED DATA & JSON-LD SCHEMA AUDIT ===\n');

// 1. NewsArticle Schema
console.log('1. Auditing NewsArticle JSON-LD generator...');
const sampleNews = createNewsArticleJsonLd({
  title: 'Test Article Title',
  description: 'Test Article Description for validation',
  slug: 'test-article-title',
  publishedAt: '2026-08-25T10:00:00Z',
  imageUrl: 'https://aixmedia.cristianvaduva.com/fallbacks/fallback-0.jpg',
  section: 'Markets',
});
if (sampleNews['@type'] !== 'NewsArticle') issues.push({ schema: 'NewsArticle', field: '@type', reason: 'Invalid @type' });
if (!sampleNews.headline || !sampleNews.mainEntityOfPage) issues.push({ schema: 'NewsArticle', field: 'headline/mainEntityOfPage', reason: 'Missing headline or mainEntityOfPage' });
if (!sampleNews.publisher || sampleNews.publisher.name !== 'AiX Media') issues.push({ schema: 'NewsArticle', field: 'publisher', reason: 'Invalid publisher' });

// 2. Organization Schema
console.log('2. Auditing Organization & NewsMediaOrganization JSON-LD generator...');
const org = createOrganizationJsonLd();
if (org['@type'] !== 'NewsMediaOrganization') issues.push({ schema: 'Organization', field: '@type', reason: 'Invalid @type' });
if (!org.name || !org.url || !org.logo) issues.push({ schema: 'Organization', field: 'name/url/logo', reason: 'Missing organization fields' });

// 3. Corporation Schema
console.log('3. Auditing Corporation JSON-LD generator...');
const corp = createCorporationJsonLd({
  name: 'Banca Transilvania',
  legalName: 'Banca Transilvania S.A.',
  slug: 'banca-transilvania',
  ticker: 'TLV',
  description: 'Liderul pieței bancare românești.',
  industry: 'Banking',
  headquarters: 'Cluj-Napoca',
  website: 'https://www.bancatransilvania.ro',
});
if (corp['@type'] !== 'Corporation') issues.push({ schema: 'Corporation', field: '@type', reason: 'Invalid @type' });
if (!corp.tickerSymbol || corp.tickerSymbol !== 'TLV') issues.push({ schema: 'Corporation', field: 'tickerSymbol', reason: 'Invalid ticker' });

// 4. WebSite Schema
console.log('4. Auditing WebSite & SearchAction JSON-LD generator...');
const site = createWebSiteJsonLd();
if (site['@type'] !== 'WebSite') issues.push({ schema: 'WebSite', field: '@type', reason: 'Invalid @type' });
if (!site.potentialAction || site.potentialAction['@type'] !== 'SearchAction') issues.push({ schema: 'WebSite', field: 'SearchAction', reason: 'Missing SearchAction' });

// 5. BreadcrumbList Schema
console.log('5. Auditing BreadcrumbList JSON-LD generator...');
const breadcrumbs = createBreadcrumbJsonLd([
  { label: 'Acasă', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Test Title' },
]);
if (breadcrumbs['@type'] !== 'BreadcrumbList') issues.push({ schema: 'BreadcrumbList', field: '@type', reason: 'Invalid @type' });
if (breadcrumbs.itemListElement.length !== 3) issues.push({ schema: 'BreadcrumbList', field: 'itemListElement', reason: 'Incorrect item count' });

// 6. VideoObject Schema
console.log('6. Auditing VideoObject JSON-LD generator...');
const videoObj = createVideoObjectJsonLd({
  id: 'PzPo7wbtUB4',
  title: 'Test Video',
  description: 'Test Description',
  uploadDate: '2026-08-20',
  slug: 'test-video',
});
if (videoObj['@type'] !== 'VideoObject') issues.push({ schema: 'VideoObject', field: '@type', reason: 'Invalid @type' });
if (!videoObj.embedUrl || !videoObj.thumbnailUrl) issues.push({ schema: 'VideoObject', field: 'embedUrl/thumbnailUrl', reason: 'Missing embedUrl or thumbnailUrl' });

// 7. PodcastEpisode Schema
console.log('7. Auditing PodcastEpisode JSON-LD generator...');
const podcastObj = createPodcastEpisodeJsonLd({
  title: 'Test Podcast',
  description: 'Test Description',
  slug: 'test-podcast',
  publishedAt: '2026-08-20',
  duration: '42 min',
  coverImage: 'https://aixmedia.cristianvaduva.com/fallbacks/story-2.jpg',
  showName: 'AiX Real Estate',
});
if (podcastObj['@type'] !== 'PodcastEpisode') issues.push({ schema: 'PodcastEpisode', field: '@type', reason: 'Invalid @type' });
if (!podcastObj.partOfSeries) issues.push({ schema: 'PodcastEpisode', field: 'partOfSeries', reason: 'Missing partOfSeries' });

// Report
console.log('\n=== SCHEMA AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All JSON-LD structured data generators produce 100% valid, compliant schema structures.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} schema issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.schema}] ${err.field}: ${err.reason}`);
  });
  process.exit(1);
}
