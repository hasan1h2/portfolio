/* ==========================================================================
   HABIB HASAN PORTFOLIO - MAIN INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. PRELOADER
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 500);
    });
  }

  /* --------------------------------------------------------------------------
     2. ANIMATED CURSOR & MOUSE GLOW
     -------------------------------------------------------------------------- */
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  const mouseGlow = document.querySelector('.mouse-glow-bg');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (mouseGlow) {
        mouseGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover interactive elements grow effect
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .btn-primary-glow, .btn-outline-glass, input, textarea');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* --------------------------------------------------------------------------
     3. SCROLL PROGRESS BAR & STICKY NAVBAR
     -------------------------------------------------------------------------- */
  const progressBar = document.querySelector('.scroll-progress-bar');
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('glass-nav');
      } else {
        navbar.classList.remove('glass-nav');
      }
    }

    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     4. DARK / LIGHT THEME TOGGLE
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', storedTheme);

  if (themeToggleBtn) {
    updateThemeIcon(storedTheme);
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fas fa-moon';
      } else {
        icon.className = 'fas fa-sun';
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. TYPED.JS TEXT & GSAP ENTRANCE INITIALIZATION
     -------------------------------------------------------------------------- */
  if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        'Flutter App Developer',
        'Full Stack Web Developer',
        'Graphic Designer',
        'Digital Marketer',
        'SEO Specialist',
        'AI Content Creator',
        'DevOps Learner'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }

  // GSAP Smooth Page-Load Sequence
  if (typeof gsap !== 'undefined') {
    if (document.querySelectorAll('.gsap-hero-item').length > 0) {
      gsap.from('.gsap-hero-item', {
        opacity: 0,
        y: 35,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3
      });
    }
    if (document.querySelector('.gsap-hero-right')) {
      gsap.from('.gsap-hero-right', {
        opacity: 0,
        scale: 0.88,
        duration: 1.2,
        ease: 'back.out(1.5)',
        delay: 0.6
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. BUTTON RIPPLE EFFECT & TOOLTIPS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.classList.add('ripple-span');
      const diameter = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
      const existing = this.querySelector('.ripple-span');
      if (existing) existing.remove();
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // Bootstrap Tooltip Initialization
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  /* --------------------------------------------------------------------------
     7. AOS (ANIMATE ON SCROLL) INITIALIZATION
     -------------------------------------------------------------------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /* --------------------------------------------------------------------------
     8. VANILLA TILT INITIALIZATION
     -------------------------------------------------------------------------- */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.25,
      scale: 1.02
    });
  }

  /* --------------------------------------------------------------------------
     9. ANIMATED COUNTERS
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-value');
  let counterStarted = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 40;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target === 100 ? '100%' : target + '+';
        }
      };
      updateCount();
    });
  }

  const counterSection = document.querySelector('.stats-section');
  if (counterSection) {
    window.addEventListener('scroll', () => {
      const rect = counterSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight && !counterStarted) {
        counterStarted = true;
        runCounters();
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. DYNAMIC FILTERING & SEARCH ENGINE (PROJECTS & PORTFOLIO)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const itemsToFilter = document.querySelectorAll('.filter-item');
  const searchInput = document.getElementById('portfolioSearch');

  if (filterBtns.length > 0 && itemsToFilter.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-filter');
        filterAndSearch(category, searchInput ? searchInput.value.toLowerCase() : '');
      });
    });
  }

  if (searchInput && itemsToFilter.length > 0) {
    searchInput.addEventListener('keyup', function () {
      const activeBtn = document.querySelector('.filter-btn.active');
      const activeCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      filterAndSearch(activeCategory, this.value.toLowerCase());
    });
  }

  function filterAndSearch(category, query) {
    itemsToFilter.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const itemTitle = item.querySelector('.card-title, .project-title') ? item.querySelector('.card-title, .project-title').innerText.toLowerCase() : '';
      const itemDesc = item.querySelector('.card-text, .project-desc') ? item.querySelector('.card-text, .project-desc').innerText.toLowerCase() : '';

      const matchesCategory = (category === 'all' || itemCategory === category);
      const matchesSearch = (itemTitle.includes(query) || itemDesc.includes(query));

      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
        item.classList.add('aos-animate');
      } else {
        item.style.display = 'none';
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. LIGHTBOX PREVIEW MODAL
     -------------------------------------------------------------------------- */
  const modalImage = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxTriggers.length > 0 && modalImage) {
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const imgSrc = this.getAttribute('href') || this.getAttribute('data-src');
        const title = this.getAttribute('data-title') || 'Preview';
        modalImage.src = imgSrc;
        if (modalTitle) modalTitle.innerText = title;
        const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
        modal.show();
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. CONTACT FORM HANDLER
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formStatus) {
        formStatus.innerHTML = `<div class="alert alert-success bg-glass border-glow text-accent"><i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully. Habib Hasan will respond shortly.</div>`;
      }
      contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     12. FULL-SCREEN MOBILE MENU CONTROLLER & ESC KEY SUPPORT
     -------------------------------------------------------------------------- */
  const mobileHamburgerBtn = document.getElementById('mobileHamburgerBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.add('active');
      if (mobileHamburgerBtn) mobileHamburgerBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('active');
      if (mobileHamburgerBtn) mobileHamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileHamburgerBtn) {
    mobileHamburgerBtn.addEventListener('click', () => {
      if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* --------------------------------------------------------------------------
     13. GLOBAL SEARCH OVERLAY & KEYBOARD SHORTCUTS
     -------------------------------------------------------------------------- */
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const searchOverlayModal = document.getElementById('searchOverlayModal');
  const searchOverlayClose = document.getElementById('searchOverlayClose');
  const searchOverlayInput = document.getElementById('searchOverlayInput');
  const searchResultsList = document.getElementById('searchResultsList');

  function openSearchOverlay() {
    if (searchOverlayModal) {
      searchOverlayModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (searchOverlayInput) {
        setTimeout(() => searchOverlayInput.focus(), 150);
      }
    }
  }

  function closeSearchOverlay() {
    if (searchOverlayModal) {
      searchOverlayModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearchOverlay));
  if (searchOverlayClose) searchOverlayClose.addEventListener('click', closeSearchOverlay);

  // ESC Key Support for closing overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeSearchOverlay();
    }
  });

  // Live Search Filter inside Overlay
  if (searchOverlayInput && searchResultsList) {
    const defaultSearchItems = [
      { title: 'Flutter App Development', cat: 'Services / Skills', link: 'portfolio/flutter.html', icon: 'fab fa-flutter text-info' },
      { title: 'Chef Starz Gourmet App', cat: 'Featured Project', link: 'portfolio/flutter.html', icon: 'fas fa-utensils text-warning' },
      { title: 'Worker Hiring Mobile App', cat: 'Featured Project', link: 'portfolio/flutter.html', icon: 'fas fa-user-gear text-primary' },
      { title: 'Full Stack Web Development', cat: 'Skills', link: 'skills.html', icon: 'fas fa-code text-primary' },
      { title: 'DevOps & Docker Journey', cat: 'Learning Roadmap', link: 'portfolio/devops.html', icon: 'fab fa-docker text-info' },
      { title: 'Graphic & Brand Design', cat: 'Services', link: 'portfolio/graphic-design.html', icon: 'fas fa-palette text-warning' },
      { title: 'Sparktech Agency Experience', cat: 'Career', link: 'experience.html', icon: 'fas fa-briefcase text-accent' },
      { title: 'Download Official Resume', cat: 'Document', link: '#', icon: 'fas fa-download text-success' }
    ];

    function renderSearchResults(query = '') {
      const filtered = defaultSearchItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.cat.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        searchResultsList.innerHTML = `<div class="p-4 text-center text-muted">No results found for "${query}"</div>`;
        return;
      }

      searchResultsList.innerHTML = filtered.map(item => `
        <a href="${item.link}" class="search-result-item">
          <div class="mega-icon-box"><i class="${item.icon}"></i></div>
          <div>
            <h6 class="text-white fw-bold mb-0">${item.title}</h6>
            <span class="text-muted tiny">${item.cat}</span>
          </div>
          <i class="fas fa-chevron-right ms-auto text-muted"></i>
        </a>
      `).join('');
    }

    renderSearchResults();

    searchOverlayInput.addEventListener('input', function() {
      renderSearchResults(this.value);
    });
  }

  /* --------------------------------------------------------------------------
     14. DOWNLOAD RESUME LOADING SPINNER ANIMATION
     -------------------------------------------------------------------------- */
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const textSpan = this.querySelector('.btn-text');
      const spinner = this.querySelector('.spinner-border');
      if (spinner && textSpan) {
        spinner.classList.remove('d-none');
        textSpan.innerText = 'Preparing Resume...';
        setTimeout(() => {
          spinner.classList.add('d-none');
          textSpan.innerText = 'Download Resume';
          alert('Habib Hasan Resume Download Initiated!');
        }, 1200);
      }
    });
  }

  /* --------------------------------------------------------------------------
     15. SCROLL SPY ACTIVE NAV HIGHLIGHT
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `${current}.html`) {
          link.classList.add('active');
        }
      });
    });
  }
});

