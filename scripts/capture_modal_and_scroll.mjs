import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-extensions',
  '--hide-scrollbars',
  '--window-size=1280,1000',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 1500));

const targets = await fetch('http://127.0.0.1:9222/json').then(res => res.json());
const pageTarget = targets.find(t => t.type === 'page') || targets[0];

const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

function send(method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (event) => {
      const data = JSON.parse(event.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await new Promise(r => ws.onopen = r);

await send('Page.enable');
await send('DOM.enable');

// Navigate to jadwal dokter
await send('Page.navigate', { url: 'http://localhost:3000/jadwal-dokter' });
await new Promise(r => setTimeout(r, 2000));

await send('Runtime.evaluate', {
  expression: `document.fonts.ready`,
  awaitPromise: true
});

// Click on the first doctor card to open the detail modal
console.log('Clicking on first doctor card...');
await send('Runtime.evaluate', {
  expression: `(() => {
    const card = document.querySelector('[role="button"]');
    if (card) card.click();
    return !!card;
  })()`
});

await new Promise(r => setTimeout(r, 1200));

await send('Runtime.evaluate', {
  expression: `document.fonts.ready`,
  awaitPromise: true
});

// Capture screenshot with modal open
const shotRes = await send('Page.captureScreenshot', { format: 'png' });
const shotBuf = Buffer.from(shotRes.data, 'base64');

const outPath = 'screenshots/dokter_modal_detail.png';
fs.writeFileSync(outPath, shotBuf);
console.log('Saved modal screenshot to', outPath);

// Also copy to artifact directory
const artifactDir = 'C:\\Users\\galih\\.gemini\\antigravity-cli\\brain\\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748';
fs.writeFileSync(path.join(artifactDir, 'dokter_modal_detail.png'), shotBuf);
console.log('Copied modal screenshot to artifact dir');

chrome.kill();
process.exit(0);
