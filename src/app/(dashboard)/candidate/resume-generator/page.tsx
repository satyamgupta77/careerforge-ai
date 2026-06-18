"use client";

import { useState, useTransition } from "react";
import { generateResumeWithAI } from "@/actions/generator";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export default function AIResumeGeneratorPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    targetRole: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      generateResumeWithAI(formData).then((res) => {
        if (res.error) {
          alert(res.error);
        } else if (res.success && res.resumeId) {
          router.push(`/candidate/resumes/${res.resumeId}`);
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans py-12">
      <div className="max-w-3xl mx-auto space-y-10 px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6 shadow-inner">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">AI Resume Generator</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Dump your raw notes, chaotic thoughts, and messy bullet points below. Gemini AI will restructure it into a perfect, ATS-optimized professional resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl ring-1 ring-border/50 p-10 space-y-8 transition-all hover:-translate-y-1 hover:shadow-primary/5 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label>Target Role</Label>
            <Input required value={formData.targetRole} onChange={e => setFormData({...formData, targetRole: e.target.value})} placeholder="e.g. Senior Product Manager" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 8900" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Skills (Raw List)</Label>
          <Textarea 
            required
            rows={3}
            value={formData.skills} 
            onChange={e => setFormData({...formData, skills: e.target.value})} 
            placeholder="Type anything here... e.g. React, Python, good at talking to customers, Figma, CSS" 
          />
        </div>

        <div className="space-y-2">
          <Label>Work Experience (Raw Notes)</Label>
          <Textarea 
            required
            rows={5}
            value={formData.experience} 
            onChange={e => setFormData({...formData, experience: e.target.value})} 
            placeholder="Tell us what you did. e.g. I worked at TechCorp from 2020 to 2023. I managed a team of 5 devs and we built a new billing system that increased revenue by 20%. Before that I was at StartupX..." 
          />
        </div>

        <div className="space-y-2">
          <Label>Projects (Raw Notes)</Label>
          <Textarea 
            rows={4}
            value={formData.projects} 
            onChange={e => setFormData({...formData, projects: e.target.value})} 
            placeholder="e.g. Built a weather app over the weekend using React and openweather API. It got 500 stars on Github." 
          />
        </div>

        <div className="space-y-2">
          <Label>Education (Raw Notes)</Label>
          <Textarea 
            required
            rows={3}
            value={formData.education} 
            onChange={e => setFormData({...formData, education: e.target.value})} 
            placeholder="e.g. Graduated from State University in 2019 with a BS in Computer Science. GPA 3.8." 
          />
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <Button type="submit" disabled={isPending} className="px-8 shadow-xl shadow-primary/30 h-12 text-lg w-full md:w-auto gap-2">
            {isPending ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Sparkles className="w-5 h-5" /> Generating Magic...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate My Resume
              </span>
            )}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
