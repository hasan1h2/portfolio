/* ==========================================================================
   DOWNLOAD CENTER - DOWNLOAD TRACKER & FAVORITE BOOKMARKS (LOCALSTORAGE)
   ========================================================================== */

const DownloadAnalyticsEngine = {
  FAVORITES_KEY: 'hh_download_favorites',
  COUNTS_KEY: 'hh_download_counts',

  init() {
    this.bindEvents();
  },

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this.FAVORITES_KEY)) || [];
    } catch {
      return [];
    }
  },

  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  toggleFavorite(id) {
    let favs = this.getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter(item => item !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    return favs.includes(id);
  },

  getDownloadCount(id) {
    try {
      const counts = JSON.parse(localStorage.getItem(this.COUNTS_KEY)) || {};
      return counts[id] || 0;
    } catch {
      return 0;
    }
  },

  incrementDownloadCount(id) {
    try {
      const counts = JSON.parse(localStorage.getItem(this.COUNTS_KEY)) || {};
      counts[id] = (counts[id] || 0) + 1;
      localStorage.setItem(this.COUNTS_KEY, JSON.stringify(counts));
    } catch (e) {
      console.warn('Analytics save error:', e);
    }
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Favorite Bookmark Toggle
      const favBtn = e.target.closest('.btn-favorite');
      if (favBtn) {
        const id = favBtn.getAttribute('data-id');
        const isNowFav = this.toggleFavorite(id);
        const icon = favBtn.querySelector('i');
        if (icon) {
          icon.className = isNowFav ? 'bi bi-heart-fill' : 'bi bi-heart';
        }
        favBtn.classList.toggle('active', isNowFav);
        favBtn.classList.toggle('text-danger-color', isNowFav);
      }

      // Download Count Tracker
      const dlBtn = e.target.closest('.btn-download-track');
      if (dlBtn) {
        const id = dlBtn.getAttribute('data-id');
        this.incrementDownloadCount(id);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadAnalyticsEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadAnalyticsEngine = DownloadAnalyticsEngine;
}
