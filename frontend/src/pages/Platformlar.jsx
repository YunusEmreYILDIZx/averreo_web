import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

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

  const entries = products ? Object.entries(products) : [];

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <header className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">
          {en ? 'Platforms' : 'Platformlar'}
        </h1>
        <p className="text-lg md:text-xl text-white/60 leading-relaxed">
          {en
            ? 'From confined spaces to deep waters — the unmanned systems we are developing for reconnaissance and inspection. These are concepts under active R&D; we describe the problem we solve and the vision behind each, not unverified figures.'
            : 'Kapalı alanlardan derin sulara — keşif ve denetim için geliştirdiğimiz insansız sistemler. Bunlar aktif Ar-Ge aşamasındaki konseptlerdir; her birinde çözdüğümüz problemi ve arkasındaki vizyonu anlatıyoruz, doğrulanmamış sayılar değil.'}
        </p>
      </header>

      <div className="space-y-5">
        {entries.length > 0 ? entries.map(([id, p], idx) => {
          const c = en && p.en ? p.en : p.tr;
          const status = p.status ? (en ? p.status.en : p.status.tr) : null;
          const imgPath = p.image ? (p.image.startsWith('/') ? p.image : `/${p.image}`) : '/assets/images/A%20logo%20Siyah.png';
          return (
            <article
              key={id}
              onClick={() => navigate(`/product/${id}`)}
              className={`group grid grid-cols-1 md:grid-cols-2 ${idx % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''} bg-[#080808] border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60`}
              role="link"
              tabIndex={0}
              aria-label={c.name}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/product/${id}`); } }}
            >
              <div className="relative min-h-[260px] md:min-h-[340px] overflow-hidden">
                <img src={imgPath} alt={c.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {status && (
                  <span className="self-start text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 mb-5">
                    {status}
                  </span>
                )}
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{c.category}</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{c.name}</h2>
                <p className="text-white/60 leading-relaxed mb-6">{c.description}</p>
                <span className="text-white/80 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  {en ? 'Learn more' : 'Detaylar'} <ArrowRight size={16} />
                </span>
              </div>
            </article>
          );
        }) : <div className="text-white/40 py-20 text-center">…</div>}
      </div>
    </div>
  );
}
