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

        <a href="contact.html" class="btn-primary-glow ripple-btn px-3 py-1 fs-7 text-nowrap">
          <i class="fas fa-paper-plane me-1"></i> Hire Me
        </a>
      </div>
    </div>
  </div>
</nav>`;

  function initializeSearchModal(container) {
    const searchModal = container.querySelector('#searchOverlayModal') || document.getElementById('searchOverlayModal');
    const closeBtn = container.querySelector('#searchOverlayClose') || document.getElementById('searchOverlayClose');

    if (closeBtn && searchModal) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function initializeBackToTop(container) {
    const backBtn = container.querySelector('.back-to-top, #backToTopBtn') || document.querySelector('.back-to-top, #backToTopBtn');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backBtn.classList.add('active');
      } else {
        backBtn.classList.remove('active');
      }
    });

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const FOOTER_FALLBACK_HTML = `<footer>
  <div class="container">
    <div class="row g-4 mb-5">
      <div class="col-lg-4">
        <a class="navbar-brand mb-3 d-inline-block" href="index.html">
          AHOSAN HABIB HASAN<span class="brand-dot pulse ml-2"></span>
        </a>
        <p class="text-muted small">
          Ahosan Habib Hasan • Flutter App Developer, Full Stack Web Developer, Graphic Designer, Digital Marketer, Video
          Editor, AI Content Creator &amp; DevOps Learner.
        </p>
      </div>
      <div class="col-6 col-lg-2">
        <h6 class="text-white fw-bold mb-3">Quick Links</h6>
        <ul class="p-0 m-0">
          <li class="mb-2"><a href="about.html" class="text-muted small hover-primary">About Me</a></li>
          <li class="mb-2"><a href="skills.html" class="text-muted small hover-primary">Skills</a></li>
          <li class="mb-2"><a href="experience.html" class="text-muted small hover-primary">Experience</a></li>
          <li class="mb-2"><a href="education.html" class="text-muted small hover-primary">Education</a></li>
          <li class="mb-2"><a href="certificates.html" class="text-muted small hover-primary">Certificates</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2">
        <h6 class="text-white fw-bold mb-3">Portfolio</h6>
        <ul class="p-0 m-0">
          <li class="mb-2"><a href="portfolio/flutter.html" class="text-muted small hover-primary">Flutter Apps</a></li>
          <li class="mb-2"><a href="portfolio/web.html" class="text-muted small hover-primary">Web Projects</a></li>
          <li class="mb-2"><a href="portfolio/graphic-design.html" class="text-muted small hover-primary">Graphic Design</a></li>
          <li class="mb-2"><a href="portfolio/video-editing.html" class="text-muted small hover-primary">Video Editing</a></li>
          <li class="mb-2"><a href="portfolio/devops.html" class="text-muted small hover-primary">DevOps</a></li>
        </ul>
      </div>
      <div class="col-lg-4">
        <h6 class="text-white fw-bold mb-3">Stay Connected</h6>
        <p class="text-muted small">Reach out directly via email or social platforms.</p>
        <div class="d-flex gap-2">
          <a href="https://github.com/hasan1h2" target="_blank" class="btn-outline-glass p-2 rounded-circle d-inline-flex align-items-center justify-content-center" style="width:40px;height:40px;" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://linkedin.com" target="_blank" class="btn-outline-glass p-2 rounded-circle d-inline-flex align-items-center justify-content-center" style="width:40px;height:40px;" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="mailto:mdhasanhabibh@gmail.com" class="btn-outline-glass p-2 rounded-circle d-inline-flex align-items-center justify-content-center" style="width:40px;height:40px;" aria-label="Email"><i class="fas fa-envelope"></i></a>
          <a href="https://wa.me/8801742757448" target="_blank" class="btn-outline-glass p-2 rounded-circle text-success d-inline-flex align-items-center justify-content-center" style="width:40px;height:40px;" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
    <hr class="border-secondary opacity-25 mb-4">
    <div class="d-flex flex-column flex-md-row align-items-center justify-content-between text-muted small gap-2">
      <p class="mb-0">&copy; 2026 Ahosan Habib Hasan. All Rights Reserved.</p>
      <div class="d-flex gap-3">
        <a href="privacy-policy.html" class="text-muted hover-primary">Privacy Policy</a>
        <a href="terms.html" class="text-muted hover-primary">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>`;

  const SEARCH_FALLBACK_HTML = `<div class="search-overlay-modal" id="searchOverlayModal" role="dialog" aria-modal="true" aria-label="Search Portfolio">
  <button class="search-overlay-close" id="searchOverlayClose" aria-label="Close Search">
    <i class="fas fa-times"></i>
  </button>
  <div class="search-overlay-container">
    <div class="text-center mb-5">
      <span class="section-subtitle">SEARCH</span>
      <h3 class="text-white fw-bold">Find Anything in <span class="gradient-text">My Portfolio</span></h3>
    </div>
    <div class="search-input-group mb-4">
      <i class="fas fa-search"></i>
      <input type="text" id="searchOverlayInput" class="form-control form-control-lg rounded-pill" placeholder="Search projects, skills, services..." autocomplete="off" aria-label="Search input">
    </div>
    <div class="d-flex flex-wrap gap-2 mb-4">
      <span class="project-tech-badge">Flutter Apps</span>
      <span class="project-tech-badge">Web Projects</span>
      <span class="project-tech-badge">Graphic Design</span>
      <span class="project-tech-badge">DevOps</span>
      <span class="project-tech-badge">AI Projects</span>
      <span class="project-tech-badge">Resume</span>
    </div>
    <div class="search-results-list" id="searchResultsList"></div>
  </div>
