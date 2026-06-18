"use client";

import { useState, useTransition } from "react";
import { upsertCandidateProfile, addSkill } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [isPending, startTransition] = useTransition();
  const [skillPending, startSkillTransition] = useTransition();
  
  const [formData, setFormData] = useState({
    bio: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      upsertCandidateProfile(formData).then((res) => {
        if (res.success) alert(res.message);
        else alert(res.error);
      });
    });
  };

  const handleAddSkill = () => {
    if (!newSkill) return;
    startSkillTransition(() => {
      addSkill(newSkill).then((res) => {
        if (res.success) {
          setNewSkill("");
          alert("Skill added!");
        } else alert(res.error);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidate Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your master profile for 1-Click Easy Apply.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleProfileSubmit} className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-8 space-y-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h2 className="text-xl font-bold border-b border-border pb-2">Basic Information</h2>
            
            <div className="space-y-2">
              <Label>Professional Bio</Label>
              <Textarea 
                value={formData.bio} 
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
                placeholder="A brief overview of your career and goals..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input 
                value={formData.linkedin} 
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} 
                placeholder="https://linkedin.com/in/username" 
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input 
                value={formData.github} 
                onChange={(e) => setFormData({ ...formData, github: e.target.value })} 
                placeholder="https://github.com/username" 
                type="url"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Portfolio Website</Label>
              <Input 
                value={formData.website} 
                onChange={(e) => setFormData({ ...formData, website: e.target.value })} 
                placeholder="https://yourwebsite.com" 
                type="url"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isPending} className="px-8">
                {isPending ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 space-y-4 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h2 className="font-bold border-b border-border pb-2">Skills</h2>
            <div className="flex gap-2">
              <Input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                placeholder="e.g. React" 
              />
              <Button onClick={handleAddSkill} disabled={skillPending || !newSkill}>Add</Button>
            </div>
            <p className="text-xs text-muted-foreground">Add your top skills here to match with ATS checks instantly during Easy Apply.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 space-y-4 bg-primary/5 border-primary/20 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h2 className="font-bold text-primary">Easy Apply Ready</h2>
            <p className="text-sm text-muted-foreground">When you hit "Apply Now" on a job, this profile and your primary resume will be instantly securely sent to the employer.</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
