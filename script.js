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
