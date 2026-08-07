/* ==========================================================================
   ANIMATION ENGINE - PRELOADER & INTRO CURTAIN
   ========================================================================== */

const PreloaderEngine = {
  STORAGE_KEY: 'hh_portfolio_visited',

  init() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Check session memory
    const hasVisited = sessionStorage.getItem(this.STORAGE_KEY);
    const delayTime = hasVisited ? 300 : 700;

    let hidden = false;
    const hidePreloader = () => {
      if (hidden) return;
      hidden = true;

      if (typeof gsap !== 'undefined') {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            preloader.classList.add('loaded');
            // Trigger Hero entrance sequence after preloader exits
            if (window.HeroAnimationEngine) {
              window.HeroAnimationEngine.playHeroSequence();
            }
          }
        });
      } else {
        preloader.style.opacity = '0';
        setTimeout(() => (preloader.style.display = 'none'), 400);
      }

      sessionStorage.setItem(this.STORAGE_KEY, 'true');
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, delayTime);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, delayTime));
      // Safety fallback
      setTimeout(hidePreloader, 1500);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PreloaderEngine.init();
});

if (typeof window !== 'undefined') {
  window.PreloaderEngine = PreloaderEngine;
}
