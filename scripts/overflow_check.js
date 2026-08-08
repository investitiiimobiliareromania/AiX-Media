// scripts/overflow_check.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require('puppeteer');

const viewports = [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 375, height: 800 },
  { width: 390, height: 800 },
  { width: 412, height: 800 },
  { width: 430, height: 800 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'], executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage();
  const results = [];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    const measurements = await page.evaluate(() => {
      const docEl = document.documentElement;
      const body = document.body;
      const elementData = [];
      const viewport = window.innerWidth;
      const all = Array.from(document.querySelectorAll('*'));
      all.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > viewport + 1 || rect.left < -1) {
          const styles = window.getComputedStyle(el);
          elementData.push({
            tag: el.tagName,
            className: el.className,
            id: el.id,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            styles: {
              width: styles.width,
              minWidth: styles.minWidth,
              maxWidth: styles.maxWidth,
              marginLeft: styles.marginLeft,
              marginRight: styles.marginRight,
              paddingLeft: styles.paddingLeft,
              paddingRight: styles.paddingRight,
              position: styles.position,
              left: styles.left,
              right: styles.right,
              transform: styles.transform,
              display: styles.display,
              flexShrink: styles.flexShrink,
              whiteSpace: styles.whiteSpace,
              overflowX: styles.overflowX,
              boxSizing: styles.boxSizing,
            }
          });
        }
      });
      return {
        docScrollWidth: docEl.scrollWidth,
        docClientWidth: docEl.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        offendingElements: elementData.slice(0, 10)
      };
    });
    results.push({ viewport: vp.width, measurements });
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
