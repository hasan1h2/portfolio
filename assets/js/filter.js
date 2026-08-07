/* ==========================================================================
   JSON CMS - CATEGORY FILTERING ENGINE
   ========================================================================== */

const CMSFilter = {
  init() {
    this.bindFilterTabs();
  },

  bindFilterTabs() {
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn, [data-cms-filter]');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter') || btn.getAttribute('data-cms-filter');
        this.filterCategory(category);
      });
    });
  },

  filterCategory(category) {
    const items = document.querySelectorAll('.project-item-card, .portfolio-item');
    items.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      if (!category || category === '*' || category === 'all' || itemCat === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CMSFilter.init();
});

if (typeof window !== 'undefined') {
  window.CMSFilter = CMSFilter;
}
