import http from 'http';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/Users/davidpapis/.gemini/antigravity/brain/f4e39e50-abe3-46a8-8159-f1ad3de1303f';

async function getPages() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (evt) => {
      const res = JSON.parse(evt.data);
      if (res.id === id) {
        ws.removeEventListener('message', handler);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  const pages = await getPages();
  const page = pages.find(p => p.type === 'page');
  if (!page) {
    console.error('No page found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res);
    ws.addEventListener('error', rej);
  });

  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('Navigating to http://localhost:4321/ ...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:4321/' });
  await new Promise(r => setTimeout(r, 2000));

  // Capture full page screenshot
  const metrics = await sendCommand(ws, 'Page.getLayoutMetrics');
  const width = Math.ceil(metrics.contentSize.width);
  const height = Math.ceil(metrics.contentSize.height);

  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: width,
    height: height,
    deviceScaleFactor: 1,
    mobile: false
  });

  const fullShot = await sendCommand(ws, 'Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true
  });

  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-web-completa.png'), Buffer.from(fullShot.data, 'base64'));
  console.log('Saved captura-web-completa.png');

  // Reset viewport
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  ws.close();
}

run().catch(console.error);

