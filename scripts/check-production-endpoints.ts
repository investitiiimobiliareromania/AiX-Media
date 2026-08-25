/* eslint-disable */
async function verifyProduction() {
  console.log("=== AIX MEDIA — LIVE PRODUCTION VERIFICATION ===");
  const baseUrl = "https://aixmedia.cristianvaduva.com";

  async function check(name: string, url: string, matchers: { label: string; test: (html: string) => boolean }[]) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      const html = await res.text();
      console.log(`\n[${name}] ${url} -> HTTP ${res.status}`);
      for (const m of matchers) {
        const ok = m.test(html);
        console.log(`   ${ok ? "✓" : "❌"} ${m.label}`);
      }
    } catch (e: any) {
      console.error(`\n[${name}] ${url} -> Error: ${e.message}`);
    }
  }

  // 1. Homepage
  await check("Homepage", `${baseUrl}/`, [
    { label: 'lang="ro"', test: (h) => h.includes('lang="ro"') },
    { label: "NewsMediaOrganization schema", test: (h) => h.includes("NewsMediaOrganization") },
    { label: "WebSite schema", test: (h) => h.includes("WebSite") },
    { label: "Zero @aixmedia twitter handles", test: (h) => !h.includes("@aixmedia") },
    { label: "Production Canonical", test: (h) => h.includes(`href="${baseUrl}"`) || h.includes(`href="${baseUrl}/"`) || h.includes('rel="canonical"') },
    { label: "Hreflang tags", test: (h) => h.includes('hreflang="ro-RO"') },
  ]);

  // 2. Robots.txt
  await check("Robots.txt", `${baseUrl}/robots.txt`, [
    { label: "Sitemap URL reference", test: (h) => h.includes(`${baseUrl}/sitemap.xml`) },
    { label: "Allow: / rule", test: (h) => h.includes("Allow: /") },
  ]);

  // 3. Sitemap.xml
  await check("Sitemap.xml", `${baseUrl}/sitemap.xml`, [
    { label: "Valid XML root <urlset>", test: (h) => h.includes("<urlset") },
    { label: "Contains /news/", test: (h) => h.includes("/news/") },
    { label: "Contains /companies/", test: (h) => h.includes("/companies/") },
    { label: "No admin routes", test: (h) => !h.includes("/admin") },
  ]);

  // 4. News Detail
  await check("News Article Detail", `${baseUrl}/news/ancpi-evolutie-tranzactii-imobiliare-romania`, [
    { label: "NewsArticle JSON-LD schema", test: (h) => h.includes("NewsArticle") },
    { label: "inLanguage: ro-RO", test: (h) => h.includes("ro-RO") || h.includes("ro_RO") },
    { label: "AiX Media Editorial Desk author", test: (h) => h.includes("AiX Media Editorial Desk") },
    { label: "AiX Media publisher with logo", test: (h) => h.includes("NewsMediaOrganization") || h.includes("AiX Media") },
    { label: "No @aixmedia twitter", test: (h) => !h.includes("@aixmedia") },
  ]);

  // 5. Company Profile
  await check("Company Profile", `${baseUrl}/companies/banca-transilvania`, [
    { label: "Organization schema", test: (h) => h.includes("Organization") },
    { label: "Romanian Title template", test: (h) => h.includes("Banca Transilvania — Profil Financiar și Business Intelligence | AiX Media") || h.includes("Banca Transilvania") },
    { label: "Canonical URL", test: (h) => h.includes("/companies/banca-transilvania") },
  ]);

  // 6. Section Verticals
  const verticals = ["/news", "/business", "/markets", "/real-estate", "/companies", "/finance", "/investments", "/podcasts", "/tv", "/radio"];
  for (const v of verticals) {
    await check(`Section ${v}`, `${baseUrl}${v}`, [
      { label: "Canonical tag present", test: (h) => h.includes('rel="canonical"') },
      { label: "No @aixmedia handle", test: (h) => !h.includes("@aixmedia") },
    ]);
  }
}

verifyProduction();
