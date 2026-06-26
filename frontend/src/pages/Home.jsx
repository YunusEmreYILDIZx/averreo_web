import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane, Wrench, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const en = i18n.language === 'en';
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.subject || `${form.name} — Averreo`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:info@averreo.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass = "p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors";

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img src="/assets/images/nilufer_hybrid_drone.png" alt="Averreo Industries" className="w-full h-full object-cover" fetchpriority="high" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e1426] via-[#0c0e1466] to-black"></div>
        <div className="absolute bottom-20 left-6 md:left-12 z-10 max-w-3xl reveal">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-5">{t('hero_title')}</h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mb-8">{t('hero_desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/iletisim" className="px-7 py-3.5 bg-white text-black font-bold rounded-xl text-center hover:-translate-y-1 transition-all">{t('hero_cta')}</Link>
            <Link to="/platformlar" className="px-7 py-3.5 border border-white/20 text-white font-bold rounded-xl text-center hover:bg-white/10 transition-colors">{t('hero_cta2')}</Link>
          </div>
        </div>
      </section>

      {/* Two pillars */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t('home_what_title')}</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">{t('home_what_desc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PillarCard
            icon={<Plane />}
            title={t('pillar1_title')}
            desc={t('pillar1_desc')}
            cta={t('pillar1_cta')}
            onClick={() => navigate('/platformlar')}
          />
          <PillarCard
            icon={<Wrench />}
            title={t('pillar2_title')}
            desc={t('pillar2_desc')}
            cta={t('pillar2_cta')}
            onClick={() => navigate('/cozumler')}
          />
        </div>
      </section>

      {/* Platform preview */}
      <section className="px-6 md:px-12 pb-8 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 reveal">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{t('nav_platforms')}</h2>
          <Link to="/platformlar" className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors">
            {en ? 'View all' : 'Tümünü gör'} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {products ? Object.entries(products).map(([id, p], index) => {
            const lang = en && p.en ? 'en' : 'tr';
            const imgPath = p.image ? (p.image.startsWith('/') ? p.image : `/${p.image}`) : '/assets/images/A%20logo%20Siyah.png';
            return (
              <PlatformTile
                key={id}
                title={p[lang]?.name || p.tr.name}
                category={p[lang]?.category || p.tr.category}
                status={p.status ? (p.status[lang] || p.status.tr) : null}
                image={imgPath}
                delay={index % 4}
                onOpen={() => navigate(`/product/${id}`)}
              />
            );
          }) : <div className="text-white/50 text-center col-span-4 py-12">…</div>}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-3 tracking-tight reveal">{t('contact_title')}</h2>
        <p className="text-white/50 mb-12 text-lg reveal">{t('contact_desc')}</p>
        <form className="flex flex-col gap-4 reveal" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder={t('form_name')} aria-label={t('form_name')} required className={`flex-1 ${inputClass}`} />
            <input type="email" name="email" value={form.email} onChange={handleFormChange} placeholder={t('form_email')} aria-label={t('form_email')} required className={`flex-1 ${inputClass}`} />
          </div>
          <input type="text" name="subject" value={form.subject} onChange={handleFormChange} placeholder={t('form_subject')} aria-label={t('form_subject')} className={inputClass} />
          <textarea name="message" value={form.message} onChange={handleFormChange} placeholder={t('form_message')} aria-label={t('form_message')} required className={`${inputClass} min-h-[140px] resize-y`}></textarea>
          <button type="submit" className="mt-2 px-8 py-4 bg-white text-black font-bold rounded-xl self-start hover:-translate-y-1 hover:opacity-90 transition-all">{t('btn_send')}</button>
          {sent && <p role="status" className="text-green-400/90 text-sm mt-1">{t('form_success')}</p>}
        </form>
      </section>
    </>
  );

  function PillarCard({ icon, title, desc, cta, onClick }) {
    return (
      <button
        onClick={onClick}
        className="reveal text-left bg-[#080808] border border-white/5 rounded-2xl p-8 md:p-10 hover:-translate-y-1 hover:border-white/15 transition-all relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-12 h-12 text-white/70 mb-6 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5px]">{icon}</div>
        <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-white/50 leading-relaxed mb-6">{desc}</p>
        <span className="text-white/80 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">{cta} <ArrowRight size={16} /></span>
      </button>
    );
  }

  function PlatformTile({ title, category, status, image, delay, onOpen }) {
    return (
      <div
        className={`product-tile reveal reveal-delay-${delay} group relative overflow-hidden rounded-xl cursor-pointer bg-[#080808] border border-white/5 min-h-[280px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60`}
        onClick={onOpen}
        role="link"
        tabIndex={0}
        aria-label={title}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      >
        <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        {status && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 backdrop-blur-sm">
            {status}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="font-bold tracking-tight text-xl mb-0.5">{title}</h3>
          <p className="text-white/60 text-sm">{category}</p>
        </div>
      </div>
    );
  }
}
