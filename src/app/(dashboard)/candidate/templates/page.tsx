"use client";

import { useState, useEffect, useTransition } from "react";
import { TEMPLATES, FONT_OPTIONS } from "@/lib/templates/registry";
import { updateResumeTheme } from "@/actions/resume"; // We will add this
import { getPrimaryResume } from "@/actions/candidate"; // Assuming this exists or we can fetch it
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Check, Sparkles, Download } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used for toasts, if not we will just alert

export default function TemplateGalleryPage() {
  const [isPending, startTransition] = useTransition();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [resumeData, setResumeData] = useState<any>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState("dev-minimal");
  const [themeColor, setThemeColor] = useState("#2563eb");
  const [fontFamily, setFontFamily] = useState("Inter");

  // Fetch candidate's primary resume data to hydrate the live preview
  useEffect(() => {
    // In a real app, we fetch the primary resume here
    // For MVP, we will use mock data if none is found to show the live preview
    const mockData = {
      personalInfo: { fullName: "Alex Carter", title: "Senior Software Engineer", email: "alex@example.com", phone: "+1 234 567 890", summary: "Passionate engineer with 5+ years of experience building scalable web applications." },
      skills: "React, Next.js, Node.js, TypeScript, PostgreSQL",
      experience: [{ id: "1", role: "Frontend Lead", company: "TechCorp", date: "2021 - Present", description: "<li>Led a team of 4</li><li>Improved performance by 40%</li>" }],
      education: [{ id: "1", degree: "B.S. Computer Science", school: "State University", date: "2019" }]
    };
    setResumeData(mockData);
  }, []);

  const categories = ["All", ...Array.from(new Set(TEMPLATES.map(t => t.category)))];
  const filteredTemplates = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter(t => t.category === activeCategory);

  const ActiveComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || TEMPLATES[0].component;

  const handleSaveTheme = () => {
    startTransition(() => {
      if(resumeId) {
        updateResumeTheme(resumeId, selectedTemplate, themeColor, fontFamily).then(() => {
          toast.success("Template saved!");
        });
      } else {
        toast.error("No primary resume found to apply template to.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-6rem)] max-w-7xl mx-auto">
      {/* Sidebar: Templates & Controls */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 overflow-y-auto pr-4 pb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Template Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">Select and customize an ATS-friendly template.</p>
        </div>

        {/* Customization Controls */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-5 space-y-5 sticky top-0 z-10 bg-white/80 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
          <div>
            <label className="text-sm font-semibold flex items-center mb-2"><Palette className="w-4 h-4 mr-2"/> Theme Color</label>
            <div className="flex flex-wrap gap-2">
              {["#2563eb", "#10b981", "#ef4444", "#8b5cf6", "#f59e0b", "#000000", "#334155"].map(color => (
                <button 
                  key={color} 
                  onClick={() => setThemeColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${themeColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold flex items-center mb-2"><Type className="w-4 h-4 mr-2"/> Font Family</label>
            <select 
              className="w-full p-2 border border-border rounded-md text-sm"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              {FONT_OPTIONS.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </div>
          <Button onClick={handleSaveTheme} className="w-full gap-2">
            <Check className="w-4 h-4" /> Apply to Resume
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Badge 
              key={cat} 
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Template List */}
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              <h3 className="font-bold">{template.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{template.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Live Preview */}
      <div className="w-full md:w-2/3 bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <div className="bg-slate-200 p-3 flex justify-between items-center border-b border-border">
          <div className="text-sm font-semibold text-slate-600 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-primary" /> Live Preview
          </div>
          <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-slate-100 flex justify-center">
          <div className="origin-top transform scale-90 sm:scale-100 pb-20">
            {/* The dynamically loaded template component */}
            {ActiveComponent && (
              <ActiveComponent data={resumeData} themeColor={themeColor} fontFamily={fontFamily} />
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
