/**
 * Component Loader JS - Dynamic Reusable Navbar Loader
 * GitHub Pages Compatible & Fully Autonomous
 */

(function () {
  function getPathPrefix() {
    // 1. Determine depth based on script tag src
    const scripts = document.querySelectorAll('script[src*="components.js"]');
    if (scripts.length > 0) {
      const src = scripts[scripts.length - 1].getAttribute('src') || '';
      if (src.startsWith('../')) {
        const match = src.match(/(\.\.\/)+/);
        return match ? match[0] : '../';
      }
      return '';
    }

    // 2. Fallback check based on pathname for subfolder pages inside /portfolio/
    const path = window.location.pathname.replace(/\\/g, '/');
    const subfolderPages = [
      'flutter.html', 'web.html', 'web-development.html',
      'graphic-design.html', 'video-editing.html',
      'digital-marketing.html', 'ai-projects.html', 'devops.html'
    ];
    const fileName = path.split('/').pop();
    if (subfolderPages.includes(fileName) && path.includes('/portfolio/' + fileName)) {
      return '../';
    }

    return '';
  }

  function adjustRelativePaths(container, prefix) {
    if (!prefix) return;

    // Adjust link hrefs
    const links = container.querySelectorAll('a[href]');
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('#') && !href.startsWith('javascript:')) {
        if (prefix === '../' && href.startsWith('portfolio/')) {
          // Inside portfolio/ subfolder linking to another portfolio page
          a.setAttribute('href', href.replace('portfolio/', ''));
        } else {
          a.setAttribute('href', prefix + href);
        }
      }
    });

    // Adjust img srcs
    const imgs = container.querySelectorAll('img[src]');
    imgs.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
        img.setAttribute('src', prefix + src);
      }
    });
  }

  function highlightActivePage(container) {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === '') currentPath = 'index.html';

    const navLinks = container.querySelectorAll('.nav-link, .mega-menu-item');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.split('/').pop();

      if (linkPath === currentPath) {
        link.classList.add('active');
        if (link.classList.contains('nav-link')) {
          link.setAttribute('aria-current', 'page');
        }
      } else {
        // Remove hardcoded active if not on that page
        link.classList.remove('active');
      }
    });
  }

  function initializeNavbarFeatures(container) {
    // 1. Re-sync Theme API Toggle Buttons
    if (!window.ThemeAPI) {
      const scriptPrefix = getPathPrefix();
      const themeScript = document.createElement('script');
      themeScript.src = scriptPrefix + 'assets/js/theme.js';
      themeScript.onload = function () {
        if (window.ThemeAPI && typeof window.ThemeAPI.bindUIEvents === 'function') {
          window.ThemeAPI.bindUIEvents();
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          window.ThemeAPI.updateThemeIcon(currentTheme);
        }
      };
      document.head.appendChild(themeScript);
    } else if (typeof window.ThemeAPI.bindUIEvents === 'function') {
      window.ThemeAPI.bindUIEvents();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      window.ThemeAPI.updateThemeIcon(currentTheme);
    }

    // 2. Initialize Bootstrap Tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el);
      });
    }

    // 3. Re-bind Mobile Hamburger Button
    const hamburgerBtn = container.querySelector('#mobileHamburgerBtn');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    if (hamburgerBtn && mobileOverlay) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = mobileOverlay.classList.contains('active');
        if (isActive) {
          mobileOverlay.classList.remove('active');
          hamburgerBtn.classList.remove('active');
          document.body.style.overflow = '';
        } else {
          mobileOverlay.classList.add('active');
          hamburgerBtn.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // 4. Re-bind Search Triggers
    const searchBtns = container.querySelectorAll('.search-trigger-btn');
    const searchModal = document.getElementById('searchOverlayModal');
    const searchInput = document.getElementById('searchOverlayInput');
    if (searchBtns.length > 0 && searchModal) {
      searchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          searchModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          if (searchInput) {
            setTimeout(() => searchInput.focus(), 150);
          }
        });
      });
    }

    // Dispatch Custom Event
    window.dispatchEvent(new CustomEvent('navbarLoaded', { detail: { container } }));
  }

  const NAVBAR_FALLBACK_HTML = `<nav class="navbar navbar-expand-lg fixed-top glass-nav">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <div class="logo-badge">AH</div>
      <span>AHOSAN <span class="gradient-text">HABIB</span> <span class="gradient-text">HASAN</span></span>
      <span class="brand-dot pulse"></span>
    </a>

    <!-- Controls & Toggler (Mobile Right) -->
    <div class="d-flex align-items-center gap-2 d-lg-none ms-auto me-2">
      <button class="nav-action-btn search-trigger-btn" aria-label="Search">
        <i class="fas fa-search"></i>
      </button>
      <button class="theme-toggle-btn" aria-label="Toggle Theme" aria-pressed="false" data-bs-toggle="tooltip"
        data-bs-placement="bottom" title="Switch Theme">
        <i class="fas fa-moon bi bi-moon-stars-fill"></i>
      </button>
    </div>

    <!-- Custom Hamburger Button for Mobile -->
    <button class="mobile-hamburger-btn d-lg-none" id="mobileHamburgerBtn" aria-label="Toggle Mobile Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Desktop Navigation Links & Mega Menu -->
    <div class="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
      <ul class="navbar-nav mx-auto align-items-center">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
        <li class="nav-item"><a class="nav-link" href="skills.html">Skills</a></li>
        <li class="nav-item"><a class="nav-link" href="experience.html">Experience</a></li>
        <li class="nav-item"><a class="nav-link" href="education.html">Education</a></li>
        <li class="nav-item"><a class="nav-link" href="projects.html">Projects</a></li>

        <!-- Portfolio Mega Dropdown -->
        <li class="nav-item dropdown mega-dropdown">
          <a class="nav-link dropdown-toggle" href="portfolio.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Portfolio
          </a>
          <div class="dropdown-menu mega-menu">
            <div class="row g-2">
              <div class="col-6">
                <a href="portfolio/flutter.html" class="mega-menu-item">
                  <div class="mega-icon-box text-info"><i class="fab fa-flutter"></i></div>
                  <div>
                    <span class="mega-title">Flutter Projects</span>
                    <p class="mega-desc">Cross-platform iOS & Android mobile apps</p>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a href="portfolio/web.html" class="mega-menu-item">
                  <div class="mega-icon-box text-primary"><i class="fas fa-code"></i></div>
                  <div>
                    <span class="mega-title">Web Development</span>
                    <p class="mega-desc">Full-stack responsive websites & apps</p>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a href="portfolio/graphic-design.html" class="mega-menu-item">
                  <div class="mega-icon-box text-warning"><i class="fas fa-palette"></i></div>
                  <div>
                    <span class="mega-title">Graphic Design</span>
                    <p class="mega-desc">Logos, UI visual design & brand identity</p>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a href="portfolio/video-editing.html" class="mega-menu-item">
                  <div class="mega-icon-box text-danger"><i class="fas fa-film"></i></div>
                  <div>
                    <span class="mega-title">Video Editing</span>
                    <p class="mega-desc">High-conversion promo & reel editing</p>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a href="portfolio/digital-marketing.html" class="mega-menu-item">
                  <div class="mega-icon-box text-success"><i class="fas fa-chart-line"></i></div>
                  <div>
                    <span class="mega-title">Digital Marketing</span>
                    <p class="mega-desc">SEO, social growth & content strategy</p>
                  </div>
                </a>
              </div>
              <div class="col-6">
                <a href="portfolio/ai-projects.html" class="mega-menu-item">
                  <div class="mega-icon-box text-accent"><i class="fas fa-robot"></i></div>
                  <div>
                    <span class="mega-title">AI Portfolio</span>
                    <p class="mega-desc">AI content, prompts & automation</p>
                  </div>
                </a>
              </div>
              <div class="col-12">
                <a href="portfolio/devops.html" class="mega-menu-item">
                  <div class="mega-icon-box text-secondary"><i class="fas fa-server"></i></div>
                  <div>
                    <span class="mega-title">DevOps Journey</span>
                    <p class="mega-desc">Linux, Docker, CI/CD pipelines & cloud infrastructure</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
        <li class="nav-item"><a class="nav-link" href="certificates.html">Certificates</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>

      <!-- Right Action Controls -->
      <div class="d-flex align-items-center gap-2">
        <button class="nav-action-btn search-trigger-btn" aria-label="Search" data-bs-toggle="tooltip"
          data-bs-placement="bottom" title="Search Portfolio">
          <i class="fas fa-search"></i>
        </button>

        <button class="theme-toggle-btn" aria-label="Toggle Theme" aria-pressed="false" data-bs-toggle="tooltip"
          data-bs-placement="bottom" title="Switch Theme">
          <i class="fas fa-moon bi bi-moon-stars-fill"></i>
        </button>

        <a href="assets/documents/Md-Ahosan_Habib_Hasan_CV.pdf" download="Md-Ahosan_Habib_Hasan_CV.pdf" class="btn-outline-glass btn-download-resume ripple-btn px-3 py-2 fs-7" id="downloadResumeBtn">
          <i class="fas fa-download me-1"></i> <span class="btn-text">Resume</span>
          <span class="spinner-border spinner-border-sm d-none ms-1" role="status"></span>
        </a>

        <a href="contact.html" class="btn-primary-glow ripple-btn px-3 py-2 fs-7">
          <i class="fas fa-paper-plane me-1"></i> Hire Me
        </a>
      </div>
    </div>
  </div>
</nav>`;

  function renderNavbarHTML(navbarContainer, html, prefix) {
    navbarContainer.innerHTML = html;
    adjustRelativePaths(navbarContainer, prefix);
    highlightActivePage(navbarContainer);
    initializeNavbarFeatures(navbarContainer);
  }

  function loadNavbar() {
    const navbarContainer = document.getElementById('navbar');
    if (!navbarContainer) return;

    const prefix = getPathPrefix();
    const componentUrl = prefix + 'components/navbar.html';

    fetch(componentUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Navbar component fetch failed (${response.status}) at ${componentUrl}`);
        }
        return response.text();
      })
      .then(html => {
        renderNavbarHTML(navbarContainer, html, prefix);
      })
      .catch(error => {
        console.warn("Navbar fetch failed (likely file:// protocol CORS restriction), applying embedded fallback component:", error);
        renderNavbarHTML(navbarContainer, NAVBAR_FALLBACK_HTML, prefix);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();
