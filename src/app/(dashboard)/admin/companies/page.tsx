"use client";

import { useTransition } from "react";
import { updateCompanyVerificationStatus } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ShieldAlert } from "lucide-react";

export default function AdminCompaniesPage() {
  const [isPending, startTransition] = useTransition();

  // Mock data representing the new schema
  const mockCompanies = [
    { id: "1", name: "TechFlow", email: "hr@techflow.com", website: "techflow.com", status: "VERIFIED" },
    { id: "2", name: "Innovate AI", email: "hello@innovate.ai", website: "innovate.ai", status: "PENDING" },
    { id: "3", name: "Acme Corp", email: "admin@acme.com", website: "acme.com", status: "REJECTED" },
  ];

  const handleUpdateStatus = (id: string, newStatus: any) => {
    startTransition(() => {
      updateCompanyVerificationStatus(id, newStatus).then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 space-y-8 font-sans rounded-3xl border border-border/50 shadow-2xl">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Manage Companies</h1>
        <p className="text-muted-foreground mt-2 text-lg">Review verification documents and approve employers.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 dark:bg-zinc-800/80 text-slate-500 dark:text-slate-400 border-b border-border">
            <tr>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Company Details</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Links</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Status</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-primary transition-colors">{company.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{company.email}</div>
                </td>
                <td className="px-8 py-5">
                  <a href={`https://${company.website}`} target="_blank" className="text-primary hover:underline font-medium">{company.website}</a>
                </td>
                <td className="px-8 py-5">
                  {company.status === "VERIFIED" && <Badge className="bg-emerald-100/80 text-emerald-800 border-emerald-200 px-3 py-1 font-semibold"><CheckCircle2 className="w-4 h-4 mr-1.5" /> Verified</Badge>}
                  {company.status === "PENDING" && <Badge variant="secondary" className="bg-amber-100/80 text-amber-800 border-amber-200 px-3 py-1 font-semibold"><ShieldAlert className="w-4 h-4 mr-1.5" /> Pending Review</Badge>}
                  {company.status === "REJECTED" && <Badge variant="destructive" className="px-3 py-1 font-semibold shadow-sm"><XCircle className="w-4 h-4 mr-1.5" /> Rejected</Badge>}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-3">
                    {company.status !== "VERIFIED" && (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-semibold px-4" onClick={() => handleUpdateStatus(company.id, "VERIFIED")} disabled={isPending}>
                        Approve
                      </Button>
                    )}
                    {company.status !== "REJECTED" && (
                      <Button variant="destructive" size="sm" className="rounded-lg shadow-sm hover:shadow-md transition-all font-semibold px-4" onClick={() => handleUpdateStatus(company.id, "REJECTED")} disabled={isPending}>
                        Reject
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
  );
}
