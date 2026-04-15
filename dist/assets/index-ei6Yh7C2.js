(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const x={ua:{nav:{catalog:"Каталог",configurator:"Конструктор",about:"Про нас",contacts:"Контакти",call:"Зателефонувати",apply:"Залишити заявку"},hero:{eyebrow:"Ужгород · Власне виробництво",h1:`Двері,
яких не видно.`,sub:`Приховані двері прихованого монтажу.
Геометрія без компромісів.`,btn_catalog:"Переглянути каталог",btn_config:"Зібрати двері"},concept:{title:"Що таке прихований монтаж?",item1:"Без коробки і наличників",item2:"Приховані петлі SIMONSWERK",item3:"Полотно врівень зі стіною"},stats:{years:"Років на ринку",projects:"Завершених проєктів",hidden:"Прихований монтаж",guarantee:"Років гарантії"},catalog:{title:"Наші моделі",all:"Переглянути всі →",view_all_btn:"Дивитись весь каталог →",more:"Детальніше",order:"Замовити",series:"Серія",filters:{series:"Серія",material:"Матеріал"},specs:{width:"Ширина",height:"Висота",mat:"Матеріал",frame:"Каркас",filling:"Наповнення",lock:"Замок"}},how_it_works:{title:"Як ми працюємо",step1:{name:"Замір",desc:"Безкоштовно, виїзд до вас"},step2:{name:"Виробництво",desc:"Власний цех 14–21 день"},step3:{name:"Доставка",desc:"Ужгород і Закарпаття"},step4:{name:"Монтаж",desc:"Під ключ, гарантія 5 років"}},gallery:{title:"Приклади робіт",view_works:"Переглянути роботи",all_works:"Всі роботи →"},config:{title:"Конструктор дверей",prev:"← Назад",next:"Далі →",step1:"РОЗМІРИ",step2:"МАТЕРІАЛ",step3:"РАМА ТА ТОРЦІ",step4:"НАПОВНЕННЯ",step5:"ЗАМОК",step6:"ЗАМОВЛЕННЯ",width:"Ширина",height:"Висота",thickness:"Товщина",summary:"Ваша конфігурація готова",submit:"Надіслати замовлення",success:"Дякуємо! Ми зв'яжемося з вами найближчим часом."},about:{title:"Ми робимо двері, які зникають",sub:"Monodoor — виробник дверей прихованого монтажу з Ужгорода.",production:"Власне виробництво",values:{v1:"Точність",v1_desc:"Кожен міліметр має значення.",v2:"Чесність",v2_desc:"Ніяких прихованих умов.",v3:"Сервіс",v3_desc:"Безкоштовний замір та консультація."}},footer:{address:"вул. Баб'яка, 18, Ужгород",rights:"© 2024 Monodoor. Всі права захищені."}},en:{nav:{catalog:"Catalog",configurator:"Configurator",about:"About",contacts:"Contacts",call:"Call Us",apply:"Leave a Request"},hero:{eyebrow:"Uzhhorod · Internal Production",h1:`Doors
that are invisible.`,sub:`Hidden flush-mount doors.
Geometry without compromise.`,btn_catalog:"Browse Catalog",btn_config:"Build a Door"},concept:{title:"What is flush installation?",item1:"No frames or architraves",item2:"Concealed SIMONSWERK hinges",item3:"Door leaf flush with the wall"},stats:{years:"Years on market",projects:"Finished projects",hidden:"Hidden installation",guarantee:"Years guarantee"},catalog:{title:"Our Models",all:"See all →",view_all_btn:"View entire catalog →",more:"Details",order:"Order",series:"Series",filters:{series:"Series",material:"Material"},specs:{width:"Width",height:"Height",mat:"Material",frame:"Frame",filling:"Filling",lock:"Lock"}},how_it_works:{title:"How we work",step1:{name:"Measurement",desc:"Free on-site visit"},step2:{name:"Production",desc:"Own workshop 14–21 days"},step3:{name:"Delivery",desc:"Uzhhorod and Zakarpattia"},step4:{name:"Installation",desc:"Turnkey, 5-year warranty"}},gallery:{title:"Gallery",view_works:"View details",all_works:"All works →"},config:{title:"Door Configurator",prev:"← Back",next:"Next →",step1:"DIMENSIONS",step2:"MATERIAL",step3:"FRAME & EDGES",step4:"FILLING",step5:"LOCK",step6:"ORDER",width:"Width",height:"Height",thickness:"Thickness",summary:"Your Configuration is Ready",submit:"Submit Order",success:"Thank you! We'll contact you shortly."},about:{title:"We make doors that disappear",sub:"Monodoor is a hidden door manufacturer from Uzhhorod.",production:"Internal Production",values:{v1:"Precision",v1_desc:"Every millimeter counts.",v2:"Honesty",v2_desc:"No hidden conditions.",v3:"Service",v3_desc:"Free measurement and consultation."}},footer:{address:"18 Babyaka St, Uzhhorod",rights:"© 2024 Monodoor. All rights reserved."}}},b=[{id:1,name:"Mono S1",series:"Leoni 40",material_group:"primer",desc:"Гладке полотно під фарбування",desc_en:"Smooth leaf for painting",image:"/assets/images/catalog_1.png",specs:{width:"600-900mm",height:"2000-2400mm",mat:"Primer",frame:"Aluminum",filling:"Honeycomb",lock:"Magnetic"}},{id:2,name:"Mono S2",series:"Leoni 40",material_group:"primer",desc:"Текстурована поверхня під фарбування",desc_en:"Textured surface for painting",image:"/assets/images/catalog_2.png",specs:{width:"600-900mm",height:"2000-2400mm",mat:"Textured Primer",frame:"Aluminum",filling:"Honeycomb",lock:"Magnetic"}},{id:3,name:"Mono S3",series:"Leoni 40",material_group:"primer",desc:"Мінімалістична горизонтальна фактура",desc_en:"Minimalist horizontal texture",image:"/assets/images/catalog_3.png",specs:{width:"600-900mm",height:"2000-2400mm",mat:"Horizontal Primer",frame:"Aluminum",filling:"Honeycomb",lock:"Magnetic"}},{id:4,name:"Mono L1",series:"FiloMuro 45",material_group:"veneer",desc:"Шпон дуб, преміум серія",desc_en:"Oak veneer, premium series",image:"/assets/images/catalog_4.png",specs:{width:"600-1000mm",height:"2000-3000mm",mat:"Oak Veneer",frame:"Aluminum",filling:"Polystyrene",lock:"Magnetic"}},{id:5,name:"Mono L2",series:"FiloMuro 45",material_group:"veneer",desc:"Шпон горіх, теплий тон",desc_en:"Walnut veneer, warm tone",image:"/assets/images/catalog_5.png",specs:{width:"600-1000mm",height:"2000-3000mm",mat:"Walnut Veneer",frame:"Aluminum",filling:"Polystyrene",lock:"Magnetic"}},{id:6,name:"Mono Pro",series:"FiloMuro 50",material_group:"composite",desc:"Максимальна ізоляція 42дБ",desc_en:"Maximum insulation 42dB",image:"/assets/images/catalog_6.png",specs:{width:"600-1100mm",height:"2000-3000mm",mat:"Composite",frame:"Aluminum",filling:"Saurlend",lock:"Magnetic"}},{id:7,name:"Mono Glass",series:"FiloMuro 45",material_group:"glass",desc:"Скляна вставка на всю висоту",desc_en:"Full-height glass insert",image:"/assets/images/catalog_7.png",specs:{width:"600-900mm",height:"2000-2700mm",mat:"Safety Glass",frame:"Aluminum",filling:"Glass",lock:"Magnetic"}},{id:8,name:"Mono Mirror",series:"FiloMuro 45",material_group:"mirror",desc:"Дзеркальна панель, повна висота",desc_en:"Full-height mirror panel",image:"/assets/images/catalog_8.png",specs:{width:"600-900mm",height:"2000-2700mm",mat:"Mirror",frame:"Aluminum",filling:"Mirror",lock:"Magnetic"}},{id:9,name:"Mono Oak",series:"FiloMuro 50",material_group:"veneer",desc:"Натуральний шпон дуб",desc_en:"Natural oak veneer",image:"/assets/images/catalog_9.png",specs:{width:"600-1100mm",height:"2000-3000mm",mat:"Premium Oak",frame:"Aluminum",filling:"Saurlend",lock:"Magnetic"}},{id:10,name:"Mono Walnut",series:"FiloMuro 50",material_group:"veneer",desc:"Шпон горіх, преміум",desc_en:"Walnut veneer, premium",image:"/assets/images/catalog_10.png",specs:{width:"600-1100mm",height:"2000-3000mm",mat:"Premium Walnut",frame:"Aluminum",filling:"Saurlend",lock:"Magnetic"}},{id:11,name:"Mono Nero",series:"Leoni 40",material_group:"matte",desc:"Чорне матове полотно",desc_en:"Black matte leaf",image:"/assets/images/catalog_11.png",specs:{width:"600-900mm",height:"2000-2400mm",mat:"Black Matte",frame:"Aluminum",filling:"Honeycomb",lock:"Magnetic"}},{id:12,name:"Mono Bianco",series:"Leoni 40",material_group:"matte",desc:"Біле матове полотно",desc_en:"White matte leaf",image:"/assets/images/catalog_12.png",specs:{width:"600-900mm",height:"2000-2400mm",mat:"White Matte",frame:"Aluminum",filling:"Honeycomb",lock:"Magnetic"}}];let m=localStorage.getItem("monodoor_lang")||"ua";const a={width:800,height:2100,thickness:40,material:"primer",customColor:"",frameType:"aluminium",frameColor:"black",customFrameColor:"",filling:"honeycomb",lock:"PZ",series:"Leoni 40",openDir:"left",handle:"bar",name:"",phone:"",configStep:1,barsAnimated:!1,isMobile:window.innerWidth<=768};try{const e=JSON.parse(sessionStorage.getItem("monodoor_config")||"{}");Object.assign(a,e)}catch{}window.addEventListener("resize",()=>{const e=a.isMobile;a.isMobile=window.innerWidth<=768,e!==a.isMobile&&window.location.hash.startsWith("#configurator")&&window.app.render(!0)});const $={primer:"#E2DDD6",oak_veneer:"#C8A568",walnut:"#7A5C3A",dsp:"#D0CAC0",mirror:"#C0CDD4",glass:"#C8DAE8",custom:a.customColor||"#AAAAAA",other:"#AAAAAA"},k={black:"#1A1A1A",gold:"#C9A84C",bronze:"#8B6035",silver:"#A8B4BC",white:"#F2EFE9",custom:a.customFrameColor||"#333333"},i=e=>{const t=e.split(".");let s=x[m];for(const l of t)s&&(s=s[l]);return s||e},v=e=>{m=e,localStorage.setItem("monodoor_lang",e)},M=(e=document)=>{e.querySelectorAll("[data-ua]").forEach(t=>{const s=m==="ua"?t.dataset.ua:t.dataset.en;s&&(t.textContent=s)})},_=()=>{const e=new IntersectionObserver(t=>{t.forEach(s=>{s.isIntersecting&&s.target.classList.add("in")})},{threshold:.1});document.querySelectorAll("[data-reveal]").forEach(t=>e.observe(t))},F=(e,t,s=1200)=>{let l=null;const o=e.dataset.suffix||"",n=r=>{l||(l=r);const c=Math.min((r-l)/s,1),d=1-Math.pow(1-c,4);e.textContent=Math.floor(d*t)+o,c<1&&requestAnimationFrame(n)};requestAnimationFrame(n)},A=()=>{if(sessionStorage.getItem("monodoor_intro_seen"))return;const e=document.createElement("div");e.className="intro-overlay pulse",e.innerHTML=`
    <div class="intro-panel intro-panel-left"></div>
    <div class="intro-panel intro-panel-right"></div>
  `,document.body.appendChild(e);const t=document.getElementById("app");t.classList.add("site-reveal"),setTimeout(()=>{e.remove(),t.classList.remove("site-reveal"),sessionStorage.setItem("monodoor_intro_seen","1")},2200)},u=()=>{const e=document.getElementById("config-svg-mount");if(!e)return;const{isMobile:t}=a,s={600:80,700:100,800:120,900:140},l=t?s[a.width]||120:s[a.width]||174,o=t?180:280,n=t?260:400,r=o+(a.height-2e3)*(n-o)/1e3,c=(400-l)/2,d=(520-r)/2,p=$[a.material]||"#AAA",g=k[a.frameColor]||"#333",w=a.material==="mirror"?.82:a.material==="glass"?.58:1;e.innerHTML=`
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
      <rect x="${c+8}" y="${d+8}" width="${l}" height="${r}" fill="black" opacity="0.3" rx="1" />
      
      <!-- Door Body -->
      <rect x="${c}" y="${d}" width="${l}" height="${r}" 
            fill="${p}" 
            fill-opacity="${w}"
            stroke="${g}" 
            stroke-width="${a.isMobile?1.5:2.5}" 
            rx="1"
            filter="url(#shadow)"
            style="transition: fill 0.3s ease, stroke 0.3s ease, width 0.4s ease, height 0.4s ease, x 0.4s ease, y 0.4s ease;" 
      />
      
      <!-- Gap Line -->
      <line x1="${c+6}" y1="${d+2}" x2="${c+6}" y2="${d+r-2}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />

      <!-- Handle -->
      ${a.lock==="PZ"?`<rect x="${c+l-18}" y="${d+r/2-29}" width="5" height="58" rx="3" fill="#EFEFEF" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" />`:`
          <circle cx="${c+l-10}" cy="${d+r/2}" r="11" fill="#EFEFEF" style="filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" />
          <rect x="${c+l-13}" y="${d+r/2+14}" width="6" height="10" rx="1" fill="#EFEFEF" />
        `}

      <text x="${c+l-10}" y="${d+20}" font-size="10" fill="rgba(255,255,255,0.4)" text-anchor="end" font-family="Inter">${a.height>2100?"FILOMURO 45/50":"LEONI 40"}</text>
    </svg>
    <div class="dimension-label" style="margin-top:10px; color:#F2EFE9; font-size:12px; opacity:0.8;">
      ${a.width} &times; ${a.height} мм
    </div>
  `},h=()=>{const e=document.getElementById("config-summary-live");e&&(e.innerHTML=`
    <span>${a.height>2100?"FiloMuro":"Leoni"}</span> &middot; 
    <span>${a.width}&times;${a.height}мм</span> &middot; 
    <span>${a.material}</span> &middot; 
    <span>${a.frameColor}</span> &middot; 
    <span>${a.lock}</span>
  `)},C=()=>{const e=window.location.hash||"#home",t=s=>e.startsWith(s)?"active":"";return`
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="/assets/images/logo.png" alt="Monodoor">
      </a>
      <nav class="nav-links">
        <a href="#catalog" class="${t("#catalog")}">${i("nav.catalog")}</a>
        <a href="#configurator" class="${t("#configurator")}">${i("nav.configurator")}</a>
        <a href="#about" class="${t("#about")}">${i("nav.about")}</a>
        <a href="#contacts" class="${t("#contacts")}">${i("nav.contacts")}</a>
      </nav>
      <div class="nav-right">
        <button class="lang-toggle" onclick="window.app.toggleLang()">${m.toUpperCase()}</button>
        <button class="btn btn-primary" onclick="window.location.hash='#contacts'">${i("nav.apply")}</button>
        <a href="https://instagram.com/monodoor_uzh" target="_blank" class="mobile-only" style="color:#FFF; display:flex; align-items:center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </div>
  <div class="mobile-menu-overlay" id="mobile-overlay">
    <span class="menu-close" onclick="window.app.toggleMenu(false)">&times;</span>
    <ul class="mobile-nav-list">
      <li><a href="#catalog" onclick="window.app.toggleMenu(false)">${i("nav.catalog")}</a></li>
      <li><a href="#configurator" onclick="window.app.toggleMenu(false)">${i("nav.configurator")}</a></li>
      <li><a href="#about" onclick="window.app.toggleMenu(false)">${i("nav.about")}</a></li>
      <li><a href="#contacts" onclick="window.app.toggleMenu(false)">${i("nav.contacts")}</a></li>
    </ul>
    <div class="mobile-menu-footer">
      <div class="mobile-menu-lang">
        <button class="${m==="ua"?"active":""}" onclick="window.app.setLangMobile('ua')">UA</button>
        <button class="${m==="en"?"active":""}" onclick="window.app.setLangMobile('en')">EN</button>
      </div>
      <span class="mobile-menu-brand">Monodoor · Ужгород</span>
    </div>
  </div>
`},S=()=>{const e=window.location.hash||"#home",s=["#catalog","#configurator","#about","#contacts"].indexOf(e);return`
    <div class="sticky-bar-mobile">
      <div class="nav-indicator-slider" style="transform: translateX(${s>=0?s*100:0}%)"></div>
      <a href="#catalog" class="sticky-item ${e==="#catalog"?"active":""}">
        <span class="iconify" data-icon="lucide:shopping-cart"></span>
        <span>${i("nav.catalog")}</span>
      </a>
      <a href="#configurator" class="sticky-item ${e==="#configurator"?"active":""}">
        <span class="iconify" data-icon="lucide:settings"></span>
        <span>${i("nav.configurator")}</span>
      </a>
      <a href="#about" class="sticky-item ${e==="#about"?"active":""}">
        <span class="iconify" data-icon="lucide:info"></span>
        <span>${i("nav.about")}</span>
      </a>
      <a href="#contacts" class="sticky-item ${e==="#contacts"?"active":""}">
        <span class="iconify" data-icon="lucide:phone"></span>
        <span>${i("nav.contacts")}</span>
      </a>
    </div>
  `},y=e=>`
  <div class="catalog-card" data-reveal>
    <div class="card-image-wrap">
      <img src="${e.image}" alt="${e.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMyQTJBMkEiLz48cmVjdCB4PSI4MCIgeT0iNTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48bGluZSB4MT0iODkiIHkxPSI1MCIgeDI9Ijg5IiB5Mj0iMzUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMTkwIiB5PSIyMDAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIyIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=='">
      <span class="series-badge">${e.series}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${e.name}</h3>
      <p class="card-desc">${m==="ua"?e.desc:e.desc_en}</p>
      <div class="spec-tags">
        <span class="spec-tag">${e.specs.thickness}</span>
        <span class="spec-tag">${e.specs.mat}</span>
      </div>
      <div class="card-btns">
        <button class="btn btn-secondary" onclick="window.app.toggleSpecs(${e.id})">${i("catalog.more")}</button>
        <button class="btn btn-primary" onclick="window.location.hash = '#configurator'">${i("catalog.order")}</button>
      </div>
    </div>
    <div class="specs-expandable" id="specs-${e.id}">
      <div class="specs-table">
        ${Object.entries(e.specs).map(([t,s])=>`
          <div class="spec-row">
            <span class="spec-label">${i("catalog.specs."+t)}</span>
            <span class="spec-value">${s}</span>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
`,I=()=>`
  <section id="hero">
    <div class="hero-bg-overlay"></div>
    <div class="container hero-content">
      <div class="hero-text-block">
        <span class="eyebrow" data-reveal>${i("hero.eyebrow")}</span>
        <h1 data-reveal="delay-1">${i("hero.h1")}</h1>
        <img src="/assets/images/hero_door_right.png" class="hero-image" alt="Luxury Door">
        <p class="hero-sub" data-reveal="delay-2">${i("hero.sub")}</p>
        <div class="hero-btns" data-reveal="delay-3">
          <a href="#catalog" class="btn btn-primary">${i("hero.btn_catalog")}</a>
          <a href="#configurator" class="btn btn-secondary">${i("hero.btn_config")}</a>
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
    <div class="container grid-2-col">
      <div data-reveal>
        <h2 class="section-title" style="font-size:40px; margin-bottom:40px;">${i("concept.title")}</h2>
        <div style="display:grid; gap:20px;">
          ${[1,2,3].map(e=>`
            <div style="padding-left:24px; border-left:2px solid #FFF; opacity:0.8;">
              ${i("concept.item"+e)}
            </div>
          `).join("")}
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
        <span class="stat-label">${i("stats.years")}</span>
      </div>
      <div class="stat-item" data-reveal="delay-1">
        <span class="stat-val counter" data-target="200" data-suffix="+">0</span>
        <span class="stat-label">${i("stats.projects")}</span>
      </div>
      <div class="stat-item" data-reveal="delay-2">
        <span class="stat-val counter" data-target="100" data-suffix="%">0</span>
        <span class="stat-label">${i("stats.hidden")}</span>
      </div>
      <div class="stat-item" data-reveal="delay-3">
        <span class="stat-val counter" data-target="5">0</span>
        <span class="stat-label">${i("stats.guarantee")}</span>
      </div>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px;">
        <h2 class="section-title reveal" data-reveal>${i("catalog.title")}</h2>
        <a href="#catalog" style="border-bottom:1px solid #FFF; padding-bottom:4px; font-size:14px;">${i("catalog.all")}</a>
      </div>
      <div class="catalog-grid">
        ${b.slice(0,3).map(e=>y(e)).join("")}
      </div>
      <div style="text-align:center; margin-top:60px;" data-reveal>
        <a href="#catalog" class="btn btn-secondary">${i("catalog.view_all_btn")}</a>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <h2 class="section-title reveal" data-reveal style="text-align:center; margin-bottom:80px;">${i("how_it_works.title")}</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:40px;">
        ${[1,2,3,4].map(e=>`
          <div class="step-card" data-reveal="delay-${e}" style="position:relative; padding:40px; background:var(--bg-card); border-radius:6px;">
            <span style="position:absolute; top:20px; right:20px; font-size:60px; font-weight:800; opacity:0.03;">0${e}</span>
            <h3 style="margin-bottom:16px;">${i(`how_it_works.step${e}.name`)}</h3>
            <p style="color:var(--text-secondary); font-size:14px;">${i(`how_it_works.step${e}.desc`)}</p>
            <div style="width:40px; height:2px; background:#FFF; margin-top:24px;"></div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>
`,L=()=>`
  <section class="section" style="padding-top:160px;">
    <div class="container">
      <h1 data-reveal style="font-size:56px; margin-bottom:20px;">${i("catalog.title")}</h1>
      <p data-reveal="delay-1" style="color:var(--text-secondary); margin-bottom:60px;">${i("catalog.title")} — Leoni & FiloMuro</p>
      
      <div class="filter-bar">
        <div style="display:flex; align-items:center; gap:12px;">
           <span style="font-size:12px; color:var(--text-muted);">${i("catalog.filters.series")}:</span>
           ${["All","Leoni 40","FiloMuro 45","FiloMuro 50"].map(e=>`
             <button class="btn ${window.app.catalogFilter.series===e?"btn-primary":"btn-secondary"}" onclick="window.app.setFilter('series', '${e}')" style="padding:6px 14px; font-size:12px; height:auto;">${e}</button>
           `).join("")}
        </div>
      </div>

      <div class="catalog-grid" id="catalog-grid-full">
        ${b.filter(e=>window.app.catalogFilter.series==="All"||e.series===window.app.catalogFilter.series).map(e=>y(e)).join("")}
      </div>
    </div>
  </section>
`,E=()=>`
  <section class="section" style="background:#1E1E1E; padding:100px 0; text-align:center;">
    <div class="container">
      <img src="/assets/images/logo.png" style="max-height:80px; filter:brightness(100); margin:0 auto 24px;" alt="Monodoor">
      <div style="width:60px; height:1px; background:rgba(255,255,255,0.2); margin:0 auto 32px;"></div>
      <h1 data-reveal style="font-size:56px; color:#FFF; font-weight:700; margin-bottom:12px;">Monodoor</h1>
      <p data-reveal="delay-1" style="font-size:16px; color:#989490; letter-spacing:0.12em; text-transform:uppercase;">Двері прихованого монтажу · Ужгород</p>
    </div>
  </section>

  <section class="section" style="background:#202020; padding:80px 0;">
    <div class="container grid-about-story">
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
      <div class="grid-values">
        ${[{t:"Точність",d:"Кожен міліметр має значення."},{t:"Чесність",d:"Ніяких прихованих умов. Ціна після заміру — фінальна."},{t:"Сервіс",d:"Безкоштовний замір, консультація і гарантійне обслуговування."}].map((e,t)=>`
          <div data-reveal="delay-${t}" style="padding:40px; background:#282828; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <h3 style="margin-bottom:16px; color:#FFF;">${e.t}</h3>
            <p style="font-size:14px; color:#989490;">${e.d}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--grad-cta); text-align:center; padding:120px 0;">
    <div class="container" data-reveal>
      <h2 style="font-size:40px; margin-bottom:32px;">${i("how_it_works.title")}?</h2>
      <a href="#contacts" class="btn btn-primary">Зв'яжіться з нами</a>
    </div>
  </section>
`,z=()=>`
  <section class="section" style="padding-top:160px; padding-bottom:100px;">
    <div class="container">
      <h1 data-reveal style="font-size:56px; margin-bottom:12px;">Контакти</h1>
      <p data-reveal="delay-1" style="color:#989490; margin-bottom:80px;">Ми в Ужгороді. Приїжджайте або залиште заявку онлайн.</p>
      
      <div class="grid-contacts">
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
                <p style="color:#989490;">Пн–Пт: 09:00 – 18:00</p>
              </div>
            </div>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <span style="font-size:24px;">📷</span>
              <a href="https://instagram.com/monodoor_uzh" target="_blank" style="color:#989490; border-bottom:1px solid rgba(152,148,144,0.3);">@monodoor_uzh</a>
            </div>
          </div>

          <form id="contacts-form" action="#" class="contacts-form-wrap" style="background:#202020; padding:40px; border-radius:8px;" onsubmit="window.app.handleContactSubmit(event, this)">
            <h3 style="margin-bottom:16px; color:#FFF;">Залишити заявку</h3>
            <div style="margin-bottom:16px;">
              <label for="contact-name" class="visually-hidden">Ім'я</label>
              <input type="text" id="contact-name" name="contact_name" placeholder="Ім'я" required style="width:100%;">
            </div>
            <div style="margin-bottom:16px;">
              <label for="contact-phone" class="visually-hidden">Телефон</label>
              <input type="tel" id="contact-phone" name="contact_phone" placeholder="Телефон" required style="width:100%;">
            </div>
            <div style="margin-bottom:16px;">
              <label for="contact-message" class="visually-hidden">Повідомлення</label>
              <textarea id="contact-message" name="contact_message" placeholder="Повідомлення" style="width:100%;"></textarea>
            </div>
            <button class="btn btn-primary" type="submit" id="contact-submit" style="width:100%;">Надіслати</button>
          </form>
        </div>
        <div data-reveal="delay-1">
          <div class="minimalist-map" style="height:500px; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); position:relative; background:#1a1a1a; display:flex; align-items:center; justify-content:center;">
             <div class="map-grid-pattern" style="position:absolute; inset:0; opacity:0.15; background-image: radial-gradient(circle, #FFF 1px, transparent 1px); background-size: 30px 30px;"></div>
             <div class="map-marker-pulse"></div>
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="z-index: 2; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
             </svg>
             <div style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); font-size:11px; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.1em; white-space:nowrap;">вул. Баб'яка, 18, Ужгород</div>
          </div>
        </div>
      </div>
    </div>
  </section>
`,D=[{id:"Leoni 40",sub:"40мм · 2400"},{id:"FiloMuro 45",sub:"45мм · 3000"},{id:"FiloMuro 50",sub:"50мм · 3000"}],H=[{id:"primer",color:"#E2DDD6",name:"Грунт"},{id:"oak_veneer",color:"#C8A568",name:"Шпон Дуб"},{id:"walnut",color:"#7A5C3A",name:"Шпон Горіх"},{id:"mirror",color:"#C0CDD4",name:"Дзеркало"},{id:"glass",color:"#C8DAE8",name:"Скло"}],B=[{id:"black",color:"#1A1A1A",name:"Чорний"},{id:"gold",color:"#C9A84C",name:"Золото"},{id:"bronze",color:"#8B6035",name:"Бронза"},{id:"silver",color:"#A8B4BC",name:"Срібло"},{id:"white",color:"#F2EFE9",name:"Білий"}],T=[{id:"honeycomb",db:28,name:"Гофрокартон",pct:35},{id:"polystyrene",db:34,name:"Екструд. пінополістирол",pct:65},{id:"saurlend",db:42,name:"SAURLEND",pct:100}],N=()=>`
  <div class="series-selector-grid">
    ${D.map(e=>`
      <button type="button" class="series-card ${a.series===e.id?"selected":""}"
              onclick="window.app.updateConfig('series','${e.id}')">
        <span class="series-card-name">${e.id}</span>
        <span class="series-card-sub">${e.sub}</span>
      </button>
    `).join("")}
  </div>
`,P=()=>`
  <div class="compact-chip-grid" style="grid-template-columns:repeat(2,1fr); gap:10px;">
    ${[600,700,800,900].map(e=>`
      <button type="button" class="compact-chip ${a.width===e?"selected":""}"
              onclick="window.app.updateConfig('width',${e})">${e} мм</button>
    `).join("")}
  </div>
  <div class="range-wrap">
    <div class="range-labels">
      <span>Висота</span>
      <span style="color:#f9fafb;">${a.height} мм</span>
    </div>
    <label for="config-height-mobile" class="visually-hidden">Висота</label>
    <input type="range" id="config-height-mobile" name="height_mobile" min="2000" max="3000" step="50" value="${a.height}"
           oninput="window.app.updateConfig('height',parseInt(this.value))"
           style="width:100%; accent-color:#f9fafb;">
    <div class="range-marks"><span>2000</span><span>2500</span><span>3000</span></div>
  </div>
`,j=()=>`
  <div class="material-big-grid">
    ${H.map(e=>`
      <div class="material-big-item ${a.material===e.id?"selected":""}"
           onclick="window.app.updateConfig('material','${e.id}')">
        <div class="material-big-swatch" style="background:${e.color};"></div>
        <span class="material-big-label">${e.name}</span>
      </div>
    `).join("")}
  </div>
  <hr class="step-divider">
  <div class="frame-color-grid">
    ${B.map(e=>`
      <button type="button" class="frame-color-chip ${a.frameColor===e.id?"selected":""}"
              onclick="window.app.updateConfig('frameColor','${e.id}')">
        <span class="frame-color-dot" style="background:${e.color};${e.id==="white"?"border-color:rgba(255,255,255,0.5);":""}"></span>
        ${e.name}
      </button>
    `).join("")}
  </div>
`,O=()=>`
  <div class="filling-grid">
    ${T.map(e=>`
      <button type="button" class="filling-card ${a.filling===e.id?"selected":""}"
              onclick="window.app.updateConfig('filling','${e.id}')">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <span class="db-val">${e.db} дБ</span>
          <span class="fill-name">${e.name}</span>
        </div>
        <div class="fill-bar-wrap">
          <div class="fill-bar-inner" data-target="${e.pct}" style="width:0%"></div>
        </div>
      </button>
    `).join("")}
  </div>
  <hr class="step-divider">
  <div style="display:flex; gap:8px;">
    ${[{id:"left",label:"Ліворуч",svg:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="18" y="4" width="10" height="24" rx="2"/><circle cx="19" cy="16" r="1.5" fill="currentColor" stroke="none"/><path d="M18 16H6M10 12l-4 4 4 4"/></svg>'},{id:"right",label:"Праворуч",svg:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="10" height="24" rx="2"/><circle cx="13" cy="16" r="1.5" fill="currentColor" stroke="none"/><path d="M14 16h12M22 12l4 4-4 4"/></svg>'}].map(e=>`
      <button type="button" class="btn btn-secondary dir-btn ${a.openDir===e.id?"selected":""}"
              style="flex:1; display:flex; flex-direction:column; height:72px; gap:6px; font-size:12px; ${a.openDir===e.id?"border-color:#f9fafb;color:#f9fafb;":""}"
              onclick="window.app.updateConfig('openDir','${e.id}')">
        ${e.svg}
        ${e.label}
      </button>
    `).join("")}
  </div>
`,R=()=>`
  <div style="display:flex; gap:8px;">
    ${[{id:"PZ",sub:"Кімнатний"},{id:"WC",sub:"Ванна"}].map(e=>`
      <button type="button" class="compact-chip ${a.lock===e.id?"selected":""}"
              style="flex:1; display:flex; flex-direction:column; gap:4px; height:60px;"
              onclick="window.app.updateConfig('lock','${e.id}')">
        <span style="font-size:14px; font-weight:700;">${e.id}</span>
        <span style="font-size:10px; opacity:0.5;">${e.sub}</span>
      </button>
    `).join("")}
  </div>
  <hr class="step-divider">
  <div style="display:flex; gap:8px;">
    ${[{id:"bar",name:"Планка"},{id:"lever",name:"Натискна"},{id:"knob",name:"Кругла"}].map(e=>`
      <button type="button" class="compact-chip ${a.handle===e.id?"selected":""}"
              style="flex:1; height:52px;"
              onclick="window.app.updateConfig('handle','${e.id}')">${e.name}</button>
    `).join("")}
  </div>
`,q={primer:"Грунт",oak_veneer:"Шпон Дуб",walnut:"Шпон Горіх",mirror:"Дзеркало",glass:"Скло"},W={black:"Чорний",gold:"Золото",bronze:"Бронза",silver:"Срібло",white:"Білий"},G={honeycomb:"Гофрокартон",polystyrene:"Пінополістирол",saurlend:"SAURLEND"},Z={honeycomb:28,polystyrene:34,saurlend:42},U={bar:"Планка",lever:"Натискна",knob:"Кругла"},J={left:"Ліворуч",right:"Праворуч"},V=()=>`
  <div class="summary-full-card">
    ${[["Серія",a.series],["Розмір",`${a.width} × ${a.height} мм`],["Матеріал",q[a.material]||a.material],["Профіль",W[a.frameColor]||a.frameColor],["Наповнення",`${Z[a.filling]} дБ · ${G[a.filling]}`],["Відкривання",J[a.openDir]],["Фурнітура",`${a.lock} · ${U[a.handle]}`]].map(([e,t],s,l)=>`
      <div class="summary-row" ${s===l.length-1?'style="border-bottom:none;"':""}>
        <span class="sum-label">${e}</span>
        <span class="sum-val">${t}</span>
      </div>
    `).join("")}
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
`,Y=e=>`
  <div class="progress-stepper-mobile">
    ${[1,2,3,4,5,6].map(t=>`
      <div class="step-dot ${t<e?"completed":t===e?"active":""}"
           onclick="if(${t} <= ${e}) window.app.setStep(${t})">
        ${t<e?"✓":t}
      </div>
      ${t<6?`<div class="step-line ${t<e?"active":""}"></div>`:""}
    `).join("")}
  </div>
`,Q=e=>`
  ${e>1?'<button class="btn btn-secondary compact" onclick="window.app.configNav(-1)">← НАЗАД</button>':"<div></div>"}
  ${e<6?`<button class="btn btn-primary compact" onclick="window.app.configNav(1)">
        ${e===5?"ПІДСУМОК →":"ДАЛІ →"}
       </button>`:"<div></div>"}
`,f=e=>{const t={1:"КРОК 1 — СЕРІЯ ДВЕРЕЙ",2:"КРОК 2 — РОЗМІРИ",3:"КРОК 3 — МАТЕРІАЛ ТА ПРОФІЛЬ",4:"КРОК 4 — НАПОВНЕННЯ ТА ВІДКРИВАННЯ",5:"КРОК 5 — ФУРНІТУРА",6:"КРОК 6 — ПІДСУМОК"},s=[N,P,j,O,R,V];return`
    <h3 class="mobile-step-title">${t[e]||""}</h3>
    <div class="mobile-compact-wrap">
      ${(s[e-1]||(()=>""))()}
    </div>
  `},X=()=>{a.configStep;const{isMobile:e}=a;return e?`
      <div class="mobile-configurator-message">
        <div class="mcm-icon">🖥</div>
        <h2 class="mcm-title" data-ua="Конструктор доступний лише на комп'ютері" data-en="The configurator is available on desktop only"></h2>
        <p class="mcm-sub" data-ua="Для зручного підбору дверей скористайтесь конструктором на ноутбуці або ПК." data-en="For a comfortable door configuration experience, please use a laptop or desktop computer."></p>
        <a href="#contacts" class="mcm-btn" data-ua="Залишити заявку" data-en="Leave a request"></a>
      </div>
    `:`
    <div class="config-layout">
      <div class="config-steps-panel">
        <div class="config-progress-nav">
          <div class="progress-line"></div>
          <div class="progress-dot-active" style="width: ${(a.configStep-1)/5*100}%"></div>
          ${[1,2,3,4,5,6].map(t=>`
            <div class="progress-node ${a.configStep===t?"active":a.configStep>t?"completed":""}">
              ${a.configStep>t?"✓":t}
            </div>
          `).join("")}
        </div>

        <div class="config-step-container">
          <div class="config-step" id="step-content">
            ${K()}
          </div>
        </div>

        <div class="config-nav">
          ${a.configStep>1&&a.configStep<6?`<button class="btn btn-secondary" onclick="window.app.configNav(-1)">${i("config.prev")}</button>`:"<div></div>"}
          ${a.configStep<6?`<button class="btn btn-primary" onclick="window.app.configNav(1)">${i("config.next")}</button>`:""}
        </div>
      </div>
      
      <div class="config-preview-panel">
        <div id="config-svg-mount" style="width:100%; height:450px; display:flex; flex-direction:column; align-items:center; justify-content:center;"></div>
        <div id="config-summary-live" style="margin-top:40px; font-size:12px; color:var(--text-secondary); letter-spacing:0.05em; text-transform:uppercase;"></div>
      </div>
    </div>
  `},K=()=>{const e=a.configStep;switch(e){case 1:return`
        <h2 class="step-title">${i("config.step1")}</h2>
        <div class="input-wrap" style="margin-bottom:40px;">
          <label style="display:block; font-size:12px; opacity:0.5; margin-bottom:16px;">${i("config.width")}</label>
          <div class="option-grid">
            ${[600,700,800,900].map(t=>`<button class="option-chip-btn ${a.width===t?"selected":""}" onclick="window.app.updateConfig('width', ${t})">${t} мм</button>`).join("")}
          </div>
        </div>
        <div class="input-wrap">
          <label for="config-height-desktop" style="display:block; font-size:12px; opacity:0.5; margin-bottom:16px;">${i("config.height")}: <b style="color:#FFF;">${a.height} мм</b></label>
          <input type="range" id="config-height-desktop" name="height_desktop" min="2000" max="3000" step="50" value="${a.height}" oninput="window.app.updateConfig('height', parseInt(this.value))" style="width:100%; accent-color:#FFF;">
        </div>
      `;case 2:return`
        <h2 class="step-title">${i("config.step2")}</h2>
        <div class="material-swatch-grid">
           ${[{id:"primer",color:"#E2DDD6",name:"Грунт"},{id:"oak_veneer",color:"#C8A568",name:"Шпон Дуб"},{id:"walnut",color:"#7A5C3A",name:"Шпон Горіх"},{id:"mirror",color:"#C0CDD4",name:"Дзеркало"},{id:"glass",color:"#C8DAE8",name:"Скло"}].map(t=>`
             <div class="swatch-item ${a.material===t.id?"selected":""}" onclick="window.app.updateConfig('material', '${t.id}')">
               <div class="swatch-thumb" style="background:${t.color}"></div>
               <span style="font-size:12px;">${t.name}</span>
             </div>
           `).join("")}
        </div>
      `;case 3:return`
        <h2 class="step-title">${i("config.step3")}</h2>
        <div class="option-grid">
           ${["black","gold","bronze","silver","white"].map(t=>`
             <button class="option-chip-btn ${a.frameColor===t?"selected":""}" onclick="window.app.updateConfig('frameColor', '${t}')">${t.toUpperCase()}</button>
           `).join("")}
        </div>
      `;case 4:return`
        <h2 class="step-title">${i("config.step4")}</h2>
        <div class="step4-grid" style="display:grid; gap:20px;">
          ${[{id:"honeycomb",db:28,name:"Гофрокартон",desc:"Стандартне наповнення. Підходить для спокійних зон.",fill:35},{id:"polystyrene",db:34,name:"Екструдований пінополістирол",desc:"Покращена звукоізоляція. Оптимально для спалень.",fill:65},{id:"saurlend",db:42,name:"SAURLEND наповнення",desc:"Максимальна ізоляція. Для студій та ванних кімнат.",fill:100}].map((t,s)=>`
            <div class="option-chip-btn ${a.filling===t.id?"selected":""}" 
                 onclick="window.app.updateConfig('filling', '${t.id}')"
                 style="text-align:left; padding:24px; display:block; border: ${a.filling===t.id?"1.5px solid #FFFFFF":"1px solid rgba(255,255,255,0.12)"};"
            >
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:12px;">
                <span style="font-size:32px; font-weight:700; color:#FFF;">${t.db} дБ</span>
                <span style="font-size:14px; font-weight:500; color:#F2EFE9;">${t.name}</span>
              </div>
              <p style="font-size:13px; color:#989490; margin-bottom:16px;">${t.desc}</p>
              <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                <div class="sound-bar" data-target="${t.fill}" style="width:0; height:100%; background:#FFF; border-radius:3px; transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${s*.1}s;"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `;case 5:return`
        <h2 class="step-title">${i("config.step5")}</h2>
        <div class="option-grid">
           <button class="option-chip-btn ${a.lock==="PZ"?"selected":""}" onclick="window.app.updateConfig('lock', 'PZ')">PZ - Interior</button>
           <button class="option-chip-btn ${a.lock==="WC"?"selected":""}" onclick="window.app.updateConfig('lock', 'WC')">WC - Bathroom</button>
        </div>
      `;case 6:return`
        <h2 class="step-title">${i("config.step6")}</h2>
        <div class="config-summary-card">
           <p>${i("config.summary")}</p>
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
           <button class="btn btn-primary" type="submit" id="order-submit-desktop">${i("config.submit")}</button>
        </form>
        <div class="config-step6-actions">
           <button class="btn btn-secondary" onclick="window.app.configNav(-1)">${i("config.prev")}</button>
        </div>
      `;default:return`<div>Option step: ${e}</div>`}};window.app={catalogFilter:{series:"All"},activeAccordion:"dimensions",toggleLang:()=>{v(m==="ua"?"en":"ua"),window.location.reload()},setLangMobile:e=>{v(e),window.location.reload()},toggleMenu:e=>{document.getElementById("mobile-overlay").classList.toggle("active",e),document.body.style.overflow=e?"hidden":""},setAccordion:e=>{app.activeAccordion===e?app.activeAccordion=null:app.activeAccordion=e,window.app.render()},toggleSpecs:e=>{document.getElementById(`specs-${e}`).classList.toggle("active")},setFilter:(e,t)=>{window.app.catalogFilter[e]=t,window.app.render()},updateConfig:(e,t)=>{a[e]=t;const s=["series","width","height","material","frameColor","filling","openDir","lock","handle"],l={};if(s.forEach(n=>l[n]=a[n]),sessionStorage.setItem("monodoor_config",JSON.stringify(l)),requestAnimationFrame(()=>u()),document.getElementById("config-summary-live")&&h(),a.isMobile){const n=document.querySelector(".step-content-mobile");n&&(n.innerHTML=f(a.configStep)),a.configStep===4&&requestAnimationFrame(()=>{document.querySelectorAll(".fill-bar-inner").forEach(r=>{r.style.width=r.dataset.target+"%"})})}else window.app.render(!0)},setStep:e=>{var t;if(e<1&&(e=1),a.configStep=e,a.isMobile){const s=document.querySelector(".progress-stepper-mobile");if(s){const n=document.createElement("div");n.innerHTML=Y(e),s.innerHTML=((t=n.querySelector(".progress-stepper-mobile"))==null?void 0:t.innerHTML)||""}const l=document.querySelector(".step-content-mobile");l&&(l.innerHTML=f(e));const o=document.querySelector(".sticky-nav-mobile");o&&(o.innerHTML=Q(e)),requestAnimationFrame(()=>u()),e===4&&requestAnimationFrame(()=>{document.querySelectorAll(".fill-bar-inner").forEach(n=>{n.style.width=n.dataset.target+"%"})})}else window.app.render(!0)},configNav:e=>{let s=a.configStep+e;s<1&&(s=1),!(s>6)&&window.app.setStep(s)},submitOrder:e=>{e.preventDefault();const t=e.target.querySelector("[type=submit]");t&&(t.disabled=!0,t.textContent="Надсилаємо..."),setTimeout(()=>{e.target.innerHTML=`
        <div style="text-align:center; padding:24px 0; color:#f9fafb;">
          <div style="font-size:40px; margin-bottom:12px;">✓</div>
          <p style="font-size:16px; font-weight:600; margin-bottom:8px;">Дякуємо!</p>
          <p style="font-size:13px; color:#9ca3af;">Ми зв'яжемося з вами найближчим часом.</p>
        </div>
      `,setTimeout(()=>{window.location.hash="#home"},2500)},1200)},handleContactSubmit:(e,t)=>{e.preventDefault(),t.innerHTML=`<h3 style="color:#FFF;">Дякуємо! Ми зв'яжемося з вами найближчим часом.</h3>`},render:(e=!1)=>{const t=document.getElementById("content-slot"),s=document.getElementById("main-header"),l=document.getElementById("main-footer"),o=window.location.hash||"#home",n=()=>{s.innerHTML=C(),l.innerHTML=`
          <div class="container footer-grid">
            <div style="display:grid; gap:24px;">
              <h3 style="margin-bottom:12px; letter-spacing:0.1em;">MONODOOR</h3>
              <p style="font-size:14px; color:#989490; line-height:1.6;">${i("footer.address")}<br>Пн–Пт: 09:00 – 18:00</p>
            </div>
            <div style="display:flex; flex-direction:column; justify-content:flex-end; align-items:flex-end;">
              <p style="font-size:12px; color:rgba(152,148,144,0.5);">${i("footer.rights")}</p>
            </div>
          </div>
        `,o==="#home"?(t.innerHTML=I(),document.body.classList.remove("mobile-configurator-active")):o==="#catalog"?(t.innerHTML=L(),document.body.classList.remove("mobile-configurator-active")):o.startsWith("#configurator")?(document.body.classList.add("mobile-configurator-active"),t.innerHTML=X(),setTimeout(()=>window.dispatchEvent(new Event("resize")),50)):o==="#about"?(t.innerHTML=E(),document.body.classList.remove("mobile-configurator-active")):o==="#contacts"&&(t.innerHTML=z(),document.body.classList.remove("mobile-configurator-active")),document.getElementById("app").classList.remove("page-fade-out"),M(t),_();const r=document.querySelectorAll(".counter");if(r.length>0){const d=new IntersectionObserver(p=>{p.forEach(g=>{g.isIntersecting&&(F(g.target,parseInt(g.target.dataset.target)),d.unobserve(g.target))})});r.forEach(p=>d.observe(p))}o.startsWith("#configurator")&&(u(),h(),a.configStep===4&&setTimeout(()=>{document.querySelectorAll(".sound-bar").forEach(p=>{p.style.width=p.dataset.target+"%"})},50));const c=document.getElementById("mobile-bar");c&&(c.innerHTML=S())};e?n():(document.getElementById("app").classList.add("page-fade-out"),setTimeout(n,350))}};window.addEventListener("hashchange",()=>{window.app.render(),window.scrollTo(0,0)});window.addEventListener("scroll",()=>{const e=document.querySelector("header");e&&e.classList.toggle("scrolled",window.scrollY>80)});A();window.app.render();
