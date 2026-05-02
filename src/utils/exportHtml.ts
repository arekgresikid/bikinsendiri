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

      case 'stats':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900' : 'bg-white'}">
          <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            ${data.stats.map(s => `
              <div class="text-center p-8 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}">
                <div class="text-4xl font-black mb-2" style="color: ${primaryColor}">${s.value}</div>
                <div class="text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-slate-400'}">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </section>`;

      case 'contact':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-4xl font-black text-center mb-10 ${isDark ? 'text-white' : 'text-slate-900'}">Hubungi Kami</h2>
            <form class="p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'} space-y-6">
              ${data.contactForm.fields.map(f => `
                <div>
                  <label class="block text-sm font-bold mb-2 ${isDark ? 'text-white/70' : 'text-slate-600'}">${f}</label>
                  ${f.toLowerCase() === 'pesan' || f.toLowerCase() === 'message' ? 
                    `<textarea class="w-full p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-slate-50 border-slate-200'}" rows="4"></textarea>` :
                    `<input type="text" class="w-full p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-slate-50 border-slate-200'}">`
                  }
                </div>
              `).join('')}
              <button type="button" class="w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style="background-color: ${primaryColor}">
                ${data.contactForm.submitText}
              </button>
            </form>
          </div>
        </section>`;

      case 'partners':
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900' : 'bg-white'}">
          <div class="max-w-6xl mx-auto space-y-12">
            <p class="text-center text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-400'}">Dipercaya oleh</p>
            <div class="flex flex-wrap justify-center gap-12">
              ${data.partners.map(p => `
                <div class="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  ${p.logoUrl ? `<img src="${p.logoUrl}" alt="${p.name}" class="h-10 object-contain">` : `<span class="text-2xl font-black">${p.name}</span>`}
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'video':
        if (!data.videoUrl) return '';
        return `
        <section class="px-8 py-24 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-black text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}">Video</h2>
            <div class="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <iframe src="${data.videoUrl.replace('watch?v=', 'embed/')}" class="w-full h-full border-0" allowfullscreen></iframe>
            </div>
          </div>
        </section>`;

      case 'countdown':
        if (!data.countdownDate) return '';
        return `
        <section class="px-8 py-24 text-white text-center" style="background-color: ${primaryColor}">
          <div class="max-w-4xl mx-auto space-y-8">
            <h2 class="text-5xl font-black">Penawaran Terbatas!</h2>
            <div class="flex justify-center gap-6">
              ${['Hari', 'Jam', 'Menit', 'Detik'].map((label, i) => `
                <div class="bg-white/20 backdrop-blur rounded-2xl p-6 w-24">
                  <div class="text-4xl font-black mb-2">${[12, 8, 45, 30][i]}</div>
                  <div class="text-xs font-bold uppercase opacity-80">${label}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>`;

      case 'newsletter':
        return `
        <section class="px-8 py-32 text-center text-white" style="background-color: ${isDark ? '#2563eb' : '#0f172a'}">
          <div class="max-w-3xl mx-auto space-y-12">
            <h2 class="text-5xl font-black tracking-tight">Berlangganan Newsletter</h2>
            <div class="flex flex-col sm:flex-row gap-4 p-4 bg-white/10 rounded-[32px] backdrop-blur border border-white/20">
              <input type="email" placeholder="Email Anda..." class="flex-1 bg-transparent px-6 text-white placeholder-white/50 outline-none">
              <button class="px-10 py-4 bg-white text-slate-900 rounded-full font-black uppercase text-sm">Join</button>
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
    <link rel="icon" href="${data.faviconUrl || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>'}" />
    <style>
        body { font-family: '${font}', sans-serif; }
        .pattern-dots { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
        .pattern-grid { background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px); background-size: 20px 20px; }
        ${data.customCss || ''}
    </style>
</head>
<body class="${bgClass} ${data.backgroundPattern !== 'none' ? `pattern-${data.backgroundPattern}` : ''}">
    
    ${data.announcement.enabled ? `
    <div class="text-center py-3 px-4 text-sm font-bold text-white" style="background-color: ${data.announcement.bgColor}">
      ${data.announcement.link ? `<a href="${data.announcement.link}" class="hover:underline">${data.announcement.text}</a>` : data.announcement.text}
    </div>` : ''}

    <nav class="px-10 py-6 flex justify-between items-center z-40 backdrop-blur-2xl border-b ${borderClass} ${navBg} ${data.navbarConfig.position === 'fixed' ? 'fixed w-full' : data.navbarConfig.position === 'sticky' ? 'sticky top-0' : 'relative'}">
        <div class="flex items-center gap-3">
          ${data.logoUrl ? `<img src="${data.logoUrl}" alt="Logo" class="h-8">` : ''}
          <div class="font-black text-2xl tracking-tighter" style="color: ${primaryColor}">${data.siteName}</div>
        </div>
        <div class="hidden md:flex gap-10 text-xs font-black uppercase tracking-widest opacity-60">
            ${data.navLinks.map(link => `<a href="${link.url}" class="hover:opacity-100">${link.label}</a>`).join('')}
        </div>
    </nav>

    ${data.breadcrumb.enabled ? `
    <div class="px-10 py-4 text-sm text-slate-500 font-medium">
      ${data.breadcrumb.items.map((item, i) => `
        ${i > 0 ? '<span class="mx-2">/</span>' : ''}
        <a href="${item.url}" class="hover:text-blue-600">${item.label}</a>
      `).join('')}
    </div>` : ''}

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
