import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play, Clock, Shield, Map, Sun, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Clock, Shield, Map, Sun
};

export default function ProductDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProductData(data[id]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-white/50">Yükleniyor...</div>;
  if (!productData) return <div className="min-h-screen pt-32 text-center text-white/50">Ürün bulunamadı.</div>;

  const content = productData[i18n.language] || productData.tr;
  const features = content.features || [];
  const highlights = content.highlights || [];
  const capabilities = content.capabilities || [];
  const imgPath = productData.image ? (productData.image.startsWith('/') ? productData.image : `/${productData.image}`) : '/assets/images/A%20logo%20Siyah.png';

  return (
    <div className="bg-[#050505] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {productData.video ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
              <source src={productData.video} type="video/mp4" />
            </video>
          ) : (
            <img src={imgPath} alt={content.name} fetchpriority="high" decoding="async" className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#050505]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center mt-24">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <Link to="/" className="hover:text-white transition-colors">Averreo</Link> / {content.category}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            {content.name.toUpperCase()}
          </h1>
          
          {content.tagline && (
            <p className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-light tracking-wide mb-8 max-w-4xl mx-auto">
              {content.tagline}
            </p>
          )}

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            {content.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:info@averreo.com.tr?subject=${encodeURIComponent((i18n.language === 'en' ? 'Demo Request: ' : 'Demo Talebi: ') + content.name)}`}
              className="px-8 py-4 w-full sm:w-auto bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 text-center"
            >
              {i18n.language === 'en' ? 'Request a Demo' : 'Demo Talebi'}
            </a>
            <button
              type="button"
              onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              {i18n.language === 'en' ? 'Technical Specs' : 'Teknik Özellikler'}
            </button>
          </div>
        </div>
      </section>

      {/* Details & Highlights */}
      {(content.details || highlights.length > 0) && (
        <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto">
          {content.details && (
            <div className="max-w-4xl mx-auto text-center mb-20">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                "{content.details}"
              </p>
            </div>
          )}

          {highlights.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {highlights.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || CheckCircle2;
                return (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-md flex flex-col items-center text-center hover:bg-white/[0.06] transition-colors group cursor-default">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                      <IconComponent className="w-8 h-8 text-white/80" />
                    </div>
                    <h4 className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">{item.title}</h4>
                    <p className="text-white font-bold text-lg md:text-xl">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Capabilities / Showcases */}
      {capabilities.length > 0 && (
        <section className="px-6 md:px-12 py-32 bg-black relative border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-40">
            {capabilities.map((cap, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
                <div className="flex-1 w-full relative">
                  <div className="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center relative group">
                    <img src={imgPath} alt={cap.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-16 h-1 bg-white/20 mb-8 rounded-full"></div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">{cap.title}</h3>
                  <p className="text-xl text-white/50 leading-relaxed font-light">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Specifications & Video */}
      <section id="specs" className="px-6 md:px-12 py-32 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-4xl font-bold mb-12 text-white tracking-tight">
              {i18n.language === 'en' ? 'Technical Specs' : 'Teknik Özellikler'}
            </h3>
            <div className="flex flex-col space-y-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-colors">
                  <span className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-2 sm:mb-0">{feat.title}</span>
                  <span className="text-white font-bold text-xl text-left sm:text-right">{feat.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold mb-12 text-white tracking-tight">
              {i18n.language === 'en' ? 'Operational Video' : 'Operasyonel Video'}
            </h3>
            {productData.video ? (
              <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-black border border-white/10 flex items-center justify-center group cursor-pointer flex-1">
                <img src={imgPath} alt="Video Thumbnail" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="relative z-10 w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-xl group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <Play className="w-10 h-10 ml-2 text-white group-hover:text-black transition-colors" fill="currentColor" />
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center flex-1">
                <span className="text-white/30 text-lg font-medium tracking-wide">
                  {i18n.language === 'en' ? 'Video in preparation' : 'Video hazırlanıyor'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {productData.gallery && productData.gallery.length > 0 && (
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-white/5">
          <h3 className="text-4xl font-bold mb-12 text-white tracking-tight">
            {i18n.language === 'en' ? 'Gallery' : 'Galeri'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer">
                <img src={img} alt="Galeri" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
