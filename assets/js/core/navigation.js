/* ==========================================================================
   GLOBAL DESIGN SYSTEM - NAVIGATION & NAVBAR LOGIC
   ========================================================================== */

const DSNavigation = {
  init() {
    this.handleScroll();
    this.handleActiveLinks();
    this.bindEvents();
  },

  handleScroll() {
    const navbar = document.querySelector('.navbar, .site-header');
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  },

  handleActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .header-nav-link');

    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  },

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.handleActiveLinks();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSNavigation.init();
});

if (typeof window !== 'undefined') {
  window.DSNavigation = DSNavigation;
}
