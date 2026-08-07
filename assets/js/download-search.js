/* ==========================================================================
   DOWNLOAD CENTER - REAL-TIME SEARCH ENGINE
   ========================================================================== */

const DownloadSearchEngine = {
  init() {
    this.bindSearchInput();
  },

  bindSearchInput() {
    const searchInput = document.querySelector('#downloadSearchInput, .download-search-box input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const allResources = window.DownloadLoaderEngine ? window.DownloadLoaderEngine.resources : [];

      const filtered = allResources.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(query)))
      );

      if (window.DownloadLoaderEngine) {
        window.DownloadLoaderEngine.renderResourceGrid(filtered);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadSearchEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadSearchEngine = DownloadSearchEngine;
}
