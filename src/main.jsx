import { translations } from './data/translations.js';
import { catalog } from './data/catalog.js';

// --- STATE ---
let currentLang = localStorage.getItem('monodoor_lang') || 'ua';

const doorConfig = {
  width: 800,
  height: 2100,
  thickness: 40,
  material: 'primer',
  customColor: '',
  frameType: 'aluminium',
  frameColor: 'black',
  customFrameColor: '',
  filling: 'honeycomb',
  lock: 'PZ',
  series: 'Leoni 40',
  openDir: 'left',
  handle: 'bar',
  name: '',
  phone: '',
  configStep: 1,
  barsAnimated: false,
  isMobile: window.innerWidth <= 768
};

// Restore persisted config
try {
  const _saved = JSON.parse(sessionStorage.getItem('monodoor_config') || '{}');
  Object.assign(doorConfig, _saved);
} catch (e) { }

window.addEventListener('resize', () => {
  const wasMobile = doorConfig.isMobile;
  doorConfig.isMobile = window.innerWidth <= 768;
  if (wasMobile !== doorConfig.isMobile && window.location.hash.startsWith('#configurator')) {
    window.app.render(true);
  }
});

// --- DATA MAPS FOR SVG ---
const COLOR_MAP = {
  primer: "#E2DDD6",
  oak_veneer: "#C8A568",
  walnut: "#7A5C3A",
  dsp: "#D0CAC0",
  mirror: "#C0CDD4",
  glass: "#C8DAE8",
  custom: doorConfig.customColor || "#AAAAAA",
  other: "#AAAAAA"
};

const FRAME_MAP = {
  black: "#1A1A1A",
  gold: "#C9A84C",
  bronze: "#8B6035",
  silver: "#A8B4BC",
  white: "#F2EFE9",
  custom: doorConfig.customFrameColor || "#333333"
};

// --- UTILS ---
const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value) value = value[k];
  }
  return value || key;
};

const saveLang = (lang) => {
  currentLang = lang;
  localStorage.setItem('monodoor_lang', lang);
};

const applyI18nAttributes = (container = document) => {
  container.querySelectorAll('[data-ua]').forEach(el => {
    const text = currentLang === 'ua' ? el.dataset.ua : el.dataset.en;
    if (text) el.textContent = text;
  });
};

// --- ANIMATION SYSTEM ---
const initRevealSystem = () => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));
};

const countUp = (el, target, duration = 1200) => {
  let start = null;
  const suffix = el.dataset.suffix || '';
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4); // easeOutExpo
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const runIntro = () => {
  if (sessionStorage.getItem('monodoor_intro_seen')) return;

  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay pulse';
  overlay.innerHTML = `
    <div class="intro-panel intro-panel-left"></div>
    <div class="intro-panel intro-panel-right"></div>
  `;
  document.body.appendChild(overlay);

  const app = document.getElementById('app');
  app.classList.add('site-reveal');

  setTimeout(() => {
    overlay.remove();
    app.classList.remove('site-reveal');
    sessionStorage.setItem('monodoor_intro_seen', '1');
  }, 2200);
};

// --- SVG DRAWING ENGINE ---
const drawDoor = () => {
  const mount = document.getElementById('config-svg-mount');
  if (!mount) return;

  // Pixel scaling
  // Width: 600->130px · 700->152px · 800->174px · 900->196px
  const { isMobile } = doorConfig;
  const widthMap = { 600: 80, 700: 100, 800: 120, 900: 140 };
  const w = isMobile ? (widthMap[doorConfig.width] || 120) : (widthMap[doorConfig.width] || 174);

  // Height scaling
  const hBase = isMobile ? 180 : 280;
  const hMax = isMobile ? 260 : 400;
  const h = hBase + ((doorConfig.height - 2000) * (hMax - hBase) / (3000 - 2000));

  // The SVG viewBox is strictly 0 0 400 520, so center relative to 400x520
  const x = (400 - w) / 2;
  const y = (520 - h) / 2;

  const fillColor = COLOR_MAP[doorConfig.material] || "#AAA";
  const strokeColor = FRAME_MAP[doorConfig.frameColor] || "#333";
  const opacity = (doorConfig.material === 'mirror') ? 0.82 : (doorConfig.material === 'glass' ? 0.58 : 1);

  mount.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 400 520">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="8" dy="8" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <!-- Door Shadow -->
      <rect x="${x + 8}" y="${y + 8}" width="${w}" height="${h}" fill="black" opacity="0.3" rx="1" />
      
      <!-- Door Body -->
      <rect x="${x}" y="${y}" width="${w}" height="${h}" 
            fill="${fillColor}" 
            fill-opacity="${opacity}"
            stroke="${strokeColor}" 
            stroke-width="${doorConfig.isMobile ? 1.5 : 2.5}" 
            rx="1"
            filter="url(#shadow)"
            style="transition: fill 0.3s ease, stroke 0.3s ease, width 0.4s ease, height 0.4s ease, x 0.4s ease, y 0.4s ease;" 
      />
      
      <!-- Gap Line -->
      <line x1="${x + 6}" y1="${y + 2}" x2="${x + 6}" y2="${y + h - 2}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />

      <!-- Handle -->
      ${doorConfig.lock === 'PZ'
      ? `<rect x="${x + w - 18}" y="${y + h / 2 - 29}" width="5" height="58" rx="3" fill="#EFEFEF" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" />`
      : `
          <circle cx="${x + w - 10}" cy="${y + h / 2}" r="11" fill="#EFEFEF" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" />
          <rect x="${x + w - 13}" y="${y + h / 2 + 14}" width="6" height="10" rx="1" fill="#EFEFEF" />
        `
    }

      <text x="${x + w - 10}" y="${y + 20}" font-size="10" fill="rgba(255,255,255,0.4)" text-anchor="end" font-family="Inter">${doorConfig.height > 2100 ? 'FILOMURO 45/50' : 'LEONI 40'}</text>
    </svg>
    <div class="dimension-label" style="margin-top:10px; color:#F2EFE9; font-size:12px; opacity:0.8;">
      ${doorConfig.width} &times; ${doorConfig.height} мм
    </div>
  `;
};

const updateSummary = () => {
  const el = document.getElementById('config-summary-live');
  if (!el) return;
  el.innerHTML = `
    <span>${doorConfig.height > 2100 ? 'FiloMuro' : 'Leoni'}</span> &middot; 
    <span>${doorConfig.width}&times;${doorConfig.height}мм</span> &middot; 
    <span>${doorConfig.material}</span> &middot; 
    <span>${doorConfig.frameColor}</span> &middot; 
    <span>${doorConfig.lock}</span>
  `;
};

// --- COMPONENTS ---

const Modal = () => {
  const doorId = window.app.selectedDoorId;
  if (!doorId) return '';
  const door = catalog.find(d => d.id === parseInt(doorId));
  if (!door) return '';
  
  const isEn = currentLang === 'en';
  
  return `
    <div class="modal-overlay" onclick="if(event.target===this) window.app.closeModal()">
      <div class="modal-container">
        <button class="modal-close-btn" onclick="window.app.closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div class="grid-modal-layout" style="display:grid; grid-template-columns: 1fr 1.2fr; gap:48px;">
          <div style="background:transparent; border-radius:16px; overflow:hidden; aspect-ratio:3/4;">
            <img src="${door.image}" alt="${door.name}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div style="display:flex; flex-direction:column; justify-content:center; text-align:left;">
            <span class="eyebrow" style="color:var(--accent); font-size:14px; margin-bottom:12px;">${door.series}</span>
            <h2 style="font-size:48px; font-weight:700; color:#FFF; line-height:1.1; margin-bottom:24px;">${door.name}</h2>
            <p style="color:rgba(255,255,255,0.7); font-size:18px; line-height:1.6; margin-bottom:40px;">
              ${isEn ? (door.desc_en || 'Premium architectural door system with hidden frame.') : (door.desc || 'Преміальна система прихованих дверей з алюмінієвим коробом.')}
            </p>
            
            <div style="display:grid; gap:16px; margin-bottom:48px;">
              ${Object.entries(door.specs || {}).map(([k, v]) => `
                <div style="display:flex; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08);">
                  <span style="color:#666; font-size:14px;">${t('catalog.specs.' + k)}</span>
                  <span style="color:#FFF; font-weight:500;">${v}</span>
                </div>
              `).join('')}
            </div>
            
            <a href="#configurator" class="btn btn-primary" onclick="window.app.closeModal(); doorConfig.series='${door.series}'; window.app.render();" style="height:60px; justify-content:center; font-size:16px;">
              ${t('hero.btn_config')}
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
};

