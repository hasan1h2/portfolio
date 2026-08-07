/* ==========================================================================
   PROGRESSIVE WEB APP - MASTER PWA MANAGER & JS API
   ========================================================================== */

const PWAManager = {
  swRegistration: null,

  async init() {
    this.registerServiceWorker();
  },

  /**
   * Register Service Worker
   */
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const swPath = window.location.pathname.includes('/blog/') ? '../service-worker.js' : 'service-worker.js';
      navigator.serviceWorker.register(swPath)
        .then((reg) => {
          this.swRegistration = reg;
          console.log('[PWA] Service Worker registered successfully:', reg.scope);
          this.checkForUpdates();
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    }
  },

  /**
   * Check for Service Worker updates
   */
  checkForUpdates() {
    if (this.swRegistration) {
      this.swRegistration.onupdatefound = () => {
        const installingWorker = this.swRegistration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (window.PWAUpdateEngine) {
                window.PWAUpdateEngine.showUpdateBanner();
              }
            }
          };
        }
      };
    }
  },

  /**
   * Clear old cache stores
   */
  async clearOldCache() {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
  },

  /**
   * Refresh application after update
   */
  refreshApplication() {
    window.location.reload();
  },

  /**
   * Show Install Prompt
   */
  showInstallPrompt() {
    if (window.PWAInstallEngine) {
      window.PWAInstallEngine.triggerPrompt();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PWAManager.init();
});

if (typeof window !== 'undefined') {
  window.PWAManager = PWAManager;
  window.registerServiceWorker = () => PWAManager.registerServiceWorker();
  window.showInstallPrompt = () => PWAManager.showInstallPrompt();
  window.checkForUpdates = () => PWAManager.checkForUpdates();
  window.clearOldCache = () => PWAManager.clearOldCache();
  window.refreshApplication = () => PWAManager.refreshApplication();
}
