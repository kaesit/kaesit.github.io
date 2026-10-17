// Static site generator. No dependencies: `node build.mjs` writes everything to dist/.
import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import * as C from './content.mjs';

const OUT = 'dist';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
const ext = (href) => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
const pal = (key) => esc(JSON.stringify(C.palettes[key]));
const canvas = (key, extra = '') => `<canvas class="gl" data-palette="${pal(key)}"${extra} aria-hidden="true"></canvas>`;
const ticks = '<i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>';

function layout({ root, title, description, body, path }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#050506">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${C.site.url}/${path}">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="${root}style.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <div class="wrap bar-in">
    <a class="mark mono" href="${root}">${esc(C.person.short)}</a>
    <nav class="mono" aria-label="Main">
      <a href="${root}#work">work</a>
      <a href="${root}#experience">experience</a>
      <a href="${root}#writing">writing</a>
      <a href="${root}#contact">contact</a>
    </nav>
  </div>
</header>
<main id="main" class="wrap frame">
${body}
</main>
<footer class="wrap foot mono">
  <span>&copy; ${new Date(C.site.updated).getFullYear()} ${esc(C.person.name)}</span>
  <span>updated ${C.site.updated}</span>
</footer>
<script src="${root}gradient.js" defer></script>
</body>
</html>
`;
}

const secHead = (n, title, id, aside = '') => `
<div class="sec-head"${id ? ` id="${id}"` : ''}>
  <span class="mono dim">// ${pad(n)}</span>
  <h2>${esc(title)}</h2>
  ${aside}
</div>`;

const readouts = (list, cls = '') => list.length ? `<dl class="readouts ${cls}">${list.map(([v, l]) => `<div><dt>${esc(v)}</dt><dd>${esc(l)}</dd></div>`).join('')}</dl>` : '';

function workCard(w, i) {
  return `
<a class="card${i === 0 ? ' card-lead' : ''}" href="work/${w.slug}.html">
  <div class="card-art">${canvas(w.palette)}<span class="mono card-idx">.${pad(i + 1)}</span></div>
  <div class="card-body">
    <div class="mono meta">${esc(w.period)} <span class="dim">/</span> ${esc(w.kicker)}</div>
    <h3>${esc(w.title)}</h3>
    <p>${esc(w.summary)}</p>
    ${readouts(i === 0 ? w.readouts : w.readouts.slice(0, 2))}
    <span class="mono more">read more <span aria-hidden="true">&rarr;</span></span>
  </div>
</a>`;
}

function index() {
  const p = C.person;
  const body = `
<section class="hero" aria-label="Introduction">
  ${canvas('hero', ' data-hero')}
  <div class="hero-in">
    <div class="mono hero-meta">
      <span>// ${esc(p.role.toLowerCase())}</span>
      <span>${esc(p.focus.toLowerCase())}</span>
      <span>${esc(p.location.toLowerCase())}</span>
    </div>
    <h1 class="hero-name">${esc(p.name.split(' ').slice(0, 2).join(' '))}<br>${esc(p.name.split(' ').slice(2).join(' '))}</h1>
  </div>
  ${ticks}
</section>

<section class="sec intro">
  <p class="lede">${esc(p.role)} studying at ${esc(C.education.school)}. I work on <span class="hl">machine learning for drug discovery</span>, computer vision on embedded hardware, and the software around them.</p>
  <div class="mono intro-links">
    <a href="mailto:${p.email}">${esc(p.email)}</a>
    ${p.links.map((l) => `<a href="${l.href}"${ext(l.href)}>${esc(l.label.toLowerCase())} &#8599;</a>`).join('')}
  </div>
</section>

<section class="sec">
  ${secHead(1, 'Selected work', 'work')}
  <div class="cards">
    ${C.work.map(workCard).join('')}
  </div>
</section>

<section class="sec">
  ${secHead(2, 'Experience', 'experience')}
  <ol class="rows timeline">
    ${C.timeline.map((t) => `<li><a href="${t.href}"><span class="mono dim">${esc(t.period)}</span><span>${esc(t.role)}</span><span class="dim">${esc(t.org)}</span><span class="mono arrow" aria-hidden="true">&rarr;</span></a></li>`).join('')}
  </ol>
  ${C.experience.map((e) => `
  <article class="job" id="${e.org.toLowerCase().replace(/\s+/g, '-')}">
    <div class="job-head">
      <div><h3>${esc(e.org)}</h3><p class="dim">${esc(e.role)}, ${esc(e.place)}</p></div>
      <span class="mono dim">${esc(e.period)}</span>
    </div>
    <ul class="bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </article>`).join('')}
</section>

<section class="sec">
  ${secHead(3, 'Also on GitHub', 'github', `<a class="mono head-link" href="https://github.com/kaesit"${ext('https://')}>all repositories &#8599;</a>`)}
  <ul class="rows repos">
    ${C.repos.map((r) => `<li><a class="mono name" href="https://github.com/kaesit/${r.name}" target="_blank" rel="noopener">${esc(r.name)}</a><span class="desc">${esc(r.desc)}${r.demo ? ` <a class="mono tag" href="${r.demo}" target="_blank" rel="noopener">live demo &#8599;</a>` : ''}</span><span class="mono dim">${esc(r.lang)}</span><span class="mono dim">${r.year}</span></li>`).join('')}
  </ul>
</section>

<section class="sec">
  ${secHead(4, 'Writing', 'writing')}
  <ul class="rows posts">
    ${C.posts.map((s) => `<li><a href="writing/${s.slug}.html"><span class="mono dim">${fmtDate(s.date)}</span><span><span class="ptitle">${esc(s.title)}</span><span class="dim pdek">${esc(s.dek)}</span></span><span class="mono dim">${esc(s.category.toLowerCase())}</span><span class="mono arrow" aria-hidden="true">&rarr;</span></a></li>`).join('')}
  </ul>
</section>

<section class="sec">
  ${secHead(5, 'About', 'about')}
  <div class="about">
    <blockquote class="quote">${esc(p.bio)}</blockquote>
    <dl class="spec">
      <div><dt class="mono">education</dt><dd>${esc(C.education.degree)}<br><span class="dim">${esc(C.education.school)}, ${esc(C.education.place)} &middot; ${esc(C.education.period)}</span></dd></div>
      <div><dt class="mono">coursework</dt><dd>${C.education.courses.map(esc).join(', ')}</dd></div>
      <div><dt class="mono">skills</dt><dd class="chips">${C.skills.map((s) => `<span>${esc(s)}</span>`).join('')}</dd></div>
      <div><dt class="mono">languages</dt><dd>${C.languages.map(esc).join('<br>')}</dd></div>
      <div><dt class="mono">outside work</dt><dd>${C.interests.map(esc).join(', ')}</dd></div>
    </dl>
  </div>
</section>

<section class="sec contact" id="contact">
  <span class="mono dim">// ${pad(6)} contact</span>
  <a class="mail" href="mailto:${p.email}">${esc(p.email)}</a>
  <div class="mono intro-links">
    ${p.links.map((l) => `<a href="${l.href}"${ext(l.href)}>${esc(l.label.toLowerCase())} &#8599;</a>`).join('')}
  </div>
</section>`;
  return layout({ root: './', path: '', title: `${p.name} — ${p.role}`, description: `${p.role} working on ${p.focus.toLowerCase()}. Projects, experience and writing.`, body });
}

function workPage(w, i) {
  const next = C.work[(i + 1) % C.work.length];
  const story = w.story ? `
<section class="sec">
  ${secHead(2, 'Story')}
  <div class="story">
    ${['challenge', 'goal', 'result'].map((k) => `<div><h3 class="mono">${k}</h3><p>${esc(w.story[k])}</p></div>`).join('')}
  </div>
</section>` : '';
  const body = `
<p class="mono crumbs"><a href="../#work">&larr; all work</a></p>
<section class="banner" aria-label="${esc(w.title)}">
  ${canvas(w.palette, ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// ${esc(w.kicker.toLowerCase())}</span><span>${esc(w.period)}</span></div>
    <h1 class="banner-title">${esc(w.title)}</h1>
  </div>
  ${ticks}
</section>

<section class="sec spec-top">
  <p class="lede">${esc(w.summary)}</p>
  <dl class="spec">
    <div><dt class="mono">role</dt><dd>${esc(w.role)}</dd></div>
    <div><dt class="mono">when</dt><dd>${esc(w.period)}</dd></div>
    <div><dt class="mono">context</dt><dd>${esc(w.org)}</dd></div>
    <div><dt class="mono">stack</dt><dd class="chips">${w.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</dd></div>
    ${w.links.length ? `<div><dt class="mono">links</dt><dd class="mono links">${w.links.map((l) => `<a href="${l.href}"${ext(l.href)}>${esc(l.label.toLowerCase())} &#8599;</a>`).join('')}</dd></div>` : ''}
  </dl>
</section>

${w.readouts.length ? `<section class="sec">${readouts(w.readouts, 'big')}</section>` : ''}

${w.bullets.length ? `
<section class="sec">
  ${secHead(1, 'What I did')}
  <ul class="bullets wide">${w.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
</section>` : ''}

${w.image ? `
<figure class="shot">
  <img src="../${w.image.src}" alt="${esc(w.image.alt)}" width="${w.image.w}" height="${w.image.h}" loading="lazy">
  <figcaption class="mono dim">fig. 1 &mdash; ${esc(w.image.alt.toLowerCase())}</figcaption>
  ${ticks}
</figure>` : ''}

${story}

<a class="next" href="${next.slug}.html">
  <span class="mono dim">next project</span>
  <span class="next-title">${esc(next.title)} <span aria-hidden="true">&rarr;</span></span>
</a>`;
  return layout({ root: '../', path: `work/${w.slug}.html`, title: `${w.title} — ${C.person.name}`, description: w.summary, body });
}

function postPage(s) {
  const body = `
<p class="mono crumbs"><a href="../#writing">&larr; all writing</a></p>
<section class="banner banner-post" aria-label="${esc(s.title)}">
  ${canvas(s.palette, ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// ${esc(s.category.toLowerCase())}</span><span>${fmtDate(s.date)}</span><span>${s.minutes} min read</span></div>
    <h1 class="banner-title">${esc(s.title)}</h1>
  </div>
  ${ticks}
</section>
<article class="prose">
  <p class="dek">${esc(s.dek)}</p>
  ${s.body.map(([t, x]) => `<${t}>${esc(x)}</${t}>`).join('\n  ')}
  <p class="mono dim sign">&mdash; ${esc(C.person.name)}</p>
</article>`;
  return layout({ root: '../', path: `writing/${s.slug}.html`, title: `${s.title} — ${C.person.name}`, description: s.dek, body });
}

function notFound() {
  const body = `
<section class="banner" aria-label="Not found">
  ${canvas('board', ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// 404</span></div>
    <h1 class="banner-title">Nothing here.</h1>
  </div>
  ${ticks}
</section>
<p class="sec mono"><a href="/">&larr; back home</a></p>`;
  return layout({ root: '/', path: '404.html', title: `Not found — ${C.person.name}`, description: 'Page not found.', body });
}

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/work`, { recursive: true });
await mkdir(`${OUT}/writing`, { recursive: true });
await cp('assets', OUT, { recursive: true });
await writeFile(`${OUT}/index.html`, index());
await writeFile(`${OUT}/404.html`, notFound());
for (const [i, w] of C.work.entries()) await writeFile(`${OUT}/work/${w.slug}.html`, workPage(w, i));
for (const s of C.posts) await writeFile(`${OUT}/writing/${s.slug}.html`, postPage(s));
console.log(`built ${2 + C.work.length + C.posts.length} pages -> ${OUT}/`);
