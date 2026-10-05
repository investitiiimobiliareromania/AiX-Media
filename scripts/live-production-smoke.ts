/**
 * AIX MEDIA — LIVE PRODUCTION SECURITY SMOKE TEST
 */

async function testLiveEndpoint(url: string, options: RequestInit = {}) {
  const start = Date.now();
  const res = await fetch(url, options);
  const duration = Date.now() - start;
  return { status: res.status, headers: res.headers, duration };
}

async function runLiveSmoke() {
  const PROD_BASE = 'https://aixmedia.cristianvaduva.com';
  console.log(`\n=== RUNNING LIVE ZERO-TRUST SMOKE TESTS AGAINST ${PROD_BASE} ===\n`);

  // 1. Critical Public Routes
  const publicRoutes = [
    '/',
    '/real-estate',
    '/business',
    '/markets',
    '/insurance',
    '/credits',
    '/companies',
    '/video',
    '/search',
    '/feed.xml',
    '/news',
  ];

  console.log('--- 1. Testing Critical Public Routes (Expected 200 OK) ---');
  for (const route of publicRoutes) {
    const res = await testLiveEndpoint(`${PROD_BASE}${route}`, {
      headers: { 'User-Agent': 'AiX-Security-Smoke/1.0' },
    });
    console.log(`GET ${route.padEnd(20)} -> Status: ${res.status} (${res.duration}ms)`);
    if (res.status !== 200) {
      throw new Error(`Route ${route} returned non-200 status: ${res.status}`);
    }
  }

  // 2. Production Security Headers Verification
  console.log('\n--- 2. Verifying Production Security Headers ---');
  const homeRes = await testLiveEndpoint(PROD_BASE);
  const csp = homeRes.headers.get('content-security-policy');
  const hsts = homeRes.headers.get('strict-transport-security');
  const xcto = homeRes.headers.get('x-content-type-options');
  const xfo = homeRes.headers.get('x-frame-options');
  const rp = homeRes.headers.get('referrer-policy');
  const pp = homeRes.headers.get('permissions-policy');
  const xpcdp = homeRes.headers.get('x-permitted-cross-domain-policies');
  const coop = homeRes.headers.get('cross-origin-opener-policy');

  console.log(`Strict-Transport-Security: ${hsts || 'MISSING'}`);
  console.log(`X-Content-Type-Options:    ${xcto || 'MISSING'}`);
  console.log(`X-Frame-Options:           ${xfo || 'MISSING'}`);
  console.log(`Referrer-Policy:           ${rp || 'MISSING'}`);
  console.log(`Permissions-Policy:        ${pp || 'MISSING'}`);
  console.log(`X-Permitted-Cross-Domain:  ${xpcdp || 'MISSING'}`);
  console.log(`Cross-Origin-Opener-Policy:${coop || 'MISSING'}`);
  console.log(`Content-Security-Policy:   ${csp ? 'PRESENT' : 'MISSING'}`);

  if (!csp || !xcto || !xfo || !rp) {
    throw new Error('Critical security headers missing on production homepage');
  }

  // 3. API Method & Authorization Enforcement
  console.log('\n--- 3. Testing API Method & Authorization Enforcement ---');

  // Backfill: GET must be 405 Method Not Allowed
  const backfillGet = await testLiveEndpoint(`${PROD_BASE}/api/admin/backfill`, { method: 'GET' });
  console.log(`GET /api/admin/backfill            -> Status: ${backfillGet.status} (Expected 405 Method Not Allowed)`);
  if (backfillGet.status !== 405) throw new Error(`Backfill GET allowed: ${backfillGet.status}`);

  // Backfill: POST without secret must be 401 Unauthorized
  const backfillPostNoAuth = await testLiveEndpoint(`${PROD_BASE}/api/admin/backfill`, { method: 'POST' });
  console.log(`POST /api/admin/backfill (no auth) -> Status: ${backfillPostNoAuth.status} (Expected 401 Unauthorized)`);
  if (backfillPostNoAuth.status !== 401) throw new Error(`Backfill POST without auth allowed: ${backfillPostNoAuth.status}`);

  // Cron News: GET without secret must be 401 Unauthorized
  const cronGetNoAuth = await testLiveEndpoint(`${PROD_BASE}/api/cron/news`, { method: 'GET' });
  console.log(`GET /api/cron/news (no auth)       -> Status: ${cronGetNoAuth.status} (Expected 401 Unauthorized)`);
  if (cronGetNoAuth.status !== 401) throw new Error(`Cron GET without auth allowed: ${cronGetNoAuth.status}`);

  // Cron News: PUT must be 405 Method Not Allowed
  const cronPut = await testLiveEndpoint(`${PROD_BASE}/api/cron/news`, { method: 'PUT' });
  console.log(`PUT /api/cron/news                 -> Status: ${cronPut.status} (Expected 405 Method Not Allowed)`);
  if (cronPut.status !== 405) throw new Error(`Cron PUT allowed: ${cronPut.status}`);

  // Visitor API: GET must be 405 Method Not Allowed
  const visitorGet = await testLiveEndpoint(`${PROD_BASE}/api/visitor`, { method: 'GET' });
  console.log(`GET /api/visitor                   -> Status: ${visitorGet.status} (Expected 405 Method Not Allowed)`);
  if (visitorGet.status !== 405) throw new Error(`Visitor GET allowed: ${visitorGet.status}`);

  // Visitor API: PUT must be 405 Method Not Allowed
  const visitorPut = await testLiveEndpoint(`${PROD_BASE}/api/visitor`, { method: 'PUT' });
  console.log(`PUT /api/visitor                   -> Status: ${visitorPut.status} (Expected 405 Method Not Allowed)`);
  if (visitorPut.status !== 405) throw new Error(`Visitor PUT allowed: ${visitorPut.status}`);

  // Contact API: GET must be 405 Method Not Allowed
  const contactGet = await testLiveEndpoint(`${PROD_BASE}/api/contact`, { method: 'GET' });
  console.log(`GET /api/contact                   -> Status: ${contactGet.status} (Expected 405 Method Not Allowed)`);
  if (contactGet.status !== 405) throw new Error(`Contact GET allowed: ${contactGet.status}`);

  // Contact API: PUT must be 405 Method Not Allowed
  const contactPut = await testLiveEndpoint(`${PROD_BASE}/api/contact`, { method: 'PUT' });
  console.log(`PUT /api/contact                   -> Status: ${contactPut.status} (Expected 405 Method Not Allowed)`);
  if (contactPut.status !== 405) throw new Error(`Contact PUT allowed: ${contactPut.status}`);

  // Radio Stream Proxy: Missing url parameter -> 400 Bad Request
  const proxyNoUrl = await testLiveEndpoint(`${PROD_BASE}/api/radio/stream-proxy`, { method: 'GET' });
  console.log(`GET /api/radio/stream-proxy (no url) -> Status: ${proxyNoUrl.status} (Expected 400 Bad Request)`);
  if (proxyNoUrl.status !== 400) throw new Error(`Proxy without url allowed: ${proxyNoUrl.status}`);

  // Radio Stream Proxy: SSRF attempt (private IP) -> 403 Forbidden
  const proxySsrf = await testLiveEndpoint(`${PROD_BASE}/api/radio/stream-proxy?url=http://169.254.169.254/latest/meta-data`, { method: 'GET' });
  console.log(`GET /api/radio/stream-proxy (SSRF) -> Status: ${proxySsrf.status} (Expected 403 Forbidden)`);
  if (proxySsrf.status !== 403) throw new Error(`Proxy SSRF target allowed: ${proxySsrf.status}`);

  // Radio Stream Proxy: POST -> 405 Method Not Allowed
  const proxyPost = await testLiveEndpoint(`${PROD_BASE}/api/radio/stream-proxy`, { method: 'POST' });
  console.log(`POST /api/radio/stream-proxy       -> Status: ${proxyPost.status} (Expected 405 Method Not Allowed)`);
  if (proxyPost.status !== 405) throw new Error(`Proxy POST allowed: ${proxyPost.status}`);

  // Radio NowPlaying: GET -> 200 OK
  const nowplayingGet = await testLiveEndpoint(`${PROD_BASE}/api/radio/nowplaying`, { method: 'GET' });
  console.log(`GET /api/radio/nowplaying          -> Status: ${nowplayingGet.status} (Expected 200 OK)`);
  if (nowplayingGet.status !== 200) throw new Error(`NowPlaying GET failed: ${nowplayingGet.status}`);

  // Radio NowPlaying: POST -> 405 Method Not Allowed
  const nowplayingPost = await testLiveEndpoint(`${PROD_BASE}/api/radio/nowplaying`, { method: 'POST' });
  console.log(`POST /api/radio/nowplaying         -> Status: ${nowplayingPost.status} (Expected 405 Method Not Allowed)`);
  if (nowplayingPost.status !== 405) throw new Error(`NowPlaying POST allowed: ${nowplayingPost.status}`);

  // Contact API: Honeypot bot trap test (quiet 200 response without triggering real notification)
  const contactHoneypot = await testLiveEndpoint(`${PROD_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bot User',
      contact: 'bot@example.com',
      website: 'http://spam-trap.com',
    }),
  });
  console.log(`POST /api/contact (honeypot trap)  -> Status: ${contactHoneypot.status} (Expected 200 OK Honeypot trap)`);
  if (contactHoneypot.status !== 200) throw new Error(`Contact honeypot trap failed: ${contactHoneypot.status}`);

  console.log('\n=== ALL LIVE PRODUCTION SMOKE TESTS PASSED WITH ZERO REGRESSIONS ===\n');
}

runLiveSmoke().catch((err) => {
  console.error('Live smoke test failed:', err);
  process.exit(1);
});
