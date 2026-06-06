import { useTranslation } from 'react-i18next';

export default function Misyon() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{t('mission_title')}</h1>
      <div className="prose prose-invert prose-lg">
        <p className="text-xl text-white/70 leading-relaxed mb-12">
          {t('mission_p1')}
        </p>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:border-white/20 transition-colors">
          <h3 className="text-2xl font-bold mb-4 text-white">{t('mission_val1_title')}</h3>
          <p className="text-white/70">
            {t('mission_val1_desc')}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8 hover:border-white/20 transition-colors">
          <h3 className="text-2xl font-bold mb-4 text-white">{t('mission_val2_title')}</h3>
          <p className="text-white/70">
            {t('mission_val2_desc')}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
          <h3 className="text-2xl font-bold mb-4 text-white">{t('mission_val3_title')}</h3>
          <p className="text-white/70">
            {t('mission_val3_desc')}
          </p>
        </div>
      </div>
    </div>
  );
}