const Header = () => {
  const hash = window.location.hash || '#home';
  const isActive = (h) => (hash.startsWith(h) ? 'active' : '');

  return `
    <div class="nav-inner" style="display:flex; align-items:center; justify-content:space-between; width:100%; height:100%; padding: 0 20px;">
      <a href="#" class="nav-logo" style="display:flex; align-items:center; margin:0; padding:0;">
        <img src="/assets/images/logo.png" alt="Monodoor" style="margin:0; display:block;">
      </a>
      <nav class="nav-links">
        <a href="#catalog" class="${isActive('#catalog')}">${t('nav.catalog')}</a>
        <a href="#configurator" class="${isActive('#configurator')}">${t('nav.configurator')}</a>
        <a href="#about" class="${isActive('#about')}">${t('nav.about')}</a>
        <a href="#contacts" class="${isActive('#contacts')}">${t('nav.contacts')}</a>
      </nav>
      <div class="nav-right" style="display:flex; align-items:center; gap:16px; margin:0; padding:0;">
        <button class="lang-toggle" onclick="window.app.toggleLang()" style="display:flex !important; align-items:center; justify-content:center; margin:0; font-family:inherit;">${currentLang.toUpperCase()}</button>
        <button class="btn btn-primary hide-on-mobile" onclick="window.location.hash='#contacts'">${t('nav.apply')}</button>
        <a href="https://instagram.com/monodoor_uzh" target="_blank" class="mobile-only" style="color:#FFF; display:flex; align-items:center; margin:0; padding:0; line-height:0;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </div>


  <div class="mobile-menu-overlay" id="mobile-overlay">
    <span class="menu-close" onclick="window.app.toggleMenu(false)">&times;</span>
    <ul class="mobile-nav-list">
      <li><a href="#catalog" onclick="window.app.toggleMenu(false)">${t('nav.catalog')}</a></li>
      <li><a href="#configurator" onclick="window.app.toggleMenu(false)">${t('nav.configurator')}</a></li>
      <li><a href="#about" onclick="window.app.toggleMenu(false)">${t('nav.about')}</a></li>
      <li><a href="#contacts" onclick="window.app.toggleMenu(false)">${t('nav.contacts')}</a></li>
    </ul>
    <div class="mobile-menu-footer">
      <div class="mobile-menu-lang">
        <button class="${currentLang === 'ua' ? 'active' : ''}" onclick="window.app.setLangMobile('ua')">UA</button>
        <button class="${currentLang === 'en' ? 'active' : ''}" onclick="window.app.setLangMobile('en')">EN</button>
      </div>
      <span class="mobile-menu-brand">Monodoor · Ужгород</span>
    </div>
  </div>
`;
};

const MobileNav = () => {
  const hash = window.location.hash || '#home';
  const sections = ['#catalog', '#configurator', '#home', '#about', '#contacts'];
  const activeIdx = sections.indexOf(hash);

  return `
    <div class="sticky-bar-mobile fixed bottom-0 left-0 w-full z-[100] bg-zinc-950 border-t border-zinc-900 pb-[env(safe-area-inset-bottom)]">
      <div class="nav-indicator-slider" style="transform: translateX(${activeIdx >= 0 ? activeIdx * 100 : 0}%); background: #FFFFFF;"></div>
      <a href="#catalog" class="sticky-item ${hash === '#catalog' ? 'active' : ''}" onclick="window.app.onNavClick('#catalog')">
        <span class="iconify" data-icon="lucide:shopping-cart"></span>
        <span>${t('nav.catalog')}</span>
      </a>
      <a href="#configurator" class="sticky-item ${hash === '#configurator' ? 'active' : ''}" onclick="window.app.onNavClick('#configurator')">
        <span class="iconify" data-icon="lucide:settings"></span>
        <span>${t('nav.configurator')}</span>
      </a>
      <a href="#home" class="sticky-item ${hash === '#home' ? 'active' : ''}" onclick="window.app.onNavClick('#home')">
        <span class="iconify" data-icon="lucide:home"></span>
        <span>${t('nav.home')}</span>
      </a>
      <a href="#about" class="sticky-item ${hash === '#about' ? 'active' : ''}" onclick="window.app.onNavClick('#about')">
        <span class="iconify" data-icon="lucide:info"></span>
        <span>${t('nav.about')}</span>
      </a>
      <a href="#contacts" class="sticky-item ${hash === '#contacts' ? 'active' : ''}" onclick="window.app.onNavClick('#contacts')">
        <span class="iconify" data-icon="lucide:phone"></span>
        <span>${t('nav.contacts')}</span>
      </a>
    </div>
  `;
};


const CatalogCard = (door) => `
  <div class="catalog-card" data-series="${door?.series}">
    <div class="card-image-wrap" style="aspect-ratio: 1/1; background: #000; overflow: hidden;">
      <img src="${door?.image || ''}" alt="${door?.name || ''}" style="width:100%; height:100%; object-fit:cover;">
      <span class="series-badge">${door?.series || ''}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${door?.name || ''}</h3>
      <p class="card-desc">${currentLang === 'ua' ? (door?.desc || '') : (door?.desc_en || '')}</p>
      <div class="spec-tags">
        <span class="spec-tag">Aluminum</span>
        <span class="spec-tag">${door?.specs?.mat || ''}</span>
      </div>

      <!-- Swipe Cue for Mobile -->
      <div class="swipe-cue">
        <span>&larr; ${currentLang === 'ua' ? 'Гортай' : 'Swipe'} &rarr;</span>
      </div>

      <div class="button-group" style="margin-top:16px; gap:12px;">
        <button class="btn btn-secondary" onclick="window.app.openModal(${door?.id})">${t('catalog.more')}</button>
        <a href="#configurator" class="btn btn-primary" onclick="doorConfig.series='${door.series}'; window.app.render();" style="flex:1; justify-content:center;">${t('hero.btn_config')}</a>
      </div>
    </div>
  </div>
`;


