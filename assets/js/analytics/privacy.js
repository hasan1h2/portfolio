/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - PRIVACY & CONSENT ENGINE
   ========================================================================== */

const AnalyticsPrivacy = {
  STORAGE_CONSENT_KEY: 'hh_analytics_consent',

  isTrackingAllowed() {
    // 1. Respect Do Not Track (DNT) Browser Header
    if (window.AnalyticsConfig && window.AnalyticsConfig.honorDNT) {
      const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
      if (dnt === '1' || dnt === 'yes') {
        return false;
      }
    }

    // 2. Check LocalStorage Consent Memory
    const consent = localStorage.getItem(this.STORAGE_CONSENT_KEY);
    if (consent === 'disabled') return false;

    return true;
  },

  disableTracking() {
    localStorage.setItem(this.STORAGE_CONSENT_KEY, 'disabled');
    if (window.AnalyticsConfig) {
      window.AnalyticsConfig.enabled = false;
    }
    console.log('[AnalyticsPrivacy] Tracking has been disabled by user preference.');
  },

  enableTracking() {
    localStorage.setItem(this.STORAGE_CONSENT_KEY, 'enabled');
    if (window.AnalyticsConfig) {
      window.AnalyticsConfig.enabled = true;
    }
    console.log('[AnalyticsPrivacy] Tracking has been enabled.');
  }
};

if (typeof window !== 'undefined') {
  window.AnalyticsPrivacy = AnalyticsPrivacy;
}
