import React from 'react';

const AboutSection = () => {
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

  return (
    <section className="w-full bg-transparent min-h-screen">
      {/* Container: Stacked on mobile, Split on desktop */}
      <div className="flex flex-col md:flex-row">
        
        {/* 1. Image Layer: Hero on mobile, Sticky Column on desktop */}
        <div className="w-full h-[50vh] md:h-screen md:w-1/2 md:sticky md:top-0 overflow-hidden bg-zinc-950">
          <img 
            src="/assets/images/visible_concealed_door_bedroom.png" 
            alt="Monodoor Luxury Interior"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop';
            }}
          />
        </div>

        {/* 2. Text Layer: Below image on mobile, Scrollable on desktop */}
        <div className="w-full md:w-1/2 bg-transparent px-6 py-12 md:px-16 md:py-0">
          <div className="flex flex-col">
            
            {/* Narrative Content Blocks */}
            {values.map((item, index) => (
              <div 
                key={index} 
                className="min-h-[auto] md:min-h-screen flex flex-col justify-center py-12 md:py-0 max-w-[540px] mb-16 md:mb-0"
              >
                <span className="block text-zinc-500 font-sans text-[10px] tracking-[0.5em] mb-6 uppercase">
                  {item.id}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light mb-12">
                  {item.desc}
                </p>
                <div className="w-16 h-[1px] bg-zinc-800" />
              </div>
            ))}

            {/* Integrated Business Footer (Natural scroll conclusion) */}
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
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
