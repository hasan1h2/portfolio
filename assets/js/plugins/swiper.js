/* ==========================================================================
   GLOBAL DESIGN SYSTEM - SWIPER SLIDER WRAPPER
   ========================================================================== */

const DSPluginSwiper = {
  init() {
    if (typeof Swiper !== 'undefined') {
      this.initTestimonialSwiper();
      this.initProjectSwiper();
    }
  },

  initTestimonialSwiper() {
    const el = document.querySelector('.testimonial-swiper');
    if (!el) return;

    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  },

  initProjectSwiper() {
    const el = document.querySelector('.project-swiper');
    if (!el) return;

    new Swiper('.project-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginSwiper.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginSwiper = DSPluginSwiper;
}
