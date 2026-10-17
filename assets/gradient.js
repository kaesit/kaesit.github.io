// Procedural gradient backgrounds.
// One shared WebGL context renders every <canvas class="gl"> on the page, then copies the
// result into that canvas. Three looks: 'flow' (smeared, long-exposure paint),
// 'horizon' (a lit horizon line with streaky haze) and 'bloom' (drifting cells with contour lines).
// Big canvases (data-hero) dissolve into dithered pixels toward the bottom edge.
(() => {
  const targets = [...document.querySelectorAll('canvas.gl')];
  if (!targets.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hex = (h) => [1, 3, 5].map((i) => Math.pow(parseInt(h.slice(i, i + 2), 16) / 255, 2.2));

  const fallback = () => targets.forEach((el) => {
    const c = JSON.parse(el.dataset.palette).colors;
    el.style.background = `radial-gradient(120% 90% at 70% 10%, ${c[2]}, transparent 62%), linear-gradient(180deg, ${c[1]}, ${c[0]})`;
  });

  const glc = document.createElement('canvas');
  const gl = glc.getContext('webgl', { antialias: false, alpha: false, depth: false, preserveDrawingBuffer: true });
  if (!gl) return fallback();

  const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uT, uSeed, uMode, uBand, uCell;
uniform vec3 uC0, uC1, uC2, uC3;

float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  mat2 r = mat2(.8, -.6, .6, .8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02 + 17.1; a *= .5; }
  return v;
}
float fbm3(vec2 p){
  float v = 0., a = .55;
  mat2 r = mat2(.8, -.6, .6, .8);
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = r * p * 2.03 + 11.3; a *= .45; }
  return v / .9;
}
vec3 ramp(float t){
  t = clamp(t, 0., 1.);
  vec3 c = mix(uC0, uC1, smoothstep(0., .38, t));
  c = mix(c, uC2, smoothstep(.34, .74, t));
  return mix(c, uC3, smoothstep(.72, 1., t));
}
float bayer2(vec2 a){ a = floor(a); return fract(dot(a, vec2(.5, a.y * .75))); }
float bayer4(vec2 a){ return bayer2(.5 * a) * .25 + bayer2(a); }

vec3 scene(vec2 uv){
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uT * .035 + uSeed * 7.;
  vec3 col;
  if (uMode < .5) {
    // flow: domain-warped noise, stretched sideways like a long exposure
    vec2 s = p * vec2(.42, 1.25) + uSeed;
    vec2 q = vec2(fbm3(s + vec2(0., t)), fbm3(s + vec2(5.2, 1.3) - t * .7));
    vec2 r = vec2(fbm3(s + 1.7 * q + vec2(1.7, 9.2) + t * .5), fbm3(s + 1.7 * q + vec2(8.3, 2.8) - t * .3));
    float f = fbm3(s + 1.9 * r);
    float v = f * 1.55 - .42 + (uv.y - .5) * .75;
    col = ramp(v) + uC3 * pow(max(0., f - .62) * 2.4, 3.) * .35;
  } else if (uMode < 1.5) {
    // horizon: one bright line, haze above, falling into dark below
    float w = (fbm(vec2(p.x * 1.2 + t * .6, t * .25 + uSeed)) - .5) * .22;
    float y = uv.y - .5 - w;
    float haze = fbm(vec2(p.x * 1.6 - t * .4, uv.y * 7. - t * .9 + uSeed));
    float above = smoothstep(-.01, .02, y);
    float v = exp(-abs(y) * 7.) * .78 + above * (.42 * exp(-y * 2.2) + haze * .22 - .08);
    col = ramp(v) + uC3 * exp(-abs(y) * 90.) * .55;
  } else {
    // bloom: soft drifting cells merging into one field, like stained tissue under a lens
    float v = 0.;
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 c = .5 + vec2(.4 * sin(t * (1.1 + fi * .17) + fi * 2.1 + uSeed), .34 * cos(t * (.8 + fi * .13) + fi * 1.3));
      vec2 d = (p - c * vec2(asp, 1.)) * vec2(1., 1.25);
      v += .08 / (dot(d, d) + .07);
    }
    float n = fbm3(p * 1.6 + vec2(t, -t * .6) + uSeed);
    float tv = (v - 1.1) * .42 + .12 + (n - .5) * .5;
    col = ramp(tv) + uC3 * pow(max(0., tv - .78) * 3., 2.) * .25;
  }
  vec2 vq = (uv - .5) * vec2(asp * .65, 1.);
  return col * mix(.55, 1., smoothstep(1.2, .25, length(vq)));
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 col;
  vec2 cid = floor(gl_FragCoord.xy / uCell);
  // the band's top edge wanders per column, so it reads as a skyline, not a cut
  float edge = uBand * (.72 + .5 * noise(vec2(cid.x * .09 + uSeed, uT * .03)));
  if (uBand > 0. && uv.y < edge) {
    // dither band: sample per cell, quantize, and let cells drop out toward the bottom
    vec2 cuv = (cid + .5) * uCell / uRes;
    col = scene(cuv);
    float b = bayer4(cid);
    float k = clamp(cuv.y / edge, 0., 1.);
    float keep = step(b, smoothstep(.05, 1., k) * 1.08);
    // quantize brightness only, so cells keep the gradient's hue
    float lum = max(dot(col, vec3(.3, .59, .11)), 1e-4);
    col *= floor(lum * 9. + b) / 9. / lum * keep;
  } else {
    col = scene(uv);
  }
  col = pow(max(col, 0.), vec3(1. / 2.2));
  col += (h21(gl_FragCoord.xy + fract(uT * .37) * 311.) - .5) * .05;
  gl_FragColor = vec4(col, 1.);
}`;

  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return fallback();
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fallback();
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  ['uRes', 'uT', 'uSeed', 'uMode', 'uBand', 'uCell', 'uC0', 'uC1', 'uC2', 'uC3'].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  const MODES = { flow: 0, horizon: 1, bloom: 2 };
  const items = targets.map((el) => {
    const cfg = JSON.parse(el.dataset.palette);
    const hero = 'hero' in el.dataset;
    return {
      el, hero, ctx: el.getContext('2d'),
      mode: MODES[cfg.mode] ?? 0, seed: cfg.seed || 0, colors: cfg.colors.map(hex),
      w: 0, h: 0, scale: 1, t: (cfg.seed || 0) * 13, boost: 0, visible: false,
    };
  });

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mw = 1, mh = 1;
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      it.scale = dpr * (parseFloat(it.el.dataset.scale) || 0.5);
      const w = Math.max(2, Math.round(r.width * it.scale));
      const h = Math.max(2, Math.round(r.height * it.scale));
      if (w !== it.w || h !== it.h) { it.w = it.el.width = w; it.h = it.el.height = h; }
      mw = Math.max(mw, w); mh = Math.max(mh, h);
    }
    if (glc.width < mw || glc.height < mh) { glc.width = mw; glc.height = mh; }
  };

  const draw = (it) => {
    if (it.w < 4 || it.h < 4) return;
    gl.viewport(0, 0, it.w, it.h);
    gl.uniform2f(U.uRes, it.w, it.h);
    gl.uniform1f(U.uT, it.t);
    gl.uniform1f(U.uSeed, it.seed);
    gl.uniform1f(U.uMode, it.mode);
    gl.uniform1f(U.uBand, it.hero ? 0.36 : 0.0);
    gl.uniform1f(U.uCell, Math.max(2, Math.round(8 * it.scale)));
    ['uC0', 'uC1', 'uC2', 'uC3'].forEach((n, i) => gl.uniform3fv(U[n], it.colors[i]));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    it.ctx.drawImage(glc, 0, glc.height - it.h, it.w, it.h, 0, 0, it.w, it.h);
  };

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const it = items.find((x) => x.el === e.target);
      it.visible = e.isIntersecting;
    }
  }, { rootMargin: '80px' });
  items.forEach((it) => {
    io.observe(it.el);
    const card = it.el.closest('.card');
    if (card) {
      card.addEventListener('pointerenter', () => (it.boost = 1));
      card.addEventListener('pointerleave', () => (it.boost = 0));
    }
  });

  const drawAll = () => { resize(); items.forEach(draw); };
  let queued = false;
  const ro = new ResizeObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; drawAll(); });
  });
  items.forEach((it) => ro.observe(it.el));
  drawAll();
  if (document.fonts) document.fonts.ready.then(drawAll);
  if (reduce) return;

  let last = performance.now(), acc = 0;
  const loop = (now) => {
    requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    acc += dt;
    if (acc < 1 / 30 || document.hidden) return;
    for (const it of items) {
      if (!it.visible) continue;
      it.t += acc * (1 + it.boost * 2.5);
      draw(it);
    }
    acc = 0;
  };
  requestAnimationFrame(loop);
})();
