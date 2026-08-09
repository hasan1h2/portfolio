/* ==========================================================================
   GLOBAL DESIGN SYSTEM - THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */

const DSTheme = {
  init() {
    if (window.ThemeAPI) {
      window.ThemeAPI.initTheme();
    }
    this.bindEvents();
  },

  setTheme(theme) {
    if (window.ThemeAPI) {
      window.ThemeAPI.setTheme(theme, true);
    }
  },

  toggleTheme() {
    if (window.ThemeAPI) {
      window.ThemeAPI.toggleTheme();
    }
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        this.toggleTheme();
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSTheme.init();
});

if (typeof window !== 'undefined') {
  window.DSTheme = DSTheme;
}

