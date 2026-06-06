import { useTranslation } from 'react-i18next';

export default function Haberler() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{t('news_title')}</h1>
      <p className="text-white/50 mb-12">{t('news_subtitle')}</p>
      <div className="space-y-6">
        {/* Şimdilik boş */}
      </div>
    </div>
  );
}
