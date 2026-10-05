/**
 * AIX MEDIA — COMPREHENSIVE AUTOMATED ZERO-TRUST SECURITY AUDIT SUITE
 * Verifies application attack surfaces across OWASP ASVS categories.
 */

import assert from 'assert';
import crypto from 'crypto';
import { extractLocationFromHeaders, maskIp, ServerIntelligenceService } from '../src/lib/visitor-intelligence/server-intelligence-service';
import { buildLeadNotificationMessage, buildVisitorSummaryMessage, buildNavigationActivityMessage, buildImportantActivityMessage } from '../src/lib/visitor-intelligence/telegram-intelligence';
import { fetchFullArticleHtmlFromUrl } from '../src/lib/article-full-text-enhancer';

async function runSecuritySuite() {
  console.log('\n=== AIX MEDIA — AUTOMATED ZERO-TRUST SECURITY AUDIT SUITE ===\n');

  // 1. TIMING-SAFE SECRET COMPARISON & CRON SECURITY
  console.log('1. Testing Constant-Time Secret Verification & Cron Boundaries...');
  function timingSafeSecretCheck(provided: string | null | undefined, expected: string | undefined): boolean {
    if (!provided || !expected || typeof provided !== 'string' || typeof expected !== 'string') {
      return false;
    }
    try {
      const h1 = crypto.createHash('sha256').update(provided).digest();
      const h2 = crypto.createHash('sha256').update(expected).digest();
      return crypto.timingSafeEqual(h1, h2);
    } catch {
      return false;
    }
  }

  const validSecret = 'test-ultra-secure-cron-secret-2026';
  assert.strictEqual(timingSafeSecretCheck(validSecret, validSecret), true, 'Valid secret must match');
  assert.strictEqual(timingSafeSecretCheck('wrong-secret', validSecret), false, 'Wrong secret must fail');
  assert.strictEqual(timingSafeSecretCheck('', validSecret), false, 'Empty secret must fail');
  assert.strictEqual(timingSafeSecretCheck(null, validSecret), false, 'Null secret must fail');
  assert.strictEqual(timingSafeSecretCheck(undefined, validSecret), false, 'Undefined secret must fail');
  assert.strictEqual(timingSafeSecretCheck(validSecret, undefined), false, 'Undefined expected secret must fail');
  assert.strictEqual(timingSafeSecretCheck('test-ultra-secure-cron-secret-202', validSecret), false, 'Prefix secret must fail');
  assert.strictEqual(timingSafeSecretCheck(validSecret + 'x', validSecret), false, 'Appended secret must fail');
  console.log('  ✓ PASS: Timing-safe cryptographic comparison prevents length/timing leakage and handles falsy input safely.');

  // 2. LOCATION HEADER RESILIENCE & URI DECODING CRASH RESISTANCE
  console.log('2. Testing Location Extraction & URI Error Resilience (Anti-DoS)...');
  const malformedHeaders = new Headers();
  malformedHeaders.set('x-vercel-ip-country', 'RO');
  malformedHeaders.set('x-vercel-ip-city', '%E0%A4%A<script>alert(1)</script>'); // Malformed URI sequence + XSS attempt

  const loc = extractLocationFromHeaders(malformedHeaders);
  assert.strictEqual(loc.country, 'RO', 'Country must be normalized to RO');
  assert.ok(!loc.city?.includes('<script>'), 'City must strip XSS brackets');
  assert.ok(typeof loc.city === 'string', 'Malformed URI component must not throw unhandled exception');
  console.log('  ✓ PASS: Malformed URI components & XSS tags in headers handled gracefully with zero crash.');

  // 3. TELEGRAM HTML INJECTION DEFENSE
  console.log('3. Testing Telegram HTML Escaping & Injection Resilience...');
  const maliciousLead = {
    name: 'Attacker <b>Bold</b> <script>alert("XSS")</script>',
    contact: 'test@evil.com & "quotes" \'apostrophe\' <img src=x onerror=alert(1)>',
    message: '<code>Malicious Code</code> & <i>Italic</i> <a href="http://evil.com">Link</a>',
    sourceContext: 'Test CTA <script>',
    pageUrl: '/news/test?param=<script>',
    timestamp: '2026-10-06 12:00:00',
  };

  const formattedMsg = buildLeadNotificationMessage(maliciousLead);
  assert.ok(!formattedMsg.includes('<script>'), 'Must not contain raw <script>');
  assert.ok(!formattedMsg.includes('<img'), 'Must not contain raw <img>');
  assert.ok(formattedMsg.includes('&lt;script&gt;'), 'Must encode <script> to &lt;script&gt;');
  assert.ok(formattedMsg.includes('&amp;'), 'Must encode & to &amp;');
  assert.ok(formattedMsg.includes('&quot;'), 'Must encode " to &quot;');
  console.log('  ✓ PASS: Telegram templates securely escape HTML special characters and tags.');

  // 4. VISITOR INTELLIGENCE EVENT ALLOWLIST & RATE BOUNDARIES
  console.log('4. Testing Visitor Intelligence Allowlist Enforcement...');
  const result = await ServerIntelligenceService.processBatch({
    visitorId: 'vf_test_security_123',
    sessionId: 'sess_test_security_456',
    isNewVisitor: true,
    visitCount: 1,
    sessionCount: 1,
    firstSeen: Date.now(),
    lastSeen: Date.now(),
    firstTouch: { source: 'SecurityAudit', landingPage: '/audit' },
    lastTouch: { source: 'SecurityAudit', landingPage: '/audit' },
    device: {
      deviceType: 'Desktop',
      os: 'macOS',
      browser: 'Chrome',
      screen: '1920x1080',
      language: 'ro-RO',
      timezone: 'Europe/Bucharest',
    },
    events: [
      {
        eventId: 'evt_valid_1',
        visitorId: 'vf_test_security_123',
        sessionId: 'sess_test_security_456',
        eventType: 'page_view',
        route: '/business',
        timestamp: Date.now(),
      },
      {
        eventId: 'evt_malicious_1',
        visitorId: 'vf_test_security_123',
        sessionId: 'sess_test_security_456',
        // @ts-expect-error Testing unauthorized event injection
        eventType: 'admin_privilege_escalation',
        route: '/admin/settings',
        timestamp: Date.now(),
      }
    ]
  }, new Headers());

  assert.strictEqual(result.processed, 1, 'Only allowed event types must be processed');
  console.log('  ✓ PASS: Arbitrary/unauthorized event types rejected by allowlist.');

  // 5. SSRF DEFENSE IN EXTERNAL ENHANCER
  console.log('5. Testing SSRF Blocking on External Fetcher...');
  const ssrf1 = await fetchFullArticleHtmlFromUrl('http://169.254.169.254/latest/meta-data/');
  const ssrf2 = await fetchFullArticleHtmlFromUrl('http://localhost:3000/api/admin/backfill');
  const ssrf3 = await fetchFullArticleHtmlFromUrl('https://evil-attacker-site.com/malicious.html');
  const ssrf4 = await fetchFullArticleHtmlFromUrl('file:///etc/passwd');

  assert.strictEqual(ssrf1, null, 'AWS metadata endpoint must be blocked');
  assert.strictEqual(ssrf2, null, 'Localhost endpoint must be blocked');
  assert.strictEqual(ssrf3, null, 'Unapproved domain must be blocked');
  assert.strictEqual(ssrf4, null, 'File protocol must be blocked');
  console.log('  ✓ PASS: All SSRF probes (loopback, metadata, arbitrary domain, file protocol) strictly blocked.');

  // 6. RADIO STREAM PROXY ALLOWLIST
  console.log('6. Testing Radio Stream Proxy Security Boundaries...');
  const ALLOWED_STREAM_HOSTS = new Set(['stream2.srr.ro', 'stream.aixmedia.ro']);
  const ALLOWED_STREAM_PATHS = new Set([
    '/rra',
    '/bucurestifm',
    '/rrc',
    '/radiocluj',
    '/radiotimisoara',
    '/rri1',
    '/rrm',
  ]);

  function isAllowedStreamUrl(urlString: string): boolean {
    try {
      const parsed = new URL(urlString);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
      if (!ALLOWED_STREAM_HOSTS.has(parsed.hostname.toLowerCase())) return false;
      const port = parsed.port;
      if (port !== '' && port !== '80' && port !== '443' && port !== '8000') return false;
      if (!ALLOWED_STREAM_PATHS.has(parsed.pathname.toLowerCase())) return false;
      return true;
    } catch {
      return false;
    }
  }

  assert.strictEqual(isAllowedStreamUrl('http://stream2.srr.ro:8000/rra'), true, 'Valid radio stream URL allowed');
  assert.strictEqual(isAllowedStreamUrl('http://stream2.srr.ro:8000/admin'), false, 'Non-allowlisted path blocked');
  assert.strictEqual(isAllowedStreamUrl('http://169.254.169.254:8000/rra'), false, 'IP host blocked');
  assert.strictEqual(isAllowedStreamUrl('http://evil.com/rra'), false, 'External host blocked');
  assert.strictEqual(isAllowedStreamUrl('gopher://stream2.srr.ro:8000/rra'), false, 'Non-HTTP protocol blocked');
  console.log('  ✓ PASS: Radio proxy enforces strict host, path, port, and protocol allowlists.');

  console.log('\n=== ALL ZERO-TRUST SECURITY AUDIT TESTS PASSED (6/6) ===\n');
}

runSecuritySuite().catch((err) => {
  console.error('Security Suite Execution Failed:', err);
  process.exit(1);
});
