import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Quote } from 'lucide-react';

const CONTENT = {
  tr: {
    title: 'Hakkımızda',
    subtitle: 'İnsansız sistemler ve otonomi üzerine çalışan genç bir derin teknoloji ekibiyiz.',
    paragraph: 'Averreo Industries olarak; insan için zorlu veya tehlikeli görevleri üstlenebilecek insansız sistemler ve otonom teknolojiler geliştiriyoruz. "Gökyüzünden derinliklere, her görev için" vizyonumuzla; kapalı endüstriyel alanlardan deniz altına kadar farklı ortamlarda çalışabilen platformlar tasarlıyor, bu platformları üretirken kazandığımız mühendislik derinliğini çözüm ortaklarımızın projelerine yansıtıyoruz. Somut mühendisliğe, dürüst anlatıma ve gerçek saha performansına inanan disiplinli bir ekibiz.',
    valuesTitle: 'Değerlerimiz',
    values: [
      {
        title: 'Mühendislik Derinliği',
        desc: 'Algoritmadan donanıma, yazılımdan gömülü sistemlere kadar zinciri tek çatı altında kurguluyoruz. Kendi insansız hava ve deniz araçlarımızı geliştirirken edindiğimiz bu derinliği, projelerimizin her aşamasına yansıtıyoruz.',
        image: '/assets/images/value_engineering_depth.png'
      },
      {
        title: 'Dürüstlük ve Şeffaflık',
        desc: 'Ne yaptığımızı ve hangi aşamada olduğumuzu açıkça söyleriz; sahip olmadığımız iddiaları veya sertifikaları taşımayız. Sahadaki gerçek performansı ve mühendislik gerçekliğini her zaman ön planda tutuyoruz.',
        image: '/assets/images/value_honesty_transparency.png'
      },
      {
        title: 'Çözüm Ortaklığı',
        desc: 'Kendi platformlarımız için geliştirdiğimiz mühendislik birikimini ve otonom teknolojileri, çözüm ortaklarımızın projelerine hız kazandırmak ve değer katmak için sunuyoruz.',
        image: '/assets/images/value_solution_partnership.png'
      },
    ],
  },
  en: {
    title: 'About Us',
    subtitle: 'A young deep-tech team working on unmanned systems and autonomy.',
    paragraph: 'At Averreo Industries, we develop unmanned systems and autonomous technologies capable of taking on tasks that are difficult or dangerous for people. Guided by our vision "from the skies to the depths, for every mission," we design platforms that operate in environments ranging from confined industrial spaces to underwater, bringing the engineering depth gained while building them to our partners\' projects. We are a disciplined team that believes in concrete engineering, honest narrative, and real-world field performance.',
    valuesTitle: 'Our Values',
    values: [
      {
        title: 'Engineering Depth',
        desc: 'We build the entire chain — from algorithms to hardware, software to embedded systems — under one roof. We apply the depth gained from developing our own UAVs and USVs to every project stage.',
        image: '/assets/images/value_engineering_depth.png'
      },
      {
        title: 'Honesty & Transparency',
        desc: 'We state clearly what we do and what stage we are at; we never make claims or present certificates we do not possess. We prioritize real-world field performance and engineering reality.',
        image: '/assets/images/value_honesty_transparency.png'
      },
      {
        title: 'Solution Partnership',
        desc: "We offer the engineering experience and autonomous technologies developed for our own platforms to accelerate and add value to our solution partners' projects.",
        image: '/assets/images/value_solution_partnership.png'
      },
    ],
  },
};

export default function Hakkimizda() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    els.forEach(el => observer.observe(el));
    
    const timeout = setTimeout(() => {
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('active');
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [c]);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb pointer-events-none"></div>
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/10 bg-glow-orb pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl reveal">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter mb-8 leading-tight drop-shadow-2xl">
            {c.title}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed border-l-4 border-white/20 pl-6 md:pl-8 py-2">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Story (Single Paragraph in original large typography style) */}
      <section className="px-6 md:px-12 py-16 md:py-28 max-w-5xl mx-auto relative reveal">
        <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 text-white/5 rotate-180 pointer-events-none">
           <Quote size={150} className="md:w-[250px] md:h-[250px]" />
        </div>
        <div className="relative z-10">
          <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-tight text-white/90">
            {c.paragraph}
          </p>
        </div>
      </section>

      {/* Values (Alternating split layout like product detail capabilities with original font sizes) */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 bg-black border-t border-white/5">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 bg-glow-orb translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 reveal text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6">{c.valuesTitle}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-20 md:space-y-36">
            {c.values.map((v, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-24 reveal`}>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 relative group shadow-2xl">
                    <img 
                      src={v.image} 
                      alt={v.title} 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="w-16 h-1 bg-white/20 mb-6 md:mb-8 mx-auto md:mx-0 rounded-full"></div>
                  <h3 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-4 md:mb-8 leading-tight">{v.title}</h3>
                  <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
