import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code, Database, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

const CONTENT = {
  tr: {
    title: 'Çözümlerimiz',
    subtitle: 'Platformlarımızı ürettiğimiz Ar-Ge seviyesindeki mühendisliği, çözüm ortaklarımızın projelerine de uyguluyoruz.',
    intro: 'Kendi insansız sistemlerimizi geliştirirken yazılım, veri & yapay zekâ ve gömülü donanım zincirini tek çatı altında kuruyoruz. Bu mühendislik derinliğini, sizinle rekabet etmek için değil — projelerinizi hızlandırmak için çözüm ortaklığı modeliyle sunuyoruz.',
    domainsTitle: 'Yetkinlik Yığını',
    domains: [
      { icon: 'code', title: 'Yazılım', items: ['Backend & mikroservis mimarileri', 'Web uygulamaları & panolar', 'Mobil uygulamalar', 'Test & ölçüm yazılımı'] },
      { icon: 'data', title: 'Veri & Yapay Zekâ', items: ['Makine öğrenmesi modelleri', 'Görüntü işleme & nesne tanıma', 'Anomali tespiti', 'Veri toplama & analiz panoları'] },
      { icon: 'embedded', title: 'Gömülü & Donanım', items: ['PCB tasarımı', 'Firmware geliştirme', 'Motor & hareket kontrolü', 'Gömülü test arayüzleri (HMI)'] },
    ],
    modelTitle: 'Çalışma Modeli',
    tiers: [
      { title: 'Üretime Hazır', desc: 'Bugün devralıp projenize entegre edebileceğimiz olgun yetkinlikler.' },
      { title: 'Destek & Büyüme', desc: 'İhtiyacınızla birlikte geliştirip ölçeklediğimiz, ortak yol aldığımız alanlar.' },
    ],
    examplesTitle: 'Örnek Problem Alanları',
    examples: ['Test & ölçüm (ATE) yazılımları', 'Gömülü test ve doğrulama arayüzleri', 'Operatör arayüzleri (HMI)', 'Cihaz & protokol entegrasyonu', 'Veri toplama ve raporlama sistemleri', 'Otomasyon ve kontrol yazılımı'],
    cta: 'Çözüm Ortaklığı İçin İletişime Geçin',
  },
  en: {
    title: 'Engineering Solutions',
    subtitle: "We apply the R&D-grade engineering behind our own platforms to our partners' projects.",
    intro: 'While developing our own unmanned systems, we build the full chain — software, data & AI, and embedded hardware — under one roof. We offer this engineering depth not to compete with you, but to accelerate your projects through a solution-partnership model.',
    domainsTitle: 'Capability Stack',
    domains: [
      { icon: 'code', title: 'Software', items: ['Backend & microservice architectures', 'Web applications & dashboards', 'Mobile applications', 'Test & measurement software'] },
      { icon: 'data', title: 'Data & AI', items: ['Machine learning models', 'Computer vision & object recognition', 'Anomaly detection', 'Data acquisition & analytics dashboards'] },
      { icon: 'embedded', title: 'Embedded & Hardware', items: ['PCB design', 'Firmware development', 'Motor & motion control', 'Embedded test interfaces (HMI)'] },
    ],
    modelTitle: 'How We Work',
    tiers: [
      { title: 'Production-Ready', desc: 'Mature capabilities we can take on and integrate into your project today.' },
      { title: 'Support & Growth', desc: 'Areas we develop and scale together as your needs grow.' },
    ],
    examplesTitle: 'Example Problem Areas',
    examples: ['Test & measurement (ATE) software', 'Embedded test & validation interfaces', 'Operator interfaces (HMI)', 'Device & protocol integration', 'Data acquisition & reporting systems', 'Automation & control software'],
    cta: 'Contact Us About Partnership',
  },
};

const ICONS = { code: Code, data: Database, embedded: Cpu };

