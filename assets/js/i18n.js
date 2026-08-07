/* ==========================================================================
   MULTI-LANGUAGE SYSTEM - MASTER ORCHESTRATOR API
   ========================================================================== */

const MultiLanguageEngine = {
  currentLang: 'en',
  translations: {},

  async initLanguage() {
    const savedLang = window.LanguageStorage ? window.LanguageStorage.getLanguage() : null;
    const detectedLang = savedLang || this.detectBrowserLanguage();

    await this.changeLanguage(detectedLang);
  },

  async changeLanguage(lang) {
    if (!['en', 'bn'].includes(lang)) lang = 'en';

    this.currentLang = lang;
    this.saveLanguagePreference(lang);

    this.translations = await this.loadLanguage(lang);
    this.translatePage();

    if (window.LanguageSwitcherUI) {
      window.LanguageSwitcherUI.updateUI(lang);
    }

    window.dispatchEvent(new CustomEvent('ds-language-change', { detail: { lang } }));
  },

  async loadLanguage(lang) {
    if (window.LocaleLoaderEngine) {
      return await window.LocaleLoaderEngine.loadAllNamespaces(lang);
    }
    return {};
  },

  translatePage() {
    if (window.DOMTranslatorEngine) {
      window.DOMTranslatorEngine.translateDOM(this.translations, this.currentLang);
    }
  },

  detectBrowserLanguage() {
    const navLang = navigator.language || navigator.userLanguage || 'en';
    if (navLang.startsWith('bn')) return 'bn';
    return 'en';
  },

  saveLanguagePreference(lang) {
    if (window.LanguageStorage) {
      window.LanguageStorage.setLanguage(lang);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  MultiLanguageEngine.initLanguage();
});

if (typeof window !== 'undefined') {
  window.MultiLanguageEngine = MultiLanguageEngine;
  window.initLanguage = () => MultiLanguageEngine.initLanguage();
  window.changeLanguage = (lang) => MultiLanguageEngine.changeLanguage(lang);
}
