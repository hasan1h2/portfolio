/* ==========================================================================
   PREMIUM 3D INTERACTION ENGINE - DUAL CURSOR TRAIL & MAGNETIC BUTTONS
   ========================================================================== */

const CursorTrailEngine = {
  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip touchscreens

    this.initMagneticButtons();
    this.initCardTilts();
  },

  initMagneticButtons() {
    const targets = document.querySelectorAll('.btn-ds, .btn-ds-fab, .footer-social-icon, .magnetic-target');
    targets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;

        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        } else {
          btn.style.transform = `translate(${x}px, ${y}px)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        } else {
          btn.style.transform = `translate(0px, 0px)`;
        }
      });
    });
  },

  initCardTilts() {
    if (typeof VanillaTilt === 'undefined') return;
    const cards = document.querySelectorAll('.card-ds, .card-project, .card-skill, .card-service, .tilt-card');
    VanillaTilt.init(Array.from(cards), {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CursorTrailEngine.init();
});

if (typeof window !== 'undefined') {
  window.CursorTrailEngine = CursorTrailEngine;
}
