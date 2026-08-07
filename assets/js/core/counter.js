/* ==========================================================================
   GLOBAL DESIGN SYSTEM - ANIMATED COUNTER & PROGRESS LOGIC
   ========================================================================== */

const DSCounter = {
  init() {
    this.initObservers();
  },

  initObservers() {
    const counters = document.querySelectorAll('.counter-number, .card-statistic__number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  },

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target') || el.innerText, 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + (el.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        el.innerText = Math.ceil(current) + (el.getAttribute('data-suffix') || '');
      }
    }, stepTime);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSCounter.init();
});

if (typeof window !== 'undefined') {
  window.DSCounter = DSCounter;
}
