/* ==========================================================================
   JSON CMS - HIGH PERFORMANCE DOCUMENTFRAGMENT RENDERING ENGINE (HARDENED)
   ========================================================================== */

const CMSRenderEngine = {
  sanitize(str) {
    if (window.GlobalErrorHandler) {
      return window.GlobalErrorHandler.escapeHTML(str);
    }
    if (!str || typeof str !== 'string') return '';
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  /**
   * Render Header Navigation Links
   */
  renderNavigation(navData, container) {
    if (!navData || !container) return;
    const fragment = document.createDocumentFragment();

    navData.forEach(item => {
      const a = document.createElement('a');
      a.className = 'header-nav-link nav-link';
      a.href = this.sanitize(item.url);
      a.textContent = item.label;
      fragment.appendChild(a);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  },

  /**
   * Render Projects Grid
   */
  renderProjects(projectsData, container) {
    if (!projectsData || !container) return;
    const fragment = document.createDocumentFragment();

    projectsData.forEach(project => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4 project-item-card';
      col.setAttribute('data-title', this.sanitize(project.title.toLowerCase()));
      col.setAttribute('data-category', this.sanitize(project.category));

      const tagsHtml = project.tags
        ? project.tags.map(t => `<span class="project-tech-tag">${this.sanitize(t)}</span>`).join('')
        : '';

      col.innerHTML = `
        <div class="card-ds card-project h-100">
          <div class="card-project__image-wrapper">
            <img src="${this.sanitize(project.image)}" alt="${this.sanitize(project.title)}" class="card-project__image" loading="lazy">
          </div>
          <div class="card-project__body">
            <span class="badge-ds badge-ds-primary mb-2">${this.sanitize(project.categoryLabel || 'Project')}</span>
            <h4>${this.sanitize(project.title)}</h4>
            <p class="body-sm text-secondary flex-grow-1">${this.sanitize(project.summary)}</p>
            <div class="project-tech-stack mb-3">${tagsHtml}</div>
            <div class="d-flex gap-2">
              <a href="#" class="btn-ds btn-ds-primary btn-sm open-project-modal" data-slug="${this.sanitize(project.slug)}">
                <i class="bi bi-eye"></i> Details
              </a>
              ${project.liveUrl ? `<a href="${this.sanitize(project.liveUrl)}" target="_blank" class="btn-ds btn-ds-outline btn-sm"><i class="bi bi-box-arrow-up-right"></i> Live</a>` : ''}
            </div>
          </div>
        </div>
      `;
      fragment.appendChild(col);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  },

  /**
   * Render Skills Matrix
   */
  renderSkills(skillsData, container) {
    if (!skillsData || !container) return;
    const fragment = document.createDocumentFragment();

    skillsData.forEach(cat => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4';

      const skillsHtml = cat.skills.map(s => `
        <div class="mb-3">
          <div class="d-flex justify-content-between mb-1">
            <span class="fw-semibold body-sm"><i class="${this.sanitize(s.icon)} text-primary-color me-2"></i>${this.sanitize(s.name)}</span>
            <span class="caption font-mono">${s.level}%</span>
          </div>
          <div class="progress" style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 4px;">
            <div class="progress-bar-fill bg-primary-glow" data-width="${s.level}%" style="width: ${s.level}%; height: 100%; border-radius: 4px;"></div>
          </div>
        </div>
      `).join('');

      col.innerHTML = `
        <div class="glass-card p-4 h-100">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="card-skill__icon"><i class="bi ${this.sanitize(cat.icon)}"></i></div>
            <h4 class="mb-0">${this.sanitize(cat.category)}</h4>
          </div>
          ${skillsHtml}
        </div>
      `;
      fragment.appendChild(col);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  },

  /**
   * Render Services Offered
   */
  renderServices(servicesData, container) {
    if (!servicesData || !container) return;
    const fragment = document.createDocumentFragment();

    servicesData.forEach(srv => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4';

      const featuresHtml = srv.features
        ? srv.features.map(f => `<li class="body-sm text-secondary mb-1"><i class="bi bi-check2-circle text-primary-color me-2"></i>${this.sanitize(f)}</li>`).join('')
        : '';

      col.innerHTML = `
        <div class="card-ds card-service h-100">
          <div class="card-service__icon"><i class="bi ${this.sanitize(srv.icon)}"></i></div>
          <h4>${this.sanitize(srv.title)}</h4>
          <p class="body-sm text-secondary mb-3">${this.sanitize(srv.description)}</p>
          <ul class="ps-0 list-unstyled">${featuresHtml}</ul>
        </div>
      `;
      fragment.appendChild(col);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  },

  /**
   * Render Certificates
   */
  renderCertificates(certificatesData, container) {
    if (!certificatesData || !container) return;
    const fragment = document.createDocumentFragment();

    certificatesData.forEach(cert => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4';

      col.innerHTML = `
        <div class="glass-card p-4 h-100 d-flex flex-column">
          <span class="badge-ds badge-ds-secondary mb-2">${this.sanitize(cert.issuer)}</span>
          <h4 class="flex-grow-1">${this.sanitize(cert.title)}</h4>
          <div class="caption text-muted mb-3"><i class="bi bi-calendar-event me-1"></i> Issued ${this.sanitize(cert.date)}</div>
          <a href="${this.sanitize(cert.verifyUrl)}" target="_blank" class="btn-ds btn-ds-outline btn-sm align-self-start">
            <i class="bi bi-patch-check"></i> Verify Credential
          </a>
        </div>
      `;
      fragment.appendChild(col);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }
};

if (typeof window !== 'undefined') {
  window.CMSRenderEngine = CMSRenderEngine;
}
