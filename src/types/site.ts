export interface SiteData {
  siteName: string;
  logoUrl: string;
  headerTitle: string;
  headerSub: string;
  heroImageUrl: string;
  heroLayout: 'centered' | 'split' | 'fullbg';
  ctaText: string;
  ctaUrl: string;
  content: string;
  footerText: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Outfit' | 'Roboto' | 'Poppins' | 'DM Sans';
  templateId: 'modern' | 'minimal' | 'glass';
  whatsappNumber: string;
  showWhatsapp: boolean;
  seoTitle: string;
  seoDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  navLinks: { label: string; url: string }[];
  backgroundPattern: 'none' | 'dots' | 'grid' | 'mesh';
  cards: { id: string; title: string; description: string; category: string; icon: string }[];
  categories: string[];
  socialLinks: { platform: string; url: string }[];
  isDarkMode: boolean;
  itemsPerPage: number;
  blogPosts: { id: string; title: string; excerpt: string; date: string; image: string }[];
  sections: { 
    id: string; 
    type: SectionType; 
    enabled: boolean; 
    layout?: 'grid' | 'list' | 'carousel';
    columns?: 2 | 3 | 4;
  }[];
  faq: { question: string; answer: string }[];
  pricing: { plan: string; price: string; features: string[]; isPopular: boolean }[];
  testimonials: { name: string; role: string; content: string; rating: number; avatar: string }[];
  analytics: { googleId: string; pixelId: string; tiktokId: string };
  navbarConfig: { position: 'fixed' | 'sticky' | 'static'; style: 'transparent' | 'solid'; alignment: 'between' | 'center' };
  globalStyle: { 
    borderRadius: 'none' | 'md' | 'xl' | 'full'; 
    shadow: 'none' | 'sm' | 'xl' | '2xl'; 
    heroAlign: 'left' | 'center' | 'right'; 
    useAnimatedBg: boolean;
    buttonStyle: 'solid' | 'outline' | 'soft' | 'ghost';
    buttonSize: 'sm' | 'md' | 'lg' | 'xl';
    layoutScale: 'compact' | 'normal' | 'relaxed';
    fontSize: 'sm' | 'base' | 'lg';
    scrollAnimation: 'none' | 'fade-up' | 'slide-left' | 'zoom-in';
  };
  contactForm: { enabled: boolean; fields: string[]; submitText: string; email: string };
  partners: { name: string; logoUrl: string }[];
  stats: { label: string; value: string }[];
  videoUrl: string;
  countdownDate: string;
  customCss: string;
  announcement: { enabled: boolean; text: string; bgColor: string; link: string };
  breadcrumb: { enabled: boolean; items: { label: string; url: string }[] };
}

export type SectionType = 'hero' | 'gallery' | 'blog' | 'faq' | 'pricing' | 'testimonials' | 'newsletter' | 'contact' | 'partners' | 'stats' | 'video' | 'countdown';

