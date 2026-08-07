/* ==========================================================================
   ANIMATION ENGINE - THEME SWITCH TRANSITION ENGINE
   ========================================================================== */

const ThemeTransitionEngine = {
  init() {
    this.bindThemeTransition();
  },

  bindThemeTransition() {
    window.addEventListener('ds-theme-change', (e) => {
      const theme = e.detail ? e.detail.theme : 'dark';

      // Add temporary transition overlay to prevent screen flash
      document.body.classList.add('theme-transitioning');

      if (typeof gsap !== 'undefined') {
        gsap.to('body', {
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.classList.remove('theme-transitioning');
          }
        });
      } else {
        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
        }, 400);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ThemeTransitionEngine.init();
});

if (typeof window !== 'undefined') {
  window.ThemeTransitionEngine = ThemeTransitionEngine;
}
