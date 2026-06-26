import { useTranslation } from 'react-i18next';

export default function Liderlik() {
  const { t } = useTranslation();

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center">{t('leadership_title')}</h1>
      <p className="text-center text-white/50 mb-12">{t('leadership_subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-[#080808] border border-white/5 rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform">
          <img src="/assets/images/yemre.png" alt="Yunus Emre Yıldız" loading="lazy" decoding="async" className="w-40 h-40 rounded-full mx-auto mb-8 object-cover border-2 border-white/10" />
          <h3 className="text-2xl font-bold mb-2">Yunus Emre Yıldız</h3>
          <p className="text-white/50 text-base">{t('leader1_role')}</p>
        </div>
        
        <div className="bg-[#080808] border border-white/5 rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform">
          <img src="/assets/images/yasin.png" alt="Muhammet Yasin Güneş" loading="lazy" decoding="async" className="w-40 h-40 rounded-full mx-auto mb-8 object-cover border-2 border-white/10" />
          <h3 className="text-2xl font-bold mb-2">Muhammet Yasin Güneş</h3>
          <p className="text-white/50 text-base">{t('leader2_role')}</p>
        </div>

        <div className="bg-[#080808] border border-white/5 rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform">
          <img src="/assets/images/memet.png" alt="Mehmet Kukur" loading="lazy" decoding="async" className="w-40 h-40 rounded-full mx-auto mb-8 object-cover border-2 border-white/10" />
          <h3 className="text-2xl font-bold mb-2">Mehmet Kukur</h3>
          <p className="text-white/50 text-base">{t('leader3_role')}</p>
        </div>
      </div>
    </div>
  );
}
