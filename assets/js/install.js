/* ==========================================================================
   PROGRESSIVE WEB APP - INSTALL PROMPT & BANNER ENGINE
   ========================================================================== */

const PWAInstallEngine = {
  deferredPrompt: null,
  STORAGE_DISMISS_KEY: 'hh_pwa_install_dismissed',

  init() {
    this.bindInstallEvents();
  },

  bindInstallEvents() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;

      // Don't show banner if dismissed recently
      const dismissed = localStorage.getItem(this.STORAGE_DISMISS_KEY);
      if (!dismissed) {
        this.showInstallBanner();
      }
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.hideInstallBanner();
      console.log('[PWA] App installed successfully');
    });
  },

  showInstallBanner() {
    if (document.querySelector('#pwaInstallBanner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className = 'glass-card p-3 shadow-large pos-fixed bottom-0 start-50 translate-middle-x mb-4 z-modal d-flex align-items-center gap-3';
    banner.style.maxWidth = '480px';
    banner.style.width = '90%';

    banner.innerHTML = `
      <img src="assets/images/profile.svg" alt="App Icon" style="width: 44px; height: 44px; border-radius: 10px;">
      <div class="flex-grow-1">
        <div class="fw-bold body-sm">Install Habib Hasan App</div>
        <div class="caption text-muted">Add to home screen for fast offline access.</div>
      </div>
      <button class="btn-ds btn-ds-primary btn-sm" id="btnPWAInstall">Install</button>
      <button class="modal-close-ds" id="btnPWADismiss">&times;</button>
    `;

    document.body.appendChild(banner);

    banner.querySelector('#btnPWAInstall').addEventListener('click', () => {
      this.triggerPrompt();
    });

    banner.querySelector('#btnPWADismiss').addEventListener('click', () => {
      this.dismissBanner();
    });
  },

  triggerPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
        }
        this.deferredPrompt = null;
        this.hideInstallBanner();
      });
    }
  },

  dismissBanner() {
    localStorage.setItem(this.STORAGE_DISMISS_KEY, 'true');
    this.hideInstallBanner();
  },

  hideInstallBanner() {
    const banner = document.querySelector('#pwaInstallBanner');
    if (banner) banner.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PWAInstallEngine.init();
});

if (typeof window !== 'undefined') {
  window.PWAInstallEngine = PWAInstallEngine;
}
