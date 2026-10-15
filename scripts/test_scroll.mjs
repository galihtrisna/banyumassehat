import http from 'http';
import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-extensions',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 1500));

// Get websocket debugger url
const targets = await fetch('http://127.0.0.1:9222/json').then(res => res.json());
const pageTarget = targets.find(t => t.type === 'page') || targets[0];
console.log('Selected target:', pageTarget.url, pageTarget.type);

const wsUrl = pageTarget?.webSocketDebuggerUrl;
if (!wsUrl) {
  console.error('No ws url');
  chrome.kill();
  process.exit(1);
}

const ws = new WebSocket(wsUrl);

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
await send('Page.navigate', { url: 'http://localhost:3000/' });
await new Promise(r => setTimeout(r, 2000));

// Check computed styles and scroll properties
const checkRes = await send('Runtime.evaluate', {
  expression: `(() => {
    return {
      htmlHeight: document.documentElement.clientHeight,
      htmlScrollHeight: document.documentElement.scrollHeight,
      bodyHeight: document.body.clientHeight,
      bodyScrollHeight: document.body.scrollHeight,
      htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
      htmlOverflowX: window.getComputedStyle(document.documentElement).overflowX,
      htmlOverflowY: window.getComputedStyle(document.documentElement).overflowY,
      bodyOverflow: window.getComputedStyle(document.body).overflow,
      bodyOverflowX: window.getComputedStyle(document.body).overflowX,
      bodyOverflowY: window.getComputedStyle(document.body).overflowY,
      overscrollBehaviorY: window.getComputedStyle(document.body).overscrollBehaviorY,
      initialScrollY: window.scrollY,
      docElementScrollTop: document.documentElement.scrollTop,
      bodyScrollTop: document.body.scrollTop
    };
  })()`,
  returnByValue: true
});

console.log('Scroll metrics before scroll:', checkRes.result.value);

// Try scrolling window
await send('Runtime.evaluate', {
  expression: `window.scrollBy(0, 500)`
});

await new Promise(r => setTimeout(r, 800));

const afterScroll = await send('Runtime.evaluate', {
  expression: `({
    scrollY: window.scrollY,
    docElementScrollTop: document.documentElement.scrollTop,
    bodyScrollTop: document.body.scrollTop
  })`,
  returnByValue: true
});

console.log('After window.scrollBy(0, 500):', afterScroll.result.value);

// Dispatch wheel event
await send('Input.dispatchMouseEvent', {
  type: 'mouseWheel',
  x: 500,
  y: 500,
  deltaX: 0,
  deltaY: 500
});

await new Promise(r => setTimeout(r, 500));

const afterWheel = await send('Runtime.evaluate', {
  expression: `({
    scrollY: window.scrollY,
    docElementScrollTop: document.documentElement.scrollTop,
    bodyScrollTop: document.body.scrollTop
  })`,
  returnByValue: true
});

console.log('After Input.dispatchMouseEvent mouseWheel:', afterWheel.result.value);

chrome.kill();
process.exit(0);