</div>`;

  const BACK_TO_TOP_FALLBACK_HTML = `<div class="back-to-top" id="backToTopBtn" aria-label="Back To Top">
  <i class="fas fa-chevron-up"></i>
</div>`;

  const PRELOADER_FALLBACK_HTML = `<div class="preloader-spinner"></div>
<div class="preloader-logo">HABIB HASAN</div>`;

  const CV_ACTIONS_FALLBACK_HTML = `<div class="d-flex flex-wrap align-items-center gap-3 mb-4 gsap-hero-item">
  <a href="assets/documents/Md-Ahosan_Habib_Hasan_CV.pdf" download="Md-Ahosan_Habib_Hasan_CV.pdf" class="btn-primary-glow ripple-btn">
    <i class="fas fa-download me-1"></i> Download CV
  </a>
  <a href="assets/documents/Md-Ahosan_Habib_Hasan_CV.pdf" target="_blank" class="btn-outline-glass ripple-btn">
    <i class="fas fa-eye me-1"></i> View CV
  </a>
  <button class="btn-outline-glass ripple-btn btn-print-cv" onclick="window.open('assets/documents/Md-Ahosan_Habib_Hasan_CV.pdf')">
    <i class="fas fa-print me-1"></i> Print CV
  </button>
  <a href="contact.html" class="btn-primary-glow ripple-btn">
    <i class="fas fa-paper-plane me-1"></i> Hire Me
  </a>
  <a href="contact.html" class="btn-outline-glass ripple-btn">
    <i class="fas fa-envelope me-1"></i> Contact Me
  </a>
</div>`;

  const CONTACT_FORM_FALLBACK_HTML = `<form id="contactForm" novalidate>
  <div class="row g-3">
    <div class="col-md-6">
      <label for="contactName" class="form-label text-muted small fw-semibold">Your Name *</label>
      <input type="text" id="contactName" class="form-control-glass" placeholder="John Doe" required>
    </div>
    <div class="col-md-6">
      <label for="contactEmail" class="form-label text-muted small fw-semibold">Your Email *</label>
      <input type="email" id="contactEmail" class="form-control-glass" placeholder="john@example.com" required>
    </div>
    <div class="col-md-6">
      <label for="contactPhone" class="form-label text-muted small fw-semibold">Phone Number (Optional)</label>
      <input type="tel" id="contactPhone" class="form-control-glass" placeholder="+1 (555) 000-0000">
    </div>
    <div class="col-md-6">
      <label for="contactCompany" class="form-label text-muted small fw-semibold">Company / Org (Optional)</label>
      <input type="text" id="contactCompany" class="form-control-glass" placeholder="Agency or Business Name">
    </div>
    <div class="col-md-6">
      <label for="contactService" class="form-label text-muted small fw-semibold">Required Service</label>
      <select id="contactService" class="form-select-glass">
        <option value="Flutter Mobile App Development">Flutter Mobile App Development</option>
        <option value="Full Stack Website Development">Full Stack Website Development</option>
        <option value="UI/UX Interface Design">UI/UX Interface Design</option>
        <option value="Graphic Design & Branding">Graphic Design &amp; Branding</option>
        <option value="Video Editing & Motion Graphics">Video Editing &amp; Motion Graphics</option>
        <option value="SEO & Growth Marketing">SEO &amp; Growth Marketing</option>
        <option value="AI Content & Workflows">AI Content &amp; Workflows</option>
        <option value="DevOps & Infrastructure">DevOps &amp; Infrastructure</option>
        <option value="Website Maintenance & Fixes">Website Maintenance &amp; Fixes</option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="contactBudget" class="form-label text-muted small fw-semibold">Estimated Budget (Optional)</label>
      <select id="contactBudget" class="form-select-glass">
        <option value="Under $500">&lt; $500 (Small Project)</option>
        <option value="$500 - $1,500" selected>$500 - $1,500 (Standard)</option>
        <option value="$1,500 - $5,000">$1,500 - $5,000 (Full Scope)</option>
        <option value="$5,000+">$5,000+ (Enterprise / Retainer)</option>
      </select>
    </div>
    <div class="col-12">
      <label for="contactSubject" class="form-label text-muted small fw-semibold">Subject *</label>
      <input type="text" id="contactSubject" class="form-control-glass" placeholder="Flutter App Project / Full Stack Website Consultation" required>
    </div>
    <div class="col-12">
      <label for="contactMessage" class="form-label text-muted small fw-semibold">Project Details / Message *</label>
      <textarea id="contactMessage" class="form-control-glass" rows="5" placeholder="Describe your project goals, scope, requirements, or inquiry here..." required></textarea>
    </div>
    <div class="col-12">
      <div class="form-check text-start">
        <input class="form-check-input" type="checkbox" id="contactPrivacy" checked required>
        <label class="form-check-label text-muted tiny" for="contactPrivacy">
          I agree to the storing and processing of my data in accordance with the <a href="privacy-policy.html" class="text-primary">Privacy Policy</a>.
        </label>
      </div>
    </div>
    <div class="col-12 mt-4">
      <button type="submit" id="contactSubmitBtn" class="btn-primary-glow px-5 py-3 w-100 justify-content-center text-decoration-none">
        <i class="fas fa-paper-plane me-2"></i> Send Message Now
      </button>
    </div>
  </div>
