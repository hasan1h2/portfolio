/* ==========================================================================
   GLOBAL DESIGN SYSTEM - ANIMATION & CURSOR ENGINE
   ========================================================================== */

const DSAnimation = {
  init() {
    this.initCustomCursor();
  },

  initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    const updateFollower = () => {
      posX += (mouseX - posX) / 6;
      posY += (mouseY - posY) / 6;

      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;

      requestAnimationFrame(updateFollower);
    };

    updateFollower();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSAnimation.init();
});

if (typeof window !== 'undefined') {
  window.DSAnimation = DSAnimation;
}