export default function Cozumler() {
  const { i18n } = useTranslation();
  const en = i18n.language === 'en';
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
        if (rect.top < window.innerHeight) {
          el.classList.add('active');
        }
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
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-16 w-full">
        
        {/* Background Image with Blur (Full Width) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img src="/cover.jpeg" alt="" className="w-full h-full object-cover opacity-30 blur-[3px] scale-[1.02]" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb z-0 pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/10 bg-glow-orb z-0 pointer-events-none"></div>
        
        {/* Inner Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-4xl reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></span>
              {en ? 'Engineering Solutions' : 'Çözümlerimiz'}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter mb-8 leading-tight drop-shadow-2xl hyphens-auto">
              {c.title}
            </h1>
            <p className="text-xl md:text-3xl text-white/80 font-light leading-relaxed mb-10 border-l-4 border-white/20 pl-6">
              {c.subtitle}
            </p>
            <div className="bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 text-base md:text-xl text-white/60 font-light leading-relaxed">
              {c.intro}
            </div>
          </div>
        </div>
      </section>

      {/* Capability stack */}
      <section className="relative px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 reveal">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-4">{c.domainsTitle}</h2>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mx-auto"></div>
        </div>
        
        <div className="space-y-20 md:space-y-32">
          {c.domains.map((d, i) => {
            const Icon = ICONS[d.icon];
            const colors = ['from-blue-500/20', 'from-emerald-500/20', 'from-orange-500/20'];
            const glowColor = colors[i % colors.length];
            
            return (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 reveal`}>
                <div className="flex-1 w-full relative">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-to-br ${glowColor} to-transparent bg-glow-orb`}></div>
                  <div className="relative aspect-square md:aspect-[4/3] rounded-3xl md:rounded-[2.5rem] bg-[#050505] border border-white/10 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-700">
                      {Icon && <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/80 group-hover:text-white transition-colors" strokeWidth={1} />}
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-center md:text-left">{d.title}</h3>
                  <div className="flex flex-col gap-4">
                    {d.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-4 p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-white/70 text-base md:text-lg font-light group-hover:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Working model / tiers */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto reveal">
        <div className="bg-[#050505] border border-white/10 rounded-3xl md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 bg-glow-orb translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-12 text-center md:text-left">{c.modelTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2"></div>
            
            {c.tiers.map((tier, i) => (
              <div key={i} className="bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-3xl p-8 md:p-10 relative group transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -translate-y-1/2"></div>
                <div className="text-4xl font-black text-white/10 mb-6 group-hover:text-white/20 transition-colors">0{i+1}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{tier.title}</h3>
                <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example problem areas - Marquee */}
      <section className="py-24 border-y border-white/5 bg-black overflow-hidden relative reveal">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <h2 className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-12">{c.examplesTitle}</h2>
        
        <div className="flex w-max pause-on-hover animate-marquee">
           <div className="flex shrink-0 px-4 items-center">
             {c.examples.map((ex, i) => (
               <div key={i} className="px-6 md:px-8 py-3 md:py-4 mx-2 md:mx-4 rounded-full bg-white/[0.03] border border-white/10 text-white/70 text-base md:text-xl font-light whitespace-nowrap hover:bg-white hover:text-black hover:border-white cursor-default transition-all duration-300">
                 {ex}
               </div>
             ))}
           </div>
           <div className="flex shrink-0 px-4 items-center">
             {c.examples.map((ex, i) => (
               <div key={`dup-${i}`} className="px-6 md:px-8 py-3 md:py-4 mx-2 md:mx-4 rounded-full bg-white/[0.03] border border-white/10 text-white/70 text-base md:text-xl font-light whitespace-nowrap hover:bg-white hover:text-black hover:border-white cursor-default transition-all duration-300">
                 {ex}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-5xl mx-auto text-center relative reveal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/5 bg-glow-orb"></div>
        <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter relative z-10">{en ? 'Ready to Accelerate Your Projects?' : 'Projelerinizi Hızlandırmaya Hazır mısınız?'}</h2>
        <Link to="/iletisim" className="relative z-10 inline-flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-white text-black text-base md:text-lg font-bold rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 group w-full sm:w-auto justify-center">
          {c.cta} 
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
            <ArrowRight size={18} />
          </div>
        </Link>
      </section>
    </div>
  );
}
