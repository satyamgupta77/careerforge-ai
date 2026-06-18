"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { saveJob, applyJob, reportJob } from "@/actions/jobs";
import { useTransition, useState } from "react";
import { MapPin, DollarSign, Briefcase, Bookmark, Share2, Flag, Send } from "lucide-react";

export function JobCard({ job }: { job: any }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(() => {
      saveJob(job.id).then((res) => {
        if (res.success) setSaved(!saved);
      });
    });
  };

  const handleApply = () => {
    // In a real app, open a modal to select a resume. Hardcoded resumeId for now.
    startTransition(() => {
      applyJob(job.id, "resume-123").then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/jobs/${job.id}`;
    if (navigator.share) {
      await navigator.share({ title: job.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Job URL copied to clipboard!");
    }
  };

  const handleReport = () => {
    startTransition(() => {
      reportJob(job.id, "Spam or irrelevant").then((res) => {
        if (res.success) alert(res.message);
      });
    });
  };

  return (
    <div className="modern-card p-6 flex flex-col hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-muted-foreground font-medium">{job.companyName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSave} disabled={isPending} className={saved ? "text-primary" : ""}>
          <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.experience}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills?.map((skill: string) => (
          <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleReport} className="text-muted-foreground hover:text-destructive">
            <Flag className="w-4 h-4 mr-2" /> Report
          </Button>
        </div>
        <Button onClick={handleApply} disabled={isPending} className="shadow-lg shadow-primary/20">
          <Send className="w-4 h-4 mr-2" /> Apply Now
        </Button>
      </div>
    </div>
  );
}
