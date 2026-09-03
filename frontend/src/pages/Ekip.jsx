import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { User } from 'lucide-react';

const CONTENT = {
  tr: {
    title: 'Ekip',
    subtitle: 'Averreo’yu kuran ve mühendisliğini yürüten çekirdek kadro.',
    founders: [
      { name: 'Yunus Emre Yıldız', role: 'Kurucu Ortak & CEO', img: 'person/yemre.png', desc: 'Şirketin vizyonu, iş geliştirme ve stratejik yönünden sorumlu. Geleceğin otonom sistemlerini bugünün ihtiyaçlarıyla buluşturuyor.' },
      { name: 'Muhammet Yasin Güneş', role: 'Kurucu Ortak & CTO', img: 'person/yasin.png', desc: 'Yazılım, otonomi ve sistem mühendisliği tarafını yürütüyor. Algoritmaların sahadaki zorlu koşullarda kusursuz çalışmasını sağlıyor.' },
    ],
    foundersTitle: 'Kurucu Ortaklar',
    teamTitle: 'Mühendislik Kadrosu',
    team: [
      { name: 'Samed Erdoğan', role: 'Ar-Ge Mühendisi – Elektronik & Donanım', img: 'person/samed.jpeg', desc: 'Elektronik tasarım ve donanım tarafındaki işleri yürütüyor. Kritik görev sistemlerinin elektronik kalbini tasarlıyor.' },
      { name: 'Nursema Nakiboğlu', role: 'Ar-Ge Mühendisi – Yapay Zekâ', img: 'person/nursema.jpeg', desc: 'Yapay zekâ ve veri işleme sistemlerini geliştiriyor. Drone\'un çevresini algılamasını, görüntüleri ve sensör verilerini anlamlandırmasını sağlayarak otonom karar verme kabiliyetini geliştiriyor.' },
      { name: 'Gazi Jenar Kınık', role: 'Ar-Ge Mühendisi – Mekanik', img: 'person/jenar.jpg', desc: 'Mekanik tasarım ve mühendislik süreçlerinden sorumlu. Drone\'un zorlu kapalı alan koşullarında dayanıklı, dengeli ve yüksek performansla çalışmasını sağlayan mekanik altyapıyı geliştiriyor.' },
      { name: 'Müjgan İrem Yazıcı', role: 'Ar-Ge Mühendisi – Uçuş Sistemleri', img: 'person/irem.jpg', desc: 'Uçuş, güç ve donanım sistemlerinden sorumlu. Drone\'un stabil, güvenli ve kontrollü şekilde uçmasını sağlayan donanım altyapısının geliştirilmesine katkı sağlıyor.' },
      { name: 'Alperen Nakiboğlu', role: 'Ar-Ge Mühendisi – Algılama & Haberleşme', img: 'person/alperen.jpeg', desc: 'Sensör ve haberleşme sistemlerinden sorumlu. Drone\'un çevresinden güvenilir veri toplamasını ve bu verileri sistem içerisindeki diğer birimlere kesintisiz şekilde aktarmasını sağlıyor.' },
    ],
    note: 'Daha detaylı tanıtım ve özgeçmişler (CV) talep üzerine paylaşılabilir.',
  },
  en: {
    title: 'Team',
    subtitle: 'The core team that founded Averreo and runs its engineering.',
    founders: [
      { name: 'Yunus Emre Yıldız', role: 'Co-Founder & CEO', img: 'person/yemre.png', desc: 'Responsible for company vision, business development, and strategy. Connecting future autonomous systems with today\'s needs.' },
      { name: 'Muhammet Yasin Güneş', role: 'Co-Founder & CTO', img: 'person/yasin.png', desc: 'Leads software, autonomy, and systems engineering. Ensures algorithms perform flawlessly in harsh field conditions.' },
    ],
    foundersTitle: 'Founders',
    teamTitle: 'Engineering Team',
    team: [
      { name: 'Samed Erdoğan', role: 'R&D Engineer – Electronics & Hardware', img: 'person/samed.jpeg', desc: 'Leads the electronics design and hardware side. Designs the electronic heart of mission-critical systems.' },
      { name: 'Nursema Nakiboğlu', role: 'R&D Engineer – Artificial Intelligence', img: 'person/nursema.jpeg', desc: 'Develops AI and data processing systems. Enhances autonomous decision-making capability by enabling the drone to perceive its environment and make sense of images and sensor data.' },
      { name: 'Gazi Jenar Kınık', role: 'R&D Engineer – Mechanical', img: 'person/jenar.jpg', desc: 'Responsible for mechanical design and engineering processes. Develops the mechanical infrastructure that ensures the drone operates durably, stably, and with high performance in challenging confined spaces.' },
      { name: 'Müjgan İrem Yazıcı', role: 'R&D Engineer – Flight Systems', img: 'person/irem.jpg', desc: 'Responsible for flight, power, and hardware systems. Contributes to the development of the hardware infrastructure that ensures the drone flies stably, safely, and in a controlled manner.' },
      { name: 'Alperen Nakiboğlu', role: 'R&D Engineer – Perception & Communication', img: 'person/alperen.jpeg', desc: 'Responsible for sensor and communication systems. Ensures the drone collects reliable data from its environment and seamlessly transmits it to other units within the system.' },
    ],
    note: 'More detailed introductions and CVs can be shared on request.',
  },
};

