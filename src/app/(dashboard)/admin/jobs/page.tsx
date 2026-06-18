"use client";

import { useTransition } from "react";
import { approveJob, removeJob } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

export default function AdminJobsPage() {
  const [isPending, startTransition] = useTransition();

  // Mock data
  const mockJobs = [
    { id: "1", title: "Senior React Developer", company: "TechFlow", isApproved: true, isSpam: false },
    { id: "2", title: "Crypto Trader Needed ASAP!!!", company: "Unknown LLC", isApproved: false, isSpam: true },
    { id: "3", title: "Marketing Intern", company: "Acme Corp", isApproved: false, isSpam: false },
  ];

  const handleApprove = (id: string) => {
    startTransition(() => {
      approveJob(id).then(res => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  const handleRemove = (id: string) => {
    if (confirm("Are you sure you want to hard remove this job?")) {
      startTransition(() => {
        removeJob(id).then(res => {
          if (res.error) alert(res.error);
          else alert(res.message);
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 space-y-8 font-sans rounded-3xl border border-border/50 shadow-2xl">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Job Moderation</h1>
        <p className="text-muted-foreground mt-2 text-lg">Approve legitimate jobs and remove spam postings.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 dark:bg-zinc-800/80 text-slate-500 dark:text-slate-400 border-b border-border">
            <tr>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Job Title</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Company</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Status</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockJobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group">
                <td className="px-8 py-5 font-bold text-slate-900 dark:text-white text-base group-hover:text-primary transition-colors">{job.title}</td>
                <td className="px-8 py-5 text-slate-500 dark:text-slate-400 font-medium">{job.company}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    {job.isApproved ? (
                      <Badge variant="secondary" className="bg-emerald-100/80 text-emerald-800 border-emerald-200 px-3 py-1 font-semibold">Live</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-100/80 text-amber-800 border-amber-200 px-3 py-1 font-semibold">Pending Approval</Badge>
                    )}
                    {job.isSpam && <Badge variant="secondary" className="bg-red-100/80 text-red-800 border-red-200 px-3 py-1 font-semibold"><AlertTriangle className="w-3.5 h-3.5 mr-1.5"/> Flagged</Badge>}
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-3">
                    {!job.isApproved && (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-semibold px-4" onClick={() => handleApprove(job.id)} disabled={isPending}>
                        <CheckCircle className="w-4 h-4 mr-2"/> Approve
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" className="rounded-lg shadow-sm hover:shadow-md transition-all font-semibold px-4" onClick={() => handleRemove(job.id)} disabled={isPending}>
                      <Trash2 className="w-4 h-4 mr-2"/> Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
