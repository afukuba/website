// Hash-based router between #home and #works. CV is a direct PDF link.
const pages = document.querySelectorAll('[data-page]');
const links = document.querySelectorAll('[data-nav]');

function route() {
  let target = (location.hash || '#home').replace('#', '');
  if (target !== 'home' && target !== 'works') target = 'home';
  pages.forEach(p => p.classList.toggle('is-visible', p.dataset.page === target));
  links.forEach(l => l.classList.toggle('is-active', l.dataset.nav === target));
  window.scrollTo({ top: 0, behavior: 'instant' });
  try { localStorage.setItem('pom_page', target); } catch (e) {}
}

window.addEventListener('hashchange', route);

try {
  const saved = localStorage.getItem('pom_page');
  if (!location.hash && saved) location.hash = '#' + saved;
} catch (e) {}

route();

// Axiom cards: loose cursor-follow tilt. Each card lerps toward a target
// offset derived from the pointer's position relative to the card center,
// producing a soft lag rather than a rigid follow.
(function axiomCursorLean() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.axiom');
  if (!cards.length) return;

  const MAX_SHIFT = 5;    // px — stay within a few points
  const MAX_WOBBLE = 1.2; // deg, layered on top of base rotation
  const EASE = 0.07;      // low = sluggish, hyper-smooth drift

  const state = new Map();
  cards.forEach(card => state.set(card, { tx: 0, ty: 0, wob: 0, targetX: 0, targetY: 0, targetW: 0, active: false }));

  function onMove(e) {
    cards.forEach(card => {
      const s = state.get(card);
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const inside = Math.abs(dx) <= 1.4 && Math.abs(dy) <= 1.4;
      if (inside) {
        s.active = true;
        s.targetX = Math.max(-1, Math.min(1, dx)) * MAX_SHIFT;
        s.targetY = Math.max(-1, Math.min(1, dy)) * MAX_SHIFT;
        s.targetW = Math.max(-1, Math.min(1, dx)) * MAX_WOBBLE;
      } else {
        s.active = false;
        s.targetX = 0; s.targetY = 0; s.targetW = 0;
      }
    });
  }

  function tick() {
    cards.forEach(card => {
      const s = state.get(card);
      s.tx += (s.targetX - s.tx) * EASE;
      s.ty += (s.targetY - s.ty) * EASE;
      s.wob += (s.targetW - s.wob) * EASE;
      card.style.setProperty('--tx', s.tx.toFixed(2) + 'px');
      card.style.setProperty('--ty', s.ty.toFixed(2) + 'px');
      card.style.setProperty('--wob', s.wob.toFixed(2) + 'deg');
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerleave', () => {
    cards.forEach(card => {
      const s = state.get(card);
      s.targetX = 0; s.targetY = 0; s.targetW = 0;
    });
  });
  requestAnimationFrame(tick);
})();
