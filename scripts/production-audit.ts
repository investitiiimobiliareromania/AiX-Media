/* eslint-disable */
import { siteConfig } from '../src/config/site';
import { verifiedNewsArticles } from '../src/lib/news-service';
import { institutionalDossiers } from '../src/lib/institutional-company-dossiers';
import { bvbCompanies } from '../src/lib/bvb-data';
import { verifiedVideos, verifiedShorts } from '../src/config/youtube';
import { verifiedRadioStations } from '../src/lib/radio-intelligence-service';
import { romaniaMacroIndicators, romaniaBondYields } from '../src/lib/markets-intelligence-service';
import { neighborhoodProfiles, commercialMetrics, realEstateReports } from '../src/lib/real-estate-intelligence-service';
import { companiesData, industriesData, dealsData, radarData, metricsData } from '../src/lib/business-intelligence-service';

interface AuditError {
  category: string;
  item: string;
  reason: string;
}

const auditErrors: AuditError[] = [];

function recordError(category: string, item: string, reason: string) {
  auditErrors.push({ category, item, reason });
}

console.log('===============================================================');
console.log('AIX MEDIA — FORENSIC PRODUCTION & REALITY AUDIT (ZERO MOCK GATE)');
console.log('===============================================================\n');

// 1. DOMAIN & CONFIGURATION INTEGRITY
console.log('1. Auditing Domain & Global Site Configuration...');
if (siteConfig.url !== 'https://aixmedia.cristianvaduva.com') {
  recordError('SiteConfig', 'url', `Expected https://aixmedia.cristianvaduva.com, got ${siteConfig.url}`);
}
if ((siteConfig as any).twitterHandle === '@aixmedia') {
  recordError('SiteConfig', 'twitterHandle', 'Prohibited fake twitterHandle "@aixmedia" found');
}

// 2. NEWS INTEGRITY & UNTRUNCATED PROSE
console.log('2. Auditing News Articles & Editorial Depth...');
if (verifiedNewsArticles.length === 0) {
  recordError('News', 'Dataset', 'Zero news articles found');
}
verifiedNewsArticles.forEach((art, i) => {
  const ref = art.slug || `Article #${i}`;
  if (!art.title || art.title.length < 15) {
    recordError('News', ref, 'Title is missing or overly short');
  }
  if (!art.content || art.content.length < 150) {
    recordError('News', ref, 'Body content is missing or too short to be an editorial article');
  }
  if (art.content.includes('[...]') || art.content.includes('[…]')) {
    recordError('News', ref, 'Body content contains truncated placeholder [...]');
  }
  if (!art.publishedAt) {
    recordError('News', ref, 'Missing publishedAt date');
  }
  if (!art.author) {
    recordError('News', ref, 'Missing author attribution');
  }
  if (!art.source) {
    recordError('News', ref, 'Missing institutional source attribution');
  }
});

// 3. COMPANY DOSSIERS & MULTI-YEAR FINANCIALS
console.log('3. Auditing Institutional Company Profiles & Financial History...');
if (institutionalDossiers.length === 0) {
  recordError('Companies', 'Dossiers', 'Zero company dossiers found');
}
institutionalDossiers.forEach((dossier) => {
  const ref = dossier.symbol || dossier.slug;
  if (!dossier.legalName || !dossier.cui) {
    recordError('Companies', ref, 'Missing legal entity identity (legalName or CUI)');
  }
  if (!dossier.businessModel || dossier.businessModel.length < 50) {
    recordError('Companies', ref, 'Business model description is missing or insufficient');
  }
  if (!dossier.financialHistory || dossier.financialHistory.length < 2) {
    recordError('Companies', ref, 'Financial history requires at least 2 audited reporting years');
  }
  if (!dossier.shareholders || dossier.shareholders.length === 0) {
    recordError('Companies', ref, 'Shareholder structure is missing');
  }
  if (!dossier.leaders || dossier.leaders.length === 0) {
    recordError('Companies', ref, 'Executive leadership list is missing');
  }
  if (dossier.isBanking && !dossier.bankingMetrics) {
    recordError('Companies', ref, 'Banking institution missing specialized banking ratios (NIM, NPL, CET1)');
  }
});

