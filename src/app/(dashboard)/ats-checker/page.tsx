"use client";

import { useState, useTransition } from "react";
import { generateATSReport } from "@/actions/ats";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ATSCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const [report, setReport] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file || !jobDescription) return;

    startTransition(() => {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      
      // Pass a resumeId if we want to save it to DB, omitted for now for in-memory check
      generateATSReport(formData).then((res) => {
        if (res.success) {
          setReport(res.data);
        } else {
          alert(res.error);
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">ATS Resume Checker</h1>
          <p className="text-lg text-muted-foreground">Upload your resume and paste the job description to see how well you match.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 border-none">
            <CardHeader>
              <CardTitle>1. Upload Resume (PDF)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20">
                <Input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-upload" />
                <Label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                  <span className="font-medium">{file ? file.name : "Click to upload or drag and drop"}</span>
                  <span className="text-sm text-muted-foreground mt-1">PDF (Max 5MB)</span>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 border-none">
            <CardHeader>
              <CardTitle>2. Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Button 
            className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" 
            disabled={!file || !jobDescription || isPending}
            onClick={handleAnalyze}
          >
            {isPending ? "Analyzing..." : "Analyze Match"}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!report ? (
            <div className="h-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 flex items-center justify-center p-12 text-center text-muted-foreground transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              Submit your resume and job description to see your ATS score and keyword analysis here.
            </div>
          ) : (
            <>
              {/* Score Card */}
              <Card className="modern-card border-none bg-gradient-to-br from-section-ats to-white">
                <CardContent className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-green-800 mb-1">Match Score</h3>
                    <p className="text-sm text-green-700">Based on keyword matching</p>
                  </div>
                  <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center bg-white shadow-inner">
                    <span className="text-3xl font-extrabold text-green-600">{report.score}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions */}
              {report.suggestions.length > 0 && (
                <Card className="modern-card border-warning/50 bg-warning/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-warning flex items-center gap-2 text-base">
                      <AlertCircle className="w-4 h-4" /> Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {report.suggestions.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Keywords Matrix */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="modern-card border-none bg-emerald-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Keywords Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {report.keywordsFound.slice(0, 20).map((kw: string) => (
                        <span key={kw} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">{kw}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="modern-card border-none bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-800 flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Keywords Missing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {report.keywordsMissing.slice(0, 20).map((kw: string) => (
                        <span key={kw} className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium">{kw}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