const HomePage = () => {
  const isEn = currentLang === 'en';

  return `
  <div class="relative">
    <!-- Global Fixed Background Layer -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="about-sticky-bg sticky top-0 w-full h-[100dvh] bg-cover bg-center bg-no-repeat"></div>
    </div>

    <!-- Content Layer -->
    <div class="relative z-10">
      <section id="hero" class="hero-new-layout" style="position:relative; background:transparent; overflow:hidden; min-height: 100vh; min-height: 100dvh; display: flex; align-items: center;">
        <!-- Restored Hero Photo for Desktop -->
        <div class="hero-image-container desktop-only" style="position:absolute; top:0; right:0; width:55%; height:100%; z-index:1;">
          <img src="/assets/images/hero_door_right.png" alt="Luxury Door" style="width:100%; height:100%; object-fit:cover; mask-image: linear-gradient(to right, transparent, black 20%); -webkit-mask-image: linear-gradient(to right, transparent, black 20%);">
        </div>

        <div class="container hero-grid-wrap" style="position:relative; z-index:10; width: 100%;">
          <div class="hero-text-column" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; padding-left: 5vw; margin-left: 0; max-width: 800px;">
            <span class="eyebrow reveal" data-reveal style="font-size: 14px; letter-spacing: 0.3em; margin-bottom: 24px; color: #989490; font-weight: 500;">${t('hero.eyebrow')}</span>
            <h1 class="hero-h1-new reveal" data-reveal="delay-1" style="font-size: 64px !important; font-weight: 700; color: #FFFFFF; line-height: 1.1; margin: 0 0 24px 0; text-align: left; white-space: nowrap;">${t('hero.h1')}</h1>
            <p class="hero-p-new reveal" data-reveal="delay-2" style="font-size: 24px !important; font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.4; margin: 0 0 48px 0; text-align: left; max-width: 540px;">${t('hero.sub')}</p>
            <div class="hero-btns-new reveal" data-reveal="delay-3" style="display: flex; gap: 20px; align-items: flex-start;">
              <a href="#catalog" class="btn btn-primary" style="height: 56px; padding: 0 32px; display: flex; align-items: center; font-weight: 600; text-transform: none;">${t('hero.btn_catalog')}</a>
              <a href="#configurator" class="btn btn-secondary" style="height: 56px; padding: 0 32px; display: flex; align-items: center; font-weight: 600; text-transform: none;">${t('hero.btn_config')}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="background:transparent;">
        <div class="container grid-2-col">
          <div data-reveal>
            <h2 class="section-title" style="font-size:40px; margin-bottom:40px;">${t('concept.title')}</h2>
            <div style="display:grid; gap:20px;">
              ${[1, 2, 3].map(i => `
                <div style="padding-left:24px; border-left:2px solid #FFF; opacity:0.8;">
                  ${t('concept.item' + i)}
                </div>
              `).join('')}
            </div>
          </div>
          <div data-reveal="delay-1">
            <img src="/assets/images/gallery_1.png" style="width:100%; border-radius:6px; height:500px; object-fit:cover;">
          </div>
        </div>
      </section>

      <div class="stats-strip" style="background:transparent; border-color:rgba(255,255,255,0.1);">
        <div class="container stats-grid">
          ${[
            {t: 'years', v: '7', s: '+'},
            {t: 'projects', v: '200', s: '+'},
            {t: 'hidden', v: '100', s: '%'},
            {t: 'guarantee', v: '5', s: ''}
          ].map((item, i) => `
            <div class="stat-item" data-reveal="delay-${i}">
              <span class="stat-val counter" data-target="${item.v}" data-suffix="${item.s}">0</span>
              <span class="stat-label">${t('stats.' + item.t)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <section class="section" style="background:transparent;">
        <div class="container">
          <div class="section-header-wrap">
            <h2 class="section-title reveal" data-reveal>${t('catalog.title')}</h2>
          </div>
          <div class="catalog-master-wrapper" style="position:relative; width:100%; overflow: visible; padding: 0;">
            <div class="catalog-grid catalog-grid-responsive" onscroll="window.app.updateCatalogArrows(this)">
              ${catalog.slice(0, 3).map(door => CatalogCard(door)).join('')}
            </div>
          </div>
          <div style="width:100%; display:flex; justify-content:center; margin: 40px 0;" data-reveal>
            <a href="#catalog" class="btn btn-secondary">${t('catalog.view_all_btn')}</a>
          </div>
        </div>
      </section>

      <section class="section" style="background:transparent;">
        <div class="container">
          <h2 class="section-title reveal" data-reveal style="margin-bottom:80px;">${t('how_it_works.title')}</h2>
          <div class="process-grid">
            ${[1, 2, 3, 4].map(i => `
              <div class="step-card" data-reveal="delay-${i}">
                <span class="step-number">0${i}</span>
                <h3 class="step-title-small">${t(`how_it_works.step${i}.name`)}</h3>
                <p class="step-desc">${t(`how_it_works.step${i}.desc`)}</p>
                <div class="step-line"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  </div>
`;
};

const CatalogPage = () => `
  <section class="section catalog-page-section" style="padding-top:160px;">
    <div class="container">
      <div class="catalog-header-pc" style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 48px; text-align: left;">
        <h1 data-reveal style="font-size: 64px !important; font-weight: 800; white-space: nowrap; margin: 0;">${t('catalog.title')}</h1>
        <p data-reveal="delay-1" style="color:var(--text-secondary); font-size: 20px; white-space: nowrap; margin: 0;">Leoni & FiloMuro</p>
      </div>

      
      <div class="filter-bar">
        <div style="display:flex; align-items:center; gap:12px;">
           <span style="font-size:12px; color:var(--text-muted);">${t('catalog.filters.series')}:</span>
           ${['All', 'Leoni', 'FiloMuro'].map(s => `
             <button class="btn ${window.app.catalogFilter.series === s ? 'btn-primary' : 'btn-secondary'}" onclick="window.app.setFilter('series', '${s}')" style="padding:6px 14px; font-size:12px; height:auto;">${s}</button>
           `).join('')}
        </div>
      </div>

      <div class="catalog-master-wrapper" style="position:relative; width:100%; overflow: visible; padding: 0;">
        <div class="catalog-grid catalog-grid-responsive" id="catalog-grid-full" onscroll="window.app.updateCatalogArrows(this)">
          ${(!catalog || catalog.length === 0) 
            ? `<div style="padding:100px 0; text-align:center; width:100%; color:var(--text-secondary);">${t('catalog.loading') || 'Loading...'}</div>` 
            : (catalog || []).filter(d => (window.app.catalogFilter?.series === 'All' || d?.series === window.app.catalogFilter?.series)).map(door => CatalogCard(door)).join('')}
        </div>
      </div>
    </div>
  </section>
`;

const AboutPage = () => {
  const isEn = currentLang === 'en';

  return `
  <!-- Cinematic Header -->
  <section class="section" style="background:#121212; padding:120px 0 60px;">
    <div class="container">
      <img src="/assets/images/logo.png" style="max-height:60px; filter:brightness(100); margin:0 0 24px 0;" alt="Monodoor">
      <h1 data-reveal style="font-size: clamp(40px, 8vw, 80px); color:#FFF; font-weight:800; margin-bottom:10px; letter-spacing:-0.04em;">MONODOOR</h1>
      <p data-reveal="delay-1" style="font-size:14px; color:#989490; letter-spacing:0.3em; text-transform:uppercase;">
        ${t('about.eyebrow')}
      </p>
    </div>
  </section>

  <!-- About Story Section -->
  <div class="about-story container" id="about-story-section">
    <!-- Scrolling Content Side -->
    <div class="about-story__text">
      <div class="value-block" data-reveal>
        <span class="value-accent">01 / STORY</span>
        <h2 class="value-title">${t('about.title')}</h2>
        <p class="value-desc" style="margin-bottom: 40px;">${t('about.sub')}</p>
        <div class="value-line"></div>
      </div>

      <div class="value-block" data-reveal="delay-1">
        <span class="value-accent">02 / VALUES</span>
        <h2 class="value-title">${t('about.values.v1')}</h2>
        <p class="value-desc">${t('about.values.v1_desc')}</p>
        <div class="value-line"></div>
      </div>

      <div class="value-block" data-reveal="delay-2">
        <span class="value-accent">03 / MATERIALS</span>
        <h2 class="value-title">${t('about.values.v2')}</h2>
        <p class="value-desc">${t('about.values.v2_desc')}</p>
        <div class="value-line"></div>
      </div>

      <div class="value-block" data-reveal="delay-3">
        <span class="value-accent">04 / DESIGN</span>
        <h2 class="value-title">${t('about.values.v3')}</h2>
        <p class="value-desc">${t('about.values.v3_desc')}</p>
        <div class="value-line"></div>
      </div>
    </div>

    <!-- Pinned Visual Side -->
    <div class="about-story__image-wrap">
      <img src="/assets/images/visible_concealed_door_bedroom.png" alt="Monodoor Luxury Interior">
    </div>
  </div>

  <div class="stats-strip" style="background:transparent; border-top: 1px solid rgba(255,255,255,0.05);">
    <div class="container stats-grid">
      <div class="stat-item" data-reveal>
        <span class="stat-val counter" data-target="7" data-suffix="+">0</span>
        <span class="stat-label">${t('stats.years')}</span>
      </div>
      <div class="stat-item" data-reveal="delay-1">
        <span class="stat-val counter" data-target="200" data-suffix="+">0</span>
        <span class="stat-label">${t('stats.projects')}</span>
      </div>
      <div class="stat-item" data-reveal="delay-2">
        <span class="stat-val counter" data-target="100" data-suffix="%">0</span>
        <span class="stat-label">${t('stats.hidden')}</span>
      </div>
      <div class="stat-item" data-reveal="delay-3">
        <span class="stat-val counter" data-target="5">0</span>
        <span class="stat-label">${t('stats.guarantee')}</span>
      </div>
    </div>
  </div>

  <section class="section" style="background:var(--grad-cta); padding:120px 0;">
    <div class="container" data-reveal>
      <h2 style="font-size:40px; margin-bottom:32px;">${isEn ? 'Ready for invisible change?' : 'Готові до невидимих змін?'}</h2>
      <div class="button-group">
        <a href="#contacts" class="btn btn-primary">${isEn ? 'Contact Us' : 'Зв\'яжіться з нами'}</a>
      </div>
    </div>
  </section>
`;
};

const ContactsPage = () => {
  const isEn = currentLang === 'en';
  return `
  <section class="section" style="padding-top:160px; padding-bottom:100px;">

    <div class="container">
      <h1 data-reveal style="font-size:56px; margin-bottom:12px;">${t('contacts.title')}</h1>
      <p data-reveal="delay-1" style="color:#989490; margin-bottom:80px;">${t('contacts.subtitle')}</p>
      
      <div class="grid-contacts">
        <div data-reveal>
          <div style="display:grid; gap:32px; margin-bottom:60px;">
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📍</span>
              <div>
                <p style="font-weight:600; color:#FFF; margin-bottom:4px;">${t('footer.address')}</p>
                <p style="font-size:14px; color:#989490;">${t('contacts.showroom_desc')}</p>
              </div>
            </div>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📞</span>
              <div>
                <a href="tel:0504440030" style="font-weight:600; color:#FFF; font-size:20px;">050 444 0030</a>
              </div>
            </div>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">🕐</span>
              <div>
                <p style="font-weight:600; color:#FFF; margin-bottom:4px;">${t('contacts.working_hours')}</p>
                <p style="color:#989490;">${t('contacts.mon_fri')}: 09:00 – 18:00</p>
                <p style="color:#989490;">${t('contacts.sat_sun')}: ${t('contacts.closed')}</p>
              </div>
            </div>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📷</span>
              <a href="https://instagram.com/monodoor_uzh" target="_blank" style="color:#989490; border-bottom:1px solid rgba(152,148,144,0.3);">@monodoor_uzh</a>
            </div>
          </div>

          <form id="contacts-form" action="#" class="contacts-form-wrap" style="background:#202020; padding:40px; border-radius:8px;" onsubmit="window.app.handleContactSubmit(event, this)">
            <h3 style="margin-bottom:16px; color:#FFF;">${t('contacts.form_title')}</h3>
            <div style="margin-bottom:16px;">
              <label for="contact-name" class="visually-hidden">${t('contacts.form_name')}</label>
              <input type="text" id="contact-name" name="contact_name" placeholder="${t('contacts.form_name')}" required style="width:100%;">
            </div>
            <div style="margin-bottom:16px;">
              <label for="contact-phone" class="visually-hidden">${t('contacts.form_phone')}</label>
              <input type="tel" id="contact-phone" name="contact_phone" placeholder="${t('contacts.form_phone')}" required style="width:100%;">
            </div>
            <div style="margin-bottom:16px;">
              <label for="contact-message" class="visually-hidden">${t('contacts.form_message')}</label>
              <textarea id="contact-message" name="contact_message" placeholder="${t('contacts.form_message')}" style="width:100%;"></textarea>
            </div>
          <div class="button-group" style="margin-top:32px;">
            <button class="btn btn-primary" type="submit" id="contact-submit" style="width:100%;">${t('contacts.form_submit')}</button>
          </div>
          </form>
        </div>

        <div data-reveal="delay-1">
          <div id="map" class="contacts-map" style="height:500px; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); background:#121212;"></div>
        </div>
      </div>
    </div>
  </section>
`;
};


const initMap = () => {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map', { scrollWheelZoom: false })
    .setView([48.613807, 22.263352], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  const whiteMarkerSvg = `
    <svg width="42" height="42" viewBox="0 0 24 24" fill="white" stroke="rgba(0,0,0,0.2)" stroke-width="0.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;

  const customIcon = L.divIcon({
    html: whiteMarkerSvg,
    className: 'custom-map-marker',
    iconSize: [42, 42],
    iconAnchor: [21, 42]
  });

  L.marker([48.613807, 22.263352], { icon: customIcon }).addTo(map);
};


// --- MOBILE MIRROR RENDERERS ---

// ─── MOBILE 6-STEP RENDERERS ──────────────────────────────────────────────

const SERIES_DATA = [
  { id: 'Leoni 40', sub: '40мм · 2400' },
  { id: 'FiloMuro 45', sub: '45мм · 3000' },
  { id: 'FiloMuro 50', sub: '50мм · 3000' },
];

const MATERIAL_DATA = [
  { id: 'primer', color: '#E2DDD6', name: 'Грунт' },
  { id: 'oak_veneer', color: '#C8A568', name: 'Шпон Дуб' },
  { id: 'walnut', color: '#7A5C3A', name: 'Шпон Горіх' },
  { id: 'mirror', color: '#C0CDD4', name: 'Дзеркало' },
  { id: 'glass', color: '#C8DAE8', name: 'Скло' },
];

const FRAME_COLOR_DATA = [
  { id: 'black', color: '#1A1A1A', name: 'Чорний' },
  { id: 'gold', color: '#C9A84C', name: 'Золото' },
  { id: 'bronze', color: '#8B6035', name: 'Бронза' },
  { id: 'silver', color: '#A8B4BC', name: 'Срібло' },
  { id: 'white', color: '#F2EFE9', name: 'Білий' },
];

const FILLING_DATA = [
  { id: 'honeycomb', db: 28, name: 'Гофрокартон', pct: 35 },
  { id: 'polystyrene', db: 34, name: 'Екструд. пінополістирол', pct: 65 },
  { id: 'saurlend', db: 42, name: 'SAURLEND', pct: 100 },
];

const renderSeriesStep = () => `
  <div class="mobile-step1-hero">
    <img src="/assets/images/hero_door_right.png" alt="Monodoor Series">
  </div>
  <div class="series-selector-grid">
    ${SERIES_DATA.map(s => `
      <button type="button" class="series-card ${doorConfig.series === s.id ? 'selected' : ''}"
              onclick="window.app.updateConfig('series','${s.id}')">
        <span class="series-card-name">${s.id}</span>
        <span class="series-card-sub">${s.sub}</span>
      </button>
    `).join('')}
  </div>
`;

const renderDimensionsStep = () => `
  <div class="compact-chip-grid" style="grid-template-columns:repeat(2,1fr); gap:10px;">
    ${[600, 700, 800, 900].map(w => `
      <button type="button" class="compact-chip ${doorConfig.width === w ? 'selected' : ''}"
              onclick="window.app.updateConfig('width',${w})">${w} мм</button>
    `).join('')}
  </div>
  <div class="range-wrap">
    <div class="range-labels">
      <span>Висота</span>
      <span style="color:#f9fafb;">${doorConfig.height} мм</span>
    </div>
    <label for="config-height-mobile" class="visually-hidden">Висота</label>
    <input type="range" id="config-height-mobile" name="height_mobile" min="2000" max="3000" step="50" value="${doorConfig.height}"
           oninput="window.app.updateConfig('height',parseInt(this.value))"
           style="width:100%; accent-color:#f9fafb;">
    <div class="range-marks"><span>2000</span><span>2500</span><span>3000</span></div>
  </div>
`;

const renderMaterialColorStep = () => `
  <div class="material-big-grid">
    ${MATERIAL_DATA.map(m => `
      <div class="material-big-item ${doorConfig.material === m.id ? 'selected' : ''}"
           onclick="window.app.updateConfig('material','${m.id}')">
        <div class="material-big-swatch" style="background:${m.color};"></div>
        <span class="material-big-label">${m.name}</span>
      </div>
    `).join('')}
  </div>
  <hr class="step-divider">
  <div class="frame-color-grid">
    ${FRAME_COLOR_DATA.map(f => `
      <button type="button" class="frame-color-chip ${doorConfig.frameColor === f.id ? 'selected' : ''}"
              onclick="window.app.updateConfig('frameColor','${f.id}')">
        <span class="frame-color-dot" style="background:${f.color};${f.id === 'white' ? 'border-color:rgba(255,255,255,0.5);' : ''}"></span>
        ${f.name}
      </button>
    `).join('')}
  </div>
`;

const renderFillingDirStep = () => `
  <div class="filling-grid">
    ${FILLING_DATA.map(f => `
      <button type="button" class="filling-card ${doorConfig.filling === f.id ? 'selected' : ''}"
              onclick="window.app.updateConfig('filling','${f.id}')">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <span class="db-val">${f.db} дБ</span>
          <span class="fill-name">${f.name}</span>
        </div>
        <div class="fill-bar-wrap">
          <div class="fill-bar-inner" data-target="${f.pct}" style="width:0%"></div>
        </div>
      </button>
    `).join('')}
  </div>
  <hr class="step-divider">
  <div style="display:flex; gap:8px;">
    ${[
    { id: 'left', label: 'Ліворуч', svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="18" y="4" width="10" height="24" rx="2"/><circle cx="19" cy="16" r="1.5" fill="currentColor" stroke="none"/><path d="M18 16H6M10 12l-4 4 4 4"/></svg>` },
    { id: 'right', label: 'Праворуч', svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="10" height="24" rx="2"/><circle cx="13" cy="16" r="1.5" fill="currentColor" stroke="none"/><path d="M14 16h12M22 12l4 4-4 4"/></svg>` }
  ].map(d => `
      <button type="button" class="btn btn-secondary dir-btn ${doorConfig.openDir === d.id ? 'selected' : ''}"
              style="flex:1; display:flex; flex-direction:column; height:72px; gap:6px; font-size:12px; ${doorConfig.openDir === d.id ? 'border-color:#f9fafb;color:#f9fafb;' : ''}"
              onclick="window.app.updateConfig('openDir','${d.id}')">
        ${d.svg}
        ${d.label}
      </button>
    `).join('')}
  </div>
`;

const renderHardwareStep = () => `
  <div style="display:flex; gap:8px;">
    ${[{ id: 'PZ', sub: 'Кімнатний' }, { id: 'WC', sub: 'Ванна' }].map(l => `
      <button type="button" class="compact-chip ${doorConfig.lock === l.id ? 'selected' : ''}"
              style="flex:1; display:flex; flex-direction:column; gap:4px; height:60px;"
              onclick="window.app.updateConfig('lock','${l.id}')">
        <span style="font-size:14px; font-weight:700;">${l.id}</span>
        <span style="font-size:10px; opacity:0.5;">${l.sub}</span>
      </button>
    `).join('')}
  </div>
  <hr class="step-divider">
  <div style="display:flex; gap:8px;">
    ${[{ id: 'bar', name: 'Планка' }, { id: 'lever', name: 'Натискна' }, { id: 'knob', name: 'Кругла' }].map(h => `
      <button type="button" class="compact-chip ${doorConfig.handle === h.id ? 'selected' : ''}"
              style="flex:1; height:52px;"
              onclick="window.app.updateConfig('handle','${h.id}')">${h.name}</button>
    `).join('')}
  </div>
`;

const MATERIAL_NAMES = { primer: 'Грунт', oak_veneer: 'Шпон Дуб', walnut: 'Шпон Горіх', mirror: 'Дзеркало', glass: 'Скло' };
const FRAME_NAMES = { black: 'Чорний', gold: 'Золото', bronze: 'Бронза', silver: 'Срібло', white: 'Білий' };
const FILLING_NAMES = { honeycomb: 'Гофрокартон', polystyrene: 'Пінополістирол', saurlend: 'SAURLEND' };
const FILLING_DB = { honeycomb: 28, polystyrene: 34, saurlend: 42 };
const HANDLE_NAMES = { bar: 'Планка', lever: 'Натискна', knob: 'Кругла' };
const DIR_NAMES = { left: 'Ліворуч', right: 'Праворуч' };

const renderSummaryStep = () => `
  <div class="summary-full-card">
    ${[
    ['Серія', doorConfig.series],
    ['Розмір', `${doorConfig.width} × ${doorConfig.height} мм`],
    ['Матеріал', MATERIAL_NAMES[doorConfig.material] || doorConfig.material],
    ['Профіль', FRAME_NAMES[doorConfig.frameColor] || doorConfig.frameColor],
    ['Наповнення', `${FILLING_DB[doorConfig.filling]} дБ · ${FILLING_NAMES[doorConfig.filling]}`],
    ['Відкривання', DIR_NAMES[doorConfig.openDir]],
    ['Фурнітура', `${doorConfig.lock} · ${HANDLE_NAMES[doorConfig.handle]}`],
  ].map(([label, val], i, arr) => `
      <div class="summary-row" ${i === arr.length - 1 ? 'style="border-bottom:none;"' : ''}>
        <span class="sum-label">${label}</span>
        <span class="sum-val">${val}</span>
      </div>
    `).join('')}
  </div>
  <form id="order-form-mobile" onsubmit="window.app.submitOrder(event)" style="display:flex; flex-direction:column; gap:10px;">
    <div>
      <label for="order-name-mobile" class="visually-hidden">Ім'я</label>
      <input type="text" id="order-name-mobile" name="order_name" placeholder="Ім'я" required minlength="2" style="width:100%; height:48px; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:6px; padding:0 14px; color:#f9fafb; font-size:14px;">
    </div>
    <div>
      <label for="order-phone-mobile" class="visually-hidden">Телефон</label>
      <input type="tel" id="order-phone-mobile" name="order_phone" placeholder="+380 __ ___ ____" required style="width:100%; height:48px; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:6px; padding:0 14px; color:#f9fafb; font-size:14px;">
    </div>
    <button class="btn btn-primary" type="submit" id="order-submit-mobile" style="width:100%; height:52px; min-height:0; font-size:14px; font-weight:600;">
      Надіслати замовлення
    </button>
  </form>
`;

const renderProgressStepper = (currentStep) => `
  <div class="progress-stepper-mobile">
    ${[1, 2, 3, 4, 5, 6].map(i => `
      <div class="step-dot ${i < currentStep ? 'completed' : (i === currentStep ? 'active' : '')}"
           onclick="if(${i} <= ${currentStep}) window.app.setStep(${i})">
        ${i < currentStep ? '✓' : i}
      </div>
      ${i < 6 ? `<div class="step-line ${i < currentStep ? 'active' : ''}"></div>` : ''}
    `).join('')}
  </div>
`;

const renderMobileNav = (step) => `
  ${step > 1
    ? `<button class="btn btn-secondary compact" onclick="window.app.configNav(-1)">← НАЗАД</button>`
    : '<div></div>'
  }
  ${step < 6
    ? `<button class="btn btn-primary compact" onclick="window.app.configNav(1)">
        ${step === 5 ? 'ПІДСУМОК →' : 'ДАЛІ →'}
       </button>`
    : '<div></div>'
  }
`;

const renderStepContentMobile = (step) => {
  const titles = {
    1: 'КРОК 1 — СЕРІЯ ДВЕРЕЙ',
    2: 'КРОК 2 — РОЗМІРИ',
    3: 'КРОК 3 — МАТЕРІАЛ ТА ПРОФІЛЬ',
    4: 'КРОК 4 — НАПОВНЕННЯ ТА ВІДКРИВАННЯ',
    5: 'КРОК 5 — ФУРНІТУРА',
    6: 'КРОК 6 — ПІДСУМОК',
  };
  const renderers = [renderSeriesStep, renderDimensionsStep, renderMaterialColorStep,
    renderFillingDirStep, renderHardwareStep, renderSummaryStep];
  return `
    <h3 class="mobile-step-title">${titles[step] || ''}</h3>
    <div class="mobile-compact-wrap">
      ${(renderers[step - 1] || (() => ''))()}
    </div>
  `;
};

const ConfiguratorPage = () => {
  const step = doorConfig.configStep;
  const { isMobile } = doorConfig;

  if (isMobile) {
    return `
      <div class="mobile-configurator-message">
        <div class="mcm-icon">🖥</div>

        <h2 class="mcm-title" data-ua="Конструктор доступний лише на комп'ютері" data-en="The configurator is available on desktop only"></h2>
        <p class="mcm-sub" data-ua="Для зручного підбору дверей скористайтесь конструктором на ноутбуці або ПК." data-en="For a comfortable door configuration experience, please use a laptop or desktop computer."></p>
        <a href="#contacts" class="mcm-btn" data-ua="Залишити заявку" data-en="Leave a request"></a>
      </div>
    `;
  }

  return `
    <div class="config-layout">
      <div class="config-steps-panel">
        <div class="config-progress-nav">
          <div class="progress-line"></div>
          <div class="progress-dot-active" style="width: ${((doorConfig.configStep - 1) / 5) * 100}%"></div>
          ${[1, 2, 3, 4, 5, 6].map(i => `
            <div class="progress-node ${doorConfig.configStep === i ? 'active' : (doorConfig.configStep > i ? 'completed' : '')}">
              ${doorConfig.configStep > i ? '✓' : i}
            </div>
          `).join('')}
        </div>

        <div class="config-step-container">
          <div class="config-step" id="step-content">
            ${renderStepContent()}
          </div>
        </div>

        <div class="config-nav">
          ${doorConfig.configStep > 1 && doorConfig.configStep < 6 ? `<button class="btn btn-secondary" onclick="window.app.configNav(-1)">${t('config.prev')}</button>` : '<div></div>'}
          ${doorConfig.configStep < 6 ? `<button class="btn btn-primary" onclick="window.app.configNav(1)">${t('config.next')}</button>` : ''}
        </div>
      </div>
      
      <div class="config-preview-panel">
        <div id="config-svg-mount" style="width:100%; height:450px; display:flex; flex-direction:column; align-items:center; justify-content:center;"></div>
        <div id="config-summary-live" style="margin-top:40px; font-size:12px; color:var(--text-secondary); letter-spacing:0.05em; text-transform:uppercase;"></div>
      </div>
    </div>
  `;
};

const renderStepContent = () => {
  const step = doorConfig.configStep;
  switch (step) {
    case 1:
      return `
        <h2 class="step-title">${t('config.step1')}</h2>
        <div class="input-wrap" style="margin-bottom:40px;">
          <label style="display:block; font-size:12px; opacity:0.5; margin-bottom:16px;">${t('config.width')}</label>
          <div class="option-grid">
            ${[600, 700, 800, 900].map(w => `<button class="option-chip-btn ${doorConfig.width === w ? 'selected' : ''}" onclick="window.app.updateConfig('width', ${w})">${w} мм</button>`).join('')}
          </div>
        </div>
        <div class="input-wrap">
          <label for="config-height-desktop" style="display:block; font-size:12px; opacity:0.5; margin-bottom:16px;">${t('config.height')}: <b style="color:#FFF;">${doorConfig.height} мм</b></label>
          <input type="range" id="config-height-desktop" name="height_desktop" min="2000" max="3000" step="50" value="${doorConfig.height}" oninput="window.app.updateConfig('height', parseInt(this.value))" style="width:100%; accent-color:#FFF;">
        </div>
      `;
    case 2:
      return `
        <h2 class="step-title">${t('config.step2')}</h2>
        <div class="material-swatch-grid">
           ${[
          { id: 'primer', color: '#E2DDD6', name: 'Грунт' },
          { id: 'oak_veneer', color: '#C8A568', name: 'Шпон Дуб' },
          { id: 'walnut', color: '#7A5C3A', name: 'Шпон Горіх' },
          { id: 'mirror', color: '#C0CDD4', name: 'Дзеркало' },
          { id: 'glass', color: '#C8DAE8', name: 'Скло' }
        ].map(m => `
             <div class="swatch-item ${doorConfig.material === m.id ? 'selected' : ''}" onclick="window.app.updateConfig('material', '${m.id}')">
               <div class="swatch-thumb" style="background:${m.color}"></div>
               <span style="font-size:12px;">${m.name}</span>
             </div>
           `).join('')}
        </div>
      `;
    case 3:
      return `
        <h2 class="step-title">${t('config.step3')}</h2>
        <div class="option-grid">
           ${['black', 'gold', 'bronze', 'silver', 'white'].map(c => `
             <button class="option-chip-btn ${doorConfig.frameColor === c ? 'selected' : ''}" onclick="window.app.updateConfig('frameColor', '${c}')">${c.toUpperCase()}</button>
           `).join('')}
        </div>
      `;
    case 4:
      return `
        <h2 class="step-title">${t('config.step4')}</h2>
        <div class="step4-grid" style="display:grid; gap:20px;">
          ${[
          { id: 'honeycomb', db: 28, name: 'Гофрокартон', desc: 'Стандартне наповнення. Підходить для спокійних зон.', fill: 35 },
          { id: 'polystyrene', db: 34, name: 'Екструдований пінополістирол', desc: 'Покращена звукоізоляція. Оптимально для спалень.', fill: 65 },
          { id: 'saurlend', db: 42, name: 'SAURLEND наповнення', desc: 'Максимальна ізоляція. Для студій та ванних кімнат.', fill: 100 }
        ].map((item, idx) => `
            <div class="option-chip-btn ${doorConfig.filling === item.id ? 'selected' : ''}" 
                 onclick="window.app.updateConfig('filling', '${item.id}')"
                 style="text-align:left; padding:24px; display:block; border: ${doorConfig.filling === item.id ? '1.5px solid #FFFFFF' : '1px solid rgba(255,255,255,0.12)'};"
            >
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:12px;">
                <span style="font-size:32px; font-weight:700; color:#FFF;">${item.db} дБ</span>
                <span style="font-size:14px; font-weight:500; color:#F2EFE9;">${item.name}</span>
              </div>
              <p style="font-size:13px; color:#989490; margin-bottom:16px;">${item.desc}</p>
              <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                <div class="sound-bar" data-target="${item.fill}" style="width:0; height:100%; background:#FFF; border-radius:3px; transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.1}s;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    case 5:
      return `
        <h2 class="step-title">${t('config.step5')}</h2>
        <div class="option-grid">
           <button class="option-chip-btn ${doorConfig.lock === 'PZ' ? 'selected' : ''}" onclick="window.app.updateConfig('lock', 'PZ')">PZ - Interior</button>
           <button class="option-chip-btn ${doorConfig.lock === 'WC' ? 'selected' : ''}" onclick="window.app.updateConfig('lock', 'WC')">WC - Bathroom</button>
        </div>
      `;
    case 6:
      return `
        <h2 class="step-title">${t('config.step6')}</h2>
        <div class="config-summary-card">
           <p>${t('config.summary')}</p>
        </div>
        <form id="order-form-desktop" class="config-order-form" onsubmit="window.app.submitOrder(event)">
           <div style="margin-bottom:12px;">
             <label for="order-name-desktop" class="visually-hidden">Name</label>
             <input type="text" id="order-name-desktop" name="order_name" placeholder="Name" required>
           </div>
           <div style="margin-bottom:12px;">
             <label for="order-phone-desktop" class="visually-hidden">Phone</label>
             <input type="tel" id="order-phone-desktop" name="order_phone" placeholder="+380" required>
           </div>
           <button class="btn btn-primary" type="submit" id="order-submit-desktop">${t('config.submit')}</button>
        </form>
        <div class="config-step6-actions">
           <button class="btn btn-secondary" onclick="window.app.configNav(-1)">${t('config.prev')}</button>
        </div>
      `;
    default: return `<div>Option step: ${step}</div>`;
  }
};

// --- CORE APP ---

window.app = {
  catalogFilter: { series: 'All' },
  activeAccordion: 'dimensions',
  currentView: (window.location.hash || '#home').replace('#', ''),

  selectedDoorId: null,

  openModal: (id) => {
    window.app.selectedDoorId = id;
    const portal = document.getElementById('modal-portal');
    if (portal) {
      portal.innerHTML = Modal();
      setTimeout(() => {
        const overlay = portal.querySelector('.modal-overlay');
        if (overlay) overlay.classList.add('active');
      }, 10);
    }
  },

  closeModal: () => {
    const portal = document.getElementById('modal-portal');
    if (portal) {
      const overlay = portal.querySelector('.modal-overlay');
      if (overlay) overlay.classList.remove('active');
      setTimeout(() => {
        window.app.selectedDoorId = null;
        portal.innerHTML = '';
      }, 300);
    }
  },

  scrollCatalog: (btn, dir) => {
    if (!btn) return;
    const wrapper = btn.closest('.catalog-master-wrapper') || btn.closest('.catalog-grid-outer-wrap');
    if (!wrapper) return;
    const grid = wrapper.querySelector('.catalog-grid');
    if (grid && grid.children.length > 0) {
      const scrollAmount = grid.children[0].clientWidth;
      grid.scrollBy({
        left: dir === 1 ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  },

  updateCatalogArrows: (grid) => {
    if (!grid || typeof grid.scrollLeft === 'undefined') return;
    
    const wrapper = grid.closest('.catalog-master-wrapper');
    if (!wrapper) return;
    
    const leftArrow = wrapper.querySelector('.catalog-nav-arrow.left');
    const rightArrow = wrapper.querySelector('.catalog-nav-arrow.right');
    if (!leftArrow || !rightArrow) return;

    const maxScroll = grid.scrollWidth - grid.clientWidth;
    
    // Smooth opacity transitions
    if (grid.scrollLeft <= 20) {
      leftArrow.style.opacity = '0';
      leftArrow.style.pointerEvents = 'none';
    } else {
      leftArrow.style.opacity = '1';
      leftArrow.style.pointerEvents = 'auto';
    }
    
    if (grid.scrollLeft >= maxScroll - 20) {
      rightArrow.style.opacity = '0';
      rightArrow.style.pointerEvents = 'none';
    } else {
      rightArrow.style.opacity = '1';
      rightArrow.style.pointerEvents = 'auto';
    }
  },


  onNavClick: (hash) => {

    window.app.currentView = hash.replace('#', '') || 'home';
    // Reset Constructor state if navigating away
    if (hash !== '#configurator') {
      doorConfig.configStep = 1;
    }
    
    // Reset horizontal scroll for Catalog
    if (hash === '#catalog') {
      const grids = document.querySelectorAll('.catalog-grid');
      grids.forEach(g => {
        g.scrollTo({ left: 0, behavior: 'instant' });
      });
    }

    // Force Global Scroll Reset
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Close mobile menu if open
    window.app.toggleMenu(false);
    window.app.render();
  },

  toggleLang: () => {
    saveLang(currentLang === 'ua' ? 'en' : 'ua');
    window.location.reload();
  },

  setLangMobile: (lang) => {
    saveLang(lang);
    window.location.reload();
  },



  initParallax: () => {
    const parallaxEl = document.querySelector('.hero-bg-parallax');
    if (!parallaxEl) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 10px shift
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      parallaxEl.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    };

    const handleOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;
      const x = Math.max(-10, Math.min(10, e.gamma / 2));
      const y = Math.max(-10, Math.min(10, (e.beta - 45) / 2));
      parallaxEl.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    };

    window.removeEventListener('mousemove', window._parallaxMouse);
    window.removeEventListener('deviceorientation', window._parallaxDevice);

    window.addEventListener('mousemove', window._parallaxMouse);
    window.addEventListener('deviceorientation', window._parallaxDevice);
  },

  initCinematicScroll: () => {
    const bg = document.getElementById('about-bg-zoom');
    const container = document.getElementById('about-cinematic');
    if (!bg || !container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top < viewHeight && rect.bottom > 0) {
        // Calculate progress relative to the entire container height
        // Progress 0 when top enters, 1 when bottom leaves
        const progress = Math.min(1, Math.max(0, (viewHeight - rect.top) / (rect.height + viewHeight)));
        const scale = 1 + (progress * 0.15); // Subtle zoom from 1.0 to 1.15
        bg.style.transform = `scale(${scale})`;
      }
    };

    window.removeEventListener('scroll', window._cinematicScroll);
    window._cinematicScroll = handleScroll;
    window.addEventListener('scroll', window._cinematicScroll);
    handleScroll(); // Initial call
  },

  toggleMenu: (show) => {
    document.getElementById('mobile-overlay').classList.toggle('active', show);
    document.body.style.overflow = show ? 'hidden' : '';
  },

  setAccordion: (id) => {
    if (app.activeAccordion === id) app.activeAccordion = null;
    else app.activeAccordion = id;
    window.app.render();
  },

  toggleSpecs: (id) => {
    const el = document.getElementById(`specs-${id}`);
    el.classList.toggle('active');
  },

  setFilter: (key, val) => {
    window.app.catalogFilter[key] = val;
    window.app.render();
  },

  updateConfig: (key, val) => {
    doorConfig[key] = val;

    // Persist to sessionStorage
    const _persist = ['series', 'width', 'height', 'material', 'frameColor', 'filling', 'openDir', 'lock', 'handle'];
    const _saved = {};
    _persist.forEach(k => _saved[k] = doorConfig[k]);
    sessionStorage.setItem('monodoor_config', JSON.stringify(_saved));

    // Always redraw SVG immediately
    requestAnimationFrame(() => drawDoor());
    const sum = document.getElementById('config-summary-live');
    if (sum) updateSummary();

    // Partial re-render of step content only (mobile)
    if (doorConfig.isMobile) {
      const stepContent = document.querySelector('.step-content-mobile');
      if (stepContent) stepContent.innerHTML = renderStepContentMobile(doorConfig.configStep);
      // Trigger fill-bar animation on step 4
      if (doorConfig.configStep === 4) {
        requestAnimationFrame(() => {
          document.querySelectorAll('.fill-bar-inner').forEach(el => { el.style.width = el.dataset.target + '%'; });
        });
      }
    } else {
      window.app.render(true);
    }
  },

  setStep: (step) => {
    if (step < 1) step = 1;
    doorConfig.configStep = step;
    if (doorConfig.isMobile) {
      // Use a temporary container to avoid outerHTML detachment bug
      const stepperContainer = document.querySelector('.progress-stepper-mobile');
      if (stepperContainer) {
        const tmp = document.createElement('div');
        tmp.innerHTML = renderProgressStepper(step);
        stepperContainer.innerHTML = tmp.querySelector('.progress-stepper-mobile')?.innerHTML || '';
      }

      const stepContent = document.querySelector('.step-content-mobile');
      if (stepContent) stepContent.innerHTML = renderStepContentMobile(step);

      const nav = document.querySelector('.sticky-nav-mobile');
      if (nav) nav.innerHTML = renderMobileNav(step);

      // RAF-based SVG redraw
      requestAnimationFrame(() => drawDoor());

      // Animate fill-bars on step 4
      if (step === 4) {
        requestAnimationFrame(() => {
          document.querySelectorAll('.fill-bar-inner').forEach(el => { el.style.width = el.dataset.target + '%'; });
        });
      }
    } else {
      window.app.render(true);
    }
  },

  configNav: (dir) => {
    const maxSteps = 6;
    let next = doorConfig.configStep + dir;
    if (next < 1) next = 1;
    if (next > maxSteps) return;
    window.app.setStep(next);
  },

  submitOrder: (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('[type=submit]');
    if (btn) { btn.disabled = true; btn.textContent = 'Надсилаємо...'; }
    setTimeout(() => {
      e.target.innerHTML = `
        <div style="padding:24px 0; color:#f9fafb;">
          <div style="font-size:40px; margin-bottom:12px;">✓</div>
          <p style="font-size:16px; font-weight:600; margin-bottom:8px;">Дякуємо!</p>
          <p style="font-size:13px; color:#9ca3af;">Ми зв'яжемося з вами найближчим часом.</p>
        </div>
      `;
      setTimeout(() => { window.location.hash = '#home'; }, 2500);
    }, 1200);
  },

  handleContactSubmit: (e, form) => {
    e.preventDefault();
    form.innerHTML = '<h3 style="color:#FFF;">Дякуємо! Ми зв\'яжемося з вами найближчим часом.</h3>';
  },

  render: (skipAnim = false) => {
    const slot = document.getElementById('content-slot');
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    const hash = window.location.hash || '#home';

    const finalize = () => {
      try {
        // --- CLEANUP & RESET ---
        const mount = document.getElementById('config-svg-mount');
        if (mount) mount.innerHTML = ''; // Memory management: clear WebGL/SVG refs

        header.innerHTML = Header();
        footer.innerHTML = `
            <div class="container footer-grid relative z-20 bg-transparent">
              <div class="footer-address-block" style="display:grid; gap:24px;">
                <h3 style="margin-bottom:12px; letter-spacing:0.1em;">MONODOOR</h3>
                <p style="font-size:14px; color:#989490; line-height:1.6;">${t('footer.address')}<br>${t('contacts.mon_fri')}: 09:00 – 18:00</p>
              </div>

              <div style="display:flex; flex-direction:column; justify-content:flex-end; align-items:flex-end;">
                <p style="font-size:12px; color:rgba(152,148,144,0.5);">${t('footer.rights')}</p>
              </div>
            </div>
          `;

        if (hash === '#home') { 
          slot.innerHTML = HomePage(); 
          document.body.classList.remove('mobile-configurator-active'); 
        }
        else if (hash === '#catalog') { 
          slot.innerHTML = CatalogPage(); 
          document.body.classList.remove('mobile-configurator-active'); 
          window.scrollTo({ top: 0, behavior: 'instant' }); // Force top reset
          // Ensure first card is centered on load
          const fullGrid = document.getElementById('catalog-grid-full');
          if (fullGrid) fullGrid.scrollLeft = 0;
        }
        else if (hash.startsWith('#configurator')) {
          document.body.classList.add('mobile-configurator-active');
          slot.innerHTML = ConfiguratorPage();
          setTimeout(() => window.dispatchEvent(new Event('resize')), 50); // critical fix
        }
        else if (hash === '#about') { 
          slot.innerHTML = AboutPage(); 
          document.body.classList.remove('mobile-configurator-active'); 
        }
        else if (hash === '#contacts') {
          slot.innerHTML = ContactsPage();
          document.body.classList.remove('mobile-configurator-active');
          setTimeout(initMap, 100);
        }

        document.getElementById('app').classList.remove('page-fade-out');
        applyI18nAttributes(slot);
        initRevealSystem();
        window.app.initParallax();
        window.app.initCinematicScroll();

        const counters = document.querySelectorAll('.counter');
        if (counters.length > 0) {
          const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                countUp(e.target, parseInt(e.target.dataset.target));
                observer.unobserve(e.target);
              }
            });
          });
          counters.forEach(c => observer.observe(c));
        }

        if (hash.startsWith('#configurator')) {
          drawDoor();
          updateSummary();
          if (doorConfig.configStep === 4) {
            setTimeout(() => {
              const bars = document.querySelectorAll('.sound-bar');
              bars.forEach(b => {
                if (b.dataset.target) b.style.width = b.dataset.target + '%';
              });
            }, 50);
          }
        }

        const mobileBar = document.getElementById('mobile-bar');
        if (mobileBar) {
          mobileBar.innerHTML = MobileNav();
        }
      } catch (err) {
        console.error("Render Error:", err);
        // Fallback for critical error - keep app functional
        slot.innerHTML = `<div style="padding:100px 20px; text-align:center; color:#999;">Error loading view. Please refresh.</div>`;
        document.getElementById('app').classList.remove('page-fade-out');
      }
    };

    if (skipAnim) {
      finalize();
    } else {
      document.getElementById('app').classList.add('page-fade-out');
      setTimeout(finalize, 350);
    }
  }
};

window.addEventListener('hashchange', () => {
  window.app.render();
  window.scrollTo(0, 0);
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 80);
});

// Start
runIntro();
window.app.render();
