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

let current = 0;

function scaleDeck() {
  const pad = 48;
  const sx = (window.innerWidth - pad) / 1600;
  const sy = (window.innerHeight - pad - 60) / 900;
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
scaleDeck();
goTo(0);
