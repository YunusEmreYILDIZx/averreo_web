import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black pt-16 pb-8 px-6 md:px-12 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
        <div className="col-span-1 md:col-span-1.5">
          <div className="text-lg font-bold tracking-widest uppercase flex items-center gap-2 mb-4 text-white">
            <img src="/assets/images/A%20logo%20Siyah.png" alt="Averreo" className="h-6 mix-blend-screen" />
            AVERREO
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            {t('footer_desc')}
          </p>
        </div>
        
        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{t('nav_company')}</h4>
          <div className="flex flex-col space-y-3">
            <Link to="/misyon" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_mission')}</Link>
            <Link to="/haberler" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_news')}</Link>
            <Link to="/liderlik" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_leadership')}</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{t('nav_career')}</h4>
          <div className="flex flex-col space-y-3">
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">{t('footer_career1')}</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">{t('footer_career2')}</a>
            <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">{t('footer_career3')}</a>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{t('contact_title')}</h4>
          <div className="flex flex-col space-y-3">
            <a href="mailto:info@averreo.com.tr" className="text-white/70 hover:text-white text-sm transition-colors">info@averreo.com.tr</a>
            <a href="https://www.linkedin.com/company/averreo-industries" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
        <p className="text-xs text-white/30 uppercase tracking-wider">Copyright © 2026 Averreo Industries</p>
        <div className="flex space-x-6">
          <a href="#" className="text-xs text-white/30 hover:text-white/70 transition-colors">{t('footer_privacy')}</a>
          <a href="#" className="text-xs text-white/30 hover:text-white/70 transition-colors">{t('footer_terms')}</a>
        </div>
      </div>
    </footer>
  );
}
