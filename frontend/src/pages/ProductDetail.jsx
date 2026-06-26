import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const en = i18n.language === 'en';
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

  if (loading) return <div className="min-h-screen pt-32 text-center text-white/50">{en ? 'Loading…' : 'Yükleniyor…'}</div>;
  if (!productData) return <div className="min-h-screen pt-32 text-center text-white/50">{en ? 'Platform not found.' : 'Platform bulunamadı.'}</div>;

  const content = productData[i18n.language] || productData.tr;
  const capabilities = content.capabilities || [];
  const status = productData.status ? (en ? productData.status.en : productData.status.tr) : null;
  const imgPath = productData.image ? (productData.image.startsWith('/') ? productData.image : `/${productData.image}`) : '/assets/images/A%20logo%20Siyah.png';

  return (
    <div className="bg-[#050505] min-h-screen pb-24">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={imgPath} alt={content.name} fetchpriority="high" decoding="async" className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            <Link to="/platformlar" className="hover:text-white transition-colors">{en ? 'Platforms' : 'Platformlar'}</Link>
            <span className="text-white/30">/</span> {content.category}
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            {content.name.toUpperCase()}
          </h1>

          {status && (
            <span className="inline-block text-[11px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 mb-6">
              {status}
            </span>
          )}

          {content.tagline && (
            <p className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-light tracking-wide mb-8 max-w-4xl mx-auto">
              {content.tagline}
            </p>
          )}

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
            {content.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:info@averreo.com.tr?subject=${encodeURIComponent((en ? 'Inquiry: ' : 'Bilgi Talebi: ') + content.name)}`}
              className="px-8 py-4 w-full sm:w-auto bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 text-center"
            >
              {en ? 'Get in Touch' : 'İletişime Geçin'}
            </a>
            <Link
              to="/platformlar"
              className="px-8 py-4 w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm text-center"
            >
              {en ? 'All Platforms' : 'Tüm Platformlar'}
            </Link>
          </div>
        </div>
      </section>

      {/* The problem / vision */}
      {content.details && (
        <section className="relative px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
            “{content.details}”
          </p>
        </section>
      )}

      {/* Capabilities (qualitative) */}
      {capabilities.length > 0 && (
        <section className="px-6 md:px-12 py-16 bg-black relative border-y border-white/5">
          <div className="max-w-7xl mx-auto space-y-28 md:space-y-40">
            {capabilities.map((cap, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
                <div className="flex-1 w-full">
                  <div className="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 relative group">
                    <img src={imgPath} alt={cap.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-16 h-1 bg-white/20 mb-8 rounded-full"></div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">{cap.title}</h3>
                  <p className="text-xl text-white/50 leading-relaxed font-light">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {productData.gallery && productData.gallery.length > 0 && (
        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-white tracking-tight">{en ? 'Gallery' : 'Galeri'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/5 group">
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
