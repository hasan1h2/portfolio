/* ==========================================================================
   GLOBAL SEARCH SYSTEM - FULLSCREEN MODAL CONTROLLER & JS API
   ========================================================================== */

const GlobalSearchModal = {
  currentCategory: 'all',
  currentQuery: '',
  indexData: [],

  async initializeSearch() {
    this.createModalElements();
    this.bindEvents();

    if (window.GlobalSearchKeyboard) {
      window.GlobalSearchKeyboard.bindKeyboardShortcuts();
    }
  },

  createModalElements() {
    if (document.querySelector('#globalSearchBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'global-search-backdrop';
    backdrop.id = 'globalSearchBackdrop';
    backdrop.innerHTML = `
      <div class="global-search-card" id="globalSearchCard">
        <!-- Search Input Bar -->
        <div class="search-header-bar">
          <i class="bi bi-search text-primary-color fs-5"></i>
          <input type="text" id="globalSearchInput" class="search-input-field" placeholder="Search projects, skills, blog articles, downloads..." autocomplete="off">
          <span class="search-shortcut-badge">ESC to close</span>
          <button class="modal-close-ds ms-2" id="closeSearchModalBtn">&times;</button>
        </div>

        <!-- Category Pills Bar -->
        <div class="search-categories-bar">
          <button class="search-cat-pill active" data-category="all">All Items</button>
          <button class="search-cat-pill" data-category="projects">Projects</button>
          <button class="search-cat-pill" data-category="skills">Skills</button>
          <button class="search-cat-pill" data-category="blog">Blog</button>
          <button class="search-cat-pill" data-category="downloads">Downloads</button>
          <button class="search-cat-pill" data-category="services">Services</button>
          <button class="search-cat-pill" data-category="certificates">Certificates</button>
        </div>

        <!-- Results Area -->
        <div class="search-results-body" id="globalSearchResults">
          <div id="quickActionsContainer"></div>
        </div>

        <!-- Footer Bar -->
        <div class="search-footer-bar">
          <span><i class="bi bi-arrow-down-up me-1"></i> Use arrow keys to navigate</span>
          <span><i class="bi bi-command me-1"></i> Ctrl + K / Cmd + K</span>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    if (window.GlobalQuickActions) {
      window.GlobalQuickActions.renderQuickActions(backdrop.querySelector('#quickActionsContainer'));
    }
  },

  async openSearch() {
    const backdrop = document.querySelector('#globalSearchBackdrop');
    if (!backdrop) return;

    backdrop.classList.add('open');
    const input = document.querySelector('#globalSearchInput');
    if (input) {
      input.focus();
      input.value = '';
    }

    if (!this.indexData.length && window.GlobalSearchIndex) {
      this.indexData = await window.GlobalSearchIndex.buildIndex();
      if (window.GlobalSearchEngine) {
        window.GlobalSearchEngine.init(this.indexData);
      }
    }
  },

  closeSearch() {
    const backdrop = document.querySelector('#globalSearchBackdrop');
    if (backdrop) backdrop.classList.remove('open');
    if (window.GlobalSearchKeyboard) window.GlobalSearchKeyboard.resetSelection();
  },

  search(query) {
    this.currentQuery = query;

    if (window.GlobalRecentSearches && query.length >= 3) {
      window.GlobalRecentSearches.saveRecentSearch(query);
    }

    const resultsContainer = document.querySelector('#globalSearchResults');
    if (!resultsContainer) return;

    if (!query || !query.trim()) {
      resultsContainer.innerHTML = `<div id="quickActionsContainer"></div>`;
      if (window.GlobalQuickActions) {
        window.GlobalQuickActions.renderQuickActions(resultsContainer.querySelector('#quickActionsContainer'));
      }
      return;
    }

    let results = window.GlobalSearchEngine ? window.GlobalSearchEngine.search(query, this.indexData) : [];
    
    if (this.currentCategory && this.currentCategory !== 'all') {
      results = window.GlobalSearchFilter ? window.GlobalSearchFilter.filterByCategory(results, this.currentCategory) : results;
    }

    this.renderSearchResults(results, resultsContainer);
  },

  filterResults(category) {
    this.currentCategory = category;
    this.search(this.currentQuery);
  },

  renderSearchResults(results, container) {
    if (!results.length) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-search fs-1 mb-2 d-block opacity-50"></i>
          <div>No search results found for "${this.currentQuery}".</div>
        </div>
      `;
      return;
    }

    const html = results.map(res => {
      const item = res.item;
      return `
        <a href="${item.url}" class="search-result-card">
          <div class="search-result-icon"><i class="bi ${item.icon}"></i></div>
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <div class="fw-bold">${res.highlightedTitle || item.title}</div>
              <span class="badge-ds badge-ds-primary">${item.type}</span>
            </div>
            <div class="body-sm text-secondary text-truncate">${res.highlightedDesc || item.description}</div>
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </a>
      `;
    }).join('');

    container.innerHTML = html;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('#globalSearchTrigger, .global-search-btn');
      const closeBtn = e.target.closest('#closeSearchModalBtn, #globalSearchBackdrop');
      const catPill = e.target.closest('.search-cat-pill');

      if (openBtn) {
        e.preventDefault();
        this.openSearch();
      } else if (closeBtn && !e.target.closest('#globalSearchCard')) {
        this.closeSearch();
      } else if (catPill) {
        document.querySelectorAll('.search-cat-pill').forEach(p => p.classList.remove('active'));
        catPill.classList.add('active');
        const cat = catPill.getAttribute('data-category');
        this.filterResults(cat);
      }
    });

    const input = document.querySelector('#globalSearchInput');
    if (input) {
      input.addEventListener('input', (e) => {
        this.search(e.target.value);
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GlobalSearchModal.initializeSearch();
});

if (typeof window !== 'undefined') {
  window.GlobalSearchModal = GlobalSearchModal;
  window.initializeSearch = () => GlobalSearchModal.initializeSearch();
  window.openSearch = () => GlobalSearchModal.openSearch();
  window.closeSearch = () => GlobalSearchModal.closeSearch();
}
