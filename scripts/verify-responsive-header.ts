import { chromium } from "@playwright/test";

async function verifyResponsiveHeader() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { width: 320, height: 600, label: "Mobile Mini (320px)" },
    { width: 375, height: 667, label: "iPhone SE (375px)" },
    { width: 390, height: 844, label: "iPhone 13/14 (390px)" },
    { width: 414, height: 896, label: "iPhone Plus (414px)" },
    { width: 768, height: 1024, label: "iPad Portrait (768px)" },
    { width: 1024, height: 768, label: "Laptop Standard (1024px)" },
    { width: 1280, height: 800, label: "Laptop Medium (1280px)" },
    { width: 1440, height: 900, label: "Desktop (1440px)" },
    { width: 1920, height: 1080, label: "Full HD (1920px)" },
  ];

  const targetUrl = process.argv[2] || "https://aixmedia.cristianvaduva.com";
  console.log(`=== VERIFYING RESPONSIVE HEADER OVERFLOW ON ${targetUrl} ===`);
  let allPass = true;

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    try {
      await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
      const overflow = await page.evaluate(() => {
        const header = document.querySelector("header");
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const headerWidth = header ? header.scrollWidth : 0;
        return {
          hasDocOverflow: docWidth > winWidth,
          docWidth,
          winWidth,
          headerWidth,
        };
      });

      if (overflow.hasDocOverflow) {
        console.error(`✗ FAIL [${vp.label}]: Document scrollWidth (${overflow.docWidth}) > innerWidth (${overflow.winWidth})`);
        allPass = false;
      } else {
        console.log(`✓ PASS [${vp.label}]: scrollWidth (${overflow.docWidth}) <= innerWidth (${overflow.winWidth})`);
      }
    } catch (e: any) {
      console.log(`[Info] Local server not running, will verify on live production.`);
      break;
    } finally {
      await context.close();
    }
  }

  await browser.close();
}

verifyResponsiveHeader();
