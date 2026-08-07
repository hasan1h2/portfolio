/* ==========================================================================
   GLOBAL SEARCH SYSTEM - UNIFIED INDEX AGGREGATOR
   ========================================================================== */

const GlobalSearchIndex = {
  unifiedIndex: [],
  isIndexed: false,

  async buildIndex() {
    if (this.isIndexed) return this.unifiedIndex;

    const base = (window.location.pathname.includes('/blog/')) ? '../assets/data/' : 'assets/data/';

    const fetchSafe = async (filename) => {
      try {
        const res = await fetch(`${base}${filename}`);
        return res.ok ? await res.json() : [];
      } catch {
        return [];
      }
    };

    const [projects, skills, services, certs, portfolio, posts, downloads, faq, nav] = await Promise.all([
      fetchSafe('projects.json'),
      fetchSafe('skills.json'),
      fetchSafe('services.json'),
      fetchSafe('certificates.json'),
      fetchSafe('portfolio.json'),
      fetchSafe('posts.json'),
      fetchSafe('downloads.json'),
      fetchSafe('faq.json'),
      fetchSafe('navigation.json')
    ]);

    const items = [];

    // 1. Projects Indexing
    (projects || []).forEach(p => {
      items.push({
        id: p.id || p.slug,
        title: p.title,
        description: p.summary || p.description,
        type: 'Project',
        category: 'projects',
        icon: 'bi-rocket-takeoff',
        tags: p.tags || [],
        url: p.liveUrl || 'projects.html',
        thumbnail: p.image
      });
    });

    // 2. Skills Indexing
    (skills || []).forEach(cat => {
      (cat.skills || []).forEach(s => {
        items.push({
          id: `skill-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
          title: s.name,
          description: `${cat.category} Skill (${s.level}% Proficiency)`,
          type: 'Skill',
          category: 'skills',
          icon: 'bi-cpu',
          tags: [cat.category],
          url: 'skills.html'
        });
      });
    });

    // 3. Services Indexing
    (services || []).forEach(s => {
      items.push({
        id: s.id,
        title: s.title,
        description: s.description,
        type: 'Service',
        category: 'services',
        icon: s.icon || 'bi-code-slash',
        tags: s.features || [],
        url: 'services.html'
      });
    });

    // 4. Certificates Indexing
    (certs || []).forEach(c => {
      items.push({
        id: c.id,
        title: c.title,
        description: `Issued by ${c.issuer} (${c.date})`,
        type: 'Certificate',
        category: 'certificates',
        icon: 'bi-award',
        tags: [c.issuer],
        url: c.verifyUrl || 'certificates.html'
      });
    });

    // 5. Portfolio Indexing
    (portfolio || []).forEach(item => {
      items.push({
        id: item.id,
        title: item.title,
        description: `Category: ${item.category}`,
        type: 'Portfolio',
        category: 'portfolio',
        icon: 'bi-grid-3x3-gap',
        tags: [item.category],
        url: 'portfolio.html'
      });
    });

    // 6. Blog Posts Indexing
    (posts || []).forEach(post => {
      items.push({
        id: post.id || post.slug,
        title: post.title,
        description: post.summary,
        type: 'Blog Article',
        category: 'blog',
        icon: 'bi-journal-code',
        tags: post.tags || [],
        url: `blog/post.html?slug=${post.slug}`
      });
    });

    // 7. Downloads Indexing
    (downloads || []).forEach(dl => {
      items.push({
        id: dl.id,
        title: dl.title,
        description: `${dl.type} — ${dl.size} (${dl.categoryLabel})`,
        type: 'Download',
        category: 'downloads',
        icon: 'bi-download',
        tags: dl.tags || [],
        url: 'downloads.html'
      });
    });

    // 8. FAQ Indexing
    (faq || []).forEach((f, idx) => {
      items.push({
        id: `faq-${idx}`,
        title: f.question,
        description: f.answer,
        type: 'FAQ',
        category: 'faq',
        icon: 'bi-question-circle',
        tags: ['FAQ'],
        url: 'index.html#faq'
      });
    });

    // 9. Navigation Links Indexing
    (nav || []).forEach(n => {
      items.push({
        id: `nav-${n.label.toLowerCase()}`,
        title: `${n.label} Page`,
        description: `Direct link to ${n.label} page`,
        type: 'Navigation',
        category: 'navigation',
        icon: 'bi-compass',
        tags: ['Navigation', 'Link'],
        url: n.url
      });
    });

    this.unifiedIndex = items;
    this.isIndexed = true;
    return this.unifiedIndex;
  }
};

if (typeof window !== 'undefined') {
  window.GlobalSearchIndex = GlobalSearchIndex;
}
