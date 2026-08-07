/* ==========================================================================
   BLOG & KNOWLEDGE HUB - DATA LOADER ENGINE
   ========================================================================== */

const BlogLoader = {
  dataCache: new Map(),

  async getPosts() {
    return this.fetchJSON('../assets/data/posts.json');
  },

  async getCategories() {
    return this.fetchJSON('../assets/data/categories.json');
  },

  async getTags() {
    return this.fetchJSON('../assets/data/tags.json');
  },

  async getAuthors() {
    return this.fetchJSON('../assets/data/authors.json');
  },

  async getPostBySlug(slug) {
    const posts = await this.getPosts();
    return posts ? posts.find(p => p.slug === slug) : null;
  },

  async fetchJSON(url) {
    if (this.dataCache.has(url)) {
      return this.dataCache.get(url);
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      this.dataCache.set(url, data);
      return data;
    } catch (err) {
      console.warn(`[BlogLoader] Error fetching ${url}:`, err);
      return null;
    }
  }
};

if (typeof window !== 'undefined') {
  window.BlogLoader = BlogLoader;
}
