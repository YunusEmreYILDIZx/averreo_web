import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      // Navigation
      nav_platforms: "Platformlar",
      nav_solutions: "Çözümlerimiz",
      nav_about: "Hakkımızda",
      nav_team: "Ekip",
      nav_contact: "İletişim",
      // Hero
      hero_title: "Gökyüzünden Derinliklere, Her Görev İçin",
      hero_desc: "İnsansız sistemler ve otonom teknolojiler geliştiriyoruz; bu mühendislik derinliğini çözüm ortaklarımıza da sunuyoruz.",
      hero_cta: "İletişime Geçin",
      hero_cta2: "Platformları Keşfet",
      // Home pillars
      home_what_title: "İki Çekirdek, Tek Mühendislik",
      home_what_desc: "Kendi insansız sistemlerimizi geliştiriyor; aynı Ar-Ge derinliğini çözüm ortaklarımızın projelerine de taşıyoruz.",
      pillar1_title: "Platformlar",
      pillar1_desc: "Kapalı alanlardan derin sulara; keşif ve denetim için insansız sistemler geliştiriyoruz.",
      pillar1_cta: "Platformları İncele",
      pillar2_title: "Çözümlerimiz",
      pillar2_desc: "Platformlarımızı ürettiğimiz Ar-Ge seviyesindeki mühendisliği, çözüm ortaklarımızın projelerine de uyguluyoruz.",
      pillar2_cta: "Yetkinliklerimiz",
      // Contact
      contact_title: "İletişim",
      contact_desc: "Savunma ve sivil projeleriniz, ya da mühendislik çözüm ortaklığı için ekibimizle iletişime geçin.",
      btn_send: "Mesaj Gönder",
      form_name: "Ad Soyad",
      form_email: "E-posta",
      form_subject: "Konu",
      form_message: "Mesajınız...",
      form_success: "Mesajınız başarıyla iletildi! Ekibimiz en kısa sürede dönüş yapacaktır.",
    }
  },
  en: {
    translation: {
      // Navigation
      nav_platforms: "Platforms",
      nav_solutions: "Engineering Solutions",
      nav_about: "About",
      nav_team: "Team",
      nav_contact: "Contact",
      // Hero
      hero_title: "From the Skies to the Depths, for Every Mission",
      hero_desc: "We develop unmanned systems and autonomous technologies — and bring that same engineering depth to our solution partners.",
      hero_cta: "Get in Touch",
      hero_cta2: "Explore Platforms",
      // Home pillars
      home_what_title: "Two Cores, One Engineering",
      home_what_desc: "We build our own unmanned systems and bring the same R&D depth to our partners' projects.",
      pillar1_title: "Platforms",
      pillar1_desc: "From confined spaces to deep waters, we develop unmanned systems for reconnaissance and inspection.",
      pillar1_cta: "Explore Platforms",
      pillar2_title: "Engineering Solutions",
      pillar2_desc: "We apply the R&D-grade engineering behind our own platforms to our partners' projects.",
      pillar2_cta: "Our Capabilities",
      // Contact
      contact_title: "Contact",
      contact_desc: "Get in touch with our team for your defense and civil projects, or for engineering solution partnership.",
      btn_send: "Send Message",
      form_name: "Full Name",
      form_email: "Email",
      form_subject: "Subject",
      form_message: "Your message...",
      form_success: "Message sent successfully! Our team will get back to you shortly.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
