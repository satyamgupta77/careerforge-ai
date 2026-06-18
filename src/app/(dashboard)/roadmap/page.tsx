"use client";

import { useState, useTransition } from "react";
import { generateCareerRoadmap } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, FolderGit2, CalendarDays } from "lucide-react";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "UI UX Designer"
];

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [isPending, startTransition] = useTransition();
  const [roadmap, setRoadmap] = useState<any>(null);

  const handleGenerate = () => {
    if (!selectedRole) return;
    startTransition(() => {
      generateCareerRoadmap(selectedRole).then((res) => {
        if (res.success) {
          setRoadmap(res.data);
        } else {
          alert(res.error);
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans py-12">
      <div className="max-w-6xl mx-auto space-y-10 px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">AI Career Roadmap</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your target role and let Gemini design a personalized month-by-month learning plan, curated resources, and project ideas.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl ring-1 ring-border/50 p-10 flex flex-col items-center gap-8 mb-16 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <div className="flex flex-wrap justify-center gap-3">
          {ROLES.map((role) => (
            <Button
              key={role}
              variant={selectedRole === role ? "default" : "outline"}
              onClick={() => setSelectedRole(role)}
              className={selectedRole === role ? "shadow-lg shadow-primary/20" : ""}
            >
              {role}
            </Button>
          ))}
        </div>
        <Button 
          size="lg" 
          onClick={handleGenerate} 
          disabled={!selectedRole || isPending}
          className="w-full sm:w-auto px-12"
        >
          {isPending ? "Generating your personalized path..." : "Generate My Roadmap"}
        </Button>
      </div>

      {roadmap && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarDays className="text-primary w-6 h-6" /> 
              Monthly Timeline
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {roadmap.months?.map((m: any, idx: number) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-zinc-900 bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg">
                    <span className="text-primary-foreground font-bold text-lg">{idx + 1}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{m.month}</div>
                    </div>
                    <div className="text-sm font-semibold text-primary mb-2">{m.focus}</div>
                    <ul className="text-muted-foreground text-sm space-y-1 list-disc pl-4">
                      {m.topics?.map((t: string, i: number) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Code className="text-primary w-5 h-5" /> 
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {roadmap.skills?.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FolderGit2 className="text-primary w-5 h-5" /> 
                Portfolio Projects
              </h2>
              <div className="space-y-4">
                {roadmap.projects?.map((proj: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-primary/30 pl-4 py-1">
                    <h3 className="font-semibold">{proj.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <BookOpen className="text-primary w-5 h-5" /> 
                Top Resources
              </h2>
              <ul className="space-y-3">
                {roadmap.resources?.map((res: any, idx: number) => (
                  <li key={idx} className="text-sm flex flex-col">
                    <span className="font-medium text-foreground">{res.name}</span>
                    <span className="text-xs text-muted-foreground">{res.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
