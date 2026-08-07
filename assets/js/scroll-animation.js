/* ==========================================================================
   ANIMATION ENGINE - GSAP SCROLLTRIGGER REVEALS
   ========================================================================== */

const ScrollAnimationEngine = {
  init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    this.initSectionTitleReveals();
    this.initCardStaggers();
    this.initTimelineMilestones();
    this.initProgressBarFills();
  },

  initSectionTitleReveals() {
    const titles = document.querySelectorAll('.section-title-wrapper, .ds-section-block .section-title');
    titles.forEach(title => {
      gsap.fromTo(title,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  },

  initCardStaggers() {
    const cardGrids = document.querySelectorAll('.grid-autofit-sm, .grid-autofit-md, .grid-autofit-lg, .projects-grid, .skills-grid');
    cardGrids.forEach(grid => {
      const cards = grid.querySelectorAll('.card-ds, .glass-card, .card-project, .card-skill, .card-service');
      if (!cards.length) return;

      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true
          }
        }
      );
    });
  },

  initTimelineMilestones() {
    const items = document.querySelectorAll('.timeline-item-ds, .timeline-item');
    items.forEach(item => {
      const node = item.querySelector('.timeline-node-ds, .timeline-node');
      const content = item.querySelector('.timeline-content-ds, .timeline-content');

      if (node) {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true }
          }
        );
      }

      if (content) {
        gsap.fromTo(content,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%', once: true }
          }
        );
      }
    });
  },

  initProgressBarFills() {
    const progressBars = document.querySelectorAll('.progress-bar-fill, .skill-progress-bar');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || '100%';
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 85%', once: true }
        }
      );
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ScrollAnimationEngine.init();
});

if (typeof window !== 'undefined') {
  window.ScrollAnimationEngine = ScrollAnimationEngine;
}
