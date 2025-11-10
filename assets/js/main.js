const ready = () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const headerCta = document.querySelector('.header-cta');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const loadingScreen = document.getElementById('loading-screen');
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
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      loadingScreen.setAttribute('aria-busy', 'false');
    }, 1200);
  });
};

document.addEventListener('DOMContentLoaded', ready);
