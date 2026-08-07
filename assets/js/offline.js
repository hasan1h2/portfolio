/* ==========================================================================
   PROGRESSIVE WEB APP - OFFLINE CONNECTION MONITOR
   ========================================================================== */

const PWAOfflineEngine = {
  init() {
    this.bindNetworkEvents();
  },

  bindNetworkEvents() {
    window.addEventListener('offline', () => {
      this.showToast('You are currently offline. Pages are loaded from cache.', 'warning');
    });

    window.addEventListener('online', () => {
      this.showToast('Connection restored! You are back online.', 'success');
    });
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `glass-card p-3 shadow-large pos-fixed top-0 start-50 translate-middle-x mt-4 z-toast d-flex align-items-center gap-2 border-${type}`;
    toast.style.maxWidth = '420px';

    toast.innerHTML = `
      <i class="bi ${type === 'warning' ? 'bi-wifi-off text-warning-color' : 'bi-wifi text-success-color'} fs-5"></i>
      <span class="body-sm flex-grow-1">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PWAOfflineEngine.init();
});

if (typeof window !== 'undefined') {
  window.PWAOfflineEngine = PWAOfflineEngine;
}
