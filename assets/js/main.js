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
     5. TYPED.JS TEXT INITIALIZATION
     -------------------------------------------------------------------------- */
  if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: [
        'Flutter App Developer',
        'Full Stack Web Developer',
        'Graphic Designer',
        'SEO Specialist',
        'Video Editor',
        'AI Content Creator',
        'DevOps Learner'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
    });
  }

  /* --------------------------------------------------------------------------
     6. AOS (ANIMATE ON SCROLL) INITIALIZATION
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
     7. VANILLA TILT INITIALIZATION
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
     8. ANIMATED COUNTERS
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-value');
  let counterStarted = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + '+';
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
});
