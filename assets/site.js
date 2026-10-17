// Light / dark switch. Dark is the default; the choice is remembered per browser.
(() => {
  const btn = document.querySelector('.theme');
  if (!btn) return;
  const root = document.documentElement;
  const sync = () => {
    const light = root.dataset.theme === 'light';
    btn.textContent = light ? btn.dataset.dark : btn.dataset.light;
    btn.setAttribute('aria-label', light ? btn.dataset.toDark : btn.dataset.toLight);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#ebe7dd' : '#050506');
  };
  btn.addEventListener('click', () => {
    if (root.dataset.theme === 'light') delete root.dataset.theme;
    else root.dataset.theme = 'light';
    try { localStorage.setItem('theme', root.dataset.theme || 'dark'); } catch (e) {}
    sync();
  });
  sync();
})();
