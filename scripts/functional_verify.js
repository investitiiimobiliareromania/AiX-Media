/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Base URL (dev server)
const BASE_URL = 'http://localhost:4001';

// Routes to test (public and admin)
const routes = [
  '/',
  '/news',
  '/authors',
  '/podcasts',
  '/radio',
  '/tv',
  '/academy',
  '/admin',
  '/admin/login',
  '/admin/dashboard',
  '/admin/articles',
  '/admin/media',
  '/admin/settings'
];

// Helper to get first slug from a page listing
async function getFirstSlug(page, selector) {
  const links = await page.$$eval(selector, els => els.map(el => el.getAttribute('href')).filter(Boolean));
  return links[0] || null;
}

(async () => {
  const browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const report = {};
  const screenshotDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(screenshotDir, {recursive: true});

  const page = await browser.newPage();
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({type: msg.type(), text: msg.text()});
  });
  page.on('pageerror', err => {
    consoleMessages.push({type: 'error', text: err.message});
  });
  page.on('response', resp => {
    if (!resp.ok()) {
      consoleMessages.push({type: 'response', text: `${resp.status()} ${resp.url()}`});
    }
  });

  // Visit static routes
  for (const route of routes) {
    const url = BASE_URL + route;
    const result = {status: null, console: [], screenshot: null};
    try {
      const response = await page.goto(url, {waitUntil: 'networkidle0', timeout: 30000});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, route.replace(/\\//g, '_') || 'root') + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
    } catch (e) {
      result.status = 'error';
      result.console = [...consoleMessages, {type: 'exception', text: e.message}];
    }
    consoleMessages.length = 0;
    report[route] = result;
  }

  // Dynamic slug pages
  // News slug
  try {
    await page.goto(BASE_URL + '/news', {waitUntil: 'networkidle0'});
    const slug = await getFirstSlug(page, 'a[href^="/news/"]');
    if (slug) {
      const url = BASE_URL + slug;
      const result = {status: null, console: [], screenshot: null};
      const response = await page.goto(url, {waitUntil: 'networkidle0'});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, slug.replace(/\\//g, '_')) + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
      consoleMessages.length = 0;
      report['/news/[slug]'] = result;
    } else {
      report['/news/[slug]'] = {status: 'no-slug', console: [], screenshot: null};
    }
  } catch (e) {
    report['/news/[slug]'] = {status: 'error', console: [{type: 'exception', text: e.message}], screenshot: null};
  }

  // Authors slug
  try {
    await page.goto(BASE_URL + '/authors', {waitUntil: 'networkidle0'});
    const slug = await getFirstSlug(page, 'a[href^="/authors/"]');
    if (slug) {
      const url = BASE_URL + slug;
      const result = {status: null, console: [], screenshot: null};
      const response = await page.goto(url, {waitUntil: 'networkidle0'});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, slug.replace(/\\//g, '_')) + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
      consoleMessages.length = 0;
      report['/authors/[slug]'] = result;
    } else {
      report['/authors/[slug]'] = {status: 'no-slug', console: [], screenshot: null};
    }
  } catch (e) {
    report['/authors/[slug]'] = {status: 'error', console: [{type: 'exception', text: e.message}], screenshot: null};
  }

  // Podcast slug
  try {
    await page.goto(BASE_URL + '/podcasts', {waitUntil: 'networkidle0'});
    const slug = await getFirstSlug(page, 'a[href^="/podcast/"]');
    if (slug) {
      const url = BASE_URL + slug;
      const result = {status: null, console: [], screenshot: null};
      const response = await page.goto(url, {waitUntil: 'networkidle0'});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, slug.replace(/\\//g, '_')) + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
      consoleMessages.length = 0;
      report['/podcast/[slug]'] = result;
    } else {
      report['/podcast/[slug]'] = {status: 'no-slug', console: [], screenshot: null};
    }
  } catch (e) {
    report['/podcast/[slug]'] = {status: 'error', console: [{type: 'exception', text: e.message}], screenshot: null};
  }

  // Video slug (if /video exists)
  try {
    await page.goto(BASE_URL + '/video', {waitUntil: 'networkidle0'});
    const slug = await getFirstSlug(page, 'a[href^="/video/"]');
    if (slug) {
      const url = BASE_URL + slug;
      const result = {status: null, console: [], screenshot: null};
      const response = await page.goto(url, {waitUntil: 'networkidle0'});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, slug.replace(/\\//g, '_')) + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
      consoleMessages.length = 0;
      report['/video/[slug]'] = result;
    } else {
      report['/video/[slug]'] = {status: 'no-slug', console: [], screenshot: null};
    }
  } catch (e) {
    report['/video/[slug]'] = {status: 'error', console: [{type: 'exception', text: e.message}], screenshot: null};
  }

  // Academy slug
  try {
    await page.goto(BASE_URL + '/academy', {waitUntil: 'networkidle0'});
    const slug = await getFirstSlug(page, 'a[href^="/academy/"]');
    if (slug) {
      const url = BASE_URL + slug;
      const result = {status: null, console: [], screenshot: null};
      const response = await page.goto(url, {waitUntil: 'networkidle0'});
      result.status = response.status();
      result.console = [...consoleMessages];
      const screenshotPath = path.join(screenshotDir, slug.replace(/\\//g, '_')) + '.png';
      await page.screenshot({path: screenshotPath, fullPage: true});
      result.screenshot = screenshotPath;
      consoleMessages.length = 0;
      report['/academy/[slug]'] = result;
    } else {
      report['/academy/[slug]'] = {status: 'no-slug', console: [], screenshot: null};
    }
  } catch (e) {
    report['/academy/[slug]'] = {status: 'error', console: [{type: 'exception', text: e.message}], screenshot: null};
  }

  await browser.close();

  const reportPath = path.join(__dirname, 'functional_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log('Functional verification completed. Report written to', reportPath);
})();
