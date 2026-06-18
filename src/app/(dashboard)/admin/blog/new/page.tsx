"use client";

import { useState, useTransition } from "react";
import { createBlogPost } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    category: "CAREER_GUIDANCE",
    excerpt: "",
    content: "",
    isPublished: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      createBlogPost(formData).then((res) => {
        if (res.error) alert(res.error);
        else router.push("/admin/blog");
      });
    });
  };

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Blog Post</h1>
        <p className="text-muted-foreground mt-1">Write a new article for the CareerHub blog.</p>
      </div>

      <form onSubmit={handleSubmit} className="modern-card p-8 space-y-6">
        <div className="space-y-2">
          <Label>Post Title</Label>
          <Input 
            required 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            placeholder="e.g. How to Ace the System Design Interview" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <select 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="RESUME_TIPS">Resume Tips</option>
              <option value="INTERVIEW_QUESTIONS">Interview Questions</option>
              <option value="CAREER_GUIDANCE">Career Guidance</option>
              <option value="JOBS">Jobs</option>
              <option value="INTERNSHIPS">Internships</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Publishing Status</Label>
            <select 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={formData.isPublished ? "true" : "false"}
              onChange={e => setFormData({...formData, isPublished: e.target.value === "true"})}
            >
              <option value="false">Save as Draft</option>
              <option value="true">Publish Immediately</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Excerpt (Short Summary for SEO)</Label>
          <Textarea 
            required
            rows={2}
            value={formData.excerpt} 
            onChange={e => setFormData({...formData, excerpt: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <Label>Content (Markdown / HTML)</Label>
          <div className="border border-border rounded-md overflow-hidden">
            <div className="bg-muted p-2 border-b border-border text-xs text-muted-foreground">
              Rich Text Editor Toolbar (Mock) - Support for Markdown/HTML enabled.
            </div>
            <Textarea 
              required
              rows={15}
              className="border-0 focus-visible:ring-0 rounded-none font-mono"
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
              placeholder="# Introduction\nWrite your article here..." 
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Post"}</Button>
        </div>
      </form>
    </div>
  );
}
