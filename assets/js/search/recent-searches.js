/* ==========================================================================
   GLOBAL SEARCH SYSTEM - RECENT SEARCHES & HISTORY
   ========================================================================== */

const GlobalRecentSearches = {
  STORAGE_KEY: 'hh_global_recent_searches',
  MAX_HISTORY: 5,

  getHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  saveRecentSearch(query) {
    if (!query || !query.trim() || query.length < 2) return;

    let history = this.getHistory();
    history = history.filter(q => q.toLowerCase() !== query.toLowerCase());
    history.unshift(query.trim());

    if (history.length > this.MAX_HISTORY) {
      history = history.slice(0, this.MAX_HISTORY);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  },

  clearRecentSearches() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};

if (typeof window !== 'undefined') {
  window.GlobalRecentSearches = GlobalRecentSearches;
}
