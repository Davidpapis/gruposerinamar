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
  console.log('Connected to Chrome via CDP');

  // Set viewport
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Navigate to home
  console.log('Navigating to http://localhost:4321/ ...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:4321/' });
  await new Promise(r => setTimeout(r, 2200));

  // Take screenshot of Hero with entrance animations completed & counters animated
  const heroShot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-home-animaciones.png'), Buffer.from(heroShot.data, 'base64'));
  console.log('Saved captura-home-animaciones.png');

  // Check stat counters value
  const statValues = await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'Array.from(document.querySelectorAll(".stat-counter")).map(el => el.textContent.trim())',
    returnByValue: true
  });
  console.log('Stat counters after animation:', statValues.result?.value);

  // Scroll to Corporate Holding Cards (Serinamar, Just Banus, Iberian Sun)
  console.log('Scrolling to Holding section...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 1120, behavior: "smooth" })'
  });
  await new Promise(r => setTimeout(r, 1600));

  // Check reveal states
  const reveals = await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'Array.from(document.querySelectorAll(".holding-card, .reveal-title")).map(el => ({ tag: el.tagName, class: el.className, isRevealed: el.classList.contains("is-revealed") }))',
    returnByValue: true
  });
  console.log('Holding cards reveal status:', reveals.result?.value);

  const cardsShot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-tarjetas-animadas.png'), Buffer.from(cardsShot.data, 'base64'));
  console.log('Saved captura-tarjetas-animadas.png');

  // Scroll down to Featured Properties / Experiences
  console.log('Scrolling to Featured Properties...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'window.scrollTo({ top: 1650, behavior: "smooth" })'
  });
  await new Promise(r => setTimeout(r, 1600));

  const propsShot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-propiedades-animadas.png'), Buffer.from(propsShot.data, 'base64'));
  console.log('Saved captura-propiedades-animadas.png');

  // Now test preview-diseno-inicial.html
  console.log('Navigating to http://localhost:4321/preview-diseno-inicial.html ...');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:4321/preview-diseno-inicial.html' });
  await new Promise(r => setTimeout(r, 2200));

  const previewHeroShot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-preview-animaciones.png'), Buffer.from(previewHeroShot.data, 'base64'));
  console.log('Saved captura-preview-animaciones.png');

  // Scroll to section 6 (Tres Divisiones) in preview-diseno-inicial.html
  console.log('Scrolling to Section 6 in preview...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'document.getElementById("divisiones")?.scrollIntoView({ behavior: "smooth" })'
  });
  await new Promise(r => setTimeout(r, 1600));

  const previewDivisionsShot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'captura-preview-3-divisiones.png'), Buffer.from(previewDivisionsShot.data, 'base64'));
  console.log('Saved captura-preview-3-divisiones.png');

  ws.close();
  console.log('Done verification!');
}

run().catch(console.error);
