/* ==========================================================================
   GLOBAL DESIGN SYSTEM - THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */

const DSTheme = {
  init() {
    if (window.ThemeAPI) {
      window.ThemeAPI.initTheme();
    }
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
    // Single delegated listener is managed by ThemeAPI in assets/js/theme.js
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSTheme.init();
});

if (typeof window !== 'undefined') {
  window.DSTheme = DSTheme;
}

