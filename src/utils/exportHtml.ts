import { SiteData } from "@/types/site";

export function generateStaticHtml(data: SiteData) {
  const isDark = data.isDarkMode;
  const primaryColor = data.primaryColor;
  const accentColor = data.accentColor;
  const font = data.fontFamily;

  const bgClass = isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900';
  const navBg = isDark ? 'bg-slate-900/80' : 'bg-white/80';
  const borderClass = isDark ? 'border-slate-800' : 'border-slate-100';

  // Helper to generate section HTML
  const renderSection = (type: string) => {
    switch (type) {
      case 'hero':
        return `
        <section class="px-8 py-20 text-center relative overflow-hidden">
          <div class="max-w-2xl mx-auto relative z-10">
            <h1 class="text-5xl font-black mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}">
              ${data.headerTitle}
            </h1>
            <p class="text-lg mb-10 ${isDark ? 'text-white/80' : 'text-slate-600'}">
              ${data.headerSub}
            </p>
            <a href="#" class="inline-flex px-10 py-4 rounded-full font-black transition-all hover:scale-105 active:scale-95 shadow-xl items-center gap-2 mx-auto uppercase tracking-wider"
               style="background-color: ${primaryColor}; color: white; text-decoration: none;">
              ${data.ctaText}
            </a>
          </div>
          ${data.heroImageUrl ? `
          <div class="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img src="${data.heroImageUrl}" alt="Hero" class="w-full h-auto object-cover">
          </div>` : ''}
        </section>`;

      case 'gallery':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900/50' : 'bg-white'}">
          <div class="max-w-6xl mx-auto">
            <div class="mb-16">
              <h2 class="text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}">Layanan Kami</h2>
              <div class="w-20 h-2 rounded-full mt-4" style="background-color: ${accentColor}"></div>
            </div>
            <div class="grid gap-8 grid-cols-1 md:grid-cols-3">
              ${data.cards.map(card => `
                <div class="p-8 rounded-[32px] border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-blue-500/5'}">
                  <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isDark ? 'bg-white/10' : 'bg-slate-50'}" style="color: ${primaryColor}">
                    <i data-lucide="${card.icon.toLowerCase()}" class="w-8 h-8"></i>
                  </div>
                  <h3 class="text-xl font-black mb-4">${card.title}</h3>
                  <p class="text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-slate-500'}">${card.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'pricing':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-950/20' : 'bg-slate-50/30'}">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-black">Pilih Paket Anda</h2>
            </div>
            <div class="grid gap-8 grid-cols-1 md:grid-cols-3">
              ${data.pricing.map(p => `
                <div class="p-10 rounded-[40px] border transition-all relative ${p.isPopular ? (isDark ? 'bg-blue-600 border-blue-500' : 'bg-white border-blue-500 shadow-2xl') : (isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100')}">
                  ${p.isPopular ? '<div class="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase">Terpopuler</div>' : ''}
                  <h3 class="text-lg font-bold mb-2">${p.plan}</h3>
                  <div class="flex items-baseline gap-1 mb-8">
                    <span class="text-4xl font-black">${p.price}</span>
                  </div>
                  <ul class="space-y-4 mb-10">
                    ${p.features.map(f => `
                      <li class="flex items-center gap-3 text-sm">
                        <i data-lucide="check" class="w-4 h-4 text-blue-500"></i>
                        <span>${f}</span>
                      </li>
                    `).join('')}
                  </ul>
                  <button class="w-full py-4 rounded-2xl font-black text-sm ${p.isPopular ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}">Pilih Paket</button>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'faq':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-950/40' : 'bg-slate-50/50'}">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-4xl font-black text-center mb-12">Pertanyaan Umum</h2>
            <div class="space-y-4">
              ${data.faq.map((f) => `
                <div class="rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-6">
                  <div class="font-bold text-sm mb-2">${f.question}</div>
                  <div class="text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}">${f.answer}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'testimonials':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900' : 'bg-white'}">
          <div class="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
            <div>
              <h2 class="text-4xl font-black">Apa Kata Klien</h2>
            </div>
            <div class="space-y-6">
              ${data.testimonials.map(t => `
                <div class="p-8 rounded-[32px] border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}">
                  <p class="text-sm italic mb-6">"${t.content}"</p>
                  <div class="flex items-center gap-4">
                    <img src="${t.avatar}" class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <h4 class="text-sm font-bold">${t.name}</h4>
                      <p class="text-[10px] text-blue-500 font-bold uppercase">${t.role}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'blog':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900' : 'bg-white'}">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-black mb-12 text-center">Blog & Berita</h2>
            <div class="grid gap-10 md:grid-cols-2">
              ${data.blogPosts.map(post => `
                <div class="flex flex-col sm:flex-row gap-8">
                  <img src="${post.image}" class="sm:w-56 h-40 rounded-3xl object-cover">
                  <div class="py-2">
                    <div class="text-[10px] font-black text-blue-500 uppercase mb-2">${post.date}</div>
                    <h3 class="text-xl font-black mb-2">${post.title}</h3>
                    <p class="text-sm ${isDark ? 'text-white/60' : 'text-slate-500'}">${post.excerpt}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      default:
        return '';
    }
  };

  const sectionsHtml = data.sections
    .filter(s => s.enabled)
    .map(s => renderSection(s.type))
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.seoTitle || data.siteName}</title>
    <meta name="description" content="${data.seoDescription}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Outfit:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: '${font}', sans-serif; }
        .pattern-dots { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
        .pattern-grid { background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
    </style>
</head>
<body class="${bgClass} ${data.backgroundPattern !== 'none' ? `pattern-${data.backgroundPattern}` : ''}">
    
    <nav class="px-10 py-6 flex justify-between items-center sticky top-0 z-40 backdrop-blur-2xl border-b ${borderClass} ${navBg}">
        <div class="font-black text-2xl tracking-tighter" style="color: ${primaryColor}">${data.siteName}</div>
        <div class="hidden md:flex gap-10 text-xs font-black uppercase tracking-widest opacity-60">
            ${data.navLinks.map(link => `<span>${link.label}</span>`).join('')}
        </div>
    </nav>

    ${sectionsHtml}

    <footer class="p-20 text-center space-y-12 bg-slate-950 text-slate-400">
        <div class="flex justify-center gap-8">
            ${data.socialLinks.map(s => `<div class="w-14 h-14 rounded-[20px] border border-white/10 flex items-center justify-center"><i data-lucide="${s.platform}"></i></div>`).join('')}
        </div>
        <div class="space-y-4">
            <h3 class="font-black text-xl text-white">${data.siteName}</h3>
            <p class="text-xs font-bold uppercase tracking-widest opacity-40">${data.footerText || `© 2026 ${data.siteName}. All Rights Reserved.`}</p>
        </div>
    </footer>

    ${data.showWhatsapp ? `
    <a href="https://wa.me/${data.whatsappNumber}" class="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white p-5 rounded-[24px] shadow-2xl flex items-center justify-center">
        <i data-lucide="message-square" class="w-7 h-7 fill-white"></i>
    </a>` : ''}

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}
