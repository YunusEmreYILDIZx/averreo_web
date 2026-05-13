// ===== AVERREO INDUSTRIES — Main JS (Anduril-style) =====
document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        const target = parseInt(e.target.dataset.target);
        const suffix = e.target.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          e.target.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // --- Company Mega Menu ---
  const companyBtn = document.querySelector('.nav-company-btn');
  const megaMenu = document.querySelector('.mega-menu');
  const plusIcon = companyBtn?.querySelector('.plus');
  
  companyBtn?.addEventListener('click', () => {
    megaMenu.classList.toggle('active');
    plusIcon.textContent = megaMenu.classList.contains('active') ? '—' : '+';
  });
  document.addEventListener('click', (e) => {
    if (megaMenu?.classList.contains('active') && !megaMenu.contains(e.target) && !companyBtn.contains(e.target)) {
      megaMenu.classList.remove('active');
      plusIcon.textContent = '+';
    }
  });

  // --- Mobile Hamburger ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navCenter = document.querySelector('.nav-center');
  hamburger?.addEventListener('click', () => navCenter.classList.toggle('open'));

  // --- Mobile Dropdown Toggle ---
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        const dropdown = btn.closest('.nav-dropdown');
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('active');
        });
        dropdown.classList.toggle('active');
      }
    });
  });

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  /*
  document.querySelectorAll('.product-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const src = tile.querySelector('img')?.src;
      if (lightboxImg && src) { lightboxImg.src = src; lightbox.classList.add('active'); }
    });
  });
  */
  lightboxClose?.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // --- Contact Form ---
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Gönderildi ✓';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Mesaj Gönder'; btn.style.background = ''; form.reset(); }, 2500);
  });

  // --- Hero parallax ---
  const heroImg = document.querySelector('.hero-media img');
  window.addEventListener('scroll', () => {
    if (heroImg && window.scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
    }
  });
});
