import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Navigation, Radio } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img src="/assets/images/nilufer_hybrid_drone.png" alt="Averreo Industries" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e1426] via-[#0c0e1466] to-black"></div>
        <div className="absolute bottom-16 left-12 z-10 max-w-2xl reveal">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4">{t('hero_title')}</h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-lg">{t('hero_desc')}</p>
        </div>
      </section>

      <section className="px-6 py-4 pb-6 min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {products ? Object.entries(products).map(([id, p], index) => {
             const lang = i18n.language === 'en' && p.en ? 'en' : 'tr';
             const isFeatured = index === 0;
             const isWide = index === 4;
             
             // Ensure image path is correct, add leading slash if missing
             const imgPath = p.image ? (p.image.startsWith('/') ? p.image : `/${p.image}`) : '/assets/images/A%20logo%20Siyah.png';
             
             return (
               <ProductTile 
                 key={id}
                 id={id} 
                 title={p[lang]?.name || p.tr.name} 
                 desc={p[lang]?.category || p.tr.category} 
                 image={imgPath} 
                 delay={index % 4} 
                 featured={isFeatured}
                 wide={isWide}
               />
             );
          }) : <div className="text-white/50 text-center col-span-3 py-12">Yükleniyor...</div>}
        </div>
      </section>

      <section className="py-24 px-12 text-center max-w-4xl mx-auto reveal">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">{t('tagline_title')}</h2>
        <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">{t('tagline_desc')}</p>
      </section>

      <section className="px-6 pb-6">
        <div className="pt-16 pb-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-2">{t('tech_title')}</h2>
          <p className="text-white/50 text-base">{t('tech_subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <CapabilityCard icon={<Target />} title={t('tech1_title')} desc={t('tech1_desc')} delay="0" />
          <CapabilityCard icon={<Eye />} title={t('tech2_title')} desc={t('tech2_desc')} delay="1" />
          <CapabilityCard icon={<Navigation />} title={t('tech3_title')} desc={t('tech3_desc')} delay="2" />
          <CapabilityCard icon={<Radio />} title={t('tech4_title')} desc={t('tech4_desc')} delay="3" />
        </div>
      </section>

      <section className="py-24 px-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-3 tracking-tight reveal">{t('contact_title')}</h2>
        <p className="text-white/50 mb-12 text-lg reveal">{t('contact_desc')}</p>
        <form className="flex flex-col gap-4 reveal" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder={t('form_name')} required className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors" />
            <input type="email" placeholder={t('form_email')} required className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors" />
          </div>
          <input type="text" placeholder={t('form_subject')} className="p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors" />
          <textarea placeholder={t('form_message')} required className="p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors min-h-[140px] resize-y"></textarea>
          <button type="submit" className="mt-2 px-8 py-4 bg-white text-black font-bold rounded-xl self-start hover:-translate-y-1 hover:opacity-90 transition-all">{t('btn_send')}</button>
        </form>
      </section>
    </>
  );

  function ProductTile({ id, title, desc, image, delay, featured, wide }) {
    let classes = `product-tile reveal reveal-delay-${delay} group relative overflow-hidden rounded-xl cursor-pointer bg-[#080808] border border-white/5 `;
    if (featured) classes += "col-span-1 md:col-span-2 row-span-2 min-h-[500px] ";
    else if (wide) classes += "col-span-1 md:col-span-2 min-h-[300px] ";
    else classes += "min-h-[300px] ";

    return (
      <div className={classes} onClick={() => navigate(`/product/${id}`)}>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <h3 className={`font-bold tracking-tight mb-1 ${featured ? 'text-4xl' : 'text-2xl'}`}>{title}</h3>
          <p className="text-white/70 text-sm">{desc}</p>
        </div>
        <div className="absolute bottom-8 right-8 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white/70 stroke-[1.5px] fill-none"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </div>
      </div>
    );
  }

  function CapabilityCard({ icon, title, desc, delay }) {
    return (
      <div className={`cap-card reveal reveal-delay-${delay} bg-[#080808] border border-white/5 rounded-xl p-8 hover:-translate-y-1 hover:border-white/10 transition-all relative overflow-hidden group`}>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-12 h-12 text-white/70 mb-6 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5px]">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
      </div>
    );
  }
}
