import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  return (
    <footer className="bg-black pt-16 pb-8 px-6 md:px-12 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
        <div>
          <div className="text-lg font-bold tracking-widest uppercase flex items-center gap-2 mb-4 text-white">
            <img src="/assets/images/A%20logo%20Siyah.png" alt="Averreo" className="h-6 mix-blend-screen" />
            AVERREO
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            {en
              ? 'A deep-tech company developing unmanned systems and autonomous technologies — and bringing that engineering depth to its solution partners.'
              : 'İnsansız sistemler ve otonom teknolojiler geliştiren; bu mühendislik derinliğini çözüm ortaklarına da sunan bir derin teknoloji şirketi.'}
          </p>
          <p className="text-xs text-white/30 mt-4">Averreo Industries</p>
        </div>

        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{en ? 'Explore' : 'Keşfet'}</h4>
          <div className="flex flex-col space-y-3">
            <Link to="/platformlar" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_platforms')}</Link>
            <Link to="/cozumler" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_solutions')}</Link>
            <Link to="/hakkimizda" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_about')}</Link>
            <Link to="/ekip" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_team')}</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{t('nav_contact')}</h4>
          <div className="flex flex-col space-y-3">
            <a href="mailto:info@averreo.com.tr" className="text-white/70 hover:text-white text-sm transition-colors">info@averreo.com.tr</a>
            <a href="tel:+905454566440" className="text-white/70 hover:text-white text-sm transition-colors">0545 456 64 40</a>
            <span className="text-white/50 text-sm">OMÜ Teknokent, Atakum / Samsun</span>
            <a href="https://www.linkedin.com/company/averreo-industries" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">LinkedIn</a>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/50 uppercase tracking-widest mb-5">{en ? 'Legal' : 'Yasal'}</h4>
          <div className="flex flex-col space-y-3">
            <Link to="/kvkk" className="text-white/70 hover:text-white text-sm transition-colors">{en ? 'Privacy / KVKK Notice' : 'KVKK Aydınlatma Metni'}</Link>
            <Link to="/iletisim" className="text-white/70 hover:text-white text-sm transition-colors">{t('nav_contact')}</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
        <p className="text-xs text-white/30 uppercase tracking-wider">© 2026 Averreo Industries</p>
        <div className="flex space-x-6">
          <Link to="/kvkk" className="text-xs text-white/30 hover:text-white/70 transition-colors">{en ? 'KVKK' : 'KVKK'}</Link>
        </div>
      </div>
    </footer>
  );
}
