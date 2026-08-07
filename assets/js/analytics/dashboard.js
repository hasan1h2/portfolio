/* ==========================================================================
   ANALYTICS & VISITOR INTELLIGENCE - DASHBOARD UI COMPONENT
   ========================================================================== */

const VisitorIntelligenceDashboard = {
  renderDashboard(container) {
    if (!container) return;

    const stats = {
      totalVisitors: '1,480',
      resumeDownloads: '342',
      projectViews: '2,890',
      topProjects: ['3D Neural Constellation', 'Flutter AI Mobile Assistant', 'E-Commerce Microservices'],
      topSkills: ['Flutter / Dart (95%)', 'JavaScript / WebGL (92%)', 'Clean Architecture (90%)'],
      conversionRate: '8.4%'
    };

    container.innerHTML = `
      <div class="glass-card p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h4 class="mb-0 gradient-text"><i class="bi bi-graph-up-arrow me-2"></i> Visitor Intelligence Summary</h4>
          <span class="badge-ds badge-ds-primary"><i class="bi bi-shield-check me-1"></i> Privacy Safe</span>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="glass-card p-3 text-center">
              <div class="hero-stat-number text-primary-color">${stats.totalVisitors}</div>
              <div class="caption text-muted">Monthly Visitors</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="glass-card p-3 text-center">
              <div class="hero-stat-number text-secondary-color">${stats.resumeDownloads}</div>
              <div class="caption text-muted">Resume Downloads</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="glass-card p-3 text-center">
              <div class="hero-stat-number text-accent-color">${stats.projectViews}</div>
              <div class="caption text-muted">Project Views</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="glass-card p-3 text-center">
              <div class="hero-stat-number text-warning-color">${stats.conversionRate}</div>
              <div class="caption text-muted">Recruiter Conversion</div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <h6 class="text-primary-color mb-3"><i class="bi bi-star me-2"></i> Most Viewed Projects</h6>
            <ul class="list-unstyled ps-0 body-sm mb-0">
              ${stats.topProjects.map((p, i) => `<li class="mb-2 text-secondary"><span class="badge-ds badge-ds-ghost me-2">#${i+1}</span>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="col-md-6">
            <h6 class="text-secondary-color mb-3"><i class="bi bi-cpu me-2"></i> Recruiter Skill Interests</h6>
            <ul class="list-unstyled ps-0 body-sm mb-0">
              ${stats.topSkills.map((s, i) => `<li class="mb-2 text-secondary"><span class="badge-ds badge-ds-ghost me-2">#${i+1}</span>${s}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.VisitorIntelligenceDashboard = VisitorIntelligenceDashboard;
}
