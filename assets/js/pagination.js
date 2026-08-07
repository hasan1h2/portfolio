/* ==========================================================================
   JSON CMS - PAGINATION & LOAD MORE ENGINE
   ========================================================================== */

const CMSPagination = {
  init(container, loadMoreBtn, pageSize = 6) {
    if (!container || !loadMoreBtn) return;

    const items = Array.from(container.children);
    let visibleCount = pageSize;

    const updateVisibility = () => {
      items.forEach((item, idx) => {
        if (idx < visibleCount) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      if (visibleCount >= items.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
      }
    };

    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      visibleCount += pageSize;
      updateVisibility();
    });

    updateVisibility();
  }
};

if (typeof window !== 'undefined') {
  window.CMSPagination = CMSPagination;
}
