/* ==========================================================================
   ANIMATION ENGINE - GSAP HERO ENTRANCE SEQUENCE
   ========================================================================== */

const HeroAnimationEngine = {
  init() {
    this.hasRun = false;
  },

  playHeroSequence() {
    if (this.hasRun || typeof gsap === 'undefined') return;
    this.hasRun = true;

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar items stagger
    timeline.fromTo('.navbar-brand, .header-brand', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.nav-item, .header-nav-link',
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.4'
    )
    // Hero status badge
    .fromTo('.hero-badge-pill, .section-title-badge',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.3'
    )
    // Hero title & Typed.js text
    .fromTo('.hero-title, h1.display-lg, h1.display-xl',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
    .fromTo('.hero-subtitle, .typed-text-wrapper',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    // CTA Button Cluster
    .fromTo('.hero-cta-group .btn-ds, .hero-btns .btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.4'
    )
    // Floating Stats & Scroll Indicator
    .fromTo('.hero-stat-item, .scroll-indicator-wrap',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  HeroAnimationEngine.init();
});

if (typeof window !== 'undefined') {
  window.HeroAnimationEngine = HeroAnimationEngine;
}
