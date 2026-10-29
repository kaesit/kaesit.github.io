// Static site generator. No dependencies: `node build.mjs` writes everything to dist/.
// English pages go to dist/, Turkish pages to dist/tr/. Text lives in content.mjs and content.tr.mjs.
import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import * as EN from './content.mjs';
import TR from './content.tr.mjs';
import * as ONCO from './oncomind.mjs';

const OUT = 'dist';
const LANGS = { en: { base: '/', locale: 'en-GB', og: 'en_US' }, tr: { base: '/tr/', locale: 'tr-TR', og: 'tr_TR' } };

const UI = {
  en: {
    nav: { work: 'work', experience: 'experience', writing: 'writing', contact: 'contact' },
    skip: 'Skip to content', updated: 'updated', light: 'light', dark: 'dark',
    toLight: 'Switch to light mode', toDark: 'Switch to dark mode', langName: 'Türkçe',
    lede: ['Software engineer studying at Fırat University. I work on ', 'machine learning for drug discovery', ', computer vision on embedded hardware, and the software around them.'],
    sections: { work: 'Selected work', experience: 'Experience', github: 'Also on GitHub', writing: 'Writing', about: 'About', contact: 'contact' },
    readMore: 'read more', allRepos: 'all repositories', liveDemo: 'live demo', cv: 'cv (pdf)',
    currently: 'currently', now: { building: 'building', studying: 'studying', latest: 'latest post' }, favorites: 'favorites',
    spec: { role: 'role', when: 'when', context: 'context', stack: 'stack', links: 'links' },
    did: 'What I did', story: 'Story', shots: 'Screenshots', storyKeys: { challenge: 'challenge', goal: 'goal', result: 'result' },
    allWork: 'all work', allWriting: 'all writing', nextProject: 'next project', minRead: 'min read', fig: 'fig.',
    about: { education: 'education', coursework: 'coursework', skills: 'skills', languages: 'languages', outside: 'outside work' },
    notFound: 'Nothing here.', backHome: 'back home',
    desc: (p) => `${p.role} working on ${p.focus.toLowerCase()}. Projects, experience and writing.`,
  },
  tr: {
    nav: { work: 'projeler', experience: 'deneyim', writing: 'yazılar', contact: 'iletişim' },
    skip: 'İçeriğe geç', updated: 'güncellendi', light: 'açık', dark: 'koyu',
    toLight: 'Açık temaya geç', toDark: 'Koyu temaya geç', langName: 'English',
    lede: ['Fırat Üniversitesi’nde okuyan bir yazılım mühendisiyim. ', 'İlaç keşfi için makine öğrenmesi', ', gömülü donanımda bilgisayarlı görü ve bunların etrafındaki yazılımlar üzerine çalışıyorum.'],
    sections: { work: 'Seçili projeler', experience: 'Deneyim', github: 'GitHub’da diğerleri', writing: 'Yazılar', about: 'Hakkımda', contact: 'iletişim' },
    readMore: 'devamı', allRepos: 'tüm depolar', liveDemo: 'canlı demo', cv: 'özgeçmiş (pdf)',
    currently: 'şu sıralar', now: { building: 'geliştiriyorum', studying: 'okuyorum', latest: 'son yazı' }, favorites: 'favoriler',
    spec: { role: 'rol', when: 'tarih', context: 'bağlam', stack: 'teknolojiler', links: 'bağlantılar' },
    did: 'Neler yaptım', story: 'Hikâye', shots: 'Ekran görüntüleri', storyKeys: { challenge: 'zorluk', goal: 'hedef', result: 'sonuç' },
    allWork: 'tüm projeler', allWriting: 'tüm yazılar', nextProject: 'sonraki proje', minRead: 'dk okuma', fig: 'şekil',
    about: { education: 'eğitim', coursework: 'dersler', skills: 'yetenekler', languages: 'diller', outside: 'iş dışında' },
    notFound: 'Burada bir şey yok.', backHome: 'ana sayfaya dön',
    desc: (p) => `${p.focus} üzerine çalışan ${p.role.toLowerCase()}. Projeler, deneyim ve yazılar.`,
  },
};

