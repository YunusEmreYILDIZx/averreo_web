import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Quote } from 'lucide-react';

const CONTENT = {
  tr: {
    title: 'Hakkımızda',
    subtitle: 'Samsun merkezli, insansız sistemler ve otonomi üzerine çalışan genç bir derin teknoloji ekibiyiz.',
    paragraphs: [
      'Averreo Industries olarak, insan için zorlu veya tehlikeli görevleri üstlenebilecek insansız sistemler ve otonom teknolojiler geliştiriyoruz. Odağımız; algılama, otonom navigasyon ve karar destek yetenekleriyle keşif ve denetimi daha güvenli ve daha verimli hale getirmek.',
      'Vizyonumuzu tek bir cümlede topluyoruz: gökyüzünden derinliklere, her görev için. Kapalı endüstriyel alanlardan deniz altına kadar farklı ortamlarda çalışabilen platformlar tasarlıyor; bu platformları üretirken kazandığımız mühendislik derinliğini çözüm ortaklarımızın projelerine de taşıyoruz.',
      'Genç ama disiplinli bir ekibiz. Büyük iddialar yerine somut mühendisliğe, gösterişli rakamlar yerine dürüst anlatıma inanıyoruz. Henüz hangi aşamada olduğumuzu açıkça söyler, sahip olmadığımız bir sertifikayı ya da referansı iddia etmeyiz.',
    ],
    legalTitle: 'Kurumsal',
    legalText: 'Averreo Industries — Samsun, Türkiye. Detaylı kurumsal ve iletişim bilgileri İletişim sayfasında yer alır.',
    valuesTitle: 'Değerlerimiz',
    values: [
      { title: 'Mühendislik Derinliği', desc: 'Algoritmadan donanıma, yazılımdan gömülü sistemlere kadar zinciri tek çatı altında kurguluyoruz.' },
      { title: 'Dürüstlük ve Şeffaflık', desc: 'Ne yaptığımızı ve hangi aşamada olduğumuzu açıkça söyleriz; sahip olmadığımız iddiaları taşımayız.' },
      { title: 'Çözüm Ortaklığı', desc: 'Kendi platformlarımız için geliştirdiğimiz mühendisliği, çözüm ortaklarımızın projelerine de uyguluyoruz.' },
    ],
  },
  en: {
    title: 'About Us',
    subtitle: 'A young deep-tech team based in Samsun, working on unmanned systems and autonomy.',
    paragraphs: [
      'At Averreo Industries, we develop unmanned systems and autonomous technologies capable of taking on tasks that are difficult or dangerous for people. Our focus is making reconnaissance and inspection safer and more efficient through perception, autonomous navigation, and decision-support capabilities.',
      'We capture our vision in a single line: from the skies to the depths, for every mission. We design platforms that operate across different environments — from confined industrial spaces to underwater — and bring the engineering depth gained while building them to our partners’ projects.',
      'We are a young but disciplined team. We believe in concrete engineering over big claims, and honest narrative over flashy numbers. We state clearly what stage we are at, and we never claim a certificate or reference we do not hold.',
    ],
    legalTitle: 'Corporate',
    legalText: 'Averreo Industries — Samsun, Türkiye. Detailed corporate and contact information is available on the Contact page.',
    valuesTitle: 'Our Values',
    values: [
      { title: 'Engineering Depth', desc: 'We build the full chain — from algorithms to hardware, from software to embedded systems — under one roof.' },
      { title: 'Honesty & Transparency', desc: 'We say clearly what we do and what stage we are at; we never carry claims we cannot back.' },
      { title: 'Partnership', desc: "We apply the engineering we develop for our own platforms to our partners' projects too." },
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
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb"></div>
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/10 bg-glow-orb"></div>
        
        <div className="relative z-10 max-w-4xl reveal">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter mb-8 leading-tight drop-shadow-2xl">
            {c.title}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed border-l-4 border-white/20 pl-6 md:pl-8 py-2">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Story (Blockquote) */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-5xl mx-auto relative reveal">
        <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 text-white/5 rotate-180">
           <Quote size={150} className="md:w-[250px] md:h-[250px]" />
        </div>
        <div className="relative z-10 space-y-12 md:space-y-16">
          {c.paragraphs.map((p, i) => (
            <p key={i} className={`text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-tight ${i === 1 ? 'text-white' : 'text-white/60'}`}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Corporate Info */}
      <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto reveal">
         <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-6 group hover:bg-white/[0.05] transition-colors">
           <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
             <div className="w-8 h-8 bg-blue-500/80 rounded-full blur-[8px] group-hover:blur-[12px] group-hover:bg-blue-400 transition-all animate-pulse"></div>
           </div>
           <div>
             <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-2">{c.legalTitle}</h2>
             <p className="text-white/70 leading-relaxed text-base md:text-lg">{c.legalText}</p>
           </div>
         </div>
      </section>

      {/* Values */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 bg-glow-orb translate-x-1/2 translate-y-1/2"></div>
        
        <div className="mb-16 md:mb-20 reveal text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{c.valuesTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 reveal">
          {c.values.map((v, i) => (
            <div key={i} className="group relative bg-[#050505] rounded-[2.5rem] p-10 md:p-12 overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-0"></div>
              
              <div className="text-6xl md:text-7xl font-black text-white/5 mb-8 group-hover:text-white/10 transition-colors duration-500">
                0{i+1}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-white/90 group-hover:text-white transition-colors">{v.title}</h3>
              <p className="text-white/50 text-base md:text-lg leading-relaxed group-hover:text-white/70 transition-colors">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
