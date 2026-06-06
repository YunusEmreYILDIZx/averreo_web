import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      nav_defense: "Savunma",
      nav_industry: "Endüstri",
      nav_company: "Şirket",
      nav_career: "Kariyer",
      nav_mission: "Misyon",
      nav_news: "Haberler",
      nav_leadership: "Liderlik",
      hero_title: "Göklerden Derinlere Her Görev",
      hero_desc: "İnsansız hava ve deniz araçlarıyla savunma sanayii ve sivil endüstriye otonom çözümler sunuyoruz.",
      tagline_title: "Otonom Sistemlerde Mühendislik Mükemmelliği",
      tagline_desc: "Yapay zeka, sensör füzyonu ve otonom navigasyon teknolojileriyle savunma ve sivil sektörlere yenilikçi insansız platformlar geliştiriyoruz.",
      contact_title: "İletişim",
      contact_desc: "Savunma ve sivil projeleriniz için ekibimizle iletişime geçin.",
      btn_send: "Mesaj Gönder",
      form_name: "Ad Soyad",
      form_email: "E-posta",
      form_subject: "Konu",
      form_message: "Mesajınız...",
      tech_title: "Teknoloji Altyapısı",
      tech_subtitle: "AR-GE odaklı mühendislik ekosistemi",
      tech1_title: "Yapay Zeka & Otonom Uçuş",
      tech1_desc: "Derin öğrenme tabanlı otonom navigasyon ve gerçek zamanlı hedef tanıma sistemleri.",
      tech2_title: "Sensör Füzyon",
      tech2_desc: "EO/IR, LIDAR, radar ve akustik sensörlerin entegre füzyonu ile durumsal farkındalık.",
      tech3_title: "Sürü Zekası",
      tech3_desc: "GPS-denied ortamlarda navigasyon ve çoklu araç koordinasyonu ile sürü operasyonları.",
      tech4_title: "Komuta & Kontrol",
      tech4_desc: "Web tabanlı yer kontrol istasyonu, şifreli veri bağlantısı, NATO STANAG uyumu.",
      // Misyon
      mission_title: "Misyon & Vizyon",
      mission_p1: "Averreo Industries olarak, insan hayatını riske atmadan, zorlu görevleri üstlenebilecek yapay zeka destekli otonom sistemler geliştiriyoruz. İnsansız hava ve deniz araçlarımızla savunma sanayiinin caydırıcılığını artırıyor, sivil endüstrinin veri toplama ve lojistik yeteneklerini yeni bir boyuta taşıyoruz.",
      mission_val1_title: "İnovasyon Tutkusu",
      mission_val1_desc: "Sınırları zorlayan mühendislik çözümleri üretiyoruz. Algoritmalarımızdan donanımlarımıza kadar her aşamada teknolojik mükemmelliği hedefliyoruz.",
      mission_val2_title: "Sarsılmaz Güvenilirlik",
      mission_val2_desc: "Sahada hata payı yoktur. Sistemlerimizi en zorlu şartlar ve kesintisiz görevler için askeri standartlarda tasarlıyor, test ediyor ve üretiyoruz.",
      mission_val3_title: "Milli Teknoloji Hamlesi",
      mission_val3_desc: "Kritik teknolojilerde dışa bağımlılığı ortadan kaldırmak için AR-GE faaliyetlerimizi kendi öz kaynaklarımız ve yetenekli mühendislerimizle yürütüyoruz.",
      // Liderlik
      leadership_title: "Liderlik Ekibi",
      leadership_subtitle: "Averreo Industries'i geleceğe taşıyan stratejik yönetim kadrosu.",
      leader1_role: "Co-Founder & CEO Averreo Industries",
      leader2_role: "Co-Founder & CTO Averreo Industries",
      leader3_role: "Founder Kukuroğlu Robotics",
      // Haberler
      news_title: "Haberler & Basın Odası",
      news_subtitle: "Averreo Industries'ten en son gelişmeler ve duyurular.",
      news1_date: "12 Mayıs 2026",
      news1_title: "Averreo Industries, Yeni 'Sokak' Operasyonel İHA'sını Tanıttı",
      news1_desc: "Tam otonom uçuş kabiliyeti ve gelişmiş hedef tespit algoritmalarıyla donatılan yeni nesil 'Sokak', saha testlerini başarıyla tamamladı.",
      news2_date: "28 Nisan 2026",
      news2_title: "Uluslararası Savunma Fuarı'nda Stratejik Ortaklıklar",
      news2_desc: "Global savunma ve havacılık fuarında, Averreo olarak NATO müttefiki ülkelerle teknoloji transferi ve ortak üretim görüşmeleri gerçekleştirdik.",
      news3_date: "03 Nisan 2026",
      news3_title: "Sürü Zekası (Swarm) Testleri Tamamlandı",
      news3_desc: "Birden fazla platformun aynı anda haberleşerek ve çarpışmadan görev icra edebildiği yeni nesil sürü zekası modülümüzün entegrasyonu tamamlandı.",
      // Ekstra Navbar/Footer
      nav_mission_desc: "Vizyonumuz ve değerlerimiz",
      nav_news_desc: "Basın bültenleri",
      nav_leadership_desc: "Yönetim kurulumuz",
      footer_desc: "Savunma ve sivil endüstri için gelişmiş otonom insansız sistemler üreten bir teknoloji şirketidir.",
      footer_career1: "Açık Pozisyonlar",
      footer_career2: "Staj Programı",
      footer_career3: "AR-GE Ekibi",
      footer_privacy: "Gizlilik Politikası",
      footer_terms: "Kullanım Şartları"
    }
  },
  en: {
    translation: {
      nav_defense: "Defense",
      nav_industry: "Industry",
      nav_company: "Company",
      nav_career: "Career",
      nav_mission: "Mission",
      nav_news: "News",
      nav_leadership: "Leadership",
      hero_title: "Every Mission from Skies to Depths",
      hero_desc: "We provide autonomous solutions to defense and civil industries with unmanned aerial and maritime vehicles.",
      tagline_title: "Engineering Excellence in Autonomous Systems",
      tagline_desc: "We develop innovative unmanned platforms for defense and civil sectors using AI, sensor fusion, and autonomous navigation.",
      contact_title: "Contact",
      contact_desc: "Get in touch with our team for your defense and civil projects.",
      btn_send: "Send Message",
      form_name: "Full Name",
      form_email: "Email",
      form_subject: "Subject",
      form_message: "Your message...",
      tech_title: "Technology Infrastructure",
      tech_subtitle: "R&D focused engineering ecosystem",
      tech1_title: "AI & Autonomous Flight",
      tech1_desc: "Deep learning based autonomous navigation and real-time target recognition systems.",
      tech2_title: "Sensor Fusion",
      tech2_desc: "Situational awareness through integrated fusion of EO/IR, LIDAR, radar and acoustic sensors.",
      tech3_title: "Swarm Intelligence",
      tech3_desc: "Swarm operations with navigation in GPS-denied environments and multi-vehicle coordination.",
      tech4_title: "Command & Control",
      tech4_desc: "Web-based ground control station, encrypted data link, NATO STANAG compliance.",
      // Misyon
      mission_title: "Mission & Vision",
      mission_p1: "At Averreo Industries, we develop AI-supported autonomous systems capable of undertaking demanding tasks without risking human life. With our unmanned aerial and maritime vehicles, we increase the deterrence of the defense industry and elevate the data collection and logistics capabilities of the civil industry to a new dimension.",
      mission_val1_title: "Passion for Innovation",
      mission_val1_desc: "We produce engineering solutions that push boundaries. We aim for technological excellence at every stage, from our algorithms to our hardware.",
      mission_val2_title: "Unwavering Reliability",
      mission_val2_desc: "There is no margin for error in the field. We design, test, and produce our systems to military standards for the toughest conditions and uninterrupted missions.",
      mission_val3_title: "National Technology Initiative",
      mission_val3_desc: "To eliminate foreign dependency in critical technologies, we conduct our R&D activities with our own resources and talented engineers.",
      // Liderlik
      leadership_title: "Leadership Team",
      leadership_subtitle: "The strategic management team driving Averreo Industries into the future.",
      leader1_role: "Chairman of the Board / CEO",
      leader2_role: "Chief Technology Officer / CTO",
      leader3_role: "Chief Operating Officer / COO",
      // Haberler
      news_title: "News & Press Room",
      news_subtitle: "Latest developments and announcements from Averreo Industries.",
      news1_date: "May 12, 2026",
      news1_title: "Averreo Industries Introduces New 'Sokak' Operational UAV",
      news1_desc: "Equipped with fully autonomous flight capability and advanced target detection algorithms, the new generation 'Sokak' has successfully completed field tests.",
      news2_date: "April 28, 2026",
      news2_title: "Strategic Partnerships at the International Defense Exhibition",
      news2_desc: "At the global defense and aerospace exhibition, Averreo held technology transfer and joint production talks with NATO allied countries.",
      news3_date: "April 03, 2026",
      news3_title: "Swarm Intelligence Tests Completed",
      news3_desc: "The integration of our next-generation swarm intelligence module, which enables multiple platforms to communicate and perform missions simultaneously without colliding, has been completed.",
      // Ekstra Navbar/Footer
      nav_mission_desc: "Our vision and values",
      nav_news_desc: "Press releases",
      nav_leadership_desc: "Our board of directors",
      footer_desc: "A technology company producing advanced autonomous unmanned systems for defense and civil industries.",
      footer_career1: "Open Positions",
      footer_career2: "Internship Program",
      footer_career3: "R&D Team",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Use"
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
