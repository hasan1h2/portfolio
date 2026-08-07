/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - CONFIGURATION
   ========================================================================== */

const AnalyticsConfig = {
  enabled: true,
  debugMode: false,
  anonymizeIP: true,
  honorDNT: true,
  gaMeasurementId: null, // GA4 Measurement ID if provided by environment
  goals: {
    RESUME_DOWNLOAD: 'goal_resume_download',
    CONTACT_SUBMIT: 'goal_contact_submit',
    GITHUB_VISIT: 'goal_github_visit',
    LINKEDIN_VISIT: 'goal_linkedin_visit',
    PROJECT_DEMO: 'goal_project_demo'
  }
};

if (typeof window !== 'undefined') {
  window.AnalyticsConfig = AnalyticsConfig;
}
