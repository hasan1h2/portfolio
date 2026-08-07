/* ==========================================================================
   GLOBAL DESIGN SYSTEM - AOS (ANIMATE ON SCROLL) WRAPPER
   ========================================================================== */

const DSPluginAOS = {
  init() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginAOS.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginAOS = DSPluginAOS;
}
