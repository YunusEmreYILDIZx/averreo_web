import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const en = i18n.language === 'en';
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <img src="/assets/images/logo.png" alt="Loading" className="h-12 md:h-16 animate-pulse opacity-50" />
    </div>
  );
  if (!productData) return <div className="min-h-screen pt-32 text-center text-white/50">{en ? 'Platform not found.' : 'Platform bulunamadı.'}</div>;

  const content = productData[i18n.language] || productData.tr;
  const capabilities = content.capabilities || [];
  const status = productData.status ? (en ? productData.status.en : productData.status.tr) : null;
  const imgPath = productData.image ? (productData.image.startsWith('/') ? productData.image : `/${productData.image}`) : '/assets/images/A%20logo%20Siyah.png';
  const videoPath = productData.video ? `/${productData.video}` : null;

  return (
    <div className="bg-[#050505] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {videoPath ? (
            <video 
              src={videoPath} 
              autoPlay 
              muted 
              loop 
              playsInline
              onCanPlay={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${isVideoLoaded ? 'opacity-50' : 'opacity-0'}`}
            />
          ) : (
            <img src={imgPath} alt={content.name} fetchpriority="high" decoding="async" className="w-full h-full object-cover opacity-40 scale-105" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[#050505] pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <Link to="/platformlar" className="hover:text-white transition-colors">{en ? 'Platforms' : 'Platformlar'}</Link>
            <span className="text-white/30">/</span> {content.category}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl hyphens-auto">
            {content.name.toUpperCase()}
          </h1>

          {status && (
            <span className="inline-block text-[11px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 mb-6">
              {status}
            </span>
          )}

          {content.tagline && (
            <p className="text-xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-light tracking-wide mb-8 max-w-4xl mx-auto leading-snug">
              {content.tagline}
            </p>
          )}

          <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light px-4 md:px-0">
            {content.description}
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {videoPath && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 w-full sm:w-auto bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 backdrop-blur-md text-center flex items-center justify-center gap-3 group"
              >
                <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
                {en ? 'Watch Video' : 'Videoyu İzle'}
              </button>
            )}
            <a
              href={`mailto:info@averreo.com.tr?subject=${encodeURIComponent((en ? 'Inquiry: ' : 'Bilgi Talebi: ') + content.name)}`}
              className="px-8 py-4 w-full sm:w-auto bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 text-center"
            >
              {en ? 'Get in Touch' : 'İletişime Geçin'}
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && videoPath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg px-4">
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 md:top-8 right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-6xl p-0 md:p-8 animate-in fade-in zoom-in duration-300">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-12 md:mt-0">
              <video 
                src={videoPath} 
                controls 
                autoPlay 
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}

      {/* The problem / vision */}
      {content.details && (
        <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-3xl font-light leading-relaxed text-white/80">
            “{content.details}”
          </p>
        </section>
      )}

      {/* Capabilities (qualitative) */}
      {capabilities.length > 0 && (
        <section className="px-6 md:px-12 py-12 md:py-16 bg-black relative border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-20 md:space-y-40">
            {capabilities.map((cap, idx) => {
              const capImgPath = cap.image ? (cap.image.startsWith('/') ? cap.image : `/${cap.image}`) : imgPath;
              return (
                <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-24`}>
                  <div className="flex-1 w-full">
                    <div className="aspect-[4/3] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 relative group">
                      <img src={capImgPath} alt={cap.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="w-16 h-1 bg-white/20 mb-6 md:mb-8 mx-auto md:mx-0 rounded-full"></div>
                    <h3 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-4 md:mb-8 leading-tight">{cap.title}</h3>
                    <p className="text-base md:text-xl text-white/60 leading-relaxed font-light">{cap.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Gallery */}
      {productData.gallery && productData.gallery.length > 0 && (
        <section className="px-6 md:px-12 py-12 md:py-16 max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-white tracking-tight text-center md:text-left">{en ? 'Gallery' : 'Galeri'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {productData.gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 group">
                <img src={img} alt="Galeri" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="px-6 md:px-12 pt-16 max-w-7xl mx-auto flex justify-between text-sm">
        <Link to="/platformlar" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> {en ? 'All Platforms' : 'Tüm Platformlar'}
        </Link>
        <Link to="/iletisim" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
          {en ? 'Contact' : 'İletişim'} <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

