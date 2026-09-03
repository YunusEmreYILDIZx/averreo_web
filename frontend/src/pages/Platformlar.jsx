import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Activity } from 'lucide-react';

export default function Platformlar() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const en = i18n.language === 'en';
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error(err));
  }, []);

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
      els.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active'); });
    }, 100);
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, [products]);

  const entries = products ? Object.entries(products) : [];

  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <img src="/assets/images/logo.png" alt="Loading" className="h-12 md:h-16 animate-pulse opacity-50" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-20 md:pb-32 reveal">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 bg-glow-orb translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <header className="max-w-4xl mb-20 md:mb-32 relative z-10 text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-8 mx-auto md:mx-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></span>
            {en ? 'Autonomous Systems' : 'Otonom Sistemler'}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">
            {en ? 'Platforms' : 'Platformlar'}
          </h1>
          <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed border-l-4 border-white/20 pl-6 py-2 mx-auto md:mx-0 max-w-3xl">
            {en
              ? 'From confined spaces to deep waters — the unmanned systems we are developing for reconnaissance and inspection.'
              : 'Kapalı alanlardan derin sulara — keşif ve denetim için geliştirdiğimiz insansız sistemler.'}
          </p>
        </header>

        <div className="space-y-24 md:space-y-40 relative z-10">
          {entries.length > 0 ? entries.map(([id, p], idx) => {
            const c = en && p.en ? p.en : p.tr;
            const status = p.status ? (en ? p.status.en : p.status.tr) : null;
            const imgPath = p.image ? (p.image.startsWith('/') ? p.image : `/${p.image}`) : '/assets/images/A%20logo%20Siyah.png';
            const glowColors = ['bg-blue-500/10', 'bg-emerald-500/10', 'bg-purple-500/10', 'bg-amber-500/10'];
            const glow = glowColors[idx % glowColors.length];

            return (
              <article
                key={id}
                onClick={() => navigate(`/product/${id}`)}
                className={`group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center reveal cursor-pointer`}
              >
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] md:h-[800px] ${glow} bg-glow-orb rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                <div className={`relative ${idx % 2 === 1 ? 'md:order-2' : ''} w-full aspect-[4/3] md:aspect-[5/4] rounded-[2.5rem] overflow-hidden bg-[#050505] border border-white/10 group-hover:border-white/30 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]`}>
                  <img src={imgPath} alt={c.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge Over Image */}
                  {status && (
                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white/90 text-xs uppercase tracking-widest font-bold">
                      <Activity size={16} className="text-emerald-400 animate-pulse" />
                      {status}
                    </div>
                  )}
                </div>

                <div className={`flex flex-col justify-center relative z-10 ${idx % 2 === 1 ? 'md:text-right md:items-end' : ''}`}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    {idx % 2 === 1 && <span className="hidden md:block w-12 h-px bg-white/20"></span>}
                    <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">{c.category}</p>
                    {idx % 2 === 0 && <span className="hidden md:block w-12 h-px bg-white/20"></span>}
                  </div>
                  
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 group-hover:text-white transition-colors">{c.name}</h2>
                  
                  <p className="text-lg md:text-xl lg:text-2xl text-white/50 leading-relaxed font-light mb-10 max-w-lg group-hover:text-white/70 transition-colors">
                    {c.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 font-bold text-sm md:text-base group/btn">
                    {en ? 'Explore Platform' : 'Platformu Keşfet'}
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            );
          }) : (
            <div className="flex justify-center py-32">
              <span className="w-6 h-6 rounded-full bg-white/20 animate-ping"></span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
