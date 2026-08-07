/* ==========================================================================
   BLOG & KNOWLEDGE HUB - MULTI-CRITERIA FILTER ENGINE
   ========================================================================== */

const BlogFilterEngine = {
  filterByCategory(posts, categorySlug) {
    if (!categorySlug || categorySlug === 'all') return posts;
    return posts.filter(p => p.category === categorySlug);
  },

  filterByTag(posts, tagSlug) {
    if (!tagSlug) return posts;
    return posts.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === tagSlug.toLowerCase()));
  }
};

if (typeof window !== 'undefined') {
  window.BlogFilterEngine = BlogFilterEngine;
}
