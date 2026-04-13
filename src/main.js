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
  name: '',
  phone: '',
  configStep: 1,
  barsAnimated: false
};

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

// --- ANIMATION SYSTEM ---
const initRevealSystem = () => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
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
  const widthMap = { 600: 130, 700: 152, 800: 174, 900: 196 };
  const w = widthMap[doorConfig.width] || 174;
  
  // Height: map 2000->280px to 3000->400px linearly
  const h = 280 + ((doorConfig.height - 2000) * (400 - 280) / (3000 - 2000));

  const x = (mount.clientWidth - w) / 2;
  const y = (mount.clientHeight - h) / 2;

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
            stroke-width="2.5" 
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
    <div class="dimension-label" style="margin-top:20px; color:#F2EFE9; font-size:14px; opacity:0.8;">
      ${doorConfig.width} &times; ${doorConfig.height} мм
    </div>
  `;
};

const updateSummary = () => {
  const el = document.getElementById('config-summary-live');
  if(!el) return;
  el.innerHTML = `
    <span>${doorConfig.height > 2100 ? 'FiloMuro' : 'Leoni'}</span> &middot; 
    <span>${doorConfig.width}&times;${doorConfig.height}мм</span> &middot; 
    <span>${doorConfig.material}</span> &middot; 
    <span>${doorConfig.frameColor}</span> &middot; 
    <span>${doorConfig.lock}</span>
  `;
};

// --- COMPONENTS ---

const Header = () => `
  <header id="header-main">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="/assets/images/logo.png" alt="Monodoor">
      </a>
      <nav class="nav-links">
        <a href="#catalog">${t('nav.catalog')}</a>
        <a href="#configurator">${t('nav.configurator')}</a>
        <a href="#about">${t('nav.about')}</a>
        <a href="#contacts">${t('nav.contacts')}</a>
      </nav>
      <div class="nav-right">
        <button class="lang-toggle" onclick="window.app.toggleLang()">${currentLang.toUpperCase()}</button>
        <button class="btn btn-primary" onclick="window.location.hash='#contacts'">${t('nav.apply')}</button>
        <button class="menu-btn mobile-only" onclick="window.app.toggleMenu(true)" style="background:transparent; border:none; color:#FFF; font-size:24px; padding:0; cursor:pointer;">☰</button>
      </div>
    </div>
  </header>
  <div class="mobile-menu-overlay" id="mobile-overlay">
    <span class="menu-close" onclick="window.app.toggleMenu(false)">&times;</span>
    <ul class="mobile-nav-list">
      <li><a href="#catalog" onclick="window.app.toggleMenu(false)">${t('nav.catalog')}</a></li>
      <li><a href="#configurator" onclick="window.app.toggleMenu(false)">${t('nav.configurator')}</a></li>
      <li><a href="#about" onclick="window.app.toggleMenu(false)">${t('nav.about')}</a></li>
      <li><a href="#contacts" onclick="window.app.toggleMenu(false)">${t('nav.contacts')}</a></li>
    </ul>
  </div>
