/* ==========================================================================
   MULTI-LANGUAGE SYSTEM - LOCALE PACKAGE ASYNC LOADER
   ========================================================================== */

const LocaleLoaderEngine = {
  localeCache: new Map(),

  async loadLocale(lang, namespace) {
    const key = `${lang}:${namespace}`;
    if (this.localeCache.has(key)) {
      return this.localeCache.get(key);
    }

    const isSubdir = window.location.pathname.includes('/blog/');
    const basePath = isSubdir ? '../assets/locales/' : 'assets/locales/';
    const url = `${basePath}${lang}/${namespace}.json`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Locale file not found: ${url}`);
      const data = await res.json();
      this.localeCache.set(key, data);
      return data;
    } catch (err) {
      console.warn(`[LocaleLoaderEngine] Could not load ${url}:`, err);
      return {};
    }
  },

  async loadAllNamespaces(lang) {
    const namespaces = ['common', 'navigation', 'home', 'about', 'skills', 'projects', 'contact', 'footer'];
    const packageData = {};

    await Promise.all(namespaces.map(async ns => {
      packageData[ns] = await this.loadLocale(lang, ns);
    }));

    return packageData;
  }
};

if (typeof window !== 'undefined') {
  window.LocaleLoaderEngine = LocaleLoaderEngine;
}
