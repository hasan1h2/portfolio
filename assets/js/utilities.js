/* ==========================================================================
   ANIMATION ENGINE - REUSABLE UTILITIES & HELPERS
   ========================================================================== */

const AnimationUtils = {
  /**
   * Check if user requested reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Fade in an element
   */
  fadeIn(element, duration = 0.6, delay = 0) {
    if (!element || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.to(element, { opacity: 1, duration, delay, ease: 'power2.out' });
    } else {
      element.style.opacity = '1';
    }
  },

  /**
   * Fade up element with slide
   */
  fadeUp(element, duration = 0.8, delay = 0, yOffset = 40) {
    if (!element || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(element, 
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
      );
    }
  },

  /**
   * Fade left element
   */
  fadeLeft(element, duration = 0.8, delay = 0, xOffset = 50) {
    if (!element || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(element, 
        { opacity: 0, x: xOffset },
        { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
      );
    }
  },

  /**
   * Fade right element
   */
  fadeRight(element, duration = 0.8, delay = 0, xOffset = -50) {
    if (!element || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(element, 
        { opacity: 0, x: xOffset },
        { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
      );
    }
  },

  /**
   * Zoom in element
   */
  zoomIn(element, duration = 0.6, delay = 0) {
    if (!element || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(element,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
      );
    }
  },

  /**
   * Stagger array of elements
   */
  stagger(elements, duration = 0.6, staggerDelay = 0.1, yOffset = 30) {
    if (!elements || !elements.length || this.prefersReducedMotion()) return;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(elements,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration, stagger: staggerDelay, ease: 'power3.out' }
      );
    }
  },

  /**
   * Magnetic Button attraction effect
   */
  magneticButton(button, strength = 0.3) {
    if (!button || this.prefersReducedMotion()) return;
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      if (typeof gsap !== 'undefined') {
        gsap.to(button, { x, y, duration: 0.3, ease: 'power2.out' });
      }
    });

    button.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    });
  },

  /**
   * 3D Tilt Card effect
   */
  tiltCard(card) {
    if (!card || typeof VanillaTilt === 'undefined' || this.prefersReducedMotion()) return;
    VanillaTilt.init(card, {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.25,
      scale: 1.02
    });
  }
};

if (typeof window !== 'undefined') {
  window.AnimationUtils = AnimationUtils;
}
