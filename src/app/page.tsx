"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { defaultSiteData, SiteData } from "@/types/site";
import EditorPanel from "@/components/builder/EditorPanel";
import PreviewCanvas from "@/components/builder/PreviewCanvas";
import TemplateGallery from "@/components/builder/TemplateGallery";
import { Rocket, Download, RotateCcw, Monitor, Smartphone, Undo2, Redo2, Save, Upload, LayoutTemplate, ZoomIn, ZoomOut } from "lucide-react";
import { generateStaticHtml } from "@/utils/exportHtml";

const MAX_HISTORY = 50;

export default function Home() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showTemplates, setShowTemplates] = useState(false);
  const [zoom, setZoom] = useState(100);

  // Undo/Redo
  const [history, setHistory] = useState<SiteData[]>([]);
  const [future, setFuture] = useState<SiteData[]>([]);
  const skipHistory = useRef(false);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bikinsendiri_data');
    if (saved) {
      try { setSiteData(JSON.parse(saved)); skipHistory.current = true; } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bikinsendiri_data', JSON.stringify(siteData));
  }, [siteData]);

  const handleDataChange = useCallback((newData: Partial<SiteData>) => {
    setSiteData(prev => {
      if (!skipHistory.current) {
        setHistory(h => [...h.slice(-MAX_HISTORY), prev]);
        setFuture([]);
      }
      skipHistory.current = false;
      return { ...prev, ...newData };
    });
  }, []);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setFuture(f => [siteData, ...f]);
    skipHistory.current = true;
    setSiteData(prev);
  }, [history, siteData]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture(f => f.slice(1));
    setHistory(h => [...h, siteData]);
    skipHistory.current = true;
    setSiteData(next);
  }, [future, siteData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  const handleReset = () => {
    if (confirm("Reset semua konfigurasi ke default?")) {
      handleDataChange(defaultSiteData);
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

  const handleSaveJSON = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${siteData.siteName.toLowerCase().replace(/\s+/g, '-')}-project.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          handleDataChange(data);
        } catch { alert("File JSON tidak valid."); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleTemplateSelect = (data: Partial<SiteData>) => {
    handleDataChange(data as SiteData);
  };

  return (
    <main className="h-screen flex flex-col bg-slate-50">
      {/* Header Bar */}
      <header className="h-12 border-b border-slate-200 bg-white flex items-center justify-between px-3 shrink-0 z-50">
        {/* Left: Logo + Undo/Redo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Rocket className="text-white w-3.5 h-3.5" />
            </div>
            <h1 className="font-bold text-sm text-slate-900 hidden md:block">Bikin Sendiri</h1>
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-0.5">
            <button onClick={undo} disabled={history.length === 0} title="Undo (Ctrl+Z)" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"><Undo2 className="w-3.5 h-3.5" /></button>
            <button onClick={redo} disabled={future.length === 0} title="Redo (Ctrl+Shift+Z)" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"><Redo2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* Center: Device Switcher + Zoom */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5 border border-slate-200">
            <button onClick={() => setPreviewDevice('desktop')} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
              <Monitor className="w-3 h-3" /> Desktop
            </button>
            <button onClick={() => setPreviewDevice('mobile')} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>
              <Smartphone className="w-3 h-3" /> Mobile
            </button>
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 rounded text-slate-400 hover:text-slate-600"><ZoomOut className="w-3 h-3" /></button>
            <span className="text-[10px] font-bold text-slate-400 w-8 text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1 rounded text-slate-400 hover:text-slate-600"><ZoomIn className="w-3 h-3" /></button>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button onClick={() => setShowTemplates(true)} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all" title="Template">
            <LayoutTemplate className="w-3 h-3" /> Template
          </button>
          <button onClick={handleLoadJSON} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all" title="Load Project">
            <Upload className="w-3 h-3" />
          </button>
          <button onClick={handleSaveJSON} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all" title="Save Project">
            <Save className="w-3 h-3" />
          </button>
          <button onClick={handleReset} className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all">
            <RotateCcw className="w-3 h-3" />
          </button>
          <button onClick={handleExport} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold hover:bg-blue-700 transition-all shadow-sm">
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[360px] border-r border-slate-200 bg-white shrink-0 overflow-hidden flex flex-col">
          <EditorPanel data={siteData} onChange={handleDataChange} />
        </aside>
        <section className="flex-1 bg-slate-100 p-4 overflow-y-auto flex flex-col items-center custom-scrollbar">
          <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', width: zoom < 100 ? `${10000 / zoom}%` : '100%', height: '100%' }}>
            <PreviewCanvas data={siteData} device={previewDevice} />
          </div>
        </section>
      </div>

      {/* Template Gallery Modal */}
      {showTemplates && <TemplateGallery onSelect={handleTemplateSelect} onClose={() => setShowTemplates(false)} />}
    </main>
  );
}
