import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Globe, ShieldCheck } from 'lucide-react';

export default function Iletisim() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      <section className="relative px-6 md:px-12 py-32 max-w-7xl mx-auto reveal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 bg-glow-orb pointer-events-none"></div>

        <header className="mb-20 md:mb-28 text-center md:text-left relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">{t('contact_title')}</h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed">{t('contact_desc')}</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
          {/* Contact Details Side */}
          <div className="flex-1 space-y-12">
            <div className="space-y-8">
              <InfoRow icon={<Mail />} label="E-posta" value="info@averreo.com.tr" href="mailto:info@averreo.com.tr" delay="0" />
              <InfoRow icon={<Phone />} label={en ? 'Phone' : 'Telefon'} value="0545 456 64 40" href="tel:+905454566440" delay="100" />
              <InfoRow icon={<MapPin />} label={en ? 'Address' : 'Adres'} value="OMÜ Teknokent, Atakum / Samsun" delay="200" />
              <InfoRow icon={<Globe />} label="LinkedIn" value="Averreo Industries" href="https://www.linkedin.com/company/averreo-industries" delay="300" />
            </div>

            {/* Premium NDA Badge */}
            <div className="group relative rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative flex items-start md:items-center gap-5 bg-[#050505] rounded-2xl p-6 md:p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light group-hover:text-white/80 transition-colors">
                  {en
                    ? 'We work with confidentiality in mind and are ready to operate under an NDA. A capability one-pager is available on request.'
                    : 'Gizlilik bilinciyle çalışıyor ve NDA kapsamında ilerlemeye hazırız. Talep üzerine kısa bir kapasite dokümanı paylaşabiliriz.'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="flex-[1.2]">
            <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] group/form">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 bg-glow-orb rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Input 
                    name="name" type="text" placeholder={t('form_name')} value={form.name} onChange={handleChange} required 
                    isFocused={focusedInput === 'name'} onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)} 
                  />
                  <Input 
                    name="email" type="email" placeholder={t('form_email')} value={form.email} onChange={handleChange} required 
                    isFocused={focusedInput === 'email'} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} 
                  />
                </div>
                
                <Input 
                  name="subject" type="text" placeholder={t('form_subject')} value={form.subject} onChange={handleChange} 
                  isFocused={focusedInput === 'subject'} onFocus={() => setFocusedInput('subject')} onBlur={() => setFocusedInput(null)} 
                />
                
                <div className="relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 blur transition-opacity duration-500 ${focusedInput === 'message' ? 'opacity-40' : ''}`}></div>
                  <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange} 
                    placeholder={t('form_message')} 
                    required 
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    className="relative w-full p-5 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl text-white outline-none transition-all duration-300 min-h-[200px] resize-y placeholder:text-white/40 focus:border-blue-500 focus:bg-black/60 shadow-inner"
                  ></textarea>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="mt-4 px-10 py-5 bg-white text-black font-bold text-lg rounded-full self-start hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-3 group disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                  {isSubmitting ? (en ? 'Sending...' : 'Gönderiliyor...') : t('btn_send')}
                  {!isSubmitting && (
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                       <Mail size={16} />
                    </span>
                  )}
                </button>
                {sent && <p role="status" className="text-emerald-400 font-medium text-sm mt-2 flex items-center gap-2"><ShieldCheck size={16}/> {t('form_success')}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, value, href, delay }) {
    return (
      <div className="flex items-center gap-6 group cursor-pointer" style={{ transitionDelay: `${delay}ms` }}>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all duration-500 relative z-10 [&>svg]:w-7 [&>svg]:h-7">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
          {href ? (
            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="text-white/80 text-xl md:text-2xl font-light group-hover:text-white transition-colors">
              {value}
            </a>
          ) : (
            <span className="text-white/80 text-xl md:text-2xl font-light group-hover:text-white transition-colors">{value}</span>
          )}
        </div>
      </div>
    );
  }

  function Input({ name, type, placeholder, value, onChange, required, isFocused, onFocus, onBlur }) {
    return (
      <div className="relative flex-1">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 blur transition-opacity duration-500 ${isFocused ? 'opacity-40' : ''}`}></div>
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          required={required} 
          onFocus={onFocus}
          onBlur={onBlur}
          className="relative w-full p-5 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-blue-500 focus:bg-black/60 shadow-inner" 
        />
      </div>
    );
  }
