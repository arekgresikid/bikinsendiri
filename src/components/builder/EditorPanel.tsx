"use client";
import { SiteData } from "@/types/site";
import { 
  Layout, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  MessageSquare, 
  Search, 
  Menu, 
  Plus, 
  Trash2, 
  Globe,
  Star,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  DollarSign,
  HelpCircle,
  Users,
  BarChart3,
  BookOpen,
  Zap,
  Clock,
  Moon,
  Sun,
  Hash,
  Info,
  Calendar,
  Layers,
  MousePointer2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Monitor,
  Sparkles,
  Droplets,
  ZapOff,
  Bell,
  Mail,
  Grid,
  List as ListIcon,
  Maximize,
  Minimize,
  Sliders
} from "lucide-react";
import { useState } from "react";

interface EditorPanelProps {
  data: SiteData;
  onChange: (newData: Partial<SiteData>) => void;
}

const COLOR_PRESETS = [
  { name: "Neon Blue", primary: "#2563eb", accent: "#3b82f6" },
  { name: "Royal Purple", primary: "#7c3aed", accent: "#8b5cf6" },
  { name: "Nature Green", primary: "#059669", accent: "#10b981" },
  { name: "Sunset Orange", primary: "#ea580c", accent: "#f97316" },
  { name: "Clean Slate", primary: "#0f172a", accent: "#334155" },
  { name: "Rose Pink", primary: "#db2777", accent: "#ec4899" }
];

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("sections");
  const [showAdvanced, setShowAdvanced] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...data.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newSections.length) return;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    onChange({ sections: newSections });
  };

  const toggleSectionEnabled = (id: string) => {
    const newSections = data.sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s);
    onChange({ sections: newSections });
  };

  const updateSectionLayout = (id: string, layout: 'grid' | 'list') => {
    const newSections = data.sections.map(s => s.id === id ? { ...s, layout } : s);
    onChange({ sections: newSections });
  };

  const updateSectionStyle = (id: string, styleKey: string, value: string) => {
    const newSections = data.sections.map(s => {
      if (s.id === id) {
        return {
          ...s,
          styles: {
            ...(s.styles || {}),
            [styleKey]: value
          }
        };
      }
      return s;
    });
    onChange({ sections: newSections });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#fcfcfd] border-r border-slate-200">
      <div className="p-8 bg-white border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600 fill-blue-600/10" /> Bikin Sendiri
           </h2>
           <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm font-black text-xs">
              V3
           </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black uppercase rounded-full tracking-widest shadow-lg shadow-blue-500/20">Elite Studio</div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1"><Zap className="w-3 h-3" /> Ultra Edition</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pb-40">
        
        {/* SECTION: SECTION ORCHESTRATOR */}
        <CollapsibleSection 
          title="Section Orchestrator" 
          icon={<Layers className="w-4 h-4" />} 
          isOpen={expandedSection === "sections"} 
          onToggle={() => toggleSection("sections")}
        >
          <div className="space-y-4">
            {data.sections.map((section, index) => (
              <div key={section.id} className={`flex flex-col p-5 rounded-[32px] border-2 transition-all ${section.enabled ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-40'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveSection(index, 'up')} className="text-slate-300 hover:text-blue-500 disabled:opacity-0" disabled={index === 0}><ChevronUp className="w-4 h-4" /></button>
                      <button onClick={() => moveSection(index, 'down')} className="text-slate-300 hover:text-blue-500 disabled:opacity-0" disabled={index === data.sections.length - 1}><ChevronDown className="w-4 h-4" /></button>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-800">{section.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowAdvanced(showAdvanced === section.id ? null : section.id)}
                      className={`p-2.5 rounded-2xl transition-all ${showAdvanced === section.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-300 bg-slate-50'}`}
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => toggleSectionEnabled(section.id)}
                      className={`p-2.5 rounded-2xl transition-all ${section.enabled ? 'text-blue-600 bg-blue-50 shadow-inner' : 'text-slate-300 bg-slate-100'}`}
                    >
                      {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* ADVANCED SECTION STYLES */}
                {showAdvanced === section.id && section.enabled && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-slate-400">Padding Top</label>
                          <input 
                            placeholder="e.g. 120px"
                            value={section.styles?.paddingTop || ""}
                            onChange={(e) => updateSectionStyle(section.id, 'paddingTop', e.target.value)}
                            className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-100 outline-none focus:border-blue-500"
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-slate-400">Padding Bottom</label>
                          <input 
                            placeholder="e.g. 120px"
                            value={section.styles?.paddingBottom || ""}
                            onChange={(e) => updateSectionStyle(section.id, 'paddingBottom', e.target.value)}
                            className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-100 outline-none focus:border-blue-500"
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-slate-400">Margin Top</label>
                          <input 
                            placeholder="e.g. 0px"
                            value={section.styles?.marginTop || ""}
                            onChange={(e) => updateSectionStyle(section.id, 'marginTop', e.target.value)}
                            className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-100 outline-none focus:border-blue-500"
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-slate-400">Max Width</label>
                          <input 
                            placeholder="e.g. 1200px / auto"
                            value={section.styles?.maxWidth || ""}
                            onChange={(e) => updateSectionStyle(section.id, 'maxWidth', e.target.value)}
                            className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold border border-slate-100 outline-none focus:border-blue-500"
                          />
                       </div>
                    </div>
                  </div>
                )}

                {section.type === 'gallery' && section.enabled && !showAdvanced && (
                   <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                      <button 
                        onClick={() => updateSectionLayout(section.id, 'grid')}
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-xl border transition-all text-[10px] font-black uppercase ${section.layout === 'grid' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                      >
                         <Grid className="w-3 h-3" /> Grid
                      </button>
                      <button 
                        onClick={() => updateSectionLayout(section.id, 'list')}
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-xl border transition-all text-[10px] font-black uppercase ${section.layout === 'list' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                      >
                         <ListIcon className="w-3 h-3" /> List
                      </button>
                   </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* SECTION: BUTTON & SCALE SETTINGS */}
        <CollapsibleSection 
          title="Global Spacing & Buttons" 
          icon={<MousePointer2 className="w-4 h-4" />} 
          isOpen={expandedSection === "button"} 
          onToggle={() => toggleSection("button")}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gaya Tombol Global</label>
              <div className="grid grid-cols-2 gap-2">
                {['solid', 'outline', 'soft', 'ghost'].map(style => (
                  <button 
                    key={style}
                    onClick={() => onChange({ globalStyle: { ...data.globalStyle, buttonStyle: style as any } })}
                    className={`p-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${data.globalStyle.buttonStyle === style ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Layout Padding Global</label>
              <div className="grid grid-cols-3 gap-2">
                {['compact', 'normal', 'relaxed'].map(scale => (
                  <button 
                    key={scale}
                    onClick={() => onChange({ globalStyle: { ...data.globalStyle, layoutScale: scale as any } })}
                    className={`p-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${data.globalStyle.layoutScale === scale ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Typography Section */}
        <CollapsibleSection 
          title="Frame & Typography" 
          icon={<Monitor className="w-4 h-4" />} 
          isOpen={expandedSection === "ui"} 
          onToggle={() => toggleSection("ui")}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corner Radius</label>
              <div className="grid grid-cols-4 gap-2">
                {['none', 'md', 'xl', 'full'].map(r => (
                  <button 
                    key={r}
                    onClick={() => onChange({ globalStyle: { ...data.globalStyle, borderRadius: r as any } })}
                    className={`p-3 rounded-2xl text-[10px] font-black uppercase border-2 transition-all ${data.globalStyle.borderRadius === r ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typography Duo</label>
               <select 
                  value={data.fontFamily}
                  onChange={(e) => onChange({ fontFamily: e.target.value as any })}
                  className="w-full p-4 rounded-2xl bg-white border-2 border-slate-100 text-xs font-black outline-none focus:border-blue-600 appearance-none"
               >
                  <option value="Inter">Inter — The Studio Modern</option>
                  <option value="Outfit">Outfit — Geometric Elegance</option>
                  <option value="Roboto">Roboto — Industrial Power</option>
               </select>
            </div>
          </div>
        </CollapsibleSection>

      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, children, isOpen, onToggle }: { title: string, icon: any, children: React.ReactNode, isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="bg-white rounded-[36px] border border-slate-100 overflow-hidden shadow-sm transition-all hover:shadow-xl hover:border-slate-200">
      <button onClick={onToggle} className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-[22px] bg-slate-950 text-white flex items-center justify-center shadow-2xl transition-transform active:scale-90">{icon}</div>
          <span className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">{title}</span>
        </div>
        <div className={`transition-transform duration-700 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronDown className="w-5 h-5 text-slate-300" />
        </div>
      </button>
      {isOpen && <div className="p-8 border-t border-slate-50 bg-[#fcfdfe] animate-in fade-in slide-in-from-bottom-2 duration-1000">{children}</div>}
    </div>
  );
}
