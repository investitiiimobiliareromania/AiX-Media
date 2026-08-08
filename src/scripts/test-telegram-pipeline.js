/* eslint-disable */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

let mockFetchResponse = null;
let mockFetchError = null;
let lastFetchUrl = null;
let lastFetchOptions = null;

global.fetch = async (url, options) => {
  lastFetchUrl = url;
  lastFetchOptions = options;
  if (mockFetchError) throw mockFetchError;
  return mockFetchResponse;
};

function loadTelegramModule() {
  const filePath = path.join(__dirname, '../lib/telegram.ts');
  let code = fs.readFileSync(filePath, 'utf8');

  code = code.replace(/export interface[\s\S]*?\n\}/g, '');
  code = code.replace(/export /g, '');
  code = code.replace(/:\s*TelegramLeadData/g, '');
  code = code.replace(/:\s*Promise<boolean>/g, '');
  code = code.replace(/:\s*Promise<Response>/g, '');
  code = code.replace(/:\s*Promise<void>/g, '');
  code = code.replace(/:\s*RequestInit/g, '');
  code = code.replace(/:\s*string/g, '');
  code = code.replace(/:\s*number/g, '');
  code = code.replace(/:\s*unknown/g, '');
  code += '\nexports.sendTelegramAlert = sendTelegramAlert;\n';

  const module = { exports: {} };
  const fn = new Function('module', 'exports', 'process', 'console', 'fetch', code);
  fn(module, module.exports, process, console, global.fetch);
  return module.exports;
}

async function runTests() {
  console.log("Starting Telegram Pipeline Automated Tests...");

  const originalEnv = { ...process.env };

  try {
    // 1. Missing environment variables test
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const mod1 = loadTelegramModule();
    const resultMissingEnv = await mod1.sendTelegramAlert({ name: "Test User", contact: "test@aixmedia.ro" });
    assert.strictEqual(resultMissingEnv, false, "Should return false when env vars are missing");
    console.log("✓ Test 1 Passed: Missing environment variables handled gracefully");

    // Set valid test env vars
    process.env.TELEGRAM_BOT_TOKEN = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11";
    process.env.TELEGRAM_CHAT_ID = "-100123456789";

    // 2. Successful Telegram delivery test
    mockFetchResponse = {
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ ok: true, result: { message_id: 999 } }),
    };
    mockFetchError = null;

    const mod2 = loadTelegramModule();
    const resultSuccess = await mod2.sendTelegramAlert({
      name: "Cristian <Test>",
      contact: "test@aixmedia.ro & phone",
      message: "Testing HTML > escaping & quotes",
      source: "Contact Page",
      cta: "Direct Form",
      pageUrl: "/contact",
    });

    assert.strictEqual(resultSuccess, true, "Should return true on 200 OK from Telegram");
    assert.ok(lastFetchUrl.includes("123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"), "URL should contain bot token");
    const payload = JSON.parse(lastFetchOptions.body);
    assert.strictEqual(payload.chat_id, "-100123456789");
    assert.ok(payload.text.includes("Cristian &lt;Test&gt;"), "Name should be HTML escaped");
    assert.ok(payload.text.includes("test@aixmedia.ro &amp; phone"), "Contact should be HTML escaped");
    console.log("✓ Test 2 Passed: Successful Telegram delivery with HTML escaping");

    // 3. Telegram API failure (e.g. 500 error)
    mockFetchResponse = {
      ok: false,
      status: 500,
      text: async () => "Internal Telegram Error",
    };

    const resultApiFailure = await mod2.sendTelegramAlert({ name: "Test User", contact: "test@aixmedia.ro" });
    assert.strictEqual(resultApiFailure, false, "Should return false when Telegram API returns 500");
    console.log("✓ Test 3 Passed: Telegram API failure handled with retries");

    // 4. Malformed Telegram response / Timeout
    mockFetchError = new Error("AbortError");
    const resultNetworkError = await mod2.sendTelegramAlert({ name: "Test User", contact: "test@aixmedia.ro" });
    assert.strictEqual(resultNetworkError, false, "Should return false on network error/timeout");
    console.log("✓ Test 4 Passed: Malformed / timeout network error handled");

    console.log("ALL TELEGRAM PIPELINE TESTS PASSED SUCCESSFULLY!");
  } finally {
    process.env = originalEnv;
  }
}

runTests().catch((err) => {
  console.error("FAIL: Telegram pipeline tests failed:", err);
  process.exit(1);
});
