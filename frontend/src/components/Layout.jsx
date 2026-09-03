import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const TITLES = {
  '/': 'Averreo Industries — İnsansız Sistemler & Otonom Teknolojiler',
  '/platformlar': 'Platformlar — Averreo Industries',
  '/cozumler': 'Çözümlerimiz — Averreo Industries',
  '/hakkimizda': 'Hakkımızda — Averreo Industries',
  '/ekip': 'Ekip — Averreo Industries',
  '/iletisim': 'İletişim — Averreo Industries',
  '/kvkk': 'KVKK Aydınlatma Metni — Averreo Industries',
};

function TitleUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname]
      || (pathname.startsWith('/product/') ? 'Platform — Averreo Industries' : 'Averreo Industries');
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <TitleUpdater />
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
