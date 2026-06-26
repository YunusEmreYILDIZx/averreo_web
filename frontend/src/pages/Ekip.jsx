import { useTranslation } from 'react-i18next';

const CONTENT = {
  tr: {
    title: 'Ekip',
    subtitle: 'Averreo’yu kuran ve mühendisliğini yürüten ekip.',
    members: [
      { name: 'Yunus Emre Yıldız', role: 'Kurucu Ortak & CEO', img: 'yemre.png', desc: 'Şirketin vizyonu, iş geliştirme ve stratejik yönünden sorumlu.' },
      { name: 'Muhammet Yasin Güneş', role: 'Kurucu Ortak & CTO', img: 'yasin.png', desc: 'Yazılım, otonomi ve sistem mühendisliği tarafını yürütüyor.' },
      { name: 'Mehmet Kukur', role: 'Çözüm Ortağı — Kukuroğlu Robotics', img: 'memet.png', desc: 'Robotik ve donanım tarafında çözüm ortağımız olarak projelere katkı veriyor.' },
    ],
    note: 'Daha detaylı tanıtım ve özgeçmişler talep üzerine paylaşılabilir.',
  },
  en: {
    title: 'Team',
    subtitle: 'The people who founded Averreo and run its engineering.',
    members: [
      { name: 'Yunus Emre Yıldız', role: 'Co-Founder & CEO', img: 'yemre.png', desc: 'Responsible for the company vision, business development, and strategic direction.' },
      { name: 'Muhammet Yasin Güneş', role: 'Co-Founder & CTO', img: 'yasin.png', desc: 'Leads software, autonomy, and systems engineering.' },
      { name: 'Mehmet Kukur', role: 'Solution Partner — Kukuroğlu Robotics', img: 'memet.png', desc: 'Contributes to projects as our solution partner on the robotics and hardware side.' },
    ],
    note: 'More detailed introductions and CVs can be shared on request.',
  },
};

export default function Ekip() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">{c.title}</h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">{c.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {c.members.map((m, i) => (
          <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform">
            <img src={`/assets/images/${m.img}`} alt={m.name} loading="lazy" decoding="async" className="w-36 h-36 rounded-full mx-auto mb-7 object-cover border-2 border-white/10" />
            <h3 className="text-xl font-bold mb-1">{m.name}</h3>
            <p className="text-white/50 text-sm mb-4">{m.role}</p>
            <p className="text-white/40 text-sm leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-white/30 text-sm mt-14">{c.note}</p>
    </div>
  );
}
