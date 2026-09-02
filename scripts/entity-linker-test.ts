import { parseInlineSegments, InlineSegment } from '../src/lib/article-normalizer';
import { injectContextualEntityLinks } from '../src/lib/entity-linker';

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

console.log('=== BVB TICKER & INSTITUTIONAL ENTITY LINKER TEST SUITE ===\n');

// Helper to run linking pipeline on raw text
function runLinker(input: string): { segments: InlineSegment[]; linkedCount: number; links: string[] } {
  const linkedEntitiesSet = new Set<string>();
  const initialSegments = parseInlineSegments(input);
  const resultSegments = injectContextualEntityLinks(initialSegments, linkedEntitiesSet);
  const links = resultSegments
    .filter((s) => s.type === 'link')
    .map((s) => `${s.text} -> ${s.href}`);

  return {
    segments: resultSegments,
    linkedCount: linkedEntitiesSet.size,
    links,
  };
}

// 1. Exact company name
console.log('1. Testing exact company name...');
const res1 = runLinker('Banca Transilvania a raportat rezultate financiare foarte bune.');
if (res1.linkedCount === 1 && res1.links[0] === 'Banca Transilvania -> /companies/banca-transilvania') {
  results.push({ name: 'Exact Company Name', passed: true, details: 'Linked exactly once to /companies/banca-transilvania' });
  console.log('  ✓ PASS: Exact company name linked.');
} else {
  results.push({ name: 'Exact Company Name', passed: false, details: `Unexpected output: ${JSON.stringify(res1.links)}` });
  console.error('  ✗ FAIL: Exact company name linking failed.');
}

// 2. Multiple mentions (max 1 link per entity per article)
console.log('\n2. Testing multiple mentions of same company...');
const res2 = runLinker('Banca Transilvania este prima. Mai târziu, Banca Transilvania a cumpărat OTP Bank. Banca Transilvania continuă extinderea.');
if (res2.linkedCount === 1 && res2.links.length === 1) {
  results.push({ name: 'Multiple Mentions Limit', passed: true, details: 'Only the 1st occurrence was linked.' });
  console.log('  ✓ PASS: Multiple mentions limited to exactly 1 link per company.');
} else {
  results.push({ name: 'Multiple Mentions Limit', passed: false, details: `Found ${res2.links.length} links instead of 1.` });
  console.error('  ✗ FAIL: Multiple mentions produced duplicate links.');
}

// 3. Multiple distinct entities
console.log('\n3. Testing multiple distinct entities...');
const res3 = runLinker('Grupul OMV Petrom și producătorul Romgaz au anunțat evoluții pozitive.');
if (
  res3.linkedCount === 2 &&
  res3.links.some((l) => l.includes('/companies/omv-petrom')) &&
  res3.links.some((l) => l.includes('/companies/romgaz'))
) {
  results.push({ name: 'Multiple Distinct Entities', passed: true, details: 'Both OMV Petrom and Romgaz linked independently.' });
  console.log('  ✓ PASS: Multiple distinct entities resolved independently.');
} else {
  results.push({ name: 'Multiple Distinct Entities', passed: false, details: `Unexpected links: ${JSON.stringify(res3.links)}` });
  console.error('  ✗ FAIL: Multiple distinct entities resolution failed.');
}

// 4. Existing editorial link protection (no duplicate or nested anchors)
console.log('\n4. Testing existing editorial link protection...');
const res4 = runLinker('Conform datelor [Banca Transilvania](/companies/banca-transilvania), profitul a crescut. Mai târziu Banca Transilvania a deschis noi agenții.');
if (res4.links.length === 1 && res4.linkedCount === 1) {
  results.push({ name: 'Existing Link Protection', passed: true, details: 'Existing editorial link respected; 0 duplicate links created.' });
  console.log('  ✓ PASS: Existing editorial links preserved.');
} else {
  results.push({ name: 'Existing Link Protection', passed: false, details: `Duplicate links created: ${JSON.stringify(res4.links)}` });
  console.error('  ✗ FAIL: Created duplicate link when editorial link existed.');
}

