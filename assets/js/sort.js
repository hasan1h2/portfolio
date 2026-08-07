/* ==========================================================================
   JSON CMS - ITEM SORTING ENGINE
   ========================================================================== */

const CMSSort = {
  sortItems(container, selector, keyExtractor, direction = 'asc') {
    if (!container) return;
    const items = Array.from(container.querySelectorAll(selector));

    items.sort((a, b) => {
      const valA = keyExtractor(a);
      const valB = keyExtractor(b);

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    items.forEach(item => container.appendChild(item));
  }
};

if (typeof window !== 'undefined') {
  window.CMSSort = CMSSort;
}
