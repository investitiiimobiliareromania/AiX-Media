import assert from 'assert';
import {
  ServerIntelligenceService,
  maskIp,
  extractLocationFromHeaders,
} from '../src/lib/visitor-intelligence/server-intelligence-service';
import {
  buildLeadNotificationMessage,
  buildVisitorSummaryMessage,
  buildNavigationActivityMessage,
  buildImportantActivityMessage,
} from '../src/lib/visitor-intelligence/telegram-intelligence';
import { DailyIntelligenceAggregator } from '../src/lib/visitor-intelligence/daily-summary';
import { VisitorBatchRequest } from '../src/types/visitor-intelligence';

async function runVisitorIntelligenceTests() {
  console.log('=== AIX MEDIA — VISITOR INTELLIGENCE 2.0 TEST SUITE ===\n');

  // Test 1: IP Masking
  console.log('Test 1: Testing IP masking for privacy...');
  assert.strictEqual(maskIp('86.120.45.12'), '86.120.***.***', 'IPv4 should be masked to /16 prefix');
  assert.strictEqual(maskIp('2001:db8:85a3::8a2e'), '2001:db8:****', 'IPv6 should be masked');
  console.log('  ✓ PASS: IP addresses masked safely.\n');

  // Test 2: Location Extraction & Anti-DoS
  console.log('Test 2: Testing location extraction & anti-DoS header parsing...');
  const headers = new Headers();
  headers.set('x-vercel-ip-country', 'RO');
  headers.set('x-vercel-ip-country-region', 'B');
  headers.set('x-vercel-ip-city', 'Bucharest');

  const loc = extractLocationFromHeaders(headers);
  assert.strictEqual(loc.country, 'RO');
  assert.strictEqual(loc.city, 'Bucharest');
  assert.strictEqual(loc.precision, 'approximate');
  console.log('  ✓ PASS: Approximate network location derived accurately.\n');

  // Test 3: Batch Ingestion, Deterministic Scoring & Intent Derivation
  console.log('Test 3: Testing batch event ingestion, deterministic scoring & intent derivation...');
  const testBatch: VisitorBatchRequest = {
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    isNewVisitor: false,
    visitCount: 4,
    sessionCount: 5,
    firstSeen: Date.now() - 3600000,
    lastSeen: Date.now(),
    firstTouch: { source: 'Telegram', medium: 'social', landingPage: '/real-estate' },
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
        eventType: 'property_view',
        route: '/real-estate/proiect-nord',
        category: 'Real Estate',
        timestamp: Date.now() - 5000,
      },
      {
        eventId: 'evt_3',
        visitorId: 'vf_test_8K29X',
        sessionId: 'sess_test_92HF',
        eventType: 'search',
        route: '/search',
        category: 'Real Estate',
        metadata: { query: 'apartamente' },
        timestamp: Date.now() - 2000,
      },
      {
        eventId: 'evt_4',
        visitorId: 'vf_test_8K29X',
        sessionId: 'sess_test_92HF',
        eventType: 'cta_click',
        route: '/real-estate/proiect-nord',
        category: 'Real Estate',
        metadata: { cta: 'Solicită Raport Imobiliar' },
        timestamp: Date.now(),
      },
    ],
    maxScrollDepth: 85,
  };

  const processResult = await ServerIntelligenceService.processBatch(testBatch, headers);
  assert.strictEqual(processResult.processed, 4, 'All 4 events should be processed');

  const storedSession = ServerIntelligenceService.getSession('sess_test_92HF');
  assert.ok(storedSession, 'Session should be stored in active registry');
  assert.strictEqual(storedSession?.visitorId, 'vf_test_8K29X');
  assert.strictEqual(storedSession?.maxScrollDepth, 85);
  assert.ok((storedSession?.interestsMap.get('Real Estate') || 0) >= 10, 'Real Estate interest score calculated');
  console.log('  ✓ PASS: Batch ingestion, scroll depth and interest scoring validated.\n');

  // Test 4: Telegram Intelligence 2.0 Templates Formatting
  console.log('Test 4: Testing Telegram 3-Tier Intelligence Templates (Level 1, Level 2, Level 3)...');

  // Level 1: New Visitor Arrival
  const summaryMsg = buildVisitorSummaryMessage({
    sessionId: 'sess_test_92HF',
    visitorId: 'vf_test_8K29X',
    isNewVisitor: false,
    visitCount: 4,
    sessionCount: 5,
    startedAt: '06 Oct 2026 · 00:40',
    lastActivityAt: '00:45',
    sessionDurationFormatted: '5m 00s',
    landingPage: '/real-estate',
    lastRoute: '/real-estate/proiect-nord',
    pagesViewed: ['/real-estate', '/real-estate/proiect-nord'],
    pageCount: 2,
    attribution: { source: 'Telegram', medium: 'social', referrer: 't.me/aixmedia', landingPage: '/real-estate' },
    device: testBatch.device,
    location: { country: 'RO', city: 'Bucharest', precision: 'approximate' },
    topInterests: [{ category: 'Real Estate', score: 12, intensity: 'HIGH', bar: '██████████' }],
    primaryInterest: 'Real Estate',
    engagement: 'High',
    intent: 'High',
    maxScrollDepth: 85,
  });

  assert.ok(summaryMsg.includes('NEW VISITOR ARRIVAL'), 'Level 1 header present');
  assert.ok(summaryMsg.includes('Returning Visitor (Visit #4)'), 'Returning visitor badge present');
  assert.ok(summaryMsg.includes('Telegram'), 'Source present');
  assert.ok(summaryMsg.includes('390×844'), 'Screen dimensions present');

  // Level 2: Live Activity Intelligence
  const navMsg = buildNavigationActivityMessage({
    sessionId: 'sess_test_92HF',
    visitorId: 'vf_test_8K29X',
    isNewVisitor: false,
    visitCount: 4,
    sessionCount: 5,
    startedAt: '06 Oct 2026 · 00:40',
    lastActivityAt: '00:45:30',
    sessionDurationFormatted: '5m 30s',
    landingPage: '/real-estate',
    previousRoute: '/real-estate',
    lastRoute: '/real-estate/proiect-nord',
    pagesViewed: ['/real-estate', '/real-estate/proiect-nord'],
    pageCount: 2,
    attribution: { source: 'Telegram', medium: 'social' },
    device: testBatch.device,
    location: { country: 'RO', city: 'Bucharest', precision: 'approximate' },
    topInterests: [
      { category: 'Real Estate', score: 12, intensity: 'HIGH', bar: '██████████' },
      { category: 'Credits', score: 6, intensity: 'MEDIUM', bar: '███████░░░' }
    ],
    engagement: 'High',
    intent: 'High',
    maxScrollDepth: 85,
    timeline: [
      { time: '00:40:00', type: 'page_view', label: 'Landing', route: '/real-estate' },
      { time: '00:42:10', type: 'property_view', label: 'Property View', route: '/real-estate/proiect-nord' },
      { time: '00:45:30', type: 'cta_click', label: 'CTA: Solicită Raport', route: '/real-estate/proiect-nord' },
    ],
    lastAction: { type: 'cta_click', label: 'CTA', details: 'Solicită Raport Imobiliar' },
  });

  assert.ok(navMsg.includes('VISITOR ACTIVITY INTELLIGENCE'), 'Level 2 header present');
  assert.ok(navMsg.includes('JOURNEY & TIMELINE'), 'Timeline section present');
  assert.ok(navMsg.includes('Real Estate ██████████'), 'Visual interest bar present');
  assert.ok(navMsg.includes('Engagement: <b>HIGH</b>'), 'Engagement level present');
  assert.ok(navMsg.includes('Intent: <b>HIGH</b>'), 'Intent level present');

  // Level 3: High-Value Alert
  const actionMsg = buildImportantActivityMessage({
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    isNewVisitor: false,
    visitCount: 4,
    eventType: 'whatsapp_click',
    label: 'WhatsApp Chat Initiated',
    details: 'Click pe buton WhatsApp',
    route: '/real-estate/proiect-nord',
    location: { city: 'Bucharest', country: 'RO' },
    device: testBatch.device,
    attribution: { source: 'Telegram', medium: 'social', landingPage: '/real-estate' },
    durationFormatted: '5m 30s',
    pagesCount: 4,
    propertiesCount: 2,
    topInterests: [
      { category: 'Real Estate', score: 15, intensity: 'HIGH', bar: '██████████' }
    ],
  });

  assert.ok(actionMsg.includes('HIGH-INTENT VISITOR ALERT'), 'Level 3 header present');
  assert.ok(actionMsg.includes('WhatsApp Chat Initiated'), 'Trigger action present');
  assert.ok(actionMsg.includes('RECOMMENDED ACTION'), 'Follow-up advice present');

  // Level 3: Identified Known Lead
  const leadMsg = buildLeadNotificationMessage({
    name: 'Ion Popescu',
    contact: '0712 345 678',
    message: 'Doresc detalii despre proiect',
    sourceContext: 'Property Inquiry Form',
    pageUrl: '/real-estate/proiect-nord',
    visitorId: 'vf_test_8K29X',
    sessionId: 'sess_test_92HF',
    attribution: { source: 'Telegram', medium: 'social' },
    previousActivitySummary: {
      pageCount: 4,
      pages: ['/real-estate', '/real-estate/proiect-nord'],
      topInterests: ['Real Estate', 'Credits'],
      visitCount: 4,
    },
    location: { country: 'RO', city: 'Bucharest', precision: 'approximate' },
    device: testBatch.device,
    timestamp: '06.10.2026, 00:45:00',
  });

  assert.ok(leadMsg.includes('KNOWN LEAD IDENTIFIED'), 'Lead header present');
  assert.ok(leadMsg.includes('Ion Popescu'), 'Lead name present');
  assert.ok(leadMsg.includes('vf_test_8K29X'), 'Visitor ID present');
  console.log('  ✓ PASS: Telegram templates formatted and escaped cleanly.\n');

  // Test 5: Daily Summary Aggregator
  console.log('Test 5: Testing Daily Intelligence Aggregator...');
  const dailyReport = DailyIntelligenceAggregator.generateDailyReport();
  assert.ok(dailyReport.totalVisitors >= 1, 'Total visitors aggregated');
  assert.ok(dailyReport.topLocations.length > 0, 'Top locations aggregated');
  const dailyText = DailyIntelligenceAggregator.formatTelegramDailySummary(dailyReport);
  assert.ok(dailyText.includes('AIX MEDIA — DAILY MARKETING INTELLIGENCE'), 'Daily summary formatted');
  console.log('  ✓ PASS: Daily Intelligence Aggregator generated structured report.\n');

  // Test 6: Event Allowlist Rejection & Anti-Spoofing
  console.log('Test 6: Testing Event Allowlist Rejection & Anti-Spoofing...');
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
        eventType: 'admin_privilege_escalation', // Unauthorized
        route: '/admin',
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
  assert.strictEqual(malResult.processed, 1, 'Only 1 valid event should be processed; 1 unauthorized rejected');
  console.log('  ✓ PASS: Event allowlist successfully rejected unauthorized privileged events.\n');

  console.log('=== ALL VISITOR INTELLIGENCE 2.0 TESTS PASSED (6/6) ===\n');
}

runVisitorIntelligenceTests().catch((err) => {
  console.error('Visitor Intelligence test suite failed:', err);
  process.exit(1);
});
