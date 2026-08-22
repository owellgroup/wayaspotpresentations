const deck = document.getElementById('deck');
const slides = [...document.querySelectorAll('.slide')];
const label = document.getElementById('slide-label');
const counter = document.getElementById('slide-counter');
const progress = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (!deck || !label || !counter || !progress || !prevBtn || !nextBtn) {
  throw new Error('Pitch deck navigation elements are missing.');
}

const MOBILE_BREAKPOINT = 900;
const DESKTOP_WIDTH = 1600;
const DESKTOP_HEIGHT = 900;

let current = 0;
let touchStartX = 0;
let touchStartY = 0;

function isMobileLayout() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function scaleDeck() {
  if (isMobileLayout()) {
    deck.classList.add('deck--fluid');
    deck.style.transform = 'none';
    return;
  }

  deck.classList.remove('deck--fluid');
  const pad = Math.min(48, window.innerWidth * 0.04);
  const navHeight = 72;
  const sx = (window.innerWidth - pad * 2) / DESKTOP_WIDTH;
  const sy = (window.innerHeight - pad - navHeight) / DESKTOP_HEIGHT;
  const s = Math.min(sx, sy, 1);
  deck.style.transform = `scale(${s})`;
}

function goTo(n: number) {
  if (n < 0 || n >= slides.length) return;
  slides[current].classList.remove('active');
  current = n;
  slides[current].classList.add('active');
  label.textContent = slides[current].dataset.title || '';
  counter.textContent = `${current + 1} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goTo(current + 1);
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goTo(current - 1);
  }
  if (e.key === 'Home') {
    e.preventDefault();
    goTo(0);
  }
  if (e.key === 'End') {
    e.preventDefault();
    goTo(slides.length - 1);
  }
});

window.addEventListener('resize', scaleDeck);
window.addEventListener('orientationchange', () => {
  window.setTimeout(scaleDeck, 100);
});

document.addEventListener(
  'touchstart',
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

document.addEventListener(
  'touchend',
  (e) => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) goTo(current + 1);
    else goTo(current - 1);
  },
  { passive: true }
);

scaleDeck();
goTo(0);
