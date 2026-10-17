// Renders the social preview images (assets/og-en.jpg, assets/og-tr.jpg) with headless Chrome,
// then converts them to JPG with ImageMagick so they stay small enough for WhatsApp (<300 KB).
// Run after `node build.mjs`, with `node serve.mjs` running: `node tools/og.mjs`.
// Set CHROME to your Chrome/Edge path if it isn't the default Windows install.
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import * as EN from '../content.mjs';
import TR from '../content.tr.mjs';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ORIGIN = 'http://localhost:4321';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const pal = esc(JSON.stringify(EN.palettes.hero));

const card = (role, focus) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Instrument+Serif&display=swap">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #050506; }
  .gl { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; }
  .in { position: absolute; inset: 0; padding: 44px 56px 50px; display: flex; flex-direction: column; justify-content: space-between; color: #f2f1ee; }
  .meta { display: flex; gap: 8px; font: 500 19px/1 'Geist Mono', monospace; }
  .meta span { background: rgba(5, 5, 6, 0.78); padding: 8px 12px; }
  .row { display: flex; justify-content: space-between; align-items: flex-end; }
  h1 { margin: 0; font: 400 118px/0.92 'Instrument Serif', serif; letter-spacing: -0.015em; }
  .url { font: 400 20px/1 'Geist Mono', monospace; color: rgba(242, 241, 238, 0.7); padding-bottom: 10px; }
</style></head><body>
<canvas class="gl" data-hero data-scale="1" data-palette="${pal}"></canvas>
<div class="in">
  <div class="meta"><span>// ${esc(role.toLowerCase())}</span><span>${esc(focus.toLowerCase())}</span></div>
  <div class="row"><h1>Esad Abdullah<br>Kösedağ</h1><span class="url">kaesit.github.io</span></div>
</div>
<script src="/gradient.js"></script>
</body></html>`;

await mkdir('dist/_og', { recursive: true });
for (const [lang, p] of [['en', EN.person], ['tr', { ...EN.person, ...TR.person }]]) {
  await writeFile(`dist/_og/${lang}.html`, card(p.role, p.focus));
  const png = join(tmpdir(), `og-${lang}.png`);
  const out = resolve(`assets/og-${lang}.jpg`);
  execFileSync(CHROME, [
    '--headless=new', `--user-data-dir=${join(tmpdir(), 'og-chrome')}`, '--hide-scrollbars', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--window-size=1200,630', '--virtual-time-budget=5000', `--screenshot=${png}`, `${ORIGIN}/_og/${lang}.html`,
  ], { stdio: 'ignore' });
  execFileSync('magick', [png, '-strip', '-quality', '86', out]);
  console.log('wrote', out);
}
await rm('dist/_og', { recursive: true, force: true });
