/* ==========================================================================
   GLOBAL DESIGN SYSTEM - GSAP PLUGIN WRAPPER
   ========================================================================== */

const DSPluginGSAP = {
  init() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      this.initRevealAnimations();
    }
  },

  initRevealAnimations() {
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          }
        }
      );
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginGSAP.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginGSAP = DSPluginGSAP;
}
