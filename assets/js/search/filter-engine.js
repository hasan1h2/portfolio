/* ==========================================================================
   GLOBAL SEARCH SYSTEM - RESULT FILTERING & SORTING ENGINE
   ========================================================================== */

const GlobalSearchFilter = {
  filterByCategory(results, category) {
    if (!category || category === 'all') return results;
    return results.filter(r => r.item.category === category || r.item.type.toLowerCase() === category);
  },

  sortResults(results, sortType = 'relevance') {
    if (sortType === 'a-z') {
      return [...results].sort((a, b) => a.item.title.localeCompare(b.item.title));
    }
    if (sortType === 'z-a') {
      return [...results].sort((a, b) => b.item.title.localeCompare(a.item.title));
    }
    return results; // Default Fuse relevance score
  }
};

if (typeof window !== 'undefined') {
  window.GlobalSearchFilter = GlobalSearchFilter;
}
