"use client";

import { useEffect, useState, useTransition } from "react";
import { generateJobRecommendations } from "@/actions/recommendations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Briefcase, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const [isPending, startTransition] = useTransition();
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecommendations = () => {
    setIsLoading(true);
    startTransition(() => {
      generateJobRecommendations().then((res) => {
        if (res.error) setError(res.error);
        else setJobs(res.data || []);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Job Recommendations</h1>
          <p className="text-muted-foreground mt-1">Personalized matches based on your primary resume.</p>
        </div>
        <Button onClick={fetchRecommendations} disabled={isPending || isLoading} variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Refresh Matches
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-primary mb-4 animate-bounce" />
            <p className="text-muted-foreground">Gemini AI is analyzing jobs for you...</p>
          </div>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-800 rounded-lg border border-red-200">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed rounded-xl bg-muted/20">
          <h3 className="font-semibold text-lg">No matches found</h3>
          <p className="text-muted-foreground mt-2">Try updating your resume to get better matches.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="modern-card p-6 flex flex-col md:flex-row gap-6">
              
              {/* Match Score UI */}
              <div className="flex flex-col items-center justify-center bg-muted/30 p-6 rounded-xl border border-border md:w-48 shrink-0">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  {job.recommendation.matchScore}%
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Match</div>
                <Progress value={job.recommendation.matchScore} className="h-2 w-full mt-4" />
              </div>

              {/* Job Details */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{job.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.company?.name || "Confidential"}</div>
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</div>
                    </div>
                  </div>
                  <Button render={<Link href={`/jobs/${job.slug}`} />}>
                    Apply <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <strong className="text-primary flex items-center gap-1 mb-1"><Sparkles className="w-3 h-3"/> AI Insight</strong>
                  {job.recommendation.reasoning}
                </div>

                {job.recommendation.recommendedSkills && job.recommendation.recommendedSkills.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-muted-foreground mr-2">Skills to Brush Up On:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.recommendation.recommendedSkills.map((skill: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
