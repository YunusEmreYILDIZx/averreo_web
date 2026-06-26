import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err));
    };

    fetchProducts();

    window.addEventListener('productsUpdated', fetchProducts);
    return () => window.removeEventListener('productsUpdated', fetchProducts);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsMobileMenuOpen(false);
  };

  const platforms = products ? Object.entries(products) : [];
  const nameOf = (p) => (i18n.language === 'en' && p.en ? p.en.name : p.tr.name);

  const navLinkClass = "text-white/70 hover:text-white px-4 h-16 flex items-center font-medium transition-colors";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-black/95 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="flex items-center">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-bold tracking-widest uppercase flex items-center gap-2">
          <img src="/assets/images/A%20logo%20Siyah.png" alt="Averreo" className="h-6 md:h-7 mix-blend-screen" />
          AVERREO
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-1">
        <div className="group relative">
          <button className="text-white/70 hover:text-white px-4 h-16 flex items-center gap-1 font-medium transition-colors" aria-haspopup="true">
            {t('nav_platforms')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 hidden group-hover:flex group-focus-within:flex flex-col bg-[#080808]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 gap-1 shadow-2xl w-56">
            {platforms.length > 0 ? platforms.map(([id, p]) => (
              <Link key={id} to={`/product/${id}`} className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap">
                {nameOf(p)}
              </Link>
            )) : <span className="text-white/50 px-4 py-3 text-sm">…</span>}
            <Link to="/platformlar" className="text-white/50 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl transition-colors text-xs uppercase tracking-widest mt-1 border-t border-white/5 pt-3">
              {i18n.language === 'en' ? 'All Platforms' : 'Tüm Platformlar'}
            </Link>
          </div>
        </div>

        <Link to="/cozumler" className={navLinkClass}>{t('nav_solutions')}</Link>
        <Link to="/hakkimizda" className={navLinkClass}>{t('nav_about')}</Link>
        <Link to="/ekip" className={navLinkClass}>{t('nav_team')}</Link>
        <Link to="/iletisim" className={navLinkClass}>{t('nav_contact')}</Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button onClick={() => changeLanguage('tr')} aria-label="Türkçe" aria-pressed={i18n.language === 'tr'} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${i18n.language === 'tr' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}>TR</button>
          <button onClick={() => changeLanguage('en')} aria-label="English" aria-pressed={i18n.language === 'en'} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${i18n.language === 'en' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}>EN</button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[#050505] border-t border-white/10 flex flex-col md:hidden overflow-y-auto pb-10">
          <div className="flex flex-col p-6 space-y-8">

            {/* Platformlar */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">{t('nav_platforms')}</h3>
              <div className="flex flex-col gap-3">
                {platforms.map(([id, p]) => (
                  <Link key={id} to={`/product/${id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">
                    {nameOf(p)}
                  </Link>
                ))}
                <Link to="/platformlar" onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 text-sm uppercase tracking-widest mt-1">
                  {i18n.language === 'en' ? 'All Platforms' : 'Tüm Platformlar'}
                </Link>
              </div>
            </div>

            {/* Diğer sayfalar */}
            <div className="flex flex-col gap-3">
              <Link to="/cozumler" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_solutions')}</Link>
              <Link to="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_about')}</Link>
              <Link to="/ekip" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_team')}</Link>
              <Link to="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_contact')}</Link>
            </div>

            {/* Language Selection */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Dil / Language</h3>
              <div className="flex gap-4">
                <button onClick={() => changeLanguage('tr')} className={`flex-1 py-3 text-sm font-bold rounded-xl border ${i18n.language === 'tr' ? 'bg-white text-black border-white' : 'text-white/50 border-white/10'}`}>Türkçe</button>
                <button onClick={() => changeLanguage('en')} className={`flex-1 py-3 text-sm font-bold rounded-xl border ${i18n.language === 'en' ? 'bg-white text-black border-white' : 'text-white/50 border-white/10'}`}>English</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
