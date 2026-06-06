import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

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
  const imgPath = productData.image ? (productData.image.startsWith('/') ? productData.image : `/${productData.image}`) : '/assets/images/A%20logo%20Siyah.png';

  return (
    <div className="pb-24">
      <section className="relative h-[60vh] min-h-[400px] flex items-end px-12 pb-16 overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img src={imgPath} alt={content.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="text-sm text-white/50 uppercase tracking-[1.5px] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Averreo</Link> / {productData.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">{content.title}</h1>
          <h2 className="text-xl text-white/50 font-medium mb-6">{content.subtitle}</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-6">{content.description}</p>
          {content.details && (
            <div className="text-base text-white/60 leading-relaxed whitespace-pre-wrap">
              {content.details}
            </div>
          )}
        </div>
      </section>

      <section className="px-12 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white tracking-tight">Teknik Özellikler</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-xl backdrop-blur-md hover:-translate-y-1 transition-transform">
                  <h4 className="text-xs text-white/50 uppercase tracking-widest mb-2">{feat.title}</h4>
                  <p className="text-xl font-bold">{feat.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white tracking-tight">Operasyonel Video</h3>
            {productData.video ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center group cursor-pointer">
                <img src={imgPath} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="relative z-10 w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-110 transition-all">
                  <Play className="w-6 h-6 ml-1 text-white" fill="white" />
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-white/30">Video hazırlanıyor</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {productData.gallery && productData.gallery.length > 0 && (
        <section className="px-12 py-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-white tracking-tight">Galeri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productData.gallery.map((img, idx) => (
              <img key={idx} src={img} alt="Galeri" className="w-full aspect-[4/3] object-cover rounded-xl border border-white/5 hover:scale-[1.02] transition-transform duration-500 cursor-pointer" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
