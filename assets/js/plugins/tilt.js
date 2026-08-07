/* ==========================================================================
   GLOBAL DESIGN SYSTEM - VANILLA TILT WRAPPER
   ========================================================================== */

const DSPluginTilt = {
  init() {
    if (typeof VanillaTilt !== 'undefined') {
      const tiltCards = document.querySelectorAll('.tilt-card, [data-tilt]');
      VanillaTilt.init(Array.from(tiltCards), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginTilt.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginTilt = DSPluginTilt;
}
