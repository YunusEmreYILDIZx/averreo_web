document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const productData = productsData[productId];

  if (!productData) {
    container.innerHTML = '<div style="padding:150px 20px;text-align:center;"><h2>Ürün Bulunamadı / Product Not Found</h2><a href="index.html" style="color:white;">Ana Sayfaya Dön / Return to Home</a></div>';
    return;
  }

  // Determine current language from localStorage or default to 'tr'
  let currentLang = localStorage.getItem('averreo_lang') || 'tr';

  // Apply dynamic background color based on category
  const trCategory = productData.tr?.category?.toLowerCase() || '';
  // Her zaman menü barını ve arka planı saf siyah yap
  document.documentElement.style.setProperty('--bg-nav', 'rgba(0, 0, 0, 0.95)');
  document.documentElement.style.setProperty('--bg', '#000000');
  document.documentElement.style.setProperty('--bg-card', '#080808');

  // Remove existing light theme override if switching products/languages
  const existingOverride = document.getElementById('light-theme-overrides');
  if(existingOverride) existingOverride.remove();

  function renderProduct(lang) {
    const data = productData[lang];
    if (!data) return;

    document.title = `Averreo Industries — ${data.name}`;

    const html = `
      <section class="prod-hero">
        <div class="prod-hero-bg"><img src="${productData.image}" alt="${data.name}"></div>
        <div class="prod-hero-overlay"></div>
        <div class="prod-hero-content">
          <div class="breadcrumb">${data.breadcrumb}</div>
          <h1>${data.name}</h1>
          <h2>${data.category}</h2>
          <p>${data.description}</p>
        </div>
      </section>

      <section class="prod-section">
        <div class="prod-container">
          <div class="prod-grid-2">
            <!-- Features side -->
            <div class="prod-features">
              <h3 class="section-title">${lang === 'en' ? 'Technical Specifications' : 'Teknik Özellikler'}</h3>
              <div class="features-grid">
                ${data.features.map(f => `
                  <div class="feature-card">
                    <h4>${f.title}</h4>
                    <p>${f.value}</p>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- Video side -->
            <div class="prod-video">
              <h3 class="section-title">${lang === 'en' ? 'Product Video' : 'Ürün Videosu'}</h3>
              <div class="video-container">
                <img src="${productData.image}" alt="Video Poster" class="video-poster">
                <button class="play-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="prod-section" style="background: var(--gray-800);">
        <div class="prod-container">
          <h3 class="section-title" style="text-align:center; margin-bottom: 2rem;">${lang === 'en' ? 'Gallery' : 'Galeri'}</h3>
          <div class="gallery-grid">
            <img src="${productData.image}" alt="${data.name} 1" class="gallery-img">
            <!-- Placeholder for more images -->
            <div class="gallery-placeholder">
              <span>${lang === 'en' ? 'More images coming soon' : 'Yakında daha fazla görsel eklenecek'}</span>
            </div>
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
  }

  renderProduct(currentLang);

  // Re-render when language buttons are clicked
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Small delay to allow i18n.js to set localStorage
      setTimeout(() => {
        const newLang = localStorage.getItem('averreo_lang') || 'tr';
        renderProduct(newLang);
      }, 50);
    });
  });
});
