import { useTranslation } from 'react-i18next';

export default function Kvkk() {
  const { i18n } = useTranslation();
  const en = i18n.language === 'en';

  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
        {en ? 'Privacy Notice (KVKK)' : 'KVKK Aydınlatma Metni'}
      </h1>
      <p className="text-white/40 text-sm mb-10">
        {en
          ? 'Information notice under Turkish Law No. 6698 on the Protection of Personal Data (KVKK).'
          : '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metni.'}
      </p>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 mb-12">
        <p className="text-yellow-200/70 text-sm leading-relaxed">
          {en
            ? 'This is a template draft and must be reviewed and finalized by legal counsel before publication. Bracketed fields need to be completed.'
            : 'Bu metin bir taslak şablondur ve yayımlanmadan önce hukuk danışmanı tarafından gözden geçirilip nihai hale getirilmelidir. Köşeli parantezli alanların doldurulması gerekir.'}
        </p>
      </div>

      <div className="space-y-10 text-white/60 leading-relaxed">
        <Section n="1" title={en ? 'Data Controller' : 'Veri Sorumlusu'}>
          {en
            ? 'As Averreo Industries (“the Company”), we process your personal data as the data controller within the scope of KVKK. Address: OMÜ Teknokent, Atakum / Samsun, Türkiye. Phone: 0545 456 64 40. Email: info@averreo.com.tr'
            : 'Averreo Industries (“Şirket”) olarak kişisel verilerinizi, KVKK kapsamında veri sorumlusu sıfatıyla işlemekteyiz. Adres: OMÜ Teknokent, Atakum / Samsun, Türkiye. Telefon: 0545 456 64 40. E-posta: info@averreo.com.tr'}
        </Section>

        <Section n="2" title={en ? 'Personal Data Processed & Purposes' : 'İşlenen Kişisel Veriler ve Amaçları'}>
          {en
            ? 'When you contact us through the website forms or email, we process identity and contact data (name, email, and the content you provide) for the purposes of responding to your request, conducting business communication, and evaluating potential collaborations.'
            : 'Web sitesi formları veya e-posta yoluyla bizimle iletişime geçtiğinizde; talebinize cevap verilmesi, iş iletişiminin yürütülmesi ve olası iş birliklerinin değerlendirilmesi amaçlarıyla kimlik ve iletişim verileriniz (ad, e-posta ve ilettiğiniz içerik) işlenir.'}
        </Section>

        <Section n="3" title={en ? 'Method of Collection & Legal Basis' : 'Toplama Yöntemi ve Hukuki Sebep'}>
          {en
            ? 'Your personal data is collected electronically through the website contact form and email, based on the legal grounds set out in Article 5 of the KVKK, in particular the legitimate interests of the data controller and, where applicable, your explicit consent.'
            : 'Kişisel verileriniz, web sitesi iletişim formu ve e-posta aracılığıyla elektronik ortamda; KVKK’nın 5. maddesinde düzenlenen hukuki sebeplere, özellikle veri sorumlusunun meşru menfaati ve gerektiğinde açık rızanıza dayanılarak toplanır.'}
        </Section>

        <Section n="4" title={en ? 'Transfer of Personal Data' : 'Kişisel Verilerin Aktarılması'}>
          {en
            ? 'Your personal data may be shared with authorized public institutions and our service providers (e.g. hosting/email infrastructure) only to the extent necessary and in compliance with KVKK Articles 8 and 9. [ Add specific recipients/processors as applicable. ]'
            : 'Kişisel verileriniz, yalnızca gerekli olduğu ölçüde ve KVKK’nın 8. ve 9. maddelerine uygun olarak yetkili kamu kurumları ile hizmet sağlayıcılarımıza (ör. sunucu/e-posta altyapısı) aktarılabilir. [ Varsa belirli alıcılar/işleyiciler eklenecek. ]'}
        </Section>

        <Section n="5" title={en ? 'Your Rights' : 'İlgili Kişinin Hakları'}>
          {en
            ? 'Under Article 11 of the KVKK, you have the right to learn whether your data is processed, to request information and correction, to request deletion, and to object to processing. You may exercise these rights by contacting info@averreo.com.tr.'
            : 'KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi ve düzeltme talep etme, silinmesini isteme ve işlenmesine itiraz etme haklarına sahipsiniz. Bu haklarınızı info@averreo.com.tr adresine başvurarak kullanabilirsiniz.'}
        </Section>

        <Section n="6" title={en ? 'Contact / Application' : 'İletişim / Başvuru'}>
          {en
            ? 'For all your requests regarding personal data, you can reach us at info@averreo.com.tr or the address above.'
            : 'Kişisel verilerinize ilişkin tüm talepleriniz için info@averreo.com.tr adresinden veya yukarıdaki adresten bize ulaşabilirsiniz.'}
        </Section>
      </div>
    </div>
  );
}

function Section({ n, title, children }) {
  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-3">{n}. {title}</h2>
      <p>{children}</p>
    </section>
  );
}
