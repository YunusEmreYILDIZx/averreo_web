import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code, Database, Cpu, ArrowRight } from 'lucide-react';

const CONTENT = {
  tr: {
    title: 'Mühendislik Çözümleri',
    subtitle: 'Platformlarımızı ürettiğimiz Ar-Ge seviyesindeki mühendisliği, çözüm ortaklarımızın projelerine de uyguluyoruz.',
    intro: 'Kendi insansız sistemlerimizi geliştirirken yazılım, veri & yapay zekâ ve gömülü donanım zincirini tek çatı altında kuruyoruz. Bu mühendislik derinliğini, sizinle rekabet etmek için değil — projelerinizi hızlandırmak için çözüm ortaklığı modeliyle sunuyoruz.',
    domainsTitle: 'Yetkinlik Yığını',
    domains: [
      { icon: 'code', title: 'Yazılım', items: ['Backend & mikroservis mimarileri', 'Web uygulamaları & panolar', 'Mobil uygulamalar', 'Test & ölçüm yazılımı'] },
      { icon: 'data', title: 'Veri & Yapay Zekâ', items: ['Makine öğrenmesi modelleri', 'Görüntü işleme & nesne tanıma', 'Anomali tespiti', 'Veri toplama & analiz panoları'] },
      { icon: 'embedded', title: 'Gömülü & Donanım', items: ['PCB tasarımı', 'Firmware geliştirme', 'Motor & hareket kontrolü', 'Gömülü test arayüzleri (HMI)'] },
    ],
    modelTitle: 'Çalışma Modeli',
    tiers: [
      { title: 'Üretime Hazır', desc: 'Bugün devralıp projenize entegre edebileceğimiz olgun yetkinlikler.' },
      { title: 'Destek & Büyüme', desc: 'İhtiyacınızla birlikte geliştirip ölçeklediğimiz, ortak yol aldığımız alanlar.' },
    ],
    examplesTitle: 'Örnek Problem Alanları',
    examples: ['Test & ölçüm (ATE) yazılımları', 'Gömülü test ve doğrulama arayüzleri', 'Operatör arayüzleri (HMI)', 'Cihaz & protokol entegrasyonu', 'Veri toplama ve raporlama sistemleri', 'Otomasyon ve kontrol yazılımı'],
    cta: 'Çözüm Ortaklığı İçin İletişime Geçin',
  },
  en: {
    title: 'Engineering Solutions',
    subtitle: "We apply the R&D-grade engineering behind our own platforms to our partners' projects.",
    intro: 'While developing our own unmanned systems, we build the full chain — software, data & AI, and embedded hardware — under one roof. We offer this engineering depth not to compete with you, but to accelerate your projects through a solution-partnership model.',
    domainsTitle: 'Capability Stack',
    domains: [
      { icon: 'code', title: 'Software', items: ['Backend & microservice architectures', 'Web applications & dashboards', 'Mobile applications', 'Test & measurement software'] },
      { icon: 'data', title: 'Data & AI', items: ['Machine learning models', 'Computer vision & object recognition', 'Anomaly detection', 'Data acquisition & analytics dashboards'] },
      { icon: 'embedded', title: 'Embedded & Hardware', items: ['PCB design', 'Firmware development', 'Motor & motion control', 'Embedded test interfaces (HMI)'] },
    ],
    modelTitle: 'How We Work',
    tiers: [
      { title: 'Production-Ready', desc: 'Mature capabilities we can take on and integrate into your project today.' },
      { title: 'Support & Growth', desc: 'Areas we develop and scale together as your needs grow.' },
    ],
    examplesTitle: 'Example Problem Areas',
    examples: ['Test & measurement (ATE) software', 'Embedded test & validation interfaces', 'Operator interfaces (HMI)', 'Device & protocol integration', 'Data acquisition & reporting systems', 'Automation & control software'],
    cta: 'Contact Us About Partnership',
  },
};

const ICONS = { code: Code, data: Database, embedded: Cpu };

export default function Cozumler() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <header className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">{c.title}</h1>
        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-6">{c.subtitle}</p>
        <p className="text-white/50 leading-relaxed">{c.intro}</p>
      </header>

      {/* Capability stack */}
      <section className="mb-20">
        <h2 className="text-sm uppercase tracking-widest text-white/40 mb-8">{c.domainsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {c.domains.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-8 hover:border-white/15 transition-colors">
                <div className="w-11 h-11 text-white/70 mb-6">{Icon && <Icon className="w-full h-full" strokeWidth={1.5} />}</div>
                <h3 className="text-xl font-bold mb-5">{d.title}</h3>
                <ul className="space-y-3">
                  {d.items.map((item, j) => (
                    <li key={j} className="text-white/55 text-sm flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 shrink-0"></span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Working model / tiers */}
      <section className="mb-20">
        <h2 className="text-sm uppercase tracking-widest text-white/40 mb-8">{c.modelTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {c.tiers.map((tier, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-1 bg-white/20 mb-6 rounded-full"></div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{tier.title}</h3>
              <p className="text-white/50 leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example problem areas */}
      <section className="mb-20">
        <h2 className="text-sm uppercase tracking-widest text-white/40 mb-8">{c.examplesTitle}</h2>
        <div className="flex flex-wrap gap-3">
          {c.examples.map((ex, i) => (
            <span key={i} className="px-5 py-2.5 rounded-full bg-[#080808] border border-white/10 text-white/70 text-sm">{ex}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#080808] border border-white/10 rounded-3xl p-10 md:p-14 text-center">
        <Link to="/iletisim" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:gap-3 transition-all">
          {c.cta} <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
