/* ==========================================================================
   DOWNLOAD CENTER - LIGHTBOX & DOCUMENT PREVIEWER
   ========================================================================== */

const DownloadPreviewEngine = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.btn-preview-resource');
      if (trigger) {
        const id = trigger.getAttribute('data-id');
        const resources = window.DownloadLoaderEngine ? window.DownloadLoaderEngine.resources : [];
        const item = resources.find(r => r.id === id);
        if (item) {
          this.openPreview(item);
        }
      }
    });
  },

  openPreview(item) {
    let modal = document.querySelector('#downloadPreviewModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'downloadPreviewModal';
      modal.className = 'modal-backdrop-ds modal-lightbox';
      modal.innerHTML = `
        <div class="modal-dialog-ds style="max-width: 900px;">
          <div class="modal-header-ds">
            <h4 class="modal-title text-primary-color mb-0" id="previewModalTitle">Resource Preview</h4>
            <button class="modal-close-ds" id="closePreviewModal">&times;</button>
          </div>
          <div class="modal-body-ds text-center p-0">
            <div id="previewFrameContainer"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closePreviewModal').addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    modal.querySelector('#previewModalTitle').textContent = `Preview: ${item.title}`;
    const frameContainer = modal.querySelector('#previewFrameContainer');

    if (item.type === 'PDF') {
      frameContainer.innerHTML = `<iframe src="${item.fileUrl}" style="width:100%; height:75vh; border:none; border-radius:12px;"></iframe>`;
    } else {
      frameContainer.innerHTML = `<img src="${item.thumbnail}" alt="${item.title}" style="max-height:75vh; border-radius:12px; margin:0 auto;" class="img-fluid">`;
    }

    modal.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DownloadPreviewEngine.init();
});

if (typeof window !== 'undefined') {
  window.DownloadPreviewEngine = DownloadPreviewEngine;
}
