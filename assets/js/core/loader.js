/* ==========================================================================
   GLOBAL DESIGN SYSTEM - PRELOADER & SKELETON LOADER
   ========================================================================== */

const DSLoader = {
  init() {
    this.hidePreloader();
  },

  hidePreloader() {
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 500);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSLoader.init();
});

if (typeof window !== 'undefined') {
  window.DSLoader = DSLoader;
}
