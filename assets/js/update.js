/* ==========================================================================
   PROGRESSIVE WEB APP - SERVICE WORKER UPDATE NOTIFIER
   ========================================================================== */

const PWAUpdateEngine = {
  showUpdateBanner() {
    if (document.querySelector('#pwaUpdateBanner')) return;

    const banner = document.createElement('div');
    banner.id = 'pwaUpdateBanner';
    banner.className = 'glass-card p-3 shadow-large pos-fixed bottom-0 end-0 m-4 z-toast d-flex align-items-center gap-3';
    banner.style.maxWidth = '400px';

    banner.innerHTML = `
      <i class="bi bi-arrow-repeat text-primary-color fs-3"></i>
      <div class="flex-grow-1">
        <div class="fw-bold body-sm">New Update Available!</div>
        <div class="caption text-muted">Refresh to load the latest version.</div>
      </div>
      <button class="btn-ds btn-ds-primary btn-sm" id="btnPWARefresh">Refresh</button>
    `;

    document.body.appendChild(banner);

    banner.querySelector('#btnPWARefresh').addEventListener('click', () => {
      if (window.PWAManager) {
        window.PWAManager.refreshApplication();
      } else {
        window.location.reload();
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.PWAUpdateEngine = PWAUpdateEngine;
}
