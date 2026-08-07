/* ==========================================================================
   BLOG & KNOWLEDGE HUB - LIVE SEARCH ENGINE
   ========================================================================== */

const BlogSearchEngine = {
  init(searchInput, postsContainer, postsData) {
    if (!searchInput || !postsContainer || !postsData) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = postsData.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(query)))
      );

      this.renderFilteredPosts(filtered, postsContainer);
    });
  },

  renderFilteredPosts(posts, container) {
    if (!posts.length) {
      container.innerHTML = `<div class="col-12 text-center py-5 text-muted">No articles found matching your query.</div>`;
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="col-md-6 col-xl-4 mb-4">
        <div class="card-ds card-project h-100">
          <div class="card-project__body">
            <span class="badge-ds badge-ds-primary mb-2">${post.categoryName || 'Article'}</span>
            <h4><a href="post.html?slug=${post.slug}" class="text-white text-decoration-none">${post.title}</a></h4>
            <p class="body-sm text-secondary flex-grow-1">${post.summary}</p>
            <div class="caption text-muted mb-3"><i class="bi bi-clock me-1"></i>${post.readingTime} — ${post.date}</div>
            <a href="post.html?slug=${post.slug}" class="btn-ds btn-ds-outline btn-sm">Read Article <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }
};

if (typeof window !== 'undefined') {
  window.BlogSearchEngine = BlogSearchEngine;
}
