/* ==========================================================================
   MULTI-LANGUAGE SYSTEM - LANGUAGE PREFERENCE STORAGE
   ========================================================================== */

const LanguageStorage = {
  STORAGE_KEY: 'hh_portfolio_lang',

  getLanguage() {
    return localStorage.getItem(this.STORAGE_KEY) || null;
  },

  setLanguage(lang) {
    if (!lang) return;
    localStorage.setItem(this.STORAGE_KEY, lang);
  },

  clearLanguage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};

if (typeof window !== 'undefined') {
  window.LanguageStorage = LanguageStorage;
}