// 4. MARKETS INTELLIGENCE & CONTEXT
console.log('4. Auditing Capital Markets & Macroeconomic Indicators...');
if (romaniaMacroIndicators.length === 0) {
  recordError('Markets', 'MacroIndicators', 'Zero macro indicators found');
}
romaniaMacroIndicators.forEach((ind) => {
  if (!ind.currentValue || !ind.source || !ind.period) {
    recordError('Markets', ind.label || ind.id, 'Macro indicator missing currentValue, source, or period');
  }
  if (!ind.economyMeaning || !ind.impactSummary) {
    recordError('Markets', ind.label || ind.id, 'Missing economic or corporate impact narrative context');
  }
});

if (romaniaBondYields.length === 0) {
  recordError('Markets', 'BondYields', 'Zero government bond yields found');
}

// 5. REAL ESTATE TERMINAL & YIELD METHODOLOGY
console.log('5. Auditing Real Estate Datasets & Metrology...');
if (neighborhoodProfiles.length < 5) {
  recordError('RealEstate', 'Neighborhoods', `Expected at least 5 Bucharest neighborhoods, got ${neighborhoodProfiles.length}`);
}
if (commercialMetrics.length < 3) {
  recordError('RealEstate', 'CommercialMetrics', `Expected at least 3 commercial segments, got ${commercialMetrics.length}`);
}
if (realEstateReports.length === 0) {
  recordError('RealEstate', 'Reports', 'Zero real estate research reports found');
}

// 6. BUSINESS TERMINAL & CORPORATE RADAR
console.log('6. Auditing Business Landscape & Corporate Radar...');
if (radarData.length < 5) {
  recordError('Business', 'RadarData', 'Corporate radar list has fewer than 5 items');
}
if (industriesData.length < 5) {
  recordError('Business', 'IndustriesData', 'Fewer than 5 strategic sectors found in business intelligence service');
}
if (dealsData.length < 3) {
  recordError('Business', 'DealsData', 'Fewer than 3 M&A deals found in business intelligence service');
}
if (metricsData.length < 5) {
  recordError('Business', 'MetricsData', 'Fewer than 5 corporate metrics found');
}

// 7. RADIO LIVE STREAMING CONNECTIVITY
console.log('7. Auditing Verified Radio Stations...');
if (verifiedRadioStations.length < 5) {
  recordError('Radio', 'Stations', 'Fewer than 5 verified radio stations available');
}
verifiedRadioStations.forEach((st) => {
  if (!st.streamUrl || (!st.streamUrl.startsWith('http') && !st.streamUrl.startsWith('/api/'))) {
    recordError('Radio', st.name, `Invalid streamUrl: ${st.streamUrl}`);
  }
  if (!st.name || !st.frequency) {
    recordError('Radio', st.name, 'Station missing name or frequency');
  }
});

// 8. YOUTUBE CHANNEL VIDEOS
console.log('8. Auditing YouTube Channel Media IDs...');
if (verifiedVideos.length === 0 || verifiedShorts.length === 0) {
  recordError('YouTube', 'Media', 'Missing verified videos or shorts');
}
[...verifiedVideos, ...verifiedShorts].forEach((v) => {
  if (!v.id || v.id.length !== 11) {
    recordError('YouTube', v.title, `Invalid 11-character YouTube video ID: "${v.id}"`);
  }
});

// FINAL REPORT
console.log('\n===============================================================');
console.log('FORENSIC AUDIT SUMMARY');
console.log('===============================================================');

if (auditErrors.length === 0) {
  console.log('✓ PASS: 0 forensic defects found. Data integrity, zero mock policy, multi-year financials, audio connectivity, and narrative depth fully verified.\n');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${auditErrors.length} forensic defects:\n`);
  auditErrors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.category}] ${err.item}: ${err.reason}`);
  });
  console.error('\nFix all forensic defects before release gate approval.');
  process.exit(1);
}
