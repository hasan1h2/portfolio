/* ==========================================================================
   GLOBAL DESIGN SYSTEM - THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */

const DSTheme = {
  STORAGE_KEY: 'ds-portfolio-theme',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to luxury dark
    this.setTheme(initialTheme);

    this.bindEvents();
  },

  setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Update Theme Toggle Buttons UI if present
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bi bi-moon-stars-fill';
        } else {
          icon.className = 'bi bi-sun-fill';
        }
      }
    });

    // Dispatch Custom Event
    window.dispatchEvent(new CustomEvent('ds-theme-change', { detail: { theme } }));
  },

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        this.toggleTheme();
      }
    });

    // Listen to OS system color scheme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
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
