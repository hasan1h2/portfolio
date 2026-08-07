/* ==========================================================================
   DOWNLOAD CENTER - CATEGORY FILTERING ENGINE
   ========================================================================== */

const DownloadFilterEngine = {
  init() {
    this.bindFilterPills();
  },

  bindFilterPills() {
    const filterBtns = document.querySelectorAll('.download-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-category');
        const allResources = window.DownloadLoaderEngine ? window.DownloadLoaderEngine.resources : [];

        const filtered = (cat === 'all' || !cat) 
          ? allResources 
          : allResources.filter(r => r.category === cat);

        if (window.DownloadLoaderEngine) {
          window.DownloadLoaderEngine.renderResourceGrid(filtered);
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadFilterEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadFilterEngine = DownloadFilterEngine;
}
