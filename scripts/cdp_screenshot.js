const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Launching headless Chrome with remote debugging on port ' + PORT);
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-sandbox',
    '--mute-audio',
    'about:blank',
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Failed to spawn Chrome:', err);
  });

  // wait for Chrome debugging port to be ready
  let targetWsUrl = null;
  for (let i = 0; i < 30; i++) {
    await delay(300);
    try {
      const targets = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
      if (targets && targets.length > 0) {
        targetWsUrl = targets[0].webSocketDebuggerUrl;
        break;
      }
    } catch (e) {
      // still starting up
    }
  }

  if (!targetWsUrl) {
    console.error('Could not obtain Chrome debugger websocket URL.');
    chromeProcess.kill();
    return;
  }

  console.log('Connected to Chrome target:', targetWsUrl);

  const ws = new WebSocket(targetWsUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        reject(msg.error);
      } else {
        resolve(msg.result);
      }
    }
  };

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  try {
    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');

    // --- 1. CAPTURE DESKTOP SCREENSHOT (1440px) ---
    console.log('Capturing Desktop full page (1440px)...');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
      mobile: false,
    });

    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await delay(2500); // Wait for fonts and components to render

    const desktopResult = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      fromSurface: true,
    });

    const desktopBuffer = Buffer.from(desktopResult.data, 'base64');
    const desktopOutPath = path.join(OUTPUT_DIR, 'desktop_full.png');
    fs.writeFileSync(desktopOutPath, desktopBuffer);
    console.log('Saved Desktop Full Screenshot to:', desktopOutPath, `(${desktopBuffer.length} bytes)`);

    // --- 2. CAPTURE MOBILE SCREENSHOT (390px, modern iPhone/Android) ---
    console.log('Capturing Mobile full page (390px)...');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await delay(2500); // Wait for responsive relayout

    const mobileResult = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      fromSurface: true,
    });

    const mobileBuffer = Buffer.from(mobileResult.data, 'base64');
    const mobileOutPath = path.join(OUTPUT_DIR, 'mobile_full.png');
    fs.writeFileSync(mobileOutPath, mobileBuffer);
    console.log('Saved Mobile Full Screenshot to:', mobileOutPath, `(${mobileBuffer.length} bytes)`);

    console.log('Screenshots capture complete!');
  } catch (err) {
    console.error('Error in CDP commands:', err);
  } finally {
    ws.close();
    chromeProcess.kill();
  }
}

run();
