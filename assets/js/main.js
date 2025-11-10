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
  const form = document.querySelector('.contact-form');

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

  if (form) {
    const successMessage = form.querySelector('.form-success');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.reset();
      if (successMessage) {
        successMessage.textContent = 'Message sent! We will contact you soon.';
        setTimeout(() => {
          successMessage.textContent = '';
        }, 4000);
      }
    });
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
