/* ==========================================================================
   MULTI-LANGUAGE SYSTEM - DOM TRANSLATOR ENGINE
   ========================================================================== */

const DOMTranslatorEngine = {
  translateDOM(translationsData, currentLang) {
    if (!translationsData) return;

    // Update <html> lang attribute
    document.documentElement.setAttribute('lang', currentLang);

    // 1. Text Content Translation: data-i18n="namespace:key"
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const rawKey = el.getAttribute('data-i18n');
      const val = this.resolveKey(rawKey, translationsData);
      if (val) {
        el.textContent = val;
      }
    });

    // 2. Input Placeholder Translation: data-i18n-placeholder="namespace:key"
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const rawKey = el.getAttribute('data-i18n-placeholder');
      const val = this.resolveKey(rawKey, translationsData);
      if (val) {
        el.setAttribute('placeholder', val);
      }
    });

    // 3. Title Attribute Translation: data-i18n-title="namespace:key"
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(el => {
      const rawKey = el.getAttribute('data-i18n-title');
      const val = this.resolveKey(rawKey, translationsData);
      if (val) {
        el.setAttribute('title', val);
      }
    });
  },

  resolveKey(rawKey, data) {
    if (!rawKey || !rawKey.includes(':')) return null;
    const [ns, key] = rawKey.split(':');
    return data[ns] && data[ns][key] ? data[ns][key] : null;
  }
};

if (typeof window !== 'undefined') {
  window.DOMTranslatorEngine = DOMTranslatorEngine;
}
