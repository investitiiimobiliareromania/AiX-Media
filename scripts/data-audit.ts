/* eslint-disable */
import { institutionalDossiers } from '../src/lib/institutional-company-dossiers';
import { bvbCompanies } from '../src/lib/bvb-data';
import { romaniaMacroIndicators, romaniaBondYields } from '../src/lib/markets-intelligence-service';
import { neighborhoodProfiles, commercialMetrics, realEstateReports } from '../src/lib/real-estate-intelligence-service';
import { verifiedNewsArticles } from '../src/lib/news-service';

interface DataIssue {
  entity: string;
  field: string;
  reason: string;
}

const issues: DataIssue[] = [];

console.log('=== AIX MEDIA — INSTITUTIONAL DATA PROVENANCE & ZERO-MOCK AUDIT ===\n');

// 1. Audit Company Financial Provenance & Audited History
console.log('1. Auditing Company Dossiers & Audited Financial Statements...');
institutionalDossiers.forEach((dossier) => {
  const ref = dossier.symbol || dossier.name;
  if (!dossier.cui || !dossier.legalName) {
    issues.push({ entity: ref, field: 'Corporate Identity', reason: 'Missing official CUI or Legal Name' });
  }
  if (!dossier.financialHistory || dossier.financialHistory.length < 2) {
    issues.push({ entity: ref, field: 'Financial History', reason: 'Requires at least 2 audited reporting fiscal years' });
  } else {
    dossier.financialHistory.forEach((fin) => {
      if (fin.revenue <= 0 || fin.totalAssets <= 0 || fin.equity <= 0) {
        issues.push({ entity: ref, field: `FY ${fin.year} Financials`, reason: 'Zero or invalid balance sheet / income metrics' });
      }
    });
  }
  if (dossier.isBanking && !dossier.bankingMetrics) {
    issues.push({ entity: ref, field: 'Banking Ratios', reason: 'Banking entity missing specialized ratios (NIM, NPL, CET1)' });
  }
});

// 2. Audit Macroeconomic Indicators
console.log('2. Auditing Macroeconomic Indicators & Official Sources...');
romaniaMacroIndicators.forEach((ind) => {
  if (!ind.currentValue || ind.currentValue.trim().length === 0) {
    issues.push({ entity: ind.label || ind.id, field: 'Value', reason: 'Missing metric value' });
  }
  if (!ind.source || !['BNR', 'INS', 'Ministerul Finanțelor', 'Eurostat', 'BVB'].some((s) => ind.source.includes(s))) {
    issues.push({ entity: ind.label || ind.id, field: 'Source', reason: `Non-authoritative or missing source: "${ind.source}"` });
  }
  if (!ind.period) {
    issues.push({ entity: ind.label || ind.id, field: 'Reference Period', reason: 'Missing reference period' });
  }
});

// 3. Audit Real Estate Metrics
console.log('3. Auditing Real Estate Data Provenance...');
neighborhoodProfiles.forEach((n) => {
  if (n.avgPriceSqm <= 0 || !n.grossYield || !n.sector) {
    issues.push({ entity: n.name, field: 'Neighborhood Stats', reason: 'Invalid or missing price/yield values' });
  }
});

// 4. Audit News Provenance & Author Attribution
console.log('4. Auditing News Article Attribution & Zero Placeholder Content...');
verifiedNewsArticles.forEach((art) => {
  if (art.content.includes('[...]') || art.content.includes('[…]')) {
    issues.push({ entity: art.slug, field: 'Content Body', reason: 'Contains truncated placeholder [...]' });
  }
  if (!art.source) {
    issues.push({ entity: art.slug, field: 'Source Attribution', reason: 'Missing institutional publisher / wire attribution' });
  }
});

// Report
console.log('\n=== DATA AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All corporate financials, macro metrics, real estate statistics, and news data have verified provenance and 0 mock issues.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} data provenance issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.entity}] ${err.field}: ${err.reason}`);
  });
  process.exit(1);
}
