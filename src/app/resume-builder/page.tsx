"use client";

import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutTemplate, Palette, Type } from "lucide-react";
import TemplateThumbnail from "@/components/resume-builder/TemplateThumbnail";

const TEMPLATES = [
  { id: "modern", name: "Modern" },
  { id: "professional", name: "Professional" },
  { id: "minimal", name: "Minimal" },
  { id: "classic", name: "Classic" },
];

const COLORS = [
  { value: "#000000", name: "Classic Black", bgClass: "bg-black" },
  { value: "#4f46e5", name: "Indigo", bgClass: "bg-indigo-600" },
  { value: "#059669", name: "Emerald", bgClass: "bg-emerald-600" },
  { value: "#db2777", name: "Pink", bgClass: "bg-pink-600" },
  { value: "#ea580c", name: "Orange", bgClass: "bg-orange-600" },
];

export default function ResumeBuilderIndex() {
  const router = useRouter();
  const { updateDesign } = useResumeStore();

  const handleSelectTemplate = (templateId: string, themeColor: string) => {
    updateDesign({ templateId, themeColor });
    router.push("/resume-builder/new");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Choose Your Perfect Resume Format
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Select from our 100+ ATS-optimized variations. Pick a layout and color to start. You can easily change fonts, colors, and layouts later in the editor.
          </p>
          <div className="flex justify-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4 text-sky-500"/> 4 Base Layouts</span>
            <span className="flex items-center gap-2"><Palette className="w-4 h-4 text-pink-500"/> 5 Color Themes</span>
            <span className="flex items-center gap-2"><Type className="w-4 h-4 text-emerald-500"/> 5 Typography Styles</span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="space-y-16">
          {TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="relative">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-2">
                {tmpl.name} Series
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {COLORS.map((color) => (
                  <div 
                    key={`${tmpl.id}-${color.value}`}
                    onClick={() => handleSelectTemplate(tmpl.id, color.value)}
                    className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 dark:ring-zinc-800 overflow-hidden flex flex-col hover:-translate-y-1"
                  >
                    {/* Realistic Miniature Preview Graphic */}
                    <div className="h-[280px] bg-slate-100 dark:bg-zinc-800 relative overflow-hidden flex items-start justify-center pt-4">
                      <TemplateThumbnail templateId={tmpl.id} themeColor={color.value} />

                      {/* Overlay CTA */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="text-white font-semibold flex items-center gap-2">
                          Use Template <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-4 flex items-center justify-between bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{tmpl.name}</h3>
                        <p className="text-xs text-slate-500">{color.name} Theme</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full shadow-sm ring-2 ring-white ${color.bgClass}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Information */}
        <div className="mt-20 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl p-8 md:p-12 text-center ring-1 ring-indigo-100 dark:ring-indigo-900">
          <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
            100% ATS-Friendly Guarantee
          </h3>
          <p className="text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto mb-8">
            Every single variation is built with semantic structures that Applicant Tracking Systems can read flawlessly. Choose your style without sacrificing your chances of getting the interview.
          </p>
          <Link href="/resume-builder/new">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl">
              Start with Default Template
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
