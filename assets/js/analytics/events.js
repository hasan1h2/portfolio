/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - EVENT DEFINITIONS
   ========================================================================== */

const AnalyticsEvents = {
  CATEGORIES: {
    NAVIGATION: 'Navigation',
    PROJECTS: 'Projects',
    DOWNLOADS: 'Downloads',
    CONTACT: 'Contact',
    SEARCH: 'Search',
    CONVERSION: 'Conversion'
  },

  createEventPayload(category, action, label = '', value = null) {
    return {
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
      path: window.location.pathname
    };
  }
};

if (typeof window !== 'undefined') {
  window.AnalyticsEvents = AnalyticsEvents;
}
