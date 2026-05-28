/* ==========================================================================
   Ogo Studio — progressive enhancement
   Vanilla ES module, zero dependencies. The site is fully functional and
   readable without this file; everything here is polish layered on top.
   Loaded with `defer`, so the DOM is ready when it runs.
   ========================================================================== */

/* Flag that JS is available. CSS keys the sticky-CTA hide-by-default and any
   other enhancement off `.js` so the no-JS experience stays the safe default
   (CTA visible, nav usable). */
document.documentElement.classList.add('js');

/* --------------------------------------------------------------------------
   1. Cursor spotlight on the hero
   Updates --cursor-x / --cursor-y (in px, relative to the hero box). Throttled
   to one write per animation frame so mousemove never thrashes layout.
   -------------------------------------------------------------------------- */
(function cursorSpotlight(){
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Respect reduced-motion and skip touch devices (no hover pointer).
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduce || coarse) return;

  let queued = false;
  let lastX = 0, lastY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      hero.style.setProperty('--cursor-x', lastX + 'px');
      hero.style.setProperty('--cursor-y', lastY + 'px');
      queued = false;
    });
  });
})();

/* --------------------------------------------------------------------------
   2. Sticky header CTA
   The Wishlist button collapses into the header once the hero sentinel scrolls
   out of view. IntersectionObserver only; if it is unavailable the CTA stays
   visible (handled in CSS via the no-JS / always-visible fallback).
   -------------------------------------------------------------------------- */
(function stickyCta(){
  const header = document.querySelector('.site-header');
  const sentinel = document.querySelector('.hero-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) {
    // Fallback: reveal the CTA permanently so it is never lost.
    if (header) header.classList.add('header-cta-visible');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      header.classList.toggle('header-cta-visible', !entry.isIntersecting);
    }
  }, { rootMargin: '0px', threshold: 0 });
  io.observe(sentinel);
})();

/* --------------------------------------------------------------------------
   3. Mobile menu toggle
   Hamburger expands the collapsed nav drawer. Keeps aria-expanded in sync.
   -------------------------------------------------------------------------- */
(function mobileMenu(){
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.site-header__menu');
  if (!header || !button) return;
  button.addEventListener('click', () => {
    const open = header.getAttribute('data-menu-open') === 'true';
    header.setAttribute('data-menu-open', String(!open));
    button.setAttribute('aria-expanded', String(!open));
  });
})();

/* --------------------------------------------------------------------------
   4. View Transitions on internal navigation
   Cross-fades same-origin page loads where the browser supports it. Feature
   detected; everything falls back to a normal full navigation otherwise.
   Skips new-tab clicks, modified clicks, downloads, and external links.
   -------------------------------------------------------------------------- */
(function viewTransitions(){
  if (!('startViewTransition' in document)) return;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;
    if (link.origin !== window.location.origin) return;          // external: let it go
    if (link.getAttribute('href')?.startsWith('#')) return;       // in-page anchor
    if (link.href === window.location.href) return;               // same page

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = link.href;
    });
  });
})();
