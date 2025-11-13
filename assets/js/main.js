const ready = () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const headerCta = document.querySelector('.header-cta');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const loadingScreen = document.getElementById('loading-screen');
  const progressCircle = document.querySelector('.loading-ring-progress');
  const progressLabel = document.getElementById('loading-percentage');
  const yearTarget = document.getElementById('year');

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const closeMobileMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  if (headerCta) {
    headerCta.addEventListener('click', (event) => {
      const target = document.querySelector(headerCta.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  const initClientsSlider = () => {
    const slider = document.querySelector('.clients-slider');
    if (!slider) return;

    const viewport = slider.querySelector('[data-clients-viewport]');
    const track = slider.querySelector('.clients-track');
    const cards = track ? Array.from(track.children) : [];
    const prevButton = slider.querySelector('[data-clients-prev]');
    const nextButton = slider.querySelector('[data-clients-next]');

    if (!viewport || !track || cards.length === 0 || !prevButton || !nextButton) {
      return;
    }

    let activeIndex = 0;
    let autoSlideId = null;
    let scrollTimeout;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const normaliseIndex = (index) => {
      const length = cards.length;
      return ((index % length) + length) % length;
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const goToIndex = (index, smooth = true) => {
      if (!cards.length) return;
      activeIndex = normaliseIndex(index);
      const card = cards[activeIndex];
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      let target = card.offsetLeft - (viewport.clientWidth / 2 - card.clientWidth / 2);
      target = clamp(target, 0, maxScroll);
      viewport.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' });
    };

    const updateActiveFromScroll = () => {
      const { scrollLeft, clientWidth } = viewport;
      const center = scrollLeft + clientWidth / 2;
      let closestIndex = activeIndex;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      activeIndex = closestIndex;
    };

    const stopAutoSlide = () => {
      if (autoSlideId) {
        window.clearInterval(autoSlideId);
        autoSlideId = null;
      }
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      if (prefersReducedMotion.matches) {
        return;
      }
      autoSlideId = window.setInterval(() => {
        goToIndex(activeIndex + 1);
      }, 4000);
    };

    prevButton.addEventListener('click', () => {
      stopAutoSlide();
      goToIndex(activeIndex - 1);
      startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
      stopAutoSlide();
      goToIndex(activeIndex + 1);
      startAutoSlide();
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    viewport.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(updateActiveFromScroll, 120);
    });

    window.addEventListener('resize', () => {
      goToIndex(activeIndex, false);
    });

    const handleMotionPreference = () => {
      if (prefersReducedMotion.matches) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    if (typeof prefersReducedMotion.addEventListener === 'function') {
      prefersReducedMotion.addEventListener('change', handleMotionPreference);
    } else if (typeof prefersReducedMotion.addListener === 'function') {
      prefersReducedMotion.addListener(handleMotionPreference);
    }

    goToIndex(0, false);
    startAutoSlide();
  };

  initClientsSlider();

  window.addEventListener('load', () => {
    if (!loadingScreen) return;

    if (!progressCircle || !progressLabel) {
      loadingScreen.classList.add('hidden');
      loadingScreen.setAttribute('aria-busy', 'false');
      return;
    }

    const radius = progressCircle.r.baseVal.value;
    if (!radius) {
      loadingScreen.classList.add('hidden');
      loadingScreen.setAttribute('aria-busy', 'false');
      return;
    }
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    progressLabel.textContent = '0%';

    const duration = 5000;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const offset = circumference * (1 - progress);
      progressCircle.style.strokeDashoffset = offset;
      progressLabel.textContent = `${Math.round(progress * 100)}%`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        progressCircle.style.strokeDashoffset = 0;
        progressLabel.textContent = '100%';
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          loadingScreen.setAttribute('aria-busy', 'false');
        }, 400);
      }
    };

    requestAnimationFrame(step);
  });
};

document.addEventListener('DOMContentLoaded', ready);
