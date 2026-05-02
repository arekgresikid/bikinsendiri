"use client";
import { TEMPLATE_PRESETS, defaultSiteData, SiteData } from "@/types/site";
import { X, Sparkles } from "lucide-react";

interface Props {
  onSelect: (data: Partial<SiteData>) => void;
  onClose: () => void;
}

export default function TemplateGallery({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-[720px] max-h-[80vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Pilih Template</h2>
              <p className="text-[10px] text-slate-400 font-medium">Mulai dengan template profesional</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Blank Template */}
            <button
              onClick={() => { onSelect(defaultSiteData); onClose(); }}
              className="group p-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all text-left"
            >
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">Mulai Kosong</h3>
              <p className="text-[11px] text-slate-400 mt-1">Buat dari nol dengan kreativitas Anda</p>
            </button>

            {/* Preset Templates */}
            {Object.entries(TEMPLATE_PRESETS).map(([key, tpl]) => (
              <button
                key={key}
                onClick={() => { onSelect({ ...defaultSiteData, ...tpl.data }); onClose(); }}
                className="group p-5 rounded-xl border-2 border-slate-100 hover:border-blue-400 hover:shadow-lg transition-all text-left"
              >
                <div className="text-3xl mb-3">{tpl.emoji}</div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">{tpl.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{tpl.desc}</p>
                <div className="flex gap-1.5 mt-3">
                  <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: tpl.data.primaryColor }} />
                  <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: tpl.data.accentColor }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