// Merge the Turkish overrides onto the English content.
function localize(lang) {
  if (lang === 'en') return EN;
  const t = TR;
  const merge = (a, b) => ({ ...a, ...Object.fromEntries(Object.entries(b || {}).filter(([, v]) => v !== undefined)) });
  return {
    ...EN,
    person: merge(EN.person, t.person),
    work: EN.work.map((w) => {
      const o = t.work[w.slug] || {};
      return {
        ...merge(w, { ...o, links: undefined, gallery: undefined, imageAlt: undefined }),
        story: w.story ? merge(w.story, o.story) : w.story,
        links: w.links.map((l, i) => ({ ...l, label: o.links?.[i] ?? l.label })),
        gallery: w.gallery?.map((g, i) => ({ ...g, caption: o.gallery?.[i] ?? g.caption })),
        image: w.image && { ...w.image, alt: o.imageAlt ?? w.image.alt },
      };
    }),
    experience: EN.experience.map((e, i) => merge(e, t.experience?.[i])),
    timeline: EN.timeline.map((e, i) => merge(e, t.timeline?.[i])),
    repos: EN.repos.map((r) => ({ ...r, desc: t.repos?.[r.name] ?? r.desc })),
    education: merge(EN.education, t.education),
    skills: t.skills || EN.skills,
    languages: t.languages || EN.languages,
    interests: t.interests || EN.interests,
    currently: EN.currently.map((e, i) => merge(e, t.currently?.[i])),
    favorites: EN.favorites.map((e, i) => merge(e, t.favorites?.[i])),
    posts: EN.posts.map((p) => merge(p, t.posts?.[p.slug])),
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const ext = (href) => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
// EK plate logo, inlined in the header (same drawing as assets/logo-ek.svg).
const LOGO = `<svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="9" fill="#050506"/><g fill="#f2f1ee"><rect x="7" y="11" width="5" height="20"/><rect x="7" y="11" width="13" height="5"/><rect x="7" y="18.5" width="11" height="5"/><rect x="7" y="26" width="13" height="5"/><rect x="24" y="11" width="5" height="20"/><polygon points="29,19 36,11 42,11 32,22"/><polygon points="29,23 32,20 42,31 36,31"/></g><rect x="7" y="35" width="13" height="3" fill="#ff6a2b"/><rect x="21" y="35" width="10" height="3" fill="#1b1f6b"/><rect x="32" y="35" width="10" height="3" fill="#2b2b38"/></svg>`;
const ticks = '<i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>';

function page(C, lang) {
  const { base, locale } = LANGS[lang];
  const ui = UI[lang];
  const other = lang === 'en' ? 'tr' : 'en';
  const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const pal = (key) => esc(JSON.stringify(C.palettes[key]));
  const canvas = (key, extra = '') => `<canvas class="gl" data-palette="${pal(key)}"${extra} aria-hidden="true"></canvas>`;
  const href = (p) => (p.startsWith('#') ? base + p : base + p);

  function layout({ title, description, body, path, head = '', scripts = '', bodyClass = '', noDate = false }) {
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#050506">
<link rel="canonical" href="${C.site.url}${base}${path}">
<link rel="alternate" hreflang="en" href="${C.site.url}/${path}">
<link rel="alternate" hreflang="tr" href="${C.site.url}/tr/${path}">
<link rel="alternate" hreflang="x-default" href="${C.site.url}/${path}">
<meta property="og:site_name" content="${esc(C.person.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${path.startsWith('writing/') ? 'article' : 'website'}">
<meta property="og:url" content="${C.site.url}${base}${path}">
<meta property="og:locale" content="${LANGS[lang].og}">
<meta property="og:image" content="${C.site.url}/og-${lang}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(C.person.name)} — ${esc(C.person.role)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${C.site.url}/og-${lang}.jpg">
<script>try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="/style.css">
${head}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#main">${ui.skip}</a>
<header class="bar">
  <div class="wrap bar-in">
    <a class="mark mono" href="${base}">${LOGO}<span>${esc(C.person.short)}</span></a>
    <nav class="mono" aria-label="Main">
      <a href="${base}#work">${ui.nav.work}</a>
      <a href="${base}#experience">${ui.nav.experience}</a>
      <a href="${base}#writing">${ui.nav.writing}</a>
      <a href="${base}#contact">${ui.nav.contact}</a>
      <span class="sep" aria-hidden="true"></span>
      <a class="lang" href="${LANGS[other].base}${path === '404.html' ? '' : path}" hreflang="${other}" lang="${other}" title="${ui.langName}">${other}</a>
      <button class="theme" type="button" data-light="${ui.light}" data-dark="${ui.dark}" data-to-light="${ui.toLight}" data-to-dark="${ui.toDark}" aria-label="${ui.toLight}">${ui.light}</button>
    </nav>
  </div>
</header>
<main id="main" class="wrap frame">
${body}
</main>
<footer class="wrap foot mono">
  <span>&copy; ${noDate ? '' : new Date(C.site.updated).getFullYear() + ' '}${esc(C.person.name)}</span>
  ${noDate ? '' : `<span>${ui.updated} ${C.site.updated}</span>`}
</footer>
<script src="/site.js" defer></script>
<script src="/gradient.js" defer></script>
${scripts}
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
  // A link with local: true is a page on this site, resolved against the current language.
  const linkList = (links) => links.map((l) => l.local
    ? `<a href="${base}${l.href}">${esc(l.label.toLowerCase())} &rarr;</a>`
    : `<a href="${l.href}"${ext(l.href)}>${esc(l.label.toLowerCase())} &#8599;</a>`).join('');
  const personLinks = () => linkList([...C.person.links, ...(C.person.cv ? [{ label: ui.cv, href: C.person.cv }] : [])]);

  function workCard(w, i) {
    return `
<a class="card${i === 0 ? ' card-lead' : ''}" href="${base}${w.route || `work/${w.slug}.html`}">
  <div class="card-art">${canvas(w.palette)}<span class="mono card-idx">.${pad(i + 1)}</span></div>
  <div class="card-body">
    <div class="mono meta">${esc(w.period)} <span class="dim">/</span> ${esc(w.kicker)}</div>
    <h3>${esc(w.title)}</h3>
    <p>${esc(w.summary)}</p>
    ${readouts(i === 0 ? w.readouts : w.readouts.slice(0, 2))}
    <span class="mono more">${ui.readMore} <span aria-hidden="true">&rarr;</span></span>
  </div>
</a>`;
  }

  function currently() {
    const latest = C.posts[0];
    const rows = [
      ...C.currently,
      ...(latest ? [{ key: 'latest', value: latest.title, href: `${base}writing/${latest.slug}.html` }] : []),
    ];
    const val = (r) => r.href ? `<a href="${r.href}"${ext(r.href)}>${esc(r.value)}${/^https?:/.test(r.href) ? ' &#8599;' : ''}</a>` : esc(r.value);
    return `<aside class="now" aria-label="${ui.currently}">
    <div class="now-head mono"><span>// ${ui.currently}</span><i class="now-led" aria-hidden="true"></i></div>
    <dl>${rows.map((r) => `<div><dt class="mono">${ui.now[r.key] || esc(r.key)}</dt><dd>${val(r)}${r.note ? `<span class="dim now-note">${esc(r.note)}</span>` : ''}</dd></div>`).join('')}</dl>
  </aside>`;
  }

  function favorites() {
    return `<div class="favs">
    <span class="mono dim">// ${ui.favorites}</span>
    <ul class="fav-list">${C.favorites.map((f) => `<li><div class="fav-head"><span class="fav-title">${esc(f.title)}</span><span class="mono dim">${esc(f.year)} &middot; ${esc(f.kind.toLocaleLowerCase(locale))}</span></div><p>${esc(f.note)}</p></li>`).join('')}</ul>
  </div>`;
  }

  function index() {
    const p = C.person;
    const [l1, l2, l3] = ui.lede;
    const body = `
<section class="hero" aria-label="${esc(p.name)}">
  ${canvas('hero', ' data-hero')}
  <div class="hero-in">
    <div class="mono hero-meta">
      <span>// ${esc(p.role.toLocaleLowerCase(locale))}</span>
      <span>${esc(p.focus.toLocaleLowerCase(locale))}</span>
      <span>${esc(p.location.toLocaleLowerCase(locale))}</span>
    </div>
    <h1 class="hero-name">${esc(p.name.split(' ').slice(0, 2).join(' '))}<br>${esc(p.name.split(' ').slice(2).join(' '))}</h1>
  </div>
  ${ticks}
</section>

<section class="sec intro">
  <div class="intro-main">
    <p class="lede">${esc(l1)}<span class="hl">${esc(l2)}</span>${esc(l3)}</p>
    <div class="mono intro-links">
      <a href="mailto:${p.email}">${esc(p.email)}</a>
      ${personLinks()}
    </div>
  </div>
  ${currently()}
</section>

<section class="sec">
  ${secHead(1, ui.sections.work, 'work')}
  <div class="cards">
    ${C.work.map(workCard).join('')}
  </div>
</section>

<section class="sec">
  ${secHead(2, ui.sections.experience, 'experience')}
  <ol class="rows timeline">
    ${C.timeline.map((t) => `<li><a href="${href(t.href)}"><span class="mono dim">${esc(t.period)}</span><span>${esc(t.role)}</span><span class="dim">${esc(t.org)}</span><span class="mono arrow" aria-hidden="true">&rarr;</span></a></li>`).join('')}
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
  ${secHead(3, ui.sections.github, 'github', `<a class="mono head-link" href="https://github.com/kaesit" target="_blank" rel="noopener">${ui.allRepos} &#8599;</a>`)}
  <ul class="rows repos">
    ${C.repos.map((r) => `<li><a class="mono name" href="https://github.com/kaesit/${r.name}" target="_blank" rel="noopener">${esc(r.name)}</a><span class="desc">${esc(r.desc)}${r.demo ? ` <a class="mono tag" href="${r.demo}" target="_blank" rel="noopener">${ui.liveDemo} &#8599;</a>` : ''}</span><span class="mono dim">${esc(r.lang)}</span><span class="mono dim">${r.year}</span></li>`).join('')}
  </ul>
</section>

<section class="sec">
  ${secHead(4, ui.sections.writing, 'writing')}
  <ul class="rows posts">
    ${C.posts.map((s) => `<li><a href="${base}writing/${s.slug}.html"><span class="mono dim">${fmtDate(s.date)}</span><span><span class="ptitle">${esc(s.title)}</span><span class="dim pdek">${esc(s.dek)}</span></span><span class="mono dim">${esc(s.category.toLocaleLowerCase(locale))}</span><span class="mono arrow" aria-hidden="true">&rarr;</span></a></li>`).join('')}
  </ul>
</section>

<section class="sec">
  ${secHead(5, ui.sections.about, 'about')}
  <div class="about">
    <blockquote class="quote">${esc(p.bio)}</blockquote>
    <dl class="spec">
      <div><dt class="mono">${ui.about.education}</dt><dd>${esc(C.education.degree)}<br><span class="dim">${esc(C.education.school)}, ${esc(C.education.place)} &middot; ${esc(C.education.period)}</span></dd></div>
      <div><dt class="mono">${ui.about.coursework}</dt><dd>${C.education.courses.map(esc).join(', ')}</dd></div>
      <div><dt class="mono">${ui.about.skills}</dt><dd class="chips">${C.skills.map((s) => `<span>${esc(s)}</span>`).join('')}</dd></div>
      <div><dt class="mono">${ui.about.languages}</dt><dd>${C.languages.map(esc).join('<br>')}</dd></div>
      <div><dt class="mono">${ui.about.outside}</dt><dd>${C.interests.map(esc).join(', ')}</dd></div>
    </dl>
  </div>
  ${favorites()}
</section>

<section class="sec contact" id="contact">
  <span class="mono dim">// ${pad(6)} ${ui.sections.contact}</span>
  <a class="mail" href="mailto:${p.email}">${esc(p.email)}</a>
  <div class="mono intro-links">
    ${personLinks()}
  </div>
</section>`;
    return layout({ path: '', title: `${p.name} — ${p.role}`, description: ui.desc(p), body });
  }

  function workPage(w, i) {
    const next = C.work[(i + 1) % C.work.length];
    let n = 0;
    const story = w.story ? `
<section class="sec">
  ${secHead(++n, ui.story)}
  <div class="story">
    ${['challenge', 'goal', 'result'].map((k) => `<div><h3 class="mono">${ui.storyKeys[k]}</h3><p>${esc(w.story[k])}</p></div>`).join('')}
  </div>
</section>` : '';
    const did = w.bullets.length ? `
<section class="sec">
  ${secHead(++n, ui.did)}
  <ul class="bullets wide">${w.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
</section>` : '';
    const figure = w.image ? `
<figure class="shot">
  <img src="/${w.image.src}" alt="${esc(w.image.alt)}" width="${w.image.w}" height="${w.image.h}" loading="lazy">
  <figcaption class="mono dim">${ui.fig} 1 &mdash; ${esc(w.image.alt.toLocaleLowerCase(locale))}</figcaption>
</figure>` : '';
    const gallery = w.gallery ? `
<section class="sec">
  ${secHead(++n, ui.shots)}
  <div class="gallery">
    ${w.gallery.map((g, k) => `<figure class="${g.wide || g.w / g.h > 2 ? 'wide' : ''}"><a href="/${g.src}" target="_blank" rel="noopener"><img src="/${g.src}" alt="${esc(g.caption)}" width="${g.w}" height="${g.h}" style="max-width:${g.w}px" loading="lazy"></a><figcaption class="mono dim">${ui.fig} ${k + 1} &mdash; ${esc(g.caption.toLocaleLowerCase(locale))}</figcaption></figure>`).join('')}
  </div>
</section>` : '';

    const body = `
<p class="mono crumbs"><a href="${base}#work">&larr; ${ui.allWork}</a></p>
<section class="banner" aria-label="${esc(w.title)}">
  ${canvas(w.palette, ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// ${esc(w.kicker.toLocaleLowerCase(locale))}</span><span>${esc(w.period)}</span></div>
    <h1 class="banner-title">${esc(w.title)}</h1>
  </div>
  ${ticks}
</section>

<section class="sec spec-top">
  <p class="lede">${esc(w.summary)}</p>
  <dl class="spec">
    <div><dt class="mono">${ui.spec.role}</dt><dd>${esc(w.role)}</dd></div>
    <div><dt class="mono">${ui.spec.when}</dt><dd>${esc(w.period)}</dd></div>
    <div><dt class="mono">${ui.spec.context}</dt><dd>${esc(w.org)}</dd></div>
    <div><dt class="mono">${ui.spec.stack}</dt><dd class="chips">${w.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</dd></div>
    ${w.links.length ? `<div><dt class="mono">${ui.spec.links}</dt><dd class="mono links">${linkList(w.links)}</dd></div>` : ''}
  </dl>
</section>

${w.readouts.length ? `<section class="sec">${readouts(w.readouts, 'big')}</section>` : ''}
${did}
${figure}
${gallery}
${story}

<a class="next" href="${base}${next.route || `work/${next.slug}.html`}">
  <span class="mono dim">${ui.nextProject}</span>
  <span class="next-title">${esc(next.title)} <span aria-hidden="true">&rarr;</span></span>
</a>`;
    return layout({ path: `work/${w.slug}.html`, title: `${w.title} — ${C.person.name}`, description: w.summary, body });
  }

  function postPage(s) {
    const block = ([t, x]) => t === 'ul'
      ? `<ul>${x.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`
      : `<${t}>${esc(x)}</${t}>`;
    const body = `
<p class="mono crumbs"><a href="${base}#writing">&larr; ${ui.allWriting}</a></p>
<section class="banner banner-post" aria-label="${esc(s.title)}">
  ${canvas(s.palette, ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// ${esc(s.category.toLocaleLowerCase(locale))}</span><span>${fmtDate(s.date)}</span><span>${s.minutes} ${ui.minRead}</span></div>
    <h1 class="banner-title">${esc(s.title)}</h1>
  </div>
  ${ticks}
</section>
<article class="prose">
  <p class="dek">${esc(s.dek)}</p>
  ${s.body.map(block).join('\n  ')}
  <p class="mono dim sign">&mdash; ${esc(C.person.name)}</p>
</article>`;
    return layout({ path: `writing/${s.slug}.html`, title: `${s.title} — ${C.person.name}`, description: s.dek, body });
  }

  function notFound() {
    const body = `
<section class="banner" aria-label="404">
  ${canvas('board', ' data-hero')}
  <div class="banner-in">
    <div class="mono hero-meta"><span>// 404</span></div>
    <h1 class="banner-title">${ui.notFound}</h1>
  </div>
  ${ticks}
</section>
<p class="sec mono"><a href="${base}">&larr; ${ui.backHome}</a></p>`;
    return layout({ path: '404.html', title: `404 — ${C.person.name}`, description: ui.notFound, body });
  }

  // OncoMind project preview (oncomind.mjs holds its copy and markup).
  function oncomind() {
    const o = ONCO.render({ lang, base, esc, canvas, ticks });
    return layout({ path: 'oncomind/', title: o.title, description: o.description, body: o.body, head: o.head, scripts: o.scripts, bodyClass: 'onco-page', noDate: true });
  }

  return { index, workPage, postPage, notFound, oncomind };
}

await rm(OUT, { recursive: true, force: true });
await cp('assets', OUT, { recursive: true });
let count = 0;
const paths = [];
for (const lang of Object.keys(LANGS)) {
  const C = localize(lang);
  const dir = OUT + LANGS[lang].base.replace(/\/$/, '');
  const P = page(C, lang);
  await mkdir(`${dir}/work`, { recursive: true });
  await mkdir(`${dir}/writing`, { recursive: true });
  await writeFile(`${dir}/index.html`, P.index());
  if (lang === 'en') await writeFile(`${dir}/404.html`, P.notFound());
  for (const [i, w] of C.work.entries()) if (!w.route) await writeFile(`${dir}/work/${w.slug}.html`, P.workPage(w, i));
  for (const s of C.posts) await writeFile(`${dir}/writing/${s.slug}.html`, P.postPage(s));
  await mkdir(`${dir}/oncomind`, { recursive: true });
  await writeFile(`${dir}/oncomind/index.html`, P.oncomind());
  count += 2 + C.work.filter((w) => !w.route).length + C.posts.length;
  if (lang === 'en') paths.push('', 'oncomind/', ...C.work.filter((w) => !w.route).map((w) => `work/${w.slug}.html`), ...C.posts.map((p) => `writing/${p.slug}.html`));
}

// sitemap.xml lists every page in both languages; robots.txt points crawlers to it.
const url = (lang, p) => `${EN.site.url}${LANGS[lang].base}${p}`;
const entry = (lang, p) => `  <url>
    <loc>${url(lang, p)}</loc>
    <lastmod>${EN.site.updated}</lastmod>
${Object.keys(LANGS).map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, p)}"/>`).join('\n')}
  </url>`;
await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(LANGS).flatMap((l) => paths.map((p) => entry(l, p))).join('\n')}
</urlset>
`);
await writeFile(`${OUT}/robots.txt`, `User-agent: *
Allow: /

Sitemap: ${EN.site.url}/sitemap.xml
`);
console.log(`built ${count + 1} pages -> ${OUT}/`);
