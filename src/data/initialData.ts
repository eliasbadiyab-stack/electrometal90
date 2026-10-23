import { 
  User, 
  Product, 
  Category, 
  DynamicSection, 
  SiteSettings, 
  Advertisement, 
  Announcement, 
  Order, 
  SupportTicket, 
  DirectMessage,
  AuditLog,
  ManagedFile
} from '../types';

export const initialSiteSettings: SiteSettings = {
  siteName: 'Electro Metal',
  brandName: 'Electro Metal',
  brandNameFa: 'الکترو متال',
  siteTitle: 'مرجع تخصصی مهندسی الکترونیک، مدارهای PCB و محصولات پیشرفته',
  siteDescription: 'پلتفرم جامع مهندسی الکترونیک: دانلود مدارهای PCB، فایل‌های آلتیوم دیزاینر، شبیه‌سازی پروتئوس، گربر، کدهای آردوینو و STM32 و خرید تجهیزات تخصصی با مدیریت الیاس بادیاب.',
  creatorName: 'الیاس بادیاب',
  creatorEmail: 'eliasbadiyab@gmail.com',
  phone: '۰۲۱-۶۶۷۸۹۰۰۰',
  storeAddress: 'تهران، خیابان جمهوری، تقاطع حافظ، مجتمع تجاری الکترونیک، واحد ۴۰۲',
  email: 'eliasbadiyab@gmail.com',
  copyrightText: 'تمامی حقوق این وب‌سایت برای برند Electro Metal و الیاس بادیاب محفوظ است.',
  aboutText: 'برند Electro Metal به مدیریت و بنیان‌گذاری الیاس بادیاب، مرجع پیشرو در پژوهش، طراحی و توسعه سیستم‌های الکترونیکی پیشرفته، مدارهای چاپی چندلایه فرکانس‌بالا، سیستم‌های نهفته (Embedded Systems) و تولید محتوای تخصصی مهندسی است. هدف ما ارائه دقیق‌ترین و استانداردترین فایل‌های صنعتی، شبیه‌سازی‌های تایید شده آزمایشگاهی و قطعات باکیفیت است.',
  logoUrl: '',
  mobileLogoUrl: '',
  faviconUrl: '',
  footerLogoUrl: '',
  socialLinks: {
    youtube: 'https://youtube.com/@eliasbadiyab',
    telegram: 'https://t.me/electrometal_org',
    instagram: 'https://instagram.com/electrometal_official',
    github: 'https://github.com/eliasbadiyab',
    linkedin: 'https://linkedin.com/in/eliasbadiyab'
  },
  theme: {
    defaultMode: 'dark',
    accentColor: 'cyan',
    fontFamily: 'Vazirmatn'
  },
  features: {
    messagingEnabled: true,
    supportTicketsEnabled: true,
    userRegistrationEnabled: true,
    googleLoginEnabled: true,
    adsEnabled: true,
    newsEnabled: true,
    digitalDownloadsEnabled: true
  },
  seo: {
    metaTitle: 'Electro Metal | مرجع مهندسی الکترونیک و فروشگاه فایل‌های صنعتی',
    metaDescription: 'دانلود و خرید پروژه‌های آلتیوم دیزاینر، پروتئوس، فایل‌های گربر، مدارهای الکترونیکی و تجهیزات آزمایشگاهی الیاس بادیاب.',
    keywords: 'الکترومیک، آلتیوم، پروتئوس، گربر، PCB، مدارهای الکترونیکی، الیاس بادیاب، STM32، الکترونیک صنعتی',
    ogImage: '/assets/hero_electro_metal_1792786859342.jpg'
  },
  paymentGateway: {
    gatewayProvider: 'zarinpal',
    merchantId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    sandboxMode: false
  }
};

export const initialUsers: User[] = [
  {
    id: 'usr_owner_elias',
    name: 'الیاس بادیاب',
    email: 'eliasbadiyab@gmail.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    role: 'owner',
    isVerified: true,
    isSpecialMember: true,
    specialTitle: 'بنیان‌گذار و طراح ارشد سخت‌افزار',
    isBlocked: false,
    avatarUrl: '',
    createdAt: '2025-01-10T10:00:00Z',
    lastLoginAt: '2026-10-23T20:15:00Z',
    ordersCount: 14
  },
  {
    id: 'usr_admin_reza',
    name: 'مهندس رضایی',
    email: 'rezaei.firmware@gmail.com',
    phone: '۰۹۱۸۸۸۸۲۲۳۳',
    role: 'admin',
    isVerified: true,
    isSpecialMember: true,
    specialTitle: 'سرپرست تیم فریمور و میکروکنترلر',
    isBlocked: false,
    createdAt: '2025-03-12T14:20:00Z',
    lastLoginAt: '2026-10-22T19:00:00Z',
    ordersCount: 8
  },
  {
    id: 'usr_sarah_support',
    name: 'سارا مقدم',
    email: 'sarah.support@electrometal.com',
    role: 'support',
    isVerified: true,
    isSpecialMember: true,
    specialTitle: 'مدیر پشتیبانی و خدمات مشتریان',
    isBlocked: false,
    createdAt: '2025-06-01T09:00:00Z',
    lastLoginAt: '2026-10-23T11:45:00Z',
    ordersCount: 2
  },
  {
    id: 'usr_customer_demo',
    name: 'کیان مهرآذر',
    email: 'kian.lab@gmail.com',
    phone: '۰۹۳۵۱۲۳۴۵۶۷',
    role: 'user',
    isVerified: false,
    isSpecialMember: false,
    isBlocked: false,
    createdAt: '2026-02-15T16:30:00Z',
    lastLoginAt: '2026-10-23T18:10:00Z',
    ordersCount: 3
  }
];

