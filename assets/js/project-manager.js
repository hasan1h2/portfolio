/* ==========================================================================
   JSON CMS - DYNAMIC SLUG-BASED PROJECT MANAGER
   ========================================================================== */

const ProjectManager = {
  async init() {
    this.projects = await window.CMSDataLoader.loadJSON('projects.json') || [];
    this.bindEvents();
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.open-project-modal');
      if (trigger) {
        e.preventDefault();
        const slug = trigger.getAttribute('data-slug');
        this.openProjectModal(slug);
      }
    });
  },

  getProjectBySlug(slug) {
    return this.projects.find(p => p.slug === slug);
  },

  openProjectModal(slug) {
    const project = this.getProjectBySlug(slug);
    if (!project) return;

    let modal = document.querySelector('#cms-project-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cms-project-modal';
      modal.className = 'modal-backdrop-ds';
      modal.innerHTML = `
        <div class="modal-dialog-ds">
          <div class="modal-header-ds">
            <h4 class="modal-title text-primary-color mb-0">Project Details</h4>
            <button class="modal-close-ds" id="closeProjectModal">&times;</button>
          </div>
          <div class="modal-body-ds">
            <img id="modalProjImg" src="" alt="Project" class="img-fluid rounded-lg mb-3" style="max-height: 250px; width: 100%; object-fit: cover;">
            <span id="modalProjCategory" class="badge-ds badge-ds-primary mb-2">Category</span>
            <h3 id="modalProjTitle" class="mb-2">Project Title</h3>
            <p id="modalProjDesc" class="body-sm text-secondary mb-4">Project Description</p>
            <div id="modalProjTags" class="project-tech-stack mb-4"></div>
            <div class="d-flex gap-3">
              <a id="modalProjLive" href="#" target="_blank" class="btn-ds btn-ds-primary btn-sm"><i class="bi bi-box-arrow-up-right"></i> Visit Live App</a>
              <a id="modalProjGithub" href="#" target="_blank" class="btn-ds btn-ds-outline btn-sm"><i class="bi bi-github"></i> GitHub Source</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeProjectModal').addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    modal.querySelector('#modalProjImg').src = project.image;
    modal.querySelector('#modalProjCategory').textContent = project.categoryLabel || project.category;
    modal.querySelector('#modalProjTitle').textContent = project.title;
    modal.querySelector('#modalProjDesc').textContent = project.description || project.summary;
    modal.querySelector('#modalProjTags').innerHTML = project.tags
      ? project.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')
      : '';
    modal.querySelector('#modalProjLive').href = project.liveUrl || '#';
    modal.querySelector('#modalProjGithub').href = project.githubUrl || '#';

    modal.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ProjectManager.init();
});

if (typeof window !== 'undefined') {
  window.ProjectManager = ProjectManager;
}
