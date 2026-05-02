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
    styles?: {
      paddingTop?: string;
      paddingBottom?: string;
      marginTop?: string;
      marginBottom?: string;
      maxWidth?: string;
    }
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
    layoutScale: 'compact' | 'normal' | 'relaxed';
    fontSize: 'sm' | 'base' | 'lg';
  };
  // New features
  contactForm: { enabled: boolean; fields: string[]; submitText: string; email: string };
  partners: { name: string; logoUrl: string }[];
  stats: { label: string; value: string }[];
  videoUrl: string;
  countdownDate: string;
  customCss: string;
  announcement: { enabled: boolean; text: string; bgColor: string };
}

export type SectionType = 'hero' | 'gallery' | 'blog' | 'faq' | 'pricing' | 'testimonials' | 'newsletter' | 'contact' | 'partners' | 'stats' | 'video' | 'countdown';

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
  seoTitle: "Toko Saya - Solusi Terbaik",
  seoDescription: "Deskripsi SEO untuk toko saya yang luar biasa.",
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
    { id: "s3", type: "gallery", enabled: true, layout: 'grid' },
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
    layoutScale: 'normal',
    fontSize: 'base'
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
  announcement: { enabled: false, text: "🔥 Promo Spesial! Diskon 50% untuk 10 pelanggan pertama!", bgColor: "#ef4444" }
};
