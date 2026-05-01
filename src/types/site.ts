export interface SiteData {
  siteName: string;
  headerTitle: string;
  headerSub: string;
  heroImageUrl: string;
  ctaText: string;
  content: string;
  footerText: string;
  primaryColor: string; // Hex code
  accentColor: string;  // Hex code
  fontFamily: 'Inter' | 'Outfit' | 'Roboto';
  templateId: 'modern' | 'minimal' | 'glass';
  whatsappNumber: string;
  showWhatsapp: boolean;
  seoTitle: string;
  seoDescription: string;
  navLinks: { label: string; url: string; subLinks?: { label: string; url: string }[] }[];
  backgroundPattern: 'none' | 'dots' | 'grid' | 'mesh';
  cards: { id: string; title: string; description: string; category: string; icon: string }[];
  categories: string[];
  socialLinks: { platform: 'instagram' | 'tiktok' | 'facebook' | 'youtube'; url: string }[];
  isDarkMode: boolean;
  itemsPerPage: number;
  blogPosts: { id: string; title: string; excerpt: string; date: string; image: string }[];
  sections: { 
    id: string; 
    type: 'hero' | 'gallery' | 'blog' | 'faq' | 'pricing' | 'testimonials' | 'newsletter'; 
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
}








export const defaultSiteData: SiteData = {
  siteName: "Toko Saya",
  headerTitle: "Solusi Terbaik untuk Anda",
  headerSub: "Mulai perjalanan sukses Anda bersama kami hari ini.",
  heroImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  ctaText: "Mulai Sekarang",
  content: "Kami menyediakan layanan yang membantu Anda tumbuh lebih cepat. Dengan teknologi modern dan tim profesional, kami siap membantu.",
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
    { 
      label: "Layanan", 
      url: "#", 
      subLinks: [
        { label: "Konsultasi", url: "#" },
        { label: "Pengembangan", url: "#" }
      ] 
    },
    { label: "Kontak", url: "#" }
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
    { platform: "tiktok", url: "#" }
  ],
  isDarkMode: false,
  itemsPerPage: 3,
  blogPosts: [
    { id: "1", title: "Tren No-Code 2026", excerpt: "Mengapa semua orang beralih ke solusi tanpa kode?", date: "1 Mei 2026", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
    { id: "2", title: "Optimasi Landing Page", excerpt: "Tips jitu meningkatkan konversi penjualan Anda.", date: "28 April 2026", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" }
  ],
  sections: [
    { id: "s1", type: "hero", enabled: true },
    { id: "s2", type: "gallery", enabled: true, layout: 'grid' },
    { id: "s3", type: "pricing", enabled: true },
    { id: "s4", type: "faq", enabled: true },
    { id: "s5", type: "testimonials", enabled: true },
    { id: "s6", type: "blog", enabled: true },
    { id: "s7", type: "newsletter", enabled: true }
  ],
  faq: [
    { question: "Apakah layanan ini bergaransi?", answer: "Ya, kami memberikan garansi kepuasan 100% untuk semua layanan kami." },
    { question: "Berapa lama proses pengerjaannya?", answer: "Tergantung paket yang dipilih, rata-rata antara 3-7 hari kerja." }
  ],
  pricing: [
    { plan: "Basic", price: "Rp 500rb", features: ["1 Halaman", "Domain Gratis", "Support WA"], isPopular: false },
    { plan: "Pro", price: "Rp 1.5jt", features: ["5 Halaman", "Email Bisnis", "SEO Optimization"], isPopular: true },
    { plan: "Enterprise", price: "Custom", features: ["Unlimited", "Custom Dev", "VIP Support"], isPopular: false }
  ],
  testimonials: [
    { name: "Budi Santoso", role: "CEO Startup", content: "Sangat membantu bisnis saya tumbuh pesat!", rating: 5, avatar: "https://i.pravatar.cc/150?u=budi" },
    { name: "Siti Aminah", role: "Owner Olshop", content: "Desainnya sangat modern dan mudah digunakan.", rating: 4, avatar: "https://i.pravatar.cc/150?u=siti" }
  ],
  analytics: {
    googleId: "",
    pixelId: "",
    tiktokId: ""
  },
  navbarConfig: {
    position: 'sticky',
    style: 'transparent',
    alignment: 'between'
  },
  globalStyle: {
    borderRadius: 'xl',
    shadow: 'xl',
    heroAlign: 'center',
    useAnimatedBg: true,
    buttonStyle: 'solid',
    layoutScale: 'normal',
    fontSize: 'base'
  }
};







