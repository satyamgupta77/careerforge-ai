"use client";

import { useState, useTransition } from "react";
import { createCompanyJob } from "@/actions/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    type: "FULL_TIME",
    expiresAt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createCompanyJob(formData).then((res) => {
        if (res.success) {
          alert(res.message);
          router.push("/company/jobs");
        } else {
          alert(res.error);
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground mt-1">Fill out the details to publish a new job opening.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-8 space-y-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            placeholder="e.g. Senior Frontend Engineer" 
            required 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Location</Label>
            <Input 
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              placeholder="e.g. Remote, San Francisco" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Salary Range</Label>
            <Input 
              value={formData.salary} 
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })} 
              placeholder="e.g. $120k - $150k" 
            />
          </div>
          <div className="space-y-2">
            <Label>Expiry Date (Optional)</Label>
            <Input 
              type="date"
              value={formData.expiresAt} 
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Job Description</Label>
          <Textarea 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            placeholder="Describe the role and responsibilities..."
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Requirements & Skills</Label>
          <Textarea 
            value={formData.requirements} 
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} 
            placeholder="List the required skills and qualifications..."
            rows={4}
            required
          />
        </div>

        {/* Verification Guard UI */}
        <div className="p-4 border border-border rounded-lg bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Publish Publicly</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Only verified companies can publish jobs to the public board. Unverified jobs are saved as drafts.
              </p>
            </div>
            {/* Mocking the verification check for UI demonstration */}
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="publishNow" 
                className="w-5 h-5"
                disabled // Disabled because mock status is PENDING
                title="You must be verified to publish jobs."
              />
              <Label htmlFor="publishNow" className="text-muted-foreground">Publish</Label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isPending} className="px-8 shadow-lg shadow-primary/20">
            {isPending ? "Saving..." : "Save Draft"}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