// ===== TEMPLATE PRESETS =====
export const TEMPLATE_PRESETS: Record<string, { name: string; desc: string; emoji: string; data: Partial<SiteData> }> = {
  agency: {
    name: "Digital Agency", desc: "Agensi kreatif & digital", emoji: "🏢",
    data: {
      siteName: "Kreativa Studio", headerTitle: "Kami Wujudkan Ide Digital Anda", headerSub: "Agensi kreatif full-service yang mengubah visi menjadi solusi digital berkelas.", ctaText: "Konsultasi Gratis", primaryColor: "#7c3aed", accentColor: "#8b5cf6", isDarkMode: true, templateId: "glass", fontFamily: "Outfit",
      cards: [
        { id: "1", title: "Web Design", description: "Desain website modern & responsif yang memikat.", category: "Utama", icon: "Zap" },
        { id: "2", title: "Branding", description: "Identitas visual yang kuat untuk bisnis Anda.", category: "Utama", icon: "Star" },
        { id: "3", title: "Digital Marketing", description: "Strategi pemasaran digital yang terukur.", category: "Utama", icon: "DollarSign" }
      ],
      stats: [{ label: "Klien", value: "200+" }, { label: "Proyek", value: "800+" }, { label: "Tahun", value: "10+" }, { label: "Award", value: "25+" }],
      navLinks: [{ label: "Home", url: "#" }, { label: "Services", url: "#" }, { label: "Portfolio", url: "#" }, { label: "Contact", url: "#" }],
    }
  },
  saas: {
    name: "SaaS Product", desc: "Produk software & startup", emoji: "💻",
    data: {
      siteName: "FlowApp", headerTitle: "Kelola Tim Anda 10x Lebih Efisien", headerSub: "Platform kolaborasi all-in-one untuk tim modern. Gratis selamanya untuk tim kecil.", ctaText: "Coba Gratis", primaryColor: "#2563eb", accentColor: "#3b82f6", isDarkMode: false, templateId: "modern", fontFamily: "Inter",
      cards: [
        { id: "1", title: "Task Management", description: "Atur tugas tim dengan drag & drop kanban board.", category: "Utama", icon: "Zap" },
        { id: "2", title: "Time Tracking", description: "Pantau produktivitas real-time.", category: "Utama", icon: "Clock" },
        { id: "3", title: "Analytics", description: "Dashboard insight performa tim.", category: "Utama", icon: "Star" }
      ],
      pricing: [
        { plan: "Free", price: "Rp 0", features: ["5 User", "10 Project", "1GB Storage"], isPopular: false },
        { plan: "Pro", price: "Rp 299rb/bln", features: ["Unlimited User", "Unlimited Project", "100GB Storage", "Priority Support", "API Access"], isPopular: true },
        { plan: "Enterprise", price: "Custom", features: ["Semua Fitur Pro", "Dedicated Server", "SLA 99.9%", "Custom Integration"], isPopular: false }
      ],
      stats: [{ label: "Active Users", value: "50K+" }, { label: "Uptime", value: "99.9%" }, { label: "Countries", value: "30+" }, { label: "Rating", value: "4.9★" }],
    }
  },
  restaurant: {
    name: "Restoran & Kafe", desc: "Bisnis kuliner & F&B", emoji: "🍽️",
    data: {
      siteName: "Dapur Nusantara", headerTitle: "Cita Rasa Autentik Indonesia", headerSub: "Nikmati masakan tradisional dengan sentuhan modern di setiap hidangan.", ctaText: "Lihat Menu", primaryColor: "#ea580c", accentColor: "#f97316", isDarkMode: false, templateId: "minimal", fontFamily: "DM Sans",
      cards: [
        { id: "1", title: "Nasi Goreng Special", description: "Nasi goreng legendaris dengan bumbu rahasia.", category: "Menu", icon: "Star" },
        { id: "2", title: "Sate Lilit Bali", description: "Sate ikan khas Bali yang gurih.", category: "Menu", icon: "Star" },
        { id: "3", title: "Es Cendol Durian", description: "Minuman segar perpaduan cendol & durian.", category: "Menu", icon: "Star" }
      ],
      navLinks: [{ label: "Home", url: "#" }, { label: "Menu", url: "#" }, { label: "Reservasi", url: "#" }, { label: "Kontak", url: "#" }],
      stats: [{ label: "Menu", value: "80+" }, { label: "Cabang", value: "12" }, { label: "Review", value: "4.8★" }, { label: "Tahun", value: "15+" }],
    }
  },
  portfolio: {
    name: "Portfolio", desc: "Personal & freelancer", emoji: "🎨",
    data: {
      siteName: "Andi Creative", headerTitle: "UI/UX Designer & Developer", headerSub: "Saya membantu startup & brand membangun produk digital yang beautiful & functional.", ctaText: "Lihat Karya", primaryColor: "#0f172a", accentColor: "#334155", isDarkMode: true, templateId: "modern", fontFamily: "Poppins",
      cards: [
        { id: "1", title: "Web App Design", description: "Dashboard & SaaS interface design.", category: "Utama", icon: "Zap" },
        { id: "2", title: "Mobile App", description: "iOS & Android native app design.", category: "Utama", icon: "Star" },
        { id: "3", title: "Brand Identity", description: "Logo, typography & visual system.", category: "Utama", icon: "DollarSign" }
      ],
      stats: [{ label: "Projects", value: "120+" }, { label: "Clients", value: "45+" }, { label: "Years", value: "7+" }, { label: "Awards", value: "8" }],
    }
  },
  shop: {
    name: "Toko Online", desc: "E-commerce & retail", emoji: "🛒",
    data: {
      siteName: "ShopKita", headerTitle: "Belanja Mudah, Harga Terbaik", headerSub: "Temukan produk berkualitas dengan harga terjangkau dan gratis ongkir.", ctaText: "Belanja Sekarang", primaryColor: "#059669", accentColor: "#10b981", isDarkMode: false, templateId: "modern", fontFamily: "Roboto",
      cards: [
        { id: "1", title: "Fashion Terbaru", description: "Koleksi fashion trending 2026.", category: "Kategori", icon: "Star" },
        { id: "2", title: "Gadget & Tech", description: "Elektronik terkini harga bersaing.", category: "Kategori", icon: "Zap" },
        { id: "3", title: "Home & Living", description: "Dekorasi rumah estetik.", category: "Kategori", icon: "DollarSign" }
      ],
      stats: [{ label: "Produk", value: "5000+" }, { label: "Pembeli", value: "100K+" }, { label: "Rating", value: "4.9★" }, { label: "Pengiriman", value: "Gratis" }],
      announcement: { enabled: true, text: "🔥 FLASH SALE! Diskon 70% untuk 100 pembeli pertama!", bgColor: "#059669", link: "#" },
    }
  },
  blog: {
    name: "Personal Blog", desc: "Blog & content creator", emoji: "✍️",
    data: {
      siteName: "Catatan Digital", headerTitle: "Menulis, Berbagi, Menginspirasi", headerSub: "Blog tentang teknologi, produktivitas, dan kehidupan digital.", ctaText: "Baca Artikel", primaryColor: "#db2777", accentColor: "#ec4899", isDarkMode: false, templateId: "minimal", fontFamily: "DM Sans",
      cards: [
        { id: "1", title: "Teknologi", description: "Review gadget & tren tech terbaru.", category: "Topik", icon: "Zap" },
        { id: "2", title: "Produktivitas", description: "Tips & tools untuk kerja efisien.", category: "Topik", icon: "Clock" },
        { id: "3", title: "Lifestyle", description: "Gaya hidup digital yang seimbang.", category: "Topik", icon: "Star" }
      ],
      stats: [{ label: "Artikel", value: "200+" }, { label: "Pembaca", value: "50K+" }, { label: "Subscriber", value: "5K+" }, { label: "Topik", value: "15+" }],
    }
  }
};

