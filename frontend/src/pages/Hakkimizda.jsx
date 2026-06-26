import { useTranslation } from 'react-i18next';

const CONTENT = {
  tr: {
    title: 'Hakkımızda',
    subtitle: 'Samsun merkezli, insansız sistemler ve otonomi üzerine çalışan genç bir derin teknoloji ekibiyiz.',
    paragraphs: [
      'Averreo Industries olarak, insan için zorlu veya tehlikeli görevleri üstlenebilecek insansız sistemler ve otonom teknolojiler geliştiriyoruz. Odağımız; algılama, otonom navigasyon ve karar destek yetenekleriyle keşif ve denetimi daha güvenli ve daha verimli hale getirmek.',
      'Vizyonumuzu tek bir cümlede topluyoruz: gökyüzünden derinliklere, her görev için. Kapalı endüstriyel alanlardan deniz altına kadar farklı ortamlarda çalışabilen platformlar tasarlıyor; bu platformları üretirken kazandığımız mühendislik derinliğini çözüm ortaklarımızın projelerine de taşıyoruz.',
      'Genç ama disiplinli bir ekibiz. Büyük iddialar yerine somut mühendisliğe, gösterişli rakamlar yerine dürüst anlatıma inanıyoruz. Henüz hangi aşamada olduğumuzu açıkça söyler, sahip olmadığımız bir sertifikayı ya da referansı iddia etmeyiz.',
    ],
    legalTitle: 'Kurumsal',
    legalText: 'Averreo Industries — Samsun, Türkiye. Detaylı kurumsal ve iletişim bilgileri İletişim sayfasında yer alır.',
    valuesTitle: 'Değerlerimiz',
    values: [
      { title: 'Mühendislik Derinliği', desc: 'Algoritmadan donanıma, yazılımdan gömülü sistemlere kadar zinciri tek çatı altında kurguluyoruz.' },
      { title: 'Dürüstlük ve Şeffaflık', desc: 'Ne yaptığımızı ve hangi aşamada olduğumuzu açıkça söyleriz; sahip olmadığımız iddiaları taşımayız.' },
      { title: 'Çözüm Ortaklığı', desc: 'Kendi platformlarımız için geliştirdiğimiz mühendisliği, çözüm ortaklarımızın projelerine de uyguluyoruz.' },
    ],
  },
  en: {
    title: 'About Us',
    subtitle: 'A young deep-tech team based in Samsun, working on unmanned systems and autonomy.',
    paragraphs: [
      'At Averreo Industries, we develop unmanned systems and autonomous technologies capable of taking on tasks that are difficult or dangerous for people. Our focus is making reconnaissance and inspection safer and more efficient through perception, autonomous navigation, and decision-support capabilities.',
      'We capture our vision in a single line: from the skies to the depths, for every mission. We design platforms that operate across different environments — from confined industrial spaces to underwater — and bring the engineering depth gained while building them to our partners’ projects.',
      'We are a young but disciplined team. We believe in concrete engineering over big claims, and honest narrative over flashy numbers. We state clearly what stage we are at, and we never claim a certificate or reference we do not hold.',
    ],
    legalTitle: 'Corporate',
    legalText: 'Averreo Industries — Samsun, Türkiye. Detailed corporate and contact information is available on the Contact page.',
    valuesTitle: 'Our Values',
    values: [
      { title: 'Engineering Depth', desc: 'We build the full chain — from algorithms to hardware, from software to embedded systems — under one roof.' },
      { title: 'Honesty & Transparency', desc: 'We say clearly what we do and what stage we are at; we never carry claims we cannot back.' },
      { title: 'Partnership', desc: "We apply the engineering we develop for our own platforms to our partners' projects too." },
    ],
  },
};

export default function Hakkimizda() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-14">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">{c.title}</h1>
        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">{c.subtitle}</p>
      </header>

      <div className="space-y-6 mb-16">
        {c.paragraphs.map((p, i) => (
          <p key={i} className="text-lg text-white/60 leading-relaxed">{p}</p>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-16">
        <h2 className="text-sm uppercase tracking-widest text-white/40 mb-3">{c.legalTitle}</h2>
        <p className="text-white/70 leading-relaxed">{c.legalText}</p>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">{c.valuesTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {c.values.map((v, i) => (
          <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-7 hover:border-white/15 transition-colors">
            <h3 className="text-lg font-bold mb-3">{v.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
