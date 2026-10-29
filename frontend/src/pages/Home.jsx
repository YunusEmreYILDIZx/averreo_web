import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane, Brain, ArrowRight, ChevronDown } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const en = i18n.language === 'en';
  const [products, setProducts] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const heroVideos = ['/dehliz.mp4', '/mercan.mp4', '/bereket.mp4'];
 
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
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
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          {heroVideos.map((videoSrc, index) => (
            <video 
              key={videoSrc}
              ref={el => videoRefs.current[index] = el}
              src={videoSrc} 
              muted 
              playsInline
              onEnded={() => {
                if (currentVideoIndex === index) {
                  setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
                }
              }}
              preload={index === 0 ? "auto" : "metadata"}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30"></div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 animate-bounce pointer-events-none hidden md:block">
          <ChevronDown size={26} strokeWidth={1.5} />
        </div>
      </section>

      {/* Two pillars - Premium Expansion UI */}
      <section className="px-4 md:px-8 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="text-center mb-12 md:mb-20 reveal">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{t('home_what_title')}</h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">{t('home_what_desc')}</p>
        </div>
        
        <div className="flex flex-col md:flex-row h-[700px] md:h-[600px] gap-4 md:gap-6 reveal">
          <DualPanel
            title={t('pillar1_title')}
            desc={t('pillar1_desc')}
            icon={<Plane size={32} />}
            bgImage="/assets/images/dehliz_4k.png?v=2"
            bgVideo="/dehliz.mp4"
            onClick={() => navigate('/platformlar')}
          />
          <DualPanel
            title={t('pillar2_title')}
            desc={t('pillar2_desc')}
            icon={<Brain size={32} />}
            bgImage="/assets/images/intelligence_hero.jpg"
            onClick={() => navigate('/intelligence')}
          />
        </div>
      </section>

      {/* Platform preview */}
      <section className="px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 reveal">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{t('nav_platforms')}</h2>
          <Link to="/platformlar" className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors">
            {en ? 'View all' : 'Tümünü gör'} <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* Horizontal Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {products ? Object.entries(products).map(([id, p], index) => {
            const lang = en && p.en ? 'en' : 'tr';
            const imgPath = p.image ? (p.image.startsWith('/') ? p.image : `/${p.image}`) : '/assets/images/A%20logo%20Siyah.png';
            return (
              <div key={id} className="min-w-[85vw] md:min-w-[40vw] lg:min-w-[300px] flex-1 snap-start">
                <PlatformTile
                  title={p[lang]?.name || p.tr.name}
                  category={p[lang]?.category || p.tr.category}
                  status={p.status ? (p.status[lang] || p.status.tr) : null}
                  image={imgPath}
                  video={p.video ? `/${p.video}` : null}
                  delay={index % 4}
                  onOpen={() => navigate(`/product/${id}`)}
                />
              </div>
            );
          }) : <div className="text-white/50 text-center w-full py-12">…</div>}
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

  function DualPanel({ title, desc, icon, bgImage, bgVideo, onClick }) {
    const videoRef = useRef(null);
    const playPromiseRef = useRef(null);

    const handleMouseEnter = () => {
      if (videoRef.current) {
        playPromiseRef.current = videoRef.current.play();
        if (playPromiseRef.current !== undefined) {
          playPromiseRef.current.catch(() => {});
        }
      }
    };

    const handleMouseLeave = () => {
      if (videoRef.current) {
        if (playPromiseRef.current !== undefined && playPromiseRef.current !== null) {
          playPromiseRef.current.then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }).catch(() => {});
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    };

    return (
      <div 
         className="group relative flex-1 hover:flex-[1.8] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/10 bg-[#080808]"
         onClick={onClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <img src={bgImage} alt="" className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${bgVideo ? 'opacity-20 group-hover:opacity-0 mix-blend-luminosity' : 'opacity-30 group-hover:opacity-60'}`} />
         
         {bgVideo && (
            <video 
              ref={videoRef}
              src={bgVideo}
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 transition-opacity duration-700 mix-blend-screen"
            />
         )}

         <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
         <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center mb-6 md:mb-8 border border-white/10 group-hover:-translate-y-4 group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-700">
               <div className="text-white opacity-80 group-hover:opacity-100 transition-opacity">{icon}</div>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 transform group-hover:-translate-y-2 transition-transform duration-700">{title}</h3>
            
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
               <div className="overflow-hidden">
                 <p className="text-white/70 text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                   {desc}
                 </p>
                 <span className="inline-flex items-center gap-2 mt-6 text-white text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                   {en ? 'Explore' : 'Keşfet'} <ArrowRight size={16} />
                 </span>
               </div>
            </div>
         </div>
      </div>
    );
  }

  function PlatformTile({ title, category, status, image, video, delay, onOpen }) {
    const videoRef = useRef(null);
    const playPromiseRef = useRef(null);

    const handleMouseEnter = () => {
      if (videoRef.current) {
        playPromiseRef.current = videoRef.current.play();
        if (playPromiseRef.current !== undefined) {
          playPromiseRef.current.catch(() => {});
        }
      }
    };

    const handleMouseLeave = () => {
      if (videoRef.current) {
        if (playPromiseRef.current !== undefined && playPromiseRef.current !== null) {
          playPromiseRef.current.then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }).catch(() => {});
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    };

    return (
      <div
        className={`product-tile group relative overflow-hidden rounded-xl cursor-pointer bg-[#080808] border border-white/5 min-h-[280px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 h-full`}
        onClick={onOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="link"
        tabIndex={0}
        aria-label={title}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      >
        <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover absolute inset-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" />
        {video && (
          <video 
            ref={videoRef}
            src={video}
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
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
