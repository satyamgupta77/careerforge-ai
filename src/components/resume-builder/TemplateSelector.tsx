"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, Check } from "lucide-react";

const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Clean lines and spacious layout" },
  { id: "professional", name: "Professional", description: "Structured two-column ATS optimized" },
  { id: "minimal", name: "Minimal", description: "Ultra-clean single column" },
  { id: "classic", name: "Classic", description: "Traditional serif format" },
];

const COLORS = [
  { value: "#000000", label: "Classic Black", class: "bg-black" },
  { value: "#4f46e5", label: "Indigo", class: "bg-indigo-600" },
  { value: "#059669", label: "Emerald", class: "bg-emerald-600" },
  { value: "#db2777", label: "Pink", class: "bg-pink-600" },
  { value: "#ea580c", label: "Orange", class: "bg-orange-600" },
];

const FONTS = [
  { value: "Inter", label: "Inter (Sans-Serif)" },
  { value: "Roboto", label: "Roboto (Sans-Serif)" },
  { value: "Merriweather", label: "Merriweather (Serif)" },
  { value: "Playfair Display", label: "Playfair Display (Serif)" },
  { value: "Fira Code", label: "Fira Code (Monospace)" },
];

export default function TemplateSelector() {
  const { data, updateDesign } = useResumeStore();
  const design = data.design || { templateId: "modern", themeColor: "#000000", fontFamily: "Inter" };

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
        <LayoutTemplate className="w-4 h-4 mr-2" />
        Templates
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Template Gallery</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-8">
          {/* Base Layouts */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">1. Base Layout</h3>
            <div className="grid grid-cols-2 gap-4">
              {TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => updateDesign({ templateId: tmpl.id })}
                  className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                    design.templateId === tmpl.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-bold text-foreground mb-1 flex items-center justify-between">
                    {tmpl.name}
                    {design.templateId === tmpl.id && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{tmpl.description}</div>
                  
                  {/* Miniature skeleton representation */}
                  <div className="mt-4 border bg-white rounded shadow-sm p-2 h-24 flex flex-col gap-1.5 opacity-50">
                    <div className="h-2 w-1/2 bg-slate-300 rounded" />
                    <div className="h-1 w-1/3 bg-slate-200 rounded mb-2" />
                    <div className="h-1 w-full bg-slate-100 rounded" />
                    <div className="h-1 w-5/6 bg-slate-100 rounded" />
                    <div className="h-1 w-4/6 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Theme Color */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">2. Theme Color</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateDesign({ themeColor: color.value })}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color.class} ${
                    design.themeColor === color.value ? "ring-4 ring-primary ring-offset-2" : ""
                  }`}
                  title={color.label}
                >
                  {design.themeColor === color.value && <Check className="w-5 h-5 text-white" />}
                </button>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">3. Typography</h3>
            <div className="space-y-2">
              {FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateDesign({ fontFamily: font.value })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    design.fontFamily === font.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  <span className="text-lg">{font.label}</span>
                  {design.fontFamily === font.value && <Check className="w-5 h-5 text-primary" />}
                </button>
              ))}
            </div>
          </section>

          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-bold flex items-center gap-2 mb-1">
              <Check className="w-4 h-4" /> 100% ATS Optimized
            </h4>
            <p className="text-sm">
              All 100 variations (4 Layouts x 5 Colors x 5 Fonts) use semantic HTML structure guaranteed to be parsed accurately by modern Applicant Tracking Systems.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
