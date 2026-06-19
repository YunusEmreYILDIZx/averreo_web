import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    // Sadece path değiştiğinde (aynı sayfada hash vb değiştiğinde değil)
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      
      // 1. Önce overlay'in tam belirginleşmesi için bekle (300ms)
      // Sonra ekranı yukarı kaydır ve DOM'u yeni sayfaya geçir
      const fadeTimer = setTimeout(() => {
        window.scrollTo(0, 0);
        setDisplayLocation(location);
      }, 150);

      // Hızlandırılmış geçiş (Örn: 800ms)
      const totalTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(totalTimer);
      };
    }
  }, [location.pathname]);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] transition-opacity duration-300 pointer-events-none
          ${isTransitioning ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <img 
          src="/assets/images/A%20logo%20Siyah.png" 
          alt="Averreo" 
          className={`w-32 md:w-48 h-auto object-contain transition-all duration-[800ms] ease-out
            ${isTransitioning ? 'scale-110 opacity-100 blur-none' : 'scale-90 opacity-0 blur-sm'}
          `} 
        />
      </div>
      
      {/* Sayfa içeriğini displayLocation ile render ediyoruz */}
      <div className={isTransitioning ? 'pointer-events-none' : ''}>
        {children(displayLocation)}
      </div>
    </>
  );
}
