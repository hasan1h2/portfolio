/* ==========================================================================
   GLOBAL DESIGN SYSTEM - TYPED.JS WRAPPER
   ========================================================================== */

const DSPluginTyped = {
  init() {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
      const stringsData = typedElement.getAttribute('data-typed-items');
      const strings = stringsData ? stringsData.split(',') : ['Flutter Developer', 'Full Stack Architect', 'UI/UX Designer'];

      new Typed('.typed-text', {
        strings: strings,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginTyped.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginTyped = DSPluginTyped;
}
