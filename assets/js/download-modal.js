/* ==========================================================================
   DOWNLOAD CENTER - RESOURCE DETAILS MODAL
   ========================================================================== */

const DownloadModalEngine = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.btn-open-modal');
      if (trigger) {
        const id = trigger.getAttribute('data-id');
        const resources = window.DownloadLoaderEngine ? window.DownloadLoaderEngine.resources : [];
        const item = resources.find(r => r.id === id);
        if (item) {
          this.openDetailsModal(item);
        }
      }
    });
  },

  openDetailsModal(item) {
    let modal = document.querySelector('#downloadDetailsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'downloadDetailsModal';
      modal.className = 'modal-backdrop-ds';
      modal.innerHTML = `
        <div class="modal-dialog-ds">
          <div class="modal-header-ds">
            <h4 class="modal-title text-primary-color mb-0">Resource Details</h4>
            <button class="modal-close-ds" id="closeDetailsModal">&times;</button>
          </div>
          <div class="modal-body-ds">
            <span id="dtCategory" class="badge-ds badge-ds-primary mb-2">Category</span>
            <h3 id="dtTitle" class="mb-2">Resource Title</h3>
            <p id="dtDesc" class="body-sm text-secondary mb-4">Description</p>
            
            <div class="glass-card p-3 mb-4">
              <div class="row g-2 body-sm">
                <div class="col-6"><strong>Version:</strong> <span id="dtVersion"></span></div>
                <div class="col-6"><strong>File Size:</strong> <span id="dtSize"></span></div>
                <div class="col-6"><strong>File Format:</strong> <span id="dtType"></span></div>
                <div class="col-6"><strong>License:</strong> <span id="dtLicense"></span></div>
                <div class="col-6"><strong>Language:</strong> <span id="dtLang"></span></div>
                <div class="col-6"><strong>Updated:</strong> <span id="dtUpdated"></span></div>
              </div>
            </div>

            <div class="d-flex gap-3">
              <a id="dtDownloadBtn" href="#" download class="btn-ds btn-ds-primary w-100">
                <i class="bi bi-download"></i> Download Resource
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeDetailsModal').addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    modal.querySelector('#dtCategory').textContent = item.categoryLabel || item.category;
    modal.querySelector('#dtTitle').textContent = item.title;
    modal.querySelector('#dtDesc').textContent = item.description;
    modal.querySelector('#dtVersion').textContent = item.version;
    modal.querySelector('#dtSize').textContent = item.size;
    modal.querySelector('#dtType').textContent = item.type;
    modal.querySelector('#dtLicense').textContent = item.license;
    modal.querySelector('#dtLang').textContent = item.language;
    modal.querySelector('#dtUpdated').textContent = item.updatedDate;
    modal.querySelector('#dtDownloadBtn').href = item.fileUrl;

    modal.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadModalEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadModalEngine = DownloadModalEngine;
}
