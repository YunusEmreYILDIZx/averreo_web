import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Brain, Zap, Users, Activity, ScanEye, Truck, Workflow, HardHat, Bot, Leaf,
  Factory, Plug, ShoppingBag, Package, HeartPulse, Wheat, Building2, Hotel, TrendingUp,
  Landmark, GraduationCap, Database, Sparkles, Target, Gauge, Clock, Award, ShieldCheck,
  Cloud, Lock, Layers, Plus, Check, ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Content (TR / EN)                                                  */
/* ------------------------------------------------------------------ */

const MODULE_ICONS = [Zap, Users, Activity, ScanEye, Truck, Workflow, HardHat, Bot, Leaf];
const SECTOR_ICONS = [Factory, Plug, ShoppingBag, Package, HeartPulse, Wheat, Building2, Hotel, TrendingUp, Landmark, GraduationCap];
const STEP_ICONS = [Database, Brain, Sparkles, Target];
const VALUE_ICONS = [Gauge, Clock, Award, TrendingUp];
const TRUST_ICONS = [ShieldCheck, Cloud, Lock, Layers];

const CONTENT = {
  tr: {
    badge: 'Yapay Zekâ Destekli Operasyonel Zekâ Platformu',
    titleA: 'Averreo',
    titleB: 'Intelligence',
    subtitle: 'İşletmenizin ürettiği her veriyi; enerji, iş gücü, makine, kalite ve tedarik zincirini tek bir yapay zekâ merkezinde birleştiriyor, firmanızı daha verimli, daha hızlı ve daha rekabetçi hale getiriyoruz.',
    ctaPrimary: 'Demo Talep Edin',
    ctaSecondary: 'Modülleri Keşfedin',
    earlyAccess: 'Erken Erişim Programı',

    dash: {
      live: 'Canlı',
      sample: 'Örnek gösterim',
      kpis: [
        { label: 'Enerji Tüketimi', suffix: '%', value: -12.4, decimals: 1, trend: 'geçen aya göre' },
        { label: 'Ekipman Etkinliği (OEE)', suffix: '%', value: 87.2, decimals: 1, trend: 'hedef %85' },
        { label: 'Kalite Skoru', suffix: '%', value: 99.1, decimals: 1, trend: 'son 7 gün' },
      ],
      chart: 'Üretim verimliliği',
      insightTitle: 'AI İçgörüsü',
      insight: 'Hat 3 kompresöründe titreşim artışı tespit edildi. Arıza riskini önlemek için 48 saat içinde bakım öneriliyor.',
      action: 'İş emri oluştur',
    },

    stats: [
      { value: '7/24', label: 'Kesintisiz izleme ve analiz' },
      { value: '360°', label: 'Tüm operasyonun tek ekranda görünümü' },
      { value: '11+', label: 'Sektöre uyarlanabilir yapı' },
      { value: 'Uçtan Uca', label: 'Veriden aksiyona tam döngü' },
    ],

    problemEyebrow: 'Neden Averreo Intelligence?',
    problemTitle: 'Veriniz var. Ama içgörünüz var mı?',
    problemDesc: 'Bugün çoğu işletme; makinelerden, sayaçlardan, ERP’den, kameralardan ve çalışanlardan devasa miktarda veri üretiyor. Ancak bu veriler farklı sistemlerde dağınık duruyor, geç raporlanıyor ve karar anında kullanılamıyor. Averreo Intelligence, bu dağınık veriyi birleştirir, yapay zekâ ile anlamlandırır ve size “ne oldu?” yerine “ne olacak ve ne yapmalıyım?” sorusunun cevabını verir.',
    problemPoints: [
      'Dağınık sistemlerdeki veriyi tek merkezde birleştirir',
      'Sorunları oluşmadan önce tahmin eder',
      'Her öneriyi ölçülebilir bir kazanca bağlar',
    ],

    stepsEyebrow: 'Nasıl Çalışır?',
    stepsTitle: 'Veriden aksiyona dört adım',
    steps: [
      { title: 'Bağlan', desc: 'ERP, MES, SCADA, IoT sensörleri, enerji analizörleri, kameralar ve Excel tablolarınız dahil mevcut tüm veri kaynaklarınıza güvenle bağlanırız.' },
      { title: 'Anlamlandır', desc: 'Veriyi temizler, birleştirir ve işletmenizin dijital bir modelini çıkarırız. Böylece tüm operasyonunuzu tek bir dilde konuşturabiliriz.' },
      { title: 'Öngör', desc: 'Makine öğrenmesi modelleri anomalileri, arızaları, talep dalgalanmalarını ve verimsizlikleri gerçekleşmeden önce tespit eder.' },
      { title: 'Harekete Geç', desc: 'Önceliklendirilmiş öneriler, otomatik uyarılar ve iş emirleriyle içgörüyü sahada sonuca dönüştürür, kazancı ölçeriz.' },
    ],

    modulesEyebrow: 'Platform Modülleri',
    modulesTitle: 'İşletmenizin her köşesi için yapay zekâ',
    modulesDesc: 'İhtiyacınıza göre seçip birleştirebileceğiniz modüler yapı. Tek bir modülle başlayın, büyüdükçe genişletin.',
    modules: [
      { title: 'Enerji Zekâsı', desc: 'Tüketim profillerini çıkarır, israfı ve anormal tüketimi anında yakalar; tepe yük ve tarife optimizasyonu ile enerji faturanızı düşürür.', tags: ['Anomali tespiti', 'Tepe yük yönetimi', 'Tarife optimizasyonu'] },
      { title: 'İş Gücü & Performans Analitiği', desc: 'Vardiya planlama, iş yükü dengesi, verimlilik ve yetkinlik açıklarını analiz ederek ekiplerinizin potansiyelini ortaya çıkarır. KVKK uyumlu, etik ve şeffaf bir yaklaşımla.', tags: ['Vardiya optimizasyonu', 'Yetkinlik haritası', 'İş yükü dengesi'] },
      { title: 'Kestirimci Bakım', desc: 'Sensör ve makine verilerinden arızaları önceden tahmin eder; plansız duruşları azaltır, ekipman ömrünü uzatır ve bakım maliyetlerini düşürür.', tags: ['Arıza tahmini', 'Kalan ömür analizi', 'Duruş azaltma'] },
      { title: 'Görüntü İşleme ile Kalite', desc: 'Bilgisayarlı görü ile üretim hattındaki kusurları insan gözünden hızlı ve tutarlı şekilde tespit eder, fire oranını ve geri dönüşleri azaltır.', tags: ['Kusur tespiti', 'Fire analizi', 'Kök neden'] },
      { title: 'Tedarik Zinciri & Talep Tahmini', desc: 'Talebi tahmin eder, stok seviyelerini optimize eder ve tedarik risklerini erkenden görerek nakit akışınızı ve teslimat performansınızı iyileştirir.', tags: ['Talep tahmini', 'Stok optimizasyonu', 'Tedarikçi riski'] },
      { title: 'Süreç Madenciliği & Darboğaz Analizi', desc: 'İş süreçlerinizin gerçekte nasıl işlediğini ortaya çıkarır; darboğazları, gecikmeleri ve tekrarlayan işleri tespit edip otomasyon fırsatlarını gösterir.', tags: ['Darboğaz tespiti', 'Çevrim süresi', 'Otomasyon fırsatları'] },
      { title: 'İSG & Saha Güvenliği', desc: 'Kamera görüntülerinden KKD kullanımını, tehlikeli bölge ihlallerini ve riskli davranışları gerçek zamanlı tespit ederek iş kazalarını önlemeye yardımcı olur.', tags: ['KKD tespiti', 'Bölge ihlali', 'Risk skoru'] },
      { title: 'Yapay Zekâ Asistanı', desc: 'Verilerinize doğal dille soru sorun: “Geçen ay en çok enerji harcayan hat hangisi?” Asistan saniyeler içinde cevaplar, rapor ve öneri üretir.', tags: ['Doğal dil sorgu', 'Otomatik rapor', 'Karar desteği'] },
      { title: 'Sürdürülebilirlik & Karbon', desc: 'Karbon ayak izinizi ve kaynak kullanımınızı otomatik hesaplar; ESG raporlamasını kolaylaştırır ve yeşil dönüşüm yol haritanızı veriye dayandırır.', tags: ['Karbon takibi', 'ESG raporlama', 'Kaynak verimliliği'] },
    ],

    valuesEyebrow: 'Odaklandığımız Sonuçlar',
    valuesTitle: 'Dört temel kazanç',
    values: [
      { title: 'Verim', desc: 'Kaynakları, enerjiyi ve iş gücünü en doğru yere yönlendirerek aynı girdiyle daha fazla çıktı.' },
      { title: 'Hız', desc: 'Haftalık raporlar yerine gerçek zamanlı içgörü; kararları saatler değil saniyeler içinde alın.' },
      { title: 'Kalite', desc: 'Kusurları ve sapmaları kaynağında yakalayarak tutarlı ve ölçülebilir kalite.' },
      { title: 'Rekabet Gücü', desc: 'Daha düşük maliyet, daha hızlı teslimat ve veriye dayalı stratejiyle pazarda bir adım önde.' },
    ],

    sectorsEyebrow: 'Sektörler',
    sectorsTitle: 'Her sektöre, her ölçeğe uyum sağlar',
    sectorsDesc: 'Bir fabrika, bir otel zinciri, bir hastane ya da bir belediye: veriyle çalışan her kurum daha akıllı hale gelebilir.',
    useCasesLabel: 'Örnek kullanım senaryoları',
    kpiLabel: 'Odak metrikler',
    sectors: [
      { name: 'Üretim & Fabrika', desc: 'Üretim hatlarını, makineleri ve enerji tüketimini tek merkezden izleyerek OEE’yi artırın, duruşları ve fireyi azaltın.', cases: ['Makine arızalarını önceden tahmin etme', 'Hat bazında enerji ve verimlilik analizi', 'Görüntü işleme ile kalite kontrol', 'Üretim planlama ve darboğaz tespiti'], kpis: ['OEE', 'Fire oranı', 'kWh / ürün'] },
      { name: 'Enerji & Altyapı', desc: 'Şebeke, santral ve dağıtım verilerini analiz ederek talebi tahmin edin, kayıp-kaçağı azaltın ve varlık yönetimini optimize edin.', cases: ['Tüketim ve üretim tahmini', 'Kayıp-kaçak ve anomali tespiti', 'Varlık sağlığı ve bakım planlama', 'Yenilenebilir kaynak optimizasyonu'], kpis: ['Kayıp oranı', 'Tahmin doğruluğu', 'Arıza süresi'] },
      { name: 'Perakende & E-Ticaret', desc: 'Müşteri davranışını, stok hareketlerini ve mağaza performansını anlayarak satışları artırın, stok maliyetlerini düşürün.', cases: ['Mağaza bazlı talep tahmini', 'Dinamik fiyatlama önerileri', 'Personel planlaması ve yoğunluk analizi', 'Mağaza enerji yönetimi'], kpis: ['Stok devir hızı', 'Sepet büyüklüğü', 'Personel verimi'] },
      { name: 'Lojistik & Depo', desc: 'Rota, filo ve depo operasyonlarını optimize ederek teslimat sürelerini kısaltın, yakıt ve operasyon maliyetlerini azaltın.', cases: ['Rota ve yük optimizasyonu', 'Depo yerleşim ve toplama analizi', 'Filo bakım tahmini', 'Teslimat gecikme risk analizi'], kpis: ['Zamanında teslimat', 'Km başı maliyet', 'Toplama süresi'] },
      { name: 'Sağlık', desc: 'Hasta akışını, kaynak kullanımını ve operasyonel süreçleri analiz ederek bekleme sürelerini azaltın, hizmet kalitesini yükseltin.', cases: ['Hasta yoğunluğu ve yatak doluluk tahmini', 'Personel ve nöbet planlama', 'Tıbbi cihaz bakım takibi', 'Sarf malzeme stok optimizasyonu'], kpis: ['Bekleme süresi', 'Yatak doluluğu', 'Kaynak kullanımı'] },
      { name: 'Tarım & Gıda', desc: 'Tarladan sofraya kadar tüm zinciri veriyle yöneterek verimi artırın, israfı azaltın ve gıda güvenliğini güvence altına alın.', cases: ['Rekolte ve hasat tahmini', 'Soğuk zincir izleme', 'Üretim hattında kalite kontrol', 'Su ve enerji kullanım optimizasyonu'], kpis: ['Dekar başı verim', 'İsraf oranı', 'Raf ömrü'] },
      { name: 'Akıllı Bina & İnşaat', desc: 'Binaların enerji, iklimlendirme ve kullanım verilerini analiz ederek işletme maliyetlerini düşürün; şantiyelerde güvenliği ve ilerlemeyi takip edin.', cases: ['HVAC ve aydınlatma optimizasyonu', 'Doluluk bazlı enerji yönetimi', 'Şantiye İSG takibi', 'Proje ilerleme ve maliyet analizi'], kpis: ['kWh / m²', 'Konfor skoru', 'Kaza sıklığı'] },
      { name: 'Otelcilik & Turizm', desc: 'Doluluk, enerji ve misafir deneyimi verilerini birleştirerek gelir yönetimini güçlendirin, operasyon maliyetlerini azaltın.', cases: ['Doluluk ve talep tahmini', 'Oda bazlı enerji tasarrufu', 'Misafir yorumlarından duygu analizi', 'Housekeeping ve personel planlama'], kpis: ['RevPAR', 'Oda başı enerji', 'Misafir memnuniyeti'] },
      { name: 'Finans & Hizmet', desc: 'Operasyonel süreçleri, müşteri etkileşimlerini ve riskleri analiz ederek hizmet hızını ve müşteri memnuniyetini artırın.', cases: ['Süreç madenciliği ve otomasyon', 'Müşteri kaybı (churn) tahmini', 'Anomali ve dolandırıcılık tespiti', 'Çağrı merkezi performans analizi'], kpis: ['İşlem süresi', 'Churn oranı', 'İlk temasta çözüm'] },
      { name: 'Kamu & Belediye', desc: 'Şehir altyapısını, kaynakları ve vatandaş hizmetlerini veriyle yöneterek daha akıllı, daha sürdürülebilir şehirler inşa edin.', cases: ['Su ve enerji şebekesi izleme', 'Atık toplama rota optimizasyonu', 'Trafik ve yoğunluk analizi', 'Bina ve tesis enerji yönetimi'], kpis: ['Kaynak verimliliği', 'Hizmet süresi', 'Karbon salımı'] },
      { name: 'Eğitim', desc: 'Kampüs operasyonlarını, kaynak kullanımını ve akademik süreçleri analiz ederek daha verimli ve sürdürülebilir eğitim ortamları oluşturun.', cases: ['Kampüs enerji yönetimi', 'Derslik ve kaynak kullanım analizi', 'Öğrenci başarı ve risk analizi', 'Bakım ve tesis planlama'], kpis: ['Kaynak kullanımı', 'Enerji / öğrenci', 'Başarı oranı'] },
    ],
    yourSector: { name: 'Sizin sektörünüz', desc: 'Listede yok mu? Veri üreten her operasyon için özel bir çözüm kurgulayabiliriz.' },

    integrationsTitle: 'Mevcut sistemlerinizle entegre çalışır',
    integrations: ['ERP Sistemleri', 'MES', 'SCADA', 'OPC-UA', 'MQTT', 'Modbus', 'IoT Sensörleri', 'IP Kameralar', 'CRM', 'WMS', 'Bina Otomasyonu (BMS)', 'Enerji Analizörleri', 'Excel / CSV', 'REST API', 'SQL Veritabanları', 'Bulut Depolama'],

    trustEyebrow: 'Güvenlik & Altyapı',
    trustTitle: 'Kurumsal düzeyde güven',
    trust: [
      { title: 'KVKK & GDPR Uyumlu', desc: 'Kişisel veriler anonimleştirme ve en az veri ilkesiyle işlenir.' },
      { title: 'Bulut, Hibrit veya Yerinde', desc: 'Platformu ihtiyacınıza göre bulutta ya da kendi sunucularınızda çalıştırın.' },
      { title: 'Uçtan Uca Şifreleme', desc: 'Rol bazlı erişim, denetim kayıtları ve şifreli veri iletimi.' },
      { title: 'Açıklanabilir Yapay Zekâ', desc: 'Her önerinin arkasındaki nedeni görün; kara kutu değil, şeffaf kararlar.' },
    ],

    journeyEyebrow: 'Birlikte Çalışma Modeli',
    journeyTitle: 'Küçük başlayın, hızla ölçekleyin',
    journey: [
      { title: 'Keşif & Veri Değerlendirmesi', desc: 'Operasyonunuzu ve veri kaynaklarınızı inceleyip en yüksek etkiyi yaratacak fırsatları belirleriz.' },
      { title: 'Pilot Uygulama', desc: 'Seçilen bir alanda hızlıca devreye alır, ilk sonuçları ve kazancı somut olarak ölçeriz.' },
      { title: 'Ölçekleme', desc: 'Başarıyı kanıtlanan modülleri tüm tesislere, hatlara ve departmanlara yayarız.' },
      { title: 'Sürekli Öğrenme', desc: 'Modeller verinizle birlikte öğrenir ve gelişir; kazanç her ay biraz daha artar.' },
    ],

    faqEyebrow: 'Sıkça Sorulan Sorular',
    faq: [
      { q: 'Averreo Intelligence hangi tür işletmeler için uygun?', a: 'Veri üreten her işletme için. Üretimden perakendeye, sağlıktan kamuya kadar farklı sektörlere ve KOBİ’lerden büyük holdinglere kadar farklı ölçeklere uyarlanabilen modüler bir yapıya sahiptir.' },
      { q: 'Mevcut yazılımlarımızı değiştirmemiz gerekiyor mu?', a: 'Hayır. Platform, kullandığınız ERP, MES, SCADA, sensör ve diğer sistemlerin üzerine bir zekâ katmanı olarak eklenir. Mevcut yatırımlarınızı korur, onlardan daha fazla değer üretir.' },
      { q: 'Verilerimiz nasıl korunuyor?', a: 'Veriler şifreli olarak iletilir ve saklanır, rol bazlı erişim ile korunur. Dilerseniz platformu tamamen kendi altyapınızda (on-premise) çalıştırabilirsiniz. KVKK ve GDPR gereklilikleri tasarımın merkezindedir.' },
      { q: 'Çalışan performans analitiği etik mi?', a: 'Amacımız bireyleri gözetlemek değil, süreçleri ve ekip verimliliğini iyileştirmektir. Analizler mümkün olduğunca anonim ve toplu yapılır, şeffaflık ve KVKK uyumu esas alınır.' },
      { q: 'İlk sonuçları ne zaman görebiliriz?', a: 'Veri erişimine ve kapsama bağlı olarak pilot çalışmalarda ilk içgörüler genellikle birkaç hafta içinde elde edilir. Pilot aşamasında kazancı birlikte ölçer, sonra ölçekleriz.' },
    ],

    ctaTitle: 'İşletmenizi daha akıllı hale getirmeye hazır mısınız?',
    ctaDesc: 'Erken erişim programımıza katılın; operasyonunuz için özel bir ön değerlendirme ile başlayalım.',
    cta: 'Bizimle İletişime Geçin',
  },

  en: {
    badge: 'AI-Powered Operational Intelligence Platform',
    titleA: 'Averreo',
    titleB: 'Intelligence',
    subtitle: 'We unify every piece of data your business generates — energy, workforce, machines, quality, and supply chain — into a single AI hub, making your company more efficient, faster, and more competitive.',
    ctaPrimary: 'Request a Demo',
    ctaSecondary: 'Explore Modules',
    earlyAccess: 'Early Access Program',

    dash: {
      live: 'Live',
      sample: 'Sample view',
      kpis: [
        { label: 'Energy Consumption', suffix: '%', value: -12.4, decimals: 1, trend: 'vs. last month' },
        { label: 'Equipment Effectiveness (OEE)', suffix: '%', value: 87.2, decimals: 1, trend: 'target 85%' },
        { label: 'Quality Score', suffix: '%', value: 99.1, decimals: 1, trend: 'last 7 days' },
      ],
      chart: 'Production efficiency',
      insightTitle: 'AI Insight',
      insight: 'Increased vibration detected on Line 3 compressor. Maintenance is recommended within 48 hours to prevent failure.',
      action: 'Create work order',
    },

    stats: [
      { value: '24/7', label: 'Continuous monitoring and analysis' },
      { value: '360°', label: 'Your entire operation on one screen' },
      { value: '11+', label: 'Sector-adaptable architecture' },
      { value: 'End-to-End', label: 'Full loop from data to action' },
    ],

    problemEyebrow: 'Why Averreo Intelligence?',
    problemTitle: 'You have data. But do you have insight?',
    problemDesc: 'Most businesses today generate massive amounts of data from machines, meters, ERP systems, cameras, and people. Yet that data sits scattered across systems, gets reported too late, and is unavailable at the moment of decision. Averreo Intelligence unifies this data, makes sense of it with AI, and answers not just “what happened?” but “what will happen, and what should I do?”',
    problemPoints: [
      'Unifies data from scattered systems into one hub',
      'Predicts problems before they occur',
      'Ties every recommendation to a measurable gain',
    ],

    stepsEyebrow: 'How It Works',
    stepsTitle: 'Four steps from data to action',
    steps: [
      { title: 'Connect', desc: 'We securely connect to all your existing data sources — ERP, MES, SCADA, IoT sensors, energy meters, cameras, and even spreadsheets.' },
      { title: 'Understand', desc: 'We clean, unify, and model your data into a digital representation of your business, so your whole operation speaks one language.' },
      { title: 'Predict', desc: 'Machine learning models detect anomalies, failures, demand swings, and inefficiencies before they happen.' },
      { title: 'Act', desc: 'Prioritized recommendations, automated alerts, and work orders turn insight into results on the ground — and we measure the gain.' },
    ],

    modulesEyebrow: 'Platform Modules',
    modulesTitle: 'AI for every corner of your business',
    modulesDesc: 'A modular architecture you can pick and combine as needed. Start with a single module and expand as you grow.',
    modules: [
      { title: 'Energy Intelligence', desc: 'Profiles consumption, instantly catches waste and abnormal usage, and lowers your energy bill through peak-load and tariff optimization.', tags: ['Anomaly detection', 'Peak-load management', 'Tariff optimization'] },
      { title: 'Workforce & Performance Analytics', desc: 'Analyzes shift planning, workload balance, productivity, and skill gaps to unlock your teams’ potential — with a GDPR-compliant, ethical, and transparent approach.', tags: ['Shift optimization', 'Skills map', 'Workload balance'] },
      { title: 'Predictive Maintenance', desc: 'Predicts failures from sensor and machine data, reducing unplanned downtime, extending equipment life, and cutting maintenance costs.', tags: ['Failure prediction', 'Remaining useful life', 'Downtime reduction'] },
      { title: 'Vision-Based Quality', desc: 'Uses computer vision to detect production-line defects faster and more consistently than the human eye, reducing scrap and returns.', tags: ['Defect detection', 'Scrap analysis', 'Root cause'] },
      { title: 'Supply Chain & Demand Forecasting', desc: 'Forecasts demand, optimizes inventory levels, and spots supply risks early to improve cash flow and delivery performance.', tags: ['Demand forecasting', 'Inventory optimization', 'Supplier risk'] },
      { title: 'Process Mining & Bottleneck Analysis', desc: 'Reveals how your processes actually run, pinpointing bottlenecks, delays, and repetitive work — and highlighting automation opportunities.', tags: ['Bottleneck detection', 'Cycle time', 'Automation opportunities'] },
      { title: 'Health, Safety & Site Security', desc: 'Detects PPE compliance, danger-zone breaches, and risky behavior from camera feeds in real time, helping prevent workplace accidents.', tags: ['PPE detection', 'Zone breach', 'Risk score'] },
      { title: 'AI Assistant', desc: 'Ask your data questions in plain language: “Which line used the most energy last month?” The assistant answers in seconds with reports and recommendations.', tags: ['Natural-language query', 'Auto reports', 'Decision support'] },
      { title: 'Sustainability & Carbon', desc: 'Automatically calculates your carbon footprint and resource use, simplifies ESG reporting, and grounds your green transition roadmap in data.', tags: ['Carbon tracking', 'ESG reporting', 'Resource efficiency'] },
    ],

    valuesEyebrow: 'Outcomes We Focus On',
    valuesTitle: 'Four core gains',
    values: [
      { title: 'Efficiency', desc: 'Direct resources, energy, and people to exactly where they matter — more output from the same input.' },
      { title: 'Speed', desc: 'Real-time insight instead of weekly reports; make decisions in seconds, not hours.' },
      { title: 'Quality', desc: 'Catch defects and deviations at the source for consistent, measurable quality.' },
      { title: 'Competitiveness', desc: 'Lower costs, faster delivery, and data-driven strategy to stay a step ahead.' },
    ],

    sectorsEyebrow: 'Industries',
    sectorsTitle: 'Adapts to every industry, every scale',
    sectorsDesc: 'A factory, a hotel chain, a hospital, or a municipality: every organization that runs on data can become smarter.',
    useCasesLabel: 'Example use cases',
    kpiLabel: 'Focus metrics',
    sectors: [
      { name: 'Manufacturing', desc: 'Monitor lines, machines, and energy from one hub to raise OEE and reduce downtime and scrap.', cases: ['Predicting machine failures in advance', 'Line-level energy and efficiency analysis', 'Vision-based quality control', 'Production planning and bottleneck detection'], kpis: ['OEE', 'Scrap rate', 'kWh / unit'] },
      { name: 'Energy & Utilities', desc: 'Analyze grid, plant, and distribution data to forecast demand, reduce losses, and optimize asset management.', cases: ['Consumption and generation forecasting', 'Loss and anomaly detection', 'Asset health and maintenance planning', 'Renewable resource optimization'], kpis: ['Loss rate', 'Forecast accuracy', 'Outage time'] },
      { name: 'Retail & E-Commerce', desc: 'Understand customer behavior, inventory movement, and store performance to grow sales and cut inventory costs.', cases: ['Store-level demand forecasting', 'Dynamic pricing recommendations', 'Staff planning and footfall analysis', 'Store energy management'], kpis: ['Inventory turnover', 'Basket size', 'Staff productivity'] },
      { name: 'Logistics & Warehousing', desc: 'Optimize routes, fleets, and warehouse operations to shorten delivery times and reduce fuel and operating costs.', cases: ['Route and load optimization', 'Warehouse layout and picking analysis', 'Fleet maintenance prediction', 'Delivery delay risk analysis'], kpis: ['On-time delivery', 'Cost per km', 'Picking time'] },
      { name: 'Healthcare', desc: 'Analyze patient flow, resource use, and operational processes to reduce waiting times and raise service quality.', cases: ['Patient volume and bed occupancy forecasting', 'Staff and shift planning', 'Medical device maintenance tracking', 'Consumables inventory optimization'], kpis: ['Waiting time', 'Bed occupancy', 'Resource utilization'] },
      { name: 'Agriculture & Food', desc: 'Manage the entire farm-to-fork chain with data to boost yield, reduce waste, and safeguard food safety.', cases: ['Yield and harvest forecasting', 'Cold-chain monitoring', 'Production-line quality control', 'Water and energy optimization'], kpis: ['Yield per hectare', 'Waste rate', 'Shelf life'] },
      { name: 'Smart Buildings & Construction', desc: 'Analyze building energy, HVAC, and occupancy data to lower operating costs; track safety and progress on construction sites.', cases: ['HVAC and lighting optimization', 'Occupancy-based energy management', 'Construction site safety monitoring', 'Project progress and cost analysis'], kpis: ['kWh / m²', 'Comfort score', 'Incident rate'] },
      { name: 'Hospitality & Tourism', desc: 'Combine occupancy, energy, and guest-experience data to strengthen revenue management and reduce operating costs.', cases: ['Occupancy and demand forecasting', 'Room-level energy savings', 'Sentiment analysis of guest reviews', 'Housekeeping and staff planning'], kpis: ['RevPAR', 'Energy per room', 'Guest satisfaction'] },
      { name: 'Finance & Services', desc: 'Analyze operational processes, customer interactions, and risk to improve service speed and customer satisfaction.', cases: ['Process mining and automation', 'Customer churn prediction', 'Anomaly and fraud detection', 'Contact-center performance analysis'], kpis: ['Processing time', 'Churn rate', 'First-contact resolution'] },
      { name: 'Public Sector & Cities', desc: 'Manage city infrastructure, resources, and citizen services with data to build smarter, more sustainable cities.', cases: ['Water and energy network monitoring', 'Waste-collection route optimization', 'Traffic and density analysis', 'Facility energy management'], kpis: ['Resource efficiency', 'Service time', 'Carbon emissions'] },
      { name: 'Education', desc: 'Analyze campus operations, resource use, and academic processes to create more efficient and sustainable learning environments.', cases: ['Campus energy management', 'Classroom and resource utilization', 'Student success and risk analysis', 'Maintenance and facility planning'], kpis: ['Resource utilization', 'Energy / student', 'Success rate'] },
    ],
    yourSector: { name: 'Your industry', desc: 'Not on the list? We can design a tailored solution for any operation that generates data.' },

    integrationsTitle: 'Works with the systems you already have',
    integrations: ['ERP Systems', 'MES', 'SCADA', 'OPC-UA', 'MQTT', 'Modbus', 'IoT Sensors', 'IP Cameras', 'CRM', 'WMS', 'Building Automation (BMS)', 'Energy Meters', 'Excel / CSV', 'REST API', 'SQL Databases', 'Cloud Storage'],

    trustEyebrow: 'Security & Infrastructure',
    trustTitle: 'Enterprise-grade trust',
    trust: [
      { title: 'GDPR & KVKK Compliant', desc: 'Personal data is processed with anonymization and data-minimization principles.' },
      { title: 'Cloud, Hybrid, or On-Prem', desc: 'Run the platform in the cloud or on your own servers — your choice.' },
      { title: 'End-to-End Encryption', desc: 'Role-based access, audit logs, and encrypted data transfer.' },
      { title: 'Explainable AI', desc: 'See the reasoning behind every recommendation — transparent decisions, not a black box.' },
    ],

    journeyEyebrow: 'How We Work Together',
    journeyTitle: 'Start small, scale fast',
    journey: [
      { title: 'Discovery & Data Assessment', desc: 'We review your operation and data sources to identify the opportunities with the highest impact.' },
      { title: 'Pilot', desc: 'We deploy quickly in a selected area and measure the first results and gains in concrete terms.' },
      { title: 'Scale', desc: 'We roll out proven modules across all your facilities, lines, and departments.' },
      { title: 'Continuous Learning', desc: 'Models learn and improve with your data — and the gains grow month after month.' },
    ],

    faqEyebrow: 'Frequently Asked Questions',
    faq: [
      { q: 'What kind of businesses is Averreo Intelligence for?', a: 'Any business that generates data. Its modular architecture adapts to industries from manufacturing and retail to healthcare and the public sector, and to scales from SMEs to large enterprises.' },
      { q: 'Do we need to replace our existing software?', a: 'No. The platform adds an intelligence layer on top of your ERP, MES, SCADA, sensors, and other systems. It protects your existing investments and extracts more value from them.' },
      { q: 'How is our data protected?', a: 'Data is encrypted in transit and at rest and protected with role-based access. You can also run the platform entirely on your own infrastructure (on-premise). GDPR and KVKK requirements are at the core of the design.' },
      { q: 'Is workforce performance analytics ethical?', a: 'Our goal is not to monitor individuals but to improve processes and team productivity. Analyses are anonymous and aggregated wherever possible, with transparency and privacy compliance as core principles.' },
      { q: 'When will we see the first results?', a: 'Depending on data access and scope, pilots typically deliver first insights within a few weeks. We measure the gains together during the pilot, then scale.' },
    ],

    ctaTitle: 'Ready to make your business smarter?',
    ctaDesc: 'Join our early access program and let’s start with a tailored assessment of your operation.',
    cta: 'Get in Touch',
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useCountUp(target, decimals = 0, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val.toFixed(decimals);
}

function SectionHeading({ eyebrow, title, desc, center = true }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-14 md:mb-20 reveal`}>
      <div className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300/70 mb-5`}>
        <span className="w-6 h-px bg-cyan-300/50"></span>
        {eyebrow}
        <span className="w-6 h-px bg-cyan-300/50"></span>
      </div>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-6">{title}</h2>
      {desc && <p className="text-white/55 text-base md:text-xl font-light leading-relaxed">{desc}</p>}
    </div>
  );
}

