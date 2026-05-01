"use client";
import { useState } from "react";
import { defaultSiteData, SiteData } from "@/types/site";
import EditorPanel from "@/components/builder/EditorPanel";
import PreviewCanvas from "@/components/builder/PreviewCanvas";
import { Rocket, Sparkles, Download } from "lucide-react";
import { generateStaticHtml } from "@/utils/exportHtml";

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleDataChange = (newData: Partial<SiteData>) => {
    setSiteData((prev) => ({ ...prev, ...newData }));
  };

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin meriset semua konfigurasi?")) {
      setSiteData(defaultSiteData);
    }
  };

  const handleExport = () => {
    const html = generateStaticHtml(siteData);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteData.siteName.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-100/50">
      {/* Header Bar */}
      <header className="h-16 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
             <Rocket className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Bikin Sendiri</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">No-Code Builder</p>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200">
          <button 
            onClick={() => setPreviewDevice('desktop')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Desktop
          </button>
          <button 
            onClick={() => setPreviewDevice('mobile')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Mobile
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleReset}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" /> Download HTML
          </button>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
             <Sparkles className="w-4 h-4" /> Publish Web
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Editor */}
        <aside className="w-[400px] border-r border-slate-200/60 bg-white shrink-0 overflow-hidden flex flex-col">
          <EditorPanel data={siteData} onChange={handleDataChange} />
        </aside>

        {/* Right Side: Preview Canvas */}
        <section className="flex-1 bg-slate-100 p-8 md:p-12 overflow-y-auto flex flex-col items-center custom-scrollbar">
           <PreviewCanvas data={siteData} device={previewDevice} />
        </section>
      </div>
    </main>
  );
}
