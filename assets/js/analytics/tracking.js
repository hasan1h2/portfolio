/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - AUTOMATED DOM TRACKER
   ========================================================================== */

const AnalyticsDOMTracker = {
  bindEventListeners() {
    document.addEventListener('click', (e) => {
      // 1. Resume / Asset Downloads
      const downloadBtn = e.target.closest('a[download], .btn-download-track');
      if (downloadBtn) {
        const href = downloadBtn.getAttribute('href') || 'document';
        const label = downloadBtn.getAttribute('data-id') || href;
        if (window.AnalyticsEngine) {
          window.AnalyticsEngine.trackDownload(label);
        }
      }

      // 2. Project Demo & Details Click
      const demoBtn = e.target.closest('.open-project-modal, a[href*="live"]');
      if (demoBtn) {
        const slug = demoBtn.getAttribute('data-slug') || demoBtn.getAttribute('href');
        if (window.AnalyticsEngine) {
          window.AnalyticsEngine.trackProjectView(slug);
        }
      }

      // 3. Social Media Clicks (GitHub & LinkedIn)
      const link = e.target.closest('a[href*="github.com"], a[href*="linkedin.com"]');
      if (link) {
        const url = link.getAttribute('href');
        const isGithub = url.includes('github.com');
        const goal = isGithub ? 'GITHUB_VISIT' : 'LINKEDIN_VISIT';
        if (window.AnalyticsEngine) {
          window.AnalyticsEngine.trackConversion(goal, url);
        }
      }
    });

    // 4. Contact Form Submissions
    const contactForm = document.querySelector('#contactForm, .contact-form-ds');
    if (contactForm) {
      contactForm.addEventListener('submit', () => {
        if (window.AnalyticsEngine) {
          window.AnalyticsEngine.trackConversion('CONTACT_SUBMIT', 'Contact Form Submitted');
        }
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AnalyticsDOMTracker.bindEventListeners();
});

if (typeof window !== 'undefined') {
  window.AnalyticsDOMTracker = AnalyticsDOMTracker;
}
