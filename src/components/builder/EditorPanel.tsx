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
                <option value="Inter">Inter — Modern & Clean</option>
                <option value="Outfit">Outfit — Geometric</option>
                <option value="Roboto">Roboto — Industrial</option>
                <option value="Poppins">Poppins — Friendly</option>
                <option value="DM Sans">DM Sans — Elegant</option>
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

        {/* === STATS === */}
        <CollapsibleSection title="Statistik / Angka" icon={<Hash className="w-4 h-4" />} isOpen={expandedSection === "stats"} onToggle={() => toggleSection("stats")}>
          <div className="space-y-3">
            {data.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={stat.value} onChange={e => { const n = [...data.stats]; n[i] = { ...n[i], value: e.target.value }; onChange({ stats: n }); }} className="w-24 p-2 bg-slate-50 rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="500+" />
                <input value={stat.label} onChange={e => { const n = [...data.stats]; n[i] = { ...n[i], label: e.target.value }; onChange({ stats: n }); }} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="Label" />
                <button onClick={() => onChange({ stats: data.stats.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            <button onClick={() => onChange({ stats: [...data.stats, { label: "Label Baru", value: "0" }] })} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Statistik
            </button>
          </div>
        </CollapsibleSection>

        {/* === CONTACT FORM === */}
        <CollapsibleSection title="Form Kontak" icon={<Mail className="w-4 h-4" />} isOpen={expandedSection === "contact"} onToggle={() => toggleSection("contact")}>
          <div className="space-y-4">
            <Field label="Teks Tombol Submit" value={data.contactForm.submitText} onChange={v => onChange({ contactForm: { ...data.contactForm, submitText: v } })} />
            <Field label="Email Tujuan" value={data.contactForm.email} onChange={v => onChange({ contactForm: { ...data.contactForm, email: v } })} placeholder="email@anda.com" />
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field Form (1 per baris)</label>
              <textarea value={data.contactForm.fields.join('\n')} onChange={e => onChange({ contactForm: { ...data.contactForm, fields: e.target.value.split('\n').filter(Boolean) } })} className="w-full p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100 outline-none focus:border-blue-400 resize-none" rows={4} />
            </div>
          </div>
        </CollapsibleSection>

        {/* === PARTNERS === */}
        <CollapsibleSection title="Partner / Logo" icon={<Star className="w-4 h-4" />} isOpen={expandedSection === "partners"} onToggle={() => toggleSection("partners")}>
          <div className="space-y-3">
            {data.partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={partner.name} onChange={e => { const n = [...data.partners]; n[i] = { ...n[i], name: e.target.value }; onChange({ partners: n }); }} className="w-24 p-2 bg-slate-50 rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Nama" />
                <input value={partner.logoUrl} onChange={e => { const n = [...data.partners]; n[i] = { ...n[i], logoUrl: e.target.value }; onChange({ partners: n }); }} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="URL Logo" />
                <button onClick={() => onChange({ partners: data.partners.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            <button onClick={() => onChange({ partners: [...data.partners, { name: "Brand", logoUrl: "" }] })} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Partner
            </button>
          </div>
        </CollapsibleSection>

        {/* === BLOG POSTS === */}
        <CollapsibleSection title="Blog Posts" icon={<BookOpen className="w-4 h-4" />} isOpen={expandedSection === "blog"} onToggle={() => toggleSection("blog")}>
          <div className="space-y-3">
            {data.blogPosts.map((post, i) => (
              <div key={post.id} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Post #{i + 1}</span>
                  <button onClick={() => onChange({ blogPosts: data.blogPosts.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <input value={post.title} onChange={e => { const n = [...data.blogPosts]; n[i] = { ...n[i], title: e.target.value }; onChange({ blogPosts: n }); }} className="w-full p-2 bg-white rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Judul" />
                <input value={post.excerpt} onChange={e => { const n = [...data.blogPosts]; n[i] = { ...n[i], excerpt: e.target.value }; onChange({ blogPosts: n }); }} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="Ringkasan" />
                <input value={post.image} onChange={e => { const n = [...data.blogPosts]; n[i] = { ...n[i], image: e.target.value }; onChange({ blogPosts: n }); }} className="w-full p-2 bg-white rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="URL Gambar" />
              </div>
            ))}
            <button onClick={() => onChange({ blogPosts: [...data.blogPosts, { id: Date.now().toString(), title: "Post Baru", excerpt: "Deskripsi singkat.", date: new Date().toLocaleDateString('id-ID'), image: "" }] })} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Post
            </button>
          </div>
        </CollapsibleSection>

        {/* === NAV LINKS === */}
        <CollapsibleSection title="Navigasi" icon={<Layers className="w-4 h-4" />} isOpen={expandedSection === "nav"} onToggle={() => toggleSection("nav")}>
          <div className="space-y-3">
            {data.navLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={link.label} onChange={e => { const n = [...data.navLinks]; n[i] = { ...n[i], label: e.target.value }; onChange({ navLinks: n }); }} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" placeholder="Label" />
                <input value={link.url} onChange={e => { const n = [...data.navLinks]; n[i] = { ...n[i], url: e.target.value }; onChange({ navLinks: n }); }} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs border border-slate-100 outline-none focus:border-blue-400" placeholder="URL" />
                <button onClick={() => onChange({ navLinks: data.navLinks.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            <button onClick={() => onChange({ navLinks: [...data.navLinks, { label: "Link Baru", url: "#" }] })} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3.5 h-3.5" /> Tambah Link
            </button>
          </div>
        </CollapsibleSection>

        {/* === VIDEO === */}
        <CollapsibleSection title="Video Embed" icon={<Monitor className="w-4 h-4" />} isOpen={expandedSection === "video"} onToggle={() => toggleSection("video")}>
          <div className="space-y-4">
            <Field label="URL YouTube" value={data.videoUrl} onChange={v => onChange({ videoUrl: v })} placeholder="https://youtube.com/watch?v=..." />
            <p className="text-[10px] text-slate-400">Aktifkan section Video di Urutan Section untuk menampilkan</p>
          </div>
        </CollapsibleSection>

        {/* === ANNOUNCEMENT BAR === */}
        <CollapsibleSection title="Banner Promo" icon={<Sparkles className="w-4 h-4" />} isOpen={expandedSection === "announce"} onToggle={() => toggleSection("announce")}>
          <div className="space-y-4">
            <ToggleRow label="Aktifkan Banner" value={data.announcement.enabled} onChange={v => onChange({ announcement: { ...data.announcement, enabled: v } })} />
            {data.announcement.enabled && (
              <>
                <Field label="Teks Banner" value={data.announcement.text} onChange={v => onChange({ announcement: { ...data.announcement, text: v } })} />
                <Field label="URL Link" value={data.announcement.link} onChange={v => onChange({ announcement: { ...data.announcement, link: v } })} placeholder="#" />
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Warna Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={data.announcement.bgColor} onChange={e => onChange({ announcement: { ...data.announcement, bgColor: e.target.value } })} className="w-8 h-8 rounded-lg cursor-pointer border-0" />
                    <input type="text" value={data.announcement.bgColor} onChange={e => onChange({ announcement: { ...data.announcement, bgColor: e.target.value } })} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-mono border border-slate-100 outline-none focus:border-blue-400" />
                  </div>
                </div>
              </>
            )}
          </div>
        </CollapsibleSection>

        {/* === BREADCRUMB === */}
        <CollapsibleSection title="Breadcrumb" icon={<Layers className="w-4 h-4" />} isOpen={expandedSection === "breadcrumb"} onToggle={() => toggleSection("breadcrumb")}>
          <div className="space-y-4">
            <ToggleRow label="Tampilkan Breadcrumb" value={data.breadcrumb.enabled} onChange={v => onChange({ breadcrumb: { ...data.breadcrumb, enabled: v } })} />
            {data.breadcrumb.enabled && (
              <div className="space-y-2">
                {data.breadcrumb.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={item.label} onChange={e => { const n = [...data.breadcrumb.items]; n[i] = { ...n[i], label: e.target.value }; onChange({ breadcrumb: { ...data.breadcrumb, items: n } }); }} className="flex-1 p-2 bg-slate-50 rounded-lg text-xs font-bold border border-slate-100 outline-none focus:border-blue-400" />
                    <button onClick={() => onChange({ breadcrumb: { ...data.breadcrumb, items: data.breadcrumb.items.filter((_, j) => j !== i) } })} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                <button onClick={() => onChange({ breadcrumb: { ...data.breadcrumb, items: [...data.breadcrumb.items, { label: "Halaman", url: "#" }] } })} className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Tambah Item
                </button>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* === NAVBAR CONFIG === */}
        <CollapsibleSection title="Navbar Config" icon={<Monitor className="w-4 h-4" />} isOpen={expandedSection === "navbar"} onToggle={() => toggleSection("navbar")}>
          <div className="space-y-4">
            <OptionGrid label="Posisi" options={['fixed', 'sticky', 'static']} value={data.navbarConfig.position} onChange={v => onChange({ navbarConfig: { ...data.navbarConfig, position: v as any } })} />
            <OptionGrid label="Gaya" options={['solid', 'transparent']} value={data.navbarConfig.style} onChange={v => onChange({ navbarConfig: { ...data.navbarConfig, style: v as any } })} />
            <OptionGrid label="Alignment" options={['between', 'center']} value={data.navbarConfig.alignment} onChange={v => onChange({ navbarConfig: { ...data.navbarConfig, alignment: v as any } })} />
          </div>
        </CollapsibleSection>

        {/* === STYLE GLOBAL === */}
        <CollapsibleSection title="Style Global" icon={<Sliders className="w-4 h-4" />} isOpen={expandedSection === "style"} onToggle={() => toggleSection("style")}>
          <div className="space-y-4">
            <OptionGrid label="Gaya Tombol" options={['solid', 'outline', 'soft', 'ghost']} value={data.globalStyle.buttonStyle} onChange={v => onChange({ globalStyle: { ...data.globalStyle, buttonStyle: v as any } })} />
            <OptionGrid label="Ukuran Tombol" options={['sm', 'md', 'lg', 'xl']} value={data.globalStyle.buttonSize} onChange={v => onChange({ globalStyle: { ...data.globalStyle, buttonSize: v as any } })} />
            <OptionGrid label="Corner Radius" options={['none', 'md', 'xl', 'full']} value={data.globalStyle.borderRadius} onChange={v => onChange({ globalStyle: { ...data.globalStyle, borderRadius: v as any } })} />
            <OptionGrid label="Layout Padding" options={['compact', 'normal', 'relaxed']} value={data.globalStyle.layoutScale} onChange={v => onChange({ globalStyle: { ...data.globalStyle, layoutScale: v as any } })} />
            <OptionGrid label="Animasi Scroll" options={['none', 'fade-up', 'slide-left', 'zoom-in']} value={data.globalStyle.scrollAnimation} onChange={v => onChange({ globalStyle: { ...data.globalStyle, scrollAnimation: v as any } })} />
          </div>
        </CollapsibleSection>

        {/* === CUSTOM CSS === */}
        <CollapsibleSection title="Custom CSS" icon={<Type className="w-4 h-4" />} isOpen={expandedSection === "css"} onToggle={() => toggleSection("css")}>
          <div className="space-y-2">
            <p className="text-[10px] text-slate-400">Tambahkan CSS kustom untuk override styling</p>
            <textarea
              value={data.customCss}
              onChange={e => onChange({ customCss: e.target.value })}
              className="w-full p-3 bg-slate-900 text-green-400 rounded-xl text-xs font-mono border border-slate-700 outline-none focus:border-blue-400 resize-none"
              rows={8}
              placeholder=".my-class {&#10;  color: red;&#10;}"
              spellCheck={false}
            />
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
      <button onClick={onToggle} className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">{icon}</div>
          <span className="font-bold text-[13px] text-slate-800">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
      <span className="text-xs font-bold text-slate-600">{label}</span>
      <button onClick={() => onChange(!value)} className={`w-10 h-6 rounded-full transition-all relative ${value ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow ${value ? 'left-5' : 'left-1'}`} />
      </button>
    </div>
  );
}

function OptionGrid({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className={`grid gap-1.5 ${options.length <= 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)}
            className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${value === opt ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

