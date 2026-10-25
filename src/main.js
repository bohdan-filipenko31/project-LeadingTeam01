import './css/styles.css';

// Import images so Vite processes and optimizes them
import heroImage from './images/hero/background-hero.png';
import heroImage2x from './images/hero/background-hero@2x.png';

// Set hero image src and srcset after DOM is ready
const heroImg = document.querySelector('.hero-image');
if (heroImg) {
  heroImg.src = heroImage;
  heroImg.srcset = `${heroImage} 1x, ${heroImage2x} 2x`;
}

// Mobile menu open / close
const mobileMenu = document.getElementById('mobile-menu');
const openBtn = document.querySelector('[data-menu-open]');
const closeBtn = document.querySelector('[data-menu-close]');

function setMenu(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (openBtn) openBtn.setAttribute('aria-expanded', String(open));
}

if (openBtn) {
  openBtn.addEventListener('click', () => setMenu(true));
}
if (closeBtn) {
  closeBtn.addEventListener('click', () => setMenu(false));
}
if (mobileMenu) {
  mobileMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });
}
