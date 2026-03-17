const ready = () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const headerCta = document.querySelector('.header-cta');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const yearTarget = document.getElementById('year');
  const scrollTopButton = document.getElementById('scroll-top-button');

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
    revealElements.forEach((element) => {
      const delayAttr = element.getAttribute('data-reveal-delay');
      if (!delayAttr) return;

      let delayValue = Number.NaN;
      if (/ms$/i.test(delayAttr.trim())) {
        delayValue = Number.parseFloat(delayAttr);
      } else if (/s$/i.test(delayAttr.trim())) {
        delayValue = Number.parseFloat(delayAttr) * 1000;
      } else {
        delayValue = Number.parseFloat(delayAttr);
      }

      if (!Number.isNaN(delayValue)) {
        element.style.setProperty('--reveal-delay', `${delayValue}ms`);
      }
    });

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

  const initStatTicker = () => {
    const allStatNumbers = Array.from(document.querySelectorAll('.stat-number[data-stat-value]'));
    if (!allStatNumbers.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const buildTicker = (stat) => {
      if (stat.dataset.tickerReady === 'true') return;

      const value = stat.getAttribute('data-stat-value');
      if (!value) return;

      const suffix = stat.getAttribute('data-stat-suffix') || '';
      const prefix = stat.getAttribute('data-stat-prefix') || '';
      const durationAttr = stat.getAttribute('data-stat-duration');
      const duration = durationAttr ? Number.parseInt(durationAttr, 10) : 2000;

      if (!Number.isNaN(duration)) {
        stat.style.setProperty('--ticker-duration', `${duration}ms`);
      }

      const fragment = document.createDocumentFragment();

      if (prefix) {
        const prefixEl = document.createElement('span');
        prefixEl.className = 'ticker-prefix';
        prefixEl.textContent = prefix;
        fragment.appendChild(prefixEl);
      }

      Array.from(value).forEach((char, index) => {
        if (/\d/.test(char)) {
          const finalDigit = Number.parseInt(char, 10);
          const digitWrap = document.createElement('span');
          digitWrap.className = 'ticker-digit';
          digitWrap.style.setProperty('--digit-delay', `${index * 80}ms`);

          const track = document.createElement('span');
          track.className = 'ticker-digit-track';
          track.style.setProperty('--digit-final', String(finalDigit));
          track.style.setProperty('--digit-start', '0');

          for (let i = 0; i <= 9; i += 1) {
            const slot = document.createElement('span');
            slot.className = 'ticker-digit-slot';
            slot.textContent = i.toString();
            track.appendChild(slot);
          }

          digitWrap.appendChild(track);
          fragment.appendChild(digitWrap);
        } else {
          const symbol = document.createElement('span');
          symbol.className = 'ticker-symbol';
          symbol.textContent = char;
          fragment.appendChild(symbol);
        }
      });

      if (suffix) {
        const suffixEl = document.createElement('span');
        suffixEl.className = 'ticker-suffix';
        suffixEl.textContent = suffix;
        fragment.appendChild(suffixEl);
      }

      stat.textContent = '';
      stat.appendChild(fragment);
      stat.dataset.tickerReady = 'true';
    };

    allStatNumbers.forEach((stat) => {
      buildTicker(stat);
    });

    const activate = (stat) => {
      setTimeout(() => {
        stat.classList.add('is-active');
      }, 100);
    };

    const initGroupTicker = (groupStats) => {
      let hasStarted = false;

      const activateGroup = () => {
        if (hasStarted) return;
        hasStarted = true;
        groupStats.forEach((stat, index) => {
          window.setTimeout(() => activate(stat), index * 200);
        });
        window.removeEventListener('scroll', scrollFallback);
        window.removeEventListener('resize', scrollFallback);
      };

      if (prefersReducedMotion.matches) {
        groupStats.forEach((stat) => activate(stat));
        return;
      }

      const observerTarget = groupStats[0].closest('.hero-stats-grid, .stats-grid') || groupStats[0].parentElement;

      const scrollFallback = () => {
        if (hasStarted || !observerTarget) return;
        const rect = observerTarget.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= viewportHeight * 0.85 && rect.bottom >= 0) {
          activateGroup();
        }
      };

      if ('IntersectionObserver' in window && observerTarget) {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                activateGroup();
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
        );
        observer.observe(observerTarget);
      }

      window.addEventListener('scroll', scrollFallback, { passive: true });
      window.addEventListener('resize', scrollFallback);
      scrollFallback();
    };

    const heroStats = allStatNumbers.filter((s) => s.closest('.hero-stats-grid'));
    const otherStats = allStatNumbers.filter((s) => !s.closest('.hero-stats-grid'));

    if (heroStats.length) initGroupTicker(heroStats);
    if (otherStats.length) initGroupTicker(otherStats);
  };

  initStatTicker();

  const initServicesSlider = () => {
    const slider = document.querySelector('.services-slider');
    if (!slider) return;

    const viewport = slider.querySelector('[data-services-viewport]');
    const track = slider.querySelector('.services-track');
    const cards = track ? Array.from(track.children) : [];
    const prevButton = slider.querySelector('[data-services-prev]');
    const nextButton = slider.querySelector('[data-services-next]');

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
      }, 3500);
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

    let lastPageScroll = window.pageYOffset;
    let pageScrollTimeout;
    const handlePageScroll = () => {
      const currentScroll = window.pageYOffset;
      if (Math.abs(currentScroll - lastPageScroll) > 100) {
        if (pageScrollTimeout) {
          window.clearTimeout(pageScrollTimeout);
        }
        pageScrollTimeout = window.setTimeout(() => {
          goToIndex(activeIndex + 1);
          lastPageScroll = currentScroll;
        }, 150);
      }
    };
    window.addEventListener('scroll', handlePageScroll, { passive: true });

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

  initServicesSlider();

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
      }, 3000);
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

    let lastClientPageScroll = window.pageYOffset;
    let clientPageScrollTimeout;
    const handleClientPageScroll = () => {
      const currentScroll = window.pageYOffset;
      if (Math.abs(currentScroll - lastClientPageScroll) > 100) {
        if (clientPageScrollTimeout) {
          window.clearTimeout(clientPageScrollTimeout);
        }
        clientPageScrollTimeout = window.setTimeout(() => {
          goToIndex(activeIndex + 1);
          lastClientPageScroll = currentScroll;
        }, 150);
      }
    };
    window.addEventListener('scroll', handleClientPageScroll, { passive: true });

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

  const handleScrollTopButton = () => {
    if (!scrollTopButton) return;

    const servicesSection = document.getElementById('servicios');
    if (!servicesSection) return;

    const servicesTop = servicesSection.offsetTop;
    const currentScroll = window.scrollY;

    if (currentScroll > servicesTop) {
      scrollTopButton.classList.add('visible');
    } else {
      scrollTopButton.classList.remove('visible');
    }
  };

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', handleScrollTopButton, { passive: true });
    handleScrollTopButton();
  }
};

document.addEventListener('DOMContentLoaded', ready);
