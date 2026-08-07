/* ==========================================================================
   ANIMATION ENGINE - PORTFOLIO FILTER & LIGHTBOX ANIMATIONS
   ========================================================================== */

const PortfolioAnimationEngine = {
  init() {
    this.bindFilterAnimations();
    this.bindLightboxEvents();
  },

  bindFilterAnimations() {
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const items = document.querySelectorAll('.portfolio-item, .card-project');

    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || '*';

        items.forEach(item => {
          const matches = filter === '*' || item.classList.contains(filter.replace('.', ''));
          
          if (typeof gsap !== 'undefined') {
            if (matches) {
              item.style.display = 'block';
              gsap.fromTo(item,
                { opacity: 0, scale: 0.85, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
              );
            } else {
              gsap.to(item, {
                opacity: 0,
                scale: 0.85,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                  item.style.display = 'none';
                }
              });
            }
          } else {
            item.style.display = matches ? 'block' : 'none';
          }
        });
      });
    });
  },

  bindLightboxEvents() {
    const triggers = document.querySelectorAll('[data-lightbox], .lightbox-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = trigger.getAttribute('href') || trigger.getAttribute('data-src');
        if (!imgSrc) return;

        this.openLightbox(imgSrc);
      });
    });
  },

  openLightbox(imgSrc) {
    let modal = document.querySelector('#ds-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ds-lightbox-modal';
      modal.className = 'modal-backdrop-ds modal-lightbox';
      modal.innerHTML = `
        <div class="modal-dialog-ds">
          <div class="modal-header-ds border-0">
            <button class="modal-close-ds">&times;</button>
          </div>
          <div class="modal-body-ds text-center p-0">
            <img src="" alt="Lightbox Zoom" style="max-height: 80vh; border-radius: 12px; margin: 0 auto;">
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.modal-close-ds').addEventListener('click', () => {
        this.closeLightbox(modal);
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeLightbox(modal);
      });
    }

    modal.querySelector('img').src = imgSrc;
    modal.classList.add('active');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(modal.querySelector('.modal-dialog-ds'),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  },

  closeLightbox(modal) {
    if (typeof gsap !== 'undefined') {
      gsap.to(modal.querySelector('.modal-dialog-ds'), {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => modal.classList.remove('active')
      });
    } else {
      modal.classList.remove('active');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PortfolioAnimationEngine.init();
});

if (typeof window !== 'undefined') {
  window.PortfolioAnimationEngine = PortfolioAnimationEngine;
}
