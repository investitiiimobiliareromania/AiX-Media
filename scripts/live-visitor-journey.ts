/**
 * AIX MEDIA — LIVE PRODUCTION VISITOR JOURNEY VERIFICATION
 * Simulates a realistic multi-step visitor journey on live production.
 */

async function testLiveVisitorJourney() {
  const PROD_BASE = 'https://aixmedia.cristianvaduva.com';
  console.log(`\n=== EXECUTING LIVE PRODUCTION VISITOR JOURNEY ON ${PROD_BASE} ===\n`);

  const now = Date.now();
  const testVisitorId = `vf_live_journey_${Math.random().toString(36).slice(2, 10)}`;
  const testSessionId = `sess_live_journey_${Math.random().toString(36).slice(2, 10)}`;

  console.log(`Visitor ID: ${testVisitorId}`);
  console.log(`Session ID: ${testSessionId}`);

  // Step 1: Initial Arrival & Session Start from Telegram
  console.log('\n1. Dispatching Level 1: Telegram Arrival on /real-estate...');
  const batch1 = {
    visitorId: testVisitorId,
    sessionId: testSessionId,
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: now,
    lastSeen: now,
    firstTouch: {
      source: 'Telegram',
      medium: 'social',
      campaign: 'real-estate-q4',
      referrer: 't.me/aixmedia',
      landingPage: '/real-estate',
    },
    lastTouch: {
      source: 'Telegram',
      medium: 'social',
      campaign: 'real-estate-q4',
      referrer: 't.me/aixmedia',
      landingPage: '/real-estate',
    },
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
        eventId: `evt_live_1_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'session_start',
        route: '/real-estate',
        category: 'Real Estate',
        timestamp: now,
      },
      {
        eventId: `evt_live_2_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'page_view',
        route: '/real-estate',
        category: 'Real Estate',
        timestamp: now + 500,
      }
    ],
    timeOnPageSeconds: 5,
    maxScrollDepth: 35,
  };

  const res1 = await fetch(`${PROD_BASE}/api/visitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(batch1),
  });

  const data1 = await res1.json();
  console.log(`Response 1: HTTP ${res1.status} -> ${JSON.stringify(data1)}`);
  if (res1.status !== 200 || !data1.success) {
    throw new Error('Failed to ingest Step 1 arrival batch');
  }

  // Step 2: Journey Progression (Property View, Search, Category Navigation)
  console.log('\n2. Dispatching Level 2: Navigation to Property, Search, and Credits vertical...');
  const batch2 = {
    visitorId: testVisitorId,
    sessionId: testSessionId,
    isNewVisitor: false,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: now,
    lastSeen: now + 35000,
    firstTouch: batch1.firstTouch,
    lastTouch: batch1.lastTouch,
    device: batch1.device,
    events: [
      {
        eventId: `evt_live_3_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'property_view',
        route: '/real-estate/piata-rezidentiala-bucuresti-2026',
        category: 'Real Estate',
        timestamp: now + 15000,
      },
      {
        eventId: `evt_live_4_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'scroll_depth',
        route: '/real-estate/piata-rezidentiala-bucuresti-2026',
        category: 'Real Estate',
        metadata: { depth: 90 },
        timestamp: now + 25000,
      },
      {
        eventId: `evt_live_5_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'search',
        route: '/search',
        category: 'Credits',
        metadata: { query: 'credit ipotecar ircc' },
        timestamp: now + 30000,
      },
      {
        eventId: `evt_live_6_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'category_view',
        route: '/credits',
        category: 'Credits',
        timestamp: now + 35000,
      }
    ],
    timeOnPageSeconds: 40,
    maxScrollDepth: 90,
  };

  const res2 = await fetch(`${PROD_BASE}/api/visitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(batch2),
  });

  const data2 = await res2.json();
  console.log(`Response 2: HTTP ${res2.status} -> ${JSON.stringify(data2)}`);
  if (res2.status !== 200 || !data2.success) {
    throw new Error('Failed to ingest Step 2 journey batch');
  }

  // Step 3: High Intent Commercial Action (WhatsApp Click)
  console.log('\n3. Dispatching Level 3: WhatsApp Click CTA...');
  const batch3 = {
    visitorId: testVisitorId,
    sessionId: testSessionId,
    isNewVisitor: false,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: now,
    lastSeen: now + 50000,
    firstTouch: batch1.firstTouch,
    lastTouch: batch1.lastTouch,
    device: batch1.device,
    events: [
      {
        eventId: `evt_live_7_${now}`,
        visitorId: testVisitorId,
        sessionId: testSessionId,
        eventType: 'whatsapp_click',
        route: '/credits',
        category: 'Credits',
        metadata: { cta: 'Consultanta Finantare', target: 'https://wa.me/40700000000' },
        timestamp: now + 50000,
      }
    ],
    timeOnPageSeconds: 55,
    maxScrollDepth: 90,
  };

  const res3 = await fetch(`${PROD_BASE}/api/visitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(batch3),
  });

  const data3 = await res3.json();
  console.log(`Response 3: HTTP ${res3.status} -> ${JSON.stringify(data3)}`);
  if (res3.status !== 200 || !data3.success) {
    throw new Error('Failed to ingest Step 3 commercial action');
  }

  console.log('\n=== LIVE PRODUCTION VISITOR JOURNEY VERIFICATION COMPLETED SUCCESSFULLY ===\n');
}

testLiveVisitorJourney().catch((err) => {
  console.error('Live journey verification failed:', err);
  process.exit(1);
});