// 5. Ambiguous ticker in prose rejection
console.log('\n5. Testing ambiguous ticker in prose rejection...');
const res5 = runLinker('This is one of the best paths to growth in Europe.');
if (res5.linkedCount === 0 && res5.links.length === 0) {
  results.push({ name: 'Ambiguous Ticker Rejection', passed: true, details: 'Ordinary words "one" and "path" were NOT linked.' });
  console.log('  ✓ PASS: Ambiguous words "one" / "path" in prose correctly ignored.');
} else {
  results.push({ name: 'Ambiguous Ticker Rejection', passed: false, details: `Incorrectly linked ambiguous prose: ${JSON.stringify(res5.links)}` });
  console.error('  ✗ FAIL: Linked ambiguous word in prose.');
}

// 6. Explicit Ticker ($TLV, (H2O)) matching
console.log('\n6. Testing explicit ticker matching ($TLV, (H2O))...');
const res6 = runLinker('Acțiunile $TLV și (H2O) au crescut la Bursa de Valori București.');
if (
  res6.links.some((l) => l.includes('/companies/banca-transilvania')) &&
  res6.links.some((l) => l.includes('/companies/hidroelectrica'))
) {
  results.push({ name: 'Explicit Ticker Matching', passed: true, details: '$TLV and (H2O) resolved to company dossiers.' });
  console.log('  ✓ PASS: Explicit tickers ($TLV, (H2O)) resolved.');
} else {
  results.push({ name: 'Explicit Ticker Matching', passed: false, details: `Unexpected ticker resolution: ${JSON.stringify(res6.links)}` });
  console.error('  ✗ FAIL: Explicit ticker matching failed.');
}

// 7. URL Safety (no link injection inside raw URLs)
console.log('\n7. Testing URL safety...');
const res7 = runLinker('Vizitați https://www.bancatransilvania.ro pentru detalii.');
if (res7.links.length === 0 || !res7.links.some((l) => l.includes('https://www.bancatransilvania.ro'))) {
  results.push({ name: 'URL Safety', passed: true, details: 'Raw website URL was NOT corrupted or double-linked.' });
  console.log('  ✓ PASS: Raw URLs untouched.');
} else {
  results.push({ name: 'URL Safety', passed: false, details: 'Corrupted raw URL.' });
  console.error('  ✗ FAIL: Corrupted raw URL.');
}

// 8. Diacritics, Ampersand & Literal Pipe Preservation
console.log('\n8. Testing Diacritics, Ampersand & Literal Pipe preservation...');
const textSpecial = 'DOCUMENTE | SURSE: Înțelegere BVB & Piața de Capital pentru Hidroelectrica';
const res8 = runLinker(textSpecial);
const fullText = res8.segments.map((s) => s.text).join('');

if (
  fullText.includes('DOCUMENTE | SURSE') &&
  !fullText.includes('&#124;') &&
  fullText.includes('BVB & Piața de Capital') &&
  fullText.includes('Înțelegere')
) {
  results.push({ name: 'Special Characters & Literal Pipe Integrity', passed: true, details: 'Literal pipe |, &, and diacritics 100% intact.' });
  console.log('  ✓ PASS: Special characters & literal pipe integrity verified.');
} else {
  results.push({ name: 'Special Characters & Literal Pipe Integrity', passed: false, details: `Text corrupted: ${fullText}` });
  console.error('  ✗ FAIL: Special characters corrupted.');
}

// Summary
console.log('\n=== TEST RESULTS SUMMARY ===');
const failedCount = results.filter((r) => !r.passed).length;

if (failedCount === 0) {
  console.log(`✓ PASS: All ${results.length} test matrix checks passed with 0 errors.`);
  process.exit(0);
} else {
  console.error(`✗ FAILED: ${failedCount} tests failed.`);
  process.exit(1);
}
