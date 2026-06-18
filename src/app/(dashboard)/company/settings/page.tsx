"use client";

import { useState, useTransition } from "react";
import { upsertCompanyProfile } from "@/actions/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CompanySettingsPage() {
  const [isPending, startTransition] = useTransition();
  
  // In a real app, you'd fetch the existing profile here.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    logoUrl: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      upsertCompanyProfile(formData).then((res) => {
        if (res.success) alert(res.message);
        else alert(res.error);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
        <p className="text-muted-foreground mt-1">Manage how your company appears to candidates.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-8 space-y-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            placeholder="e.g. Acme Corp" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label>Company Logo URL</Label>
          <Input 
            value={formData.logoUrl} 
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })} 
            placeholder="https://example.com/logo.png" 
          />
          <p className="text-xs text-muted-foreground">Provide a direct link to your company logo.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Website</Label>
            <Input 
              value={formData.website} 
              onChange={(e) => setFormData({ ...formData, website: e.target.value })} 
              placeholder="https://acmecorp.com" 
              type="url"
            />
          </div>
          <div className="space-y-2">
            <Label>Headquarters / Location</Label>
            <Input 
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              placeholder="e.g. San Francisco, CA" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>About the Company</Label>
          <Textarea 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            placeholder="Tell candidates what makes your company a great place to work..."
            rows={5}
            required
          />
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <Button type="submit" disabled={isPending} className="px-8 shadow-lg shadow-primary/20">
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