export const initialCategories: Category[] = [
  {
    id: 'cat_pcb_altium',
    name: 'Altium & PCB Designs',
    nameFa: 'طراحی بردهای PCB و آلتیوم',
    slug: 'pcb-altium',
    iconName: 'Cpu',
    description: 'فایل‌های سورس Altium Designer، بردهای چندلایه صنعتی و نقشه‌های شماتیک',
    count: 24
  },
  {
    id: 'cat_proteus_sim',
    name: 'Proteus Simulations',
    nameFa: 'شبیه‌سازی‌های Proteus',
    slug: 'proteus-simulations',
    iconName: 'Activity',
    description: 'فایل‌های شبیه‌سازی عملکردی مدارهای آنالوگ و دیجیتال در نرم‌افزار پروتئوس',
    count: 18
  },
  {
    id: 'cat_firmware_code',
    name: 'Firmware & Codes',
    nameFa: 'کد و فریمور میکروکنترلرها',
    slug: 'firmware-code',
    iconName: 'Code',
    description: 'کدهای C/C++، فریمورهای STM32، کدهای آردوینو و هدرهای استاندارد',
    count: 15
  },
  {
    id: 'cat_physical_hardware',
    name: 'Physical Lab Equipment',
    nameFa: 'تجهیزات و بردهای فیزیکی',
    slug: 'physical-equipment',
    iconName: 'PackageCheck',
    description: 'بردهای آماده مونتاژ شده، منابع تغذیه آزمایشگاهی و ماژول‌های توسعه صنعتی',
    count: 12
  },
  {
    id: 'cat_engineering_books',
    name: 'Engineering Handbooks',
    nameFa: 'کتاب‌ها و دوره‌های تخصصی',
    slug: 'engineering-books',
    iconName: 'BookOpen',
    description: 'کتاب‌های جامع دیجیتال، مراجع طراحی مدارات فرکانس بالا و دستورالعمل‌های EMC',
    count: 9
  },
  {
    id: 'cat_music_beats',
    name: 'Electro Beats & Tracks',
    nameFa: 'بیت و موسیقی الکترونیک',
    slug: 'music-beats',
    iconName: 'Music',
    description: 'آهنگ‌ها، بیت‌های اختصاصی متال و الکترونیک با لایسنس آزاد برای یوتیوبرها',
    count: 7
  }
];

