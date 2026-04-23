import React from 'react';

const values = [
  {
    id: "01 / VALUES",
    title: "Виняткова Майстерність",
    desc: "Кожен стик, кожна текстура та кожна деталь обробляються майстрами, які присвятили десятиліття мистецтву столярної справи."
  },
  {
    id: "02 / MATERIALS",
    title: "Преміальні Матеріали",
    desc: "Ми використовуємо лише добірну деревину та екологічні матеріали, що пройшли багатоступеневий контроль якості."
  },
  {
    id: "03 / DESIGN",
    title: "Прихований Монтаж",
    desc: "Абсолютна інтеграція в інтер'єр. Двері, що стають непомітною частиною архітектурного простору, підкреслюючи його цілісність."
  }
];

const SharedFooter = () => (
  <footer className="w-full border-t border-zinc-900 py-16 mt-10 md:mt-0 bg-transparent">
    <div className="flex flex-col gap-10">
      <div className="space-y-8">
        <h3 className="text-xl font-bold tracking-[0.3em] text-white uppercase">MONODOOR</h3>
        <div className="flex flex-col gap-6 text-[11px] text-zinc-600 tracking-widest leading-relaxed uppercase font-medium">
          <div className="space-y-2">
            <p className="text-zinc-500">Адреса / Шоурум</p>
            <p className="text-zinc-300">вул. Баб'яка, 48, Ужгород</p>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-500">Графік Роботи</p>
            <p className="text-zinc-300">Пн – Пт: 09:00 – 18:00</p>
          </div>
        </div>
      </div>
      <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-800">
        © 2024 Monodoor. Всі права захищено.
      </div>
    </div>
  </footer>
);

/**
 * Desktop View: md: 768px and above
 */
const AboutDesktop = () => (
  <div className="flex flex-row w-full bg-transparent">
    {/* Left Side (Sticky): Image Column */}
    <div className="w-1/2 sticky top-0 h-screen overflow-hidden bg-zinc-950">
      <img 
        src="/assets/images/visible_concealed_door_bedroom.png" 
        alt="Monodoor Luxury Interior"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'; }}
      />
    </div>
    
    {/* Right Side (Scroll): Text Column */}
    <div className="w-1/2 px-16 bg-transparent">
      {values.map((item, index) => (
        <div key={index} className="min-h-screen flex flex-col justify-center max-w-[540px]">
          <span className="block text-zinc-500 font-sans text-[10px] tracking-[0.5em] mb-6 uppercase">{item.id}</span>
          <h2 className="text-5xl font-bold mb-8 text-white leading-[1.1] tracking-tight">{item.title}</h2>
          <p className="text-xl text-zinc-400 leading-relaxed font-light mb-12">{item.desc}</p>
          <div className="w-16 h-[1px] bg-zinc-800" />
        </div>
      ))}
      <SharedFooter />
    </div>
  </div>
);

/**
 * Mobile View: Below 768px
 */
const AboutMobile = () => (
  <div className="flex flex-col w-full bg-transparent">
    {/* 1. Image at the top */}
    <div className="w-full h-[50vh] overflow-hidden bg-zinc-950">
      <img 
        src="/assets/images/visible_concealed_door_bedroom.png" 
        alt="Monodoor Mobile View"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'; }}
      />
    </div>
    
    {/* 2. Text blocks follow vertically */}
    <div className="px-6 py-12 bg-transparent">
      {values.map((item, index) => (
        <div key={index} className="mb-20">
          <span className="block text-zinc-500 font-sans text-[10px] tracking-[0.5em] mb-6 uppercase">{item.id}</span>
          <h2 className="text-3xl font-bold mb-8 text-white leading-[1.1] tracking-tight">{item.title}</h2>
          <p className="text-lg text-zinc-400 leading-relaxed font-light mb-12">{item.desc}</p>
          <div className="w-16 h-[1px] bg-zinc-800" />
        </div>
      ))}
      
      {/* 3. Footer at the very bottom */}
      <SharedFooter />
    </div>
  </div>
);

const AboutSection = () => {
  return (
    <section className="relative w-full bg-[#050505] min-h-screen">
      {/* Container ONLY visible on desktop */}
      <div className="hidden md:block">
        <AboutDesktop />
      </div>
      
      {/* Container ONLY visible on mobile */}
      <div className="block md:hidden">
        <AboutMobile />
      </div>
    </section>
  );
};

export default AboutSection;
