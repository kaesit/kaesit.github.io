// OncoMind preview: the four moving parts. Everything on the page is readable without this file;
// it only unhides controls and wires them up. Nothing here loads or shows research data.
(() => {
  const root = document.getElementById('om');
  if (!root) return;
  root.classList.add('om-js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = root) => el.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const fill = (tpl, o) => tpl.replace(/\{(\w)\}/g, (_, k) => o[k]);
  const setRangeFill = (r) => r.style.setProperty('--p', `${(100 * (r.value - r.min)) / (r.max - r.min)}%`);

  // ---------- Plate III: the life cycle (tabs around a ring) ----------
  (() => {
    const ring = $('.cycle-ring');
    if (!ring) return;
    const tabs = $$('.cycle-tabs [role="tab"]');
    const steps = $('.cycle-steps');
    const panels = $$('.cycle-steps > li');
    const nodes = $$('#om-cycle .node');
    const arcs = $$('#om-cycle .arc');
    const orbit = $('#cycle-orbit');
    const nav = $('.cycle-nav');
    const next = $('[data-dir="1"]', nav);
    const loop = $('.cycle-loop');
    const n = tabs.length;
    let cur = 0, deg = 0;
    $('.cycle-tabs').hidden = false; nav.hidden = false; $('.cycle-hint').hidden = false;
    steps.setAttribute('role', 'none');
    panels.forEach((p, i) => { p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', tabs[i].id); p.tabIndex = 0; });
    // announce stage changes only when they come from Prev/Next (tab focus already announces them)
    const say = document.createElement('p'); say.className = 'sr-only'; say.setAttribute('aria-live', 'polite'); nav.after(say);
    // the panel sits in the middle of the ring on wide screens, under it otherwise
    const wide = matchMedia('(min-width: 1100px)');
    const place = () => { if (wide.matches) ring.appendChild(steps); else ring.after(steps); };
    place(); wide.addEventListener('change', place);
    if (!reduce) orbit.style.transition = 'transform .7s cubic-bezier(.2,.7,.2,1)';

    function select(i, focus, announce) {
      i = (i + n) % n;
      let d = ((i - cur) % n + n) % n; if (d > n / 2) d -= n; // shortest way round
      deg += (d * 360) / n; cur = i;
      orbit.style.transform = `rotate(${deg}deg)`;
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => p.classList.toggle('is-on', k === i));
      nodes.forEach((nd, k) => { nd.classList.toggle('is-on', k === i); nd.classList.toggle('is-seen', k < i); });
      arcs.forEach((a, k) => { const on = k < i; a.classList.toggle('is-done', on); a.setAttribute('marker-end', on ? 'url(#om-arrow-om)' : 'url(#om-arrow)'); });
      const last = i === n - 1;
      next.textContent = `${last ? next.dataset.restart : next.dataset.next} →`;
      if (announce) say.textContent = panels[i].querySelector('.mono').textContent;
      if (loop) loop.hidden = !last;
      if (focus) tabs[i].focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (k) { e.preventDefault(); select(cur + k, true); }
        else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
        else if (e.key === 'End') { e.preventDefault(); select(n - 1, true); }
      });
    });
    nodes.forEach((nd, i) => nd.addEventListener('click', () => select(i)));
    $$('button', nav).forEach((b) => b.addEventListener('click', () => select(cur + Number(b.dataset.dir), false, true)));
    select(0);
  })();

  // ---------- Plate IV: reading a SMILES string ----------
  (() => {
    const box = $('.om-mol');
    if (!box) return;
    const svg = $('#om-molecule');
    const chars = $$('.smiles .ch', box);
    const range = $('#mol-range');
    const capHead = $('.om-mol-cap .mono', box);
    const capText = $('.om-mol-cap p:last-child', box);
    const anchor = $('.anchor-ring', svg);
    const stepBtn = $('[data-act="step"]', box);
    const viewBtn = $('[data-act="view"]', box);
    const gcap = $('.om-mol-gcap', box);
    const texts = JSON.parse(box.dataset.chars);
    const total = chars.length;
    $('.om-mol-ctrl', box).hidden = false;
    const atomEl = (id) => $(`.atom[data-a="${id}"]`, svg);
    const bondEl = (id) => $(`.bond[data-b="${id}"]`, svg);
    let timer = null;

    function show(i) {
      i = Math.max(0, Math.min(total - 1, i));
      range.value = i; setRangeFill(range);
      chars.forEach((c, k) => { c.classList.toggle('is-current', k === i); c.classList.toggle('is-past', k < i); });
      $$('.is-hot', svg).forEach((el) => el.classList.remove('is-hot'));
      anchor.classList.remove('is-on');
      const parts = chars[i].dataset.map.split(' ');
      const kind = parts[0];
      const hot = (tok) => {
        if (tok[0] === 'a') atomEl(tok)?.classList.add('is-hot');
        else if (tok[0] === 'b') bondEl(tok.slice(1))?.classList.add('is-hot');
      };
      if (kind === 'br') {
        const a = atomEl(parts[1]); const c = a && $('.knock', a);
        if (c) { anchor.setAttribute('cx', c.getAttribute('cx')); anchor.setAttribute('cy', c.getAttribute('cy')); anchor.classList.add('is-on'); }
      } else if (kind === 'ring') {
        const t = parts[1];
        if (t[0] === 'a') { hot(t); } else { hot(t); const [x, y] = t.slice(1).split('-'); hot(`a${x}`); hot(`a${y}`); }
      } else parts.forEach(hot);
      const ch = chars[i].textContent;
      capHead.textContent = `${fill(box.dataset.charof, { n: i + 1, t: total })} · ${ch}`;
      capText.textContent = texts[i];
      range.setAttribute('aria-valuetext', `${fill(box.dataset.charof, { n: i + 1, t: total })}: ${ch}, ${texts[i]}`);
    }
    const live = $('.om-mol-cap', box);
    function stop() { clearInterval(timer); timer = null; stepBtn.classList.remove('is-on'); stepBtn.textContent = box.dataset.step; live.setAttribute('aria-live', 'off'); }
    range.addEventListener('input', () => { stop(); show(+range.value); });
    chars.forEach((c, k) => { c.addEventListener('mouseenter', () => { stop(); show(k); }); c.addEventListener('click', () => { stop(); show(k); }); });
    $$('.atom', svg).forEach((a) => {
      const first = chars.findIndex((c) => c.dataset.map.split(' ').includes(a.dataset.a));
      const go = () => { stop(); show(first); };
      a.addEventListener('mouseenter', go); a.addEventListener('click', go);
    });
    stepBtn.addEventListener('click', () => {
      if (timer) return stop();
      if (+range.value >= total - 1) show(0);
      stepBtn.classList.add('is-on'); stepBtn.textContent = box.dataset.pause; live.setAttribute('aria-live', 'polite');
      timer = setInterval(() => { if (+range.value >= total - 1) return stop(); show(+range.value + 1); }, 550);
    });
    viewBtn.addEventListener('click', () => {
      const graph = svg.dataset.view !== 'graph';
      svg.dataset.view = graph ? 'graph' : 'drawing';
      viewBtn.classList.toggle('is-on', graph);
      viewBtn.textContent = graph ? box.dataset.toDrawing : box.dataset.toGraph;
      gcap.hidden = !graph;
    });
    new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting && timer) stop(); })).observe(box);
    show(0);
  })();

  // ---------- Plate V: the body map ----------
  (() => {
    const main = $('.om-body-main');
    if (!main) return;
    const plate = main.closest('.om-plate');
    const btns = $$('.body-check', main);
    const organs = Object.fromEntries($$('#om-body .organ').map((o) => [o.dataset.check, o]));
    const leads = Object.fromEntries($$('#om-body .lead').map((l) => [l.dataset.check, l]));
    const cards = Object.fromEntries($$('.body-dl > div', main).map((d) => [d.dataset.check, d]));
    const states = JSON.parse(main.dataset.states);
    const toyBtn = $('[data-act="toy"]', main);
    const reroll = $('[data-act="reroll"]', main);
    const live = $('.body-live', main);
    const toyLine = $('.body-toyline', main);
    const dl = $('.body-dl', main);
    $('.body-checks', main).hidden = false; $('.body-toy', main).hidden = false;
    dl.setAttribute('aria-live', 'polite');
    let pattern = null, toyOn = false;

    function label() {
      btns.forEach((b) => {
        const s = pattern ? pattern[b.dataset.check] : null;
        const tag = $('.bc-s', b);
        tag.textContent = s ? `${states[s]} · ${states.toy}` : '';
        b.classList.toggle('is-flagged', s === 'flagged'); b.classList.toggle('is-clear', s === 'clear');
      });
      Object.entries(organs).forEach(([k, o]) => {
        const s = pattern ? pattern[k] : null;
        o.classList.toggle('is-flagged', s === 'flagged'); o.classList.toggle('is-clear', s === 'clear');
        leads[k]?.classList.toggle('is-flagged', s === 'flagged');
      });
    }
    function select(k) {
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.check === k)));
      Object.entries(organs).forEach(([c, o]) => o.classList.toggle('is-on', c === k));
      Object.entries(leads).forEach(([c, l]) => l.classList.toggle('is-on', c === k));
      Object.entries(cards).forEach(([c, d]) => d.classList.toggle('is-on', c === k));
    }
    function roll() {
      const keys = Object.keys(organs);
      let p;
      do { p = Object.fromEntries(keys.map((k) => [k, Math.random() < 0.35 ? 'flagged' : 'clear'])); }
      while (!Object.values(p).includes('flagged') || !Object.values(p).includes('clear'));
      pattern = p;
      const fl = Object.values(p).filter((v) => v === 'flagged').length;
      live.textContent = fill(main.dataset.live, { f: fl, c: keys.length - fl });
      label();
    }
    btns.forEach((b, i) => {
      b.addEventListener('click', () => select(b.dataset.check));
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const nb = btns[(i + d + btns.length) % btns.length];
        nb.focus(); select(nb.dataset.check);
      });
      b.addEventListener('mouseenter', () => organs[b.dataset.check]?.classList.add('is-hover'));
      b.addEventListener('mouseleave', () => organs[b.dataset.check]?.classList.remove('is-hover'));
    });
    Object.entries(organs).forEach(([k, o]) => o.addEventListener('click', () => select(k)));
    toyBtn.addEventListener('click', () => {
      const on = (toyOn = !toyOn);
      toyBtn.classList.toggle('is-on', on);
      $('.body-toytag', main).hidden = !on;
      toyBtn.textContent = on ? main.dataset.toyOff : main.dataset.toyOn;
      reroll.hidden = !on; toyLine.hidden = !on;
      plate.classList.toggle('is-toy', on);
      if (on) roll(); else { pattern = null; live.textContent = ''; label(); }
    });
    reroll.addEventListener('click', roll);
    select('A');
    label();
  })();

  // ---------- Plate VI: slicing the toy volume ----------
  (() => {
    const fig = $('.om-vol');
    if (!fig) return;
    const range = $('#vol-range');
    const out = $('output', fig);
    const slices = $$('#om-volume .slice');
    const inset = $('#om-volume .inset-cut');
    const link = $('#om-volume .cut-link');
    const svg = $('#om-volume');
    range.hidden = false; out.hidden = false; $('label[for="vol-range"]', fig).hidden = false;
    const total = slices.length;
    function cut(i) {
      // the outermost slices are almost empty; keep the cut on a visible one
      i = Math.max(1, Math.min(total - 2, i));
      range.value = i; setRangeFill(range);
      slices.forEach((s, k) => { s.classList.toggle('is-cut', k === i); s.classList.toggle('is-above', k > i); s.classList.toggle('is-below', k < i); });
      inset.setAttribute('d', slices[i].dataset.flat);
      link.setAttribute('d', `M${slices[i].dataset.lx} ${slices[i].dataset.ly}L462 210`);
      const txt = fill(fig.dataset.cutof, { n: i, t: total - 2 });
      out.textContent = txt; range.setAttribute('aria-valuetext', txt);
    }
    range.addEventListener('input', () => cut(+range.value));
    // vertical drag on the drawing moves the cut (the slider stays the accessible control)
    let dragging = false;
    const fromY = (e) => {
      const r = svg.getBoundingClientRect();
      const y = ((e.clientY - r.top) / r.height) * 420; // viewBox units
      cut(Math.round(((350 - y) / 280) * 40));
    };
    svg.addEventListener('pointerdown', (e) => { if (e.button !== 0 || e.pointerType === 'touch') return; e.preventDefault(); dragging = true; svg.setPointerCapture(e.pointerId); fromY(e); });
    svg.addEventListener('pointermove', (e) => { if (dragging) fromY(e); });
    svg.addEventListener('pointerup', () => { dragging = false; });
    svg.addEventListener('pointercancel', () => { dragging = false; });
    cut(+range.value);
  })();
})();
