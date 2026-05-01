# Bikin Sendiri (No-Code Web Builder) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a "Bikin Sendiri" app where users can create landing pages via a form input and see a real-time premium preview.

**Architecture:** A split-screen layout with a form-based editor on the left and a live-rendering canvas on the right. State is managed at the root and passed down to components.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, TypeScript, Lucide React (for icons).

---

### Task 1: Define Site Data Types
**Files:**
- Create: `src/types/site.ts`

**Step 1: Create the interface**
```typescript
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
  fontFamily: "Outfit"
};
```

**Step 2: Commit**
```bash
git add src/types/site.ts
git commit -m "feat: add site data types"
```

---

### Task 2: Create the Preview Component
**Files:**
- Create: `src/components/builder/PreviewCanvas.tsx`

**Step 1: Implement the rendering engine**
```tsx
"use client";
import { SiteData } from "@/types/site";

export default function PreviewCanvas({ data }: { data: SiteData }) {
  return (
    <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/20">
      {/* Browser Chrome Simulation */}
      <div className="bg-slate-800 p-2 flex items-center gap-2 px-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto bg-slate-700/50 rounded-md text-[10px] px-8 py-1 text-slate-400">
          {data.siteName.toLowerCase().replace(/\s+/g, '-')}.bikinsendiri.id
        </div>
      </div>
      
      {/* User Generated Content Area */}
      <div className="flex-1 overflow-y-auto bg-white custom-scrollbar" style={{ fontFamily: data.fontFamily }}>
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center border-b border-slate-100">
          <div className="font-bold text-xl" style={{ color: data.primaryColor }}>{data.siteName}</div>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <span>Beranda</span>
            <span>Tentang</span>
            <span>Layanan</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-8 py-16 text-center bg-slate-50 relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-900 leading-tight">
              {data.headerTitle}
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              {data.headerSub}
            </p>
            <button 
              className="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: data.primaryColor }}
            >
              {data.ctaText}
            </button>
          </div>
          
          {/* Hero Image */}
          {data.heroImageUrl && (
            <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={data.heroImageUrl} alt="Hero" className="w-full h-auto object-cover" />
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="px-8 py-20 bg-white">
          <div className="max-w-3xl mx-auto">
             <div className="w-12 h-1 mb-6" style={{ backgroundColor: data.accentColor }} />
             <p className="text-xl text-slate-700 leading-relaxed">
               {data.content}
             </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-12 bg-slate-900 text-slate-400 text-center text-sm">
          {data.footerText}
        </footer>
      </div>
    </div>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/builder/PreviewCanvas.tsx
git commit -m "feat: add preview canvas component"
```

---

### Task 3: Create the Editor Panel
**Files:**
- Create: `src/components/builder/EditorPanel.tsx`

**Step 1: Implement the form with live updates**
```tsx
"use client";
import { SiteData } from "@/types/site";

interface EditorPanelProps {
  data: SiteData;
  onChange: (newData: Partial<SiteData>) => void;
}

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  return (
    <div className="w-full p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           Konfigurasi Web
        </h2>
        <p className="text-sm text-slate-500">Sesuaikan tampilan web Anda tanpa koding.</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Informasi Dasar</h3>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Nama Situs</label>
            <input 
              type="text" 
              value={data.siteName}
              onChange={(e) => onChange({ siteName: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Judul Header</label>
            <input 
              type="text" 
              value={data.headerTitle}
              onChange={(e) => onChange({ headerTitle: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Visuals */}
        <div className="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual & Media</h3>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">URL Gambar Hero</label>
            <input 
              type="text" 
              value={data.heroImageUrl}
              onChange={(e) => onChange({ heroImageUrl: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Warna Utama</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={data.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                />
                <input 
                  type="text"
                  value={data.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="flex-1 p-2 rounded-lg border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Konten Utama</h3>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Deskripsi/Konten</label>
            <textarea 
              rows={4}
              value={data.content}
              onChange={(e) => onChange({ content: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Teks Tombol (CTA)</label>
            <input 
              type="text" 
              value={data.ctaText}
              onChange={(e) => onChange({ ctaText: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**
```bash
git add src/components/builder/EditorPanel.tsx
git commit -m "feat: add editor panel component"
```

---

### Task 4: Assemble the Main Page
**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update globals.css for aesthetics**
```css
@import "tailwindcss";

@theme {
  --font-sans: "Outfit", "Inter", system-ui, sans-serif;
}

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  background: radial-gradient(circle at top right, #e2e8f0 0%, #f8fafc 100%);
  min-height: 100vh;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
```

**Step 2: Implement the main dashboard in page.tsx**
```tsx
"use client";
import { useState } from "react";
import { defaultSiteData, SiteData } from "@/types/site";
import EditorPanel from "@/components/builder/EditorPanel";
import PreviewCanvas from "@/components/builder/PreviewCanvas";
import { Rocket, Sparkles } from "lucide-react";

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  const handleDataChange = (newData: Partial<SiteData>) => {
    setSiteData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header Bar */}
      <header className="h-16 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
             <Rocket className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Bikin Sendiri</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">No-Code Builder</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            Reset
          </button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
             <Sparkles className="w-4 h-4" /> Publish Web
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Editor */}
        <aside className="w-[400px] border-r border-slate-200/60 bg-slate-50/30 backdrop-blur-sm">
          <EditorPanel data={siteData} onChange={handleDataChange} />
        </aside>

        {/* Right Side: Preview Canvas */}
        <section className="flex-1 bg-[#f1f5f9] p-8 md:p-12 overflow-hidden flex flex-col">
           <PreviewCanvas data={siteData} />
        </section>
      </div>
    </main>
  );
}
```

**Step 3: Commit**
```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: assemble main builder interface"
```
