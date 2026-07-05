/* ══════════════════════════════════════════════════════
   NO LIMITS NO EXCUSES — app.js
   Interactive behaviors: WebGL Energy Shader, Navbar, 
   Scroll Reveal, Stats Counter, Testimonials Carousel, 
   FAQ Accordion, Plans Toggle, Smooth Scroll
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. WebGL ENERGY SHADER (ANIMATION_3)
  ─────────────────────────────────────────── */
  const canvas = document.getElementById('shader-canvas-ANIMATION_3');
  if (canvas) {
    function syncSize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }
    }
    window.addEventListener('resize', syncSize, { passive: true });
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
      const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    
    // Create a dark, pulsing red energy field
    float pulse = 0.5 + 0.5 * sin(u_time * 0.5);
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    
    vec3 color1 = vec3(0.04, 0.005, 0.005); // Very dark charcoal/red
    vec3 color2 = vec3(0.5, 0.02, 0.02); // Intense red
    
    float gradient = uv.y * pulse;
    vec3 finalColor = mix(color1, color2, gradient * 0.28);
    
    // Add some smoke movement
    float move = sin(uv.x * 12.0 + u_time * 0.6) * 0.04;
    finalColor += color2 * (0.08 * sin(uv.y * 18.0 - u_time * 1.5 + move));
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;
      function cs(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }
      const prog = gl.createProgram();
      gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');

      function render(t) {
        syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
      }
      render(0);
    }
  }

  /* ──────────────────────────────────────────
     2. NAVBAR — scroll + hamburger
  ─────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navAnchors = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open.toString());
    });

    navAnchors.forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ──────────────────────────────────────────
     3. SMOOTH ANCHOR SCROLL
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
     4. SCROLL REVEAL
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
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     5. ANIMATED COUNTER
  ─────────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;

    const duration = 1500;
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
     6. PLANS BILLING TOGGLE
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
     6b. MOBILE PLAN TAB SWITCHER
  ─────────────────────────────────────────── */
  const planTabBtns = document.querySelectorAll('.plan-tab-btn');
  const planCards   = document.querySelectorAll('.plan-card');

  if (planTabBtns.length) {
    planTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update tab active states
        planTabBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show the targeted plan card, hide others
        const targetId = btn.dataset.target;
        planCards.forEach((card) => {
          card.classList.toggle('active-mobile-plan', card.id === targetId);
        });
      });
    });
  }

  /* ──────────────────────────────────────────
     7. TESTIMONIALS CAROUSEL
  ─────────────────────────────────────────── */
  const track    = document.getElementById('testi-track');
  const prevBtn  = document.getElementById('testi-prev');
  const nextBtn  = document.getElementById('testi-next');
  const dotsWrap = document.getElementById('carousel-dots');

  if (track) {
    const cards = track.querySelectorAll('.testi-card');
    let current = 0;

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

      const cardWidth   = cards[0].offsetWidth;
      const gap         = 24;
      const offset      = current * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      const dots = dotsWrap.querySelectorAll('.dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisibleCount() ? 0 : current + 1), 5000);

    const carouselEl = document.getElementById('testimonials-carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
      carouselEl.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goTo(current + 1 > cards.length - getVisibleCount() ? 0 : current + 1), 5000);
      });
    }

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', () => goTo(current));
  }

  /* ──────────────────────────────────────────
     8. FAQ ACCORDION
  ─────────────────────────────────────────── */
  const faqBtns = document.querySelectorAll('.faq-question');

  faqBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      faqBtns.forEach((b) => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', (!expanded).toString());
      answer.classList.toggle('open', !expanded);
    });
  });

  /* ──────────────────────────────────────────
     9. HERO PARALLAX
  ─────────────────────────────────────────── */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.22}px)`;
      }
    }, { passive: true });
  }

})();
