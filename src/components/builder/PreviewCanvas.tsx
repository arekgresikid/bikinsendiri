"use client";
import { useState, useEffect } from "react";
import { SiteData } from "@/types/site";
import { 
  MessageSquare, Zap, DollarSign, Clock, Instagram, Facebook, Youtube, 
  ChevronDown, ArrowRight, Calendar, Check, Quote, Star as StarIcon,
  Twitter, Linkedin, Send, Mail, Sparkles
} from "lucide-react";

interface PreviewCanvasProps {
  data: SiteData;
  device: 'desktop' | 'mobile';
}

const IconMap: Record<string, any> = {
  Zap,
  DollarSign,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  Telegram: Send,
  Star: StarIcon
};

export default function PreviewCanvas({ data, device }: PreviewCanvasProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const isMinimal = data.templateId === 'minimal';
  const isGlass = data.templateId === 'glass';
  const isMobile = device === 'mobile';
  const isDark = data.isDarkMode;

  useEffect(() => {
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 400);
    return () => clearTimeout(timer);
  }, [data]);

  // Elite Scaling Logic
  const radiusMap = { none: '0px', md: '16px', xl: '40px', full: '9999px' };
  const shadowMap = { none: 'none', sm: '0 4px 6px -1px rgba(0,0,0,0.1)', xl: '0 25px 50px -12px rgba(0,0,0,0.15)', '2xl': '0 40px 80px -20px rgba(0,0,0,0.35)' };
  const paddingMap = { compact: '64px', normal: '128px', relaxed: '208px' };
  const fontScaleMap = { sm: 'text-[0.9rem]', base: 'text-[1rem]', lg: 'text-[1.15rem]' };

  const currentRadius = radiusMap[data.globalStyle.borderRadius];
  const currentShadow = shadowMap[data.globalStyle.shadow];
  const globalPaddingVal = paddingMap[data.globalStyle.layoutScale];
  const currentFontScale = fontScaleMap[data.globalStyle.fontSize];

  const getButtonStyle = () => {
    const style = data.globalStyle.buttonStyle;
    switch (style) {
      case 'outline':
        return { border: `2px solid ${data.primaryColor}`, color: isDark || isGlass ? 'white' : data.primaryColor, backgroundColor: 'transparent' };
      case 'soft':
        return { backgroundColor: `${data.primaryColor}20`, color: data.primaryColor, border: 'none' };
      case 'ghost':
        return { backgroundColor: 'transparent', color: isDark || isGlass ? 'white' : data.primaryColor, border: 'none' };
      default: // solid
        return { backgroundColor: data.primaryColor, color: 'white', border: 'none' };
    }
  };

  const filteredCards = data.cards.filter(card => {
    const matchesCategory = activeCategory === "Semua" || card.category === activeCategory;
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedCards = filteredCards.slice((currentPage - 1) * data.itemsPerPage, currentPage * data.itemsPerPage);

  const renderSection = (section: any) => {
    const { type, layout, styles } = section;
    
    // Resolve Granular Styles vs Global Presets
    const sectionStyle: React.CSSProperties = {
      paddingTop: styles?.paddingTop || globalPaddingVal,
      paddingBottom: styles?.paddingBottom || globalPaddingVal,
      marginTop: styles?.marginTop || '0px',
      marginBottom: styles?.marginBottom || '0px'
    };

    const containerStyle: React.CSSProperties = {
      maxWidth: styles?.maxWidth || '1280px',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    const commonClass = `reveal px-8 transition-all duration-1000 ${currentFontScale}`;

    switch (type) {
      case 'hero':
        return (
          <section key="hero" className={`${commonClass} text-center relative overflow-hidden ${
            isMinimal ? (isDark ? 'bg-slate-900' : 'bg-white') : 
            isGlass ? 'bg-white/5 backdrop-blur-3xl' : 
            isDark ? 'bg-slate-800/10' : 'bg-slate-50'
          }`} style={sectionStyle}>
            <div className={`relative z-10 ${data.globalStyle.heroAlign === 'left' ? 'text-left' : data.globalStyle.heroAlign === 'right' ? 'text-right' : 'text-center'}`} style={containerStyle}>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-600/10 text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-blue-600/20 shadow-xl shadow-blue-500/5">
                <Sparkles className="w-4 h-4 fill-current" /> High-Performance Builder
              </div>
              <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-black mb-6 leading-[1.1] tracking-tight ${isGlass || isDark ? 'text-white' : 'text-slate-950'}`}>
                {data.headerTitle}
              </h1>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} mb-8 opacity-60 font-medium leading-relaxed max-w-2xl ${data.globalStyle.heroAlign === 'center' ? 'mx-auto' : ''} ${isGlass || isDark ? 'text-white' : 'text-slate-700'}`}>
                {data.headerSub}
              </p>
              <div className={`flex flex-wrap gap-6 ${data.globalStyle.heroAlign === 'center' ? 'justify-center' : ''}`}>
                <button 
                  className={`px-8 py-4 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg inline-flex items-center gap-3 uppercase tracking-wider text-xs group`}
                  style={{ ...getButtonStyle(), borderRadius: currentRadius }}
                >
                  {data.ctaText} <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </button>
              </div>
              {data.heroImageUrl && (
                <div className={`mt-12 overflow-hidden border-4 group relative ${isGlass ? 'border-white/5' : 'border-white'}`} style={{ borderRadius: currentRadius, boxShadow: currentShadow }}>
                  <img src={data.heroImageUrl} alt="Hero" className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-[2s]" />
                </div>
              )}
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section key="gallery" className={`${commonClass} ${isGlass ? 'bg-white/5' : isDark ? 'bg-slate-900/80' : 'bg-white'}`} style={sectionStyle}>
            <div style={containerStyle} className="space-y-28">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-6 text-center md:text-left w-full">
                  <h2 className={`text-4xl font-black tracking-tight ${isGlass || isDark ? 'text-white' : 'text-slate-950'}`}>Solusi <span style={{ color: data.primaryColor }}>Terbaik</span></h2>
                  <div className={`w-40 h-4 rounded-full ${data.globalStyle.heroAlign === 'center' ? 'mx-auto' : ''}`} style={{ backgroundColor: isGlass || isDark ? 'white' : data.accentColor }} />
                </div>
              </div>

              <div className={`grid gap-12 ${layout === 'list' ? 'grid-cols-1' : isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                {paginatedCards.map((card) => {
                  const IconComponent = IconMap[card.icon] || Zap;
                  return (
                    <div 
                      key={card.id} 
                      className={`p-8 border transition-all hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden flex ${layout === 'list' ? 'flex-row items-center gap-6' : 'flex-col items-start'}`}
                      style={{ borderRadius: currentRadius, boxShadow: currentShadow, backgroundColor: isDark ? '#1e293b' : 'white', borderColor: isDark ? '#334155' : '#f1f5f9' }}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-all group-hover:scale-110 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <IconComponent className="w-7 h-7" style={{ color: data.primaryColor }} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-3 leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>{card.title}</h3>
                        <p className={`text-sm leading-relaxed opacity-60 ${isDark ? 'text-white' : 'text-slate-500'}`}>{card.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'blog':
        return (
          <section key="blog" className={`${commonClass} ${isDark ? 'bg-slate-950' : 'bg-slate-50/50'}`} style={sectionStyle}>
            <div style={containerStyle} className="space-y-20">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-black tracking-tightest">Artikel <span style={{ color: data.primaryColor }}>Terbaru</span></h2>
                <p className="text-slate-500 font-medium">Update harian dari studio kami</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.blogPosts.map(post => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="aspect-video overflow-hidden mb-6" style={{ borderRadius: currentRadius }}>
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </div>
                      <h3 className="text-2xl font-black leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section key="pricing" className={`${commonClass}`} style={sectionStyle}>
            <div style={containerStyle} className="space-y-20">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-black tracking-tight">Harga <span style={{ color: data.primaryColor }}>Transparan</span></h2>
                <p className="text-slate-500 max-w-xl mx-auto">Pilih paket yang sesuai dengan kebutuhan bisnis Anda.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.pricing.map((plan, i) => (
                  <div key={i} className={`p-12 border transition-all flex flex-col ${plan.isPopular ? 'ring-4 ring-blue-600/20 scale-105 z-10 bg-slate-900 text-white' : 'bg-white'}`} style={{ borderRadius: currentRadius, boxShadow: currentShadow, borderColor: plan.isPopular ? data.primaryColor : '#f1f5f9' }}>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-widest">{plan.plan}</h3>
                    <div className="text-5xl font-black mb-8">{plan.price}<span className="text-sm opacity-40 font-bold">/bln</span></div>
                    <div className="space-y-4 mb-12 flex-1">
                      {plan.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-3 text-sm font-medium opacity-80">
                          <Check className="w-4 h-4 text-blue-500" /> {f}
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105" style={{ backgroundColor: plan.isPopular ? 'white' : data.primaryColor, color: plan.isPopular ? 'black' : 'white' }}>
                      Pilih Paket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section key="faq" className={`${commonClass} ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`} style={sectionStyle}>
            <div style={containerStyle} className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-black tracking-tightest">Pertanyaan <span style={{ color: data.primaryColor }}>Umum</span></h2>
              </div>
              <div className="space-y-4">
                {data.faq.map((item, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                      <span className="font-black text-lg">{item.question}</span>
                      <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-blue-600' : 'text-slate-300'}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section key="testimonials" className={`${commonClass}`} style={sectionStyle}>
            <div style={containerStyle} className="space-y-20">
               <div className="text-center">
                  <h2 className="text-5xl font-black tracking-tightest">Apa Kata <span style={{ color: data.primaryColor }}>Mereka</span>?</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.testimonials.map((t, i) => (
                    <div key={i} className="p-12 bg-white border border-slate-100 relative group overflow-hidden" style={{ borderRadius: currentRadius, boxShadow: currentShadow }}>
                       <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-600/5 group-hover:scale-150 transition-transform" />
                       <div className="flex gap-1 mb-8">
                          {[...Array(t.rating)].map((_, si) => <StarIcon key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                       </div>
                       <p className="text-xl font-medium text-slate-700 italic leading-relaxed mb-10">&quot;{t.content}&quot;</p>
                       <div className="flex items-center gap-5">
                          <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          <div>
                             <h4 className="font-black text-slate-950">{t.name}</h4>
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.role}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        );

      case 'newsletter':
        return (
          <section key="newsletter" className={`${commonClass} ${isDark ? 'bg-blue-600' : 'bg-slate-950'} text-white`} style={sectionStyle}>
            <div style={containerStyle} className="text-center space-y-12">
               <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Mail className="w-10 h-10" />
               </div>
               <h2 className="text-5xl font-black tracking-tightest leading-tight">Berlangganan <span className="opacity-40 italic">Studio</span> News</h2>
               <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto p-3 bg-white/10 rounded-[32px] border border-white/10 backdrop-blur-xl">
                  <input type="email" placeholder="Alamat email Anda..." className="flex-1 bg-transparent px-8 py-5 outline-none font-bold text-sm placeholder:text-white/40" />
                  <button className="px-10 py-5 bg-white text-slate-950 rounded-[24px] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Join Now</button>
               </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const navPositionClass = data.navbarConfig.position === 'fixed' ? 'fixed' : data.navbarConfig.position === 'sticky' ? 'sticky' : 'relative';
  const navStyleClass = data.navbarConfig.style === 'transparent' ? 'bg-transparent' : isDark ? 'bg-slate-950/90' : 'bg-white/90';

  return (
    <div className={`h-full rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-200/50 transition-all duration-500 relative group/canvas ${
        isGlass ? 'bg-gradient-to-br from-indigo-800 via-blue-900 to-black' : 
        data.globalStyle.useAnimatedBg ? 'mesh-gradient' :
        isDark ? 'bg-slate-950' : 'bg-white'
      } ${isMobile ? 'w-[375px] border-[8px] border-slate-900 rounded-[40px] h-[812px] my-auto' : 'w-full'}`}
    >
      {/* Sync Indicator */}
      {isSyncing && (
        <div className="absolute top-24 right-12 z-[110] animate-in fade-in zoom-in duration-300">
           <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Applying Styles...</span>
           </div>
        </div>
      )}

      {/* Content */}
      <div 
        className={`flex-1 overflow-y-auto custom-scrollbar relative transition-all duration-1000 ${
          isGlass ? 'bg-transparent text-white' : 
          isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
        } ${data.backgroundPattern !== 'none' ? `pattern-${data.backgroundPattern}` : ''}`} 
        style={{ fontFamily: `var(--font-${data.fontFamily.toLowerCase()})` }}
      >
        {/* Navigation */}
        <nav className={`px-6 py-4 flex items-center top-0 z-50 backdrop-blur-xl transition-all border-b ${navPositionClass} ${navStyleClass} ${
          isDark ? 'border-white/5' : 'border-slate-100'
        } ${data.navbarConfig.alignment === 'center' ? 'flex-col gap-4' : 'justify-between'}`}>
          <div className="font-bold text-xl tracking-tight cursor-pointer" style={{ color: isGlass || isDark ? 'white' : data.primaryColor }}>
            {data.siteName}
          </div>
          
          <div className={`flex gap-6 text-[11px] font-semibold ${isGlass || isDark ? 'text-white/50' : 'text-slate-500'}`}>
            {data.navLinks.map((link, idx) => (
              <div key={idx} className="relative group/nav cursor-pointer hover:text-slate-900 transition-colors">
                {link.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover/nav:w-full rounded-full" />
              </div>
            ))}
          </div>
          
          {!isMobile && (
             <div className="flex gap-6 items-center">
                <button 
                  className="px-6 py-2.5 rounded-full text-[11px] font-bold transition-all"
                  style={getButtonStyle()}
                >
                  Contact
                </button>
             </div>
          )}
        </nav>

        {/* Dynamic Sections */}
        {data.sections
          .filter(s => s.enabled)
          .sort((a, b) => {
            const indexA = data.sections.indexOf(a);
            const indexB = data.sections.indexOf(b);
            return indexA - indexB;
          })
          .map(s => renderSection(s))}

        {/* Studio Footer */}
        <footer className={`p-12 text-center space-y-10 transition-all ${isDark ? 'bg-black' : 'bg-slate-950 text-slate-500'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-5xl mx-auto border-b border-white/5 pb-10">
             <div className="space-y-4">
                <h4 className="text-white font-black text-lg">Product</h4>
                <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
                   <span>Features</span><span>Pricing</span><span>API</span><span>Beta</span>
                </div>
             </div>
             <div className="space-y-8">
                <h4 className="text-white font-black text-lg">Company</h4>
                <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
                   <span>About</span><span>Careers</span><span>Press</span><span>Legal</span>
                </div>
             </div>
             <div className="space-y-8">
                <h4 className="text-white font-black text-lg">Support</h4>
                <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
                   <span>Documentation</span><span>Help Center</span><span>Status</span>
                </div>
             </div>
             <div className="space-y-8">
                <div className="flex flex-col gap-6">
                   <h4 className="text-white font-black text-lg">Social</h4>
                   <div className="flex gap-4">
                      {data.socialLinks.map((s, i) => {
                        const Icon = IconMap[s.platform.charAt(0).toUpperCase() + s.platform.slice(1)] || Instagram;
                        return <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Icon className="w-5 h-5" /></div>
                      })}
                   </div>
                </div>
             </div>
          </div>
          <div className="space-y-12">
            <h3 className="font-black text-4xl text-white/10 tracking-tight select-none">{data.siteName}</h3>
            <p className="text-[11px] font-black uppercase tracking-[0.8em] opacity-10">
              Handcrafted in 2026 by Bikin Sendiri Studio. No-Code Revolution.
            </p>
          </div>
        </footer>
      </div>

      {/* Elite WhatsApp Button */}
      {data.showWhatsapp && (
        <div className="absolute bottom-16 right-16 z-50">
          <div className="bg-[#25D366] text-white p-4 rounded-2xl shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-all group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageSquare className="w-6 h-6 fill-white" />
            <div className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-6 transition-all duration-700 flex flex-col text-left">
               <span className="font-black text-sm uppercase tracking-widest leading-none mb-1">Direct Chat</span>
               <span className="text-[10px] font-bold opacity-70 tracking-widest">Priority Support</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
