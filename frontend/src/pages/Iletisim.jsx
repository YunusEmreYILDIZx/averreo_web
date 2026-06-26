import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';

export default function Iletisim() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.subject || `${form.name} — Averreo`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:info@averreo.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass = "p-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 outline-none transition-colors";

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">
      <header className="mb-14">
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">{t('contact_title')}</h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl">{t('contact_desc')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact details */}
        <div className="space-y-6">
          <InfoRow icon={<Mail />} label="E-posta" value={<a href="mailto:info@averreo.com.tr" className="hover:text-white transition-colors">info@averreo.com.tr</a>} />
          <InfoRow icon={<Phone />} label={en ? 'Phone' : 'Telefon'} value={<a href="tel:+905454566440" className="hover:text-white transition-colors">0545 456 64 40</a>} />
          <InfoRow icon={<MapPin />} label={en ? 'Address' : 'Adres'} value={<span>OMÜ Teknokent, Atakum / Samsun</span>} />
          <InfoRow icon={<Globe />} label="LinkedIn" value={<a href="https://www.linkedin.com/company/averreo-industries" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Averreo Industries</a>} />

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/40 text-sm leading-relaxed">Averreo Industries</p>
            <p className="text-white/30 text-xs mt-1">{en ? 'Gazile Tax Office · Reg. No: [ to be added ]' : 'Gazile Vergi Dairesi · Sicil No: [ eklenecek ]'}</p>
          </div>

          <div className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <ShieldCheck className="w-5 h-5 text-white/50 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-white/55 text-sm leading-relaxed">
              {en
                ? 'We work with confidentiality in mind and are ready to operate under an NDA. A capability one-pager is available on request.'
                : 'Gizlilik bilinciyle çalışıyor ve NDA kapsamında ilerlemeye hazırız. Talep üzerine kısa bir kapasite dokümanı paylaşabiliriz.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('form_name')} aria-label={t('form_name')} required className={`flex-1 ${inputClass}`} />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('form_email')} aria-label={t('form_email')} required className={`flex-1 ${inputClass}`} />
          </div>
          <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder={t('form_subject')} aria-label={t('form_subject')} className={inputClass} />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder={t('form_message')} aria-label={t('form_message')} required className={`${inputClass} min-h-[160px] resize-y`}></textarea>
          <button type="submit" className="mt-2 px-8 py-4 bg-white text-black font-bold rounded-xl self-start hover:-translate-y-1 hover:opacity-90 transition-all">{t('btn_send')}</button>
          {sent && <p role="status" className="text-green-400/90 text-sm mt-1">{t('form_success')}</p>}
        </form>
      </div>
    </div>
  );

  function InfoRow({ icon, label, value }) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 [&>svg]:w-5 [&>svg]:h-5">{icon}</div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
          <p className="text-white/80">{value}</p>
        </div>
      </div>
    );
  }
}
