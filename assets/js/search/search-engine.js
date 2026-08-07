/* ==========================================================================
   GLOBAL SEARCH SYSTEM - FUSE.JS FUZZY SEARCH ENGINE & HIGHLIGHTER
   ========================================================================== */

const GlobalSearchEngine = {
  fuse: null,

  init(indexData) {
    if (typeof Fuse !== 'undefined') {
      const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.35,
        location: 0,
        distance: 100,
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.2 }
        ]
      };
      this.fuse = new Fuse(indexData, options);
    }
  },

  search(query, indexData) {
    if (!query || !query.trim()) return [];

    const cleanQuery = query.toLowerCase().trim();

    if (this.fuse) {
      const fuseResults = this.fuse.search(cleanQuery);
      return fuseResults.map(res => ({
        item: res.item,
        highlightedTitle: this.highlightText(res.item.title, cleanQuery),
        highlightedDesc: this.highlightText(res.item.description, cleanQuery)
      }));
    }

    // Built-in Fallback Fuzzy Search Engine
    const filtered = indexData.filter(item => {
      const t = item.title.toLowerCase();
      const d = item.description.toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      return t.includes(cleanQuery) || d.includes(cleanQuery) || tags.includes(cleanQuery);
    });

    return filtered.map(item => ({
      item: item,
      highlightedTitle: this.highlightText(item.title, cleanQuery),
      highlightedDesc: this.highlightText(item.description, cleanQuery)
    }));
  },

  highlightText(text, query) {
    if (!text || !query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
};

if (typeof window !== 'undefined') {
  window.GlobalSearchEngine = GlobalSearchEngine;
}