export default function Ekip() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
    const timeout = setTimeout(() => {
      els.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active'); });
    }, 100);
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, [c]);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <section className="relative px-6 md:px-12 max-w-7xl mx-auto pt-32 pb-20 md:pb-32 reveal">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 bg-glow-orb -translate-x-1/2 pointer-events-none"></div>

        <div className="text-center relative z-10 mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">{c.title}</h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">{c.subtitle}</p>
        </div>

        {/* Founders Title */}
        <div className="relative z-10 mb-12 md:mb-16 text-center reveal">
           <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6 text-white/80">{c.foundersTitle}</h2>
           <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
        </div>

        {/* Founders (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-10 max-w-3xl mx-auto mb-24 md:mb-32 reveal">
          {c.founders.map((m, i) => (
             <TeamCard key={`f-${i}`} m={m} index={i} isLarge={false} />
          ))}
        </div>

        {/* Team Title */}
        <div className="relative z-10 mb-12 md:mb-16 text-center reveal">
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{c.teamTitle}</h2>
           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Employees (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10 max-w-6xl mx-auto reveal">
          {c.team.map((m, i) => (
             <TeamCard key={`t-${i}`} m={m} index={i + c.founders.length} isLarge={false} />
          ))}
        </div>

        <div className="mt-20 md:mt-32 text-center reveal">
          <div className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/[0.03] border border-white/5 text-white/40 text-sm md:text-base font-light">
            {c.note}
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamCard({ m, index, isLarge }) {
  const glowColors = [
    'group-hover:shadow-[0_0_80px_rgba(59,130,246,0.3)]', // Blue
    'group-hover:shadow-[0_0_80px_rgba(16,185,129,0.3)]', // Emerald
    'group-hover:shadow-[0_0_80px_rgba(139,92,246,0.3)]', // Purple
    'group-hover:shadow-[0_0_80px_rgba(245,158,11,0.3)]',  // Amber
    'group-hover:shadow-[0_0_80px_rgba(239,68,68,0.3)]',  // Red
  ];
  const glow = glowColors[index % glowColors.length];
  const isPlaceholder = m.img === 'placeholder';

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-b from-white/20 to-white/0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      <div className={`relative bg-[#050505] rounded-[3rem] p-6 md:p-8 border border-white/10 overflow-hidden flex flex-col h-full transition-all duration-700 ${glow} group-hover:-translate-y-2`}>
        
        <div className={`relative w-full ${isLarge ? 'aspect-[4/5]' : 'aspect-square'} rounded-[2rem] overflow-hidden mb-6 md:mb-8 bg-[#111] flex items-center justify-center`}>
          {isPlaceholder ? (
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center group-hover:bg-[#151515] transition-colors duration-500">
               <User className="w-16 h-16 md:w-24 md:h-24 text-white/10 group-hover:text-white/30 transition-colors duration-500" />
            </div>
          ) : (
            <img 
              src={`/assets/images/${m.img}`} 
              alt={m.name} 
              loading="lazy" 
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700 scale-100 group-hover:scale-105" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
        </div>

        <div className="flex flex-col flex-1 text-center md:text-left">
          <h3 className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-bold mb-2 tracking-tight group-hover:text-white transition-colors`}>{m.name}</h3>
          <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLarge ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`}></span>
            <p className="text-white/60 font-medium tracking-wide uppercase text-xs md:text-sm">{m.role}</p>
          </div>
          <p className="text-white/40 text-sm md:text-base leading-relaxed font-light mt-auto group-hover:text-white/70 transition-colors duration-500">{m.desc}</p>
        </div>
      </div>
    </div>
  );
}
