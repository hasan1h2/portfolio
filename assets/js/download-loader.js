/* ==========================================================================
   DOWNLOAD CENTER - DATA LOADER & RENDERER ENGINE
   ========================================================================== */

const DownloadLoaderEngine = {
  resources: [],

  async init() {
    this.resources = await this.loadDownloadData();
    this.renderResourceGrid(this.resources);
  },

  async loadDownloadData() {
    try {
      const res = await fetch('assets/data/downloads.json');
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[DownloadLoaderEngine] Error fetching downloads.json:', err);
      return [];
    }
  },

  renderResourceGrid(items) {
    const container = document.querySelector('#resourceGrid');
    if (!container) return;

    if (!items || !items.length) {
      container.innerHTML = `<div class="col-12 text-center py-5 text-muted">No resource downloads match your search or filter criteria.</div>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-xl-4 resource-item-card';
      col.setAttribute('data-category', item.category);

      const tagsHtml = item.tags
        ? item.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')
        : '';

      const isFav = window.DownloadAnalyticsEngine ? window.DownloadAnalyticsEngine.isFavorite(item.id) : false;

      col.innerHTML = `
        <div class="card-ds card-project h-100 pos-relative">
          <div class="card-project__image-wrapper">
            <img src="${item.thumbnail}" alt="${item.title}" class="card-project__image" loading="lazy">
            <button class="btn-ds btn-ds-icon btn-ds-ghost pos-absolute top-0 end-0 m-2 btn-favorite ${isFav ? 'active text-danger-color' : ''}" data-id="${item.id}" title="Bookmark Favorite">
              <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
          </div>
          <div class="card-project__body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge-ds badge-ds-primary">${item.categoryLabel || item.category}</span>
              <span class="caption font-mono text-muted">${item.type} — ${item.size}</span>
            </div>
            <h4>${item.title}</h4>
            <p class="body-sm text-secondary flex-grow-1">${item.description}</p>
            <div class="caption text-muted mb-3 d-flex justify-content-between">
              <span><i class="bi bi-tag me-1"></i>${item.version}</span>
              <span><i class="bi bi-clock me-1"></i>${item.updatedDate}</span>
            </div>
            <div class="project-tech-stack mb-3">${tagsHtml}</div>
            <div class="d-flex gap-2">
              <a href="${item.fileUrl}" download class="btn-ds btn-ds-primary btn-sm btn-download-track" data-id="${item.id}">
                <i class="bi bi-download"></i> Download
              </a>
              <button class="btn-ds btn-ds-outline btn-sm btn-preview-resource" data-id="${item.id}">
                <i class="bi bi-eye"></i> Preview
              </button>
              <button class="btn-ds btn-ds-ghost btn-sm btn-open-modal" data-id="${item.id}" title="Details">
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      fragment.appendChild(col);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadLoaderEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadLoaderEngine = DownloadLoaderEngine;
}
