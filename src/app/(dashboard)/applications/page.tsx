"use client";

import { useEffect, useState } from "react";
import { getApplicationHistory } from "@/actions/profile";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplicationHistory().then((res) => {
      if (res.success && res.data) {
        setApplications(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Application History</h1>
        <p className="text-muted-foreground mt-1">Track the real-time status of all your job applications.</p>
      </div>

      {loading ? (
        <div className="text-center p-12 text-muted-foreground">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="modern-card p-12 flex flex-col items-center text-center space-y-4">
          <Briefcase className="w-12 h-12 text-muted-foreground" />
          <div>
            <h3 className="text-xl font-bold">No applications yet</h3>
            <p className="text-muted-foreground">You haven't applied to any jobs using Easy Apply.</p>
          </div>
          <Link href="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app.id} className="modern-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{app.job.title}</h3>
                  {app.status === "PENDING" && <Badge variant="secondary" className="bg-amber-100 text-amber-800"><Clock className="w-3 h-3 mr-1" /> Submitted</Badge>}
                  {app.status === "REVIEWING" && <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Under Review</Badge>}
                  {app.status === "SHORTLISTED" && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Shortlisted</Badge>}
                  {app.status === "REJECTED" && <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Not Selected</Badge>}
                </div>
                <p className="font-medium text-muted-foreground">{app.job.company.name}</p>
              </div>

              <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                <p>Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                <Link href={`/jobs/${app.job.slug || app.job.id}`} className="text-primary hover:underline mt-1">
                  View Job Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
