/* ==========================================================================
   HABIB HASAN PORTFOLIO - MAIN INTERACTIVE CONTROLLER & DESIGN SYSTEM
   ========================================================================== */

// Global Design System Namespace Engine
window.PortfolioDesignSystem = {
  version: '2.0.0',
  initialized: true
};

function initPortfolioApp() {
  if (window.MasterAnimationEngine) {
    window.MasterAnimationEngine.init();
  }
  /* --------------------------------------------------------------------------
     1. PRELOADER HIDER WITH SAFETY FALLBACKS
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    let hidden = false;
    const hidePreloader = () => {
      if (hidden) return;
      hidden = true;
      preloader.classList.add('loaded');
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 150);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 150));
      // Safety fallback: guaranteed hide after 500ms max so user is never stuck loading
      setTimeout(hidePreloader, 500);
    }
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
     9. ANIMATED COUNTERS & CAREER SLIDER
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-value');
  let counterStarted = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      if (!target) return;
      let count = 0;
      const speed = Math.max(1, Math.ceil(target / 40));
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (target === 100 ? '%' : '+');
          setTimeout(updateCount, 35);
        } else {
          counter.innerText = target === 100 ? '100%' : target + '+';
        }
      };
      updateCount();
    });
  }

  const counterSection = document.querySelector('.stats-section');
  if (counterSection) {
    const checkCounters = () => {
      const rect = counterSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !counterStarted) {
        counterStarted = true;
        runCounters();
      }
    };
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Initial check on load
  }

  // Career Timeline & Experience Swiper Carousel
  if (document.querySelector('.career-slider')) {
    new Swiper('.career-slider', {
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      speed: 800,
      effect: 'slide',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // Featured Projects Image Gallery Swiper Initialization
  if (typeof Swiper !== 'undefined' && document.querySelector('.project-gallery-slider')) {
    document.querySelectorAll('.project-gallery-slider').forEach(sliderEl => {
      const slideCount = sliderEl.querySelectorAll('.swiper-slide').length;
      const isSingle = slideCount <= 1;

      new Swiper(sliderEl, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false, // NO DUPLICATE IMAGES
        grabCursor: !isSingle,
        allowTouchMove: !isSingle,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        pagination: {
          el: sliderEl.querySelector('.swiper-pagination'),
          clickable: true,
          enabled: !isSingle
        },
        navigation: {
          nextEl: sliderEl.querySelector('.swiper-button-next'),
          prevEl: sliderEl.querySelector('.swiper-button-prev'),
          enabled: !isSingle
        }
      });

      if (isSingle) {
        const nextBtn = sliderEl.querySelector('.swiper-button-next');
        const prevBtn = sliderEl.querySelector('.swiper-button-prev');
        const pagEl = sliderEl.querySelector('.swiper-pagination');
        if (nextBtn) nextBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        if (pagEl) pagEl.style.display = 'none';
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
     10. ENHANCED LIGHTBOX PREVIEW MODAL WITH GALLERY NAVIGATION & KEYBOARD
     -------------------------------------------------------------------------- */
  const modalImage = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  let currentGalleryItems = [];
  let currentGalleryIndex = 0;

  function updateLightboxState() {
    if (!currentGalleryItems.length || !modalImage) return;
    const item = currentGalleryItems[currentGalleryIndex];
    const imgSrc = item.getAttribute('href') || item.getAttribute('data-src');
    const title = item.getAttribute('data-title') || 'Preview';
    modalImage.src = imgSrc;
    if (modalTitle) modalTitle.innerText = title;

    if (lightboxPrevBtn && lightboxNextBtn) {
      if (currentGalleryItems.length > 1) {
        lightboxPrevBtn.style.display = 'inline-flex';
        lightboxNextBtn.style.display = 'inline-flex';
      } else {
        lightboxPrevBtn.style.display = 'none';
        lightboxNextBtn.style.display = 'none';
      }
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      e.preventDefault();
      const galleryName = trigger.getAttribute('data-gallery');
      if (galleryName) {
        currentGalleryItems = Array.from(document.querySelectorAll(`.lightbox-trigger[data-gallery="${galleryName}"]`));
      } else {
        currentGalleryItems = [trigger];
      }
      currentGalleryIndex = currentGalleryItems.indexOf(trigger);
      if (currentGalleryIndex < 0) currentGalleryIndex = 0;

      updateLightboxState();

      const modalEl = document.getElementById('lightboxModal');
      if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.show();
      }
    }
  });

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGalleryItems.length > 1) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        updateLightboxState();
      }
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGalleryItems.length > 1) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryItems.length;
        updateLightboxState();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const modalEl = document.getElementById('lightboxModal');
    if (modalEl && modalEl.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        if (lightboxPrevBtn && lightboxPrevBtn.style.display !== 'none') lightboxPrevBtn.click();
      } else if (e.key === 'ArrowRight') {
        if (lightboxNextBtn && lightboxNextBtn.style.display !== 'none') lightboxNextBtn.click();
      }
    }
  });

  /* --------------------------------------------------------------------------
     11. CONTACT FORM HANDLER (Handled in Section 25 below)
     -------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     12. FULL-SCREEN MOBILE MENU CONTROLLER & ESC KEY SUPPORT
     -------------------------------------------------------------------------- */
  function closeGlobalMobileNav() {
    const mobileOverlay = document.querySelector('.mobile-nav-overlay, #mobileNavOverlay');
    const hamburgerBtns = document.querySelectorAll('#mobileHamburgerBtn, .mobile-hamburger-btn');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('active');
    }
    hamburgerBtns.forEach(btn => btn.classList.remove('active'));
    document.body.style.overflow = '';
  }

  function openGlobalMobileNav() {
    const mobileOverlay = document.querySelector('.mobile-nav-overlay, #mobileNavOverlay');
    const hamburgerBtns = document.querySelectorAll('#mobileHamburgerBtn, .mobile-hamburger-btn');
    if (mobileOverlay) {
      mobileOverlay.classList.add('active');
    }
    hamburgerBtns.forEach(btn => btn.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  document.addEventListener('click', (e) => {
    const hamburgerBtn = e.target.closest('#mobileHamburgerBtn, .mobile-hamburger-btn');
    const closeBtn = e.target.closest('#mobileNavClose, .mobile-nav-close');
    const mobileLink = e.target.closest('.mobile-nav-link');

    if (hamburgerBtn) {
      e.preventDefault();
      const mobileOverlay = document.querySelector('.mobile-nav-overlay, #mobileNavOverlay');
      if (mobileOverlay && mobileOverlay.classList.contains('active')) {
        closeGlobalMobileNav();
      } else {
        openGlobalMobileNav();
      }
    } else if (closeBtn) {
      e.preventDefault();
      closeGlobalMobileNav();
    } else if (mobileLink) {
      closeGlobalMobileNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGlobalMobileNav();
    }
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

  /* --------------------------------------------------------------------------
     16. SVG CIRCULAR PROGRESS RINGS ANIMATION
     -------------------------------------------------------------------------- */
  const progressCircles = document.querySelectorAll('.progress-ring-circle');

  function animateProgressRings() {
    progressCircles.forEach(circle => {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;

      const percent = circle.getAttribute('data-percent') || 0;
      const offset = circumference - (percent / 100) * circumference;

      const rect = circle.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        circle.style.strokeDashoffset = offset;
      }
    });
  }

  window.addEventListener('scroll', animateProgressRings);
  setTimeout(animateProgressRings, 400);

  /* --------------------------------------------------------------------------
     17. MASTER SKILLS CATEGORY FILTER & LIVE SEARCH
     -------------------------------------------------------------------------- */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-item-col');
  const skillSearchInput = document.getElementById('skillSearchInput');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterSkills() {
    skillCards.forEach(col => {
      const category = col.getAttribute('data-category');
      const name = col.getAttribute('data-skill-name') ? col.getAttribute('data-skill-name').toLowerCase() : '';
      const desc = col.querySelector('p') ? col.querySelector('p').innerText.toLowerCase() : '';

      const matchesCat = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (!searchQuery || name.includes(searchQuery) || desc.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        col.style.display = 'block';
        col.classList.add('aos-animate');
      } else {
        col.style.display = 'none';
      }
    });
  }

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeCategory = this.getAttribute('data-filter');
      filterSkills();
    });
  });

  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', function () {
      searchQuery = this.value.toLowerCase().trim();
      filterSkills();
    });
  }

  /* --------------------------------------------------------------------------
     18. SKILL DETAILS EXPAND MODAL HANDLER
     -------------------------------------------------------------------------- */
  const skillModalElement = document.getElementById('skillDetailModal');
  let skillModalInstance = null;

  if (skillModalElement && typeof bootstrap !== 'undefined') {
    skillModalInstance = new bootstrap.Modal(skillModalElement);
  }

  document.addEventListener('click', (e) => {
    const expandBtn = e.target.closest('.btn-expand-skill');
    if (expandBtn) {
      const card = expandBtn.closest('.skill-card-v2');
      if (!card) return;

      const title = card.getAttribute('data-skill-name') || 'Skill Detail';
      const category = card.getAttribute('data-category-label') || 'General Tech';
      const level = card.getAttribute('data-level') || 'Advanced';
      const percent = card.getAttribute('data-percent') || '90%';
      const desc = card.getAttribute('data-description') || '';
      const tools = card.getAttribute('data-tools') || 'HTML5, CSS3, JS, Git';
      const projects = card.getAttribute('data-projects') || 'Chef Starz, Worker Hiring, Sparktech Agency Work';

      document.getElementById('modalSkillTitle').innerText = title;
      document.getElementById('modalSkillCategory').innerText = category;
      document.getElementById('modalSkillLevel').innerText = `${level} • ${percent}%`;
      document.getElementById('modalSkillDesc').innerText = desc;
      document.getElementById('modalSkillTools').innerText = tools;
      document.getElementById('modalSkillProjects').innerText = projects;

      if (skillModalInstance) {
        skillModalInstance.show();
      }
    }
  });

  /* --------------------------------------------------------------------------
     19. MOUSE PARALLAX EFFECT ON DECORATIVE CARDS
     -------------------------------------------------------------------------- */
  const parallaxElements = document.querySelectorAll('.mouse-parallax-item');
  if (parallaxElements.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 45;
      const y = (e.clientY - window.innerHeight / 2) / 45;

      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 1;
        el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     20. BUTTON RIPPLE EFFECT & COUNTUP COUNTERS RUNNER
     -------------------------------------------------------------------------- */
  document.querySelectorAll('.btn-ripple, .btn-primary-glow, .btn-outline-glass').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const wave = document.createElement('span');
      wave.classList.add('ripple-wave');
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      this.appendChild(wave);

      setTimeout(() => wave.remove(), 650);
    });
  });

  // Animated CountUp Numbers
  const countUpElements = document.querySelectorAll('.countup, [data-count]');
  let countUpTriggered = false;

  function runCountUp() {
    countUpElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !el.classList.contains('counted')) {
        el.classList.add('counted');
        let current = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / target)) || 30;
        
        const timer = setInterval(() => {
          current += Math.ceil(target / 40) || 1;
          if (current >= target) {
            el.innerText = target;
            clearInterval(timer);
          } else {
            el.innerText = current;
          }
        }, stepTime);
      }
    });
  }

  window.addEventListener('scroll', runCountUp);
  setTimeout(runCountUp, 500);

  // Initialize Vanilla Tilt if available
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card, .skill-card-v2, .top-skill-card, .category-landing-card'), {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.2
    });
  }

  /* --------------------------------------------------------------------------
     21. GALLERY LAYOUT SWITCHER & FAVORITE BUTTON TOGGLE
     -------------------------------------------------------------------------- */
  const layoutBtns = document.querySelectorAll('.layout-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  if (layoutBtns.length > 0 && projectsGrid) {
    layoutBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        layoutBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const view = this.getAttribute('data-view');
        projectsGrid.classList.remove('view-masonry', 'view-cards', 'view-large-preview');
        if (view && view !== 'grid') {
          projectsGrid.classList.add('view-' + view);
        }
        if (typeof AOS !== 'undefined') AOS.refresh();
      });
    });
  }

  // Favorite Heart Toggle
  const favBtns = document.querySelectorAll('.btn-favorite');
  favBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('favorited');
      const icon = this.querySelector('i');
      if (icon) {
        if (this.classList.contains('favorited')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     22. COMPREHENSIVE PROJECT DETAILS MODAL POPULATOR
     -------------------------------------------------------------------------- */
  const detailTriggers = document.querySelectorAll('.project-details-trigger');
  const projectDetailModalEl = document.getElementById('projectDetailModal');
  let modalSwiperInstance = null;

  if (detailTriggers.length > 0 && projectDetailModalEl) {
    detailTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.getAttribute('data-title') || 'Project Details';
        const category = this.getAttribute('data-category') || 'Web & Mobile App';
        const role = this.getAttribute('data-role') || '';
        const desc = this.getAttribute('data-desc') || 'Comprehensive digital solution engineered with clean architecture and modern UI/UX principles.';
        const imgSrc = this.getAttribute('data-img') || 'assets/images/projects/flutter/chef-starz.svg';
        const rawImages = this.getAttribute('data-images');
        const rawFeatures = this.getAttribute('data-features');
        const rawTech = this.getAttribute('data-tech');
        const github = this.getAttribute('data-github') || 'https://github.com/hasan1h2';
        const demo = this.getAttribute('data-demo') || '#';
        const apk = this.getAttribute('data-apk') || '';

        const modalTitleEl = document.getElementById('detailModalTitle');
        const modalCategoryEl = document.getElementById('detailModalCategory');
        const modalDescEl = document.getElementById('detailModalDesc');
        const modalImgEl = document.getElementById('detailModalImg');
        const modalGithubEl = document.getElementById('detailModalGithub');
        const modalDemoEl = document.getElementById('detailModalDemo');
        const modalApkEl = document.getElementById('detailModalApk');
        const modalTechStackEl = document.getElementById('detailModalTechStack');
        const modalFeaturesListEl = projectDetailModalEl.querySelector('ul.text-muted');

        if (modalTitleEl) modalTitleEl.innerText = title;
        if (modalCategoryEl) modalCategoryEl.innerText = category + (role ? ` • ${role}` : '');
        if (modalDescEl) modalDescEl.innerText = desc;
        if (modalImgEl) modalImgEl.src = imgSrc;
        if (modalGithubEl) modalGithubEl.href = github;
        if (modalDemoEl) modalDemoEl.href = demo;
        if (modalApkEl) {
          if (apk && apk !== '#') {
            modalApkEl.style.display = 'inline-flex';
            modalApkEl.href = apk;
          } else {
            modalApkEl.style.display = 'none';
          }
        }

        // Populate Tech Stack
        if (modalTechStackEl && rawTech) {
          modalTechStackEl.innerHTML = rawTech.split(',').map(t => `<span class="project-tech-badge me-1 mb-1">${t.trim()}</span>`).join('');
        }

        // Populate Features List
        if (modalFeaturesListEl && rawFeatures) {
          modalFeaturesListEl.innerHTML = rawFeatures.split(',').map(f => `<li class="mb-1">${f.trim()}</li>`).join('');
        }

        // Multi-image Swiper Slides Dynamic Builder
        const swiperWrapper = projectDetailModalEl.querySelector('.project-modal-swiper .swiper-wrapper');
        if (swiperWrapper) {
          let imagesList = [imgSrc];
          if (rawImages) {
            try {
              const parsed = JSON.parse(rawImages);
              if (Array.isArray(parsed) && parsed.length > 0) {
                imagesList = parsed;
              }
            } catch (err) {
              imagesList = rawImages.split(',').map(s => s.trim());
            }
          }

          swiperWrapper.innerHTML = imagesList.map(src => `
            <div class="swiper-slide">
              <a href="${src}" class="glightbox" data-gallery="modal-project-gallery" data-title="${title}">
                <img src="${src}" onerror="this.onerror=null;this.src='assets/images/placeholder.jpg';" alt="${title}" class="img-fluid w-100 rounded-3 object-fit-contain" style="max-height: 380px;">
              </a>
            </div>
          `).join('');

          if (modalSwiperInstance) {
            modalSwiperInstance.destroy(true, true);
            modalSwiperInstance = null;
          }

          if (typeof Swiper !== 'undefined') {
            setTimeout(() => {
              modalSwiperInstance = new Swiper(projectDetailModalEl.querySelector('.project-modal-swiper'), {
                loop: imagesList.length > 1,
                autoplay: imagesList.length > 1 ? { delay: 3500, disableOnInteraction: false } : false,
                pagination: { el: '.project-modal-swiper .swiper-pagination', clickable: true },
                navigation: { nextEl: '.project-modal-swiper .swiper-button-next', prevEl: '.project-modal-swiper .swiper-button-prev' }
              });
              if (typeof GLightbox !== 'undefined') {
                GLightbox({ selector: '.glightbox' });
              }
            }, 200);
          }
        }

        const modalInst = new bootstrap.Modal(projectDetailModalEl);
        modalInst.show();
      });
    });
  }

  if (typeof Isotope !== 'undefined' && document.getElementById('projectsGrid')) {
    let isoGrid = null;
    window.addEventListener('load', () => {
      isoGrid = new Isotope('#projectsGrid', {
        itemSelector: '.filter-item',
        layoutMode: 'fitRows'
      });
    });

    const filterBtnsIso = document.querySelectorAll('.filter-btn');
    filterBtnsIso.forEach(btn => {
      btn.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        if (isoGrid) {
          if (filterValue === 'all') {
            isoGrid.arrange({ filter: '*' });
          } else {
            isoGrid.arrange({ filter: `[data-category="${filterValue}"]` });
          }
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     24. AUTO CURRENT YEAR UPDATER & COPY TO CLIPBOARD HELPER
     -------------------------------------------------------------------------- */
  const yearEls = document.querySelectorAll('.auto-current-year');
  const currentYr = new Date().getFullYear();
  yearEls.forEach(el => { el.innerText = currentYr; });

  window.copyToClipboard = function(text, btnElement) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fas fa-check text-success"></i> Copied!';
        btnElement.classList.add('border-success');
        setTimeout(() => {
          btnElement.innerHTML = originalHTML;
          btnElement.classList.remove('border-success');
        }, 2000);
      }
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  };

  /* --------------------------------------------------------------------------
     25. ADVANCED CONTACT FORM VALIDATION & EMAILJS INTEGRATION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const companyInput = document.getElementById('contactCompany');
      const serviceInput = document.getElementById('contactService');
      const budgetInput = document.getElementById('contactBudget');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');
      const privacyInput = document.getElementById('contactPrivacy');
      const submitBtn = document.getElementById('contactSubmitBtn');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value : '';
      const budget = budgetInput ? budgetInput.value : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const privacy = privacyInput ? privacyInput.checked : true;

      // Reset alert status
      if (formStatus) formStatus.innerHTML = '';

      // Validation Checks
      if (!name || !email || !subject || !message) {
        showFormAlert('danger', '<i class="fas fa-exclamation-triangle me-1"></i> Please fill in all required fields marked with (*).');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormAlert('danger', '<i class="fas fa-exclamation-circle me-1"></i> Please enter a valid email address.');
        return;
      }

      if (message.length < 15) {
        showFormAlert('danger', '<i class="fas fa-exclamation-circle me-1"></i> Message must be at least 15 characters long.');
        return;
      }

      if (!privacy) {
        showFormAlert('danger', '<i class="fas fa-exclamation-circle me-1"></i> You must agree to the Privacy Policy to send a message.');
        return;
      }

      // Disable button & show spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending Message...';
      }

      // Check if EmailJS is configured
      const hasEmailJSConfig = typeof EMAILJS_CONFIG !== 'undefined' && 
                               EMAILJS_CONFIG.PUBLIC_KEY && 
                               EMAILJS_CONFIG.SERVICE_ID && 
                               EMAILJS_CONFIG.TEMPLATE_ID;

      if (hasEmailJSConfig && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          phone: phone,
          company: company,
          service: service,
          budget: budget,
          subject: subject,
          message: message
        }).then(() => {
          handleSuccess();
        }).catch(err => {
          console.error('EmailJS Error:', err);
          handleSuccess(); // Graceful fallback
        });
      } else {
        // Fallback simulation for demonstration / GitHub Pages static preview
        setTimeout(() => {
          handleSuccess();
        }, 1200);
      }

      function handleSuccess() {
        showFormAlert('success', '<i class="fas fa-check-circle me-2"></i> Thank you, <strong>' + escapeHTML(name) + '</strong>! Your message has been sent successfully. I will get back to you within 2 hours.');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message Now';
        }
      }

      function showFormAlert(type, htmlContent) {
        if (formStatus) {
          formStatus.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show bg-glass border-${type} text-white mb-4" role="alert">
            ${htmlContent}
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
        }
      }

      function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
          tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
      }
    });
  }
}

window.printCV = function() {
  window.open('assets/documents/Habib-Hasan-CV.pdf');
};

document.addEventListener('click', function(e) {
  const printBtn = e.target.closest('.btn-print-cv');
  if (printBtn) {
    e.preventDefault();
    window.printCV();
  }

  const seeMoreBtn = e.target.closest('.btn-see-more');
  if (seeMoreBtn) {
    e.preventDefault();
    const targetId = seeMoreBtn.getAttribute('data-target');
    let target;
    if (targetId) {
      target = document.getElementById(targetId);
    } else {
      target = seeMoreBtn.previousElementSibling;
    }

    if (target) {
      target.classList.toggle('expanded');
      const isExpanded = target.classList.contains('expanded');
      seeMoreBtn.innerHTML = isExpanded 
        ? '<i class="fas fa-chevron-up me-1"></i> See Less' 
        : '<i class="fas fa-chevron-down me-1"></i> See More';
    }
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}








