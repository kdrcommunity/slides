const slides = document.querySelectorAll('.slide');
const counter = document.getElementById('slide-counter');
const dotsContainer = document.getElementById('nav-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let current = 0;
const total = slides.length;
let isAnimating = false;

// Create dots
for (let i = 0; i < total; i++) {
  const dot = document.createElement('div');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

function goTo(index) {
  if (isAnimating || index === current) return;
  isAnimating = true;

  const direction = index > current ? 1 : -1;
  const currentSlide = slides[current];
  const nextSlide = slides[index];

  // Remove active from current slide (it will fade out via CSS base styles)
  currentSlide.classList.remove('active');
  currentSlide.classList.add(direction > 0 ? 'exit-left' : 'exit-right');

  // Prepare next slide at starting position (no transition yet)
  nextSlide.style.transition = 'none';
  nextSlide.style.transform = `translateX(${direction > 0 ? '60px' : '-60px'})`;
  nextSlide.style.opacity = '0';

  // Force reflow so the starting position is applied
  nextSlide.offsetHeight;

  // Now enable transition and activate
  nextSlide.style.transition = '';
  nextSlide.style.transform = '';
  nextSlide.style.opacity = '';
  nextSlide.classList.add('active');

  // Update dots
  document.querySelectorAll('.nav-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

  // Update counter
  counter.textContent = `${index + 1} / ${total}`;

  current = index;

  setTimeout(() => {
    currentSlide.classList.remove('exit-left', 'exit-right');
    currentSlide.style.transform = '';
    isAnimating = false;
  }, 500);
}

function next() {
  if (current < total - 1) goTo(current + 1);
}

function prev() {
  if (current > 0) goTo(current - 1);
}

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  }
});

// Buttons
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

// Touch support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) next();
    else prev();
  }
});

// Typing effect for "Digital", "Data", "Designer", "Developer"
(function initTypingEffect() {
  const words = ['Digital', 'Data', 'Designer', 'Developer'];
  const el = document.getElementById('typing-word');
  if (!el) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 120;
  const deleteSpeed = 60;
  const pauseAfterType = 2000;
  const pauseAfterDelete = 400;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();

// Hide keyboard hint after first interaction
let hintShown = true;
function hideHint() {
  if (hintShown) {
    document.getElementById('keyboard-hint').style.opacity = '0';
    hintShown = false;
  }
}
document.addEventListener('keydown', hideHint, { once: true });
document.addEventListener('click', hideHint, { once: true });

// Apple-style smooth accordion for timeline cards
(function initTimelineAccordion() {
  const timeline = document.querySelector('.slide-3 .timeline');
  if (!timeline) return;

  const cards = Array.from(timeline.querySelectorAll('.timeline-card'));
  if (!cards.length) return;

  function setExpanded(card, expand) {
    const body = card.querySelector('.timeline-card-body');
    const item = card.closest('.timeline-item');
    if (!body) return;

    const isExpanded = card.classList.contains('expanded');
    if (expand === isExpanded) return;

    const startHeight = body.offsetHeight;
    const endHeight = expand ? body.scrollHeight : 0;

    body.style.height = `${startHeight}px`;
    // Force reflow so the starting height is applied
    // eslint-disable-next-line no-unused-expressions
    body.offsetHeight;
    body.style.height = `${endHeight}px`;

    if (expand) {
      card.classList.add('expanded');
      if (item) item.classList.add('expanded');
    } else {
      card.classList.remove('expanded');
      if (item) item.classList.remove('expanded');
    }

    const onEnd = (event) => {
      if (event.target !== body || event.propertyName !== 'height') return;
      if (expand) {
        body.style.height = 'auto';
      }
      body.removeEventListener('transitionend', onEnd);
    };

    body.addEventListener('transitionend', onEnd);
  }

  // Initialize cards: first open, others closed
  cards.forEach((card, index) => {
    const body = card.querySelector('.timeline-card-body');
    const header = card.querySelector('.timeline-card-header');
    if (!body || !header) return;

    body.style.overflow = 'hidden';

    if (index === 0) {
      body.style.height = 'auto';
      card.classList.add('expanded');
      const item = card.closest('.timeline-item');
      if (item) item.classList.add('expanded');
    } else {
      body.style.height = '0px';
    }

    header.addEventListener('click', () => {
      cards.forEach((other) => {
        if (other === card) {
          setExpanded(other, true);
        } else {
          setExpanded(other, false);
        }
      });
    });
  });
})();
