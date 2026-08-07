/* ==========================================================================
   ENTERPRISE SECURITY & PRODUCTION HARDENING - CENTRALIZED ERROR HANDLER
   ========================================================================== */

const GlobalErrorHandler = {
  DEFAULT_FALLBACK_IMAGE: 'assets/images/profile.svg',

  init() {
    this.bindGlobalErrorListeners();
    this.bindImageFallback();
  },

  /**
   * Escape HTML to prevent XSS (Cross-Site Scripting) Injection
   */
  escapeHTML(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Bind Global Error & Promise Rejection Handlers
   */
  bindGlobalErrorListeners() {
    window.addEventListener('error', (event) => {
      console.warn('[GlobalErrorHandler] Caught unhandled error:', event.message || event);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.warn('[GlobalErrorHandler] Caught unhandled Promise rejection:', event.reason);
    });
  },

  /**
   * Automatic Broken Image Fallback Handling
   */
  bindImageFallback() {
    document.addEventListener('error', (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        const img = e.target;
        if (!img.getAttribute('data-fallback-applied')) {
          img.setAttribute('data-fallback-applied', 'true');
          img.src = this.DEFAULT_FALLBACK_IMAGE;
          console.warn('[GlobalErrorHandler] Applied image fallback for:', e.target.src);
        }
      }
    }, true);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GlobalErrorHandler.init();
});

if (typeof window !== 'undefined') {
  window.GlobalErrorHandler = GlobalErrorHandler;
  window.escapeHTML = (str) => GlobalErrorHandler.escapeHTML(str);
}
