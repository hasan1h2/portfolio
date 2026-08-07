/* ==========================================================================
   ANIMATION ENGINE - ANIMATED STATISTICS COUNTER
   ========================================================================== */

const CounterEngine = {
  init() {
    this.bindCounters();
  },

  bindCounters() {
    const counterElements = document.querySelectorAll('.counter-number, .card-statistic__number, [data-counter]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counterElements.forEach(el => observer.observe(el));
  },

  animateCounter(el) {
    const targetText = el.getAttribute('data-target') || el.innerText.replace(/[^0-9]/g, '');
    const suffix = el.getAttribute('data-suffix') || (el.innerText.includes('+') ? '+' : '');
    const target = parseInt(targetText, 10);

    if (isNaN(target)) return;

    let current = 0;
    const duration = 2000;
    const intervalTime = 25;
    const totalSteps = duration / intervalTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current).toLocaleString() + suffix;
      }
    }, intervalTime);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CounterEngine.init();
});

if (typeof window !== 'undefined') {
  window.CounterEngine = CounterEngine;
}
