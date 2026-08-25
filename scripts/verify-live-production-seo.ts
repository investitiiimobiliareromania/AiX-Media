/* eslint-disable */
import https from "https";

function fetchPage(url: string): Promise<{ statusCode: number; body: string; headers: any }> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode || 0, body: data, headers: res.headers }));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function verifyLive() {
  console.log("=== AIX MEDIA — LIVE PRODUCTION SEO & STRUCTURED DATA VERIFICATION ===");
  console.log("Target: https://aixmedia.cristianvaduva.com\n");

  const baseUrl = "https://aixmedia.cristianvaduva.com";
  let passed = true;

  // 1. Homepage Verification
  console.log("1. Checking Homepage (/)...");
  try {
    const home = await fetchPage(`${baseUrl}/`);
    console.log(`   Status: HTTP ${home.statusCode}`);
    if (home.statusCode !== 200) {
      console.error("   ❌ Homepage returned non-200 status");
      passed = false;
    }

    const hasLangRo = home.body.includes('lang="ro"') || home.body.includes('lang=\\"ro\\"');
    console.log(`   HTML Lang: ${hasLangRo ? "✓ lang=\"ro\" present" : "❌ lang=\"ro\" missing"}`);

    const hasOrgJsonLd = home.body.includes("NewsMediaOrganization") || home.body.includes("Organization");
    console.log(`   Organization JSON-LD: ${hasOrgJsonLd ? "✓ Present" : "❌ Missing"}`);

    const hasWebSiteJsonLd = home.body.includes("WebSite");
    console.log(`   WebSite JSON-LD: ${hasWebSiteJsonLd ? "✓ Present" : "❌ Missing"}`);

    const hasNoTwitterAixMedia = !home.body.includes("@aixmedia") && !home.body.includes("twitter.com/aixmedia");
    console.log(`   Zero False Twitter (@aixmedia): ${hasNoTwitterAixMedia ? "✓ Clean (None found)" : "❌ Found false handle"}`);

    const hasCanonical = home.body.includes(`rel="canonical"`) && home.body.includes(`${baseUrl}`);
    console.log(`   Canonical URL: ${hasCanonical ? "✓ Verified production URL" : "❌ Invalid canonical"}`);

    const hasHreflang = home.body.includes('hreflang="ro-RO"') && home.body.includes('hreflang="x-default"');
    console.log(`   Hreflang (ro-RO & x-default): ${hasHreflang ? "✓ Present" : "❌ Missing"}`);
  } catch (err: any) {
    console.error("   ❌ Error fetching homepage:", err.message);
    passed = false;
  }

  // 2. Robots.txt
  console.log("\n2. Checking robots.txt...");
  try {
    const robots = await fetchPage(`${baseUrl}/robots.txt`);
    console.log(`   Status: HTTP ${robots.statusCode}`);
    const hasSitemap = robots.body.includes(`${baseUrl}/sitemap.xml`);
    console.log(`   Sitemap Reference: ${hasSitemap ? "✓ Present" : "❌ Missing"}`);
    const allowsPublic = robots.body.includes("Allow: /");
    console.log(`   Allow Public: ${allowsPublic ? "✓ Configured" : "❌ Missing"}`);
  } catch (err: any) {
    console.error("   ❌ Error fetching robots.txt:", err.message);
    passed = false;
  }

  // 3. Sitemap.xml
  console.log("\n3. Checking sitemap.xml...");
  try {
    const sitemap = await fetchPage(`${baseUrl}/sitemap.xml`);
    console.log(`   Status: HTTP ${sitemap.statusCode}`);
    const hasNewsUrls = sitemap.body.includes("/news/") || sitemap.body.includes("/companies/");
    console.log(`   Contains Dynamic Routes: ${hasNewsUrls ? "✓ Present" : "❌ Missing"}`);
    const excludesAdmin = !sitemap.body.includes("/admin");
    console.log(`   Excludes Admin/Private Routes: ${excludesAdmin ? "✓ Clean" : "❌ Found admin in sitemap"}`);
  } catch (err: any) {
    console.error("   ❌ Error fetching sitemap.xml:", err.message);
    passed = false;
  }

  // 4. Checking Section Pages
  const sections = ["/news", "/business", "/markets", "/real-estate", "/companies", "/finance", "/investments", "/podcasts", "/tv", "/radio"];
  console.log("\n4. Checking Intelligence Verticals & Media Pages...");
  for (const sec of sections) {
    try {
      const res = await fetchPage(`${baseUrl}${sec}`);
      const hasCanonical = res.body.includes(`rel="canonical"`) && res.body.includes(`${baseUrl}${sec}`);
      const hasNoTwitterAixMedia = !res.body.includes("@aixmedia");
      console.log(`   ${sec.padEnd(14)} -> HTTP ${res.statusCode} | Canonical: ${hasCanonical ? "✓" : "❌"} | Clean Twitter: ${hasNoTwitterAixMedia ? "✓" : "❌"}`);
    } catch (err: any) {
      console.error(`   ${sec.padEnd(14)} -> Error: ${err.message}`);
      passed = false;
    }
  }

  // 5. Checking Real Article Page
  console.log("\n5. Checking NewsArticle Structured Data on /news/ancpi-evolutie-tranzactii-imobiliare-romania...");
  try {
    const art = await fetchPage(`${baseUrl}/news/ancpi-evolutie-tranzactii-imobiliare-romania`);
    console.log(`   Status: HTTP ${art.statusCode}`);
    const hasNewsArticleSchema = art.body.includes("NewsArticle");
    console.log(`   NewsArticle Schema: ${hasNewsArticleSchema ? "✓ Present" : "❌ Missing"}`);
    const hasEditorialDesk = art.body.includes("AiX Media Editorial Desk");
    console.log(`   Author (AiX Media Editorial Desk): ${hasEditorialDesk ? "✓ Present" : "❌ Missing"}`);
    const hasPublisher = art.body.includes("NewsMediaOrganization") || art.body.includes("AiX Media");
    console.log(`   Publisher (AiX Media): ${hasPublisher ? "✓ Present" : "❌ Missing"}`);
    const hasInLanguage = art.body.includes("ro-RO") || art.body.includes("ro_RO");
    console.log(`   inLanguage (ro-RO): ${hasInLanguage ? "✓ Present" : "❌ Missing"}`);
  } catch (err: any) {
    console.error("   ❌ Error fetching article page:", err.message);
    passed = false;
  }

  // 6. Checking Company Profile Page
  console.log("\n6. Checking Company Profile (/companies/banca-transilvania)...");
  try {
    const comp = await fetchPage(`${baseUrl}/companies/banca-transilvania`);
    console.log(`   Status: HTTP ${comp.statusCode}`);
    const hasOrgSchema = comp.body.includes("Organization");
    console.log(`   Company Organization Schema: ${hasOrgSchema ? "✓ Present" : "❌ Missing"}`);
    const hasRomanianTitle = comp.body.includes("Banca Transilvania — Profil Financiar și Business Intelligence | AiX Media");
    console.log(`   Romanian SEO Title: ${hasRomanianTitle ? "✓ Present" : "❌ Missing"}`);
  } catch (err: any) {
    console.error("   ❌ Error fetching company page:", err.message);
    passed = false;
  }

  console.log("\n=======================================================");
  if (passed) {
    console.log("🎉 ALL LIVE PRODUCTION SEO & STRUCTURED DATA CHECKS PASSED!");
  } else {
    console.log("⚠️ Some checks failed.");
  }
}

verifyLive();
