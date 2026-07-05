/* ══════════════════════════════════════════════════════
   IRONPULSE — app.js
   Interactive behaviors: Navbar, Scroll Reveal, Stats Counter,
   Testimonials Carousel, FAQ Accordion, Plans Toggle, Smooth Scroll
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. NAVBAR — scroll + hamburger
  ─────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navAnchors = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  // Scroll solid transition
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id], header[id]');
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentId = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open.toString());
    });

    // Close menu on link click (mobile)
    navAnchors.forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ──────────────────────────────────────────
     2. SMOOTH ANCHOR SCROLL
  ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 8 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     3. SCROLL REVEAL
  ─────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     4. ANIMATED COUNTER
  ─────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;

    const duration = 1800;
    const step     = 16;
    const steps    = duration / step;
    let current    = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('.counter[data-target]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  // About-section inline stat counters (data-target only, no counter class)
  const inlineCounters = document.querySelectorAll('.stat-num[data-target]');
  const inlineCounterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          inlineCounterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  inlineCounters.forEach((c) => inlineCounterObserver.observe(c));

  /* ──────────────────────────────────────────
     5. PLANS BILLING TOGGLE
  ─────────────────────────────────────────── */
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleYearly  = document.getElementById('toggle-yearly');
  const priceAmounts  = document.querySelectorAll('.price-amount');

  function setActiveBilling(billing) {
    const isYearly = billing === 'yearly';
    toggleMonthly.classList.toggle('active', !isYearly);
    toggleYearly.classList.toggle('active', isYearly);
    toggleMonthly.setAttribute('aria-pressed', (!isYearly).toString());
    toggleYearly.setAttribute('aria-pressed', isYearly.toString());

    priceAmounts.forEach((el) => {
      el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
    });
  }

  if (toggleMonthly && toggleYearly) {
    toggleMonthly.addEventListener('click', () => setActiveBilling('monthly'));
    toggleYearly.addEventListener('click', ()  => setActiveBilling('yearly'));
  }

  /* ──────────────────────────────────────────
     6. TESTIMONIALS CAROUSEL
  ─────────────────────────────────────────── */
  const track    = document.getElementById('testi-track');
  const prevBtn  = document.getElementById('testi-prev');
  const nextBtn  = document.getElementById('testi-next');
  const dotsWrap = document.getElementById('carousel-dots');

  if (track) {
    const cards = track.querySelectorAll('.testi-card');
    let current = 0;

    // Build dots
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function getVisibleCount() {
      const w = window.innerWidth;
      if (w <= 540) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function goTo(idx) {
      const total   = cards.length;
      const visible = getVisibleCount();
      const maxIdx  = total - visible;
      current = Math.max(0, Math.min(idx, maxIdx));

      // Calculate offset
      const cardWidth   = cards[0].offsetWidth;
      const gap         = 24; // 1.5rem gap
      const offset      = current * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots
      const dots = dotsWrap.querySelectorAll('.dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    let autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisibleCount() ? 0 : current + 1), 5000);

    const carouselEl = document.getElementById('testimonials-carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
      carouselEl.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisibleCount() ? 0 : current + 1), 5000);
      });
    }

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => goTo(current));
  }

  /* ──────────────────────────────────────────
     7. FAQ ACCORDION
  ─────────────────────────────────────────── */
  const faqBtns = document.querySelectorAll('.faq-question');

  faqBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      // Collapse all others
      faqBtns.forEach((b) => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', (!expanded).toString());
      answer.classList.toggle('open', !expanded);
    });
  });

  /* ──────────────────────────────────────────
     8. HERO PARALLAX (subtle)
  ─────────────────────────────────────────── */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────
     9. LAZY IMAGE LOADING FALLBACK
  ─────────────────────────────────────────── */
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
  } else {
    // Polyfill-lite: observe and set src
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach((img) => lazyObserver.observe(img));
  }

})();
