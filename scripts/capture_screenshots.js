const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  try {
    // 1. Desktop Screenshot (1440px wide)
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await pageDesktop.evaluate(() => document.fonts.ready);
    // wait a moment for animations
    await new Promise(r => setTimeout(r, 1000));
    const desktopPath = path.join(outDir, 'desktop_full.png');
    await pageDesktop.screenshot({ path: desktopPath, fullPage: true });
    console.log('Desktop screenshot saved:', desktopPath);
    await pageDesktop.close();

    // 2. Mobile Screenshot (iPhone 14 / modern smartphone: 390px wide)
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2
    });
    await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await pageMobile.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1000));
    const mobilePath = path.join(outDir, 'mobile_full.png');
    await pageMobile.screenshot({ path: mobilePath, fullPage: true });
    console.log('Mobile screenshot saved:', mobilePath);
    await pageMobile.close();

  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
