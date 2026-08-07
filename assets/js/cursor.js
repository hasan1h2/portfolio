/* ==========================================================================
   ANIMATION ENGINE - CUSTOM CURSOR & MAGNETIC INTERACTIONS
   ========================================================================== */

const CursorEngine = {
  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip touchscreens

    this.createCursorElements();
    this.bindMouseEvents();
    this.bindMagneticElements();
  },

  createCursorElements() {
    let cursor = document.querySelector('.custom-cursor');
    let follower = document.querySelector('.cursor-follower');

    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
    }

    if (!follower) {
      follower = document.createElement('div');
      follower.className = 'cursor-follower';
      document.body.appendChild(follower);
    }

    this.cursor = cursor;
    this.follower = follower;
  },

  bindMouseEvents() {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (this.cursor) {
        this.cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    const renderFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (this.follower) {
        this.follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(renderFollower);
    };

    renderFollower();

    // Hover Scaling on Interactive Elements
    const interactiveSelectors = 'a, button, input, textarea, select, .btn-ds, .card-ds, .footer-social-icon, .portfolio-filter-btn';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.follower) this.follower.classList.add('cursor-active');
        if (this.cursor) this.cursor.classList.add('cursor-active');
      });

      el.addEventListener('mouseleave', () => {
        if (this.follower) this.follower.classList.remove('cursor-active');
        if (this.cursor) this.cursor.classList.remove('cursor-active');
      });
    });

    // Click Ripple Visual Effect
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  },

  bindMagneticElements() {
    const magneticBtns = document.querySelectorAll('.btn-ds, .btn-ds-fab, .footer-social-icon, .magnetic-target');
    magneticBtns.forEach(btn => {
      if (typeof AnimationUtils !== 'undefined') {
        AnimationUtils.magneticButton(btn, 0.3);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CursorEngine.init();
});

if (typeof window !== 'undefined') {
  window.CursorEngine = CursorEngine;
}
