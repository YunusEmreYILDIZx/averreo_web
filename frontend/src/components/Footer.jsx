import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  return (
    <footer className="relative bg-[#050505] pt-20 pb-8 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10 max-w-7xl mx-auto">
        <div>
          <div className="text-xl font-black tracking-widest uppercase flex items-center gap-2 mb-6 text-white group cursor-pointer w-fit">
            <img src="/assets/images/logo.png" alt="Averreo" className="h-7 group-hover:scale-105 transition-transform" />
            AVERREO
          </div>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs font-light">
            {en
              ? 'A deep-tech company developing unmanned systems and autonomous technologies — and bringing that engineering depth to its solution partners.'
              : 'İnsansız sistemler ve otonom teknolojiler geliştiren; bu mühendislik derinliğini çözüm ortaklarına da sunan bir derin teknoloji şirketi.'}
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
            Averreo Industries
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/30 font-bold uppercase tracking-[0.2em] mb-6">{en ? 'Explore' : 'Keşfet'}</h4>
          <div className="flex flex-col space-y-4">
            <Link to="/platformlar" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{t('nav_platforms')}</Link>
            <Link to="/cozumler" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{t('nav_solutions')}</Link>
            <Link to="/hakkimizda" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{t('nav_about')}</Link>
            <Link to="/ekip" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{t('nav_team')}</Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/30 font-bold uppercase tracking-[0.2em] mb-6">{t('nav_contact')}</h4>
          <div className="flex flex-col space-y-4">
            <a href="mailto:info@averreo.com.tr" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">info@averreo.com.tr</a>
            <a href="tel:+905454566440" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">0545 456 64 40</a>
            <span className="text-white/40 text-sm">OMÜ Teknokent, Atakum / Samsun</span>
            <a href="https://www.linkedin.com/company/averreo-industries" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all flex items-center gap-2">LinkedIn <span className="text-white/20">↗</span></a>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-white/30 font-bold uppercase tracking-[0.2em] mb-6">{en ? 'Legal' : 'Yasal'}</h4>
          <div className="flex flex-col space-y-4">
            <Link to="/kvkk" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{en ? 'Privacy / KVKK Notice' : 'KVKK Aydınlatma Metni'}</Link>
            <Link to="/iletisim" className="text-white/60 hover:text-white hover:translate-x-1 text-sm transition-all">{t('nav_contact')}</Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center pt-8 gap-4 max-w-7xl mx-auto">
        <p className="text-xs text-white/30 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Averreo Industries</p>
        <div className="flex space-x-6">
          <Link to="/kvkk" className="text-xs text-white/30 hover:text-white transition-colors">{en ? 'Privacy Policy' : 'Gizlilik Politikası'}</Link>
        </div>
      </div>
    </footer>
  );
}
