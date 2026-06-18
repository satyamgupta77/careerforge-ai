"use client";

import { useState, useTransition } from "react";
import { upsertPortfolioSettings } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, LayoutTemplate, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function PortfolioBuilderPage() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    username: "",
    customDomain: "",
    template: "minimal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      upsertPortfolioSettings({
        username: formData.username || undefined,
        customDomain: formData.customDomain || undefined,
        template: formData.template,
      }).then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans py-12">
      <div className="max-w-5xl mx-auto space-y-10 px-6">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Portfolio Builder</h1>
          <p className="text-lg text-muted-foreground mt-2">Turn your profile into a beautiful personal website instantly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 space-y-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2">
                <LinkIcon className="w-5 h-5 text-primary" /> Routing
              </h2>
              
              <div className="space-y-2">
                <Label>CareerHub Username</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground bg-muted px-3 py-2 rounded-md border border-border">careerhub.com/p/</span>
                  <Input 
                    value={formData.username} 
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} 
                    placeholder="johndoe" 
                  />
                </div>
                <p className="text-xs text-muted-foreground">This claims your public profile URL.</p>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Custom Domain (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <Input 
                    value={formData.customDomain} 
                    onChange={(e) => setFormData({ ...formData, customDomain: e.target.value.toLowerCase().trim() })} 
                    placeholder="e.g., johndoe.com" 
                  />
                </div>
                <p className="text-xs text-muted-foreground">Map your own domain. Point your DNS CNAME to `careerhub.com`.</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2">
                <LayoutTemplate className="w-5 h-5 text-primary" /> Appearance
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.template === "minimal" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  onClick={() => setFormData({ ...formData, template: "minimal" })}
                >
                  <div className="h-24 bg-muted rounded-md mb-3 flex items-center justify-center text-xs text-muted-foreground">Minimal Preview</div>
                  <h3 className="font-semibold text-center">Minimalist</h3>
                </div>
                
                <div 
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${formData.template === "developer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  onClick={() => setFormData({ ...formData, template: "developer" })}
                >
                  <div className="h-24 bg-slate-900 rounded-md mb-3 flex items-center justify-center text-xs text-slate-400 font-mono">Dev Preview</div>
                  <h3 className="font-semibold text-center">Developer Dark</h3>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="submit" disabled={isPending} className="px-8 shadow-lg shadow-primary/20">
                {isPending ? "Saving..." : "Save Portfolio Settings"}
              </Button>
            </div>
          </form>
          </div>

          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground rounded-2xl shadow-xl ring-1 ring-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <h2 className="font-extrabold text-2xl mb-3">Your Live Site</h2>
            <p className="text-sm opacity-90 mb-4">Make sure you have filled out your Bio, Skills, and Projects in your Profile settings before sharing.</p>
            {formData.username ? (
              <Link href={`/p/${formData.username}`} target="_blank">
                <Button variant="secondary" className="w-full">View Live Portfolio</Button>
              </Link>
            ) : (
              <Button variant="secondary" className="w-full opacity-50 cursor-not-allowed">Claim Username First</Button>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
