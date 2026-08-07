/* ==========================================================================
   GLOBAL DESIGN SYSTEM - SCROLL INDICATOR & BACK TO TOP
   ========================================================================== */

const DSScroll = {
  init() {
    this.initScrollProgressBar();
    this.initBackToTop();
  },

  initScrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  },

  initBackToTop() {
    const backToTopBtn = document.querySelector('#backToTop, .back-to-top-btn');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSScroll.init();
});

if (typeof window !== 'undefined') {
  window.DSScroll = DSScroll;
}