`;

const CatalogCard = (door) => `
  <div class="catalog-card" data-reveal>
    <div class="card-image-wrap">
      <img src="${door.image}" alt="${door.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMyQTJBMkEiLz48cmVjdCB4PSI4MCIgeT0iNTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48bGluZSB4MT0iODkiIHkxPSI1MCIgeDI9Ijg5IiB5Mj0iMzUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMTkwIiB5PSIyMDAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIyIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='">
      <span class="series-badge">${door.series}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${door.name}</h3>
      <p class="card-desc">${currentLang === 'ua' ? door.desc : door.desc_en}</p>
      <div class="spec-tags">
        <span class="spec-tag">${door.specs.thickness}</span>
        <span class="spec-tag">${door.specs.mat}</span>
      </div>
      <div class="card-btns">
        <button class="btn btn-secondary" onclick="window.app.toggleSpecs(${door.id})">${t('catalog.more')}</button>
        <button class="btn btn-primary" onclick="window.location.hash = '#configurator'">${t('catalog.order')}</button>
      </div>
    </div>
    <div class="specs-expandable" id="specs-${door.id}">
      <div class="specs-table">
        ${Object.entries(door.specs).map(([label, val]) => `
          <div class="spec-row">
            <span class="spec-label">${t('catalog.specs.' + label)}</span>
            <span class="spec-value">${val}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`;

// --- PAGES ---

const HomePage = () => `
  <section id="hero">
    <div class="hero-bg-overlay"></div>
    <img src="/assets/images/hero_door_right.png" class="hero-image" alt="Luxury Door">
    <div class="container hero-content">
      <div class="hero-text-block">
        <span class="eyebrow" data-reveal>${t('hero.eyebrow')}</span>
        <h1 data-reveal="delay-1">${t('hero.h1')}</h1>
        <p class="hero-sub" data-reveal="delay-2">${t('hero.sub')}</p>
        <div class="hero-btns" data-reveal="delay-3">
          <a href="#catalog" class="btn btn-primary">${t('hero.btn_catalog')}</a>
          <a href="#configurator" class="btn btn-secondary">${t('hero.btn_config')}</a>
        </div>
      </div>
    </div>
    <div class="scroll-indicator" style="position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center;">
       <div style="width:1px; height:40px; background:rgba(255,255,255,0.2); position:relative; overflow:hidden;">
          <div style="position:absolute; top:0; left:0; width:100%; height:4px; background:#FFF; animation: scrollDot 2s infinite;"></div>
       </div>
    </div>
    <style>@keyframes scrollDot { 0% { top: -4px; } 100% { top: 40px; } }</style>
  </section>

  <section class="section section-alt">
    <div class="container grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
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

  <div class="stats-strip">
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

  <section class="section">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px;">
        <h2 class="section-title reveal" data-reveal>${t('catalog.title')}</h2>
        <a href="#catalog" style="border-bottom:1px solid #FFF; padding-bottom:4px; font-size:14px;">${t('catalog.all')}</a>
      </div>
      <div class="catalog-grid">
        ${catalog.slice(0, 3).map(door => CatalogCard(door)).join('')}
      </div>
      <div style="text-align:center; margin-top:60px;" data-reveal>
        <a href="#catalog" class="btn btn-secondary">${t('catalog.view_all_btn')}</a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2 class="section-title reveal" data-reveal style="text-align:center; margin-bottom:80px;">${t('how_it_works.title')}</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px;">
        ${[1,2,3,4].map(i => `
          <div class="step-card" data-reveal="delay-${i}" style="position:relative; padding:40px; background:var(--bg-card); border-radius:6px;">
            <span style="position:absolute; top:20px; right:20px; font-size:60px; font-weight:800; opacity:0.03;">0${i}</span>
            <h3 style="margin-bottom:16px;">${t(`how_it_works.step${i}.name`)}</h3>
            <p style="color:var(--text-secondary); font-size:14px;">${t(`how_it_works.step${i}.desc`)}</p>
            <div style="width:40px; height:2px; background:#FFF; margin-top:24px;"></div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

const CatalogPage = () => `
  <section class="section" style="padding-top:160px;">
    <div class="container">
      <h1 data-reveal style="font-size:56px; margin-bottom:20px;">${t('catalog.title')}</h1>
      <p data-reveal="delay-1" style="color:var(--text-secondary); margin-bottom:60px;">${t('catalog.title')} — Leoni & FiloMuro</p>
      
      <div class="filter-bar" style="position:sticky; top:90px; z-index:100; background:var(--bg-page); padding:20px 0; border-bottom:1px solid var(--border-default); display:flex; gap:20px; flex-wrap:wrap; margin-bottom:60px;">
        <div style="display:flex; align-items:center; gap:12px;">
           <span style="font-size:12px; color:var(--text-muted);">${t('catalog.filters.series')}:</span>
           ${['All', 'Leoni 40', 'FiloMuro 45', 'FiloMuro 50'].map(s => `
             <button class="btn ${window.app.catalogFilter.series === s ? 'btn-primary' : 'btn-secondary'}" onclick="window.app.setFilter('series', '${s}')" style="padding:6px 14px; font-size:12px;">${s}</button>
           `).join('')}
        </div>
      </div>

      <div class="catalog-grid" id="catalog-grid-full">
        ${catalog.filter(d => (window.app.catalogFilter.series === 'All' || d.series === window.app.catalogFilter.series)).map(door => CatalogCard(door)).join('')}
      </div>
    </div>
  </section>
`;

const AboutPage = () => `
  <section class="section" style="background:#1E1E1E; padding:100px 0; text-align:center;">
    <div class="container">
      <img src="/assets/images/logo.png" style="max-height:80px; filter:brightness(100); margin:0 auto 24px;" alt="Monodoor">
      <div style="width:60px; height:1px; background:rgba(255,255,255,0.2); margin:0 auto 32px;"></div>
      <h1 data-reveal style="font-size:56px; color:#FFF; font-weight:700; margin-bottom:12px;">Monodoor</h1>
      <p data-reveal="delay-1" style="font-size:16px; color:#989490; letter-spacing:0.12em; text-transform:uppercase;">Двері прихованого монтажу · Ужгород</p>
    </div>
  </section>

  <section class="section" style="background:#202020; padding:80px 0;">
    <div class="container" style="display:grid; grid-template-columns: 1.2fr 1fr; gap:80px; align-items:center;">
      <div data-reveal>
        <h2 style="font-size:36px; color:#FFF; margin-bottom:32px;">Наша історія</h2>
        <div style="font-size:14px; color:#989490; line-height:1.8; display:grid; gap:20px;">
          <p>Monodoor розпочав роботу в Ужгороді понад 7 років тому з простої ідеї — двері не мають привертати увагу. Вони мають зникати. Власний цех, власне виробництво, власний підхід до кожного проєкту.</p>
          <p>Ми спеціалізуємося виключно на дверях прихованого монтажу. Без коробок, без наличників, без видимих петель. Полотно врівень зі стіною — єдиний спосіб, яким ми працюємо.</p>
          <p>За ці роки ми реалізували понад 200 проєктів у Ужгороді та Закарпатті. Від приватних будинків до комерційних просторів. Кожен проєкт — індивідуальний замір, виробництво і монтаж під ключ.</p>
        </div>
      </div>
      <div data-reveal="delay-1">
        <img src="/assets/images/gallery_3.png" style="width:100%; border-radius:8px; height:560px; object-fit:cover;" alt="Production">
      </div>
    </div>
  </section>

  <div class="stats-strip" style="background:#181818;">
    <div class="container stats-grid">
      <div class="stat-item" data-reveal>
        <span class="stat-val counter" data-target="7" data-suffix="+">0</span>
        <span class="stat-label">Років на ринку</span>
      </div>
      <div class="stat-item" data-reveal="delay-1">
        <span class="stat-val counter" data-target="200" data-suffix="+">0</span>
        <span class="stat-label">Завершених проєктів</span>
      </div>
      <div class="stat-item" data-reveal="delay-2">
        <span class="stat-val counter" data-target="100" data-suffix="%">0</span>
        <span class="stat-label">Прихований монтаж</span>
      </div>
      <div class="stat-item" data-reveal="delay-3">
        <span class="stat-val counter" data-target="5">0</span>
        <span class="stat-label">Років гарантії</span>
      </div>
    </div>
  </div>

  <section class="section" style="background:#202020;">
    <div class="container">
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:32px;">
        ${[
          { t: 'Точність', d: 'Кожен міліметр має значення.' },
          { t: 'Чесність', d: 'Ніяких прихованих умов. Ціна після заміру — фінальна.' },
          { t: 'Сервіс', d: 'Безкоштовний замір, консультація і гарантійне обслуговування.' }
        ].map((v, i) => `
          <div data-reveal="delay-${i}" style="padding:40px; background:#282828; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <h3 style="margin-bottom:16px; color:#FFF;">${v.t}</h3>
            <p style="font-size:14px; color:#989490;">${v.d}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--grad-cta); text-align:center; padding:120px 0;">
    <div class="container" data-reveal>
      <h2 style="font-size:40px; margin-bottom:32px;">${t('how_it_works.title')}?</h2>
      <a href="#contacts" class="btn btn-primary">Зв'яжіться з нами</a>
    </div>
  </section>
`;

const ContactsPage = () => `
  <section class="section" style="padding-top:160px; padding-bottom:100px;">
    <div class="container">
      <h1 data-reveal style="font-size:56px; margin-bottom:12px;">Контакти</h1>
      <p data-reveal="delay-1" style="color:#989490; margin-bottom:80px;">Ми в Ужгороді. Приїжджайте або залиште заявку онлайн.</p>
      
      <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:80px;">
        <div data-reveal>
          <div style="display:grid; gap:32px; margin-bottom:60px;">
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📍</span>
              <div>
                <p style="font-weight:600; color:#FFF; margin-bottom:4px;">вул. Баб'яка, 18, Ужгород, 88000</p>
                <p style="font-size:14px; color:#989490;">Шоурум прихованого монтажу</p>
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
                <p style="color:#989490;">Пн–Пт: 9:00–18:00 · Сб: 10:00–15:00</p>
              </div>
            </div>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📷</span>
              <a href="https://instagram.com/monodoor_uzh" target="_blank" style="color:#989490; border-bottom:1px solid rgba(152,148,144,0.3);">@monodoor_uzh</a>
            </div>
          </div>

          <form action="#" style="background:#202020; padding:40px; border-radius:8px;" onsubmit="event.preventDefault(); this.innerHTML='<h3 style=\\'color:#FFF;\\'>Дякуємо! Ми зв\\'яжемося з вами найближчим часом.</h3>';">
            <h3 style="margin-bottom:16px; color:#FFF;">Залишити заявку</h3>
            <input type="text" placeholder="Ім'я" required>
            <input type="tel" placeholder="Телефон" required>
            <textarea placeholder="Повідомлення"></textarea>
            <button class="btn btn-primary" type="submit" style="width:100%;">Надіслати</button>
          </form>
        </div>
        <div data-reveal="delay-1">
          <div id="map" style="height:500px; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);"></div>
        </div>
      </div>
    </div>
  </section>
`;

const initMap = () => {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  
  const map = L.map('map', { scrollWheelZoom: false })
    .setView([48.613807, 22.263352], 17);
    
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    maxZoom: 19
  }).addTo(map);
  
  L.marker([48.613807, 22.263352])
    .addTo(map)
    .bindPopup("<b>Monodoor</b><br>вул. Баб'яка, 18<br>Ужгород, 88000<br>050 444 0030")
    .openPopup();
};

const ConfiguratorPage = () => `
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
          <label style="display:block; font-size:12px; opacity:0.5; margin-bottom:16px;">${t('config.height')}: <b style="color:#FFF;">${doorConfig.height} мм</b></label>
          <input type="range" min="2000" max="3000" step="50" value="${doorConfig.height}" oninput="window.app.updateConfig('height', parseInt(this.value))" style="width:100%; accent-color:#FFF;">
        </div>
      `;
    case 2:
      return `
        <h2 class="step-title">${t('config.step2')}</h2>
        <div class="material-swatch-grid">
           ${[
             {id:'primer', color:'#E2DDD6', name:'Грунт'},
             {id:'oak_veneer', color:'#C8A568', name:'Шпон Дуб'},
             {id:'walnut', color:'#7A5C3A', name:'Шпон Горіх'},
             {id:'mirror', color:'#C0CDD4', name:'Дзеркало'},
             {id:'glass', color:'#C8DAE8', name:'Скло'}
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
        <form class="config-order-form" onsubmit="event.preventDefault(); alert('Order Sent!');">
           <input type="text" placeholder="Name">
           <input type="tel" placeholder="+380">
           <button class="btn btn-primary" type="submit">${t('config.submit')}</button>
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
  
  toggleLang: () => {
    saveLang(currentLang === 'ua' ? 'en' : 'ua');
    window.location.reload();
  },

  toggleMenu: (show) => {
    document.getElementById('mobile-overlay').classList.toggle('active', show);
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
    document.getElementById('step-content').innerHTML = renderStepContent();
    drawDoor();
    updateSummary();
  },

  configNav: (dir) => {
    const content = document.getElementById('step-content');
    content.classList.add(dir > 0 ? 'fade-out' : 'fade-in');
    
    setTimeout(() => {
      doorConfig.configStep += dir;
      window.app.render();
      window.scrollTo(0,0);
    }, 200);
  },

  render: () => {
    const slot = document.getElementById('content-slot');
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');
    
    const hash = window.location.hash || '#home';
    
    // Page transition
    document.getElementById('app').classList.add('page-fade-out');
    
    setTimeout(() => {
      header.innerHTML = Header();
      footer.innerHTML = `
        <div class="container footer-grid">
          <div><h3 style="margin-bottom:20px;">MONODOOR</h3><p>${t('footer.address')}</p></div>
          <div><p>${t('footer.rights')}</p></div>
        </div>
      `;

      if (hash === '#home') slot.innerHTML = HomePage();
      else if (hash === '#catalog') slot.innerHTML = CatalogPage();
      else if (hash === '#configurator') slot.innerHTML = ConfiguratorPage();
      else if (hash === '#about') slot.innerHTML = AboutPage();
      else if (hash === '#contacts') {
        slot.innerHTML = ContactsPage();
        setTimeout(initMap, 100);
      }

      document.getElementById('app').classList.remove('page-fade-out');
      
      initRevealSystem();
      
      // Init counters on pages
      const counters = document.querySelectorAll('.counter');
      if (counters.length > 0) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if(e.isIntersecting) {
              countUp(e.target, parseInt(e.target.dataset.target));
              observer.unobserve(e.target);
            }
          });
        });
        counters.forEach(c => observer.observe(c));
      }

      if(hash === '#configurator') {
        drawDoor();
        updateSummary();
        // Animate sound bars if step 4
        if (doorConfig.configStep === 4) {
          setTimeout(() => {
            const bars = document.querySelectorAll('.sound-bar');
            bars.forEach(b => {
              b.style.width = b.dataset.target + '%';
            });
          }, 50);
        }
      }

      // Sticky Bar Mobile
      const mobileBar = document.getElementById('mobile-bar');
      if (mobileBar) {
        mobileBar.innerHTML = `
          <div class="sticky-bar-mobile">
            <a href="#catalog" class="sticky-item">
              <span style="font-size:18px;">▤</span>
              <span>${t('nav.catalog')}</span>
            </a>
            <a href="#configurator" class="sticky-item">
              <span style="font-size:18px;">⚙</span>
              <span>${t('nav.configurator')}</span>
            </a>
            <a href="tel:0504440030" class="sticky-item">
              <span style="font-size:18px;">📞</span>
              <span>${t('nav.call')}</span>
            </a>
          </div>
        `;
      }

    }, 350);
  }
};

window.addEventListener('hashchange', () => {
  window.app.render();
  window.scrollTo(0,0);
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if(header) header.classList.toggle('scrolled', window.scrollY > 80);
});

// Start
runIntro();
window.app.render();