function KpiTile({ kpi }) {
  const v = useCountUp(kpi.value, kpi.decimals);
  const negative = kpi.value < 0;
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
      <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/45 mb-2 leading-tight min-h-[2em]">{kpi.label}</div>
      <div className={`text-2xl md:text-3xl font-black tracking-tight ${negative ? 'text-emerald-300' : 'text-white'}`}>
        {v}{kpi.suffix}
      </div>
      <div className="text-[10px] text-white/35 mt-1">{kpi.trend}</div>
    </div>
  );
}

function DashboardMockup({ d }) {
  return (
    <div className="relative ai-float-slow">
      <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-3xl rounded-[3rem] pointer-events-none"></div>
      <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(34,211,238,0.25)] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Brain size={15} className="text-black" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Averreo Intelligence</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-white/30">{d.sample}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{d.live}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {d.kpis.map((k, i) => <KpiTile key={i} kpi={k} />)}
          </div>

          {/* Chart */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/50">{d.chart}</span>
              <span className="text-xs font-semibold text-cyan-300">+18.6%</span>
            </div>
            <svg viewBox="0 0 300 90" className="w-full h-24" preserveAspectRatio="none">
              <defs>
                <linearGradient id="aiLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <linearGradient id="aiFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[22, 45, 68].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />)}
              <path d="M0,70 C25,66 40,58 60,60 S95,48 120,50 S160,30 185,36 S225,22 250,18 S285,12 300,8 L300,90 L0,90 Z" fill="url(#aiFill)" />
              <path className="ai-draw" d="M0,70 C25,66 40,58 60,60 S95,48 120,50 S160,30 185,36 S225,22 250,18 S285,12 300,8" fill="none" stroke="url(#aiLine)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="300" cy="8" r="4" fill="#a78bfa" className="animate-pulse" />
            </svg>
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-cyan-400/10 to-transparent ai-scan pointer-events-none"></div>
          </div>

          {/* Insight */}
          <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-4 flex gap-3">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-violet-400/15 border border-violet-300/20 flex items-center justify-center">
              <Sparkles size={16} className="text-violet-200" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-widest text-violet-200/80 mb-1">{d.insightTitle}</div>
              <p className="text-xs md:text-sm text-white/75 leading-relaxed">{d.insight}</p>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-cyan-300">
                {d.action} <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Intelligence() {
  const { i18n } = useTranslation();
  const c = CONTENT[i18n.language] || CONTENT.tr;
  const [sector, setSector] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const modulesRef = useRef(null);

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
      els.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
      });
    }, 100);
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, [c]);

  const activeSector = c.sectors[sector];
  const ActiveSectorIcon = SECTOR_ICONS[sector];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="/assets/images/intelligence_hero.jpg" alt="" className="w-full h-full object-cover opacity-45 scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
          <div className="absolute inset-0 ai-grid-bg opacity-60"></div>
        </div>
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-cyan-500/15 bg-glow-orb"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/15 bg-glow-orb"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-16 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/20 bg-cyan-400/5 backdrop-blur-sm text-cyan-100/80 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse"></span>
              {c.badge}
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-500">{c.titleA}</span>
              <span className="block ai-gradient-text pb-2">{c.titleB}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl mb-10">
              {c.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link id="intelligence-demo-cta" to="/iletisim" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-bold hover:shadow-[0_0_40px_rgba(103,232,249,0.45)] hover:scale-[1.03] transition-all duration-300">
                {c.ctaPrimary}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                id="intelligence-modules-cta"
                type="button"
                onClick={() => modulesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                {c.ctaSecondary}
                <ChevronDown size={18} />
              </button>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-xs text-white/40">
              <Sparkles size={14} className="text-violet-300" /> {c.earlyAccess}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <DashboardMockup d={c.dash} />
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4">
          {c.stats.map((s, i) => (
            <div key={i} className={`py-10 md:py-14 px-4 text-center reveal ${i % 2 === 1 ? 'border-l border-white/5' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/5' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
              <div className="text-3xl md:text-5xl font-black tracking-tight ai-gradient-text mb-2">{s.value}</div>
              <div className="text-white/50 text-xs md:text-sm font-light">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="relative px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300/70 mb-5">
              <span className="w-6 h-px bg-cyan-300/50"></span>{c.problemEyebrow}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.02] mb-8">{c.problemTitle}</h2>
            <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">{c.problemDesc}</p>
          </div>
          <div className="space-y-4 reveal reveal-delay-1">
            {c.problemPoints.map((p, i) => (
              <div key={i} className="ai-card-glow group flex items-center gap-5 p-6 md:p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500 hover:translate-x-2">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-cyan-200 font-black">
                  0{i + 1}
                </div>
                <span className="text-lg md:text-xl font-medium text-white/85">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <SectionHeading eyebrow={c.stepsEyebrow} title={c.stepsTitle} />
        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-violet-500/0"></div>
          {c.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div key={i} className={`relative group reveal reveal-delay-${Math.min(i, 3)}`}>
                <div className="ai-card-glow h-full rounded-3xl bg-[#060606] border border-white/10 p-7 md:p-8 hover:-translate-y-2 transition-all duration-500">
                  <div className="relative w-14 h-14 rounded-2xl bg-black border border-white/15 flex items-center justify-center mb-7 group-hover:border-cyan-300/50 transition-colors">
                    <Icon size={24} className="text-cyan-200" />
                    <span className="absolute -top-2 -right-2 text-[10px] font-black w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black flex items-center justify-center">{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">{s.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ MODULES ============ */}
      <section ref={modulesRef} id="moduller" className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto scroll-mt-24">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 bg-glow-orb"></div>
        <SectionHeading eyebrow={c.modulesEyebrow} title={c.modulesTitle} desc={c.modulesDesc} />
        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.modules.map((m, i) => {
            const Icon = MODULE_ICONS[i];
            return (
              <article key={i} className={`ai-card-glow group relative rounded-3xl bg-white/[0.025] backdrop-blur-sm border border-white/10 p-7 md:p-8 overflow-hidden hover:bg-white/[0.045] hover:-translate-y-1.5 transition-all duration-500 reveal reveal-delay-${i % 3}`}>
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400/0 to-violet-500/0 group-hover:from-cyan-400/15 group-hover:to-violet-500/10 blur-2xl transition-all duration-700"></div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Icon size={26} className="text-cyan-100" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{m.title}</h3>
                  <p className="text-white/55 text-sm md:text-base font-light leading-relaxed mb-6">{m.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((t, j) => (
                      <span key={j} className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 group-hover:border-cyan-300/25 group-hover:text-white/80 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <SectionHeading eyebrow={c.valuesEyebrow} title={c.valuesTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.values.map((v, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <div key={i} className={`group relative rounded-[2rem] p-[1px] bg-gradient-to-b from-white/15 to-white/0 hover:from-cyan-300/50 hover:to-violet-500/20 transition-all duration-500 reveal reveal-delay-${i}`}>
                <div className="h-full rounded-[calc(2rem-1px)] bg-[#050505] p-8 md:p-9 flex flex-col">
                  <Icon size={30} className="text-cyan-200 mb-10 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">{v.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ SECTORS ============ */}
      <section id="sektorler" className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <SectionHeading eyebrow={c.sectorsEyebrow} title={c.sectorsTitle} desc={c.sectorsDesc} />

        <div className="flex flex-wrap justify-center gap-2.5 mb-10 reveal" role="tablist" aria-label={c.sectorsEyebrow}>
          {c.sectors.map((s, i) => {
            const Icon = SECTOR_ICONS[i];
            const active = i === sector;
            return (
              <button
                key={i}
                id={`sector-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSector(i)}
                className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${active
                  ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.03] text-white/65 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/25'}`}
              >
                <Icon size={16} />
                {s.name}
              </button>
            );
          })}
        </div>

        <div key={`${i18n.language}-${sector}`} className="ai-fade-in relative rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 bg-glow-orb"></div>
          <div className="relative grid lg:grid-cols-[1fr_1.2fr] gap-10 p-8 md:p-14">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mb-7 shadow-[0_0_40px_rgba(103,232,249,0.3)]">
                <ActiveSectorIcon size={30} className="text-black" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-5">{activeSector.name}</h3>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8">{activeSector.desc}</p>
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3">{c.kpiLabel}</div>
              <div className="flex flex-wrap gap-2">
                {activeSector.kpis.map((k, j) => (
                  <span key={j} className="px-4 py-1.5 rounded-full text-sm bg-cyan-400/10 border border-cyan-300/20 text-cyan-100">{k}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-bold mb-4">{c.useCasesLabel}</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {activeSector.cases.map((uc, j) => (
                  <div key={j} className="group flex items-start gap-3 p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-300/30 hover:bg-black/60 transition-all">
                    <div className="w-7 h-7 shrink-0 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-300 group-hover:text-black transition-colors">
                      <Check size={14} />
                    </div>
                    <span className="text-white/80 text-sm md:text-base leading-snug">{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link to="/iletisim" className="mt-5 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-dashed border-white/15 hover:border-cyan-300/40 bg-white/[0.015] p-6 md:p-8 transition-all reveal">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl border border-white/15 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <Plus size={22} />
            </div>
            <div>
              <div className="text-lg font-bold">{c.yourSector.name}</div>
              <div className="text-white/50 text-sm font-light">{c.yourSector.desc}</div>
            </div>
          </div>
          <ArrowRight size={20} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all self-end sm:self-auto" />
        </Link>
      </section>

      {/* ============ INTEGRATIONS ============ */}
      <section className="py-20 border-y border-white/5 overflow-hidden relative reveal">
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        <h2 className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-10 px-6">{c.integrationsTitle}</h2>
        <div className="pause-on-hover">
          <div className="flex w-max animate-marquee">
            {[0, 1].map(dup => (
              <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {c.integrations.map((it, i) => (
                  <div key={i} className="mx-2 md:mx-3 px-5 md:px-7 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white/65 text-sm md:text-lg font-light whitespace-nowrap hover:text-white hover:border-cyan-300/40 transition-colors">
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST ============ */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 max-w-7xl mx-auto">
        <SectionHeading eyebrow={c.trustEyebrow} title={c.trustTitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.trust.map((t, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={i} className={`ai-card-glow rounded-3xl bg-white/[0.025] border border-white/10 p-7 hover:bg-white/[0.045] transition-all duration-500 reveal reveal-delay-${i}`}>
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-300/20 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-emerald-200" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ JOURNEY ============ */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto reveal">
        <div className="relative rounded-[2rem] md:rounded-[3rem] bg-[#050505] border border-white/10 p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 bg-glow-orb translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 bg-glow-orb -translate-x-1/3 translate-y-1/3"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-cyan-300/70 mb-5">
              <span className="w-6 h-px bg-cyan-300/50"></span>{c.journeyEyebrow}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-14">{c.journeyTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {c.journey.map((j, i) => (
                <div key={i} className="relative group">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl font-black text-white/10 group-hover:text-cyan-300/40 transition-colors duration-500">0{i + 1}</span>
                    {i < c.journey.length - 1 && <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>}
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{j.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed text-sm md:text-base">{j.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-4xl mx-auto">
        <SectionHeading eyebrow="FAQ" title={c.faqEyebrow} />
        <div className="space-y-3 reveal">
          {c.faq.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className={`rounded-2xl border transition-all duration-300 ${open ? 'border-cyan-300/30 bg-white/[0.04]' : 'border-white/10 bg-white/[0.015] hover:border-white/20'}`}>
                <button
                  id={`faq-${i}`}
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 text-left p-6"
                >
                  <span className="text-base md:text-lg font-semibold">{f.q}</span>
                  <span className={`w-8 h-8 shrink-0 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45 bg-white text-black' : ''}`}>
                    <Plus size={16} />
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-white/60 font-light leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-6 md:px-12 pb-28 md:pb-36 max-w-6xl mx-auto reveal">
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 p-10 md:p-20 text-center">
          <img src="/assets/images/intelligence_hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-violet-950/60"></div>
          <div className="absolute inset-0 ai-grid-bg"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center ai-float shadow-[0_0_50px_rgba(103,232,249,0.4)]">
              <Brain size={30} className="text-black" />
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-6 max-w-3xl mx-auto leading-[1.05]">{c.ctaTitle}</h2>
            <p className="text-white/60 text-base md:text-xl font-light max-w-2xl mx-auto mb-10">{c.ctaDesc}</p>
            <Link id="intelligence-contact-cta" to="/iletisim" className="group inline-flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-white text-black text-base md:text-lg font-bold rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300">
              {c.cta}
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