export const initialDynamicSections: DynamicSection[] = [
  {
    id: 'sec_electronics_featured',
    name: 'Featured Electronics & PCB',
    titleFa: 'مدارهای تخصصی و بردهای مهندسی',
    subtitleFa: 'طراحی‌های حرفه‌ای صنعتی تست شده در آزمایشگاه Electro Metal',
    iconName: 'Cpu',
    contentType: 'electronics',
    order: 1,
    isActive: true,
    isPublic: true,
    isPurchasable: true,
    description: 'مجموعه دست‌چین شده از مدارات قدرت، فرکانس بالا و پردازنده‌های آرم'
  },
  {
    id: 'sec_digital_files',
    name: 'Digital Project Archives',
    titleFa: 'آرشیو فایل‌های دیجیتال و دانلودی',
    subtitleFa: 'دسترسی آنی به سورس آلتیوم، گربر، کدهای HEX و شبیه‌سازی پروتئوس',
    iconName: 'DownloadCloud',
    contentType: 'digital_files',
    order: 2,
    isActive: true,
    isPublic: true,
    isPurchasable: true,
    description: 'فایل‌های استاندارد سازگار با JLCPCB و PCBWay'
  },
  {
    id: 'sec_physical_store',
    name: 'Physical Products Store',
    titleFa: 'فروشگاه تجهیزات فیزیکی و ماژول‌ها',
    subtitleFa: 'تجهیزات تست شده با ارسال سریع و بسته‌بندی ضد استاتیک ESD',
    iconName: 'Package',
    contentType: 'physical_products',
    order: 3,
    isActive: true,
    isPublic: true,
    isPurchasable: true,
    description: 'محصولات سخت‌افزاری تولید کارگاه Electro Metal'
  },
  {
    id: 'sec_engineering_library',
    name: 'Books & Tutorials',
    titleFa: 'کتابخانه و آموزش‌های جامع',
    subtitleFa: 'کتاب‌های الکترونیکی مرجع تالیف مهندس الیاس بادیاب',
    iconName: 'BookMarked',
    contentType: 'books',
    order: 4,
    isActive: true,
    isPublic: true,
    isPurchasable: true,
    description: 'آموزش‌های صفر تا صد طراحی مدارهای چاپی چندلایه و کنترل نویز'
  },
  {
    id: 'sec_beats_audio',
    name: 'Electro Metal Beats',
    titleFa: 'بیت‌ها و موسیقی تکنولوژی',
    subtitleFa: 'موسیقی‌های هیجانی متال و الکترونیک مناسب ویدیوهای مهندسی',
    iconName: 'Headphones',
    contentType: 'music_beats',
    order: 5,
    isActive: true,
    isPublic: true,
    isPurchasable: true,
    description: 'تراک‌های اختصاصی با فرمت WAV 24-bit بدون کپی‌رایت'
  },
  {
    id: 'sec_news_updates',
    name: 'Announcements & YouTube',
    titleFa: 'اخبار و ویدیوهای یوتیوب',
    subtitleFa: 'جدیدترین ویدیوهای آموزشی و گزارش‌های پیشرفت پروژه‌ها',
    iconName: 'Video',
    contentType: 'news',
    order: 6,
    isActive: true,
    isPublic: true,
    isPurchasable: false,
    description: 'اطلاعیه‌های رسمی الیاس بادیاب در یوتیوب و تلگرام'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod_stm32_board',
    sku: 'EM-PCB-STM32H7',
    title: 'STM32H753 High-Speed 4-Layer Industrial Dev Board',
    titleFa: 'برد کنترلر صنعتی ۴ لایه STM32H753XI به همراه سورس کامل آلتیوم',
    slug: 'stm32h753-industrial-dev-board',
    shortDescription: 'برد مهندسی ۴ لایه میکروکنترلر ۴۸۰ مگاهرتزی Cortex-M7 با پورت‌های صنعتی CAN FD، اترنت و QSPI.',
    description: `این پروژه شامل پکیج کامل مهندسی برد توسعه صنعتی STM32H753XI است. این برد به صورت ۴ لایه استاندارد بر اساس استانداردهای IPC-2221 و کنترل امپدانس تفاضلی ۱۰۰ اهم برای اترنت و USB طراحی شده است.
    
محتویات دانلودی پکیج:
۱. فایل کامل پروژه آلتیوم دیزاینر (Altium Designer 24 / .PrjPcb, .SchDoc, .PcbDoc)
۲. فایل‌های گربر استاندارد صنعتی (Gerber RS-274X + Excellon NC Drill)
۳. لیست قطعات مهندسی دقیق (BOM به همراه پارت نامبرهای LCSC و Mouser)
۴. فایل نقشه مونتاژ، راهنمای تست اولیه و فایل سه‌بعدی STEP 3D Model
۵. کدهای نمونه فریمور در محیط STM32CubeIDE بر بستر FreeRTOS به همراه درایور اترنت و CAN FD`,
    price: 890000,
    previousPrice: 1250000,
    discountPercent: 28,
    stock: 999,
    type: 'digital',
    categoryId: 'cat_pcb_altium',
    sectionId: 'sec_electronics_featured',
    tags: ['STM32', 'Altium', 'Gerber', 'PCB', 'Embedded', 'Industrial'],
    mainImage: '/assets/pcb_stm32_controller_1792786860807.jpg',
    gallery: [
      '/assets/pcb_stm32_controller_1792786860807.jpg',
      '/assets/hero_electro_metal_1792786859342.jpg'
    ],
    videoUrl: 'https://youtube.com/watch?v=sample_stm32',
    digitalFile: {
      fileName: 'STM32H753XI_Industrial_Full_Engineering_Pack_v2.4.zip',
      fileExtension: 'ZIP',
      fileSize: '48.6 MB',
      downloadLimit: 5,
      expiryHours: 72,
      checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    technicalSpecs: {
      'پردازنده اصلی': 'ARM Cortex-M7 480MHz 2MB Flash',
      'تعداد لایه‌های برد': '۴ لایه متالیزه FR4 Tg 170°C',
      'پوشش نهایی': 'ENIG (طلاشویی شیمیایی بدون سرب)',
      'ارتباطات': 'Ethernet RMII 10/100, Dual CAN FD, High-Speed USB 2.0',
      'حافظه جانبی': '128Mbit Quad-SPI NOR Flash',
      'استاندارد نرم‌افزاری': 'Altium Designer 23 & 24 Compatible'
    },
    isFeatured: true,
    isRecommended: true,
    isNew: true,
    isBestSeller: true,
    isPublished: true,
    salesCount: 142,
    rating: 4.9,
    createdAt: '2026-08-10T12:00:00Z',
    updatedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'prod_inverter_4kw',
    sku: 'EM-SIM-INV4KW',
    title: '4kW Pure Sine Wave Inverter 48V to 230V Full Package',
    titleFa: 'پروژه کامل اینورتر ۴ کیلووات سینوسی خالص (شماتیک، پروتئوس، آلتیوم و گربر)',
    slug: '4kw-pure-sine-inverter-package',
    shortDescription: 'پروژه مهندسی شده اینورتر موج سینوسی خالص با بازدهی ۹۴٪ دارای محافظت اتصال کوتاه و مدار فیلتر خروجی LC.',
    description: `یکی از کامل‌ترین پروژه‌های قدرت طراحی شده توسط الیاس بادیاب برای سیستم‌های انرژی خورشیدی و یوپی‌اس‌های صنعتی.
    
این پکیج شامل موارد زیر است:
- فایل شبیه‌سازی پروتئوس Proteus 8.16 همراه با مدل ماسفت‌ها و ترانسفرمر
- سورس آلتیوم برد قدرت با مس ضخیم ۲ اونس (2oz Copper)
- محاسبات دقیق سلف خروجی با هسته‌های Kool Mu
- کدهای SPWM برای میکروکنترلر به همراه جدول سینوسی دقیق
- مدار درایور گیت ایزوله TLP250 و سیستم حفاظت اضافه جریان`,
    price: 1150000,
    previousPrice: 1500000,
    discountPercent: 23,
    stock: 999,
    type: 'digital',
    categoryId: 'cat_proteus_sim',
    sectionId: 'sec_digital_files',
    tags: ['Inverter', 'Proteus', 'Power Electronics', 'Pure Sine', 'Schematic'],
    mainImage: '/assets/altium_inverter_circuit_1792786860009.jpg',
    gallery: [
      '/assets/altium_inverter_circuit_1792786860009.jpg',
      '/assets/hero_electro_metal_1792786859342.jpg'
    ],
    digitalFile: {
      fileName: 'ElectroMetal_Inverter_4000W_PureSine_Complete.zip',
      fileExtension: 'ZIP',
      fileSize: '84.2 MB',
      downloadLimit: 5,
      expiryHours: 72
    },
    technicalSpecs: {
      'توان نامی': '۴۰۰۰ وات پیوسته (۶۰۰۰ وات پیک)',
      'ولتاژ ورودی': '۴۸ ولت مستقیم (DC 42V-58V)',
      'ولتاژ خروجی': '۲۳۰ ولت متناوب ۵۰ هرتز THD < 2.5%',
      'نوع مدار': 'موج سینوسی خالص با مدولاسیون SPWM',
      'فایل شبیه‌سازی': 'Proteus 8.13 / 8.16 Tested',
      'فایل طراحی برد': 'Altium Designer 21+ Project'
    },
    isFeatured: true,
    isRecommended: true,
    isNew: false,
    isBestSeller: true,
    isPublished: true,
    salesCount: 209,
    rating: 5.0,
    createdAt: '2026-06-15T08:00:00Z',
    updatedAt: '2026-10-18T14:30:00Z'
  },
  {
    id: 'prod_handbook_kicad',
    sku: 'EM-BK-KICAD-ADV',
    title: 'Advanced Embedded Hardware Design and KiCad Mastery',
    titleFa: 'کتاب مرجع طراحی سخت‌افزار پیشرفته و تسلط بر KiCad و کنترل نویز',
    slug: 'advanced-hardware-kicad-mastery-book',
    shortDescription: 'کتاب جامع ۵۴۰ صفحه‌ای الکترونیکی تالیف الیاس بادیاب، همراه با ۲۵ پروژه عملی و راهنمای استانداردهای EMI/EMC.',
    description: `کتاب الکترونیکی "طراحی سخت‌افزار پیشرفته و تسلط بر KiCad" چکیده‌ای از سال‌ها تجربه عملی در طراحی بردهای الکترونیکی تجاری و صنعتی است.
    
فصل‌های اصلی کتاب:
فصل ۱: اصول جامع استک‌آپ (Stackup) و هدایت خطوط فرکانس بالا
فصل ۲: کنترل اثر متقابل سیگنال‌ها (Crosstalk) و زمین‌های آنالوگ/دیجیتال
فصل ۳: قوانین طلایی طراحی منبع تغذیه‌های سوییچینگ (Buck/Boost/Flyback)
فصل ۴: طراحی بردهای BGA ریز پایه با KiCad 8 و استراتژی‌های Fanout
فصل ۵: آزمون‌های EMC، ESD و آمادگی برای تاییدیه‌های استاندارد صنعتی CE و FCC`,
    price: 450000,
    previousPrice: 650000,
    discountPercent: 30,
    stock: 999,
    type: 'digital',
    categoryId: 'cat_engineering_books',
    sectionId: 'sec_engineering_library',
    tags: ['Book', 'KiCad', 'Hardware Design', 'EMC', 'Education', 'PDF'],
    mainImage: '/assets/electronics_digital_book_1792786861344.jpg',
    gallery: [
      '/assets/electronics_digital_book_1792786861344.jpg'
    ],
    digitalFile: {
      fileName: 'Advanced_Embedded_Hardware_KiCad_Mastery_EliasBadiyab.pdf',
      fileExtension: 'PDF',
      fileSize: '36.8 MB',
      downloadLimit: 10,
      expiryHours: 120
    },
    technicalSpecs: {
      'تعداد صفحات': '۵۴۰ صفحه تمام رنگی با کیفیت رتینا',
      'فرمت فایل': 'PDF اورجینال با بوکمارک و ایندکس هوشمند',
      'مولف': 'مهندس الیاس بادیاب',
      'پروژه‌های عملی همراه': '۲۵ سورس پروژه KiCad و Altium قابل دانلود',
      'سطح محتوا': 'متوسط تا فوق پیشرفته صنعتی'
    },
    isFeatured: true,
    isRecommended: true,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    salesCount: 88,
    rating: 4.8,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-22T08:00:00Z'
  },
  {
    id: 'prod_power_supply_lab',
    sku: 'EM-HW-PS3005D',
    title: 'Precision Digital DC Power Supply 0-30V 5A High Precision',
    titleFa: 'منبع تغذیه آزمایشگاهی دیجیتال ۰ الی ۳۰ ولت ۵ آمپر Electro Metal',
    slug: 'precision-digital-dc-power-supply-30v-5a',
    shortDescription: 'محصول فیزیکی مونتاژ شده با دقت میلی‌ولت و میلی‌آمپر، مجهز به پورت خروجی کالیبره و محافظ اورلود سریع.',
    description: `این دستگاه یک منبع تغذیه سوییچینگ آزمایشگاهی بسیار کم‌نویز با ریپل کمتر از ۲ میلی‌ولت است که در کارگاه‌های مهندسی الکترونیک برای تست مدارهای دقیق کاربرد دارد.
    
ویژگی‌ها:
- بدنه تمام آلومینیوم با رنگ الکترواستاتیک مات ضد خش
- کنترل دیجیتال با روتاری انکودرهای دقیق
- خروجی ایزوله با قابلیت تنظیم OVP (حفاظت اضافه ولتاژ) و OCP (حفاظت اضافه جریان)
- دارای پورت USB شارژ سریع جهت پروژه‌های توسعه
- گارانتی رسمی ۱۲ ماهه و خدمات پس از فروش اختصاصی Electro Metal`,
    price: 4950000,
    previousPrice: 5600000,
    discountPercent: 12,
    stock: 14,
    type: 'physical',
    categoryId: 'cat_physical_hardware',
    sectionId: 'sec_physical_store',
    tags: ['Hardware', 'Power Supply', 'Lab Equipment', 'Electronics'],
    mainImage: '/assets/altium_inverter_circuit_1792786860009.jpg',
    gallery: [
      '/assets/altium_inverter_circuit_1792786860009.jpg',
      '/assets/hero_electro_metal_1792786859342.jpg'
    ],
    physicalSpecs: {
      weightGrams: 2850,
      dimensionsCm: '24 x 16 x 11 cm',
      packageContents: 'دستگاه منبع تغذیه، کابل برق استاندارد با ارت، پروب آزمایشگاهی گیره‌ای مرغوب، کارت گارانتی الیاس بادیاب'
    },
    technicalSpecs: {
      'محدوده ولتاژ خروجی': '۰ تا ۳۰ ولت پیوسته با پله‌های ۱۰ میلی‌ولت',
      'محدوده جریان خروجی': '۰ تا ۵ آمپر با پله‌های ۱ میلی‌آمپر',
      'ریپل و نویز': '< 2mV RMS',
      'نمایشگر': 'LCD گرافیکی ۴ رقمی رنگی با نمایش توان لحظه‌ای',
      'حفاظت‌ها': 'اتصال کوتاه، اضافه دما (OTP)، ولتاژ معکوس',
      'وزن': '۲.۸ کیلوگرم'
    },
    isFeatured: true,
    isRecommended: true,
    isNew: false,
    isBestSeller: true,
    isPublished: true,
    salesCount: 45,
    rating: 4.9,
    createdAt: '2026-07-20T11:00:00Z',
    updatedAt: '2026-10-21T18:00:00Z'
  },
  {
    id: 'prod_industrial_iot_gateway',
    sku: 'EM-COD-IOT-GW',
    title: 'ESP32 Industrial IoT Gateway Firmware & Altium Schematic',
    titleFa: 'سورس کد و شماتیک گیت‌وی اینترنت اشیاء صنعتی (MQTT + Modbus RS485)',
    slug: 'industrial-iot-gateway-firmware-altium',
    shortDescription: 'پکیج کامل نرم‌افزار و سخت‌افزار گیت‌وی صنعتی با ارتباطات وای‌فای، اترنت و پروتکل‌های استاندارد PLC.',
    description: `پروژه آماده و تست شده برای مانیتورینگ کارخانجات و اتصال سنسورهای Modbus RTU به سرورهای ابری.
    
شامل:
- کدهای تمیز بر پایه ESP-IDF v5.x به زبان C
- پشتیبانی از ایمن‌سازی ارتباط با TLS 1.3 و رمزنگاری X.509
- وب‌سرور داخلی اختصاصی جهت کانفیگ پارامترها و کالیبراسیون
- مدار حفاظت ورودی‌ها در برابر شوک ولتاژ و اسپایک‌های برق شهری`,
    price: 680000,
    previousPrice: 950000,
    discountPercent: 28,
    stock: 999,
    type: 'digital',
    categoryId: 'cat_firmware_code',
    sectionId: 'sec_digital_files',
    tags: ['ESP32', 'IoT', 'Modbus', 'MQTT', 'Firmware', 'C++'],
    mainImage: '/assets/pcb_stm32_controller_1792786860807.jpg',
    gallery: [
      '/assets/pcb_stm32_controller_1792786860807.jpg'
    ],
    digitalFile: {
      fileName: 'ESP32_Industrial_Gateway_Complete_Source_v3.1.zip',
      fileExtension: 'ZIP',
      fileSize: '31.4 MB',
      downloadLimit: 5,
      expiryHours: 72
    },
    technicalSpecs: {
      'پردازنده': 'ESP32-S3 Dual-Core 240MHz 8MB PSRAM',
      'فریمورک': 'ESP-IDF & FreeRTOS',
      'پروتکل‌ها': 'Modbus RTU / ASCII, MQTT, HTTP REST, WebSocket',
      'مجوز سورس': 'حق استفاده تجاری و توسعه نامحدود',
      'فایل‌ها': 'کد کامل C/C++ + سورس آلتیوم دیزاینر'
    },
    isFeatured: false,
    isRecommended: true,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    salesCount: 64,
    rating: 4.7,
    createdAt: '2026-09-12T09:00:00Z',
    updatedAt: '2026-10-19T13:00:00Z'
  },
  {
    id: 'prod_cyber_metal_beats',
    sku: 'EM-MUS-VOL01',
    title: 'Cyber Metal & Industrial Synth Soundtrack Pack Vol. 1',
    titleFa: 'پکیج ۱۰ تراک بیت و موسیقی الکترو-متال با لایسنس آزاد تجاری',
    slug: 'cyber-metal-industrial-synth-soundtrack-pack',
    shortDescription: 'موسیقی‌های با انرژی بالا تلفیق گیتار الکتریک متال و سینت‌های آنالوگ با کیفیت استودیویی ۲۴ بیت ۴۸ کیلوهرتز.',
    description: `مجموعه‌ای بی‌نظیر برای تولیدکنندگان محتوای یوتیوب، پروژه‌های سخت‌افزاری، تیزرهای تبلیغاتی و بازی‌های ویدیویی.
    
مشخصات آهنگ‌ها:
- ۱۰ قطعه صوتی اختصاصی با لاین‌های گیتار ضبط شده در استودیو
- فرمت‌های Mastered WAV و بدون فشرده‌سازی
- لایسنس مادام‌العمر برای استفاده در تمامی شبکه‌های اجتماعی بدون استرایک یوتیوب`,
    price: 320000,
    previousPrice: 480000,
    discountPercent: 33,
    stock: 999,
    type: 'digital',
    categoryId: 'cat_music_beats',
    sectionId: 'sec_beats_audio',
    tags: ['Music', 'Metal', 'Synth', 'Soundtrack', 'YouTube', 'WAV'],
    mainImage: '/assets/hero_electro_metal_1792786859342.jpg',
    gallery: [
      '/assets/hero_electro_metal_1792786859342.jpg'
    ],
    digitalFile: {
      fileName: 'ElectroMetal_Soundtrack_Vol1_24bit_WAV.zip',
      fileExtension: 'ZIP',
      fileSize: '342 MB',
      downloadLimit: 5,
      expiryHours: 96
    },
    technicalSpecs: {
      'تعداد قطعات': '۱۰ آهنگ کامل به همراه نسخه‌های لوپ کوتاه (Loops)',
      'کیفیت صدا': '24-Bit / 48kHz Uncompressed WAV + MP3 320kbps',
      'سبک': 'Industrial Electro Metal & Dark Cyberpunk',
      'حق نشر': 'رویالتی‌فری کامل با گواهی رسمی لایسنس'
    },
    isFeatured: false,
    isRecommended: false,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    salesCount: 39,
    rating: 4.8,
    createdAt: '2026-10-01T15:00:00Z',
    updatedAt: '2026-10-22T17:00:00Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord_1042',
    orderNumber: 'EM-1042',
    userId: 'usr_customer_demo',
    userName: 'کیان مهرآذر',
    userEmail: 'kian.lab@gmail.com',
    userPhone: '۰۹۳۵۱۲۳۴۵۶۷',
    items: [
      {
        productId: 'prod_stm32_board',
        productTitle: 'برد کنترلر صنعتی ۴ لایه STM32H753XI',
        productPrice: 890000,
        quantity: 1,
        isDigital: true,
        digitalToken: 'tok_stm32_kian_9921',
        image: '/assets/pcb_stm32_controller_1792786860807.jpg'
      }
    ],
    totalAmount: 1250000,
    discountAmount: 360000,
    payableAmount: 890000,
    paymentStatus: 'successful',
    orderStatus: 'completed',
    paymentGateway: 'shaparak_zarinpal',
    transactionId: 'TXN-SHP-88492019',
    trackingCode: 'ZP-9821443',
    digitalDownloads: [
      {
        productId: 'prod_stm32_board',
        token: 'tok_stm32_kian_9921',
        expiresAt: '2026-10-26T20:00:00Z',
        downloadCount: 2,
        maxDownloads: 5
      }
    ],
    createdAt: '2026-10-23T14:10:00Z',
    updatedAt: '2026-10-23T14:12:00Z'
  },
  {
    id: 'ord_1041',
    orderNumber: 'EM-1041',
    userId: 'usr_customer_demo',
    userName: 'کیان مهرآذر',
    userEmail: 'kian.lab@gmail.com',
    userPhone: '۰۹۳۵۱۲۳۴۵۶۷',
    items: [
      {
        productId: 'prod_power_supply_lab',
        productTitle: 'منبع تغذیه آزمایشگاهی دیجیتال ۰ الی ۳۰ ولت ۵ آمپر',
        productPrice: 4950000,
        quantity: 1,
        isDigital: false,
        image: '/assets/altium_inverter_circuit_1792786860009.jpg'
      }
    ],
    totalAmount: 5600000,
    discountAmount: 650000,
    payableAmount: 4950000,
    paymentStatus: 'successful',
    orderStatus: 'shipped',
    paymentGateway: 'shaparak_zarinpal',
    transactionId: 'TXN-SHP-88301928',
    trackingCode: 'POST-IR-4491028491823',
    shippingAddress: {
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان کارگر شمالی، پردیس دانشکده‌های فنی، آزمایشگاه روباتیک و مدار',
      postalCode: '1439957131',
      recipientName: 'کیان مهرآذر',
      recipientPhone: '۰۹۳۵۱۲۳۴۵۶۷'
    },
    createdAt: '2026-10-22T09:30:00Z',
    updatedAt: '2026-10-23T08:15:00Z'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'ویدیوی جدید در کانال یوتیوب الیاس بادیاب منتشر شد',
    summary: 'تحلیل عمیق مدار منبع تغذیه سوئیچینگ Full-Bridge و نحوه انتخاب ماسفت‌های SiC برای راندمان بالای ۹۶٪.',
    content: 'در این آموزش یک‌ساعته، از طراحی شماتیک در آلتیوم تا تست عملی با اسیلوسکوپ در آزمایشگاه الکترومتال را قدم به قدم بررسی کرده‌ایم. برای مشاهده به کانال یوتیوب مراجعه کنید.',
    thumbnail: '/assets/hero_electro_metal_1792786859342.jpg',
    youtubeUrl: 'https://youtube.com/@eliasbadiyab',
    telegramUrl: 'https://t.me/electrometal_org',
    isPublished: true,
    publishedAt: '2026-10-22T18:00:00Z'
  },
  {
    id: 'ann_2',
    title: 'بروزرسانی لایبری قطعات صنعتی آلتیوم دیزاینر ۲۰۲۶',
    summary: 'افزوده شدن بیش از ۱۵۰۰ فوت‌پرینت سه‌بعدی استاندارد صنعتی IPC با مدل‌های دقیق STEP.',
    content: 'تمام خریداران پکیج STM32 می‌توانند نسخه بروز شده پکیج را از پنل کاربری خود در بخش دانلودهای فعال دریافت نمایند.',
    thumbnail: '/assets/pcb_stm32_controller_1792786860807.jpg',
    telegramUrl: 'https://t.me/electrometal_org',
    isPublished: true,
    publishedAt: '2026-10-18T10:30:00Z'
  }
];

export const initialAdvertisements: Advertisement[] = [
  {
    id: 'ad_1',
    title: 'جشنواره تخفیف پروژه‌های صنعتی آلتیوم دیزاینر',
    imageUrl: '/assets/pcb_stm32_controller_1792786860807.jpg',
    destinationUrl: '/#sec_electronics_featured',
    placement: 'homepage',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    isActive: true,
    impressions: 4890,
    clicks: 342
  },
  {
    id: 'ad_2',
    title: 'کانال رسمی یوتیوب الیاس بادیاب - آموزش‌های تخصصی سخت‌افزار',
    imageUrl: '/assets/hero_electro_metal_1792786859342.jpg',
    destinationUrl: 'https://youtube.com/@eliasbadiyab',
    placement: 'between_products',
    startDate: '2026-09-01',
    endDate: '2027-01-01',
    isActive: true,
    impressions: 9812,
    clicks: 1240
  }
];

export const initialTickets: SupportTicket[] = [
  {
    id: 'tkt_801',
    ticketNumber: 'TKT-801',
    userId: 'usr_customer_demo',
    userName: 'کیان مهرآذر',
    userEmail: 'kian.lab@gmail.com',
    subject: 'راهنمایی در مورد کامپایل پروژه STM32 در Keil uVision',
    department: 'technical',
    priority: 'high',
    status: 'answered',
    messages: [
      {
        id: 'msg_1',
        senderId: 'usr_customer_demo',
        senderName: 'کیان مهرآذر',
        isStaff: false,
        content: 'سلام و احترام، من فایل‌های برد STM32H753 رو خریدم و دانلود کردم. هنگام باز کردن سورس در Keil ارور پکیج DFP میده. لطفاً راهنمایی بفرمایید.',
        createdAt: '2026-10-23T15:00:00Z'
      },
      {
        id: 'msg_2',
        senderId: 'usr_owner_elias',
        senderName: 'الیاس بادیاب',
        isStaff: true,
        content: 'سلام دوست عزیز. برای STM32H7 باید بسته Keil::STM32H7xx_DFP نسخه 3.1.1 یا بالاتر را از Pack Installer نصب بفرمایید. ضمناً پیشنهاد ما استفاده از STM32CubeIDE می‌باشد که پیکربندی کلاک و کلود را مستقیم لود می‌کند. موفق باشید.',
        createdAt: '2026-10-23T15:35:00Z'
      }
    ],
    createdAt: '2026-10-23T15:00:00Z',
    updatedAt: '2026-10-23T15:35:00Z'
  }
];

export const initialDirectMessages: DirectMessage[] = [
  {
    id: 'dm_1',
    senderId: 'usr_admin_reza',
    senderName: 'مهندس رضایی',
    receiverId: 'usr_owner_elias',
    receiverName: 'الیاس بادیاب',
    content: 'سلام جناب مهندس بادیاب، تست حرارتی مدار اینورتر ۴ کیلووات در بار ۳۵۰۰ وات پاس شد. حداکثر دمای هیت‌سینک روی ۵۸ درجه سانتی‌گراد فیکس شد.',
    isRead: true,
    createdAt: '2026-10-23T12:00:00Z'
  },
  {
    id: 'dm_2',
    senderId: 'usr_owner_elias',
    senderName: 'الیاس بادیاب',
    receiverId: 'usr_admin_reza',
    receiverName: 'مهندس رضایی',
    content: 'بسیار عالی مهندس. مستندات تست و عکس‌های ترموویژن را در پنل فایل منیجر آپلود کنید تا ضمیمه پکیج فروش شود.',
    isRead: false,
    createdAt: '2026-10-23T12:20:00Z'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log_1',
    userId: 'usr_owner_elias',
    userName: 'الیاس بادیاب',
    action: 'تغییر تنظیمات سایت',
    details: 'بروزرسانی متادیتای سئو و فعال‌سازی درگاه زرین‌پال شاپرک',
    timestamp: '2026-10-23T20:15:00Z'
  },
  {
    id: 'log_2',
    userId: 'usr_owner_elias',
    userName: 'الیاس بادیاب',
    action: 'افزودن محصول جدید',
    details: 'محصول برد کنترلر صنعتی ۴ لایه STM32H753XI با فایل گربر آپلود گردید.',
    timestamp: '2026-10-23T19:30:00Z'
  },
  {
    id: 'log_3',
    userId: 'usr_admin_reza',
    userName: 'مهندس رضایی',
    action: 'ارسال پاسخ تیکت',
    details: 'پاسخ فنی به تیکت TKT-801 برای کیان مهرآذر ارسال شد.',
    timestamp: '2026-10-23T15:35:00Z'
  }
];

export const initialManagedFiles: ManagedFile[] = [
  {
    id: 'fl_1',
    name: 'STM32H753XI_Industrial_Full_Engineering_Pack_v2.4.zip',
    folder: 'firmware_and_pcb',
    sizeBytes: 50960793,
    type: 'application/zip',
    url: '/assets/pcb_stm32_controller_1792786860807.jpg',
    isDigitalProductFile: true,
    uploadedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'fl_2',
    name: 'ElectroMetal_Inverter_4000W_PureSine_Complete.zip',
    folder: 'power_electronics',
    sizeBytes: 88289894,
    type: 'application/zip',
    url: '/assets/altium_inverter_circuit_1792786860009.jpg',
    isDigitalProductFile: true,
    uploadedAt: '2026-10-18T14:30:00Z'
  },
  {
    id: 'fl_3',
    name: 'Advanced_Embedded_Hardware_KiCad_Mastery_EliasBadiyab.pdf',
    folder: 'handbooks',
    sizeBytes: 38587596,
    type: 'application/pdf',
    url: '/assets/electronics_digital_book_1792786861344.jpg',
    isDigitalProductFile: true,
    uploadedAt: '2026-09-01T10:00:00Z'
  }
];
