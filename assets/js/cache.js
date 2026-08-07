/* ==========================================================================
   JSON CMS - MEMORY CACHE ENGINE
   ========================================================================== */

const CMSCache = {
  cache: new Map(),

  set(key, data) {
    this.cache.set(key, data);
  },

  get(key) {
    return this.cache.get(key);
  },

  has(key) {
    return this.cache.has(key);
  },

  clear() {
    this.cache.clear();
  }
};

if (typeof window !== 'undefined') {
  window.CMSCache = CMSCache;
}
