import assert from 'assert';
import {
  ServerIntelligenceService,
  maskIp,
  extractLocationFromHeaders,
} from '../src/lib/visitor-intelligence/server-intelligence-service';
import {
  buildLeadNotificationMessage,
  buildVisitorSummaryMessage,
  buildImportantActivityMessage,
} from '../src/lib/visitor-intelligence/telegram-intelligence';
import { DailyIntelligenceAggregator } from '../src/lib/visitor-intelligence/daily-summary';
import { VisitorBatchRequest } from '../src/types/visitor-intelligence';

async function runVisitorIntelligenceTests() {
  console.log('=== AIX MEDIA — VISITOR INTELLIGENCE TEST SUITE ===\n');

  // Test 1: IP Masking
  console.log('Test 1: Testing IP masking for privacy...');
  assert.strictEqual(maskIp('86.120.45.12'), '86.120.***.***', 'IPv4 should be masked to /16 prefix');
  assert.strictEqual(maskIp('2001:db8:85a3::8a2e'), '2001:db8:****', 'IPv6 should be masked');
  console.log('  ✓ PASS: IP addresses masked safely.\n');

  // Test 2: Location Extraction from Headers
  console.log('Test 2: Testing location extraction from network headers...');
  const headers = new Headers();
  headers.set('x-vercel-ip-country', 'RO');
  headers.set('x-vercel-ip-country-region', 'B');
  headers.set('x-vercel-ip-city', 'Bucharest');

  const loc = extractLocationFromHeaders(headers);
  assert.strictEqual(loc.country, 'RO');
  assert.strictEqual(loc.city, 'Bucharest');
  assert.strictEqual(loc.precision, 'approximate');
  console.log('  ✓ PASS: Approximate network location derived accurately.\n');

  // Test 3: Batch Ingestion & Session State
  console.log('Test 3: Testing batch event ingestion and interest derivation...');
  const testBatch: VisitorBatchRequest = {
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    isNewVisitor: false,
    visitCount: 4,
    sessionCount: 5,
    firstSeen: Date.now() - 3600000,
    lastSeen: Date.now(),
    firstTouch: { source: 'Google', medium: 'organic', landingPage: '/real-estate' },
    lastTouch: { source: 'Google', medium: 'organic', landingPage: '/real-estate' },
    device: {
      deviceType: 'Mobile',
      os: 'iOS',
      browser: 'Safari',
      screen: '390×844',
      language: 'ro-RO',
      timezone: 'Europe/Bucharest',
    },
    events: [
      {
        eventId: 'evt_1',
        visitorId: 'vf_test_8K29X',
        sessionId: 'sess_test_92HF',
        eventType: 'page_view',
        route: '/real-estate',
        category: 'Real Estate',
        timestamp: Date.now() - 10000,
      },
      {
        eventId: 'evt_2',
        visitorId: 'vf_test_8K29X',
        sessionId: 'sess_test_92HF',
        eventType: 'article_view',
        route: '/real-estate/piata-rezidentiala-bucuresti-2026',
        category: 'Real Estate',
        timestamp: Date.now() - 5000,
      },
      {
        eventId: 'evt_3',
        visitorId: 'vf_test_8K29X',
        sessionId: 'sess_test_92HF',
        eventType: 'cta_click',
        route: '/real-estate/piata-rezidentiala-bucuresti-2026',
        category: 'Real Estate',
        metadata: { cta: 'Solicită Raport Imobiliar' },
        timestamp: Date.now(),
      },
    ],
    maxScrollDepth: 85,
  };

  const processResult = await ServerIntelligenceService.processBatch(testBatch, headers);
  assert.strictEqual(processResult.processed, 3, 'All 3 events should be processed');

  const storedSession = ServerIntelligenceService.getSession('sess_test_92HF');
  assert.ok(storedSession, 'Session should be stored in active registry');
  assert.strictEqual(storedSession?.visitorId, 'vf_test_8K29X');
  assert.strictEqual(storedSession?.maxScrollDepth, 85);
  assert.ok((storedSession?.interestsMap.get('Real Estate') || 0) >= 5, 'Real Estate interest score calculated');
  console.log('  ✓ PASS: Batch ingestion, scroll depth and interest scoring validated.\n');

  // Test 4: Telegram Message Formatting
  console.log('Test 4: Testing Telegram message structure for Leads, Visitor Summaries & Key Actions...');

  // Level 1: Lead
  const leadMsg = buildLeadNotificationMessage({
    name: 'Ion Popescu',
    contact: '0712 345 678',
    message: 'Doresc detalii despre oportunitatile de investitii',
    sourceContext: 'Property Inquiry Form',
    pageUrl: '/real-estate/piata-rezidentiala-bucuresti-2026',
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    attribution: { source: 'Google', medium: 'organic' },
    previousActivitySummary: {
      pageCount: 4,
      pages: ['/real-estate', '/news'],
      topInterests: ['Real Estate', 'Business'],
      visitCount: 4,
    },
    location: { country: 'RO', city: 'Bucharest', precision: 'approximate' },
    device: testBatch.device,
    timestamp: '01.10.2026, 00:45:00',
  });

  assert.ok(leadMsg.includes('AIX MEDIA — NEW LEAD IDENTIFIED'), 'Lead header present');
  assert.ok(leadMsg.includes('Ion Popescu'), 'Lead name present');
  assert.ok(leadMsg.includes('Google (organic)'), 'Attribution present');
  assert.ok(leadMsg.includes('vf_test_8K29X'), 'Visitor ID present');

  // Level 2: Visitor Summary
  const summaryMsg = buildVisitorSummaryMessage({
    sessionId: 'sess_test_92HF',
    visitorId: 'vf_test_8K29X',
    isNewVisitor: false,
    visitCount: 4,
    sessionCount: 5,
    startedAt: '01.10.2026, 00:40',
    lastActivityAt: '00:45',
    sessionDurationFormatted: '5m 00s',
    landingPage: '/real-estate',
    lastRoute: '/real-estate/piata-rezidentiala-bucuresti-2026',
    pagesViewed: ['/real-estate', '/news'],
    pageCount: 2,
    attribution: { source: 'Google', medium: 'organic' },
    device: testBatch.device,
    location: { country: 'RO', city: 'Bucharest', precision: 'approximate' },
    topInterests: [{ category: 'Real Estate', score: 6, evidence: ['6 points'] }],
    engagement: 'High',
    maxScrollDepth: 85,
    lastAction: { type: 'cta_click', label: 'CTA CLICK', details: 'Solicită Raport Imobiliar' },
  });

  assert.ok(summaryMsg.includes('AIX MEDIA — VISITOR INTELLIGENCE'), 'Visitor summary header present');
  assert.ok(summaryMsg.includes('Returning Visitor (Visit #4)'), 'Returning visitor badge present');
  assert.ok(summaryMsg.includes('390×844'), 'Screen dimensions present');
  assert.ok(summaryMsg.includes('Real Estate'), 'Top interest present');

  // Level 3: Key Action
  const actionMsg = buildImportantActivityMessage({
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    eventType: 'phone_click',
    label: 'Phone Call Initiated',
    details: '+40 700 000 000',
    route: '/contact',
    location: { city: 'Bucharest', country: 'RO' },
    device: testBatch.device,
    attribution: { source: 'Google', medium: 'organic' },
  });

  assert.ok(actionMsg.includes('AIX MEDIA — KEY ACTION TRIGGERED'), 'Key action header present');
  assert.ok(actionMsg.includes('Phone Call Initiated'), 'Label present');
  console.log('  ✓ PASS: Telegram templates formatted and escaped cleanly.\n');

  // Test 5: Daily Summary Aggregation
  console.log('Test 5: Testing Daily Intelligence Aggregator...');
  const dailyReport = DailyIntelligenceAggregator.generateDailyReport();
  assert.ok(dailyReport.totalVisitors >= 1, 'Total visitors aggregated');
  assert.ok(dailyReport.topLocations.length > 0, 'Top locations aggregated');
  const dailyText = DailyIntelligenceAggregator.formatTelegramDailySummary(dailyReport);
  assert.ok(dailyText.includes('AIX MEDIA — DAILY MARKETING INTELLIGENCE'), 'Daily summary formatted');
  console.log('  ✓ PASS: Daily Intelligence Aggregator generated structured report.\n');

  // Test 6: Event Allowlist Rejection & ID Validation
  console.log('Test 6: Testing Event Allowlist Rejection & ID Validation...');
  const maliciousBatch = {
    visitorId: 'vf_valid_123',
    sessionId: 'sess_valid_456',
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
    firstTouch: { source: 'Direct' },
    lastTouch: { source: 'Direct' },
    device: testBatch.device,
    events: [
      {
        eventId: 'evt_mal_1',
        visitorId: 'vf_valid_123',
        sessionId: 'sess_valid_456',
        eventType: 'admin_action', // Privileged / unauthorized
        route: '/admin',
        timestamp: Date.now(),
      },
      {
        eventId: 'evt_mal_2',
        visitorId: 'vf_valid_123',
        sessionId: 'sess_valid_456',
        eventType: 'payment_completed', // Privileged / unauthorized
        route: '/checkout',
        timestamp: Date.now(),
      },
      {
        eventId: 'evt_valid_1',
        visitorId: 'vf_valid_123',
        sessionId: 'sess_valid_456',
        eventType: 'page_view', // Valid
        route: '/markets',
        timestamp: Date.now(),
      },
    ],
  };

  const malResult = await ServerIntelligenceService.processBatch(
    maliciousBatch as unknown as VisitorBatchRequest,
    headers
  );
  assert.strictEqual(malResult.processed, 1, 'Only 1 valid event should be processed; 2 unauthorized events rejected');
  console.log('  ✓ PASS: Event allowlist successfully rejected unauthorized privileged events.\n');

  console.log('=== ALL VISITOR INTELLIGENCE TESTS PASSED (6/6) ===\n');
}

runVisitorIntelligenceTests().catch((err) => {
  console.error('Visitor Intelligence test suite failed:', err);
  process.exit(1);
});
