"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, XCircle, Users } from "lucide-react";
import { closeJob } from "@/actions/company";
import { useTransition } from "react";

export default function ManageJobsPage() {
  const [isPending, startTransition] = useTransition();

  // Mocking the jobs data for MVP display. In production, this would be fetched via a Server Component.
  const mockJobs = [
    { id: "1", title: "Senior Frontend Engineer", location: "Remote", applicantsCount: 12, status: "OPEN" },
    { id: "2", title: "Product Designer", location: "New York, NY", applicantsCount: 4, status: "OPEN" },
    { id: "3", title: "Backend Developer", location: "San Francisco, CA", applicantsCount: 45, status: "CLOSED" },
  ];

  const handleClose = (id: string) => {
    if (confirm("Are you sure you want to close this job?")) {
      startTransition(() => {
        closeJob(id).then((res) => {
          if (res.error) alert(res.error);
          else alert(res.message);
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
          <p className="text-muted-foreground mt-1">View and manage your active job postings.</p>
        </div>
        <Link href="/company/jobs/new">
          <Button className="shadow-lg shadow-primary/20">Post New Job</Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Job Title</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Applicants</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockJobs.map((job) => (
              <tr key={job.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">{job.title}</div>
                  <div className="text-muted-foreground mt-0.5">{job.location}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={job.status === "OPEN" ? "default" : "secondary"} className={job.status === "OPEN" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}>
                    {job.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{job.applicantsCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    {job.status === "OPEN" && (
                      <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleClose(job.id)} disabled={isPending}>
                        <XCircle className="w-4 h-4 mr-2" /> Close
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
