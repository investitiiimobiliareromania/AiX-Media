import assert from 'assert';
import { ServerIntelligenceService } from '../src/lib/visitor-intelligence/server-intelligence-service';
import { VisitorBatchRequest } from '../src/types/visitor-intelligence';

async function runNavigationJourneySimulation() {
  console.log('=== SIMULATING END-TO-END MULTI-PAGE VISITOR NAVIGATION ===\n');

  const headers = new Headers();
  headers.set('x-vercel-ip-country', 'RO');
  headers.set('x-vercel-ip-city', 'Bucharest');

  const visitorId = 'vf_sim_traveler_99';
  const sessionId = 'sess_sim_traveler_99';
  const startTime = Date.now();

  const device = {
    deviceType: 'Mobile' as const,
    os: 'iOS',
    browser: 'Safari',
    screen: '390×844',
    language: 'ro-RO',
    timezone: 'Europe/Bucharest',
  };

  // STEP 1: Landing on Homepage (/)
  console.log('Step 1: Visitor lands on Homepage (/) ...');
  const batch1: VisitorBatchRequest = {
    visitorId,
    sessionId,
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: startTime,
    lastSeen: startTime,
    firstTouch: { source: 'Google', medium: 'organic', landingPage: '/' },
    lastTouch: { source: 'Google', medium: 'organic', landingPage: '/' },
    device,
    events: [
      {
        eventId: 'evt_1',
        visitorId,
        sessionId,
        eventType: 'session_start',
        route: '/',
        timestamp: startTime,
      },
      {
        eventId: 'evt_2',
        visitorId,
        sessionId,
        eventType: 'page_view',
        route: '/',
        timestamp: startTime + 500,
      },
    ],
  };

  await ServerIntelligenceService.processBatch(batch1, headers);
  let session = ServerIntelligenceService.getSession(sessionId);
  assert.ok(session, 'Session must exist');
  assert.strictEqual(session?.pagesViewed.size, 1);
  assert.strictEqual(session?.initialAlertSent, true, 'Initial arrival alert must be marked sent');
  console.log('  ✓ Step 1 verified: Initial arrival processed.\n');

  // STEP 2: Navigate to /real-estate category
  console.log('Step 2: Visitor navigates to /real-estate category ...');
  const batch2: VisitorBatchRequest = {
    visitorId,
    sessionId,
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: startTime,
    lastSeen: startTime + 8000,
    firstTouch: batch1.firstTouch,
    lastTouch: batch1.lastTouch,
    device,
    events: [
      {
        eventId: 'evt_3',
        visitorId,
        sessionId,
        eventType: 'category_view',
        route: '/real-estate',
        category: 'Real Estate',
        timestamp: startTime + 8000,
      },
    ],
  };

  await ServerIntelligenceService.processBatch(batch2, headers);
  session = ServerIntelligenceService.getSession(sessionId);
  assert.strictEqual(session?.pagesViewed.size, 2, 'pagesViewed should contain both / and /real-estate');
  assert.strictEqual(session?.lastRoute, '/real-estate');
  assert.strictEqual(session?.previousRoute, '/');
  assert.ok((session?.interestsMap.get('Real Estate') || 0) >= 1);
  console.log('  ✓ Step 2 verified: Navigation from / to /real-estate tracked.\n');

  // STEP 3: Navigate to an Article
  console.log('Step 3: Visitor opens article /real-estate/piata-rezidentiala-bucuresti-2026 ...');
  const articleRoute = '/real-estate/piata-rezidentiala-bucuresti-2026';
  const batch3: VisitorBatchRequest = {
    visitorId,
    sessionId,
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: startTime,
    lastSeen: startTime + 20000,
    firstTouch: batch1.firstTouch,
    lastTouch: batch1.lastTouch,
    device,
    events: [
      {
        eventId: 'evt_4',
        visitorId,
        sessionId,
        eventType: 'article_view',
        route: articleRoute,
        category: 'Real Estate',
        timestamp: startTime + 20000,
      },
      {
        eventId: 'evt_5',
        visitorId,
        sessionId,
        eventType: 'scroll_depth',
        route: articleRoute,
        metadata: { depth: 75 },
        timestamp: startTime + 25000,
      },
    ],
    maxScrollDepth: 75,
  };

  await ServerIntelligenceService.processBatch(batch3, headers);
  session = ServerIntelligenceService.getSession(sessionId);
  assert.strictEqual(session?.lastRoute, articleRoute);
  assert.strictEqual(session?.previousRoute, '/real-estate');
  assert.strictEqual(session?.maxScrollDepth, 75);
  console.log('  ✓ Step 3 verified: Article view and scroll depth tracked.\n');

  // STEP 4: Key Action - Phone Click
  console.log('Step 4: Visitor clicks Phone number ...');
  const batch4: VisitorBatchRequest = {
    visitorId,
    sessionId,
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: startTime,
    lastSeen: startTime + 35000,
    firstTouch: batch1.firstTouch,
    lastTouch: batch1.lastTouch,
    device,
    events: [
      {
        eventId: 'evt_6',
        visitorId,
        sessionId,
        eventType: 'phone_click',
        route: articleRoute,
        metadata: { phone: '+40 700 123 456' },
        timestamp: startTime + 35000,
      },
    ],
  };

  await ServerIntelligenceService.processBatch(batch4, headers);
  session = ServerIntelligenceService.getSession(sessionId);
  assert.ok(session?.timeline.some((t) => t.type === 'phone_click'), 'Timeline must include phone_click');
  console.log('  ✓ Step 4 verified: Key action phone click recorded.\n');

  // STEP 5: Verify Complete Timeline Integrity
  console.log('Step 5: Verifying reconstructed timeline sequence ...');
  assert.ok(session?.timeline.length && session.timeline.length >= 4, 'Timeline should contain multiple steps');
  console.log('Reconstructed Timeline:');
  for (const item of session!.timeline) {
    console.log(`  • [${item.time}] ${item.label} (${item.type}) -> ${item.route}`);
  }
  console.log('\n=== ALL NAVIGATION JOURNEY SIMULATION TESTS PASSED ===\n');
}

runNavigationJourneySimulation().catch((err) => {
  console.error('Navigation Journey simulation failed:', err);
  process.exit(1);
});
