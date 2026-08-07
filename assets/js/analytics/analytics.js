/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - MASTER ORCHESTRATOR API
   ========================================================================== */

const AnalyticsEngine = {
  sessionEvents: [],

  initAnalytics() {
    if (window.AnalyticsPrivacy && !window.AnalyticsPrivacy.isTrackingAllowed()) {
      console.log('[AnalyticsEngine] Tracking disabled per user privacy preference or DNT header.');
      return;
    }

    this.trackPageView();
    console.log('[AnalyticsEngine] Analytics Engine initialized successfully.');
  },

  trackPageView(pageTitle = document.title) {
    if (window.AnalyticsPrivacy && !window.AnalyticsPrivacy.isTrackingAllowed()) return;

    const payload = window.AnalyticsEvents 
      ? window.AnalyticsEvents.createEventPayload('Navigation', 'PageView', pageTitle)
      : { action: 'PageView', title: pageTitle };

    this.sessionEvents.push(payload);
    if (window.AnalyticsConfig && window.AnalyticsConfig.debugMode) {
      console.log('[AnalyticsEngine] PageView:', payload);
    }
  },

  trackEvent(category, action, label = '', value = null) {
    if (window.AnalyticsPrivacy && !window.AnalyticsPrivacy.isTrackingAllowed()) return;

    const payload = window.AnalyticsEvents 
      ? window.AnalyticsEvents.createEventPayload(category, action, label, value)
      : { category, action, label, value };

    this.sessionEvents.push(payload);
    console.log(`[AnalyticsEngine] Event recorded [${category} -> ${action}]:`, label);
  },

  trackDownload(filename) {
    this.trackEvent('Downloads', 'DownloadResource', filename);
  },

  trackProjectView(projectSlug) {
    this.trackEvent('Projects', 'ViewProjectDetails', projectSlug);
  },

  trackSearch(query, resultCount = 0) {
    this.trackEvent('Search', 'ExecuteSearch', query, resultCount);
  },

  trackConversion(goalKey, details = '') {
    this.trackEvent('Conversion', goalKey, details);
  },

  disableTracking() {
    if (window.AnalyticsPrivacy) {
      window.AnalyticsPrivacy.disableTracking();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AnalyticsEngine.initAnalytics();
});

if (typeof window !== 'undefined') {
  window.AnalyticsEngine = AnalyticsEngine;
  window.initAnalytics = () => AnalyticsEngine.initAnalytics();
  window.trackPageView = (title) => AnalyticsEngine.trackPageView(title);
  window.trackEvent = (c, a, l, v) => AnalyticsEngine.trackEvent(c, a, l, v);
  window.trackDownload = (f) => AnalyticsEngine.trackDownload(f);
  window.trackProjectView = (p) => AnalyticsEngine.trackProjectView(p);
  window.trackSearch = (q, r) => AnalyticsEngine.trackSearch(q, r);
  window.trackConversion = (g, d) => AnalyticsEngine.trackConversion(g, d);
  window.disableTracking = () => AnalyticsEngine.disableTracking();
}
