/**
 * Theme Engine API
 * Prevents FOUC (Flash of Unstyled Content) by executing immediately in the <head>.
 * Implements Dark, Light, and System themes with localStorage. DEFAULT IS DARK MODE.
 */

const ThemeAPI = {
  STORAGE_KEYS: ['theme', 'theme_preference', 'hh_portfolio_theme', 'ds-portfolio-theme'],

  initTheme() {
    const savedTheme = this.loadTheme();
    // Default to 'dark' if no saved theme preference exists
    const themeToApply = savedTheme || 'dark';
    this.setTheme(themeToApply, false);

    this.detectSystemTheme();
    
    // Bind UI elements once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bindUIEvents());
    } else {
      this.bindUIEvents();
    }
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
  },

  setTheme(theme, animate = false) {
    if (!['dark', 'light', 'system'].includes(theme)) return;

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (animate && document.body) {
      document.body.classList.add('theme-transitioning');
    }

    // Apply to both documentElement (HTML) and body to ensure all variables cascade and prevent FOUC
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.dataset.theme = effectiveTheme;
    if (document.body) {
      document.body.setAttribute('data-theme', effectiveTheme);
      document.body.dataset.theme = effectiveTheme;
    }

    if (effectiveTheme === 'dark') {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      if (document.body) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      }
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
      if (document.body) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      }
    }
    
    this.saveTheme(theme);
    this.updateThemeIcon(effectiveTheme);

    window.dispatchEvent(new CustomEvent('ds-theme-change', { detail: { theme: effectiveTheme, mode: theme } }));

    if (animate) {
      setTimeout(() => {
        document.body?.classList.remove('theme-transitioning');
      }, 300);
    }
  },

  loadTheme() {
    try {
      for (const key of this.STORAGE_KEYS) {
        const val = localStorage.getItem(key);
        if (val) return val;
      }
      return null;
    } catch (e) {
      console.warn('localStorage is not accessible');
      return null;
    }
  },

  saveTheme(theme) {
    try {
      for (const key of this.STORAGE_KEYS) {
        localStorage.setItem(key, theme);
      }
    } catch (e) {
      console.warn('localStorage is not accessible');
    }
  },

  detectSystemTheme() {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = this.loadTheme();
        if (savedTheme === 'system') {
          const effectiveTheme = e.matches ? 'dark' : 'light';
          this.setTheme(effectiveTheme, false);
        }
      });
    } catch (e) {}
  },

  updateThemeIcon(effectiveTheme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn, #themeToggleBtn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        this.animateThemeIcon(icon, effectiveTheme);
      }
      btn.setAttribute('aria-pressed', effectiveTheme === 'dark');
      btn.setAttribute('title', `Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Theme`);
      btn.setAttribute('aria-label', `Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Theme`);
    });
  },

  animateThemeIcon(icon, theme) {
    icon.classList.add('rotating');
    setTimeout(() => {
      if (theme === 'light') {
        icon.className = 'fas fa-sun bi bi-sun-fill';
      } else {
        icon.className = 'fas fa-moon bi bi-moon-stars-fill';
      }
      icon.classList.remove('rotating');
    }, 150);
  },

  bindUIEvents() {
    if (!this._eventsBound) {
      document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.theme-toggle-btn, #themeToggleBtn');
        if (toggleBtn) {
          e.preventDefault();
          this.toggleTheme();
        }
      });
      this._eventsBound = true;
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    this.updateThemeIcon(currentTheme);
  }
};

// Execute immediately in head to set theme before paint
ThemeAPI.initTheme();

// Expose Global API
window.ThemeAPI = ThemeAPI;
window.initTheme = () => ThemeAPI.initTheme();
window.toggleTheme = () => ThemeAPI.toggleTheme();
window.setTheme = (theme) => ThemeAPI.setTheme(theme, true);
window.loadTheme = () => ThemeAPI.loadTheme();
window.saveTheme = (theme) => ThemeAPI.saveTheme(theme);