export const defaultSiteData: SiteData = {
  siteName: "Toko Saya",
  logoUrl: "",
  headerTitle: "Solusi Terbaik untuk Anda",
  headerSub: "Mulai perjalanan sukses Anda bersama kami hari ini.",
  heroImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  heroLayout: "centered",
  ctaText: "Mulai Sekarang",
  ctaUrl: "#",
  content: "",
  footerText: "© 2026 Toko Saya. Hak Cipta Dilindungi.",
  primaryColor: "#3b82f6",
  accentColor: "#1d4ed8",
  fontFamily: "Outfit",
  templateId: "modern",
  whatsappNumber: "628123456789",
  showWhatsapp: true,
  seoTitle: 'Bikin Sendiri - No Code Web Builder',
  seoDescription: 'Buat landing page premium dalam hitungan menit tanpa koding.',
  faviconUrl: '',
  navLinks: [
    { label: "Beranda", url: "#" },
    { label: "Layanan", url: "#layanan" },
    { label: "Harga", url: "#harga" },
    { label: "Kontak", url: "#kontak" }
  ],
  backgroundPattern: "none",
  cards: [
    { id: "1", title: "Layanan Cepat", description: "Kami memberikan hasil terbaik dalam waktu singkat.", category: "Utama", icon: "Zap" },
    { id: "2", title: "Harga Terjangkau", description: "Solusi premium dengan budget yang bersahabat.", category: "Biaya", icon: "DollarSign" },
    { id: "3", title: "Dukungan 24/7", description: "Tim kami siap membantu Anda kapan saja.", category: "Utama", icon: "Clock" }
  ],
  categories: ["Semua", "Utama", "Biaya"],
  socialLinks: [
    { platform: "instagram", url: "#" },
    { platform: "facebook", url: "#" },
    { platform: "youtube", url: "#" }
  ],
  isDarkMode: false,
  itemsPerPage: 6,
  blogPosts: [
    { id: "1", title: "Tren No-Code 2026", excerpt: "Mengapa semua orang beralih ke solusi tanpa kode?", date: "1 Mei 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { id: "2", title: "Optimasi Landing Page", excerpt: "Tips jitu meningkatkan konversi penjualan Anda.", date: "28 April 2026", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" }
  ],
  sections: [
    { id: "s1", type: "hero", enabled: true },
    { id: "s2", type: "stats", enabled: true },
    { id: "s3", type: "gallery", enabled: true, layout: 'grid', columns: 3 },
    { id: "s4", type: "pricing", enabled: true },
    { id: "s5", type: "testimonials", enabled: true },
    { id: "s6", type: "faq", enabled: true },
    { id: "s7", type: "partners", enabled: true },
    { id: "s8", type: "contact", enabled: true },
    { id: "s9", type: "newsletter", enabled: true },
    { id: "s10", type: "blog", enabled: false },
    { id: "s11", type: "video", enabled: false },
    { id: "s12", type: "countdown", enabled: false }
  ],
  faq: [
    { question: "Apakah layanan ini bergaransi?", answer: "Ya, kami memberikan garansi kepuasan 100% untuk semua layanan kami." },
    { question: "Berapa lama proses pengerjaannya?", answer: "Tergantung paket yang dipilih, rata-rata antara 3-7 hari kerja." },
    { question: "Apakah bisa konsultasi gratis?", answer: "Tentu! Anda bisa menghubungi kami via WhatsApp untuk konsultasi awal tanpa biaya." }
  ],
  pricing: [
    { plan: "Starter", price: "Rp 500rb", features: ["1 Halaman", "Domain Gratis", "Support WA", "SSL Gratis"], isPopular: false },
    { plan: "Professional", price: "Rp 1.5jt", features: ["5 Halaman", "Email Bisnis", "SEO Optimization", "Analytics Dashboard", "Live Chat"], isPopular: true },
    { plan: "Enterprise", price: "Custom", features: ["Unlimited Halaman", "Custom Development", "VIP Support 24/7", "API Integration", "White Label"], isPopular: false }
  ],
  testimonials: [
    { name: "Budi Santoso", role: "CEO Startup", content: "Sangat membantu bisnis saya tumbuh pesat! Hasilnya luar biasa.", rating: 5, avatar: "https://i.pravatar.cc/150?u=budi" },
    { name: "Siti Aminah", role: "Owner Olshop", content: "Desainnya sangat modern dan mudah digunakan. Recommended!", rating: 5, avatar: "https://i.pravatar.cc/150?u=siti" },
    { name: "Ahmad Rizki", role: "Marketing Manager", content: "Tim support sangat responsif. Website jadi dalam 3 hari!", rating: 4, avatar: "https://i.pravatar.cc/150?u=ahmad" }
  ],
  analytics: { googleId: "", pixelId: "", tiktokId: "" },
  navbarConfig: { position: 'sticky', style: 'solid', alignment: 'between' },
  globalStyle: {
    borderRadius: 'xl',
    shadow: 'xl',
    heroAlign: 'center',
    useAnimatedBg: false,
    buttonStyle: 'solid',
    buttonSize: 'md',
    layoutScale: 'normal',
    fontSize: 'base',
    scrollAnimation: 'none'
  },
  contactForm: { enabled: true, fields: ["Nama", "Email", "Telepon", "Pesan"], submitText: "Kirim Pesan", email: "" },
  partners: [
    { name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Cloudflare", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png" }
  ],
  stats: [
    { label: "Klien Puas", value: "500+" },
    { label: "Proyek Selesai", value: "1,200+" },
    { label: "Tahun Pengalaman", value: "8+" },
    { label: "Rating Kepuasan", value: "4.9/5" }
  ],
  videoUrl: "",
  countdownDate: "",
  customCss: "",
  announcement: { enabled: false, text: "🔥 Promo Spesial! Diskon 50% untuk 10 pelanggan pertama!", bgColor: "#ef4444", link: "#" },
  breadcrumb: { enabled: false, items: [{ label: "Home", url: "#" }, { label: "Layanan", url: "#" }] }
};