</form>`;

  const PORTFOLIO_FILTER_FALLBACK_HTML = `<div class="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up">
  <button class="btn-outline-glass filter-btn active px-4 py-2" data-filter="all"><i class="fas fa-layer-group me-1"></i> All Projects</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="flutter"><i class="fab fa-flutter text-info me-1"></i> Flutter</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="web"><i class="fas fa-code text-primary me-1"></i> Web</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="graphic"><i class="fas fa-palette text-warning me-1"></i> Graphic Design</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="ai"><i class="fas fa-robot text-accent me-1"></i> AI</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="video"><i class="fas fa-film text-danger me-1"></i> Video Editing</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="marketing"><i class="fas fa-chart-line text-success me-1"></i> Digital Marketing</button>
  <button class="btn-outline-glass filter-btn px-4 py-2" data-filter="devops"><i class="fas fa-server text-secondary me-1"></i> DevOps</button>
</div>`;

  function loadComponent(selector, componentPath, fallbackHtml, initCallback) {
    const container = document.querySelector(selector);
    if (!container) return;

    const prefix = getPathPrefix();
    const fullPath = prefix + componentPath;

    if (window.location.protocol === 'file:' && fallbackHtml) {
      container.innerHTML = fallbackHtml;
      adjustRelativePaths(container, prefix);
      if (initCallback) initCallback(container, prefix);
      return;
    }

    fetch(fullPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${fullPath}`);
        }
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        adjustRelativePaths(container, prefix);
        if (initCallback) initCallback(container, prefix);
      })
      .catch(error => {
        if (fallbackHtml) {
          container.innerHTML = fallbackHtml;
          adjustRelativePaths(container, prefix);
          if (initCallback) initCallback(container, prefix);
        }
      });
  }

  function loadAllComponents() {
    const prefix = getPathPrefix();

    // 1. Load Navbar
    loadComponent('#navbar', 'components/navbar.html', NAVBAR_FALLBACK_HTML, (container) => {
      highlightActivePage(container);
      initializeNavbarFeatures(container);
    });

    // 2. Load Footer
    loadComponent('#footer', 'components/footer.html', FOOTER_FALLBACK_HTML, (container) => {
      adjustRelativePaths(container, prefix);
    });

    // 3. Load Search Modal
    loadComponent('#search-modal', 'components/search.html', SEARCH_FALLBACK_HTML, (container) => {
      initializeSearchModal(container);
    });

    // 4. Load Back To Top
    loadComponent('#back-to-top', 'components/back-to-top.html', BACK_TO_TOP_FALLBACK_HTML, (container) => {
      initializeBackToTop(container);
    });

    // 5. Load Preloader
    const preloaderEl = document.querySelector('#preloader');
    if (preloaderEl && !preloaderEl.children.length) {
      loadComponent('#preloader', 'components/preloader.html', PRELOADER_FALLBACK_HTML, (container) => {
        adjustRelativePaths(container, prefix);
      });
    }

    // 6. Load CV Actions
    const cvActionsEl = document.querySelector('#cv-actions');
    if (cvActionsEl && !cvActionsEl.children.length) {
      loadComponent('#cv-actions', 'components/cv-actions.html', CV_ACTIONS_FALLBACK_HTML, (container) => {
        adjustRelativePaths(container, prefix);
      });
    }

    // 7. Load Contact Form
    const contactFormEl = document.querySelector('#contact-form');
    if (contactFormEl && !contactFormEl.children.length) {
      loadComponent('#contact-form', 'components/contact-form.html', CONTACT_FORM_FALLBACK_HTML, (container) => {
        adjustRelativePaths(container, prefix);
      });
    }

    // 8. Load Portfolio Filter
    const portfolioFilterEl = document.querySelector('#portfolio-filter');
    if (portfolioFilterEl && !portfolioFilterEl.children.length) {
      loadComponent('#portfolio-filter', 'components/portfolio-filter.html', PORTFOLIO_FILTER_FALLBACK_HTML, (container) => {
        adjustRelativePaths(container, prefix);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
  } else {
    loadAllComponents();
  }
})();
