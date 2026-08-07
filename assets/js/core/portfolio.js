/* ==========================================================================
   GLOBAL DESIGN SYSTEM - PORTFOLIO FILTER & GALLERY LOGIC
   ========================================================================== */

const DSPortfolio = {
  init() {
    this.bindFilterEvents();
  },

  bindFilterEvents() {
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
            item.style.display = 'block';
            item.classList.add('anim-fade-in');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPortfolio.init();
});

if (typeof window !== 'undefined') {
  window.DSPortfolio = DSPortfolio;
}
