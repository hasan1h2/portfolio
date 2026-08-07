/* ==========================================================================
   JSON CMS - DATA LOADER API
   ========================================================================== */

const CMSDataLoader = {
  basePath: 'assets/data/',

  async loadJSON(fileName) {
    if (window.CMSCache && window.CMSCache.has(fileName)) {
      return window.CMSCache.get(fileName);
    }

    try {
      const response = await fetch(`${this.basePath}${fileName}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
      }
      const data = await response.json();
      if (window.CMSCache) {
        window.CMSCache.set(fileName, data);
      }
      return data;
    } catch (err) {
      console.warn(`[CMSDataLoader] Fetch warning for ${fileName}:`, err);
      return null;
    }
  },

  async loadAllData() {
    const files = [
      'profile.json', 'skills.json', 'experience.json', 'education.json',
      'projects.json', 'services.json', 'certificates.json', 'portfolio.json',
      'testimonials.json', 'faq.json', 'social-links.json', 'navigation.json',
      'site-settings.json', 'theme.json'
    ];

    const results = {};
    await Promise.all(
      files.map(async file => {
        const key = file.replace('.json', '');
        results[key] = await this.loadJSON(file);
      })
    );

    return results;
  }
};

if (typeof window !== 'undefined') {
  window.CMSDataLoader = CMSDataLoader;
}
