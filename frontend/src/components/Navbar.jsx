import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
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
    setIsMobileMenuOpen(false); // Close menu on language change
  };

  const defenseProducts = products ? Object.entries(products).filter(([_, p]) => p.tr.breadcrumb.toLowerCase().includes('savunma')) : [];
  const industryProducts = products ? Object.entries(products).filter(([_, p]) => p.tr.breadcrumb.toLowerCase().includes('endüstri')) : [];

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
          <button className="text-white/70 hover:text-white px-4 h-16 flex items-center gap-1 font-medium transition-colors">
            {t('nav_defense')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-[#080808]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 gap-1 shadow-2xl w-48">
            {defenseProducts.length > 0 ? defenseProducts.map(([id, p]) => (
              <Link key={id} to={`/product/${id}`} className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap">
                {i18n.language === 'en' && p.en ? p.en.name : p.tr.name}
              </Link>
            )) : <span className="text-white/50 px-4 py-3 text-sm">Yükleniyor...</span>}
          </div>
        </div>

        <div className="group relative">
          <button className="text-white/70 hover:text-white px-4 h-16 flex items-center gap-1 font-medium transition-colors">
            {t('nav_industry')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-[#080808]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 gap-1 shadow-2xl w-48">
            {industryProducts.length > 0 ? industryProducts.map(([id, p]) => (
              <Link key={id} to={`/product/${id}`} className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-colors font-medium whitespace-nowrap">
                {i18n.language === 'en' && p.en ? p.en.name : p.tr.name}
              </Link>
            )) : <span className="text-white/50 px-4 py-3 text-sm">Yükleniyor...</span>}
          </div>
        </div>

        <div className="group relative">
          <button className="text-white/70 hover:text-white px-4 h-16 flex items-center gap-1 font-medium transition-colors">
            {t('nav_company')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-16 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-[#080808]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 gap-2 shadow-2xl w-56">
            <Link to="/misyon" className="text-white/70 hover:text-white hover:bg-white/5 p-3 rounded-xl flex flex-col">
              <strong className="text-white">{t('nav_mission')}</strong>
              <span className="text-xs text-white/50">{t('nav_mission_desc')}</span>
            </Link>
            <Link to="/haberler" className="text-white/70 hover:text-white hover:bg-white/5 p-3 rounded-xl flex flex-col">
              <strong className="text-white">{t('nav_news')}</strong>
              <span className="text-xs text-white/50">{t('nav_news_desc')}</span>
            </Link>
            <Link to="/liderlik" className="text-white/70 hover:text-white hover:bg-white/5 p-3 rounded-xl flex flex-col">
              <strong className="text-white">{t('nav_leadership')}</strong>
              <span className="text-xs text-white/50">{t('nav_leadership_desc')}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button onClick={() => changeLanguage('tr')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${i18n.language === 'tr' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}>TR</button>
          <button onClick={() => changeLanguage('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${i18n.language === 'en' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'}`}>EN</button>
        </div>
      </div>
      
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[#050505] border-t border-white/10 flex flex-col md:hidden overflow-y-auto pb-10">
          <div className="flex flex-col p-6 space-y-8">
            
            {/* Savunma */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">{t('nav_defense')}</h3>
              <div className="flex flex-col gap-3">
                {defenseProducts.map(([id, p]) => (
                  <Link key={id} to={`/product/${id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">
                    {i18n.language === 'en' && p.en ? p.en.name : p.tr.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Endüstri */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">{t('nav_industry')}</h3>
              <div className="flex flex-col gap-3">
                {industryProducts.map(([id, p]) => (
                  <Link key={id} to={`/product/${id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">
                    {i18n.language === 'en' && p.en ? p.en.name : p.tr.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Kurumsal */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">{t('nav_company')}</h3>
              <div className="flex flex-col gap-3">
                <Link to="/misyon" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_mission')}</Link>
                <Link to="/haberler" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_news')}</Link>
                <Link to="/liderlik" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium">{t('nav_leadership')}</Link>
              </div>
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
