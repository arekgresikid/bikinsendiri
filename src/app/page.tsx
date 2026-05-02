"use client";
import { useState } from "react";
import { defaultSiteData, SiteData } from "@/types/site";
import EditorPanel from "@/components/builder/EditorPanel";
import PreviewCanvas from "@/components/builder/PreviewCanvas";
import { Rocket, Download, RotateCcw, Monitor, Smartphone } from "lucide-react";
import { generateStaticHtml } from "@/utils/exportHtml";

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleDataChange = (newData: Partial<SiteData>) => {
    setSiteData((prev) => ({ ...prev, ...newData }));
  };

  const handleReset = () => {
    if (confirm("Reset semua konfigurasi ke default?")) {
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
    <main className="h-screen flex flex-col bg-slate-50">
      {/* Header Bar */}
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <Rocket className="text-white w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-900 leading-none">Bikin Sendiri</h1>
            <p className="text-[9px] text-blue-600 font-semibold uppercase tracking-wider">Builder</p>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5 border border-slate-200">
          <button 
            onClick={() => setPreviewDevice('desktop')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button 
            onClick={() => setPreviewDevice('mobile')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download HTML
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Editor */}
        <aside className="w-[380px] border-r border-slate-200 bg-white shrink-0 overflow-hidden flex flex-col">
          <EditorPanel data={siteData} onChange={handleDataChange} />
        </aside>

        {/* Right Side: Preview Canvas */}
        <section className="flex-1 bg-slate-100 p-6 overflow-y-auto flex flex-col items-center custom-scrollbar">
           <PreviewCanvas data={siteData} device={previewDevice} />
        </section>
      </div>
    </main>
  );
}
