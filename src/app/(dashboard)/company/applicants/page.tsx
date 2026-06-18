"use client";

import { useState, useTransition } from "react";
import { updateApplicationStatus } from "@/actions/company";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, FileText, Check, X } from "lucide-react";
import Link from "next/link";

export default function ApplicantsPage() {
  const [isPending, startTransition] = useTransition();

  // Mock data for MVP
  const mockApplicants = [
    { id: "1", name: "Alice Johnson", jobTitle: "Senior Frontend Engineer", appliedDate: "2026-06-15", status: "PENDING", resumeUrl: "#" },
    { id: "2", name: "Bob Smith", jobTitle: "Senior Frontend Engineer", appliedDate: "2026-06-14", status: "REVIEWING", resumeUrl: "#" },
    { id: "3", name: "Charlie Davis", jobTitle: "Product Designer", appliedDate: "2026-06-10", status: "REJECTED", resumeUrl: "#" },
  ];

  const [applicants] = useState(mockApplicants);

  const handleUpdateStatus = (id: string, status: "REVIEWING" | "REJECTED") => {
    startTransition(() => {
      updateApplicationStatus(id, status).then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
          <p className="text-muted-foreground mt-1">Review and manage candidates for your open roles.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Candidate</th>
              <th className="px-6 py-4 font-medium">Applied For</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{applicant.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{applicant.jobTitle}</td>
                <td className="px-6 py-4 text-muted-foreground">{applicant.appliedDate}</td>
                <td className="px-6 py-4">
                  {applicant.status === "PENDING" && <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>}
                  {applicant.status === "REVIEWING" && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Reviewing</Badge>}
                  {applicant.status === "REJECTED" && <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" render={<Link href={applicant.resumeUrl} />}>
                      <FileText className="w-4 h-4 mr-1" /> Resume
                    </Button>
                    {applicant.status === "PENDING" && (
                      <div className="flex gap-1 ml-2 border-l pl-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isPending} onClick={() => handleUpdateStatus(applicant.id, "REVIEWING")}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" disabled={isPending} onClick={() => handleUpdateStatus(applicant.id, "REJECTED")}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
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
