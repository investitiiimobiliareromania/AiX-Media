import { isValidImageUrl } from '../src/lib/image-validator';
import { getFallbackImage } from '../src/lib/fallbackImage';

function resolveImage(url: string | null | undefined, slug: string): { type: 'REAL_RSS' | 'DETERMINISTIC_FALLBACK'; url: string } {
  if (url && isValidImageUrl(url)) {
    return { type: 'REAL_RSS', url };
  }
  return { type: 'DETERMINISTIC_FALLBACK', url: getFallbackImage(slug) };
}

function runRegressionTests(): void {
  console.log('Running Image Resolution Regression Test Suite...\n');

  const slug = 'parc-fotovoltaic-de-248-mw-in-dolj-finantat-cu-335-milioane-de-lei-de-libra-internet-bank';

  // Test 1: Economedia large/throttled external image (#26)
  const test1Url = 'https://www.economedia.ro/wp-content/uploads/2026/08/Screenshot-2026-08-21-at-09.17.00-1024x653.png';
  const res1 = resolveImage(test1Url, slug);
  console.log('[TEST 1] Economedia throttled PNG screenshot URL:');
  console.log(`  Input: ${test1Url}`);
  console.log(`  Result Type: ${res1.type}`);
  console.log(`  Result URL: ${res1.url}`);
  if (res1.type !== 'DETERMINISTIC_FALLBACK' || !res1.url.startsWith('/fallbacks/')) {
    throw new Error(`Test 1 Failed: Expected DETERMINISTIC_FALLBACK, got ${res1.type}`);
  }
  console.log('  ✅ PASS\n');

  // Test 2: Valid RSS Image
  const test2Url = 'https://www.economedia.ro/wp-content/uploads/2025/08/motocicleta-bmw-1024x631.jpg';
  const res2 = resolveImage(test2Url, slug);
  console.log('[TEST 2] Valid RSS Image URL:');
  console.log(`  Input: ${test2Url}`);
  console.log(`  Result Type: ${res2.type}`);
  console.log(`  Result URL: ${res2.url}`);
  if (res2.type !== 'REAL_RSS' || res2.url !== test2Url) {
    throw new Error(`Test 2 Failed: Expected REAL_RSS with original URL, got ${res2.type}`);
  }
  console.log('  ✅ PASS\n');

  // Test 3: NULL cover_image_url
  const res3 = resolveImage(null, slug);
  console.log('[TEST 3] NULL cover_image_url:');
  console.log(`  Input: null`);
  console.log(`  Result Type: ${res3.type}`);
  console.log(`  Result URL: ${res3.url}`);
  if (res3.type !== 'DETERMINISTIC_FALLBACK' || !res3.url.startsWith('/fallbacks/')) {
    throw new Error(`Test 3 Failed: Expected DETERMINISTIC_FALLBACK, got ${res3.type}`);
  }
  console.log('  ✅ PASS\n');

  // Test 4: Generic Unsplash URL
  const test4Url = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop';
  const res4 = resolveImage(test4Url, slug);
  console.log('[TEST 4] Generic Unsplash URL:');
  console.log(`  Input: ${test4Url}`);
  console.log(`  Result Type: ${res4.type}`);
  console.log(`  Result URL: ${res4.url}`);
  if (res4.type !== 'DETERMINISTIC_FALLBACK' || !res4.url.startsWith('/fallbacks/')) {
    throw new Error(`Test 4 Failed: Expected DETERMINISTIC_FALLBACK, got ${res4.type}`);
  }
  console.log('  ✅ PASS\n');

  console.log('ALL 4 REGRESSION TESTS PASSED SUCCESSFULLY! 🎉');
}

runRegressionTests();
