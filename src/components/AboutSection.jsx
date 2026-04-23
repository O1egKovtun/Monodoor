import React from 'react';

const values = [
  {
    id: "01 / STORY",
    title: "Виняткова Майстерність",
    desc: "Кожен стик, кожна текстура та кожна деталь обробляються майстрами, які присвятили десятиліття мистецтву столярної справи."
  },
  {
    id: "PORTANOVA / FACTORY",
    title: "Власне виробництво у Львові",
    desc: "Наше серце — завод PortaNova у Львові. Це сучасний виробничий комплекс, де поєднуються італійські технології та українська майстерність для створення ідеальних дверей прихованого монтажу."
  },
  {
    id: "02 / VALUES",
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
  <footer className="w-full border-t border-zinc-900 py-16 mt-10 md:mt-24 bg-transparent">
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

const AboutSection = () => {
  return (
    <section id="about" className="relative w-full bg-[#050505] min-h-screen overflow-hidden">
      {/* 
        BLUEPRINT ENFORCEMENT:
        Strictly applying the provided CSS rules for Desktop and Mobile.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .about-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          background: #050505;
        }
        .about-story__image-wrap {
          position: sticky;
          top: 80px;
          height: calc(100vh - 120px);
          order: 2; /* Desktop: Image column stays on the right */
        }
        .about-story__text {
          order: 1; /* Desktop: Text column stays on the left */
        }
        .about-story__image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .about-story {
            display: flex;
            flex-direction: column;
            gap: 28px;
          }
          .about-story__image-wrap {
            position: static !important; /* Absolute override of sticky behavior */
            height: 260px;
            width: 100%;
            order: 1; /* Mobile: Image column stays on top */
          }
          .about-story__text {
            order: 2; /* Mobile: Text follows image */
            padding: 0 24px;
          }
          .about-story__image-wrap img {
            border-radius: 0; /* Full width on mobile */
          }
        }
      `}} />
      
      <div className="container mx-auto">
        <div className="about-story">
          {/* Image Wrap (Order 2 on Desktop, Order 1 on Mobile) */}
          <div className="about-story__image-wrap bg-transparent">
            <img 
              src="/assets/images/visible_concealed_door_bedroom.png" 
              alt="Monodoor PortoFino Factory"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'; }}
            />
          </div>

          {/* Text Wrap (Order 1 on Desktop, Order 2 on Mobile) */}
          <div className="about-story__text bg-transparent">
            {values.map((item, index) => (
              <div key={index} className="min-h-[80vh] md:min-h-screen flex flex-col justify-center py-12">
                <span className="block text-zinc-500 font-sans text-[10px] tracking-[0.5em] mb-6 uppercase">
                  {item.id}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light mb-12 max-w-[540px]">
                  {item.desc}
                </p>
                <div className="w-16 h-[1px] bg-zinc-800" />
              </div>
            ))}
            <SharedFooter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
