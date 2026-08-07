/* ==========================================================================
   GLOBAL DESIGN SYSTEM - UTILITY HELPERS (JS)
   ========================================================================== */

const DSUtils = {
  /**
   * Debounce function for performance optimization
   */
  debounce(func, wait = 100, immediate = false) {
    let timeout;
    return function (...args) {
      const context = this;
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (callNow) func.apply(context, args);
    };
  },

  /**
   * Throttle function
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      return false;
    }
  },

  /**
   * Safe element selector
   */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }
};

if (typeof window !== 'undefined') {
  window.DSUtils = DSUtils;
}
