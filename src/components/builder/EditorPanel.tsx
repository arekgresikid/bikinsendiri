"use client";
import { SiteData } from "@/types/site";
import { 
  Layers, ChevronDown, ChevronUp, Eye, EyeOff, Sliders, Grid,
  List as ListIcon, MousePointer2, Monitor, Sparkles, Type,
  Palette, Image as ImageIcon, MessageSquare, Globe, Star,
  DollarSign, HelpCircle, Users, BookOpen, Moon, Sun, Mail,
  Plus, Trash2, Hash
} from "lucide-react";
import { useState } from "react";

interface EditorPanelProps {
  data: SiteData;
  onChange: (newData: Partial<SiteData>) => void;
}

const COLOR_PRESETS = [
  { name: "Blue", primary: "#2563eb", accent: "#3b82f6" },
  { name: "Purple", primary: "#7c3aed", accent: "#8b5cf6" },
  { name: "Green", primary: "#059669", accent: "#10b981" },
  { name: "Orange", primary: "#ea580c", accent: "#f97316" },
  { name: "Slate", primary: "#0f172a", accent: "#334155" },
  { name: "Pink", primary: "#db2777", accent: "#ec4899" }
];

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("identity");

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

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...data.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    onChange({ cards: newCards });
  };

  const addCard = () => {
    const newCards = [...data.cards, { id: Date.now().toString(), title: "Fitur Baru", description: "Deskripsi fitur baru Anda.", category: "Utama", icon: "Zap" }];
    onChange({ cards: newCards });
  };

  const removeCard = (index: number) => {
    const newCards = data.cards.filter((_, i) => i !== index);
    onChange({ cards: newCards });
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaq = [...data.faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    onChange({ faq: newFaq });
  };

  const addFaq = () => {
    onChange({ faq: [...data.faq, { question: "Pertanyaan baru?", answer: "Jawaban pertanyaan baru." }] });
  };

  const removeFaq = (index: number) => {
    onChange({ faq: data.faq.filter((_, i) => i !== index) });
  };

  const updatePricing = (index: number, field: string, value: any) => {
    const newPricing = [...data.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    onChange({ pricing: newPricing });
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const newTestimonials = [...data.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    onChange({ testimonials: newTestimonials });
  };

  const addTestimonial = () => {
    onChange({ testimonials: [...data.testimonials, { name: "Nama Baru", role: "Jabatan", content: "Testimoni baru.", rating: 5, avatar: "https://i.pravatar.cc/150?u=" + Date.now() }] });
  };

  const removeTestimonial = (index: number) => {
    onChange({ testimonials: data.testimonials.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto custom-scrollbar">

        {/* === IDENTITAS SITUS === */}
        <CollapsibleSection title="Identitas Situs" icon={<Globe className="w-4 h-4" />} isOpen={expandedSection === "identity"} onToggle={() => toggleSection("identity")}>
          <div className="space-y-4">
            <Field label="Nama Situs" value={data.siteName} onChange={v => onChange({ siteName: v })} />
            <Field label="SEO Title" value={data.seoTitle} onChange={v => onChange({ seoTitle: v })} />
            <Field label="SEO Description" value={data.seoDescription} onChange={v => onChange({ seoDescription: v })} multiline />
          </div>
        </CollapsibleSection>

        {/* === HERO === */}
        <CollapsibleSection title="Hero Section" icon={<Sparkles className="w-4 h-4" />} isOpen={expandedSection === "hero"} onToggle={() => toggleSection("hero")}>
          <div className="space-y-4">
            <Field label="Judul Utama" value={data.headerTitle} onChange={v => onChange({ headerTitle: v })} />
            <Field label="Sub Judul" value={data.headerSub} onChange={v => onChange({ headerSub: v })} multiline />
            <Field label="Teks Tombol CTA" value={data.ctaText} onChange={v => onChange({ ctaText: v })} />
            <Field label="URL Gambar Hero" value={data.heroImageUrl} onChange={v => onChange({ heroImageUrl: v })} placeholder="https://..." />
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alignment Hero</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['left', 'center', 'right'] as const).map(align => (
                  <button key={align} onClick={() => onChange({ globalStyle: { ...data.globalStyle, heroAlign: align } })}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${data.globalStyle.heroAlign === align ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* === TEMA & WARNA === */}
        <CollapsibleSection title="Tema & Warna" icon={<Palette className="w-4 h-4" />} isOpen={expandedSection === "theme"} onToggle={() => toggleSection("theme")}>
          <div className="space-y-5">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-2">{data.isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />} Mode Gelap</span>
              <button onClick={() => onChange({ isDarkMode: !data.isDarkMode })} className={`w-10 h-6 rounded-full transition-all relative ${data.isDarkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow ${data.isDarkMode ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preset Warna</label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PRESETS.map(preset => (
                  <button key={preset.name} onClick={() => onChange({ primaryColor: preset.primary, accentColor: preset.accent })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-[10px] font-bold ${data.primaryColor === preset.primary ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: preset.primary }} />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Warna Utama</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.primaryColor} onChange={e => onChange({ primaryColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border-0" />
                  <input type="text" value={data.primaryColor} onChange={e => onChange({ primaryColor: e.target.value })} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-mono border border-slate-100 outline-none focus:border-blue-400" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Warna Aksen</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.accentColor} onChange={e => onChange({ accentColor: e.target.value })} className="w-8 h-8 rounded-lg cursor-pointer border-0" />
                  <input type="text" value={data.accentColor} onChange={e => onChange({ accentColor: e.target.value })} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-mono border border-slate-100 outline-none focus:border-blue-400" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Font</label>
              <select value={data.fontFamily} onChange={e => onChange({ fontFamily: e.target.value as any })} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold outline-none focus:border-blue-400">
                <option value="Inter">Inter</option>
                <option value="Outfit">Outfit</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Background Pattern</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['none', 'dots', 'grid', 'mesh'] as const).map(p => (
                  <button key={p} onClick={() => onChange({ backgroundPattern: p })}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${data.backgroundPattern === p ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* === LAYANAN / KARTU === */}
        <CollapsibleSection title="Layanan / Kartu" icon={<Star className="w-4 h-4" />} isOpen={expandedSection === "cards"} onToggle={() => toggleSection("cards")}>
          <div className="space-y-3">
            {data.cards.map((card, i) => (
              <div key={card.id} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Kartu #{i + 1}</span>
                  <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <input value={card.title} onChange={e => updateCard(i, 'title', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Judul" />
                <textarea value={card.description} onChange={e => updateCard(i, 'description', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400 resize-none" rows={2} placeholder="Deskripsi" />
                <select value={card.icon} onChange={e => updateCard(i, 'icon', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none">
                  <option value="Zap">⚡ Zap</option>
                  <option value="DollarSign">💰 DollarSign</option>
                  <option value="Clock">🕐 Clock</option>
                  <option value="Star">⭐ Star</option>
                </select>
              </div>
            ))}
            <button onClick={addCard} className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Kartu
            </button>
          </div>
        </CollapsibleSection>

        {/* === PRICING === */}
        <CollapsibleSection title="Paket Harga" icon={<DollarSign className="w-4 h-4" />} isOpen={expandedSection === "pricing"} onToggle={() => toggleSection("pricing")}>
          <div className="space-y-3">
            {data.pricing.map((plan, i) => (
              <div key={i} className={`p-3 rounded-xl space-y-2 border ${plan.isPopular ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Paket #{i + 1}</span>
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 cursor-pointer">
                    <input type="checkbox" checked={plan.isPopular} onChange={e => updatePricing(i, 'isPopular', e.target.checked)} className="rounded" /> Populer
                  </label>
                </div>
                <input value={plan.plan} onChange={e => updatePricing(i, 'plan', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Nama Paket" />
                <input value={plan.price} onChange={e => updatePricing(i, 'price', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Harga" />
                <textarea value={plan.features.join('\n')} onChange={e => updatePricing(i, 'features', e.target.value.split('\n'))} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400 resize-none" rows={3} placeholder="1 fitur per baris" />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* === FAQ === */}
        <CollapsibleSection title="FAQ" icon={<HelpCircle className="w-4 h-4" />} isOpen={expandedSection === "faq"} onToggle={() => toggleSection("faq")}>
          <div className="space-y-3">
            {data.faq.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">FAQ #{i + 1}</span>
                  <button onClick={() => removeFaq(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <input value={item.question} onChange={e => updateFaq(i, 'question', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Pertanyaan" />
                <textarea value={item.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400 resize-none" rows={2} placeholder="Jawaban" />
              </div>
            ))}
            <button onClick={addFaq} className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah FAQ
            </button>
          </div>
        </CollapsibleSection>

        {/* === TESTIMONIAL === */}
        <CollapsibleSection title="Testimonial" icon={<Users className="w-4 h-4" />} isOpen={expandedSection === "testimonials"} onToggle={() => toggleSection("testimonials")}>
          <div className="space-y-3">
            {data.testimonials.map((t, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Testimoni #{i + 1}</span>
                  <button onClick={() => removeTestimonial(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <input value={t.name} onChange={e => updateTestimonial(i, 'name', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Nama" />
                <input value={t.role} onChange={e => updateTestimonial(i, 'role', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="Jabatan" />
                <textarea value={t.content} onChange={e => updateTestimonial(i, 'content', e.target.value)} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400 resize-none" rows={2} placeholder="Isi testimoni" />
              </div>
            ))}
            <button onClick={addTestimonial} className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Testimoni
            </button>
          </div>
        </CollapsibleSection>

        {/* === SECTION ORCHESTRATOR === */}
        <CollapsibleSection title="Urutan Section" icon={<Layers className="w-4 h-4" />} isOpen={expandedSection === "sections"} onToggle={() => toggleSection("sections")}>
          <div className="space-y-2">
            {data.sections.map((section, index) => (
              <div key={section.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${section.enabled ? 'bg-white border-slate-100' : 'bg-slate-50 border-transparent opacity-50'}`}>
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveSection(index, 'up')} className="text-slate-300 hover:text-blue-500 disabled:opacity-0" disabled={index === 0}><ChevronUp className="w-3.5 h-3.5" /></button>
                  <button onClick={() => moveSection(index, 'down')} className="text-slate-300 hover:text-blue-500 disabled:opacity-0" disabled={index === data.sections.length - 1}><ChevronDown className="w-3.5 h-3.5" /></button>
                </div>
                <span className="text-xs font-bold text-slate-700 flex-1 capitalize">{section.type}</span>
                <button onClick={() => toggleSectionEnabled(section.id)} className={`p-1.5 rounded-lg transition-all ${section.enabled ? 'text-blue-600 bg-blue-50' : 'text-slate-300 bg-slate-100'}`}>
                  {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* === WHATSAPP & SOCIAL === */}
        <CollapsibleSection title="WhatsApp & Sosial" icon={<MessageSquare className="w-4 h-4" />} isOpen={expandedSection === "social"} onToggle={() => toggleSection("social")}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-bold text-slate-600">Tombol WhatsApp</span>
              <button onClick={() => onChange({ showWhatsapp: !data.showWhatsapp })} className={`w-10 h-6 rounded-full transition-all relative ${data.showWhatsapp ? 'bg-green-500' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow ${data.showWhatsapp ? 'left-5' : 'left-1'}`} />
              </button>
            </div>
            {data.showWhatsapp && (
              <Field label="Nomor WhatsApp" value={data.whatsappNumber} onChange={v => onChange({ whatsappNumber: v })} placeholder="628123456789" />
            )}
            <Field label="Teks Footer" value={data.footerText} onChange={v => onChange({ footerText: v })} />
          </div>
        </CollapsibleSection>

        {/* === STYLE GLOBAL === */}
        <CollapsibleSection title="Style Global" icon={<Sliders className="w-4 h-4" />} isOpen={expandedSection === "style"} onToggle={() => toggleSection("style")}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gaya Tombol</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['solid', 'outline', 'soft', 'ghost'] as const).map(style => (
                  <button key={style} onClick={() => onChange({ globalStyle: { ...data.globalStyle, buttonStyle: style } })}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${data.globalStyle.buttonStyle === style ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corner Radius</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['none', 'md', 'xl', 'full'] as const).map(r => (
                  <button key={r} onClick={() => onChange({ globalStyle: { ...data.globalStyle, borderRadius: r } })}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${data.globalStyle.borderRadius === r ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Layout Padding</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['compact', 'normal', 'relaxed'] as const).map(scale => (
                  <button key={scale} onClick={() => onChange({ globalStyle: { ...data.globalStyle, layoutScale: scale } })}
                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${data.globalStyle.layoutScale === scale ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {scale}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <div className="h-20" />
      </div>
    </div>
  );
}

/* === Reusable Components === */

function Field({ label, value, onChange, placeholder, multiline }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  const cls = "w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100 outline-none focus:border-blue-400 focus:bg-white transition-all";
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} className={`${cls} resize-none`} rows={3} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </div>
  );
}

function CollapsibleSection({ title, icon, children, isOpen, onToggle }: { title: string; icon: any; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-100">
      <button onClick={onToggle} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">{icon}</div>
          <span className="font-bold text-sm text-slate-800">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
