/* ==========================================================================
   ADVANCED THEME ENGINE - THEME & ACCENT MANAGEMENT API
   ========================================================================== */

const ThemeEngine = {
  STORAGE_THEME_KEY: 'hh_portfolio_theme',
  STORAGE_ACCENT_KEY: 'hh_portfolio_accent',

  // Current State
  currentTheme: 'dark', // 'dark' | 'light' | 'system'
  currentAccent: 'cyan', // 'cyan' | 'purple' | 'emerald' | 'blue' | 'orange' | 'pink'

  // Accent Hex Maps
  accents: {
    cyan: '#00E5FF',
    purple: '#7B61FF',
    emerald: '#10B981',
    blue: '#3B82F6',
    orange: '#F97316',
    pink: '#EC4899'
  },

  init() {
    this.loadPreferences();
    this.detectSystemTheme();
    this.createPanelElements();
    this.bindEvents();
  },

  /**
   * Set Theme Mode ('dark', 'light', 'system')
   */
  setTheme(theme) {
    if (!['dark', 'light', 'system'].includes(theme)) return;

    this.currentTheme = theme;
    let effectiveTheme = theme;

    if (theme === 'system') {
      effectiveTheme = this.getSystemPreference();
    }

    document.body.setAttribute('data-theme', effectiveTheme);
    this.savePreferences();
    this.updatePanelUI();

    window.dispatchEvent(new CustomEvent('ds-theme-change', { detail: { theme: effectiveTheme, mode: theme } }));
  },

  /**
   * Toggle between dark and light modes
   */
  toggleTheme() {
    const nextTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  },

  /**
   * Set Dynamic Accent Color
   */
  setAccent(accent) {
    if (!this.accents[accent]) return;

    this.currentAccent = accent;
    document.body.setAttribute('data-accent', accent);
    this.savePreferences();
    this.updatePanelUI();

    window.dispatchEvent(new CustomEvent('ds-accent-change', { detail: { accent } }));
  },

  /**
   * Load saved preferences from LocalStorage
   */
  loadPreferences() {
    const savedTheme = localStorage.getItem(this.STORAGE_THEME_KEY) || 'dark';
    const savedAccent = localStorage.getItem(this.STORAGE_ACCENT_KEY) || 'cyan';

    this.setTheme(savedTheme);
    this.setAccent(savedAccent);
  },

  /**
   * Save preferences to LocalStorage
   */
  savePreferences() {
    localStorage.setItem(this.STORAGE_THEME_KEY, this.currentTheme);
    localStorage.setItem(this.STORAGE_ACCENT_KEY, this.currentAccent);
  },

  /**
   * Reset preferences to defaults
   */
  resetPreferences() {
    localStorage.removeItem(this.STORAGE_THEME_KEY);
    localStorage.removeItem(this.STORAGE_ACCENT_KEY);
    this.setTheme('dark');
    this.setAccent('cyan');
  },

  /**
   * Get OS theme preference
   */
  getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * Detect OS System theme changes
   */
  detectSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        const effectiveTheme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', effectiveTheme);
      }
    });
  },

  /**
   * Create Floating Theme Settings Panel Elements
   */
  createPanelElements() {
    if (document.querySelector('.theme-panel-drawer')) return;

    // 1. Floating Trigger Button
    const trigger = document.createElement('button');
    trigger.className = 'theme-panel-trigger';
    trigger.id = 'themePanelTrigger';
    trigger.title = 'Customize Theme & Colors';
    trigger.innerHTML = `<i class="bi bi-palette-fill"></i>`;
    document.body.appendChild(trigger);

    // 2. Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'theme-panel-backdrop';
    backdrop.id = 'themePanelBackdrop';
    document.body.appendChild(backdrop);

    // 3. Panel Drawer
    const drawer = document.createElement('div');
    drawer.className = 'theme-panel-drawer';
    drawer.id = 'themePanelDrawer';
    drawer.innerHTML = `
      <div class="theme-panel-header">
        <div class="d-flex align-items-center gap-2 fw-bold text-primary-color">
          <i class="bi bi-sliders"></i> Theme Studio
        </div>
        <button class="modal-close-ds" id="themePanelClose">&times;</button>
      </div>
      <div class="theme-panel-body">
        <div>
          <label class="label-text mb-2 d-block">Appearance Mode</label>
          <div class="theme-mode-pills">
            <button class="theme-mode-btn" data-mode="dark"><i class="bi bi-moon-stars-fill"></i> Dark</button>
            <button class="theme-mode-btn" data-mode="light"><i class="bi bi-sun-fill"></i> Light</button>
            <button class="theme-mode-btn" data-mode="system"><i class="bi bi-display"></i> System</button>
          </div>
        </div>

        <div>
          <label class="label-text mb-2 d-block">Accent Palette</label>
          <div class="accent-swatches-grid">
            <button class="accent-swatch-btn" data-accent="cyan" style="background: #00E5FF;" title="Cyan"></button>
            <button class="accent-swatch-btn" data-accent="purple" style="background: #7B61FF;" title="Purple"></button>
            <button class="accent-swatch-btn" data-accent="emerald" style="background: #10B981;" title="Emerald"></button>
            <button class="accent-swatch-btn" data-accent="blue" style="background: #3B82F6;" title="Blue"></button>
            <button class="accent-swatch-btn" data-accent="orange" style="background: #F97316;" title="Orange"></button>
            <button class="accent-swatch-btn" data-accent="pink" style="background: #EC4899;" title="Pink"></button>
          </div>
        </div>

        <div class="pt-4 border-top border-secondary-subtle">
          <button class="btn-ds btn-ds-outline w-100 btn-sm" id="themePanelReset">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Defaults
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    this.updatePanelUI();
  },

  /**
   * Update active UI states in Panel
   */
  updatePanelUI() {
    const drawer = document.querySelector('#themePanelDrawer');
    if (!drawer) return;

    // Update Mode Pills
    const modeBtns = drawer.querySelectorAll('.theme-mode-btn');
    modeBtns.forEach(btn => {
      if (btn.getAttribute('data-mode') === this.currentTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Accent Swatches
    const swatches = drawer.querySelectorAll('.accent-swatch-btn');
    swatches.forEach(swatch => {
      if (swatch.getAttribute('data-accent') === this.currentAccent) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });
  },

  /**
   * Bind DOM Events for Panel Interactions
   */
  bindEvents() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('#themePanelTrigger');
      const closeBtn = e.target.closest('#themePanelClose, #themePanelBackdrop');
      const modeBtn = e.target.closest('.theme-mode-btn');
      const swatchBtn = e.target.closest('.accent-swatch-btn');
      const resetBtn = e.target.closest('#themePanelReset');

      if (trigger) {
        this.openPanel();
      } else if (closeBtn) {
        this.closePanel();
      } else if (modeBtn) {
        const mode = modeBtn.getAttribute('data-mode');
        this.setTheme(mode);
      } else if (swatchBtn) {
        const accent = swatchBtn.getAttribute('data-accent');
        this.setAccent(accent);
      } else if (resetBtn) {
        this.resetPreferences();
      }
    });

    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closePanel();
    });
  },

  openPanel() {
    document.querySelector('#themePanelDrawer')?.classList.add('open');
    document.querySelector('#themePanelBackdrop')?.classList.add('open');
  },

  closePanel() {
    document.querySelector('#themePanelDrawer')?.classList.remove('open');
    document.querySelector('#themePanelBackdrop')?.classList.remove('open');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ThemeEngine.init();
});

if (typeof window !== 'undefined') {
  window.ThemeEngine = ThemeEngine;
}
