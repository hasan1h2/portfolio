/* ==========================================================================
   JSON CMS - LIVE SEARCH ENGINE
   ========================================================================== */

const CMSSearch = {
  init() {
    this.bindSearchInputs();
  },

  bindSearchInputs() {
    const searchInputs = document.querySelectorAll('.cms-search-input, .search-box-ds input');
    if (!searchInputs.length) return;

    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.performSearch(query);
      });
    });
  },

  performSearch(query) {
    const items = document.querySelectorAll('.project-item-card, .card-project, .card-service, .portfolio-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CMSSearch.init();
});

if (typeof window !== 'undefined') {
  window.CMSSearch = CMSSearch;
}
