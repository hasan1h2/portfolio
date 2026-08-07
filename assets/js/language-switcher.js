/* ==========================================================================
   MULTI-LANGUAGE SYSTEM - LANGUAGE SWITCHER WIDGET CONTROLLER
   ========================================================================== */

const LanguageSwitcherUI = {
  init() {
    this.bindEvents();
  },

  updateUI(currentLang) {
    const langLabels = document.querySelectorAll('.current-lang-label');
    const flagIcons = document.querySelectorAll('.current-lang-flag');

    langLabels.forEach(label => {
      label.textContent = currentLang === 'bn' ? 'বাংলা' : 'EN';
    });

    flagIcons.forEach(icon => {
      icon.className = currentLang === 'bn' ? 'bi bi-translate text-primary-color' : 'bi bi-globe text-primary-color';
    });

    // Update active dropdown items
    document.querySelectorAll('.lang-select-item').forEach(item => {
      const lang = item.getAttribute('data-lang');
      item.classList.toggle('active', lang === currentLang);
    });
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.lang-select-item');
      if (item) {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (window.MultiLanguageEngine) {
          window.MultiLanguageEngine.changeLanguage(lang);
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LanguageSwitcherUI.init();
});

if (typeof window !== 'undefined') {
  window.LanguageSwitcherUI = LanguageSwitcherUI;
}
