"use client";

import { useEffect, useRef, useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Download, Save, LayoutTemplate } from "lucide-react";
import Editor from "@/components/resume-builder/Editor";
import LivePreview from "@/components/resume-builder/LivePreview";
import TemplateSelector from "@/components/resume-builder/TemplateSelector";
import { updateResumeContent } from "@/actions/resume";

export default function ResumeBuilderPage({ params }: { params: { id: string } }) {
  const { data, setResumeData } = useResumeStore();
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsSaving(true);
      await updateResumeContent(params.id, data);
      setIsSaving(false);
    }, 2000); // 2-second debounce
    return () => clearTimeout(timer);
  }, [data, params.id]);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: data.personalInfo.name ? `${data.personalInfo.name}_Resume` : "Resume",
  });

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 font-sans">
      {/* Builder Top Bar */}
      <header className="h-16 bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-border/50 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">Resume Builder</h1>
          <span className="text-sm text-muted-foreground">
            {isSaving ? "Saving..." : "Saved"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <TemplateSelector />
          <Button onClick={() => handlePrint()} size="sm" className="bg-primary text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Pane: Editor */}
        <section className="w-1/2 h-full overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 transition-all duration-300">
          <Editor />
        </section>

        {/* Right Pane: Live Preview */}
        <section className="w-1/2 h-full overflow-y-auto overflow-x-auto bg-transparent rounded-2xl flex justify-center items-start pt-4 pb-12">
          <div ref={previewRef} className="w-[210mm] min-h-[297mm] shrink-0 bg-white shadow-2xl rounded-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-primary/10 duration-500">
            <LivePreview />
          </div>
        </section>
      </main>
    </div>
  );
}
