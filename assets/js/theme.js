/**
 * Theme Engine API
 * Prevents FOUC (Flash of Unstyled Content) by executing immediately in the <head>.
 * Implements Dark, Light, and System themes with prefers-color-scheme detection and localStorage.
 */

const ThemeAPI = {
  STORAGE_KEY: 'theme_preference',

  initTheme() {
    const savedTheme = this.loadTheme();
    if (savedTheme) {
      this.setTheme(savedTheme, false);
    } else {
      this.setTheme('system', false);
    }

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

    if (animate) {
      document.body?.classList.add('theme-transitioning');
    }

    // Apply to both documentElement (HTML) and body to ensure all variables cascade and prevent FOUC
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    if (document.body) {
      document.body.setAttribute('data-theme', effectiveTheme);
    }
    
    this.saveTheme(theme);
    this.updateThemeIcon(theme);

    if (animate) {
      setTimeout(() => {
        document.body?.classList.remove('theme-transitioning');
      }, 300); // 300ms matches CSS transition duration
    }
  },

  loadTheme() {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      console.warn('localStorage is not accessible');
      return null;
    }
  },

  saveTheme(theme) {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {
      console.warn('localStorage is not accessible');
    }
  },

  detectSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const savedTheme = this.loadTheme();
      if (!savedTheme || savedTheme === 'system') {
        const effectiveTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', effectiveTheme);
        if (document.body) {
          document.body.setAttribute('data-theme', effectiveTheme);
        }
        this.updateThemeIcon('system');
      }
    });
  },

  updateThemeIcon(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    if (!buttons.length) return;

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    buttons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        this.animateThemeIcon(icon, effectiveTheme);
      }
      
      // ARIA Support
      btn.setAttribute('aria-pressed', effectiveTheme === 'dark');
      btn.setAttribute('title', `Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Theme`);
      btn.setAttribute('aria-label', `Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} Theme`);
    });
  },

  animateThemeIcon(icon, theme) {
    // Add rotating class for CSS animation
    icon.classList.add('rotating');
    
    setTimeout(() => {
      if (theme === 'light') {
        icon.className = 'bi bi-sun-fill';
      } else {
        icon.className = 'bi bi-moon-stars-fill';
      }
      // Remove rotating class to let the icon scale back in
      icon.classList.remove('rotating');
    }, 150); // Halfway through the transition
  },

  bindUIEvents() {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    
    buttons.forEach(btn => {
      // Mouse Click
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });

      // Keyboard Accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    });

    // Run once on load to ensure UI matches state
    const savedTheme = this.loadTheme() || 'system';
    this.updateThemeIcon(savedTheme);
  }
};

// Expose Global API as requested
window.initTheme = () => ThemeAPI.initTheme();
window.toggleTheme = () => ThemeAPI.toggleTheme();
window.setTheme = (theme) => ThemeAPI.setTheme(theme, true);
window.loadTheme = () => ThemeAPI.loadTheme();
window.saveTheme = (theme) => ThemeAPI.saveTheme(theme);
window.detectSystemTheme = () => ThemeAPI.detectSystemTheme();
window.updateThemeIcon = (theme) => ThemeAPI.updateThemeIcon(theme);
window.animateThemeIcon = (icon, theme) => ThemeAPI.animateThemeIcon(icon, theme);

// Execute immediately to prevent FOUC
ThemeAPI.initTheme();
