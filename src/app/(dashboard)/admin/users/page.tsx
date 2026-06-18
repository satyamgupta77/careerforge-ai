"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const [isPending, startTransition] = useTransition();

  // Mock data
  const mockUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "CANDIDATE", tier: "FREE" },
    { id: "2", name: "TechFlow Admin", email: "admin@techflow.com", role: "COMPANY", tier: "PRO" },
    { id: "3", name: "System Admin", email: "super@careerhub.com", role: "ADMIN", tier: "ENTERPRISE" },
  ];

  const handleRoleChange = (id: string, role: any) => {
    startTransition(() => {
      updateUserRole(id, role).then(res => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 space-y-8 font-sans rounded-3xl border border-border/50 shadow-2xl">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Manage Users</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage user roles and view subscription status.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 dark:bg-zinc-800/80 text-slate-500 dark:text-slate-400 border-b border-border">
            <tr>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">User</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Role</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Subscription</th>
              <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-primary transition-colors">{user.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{user.email}</div>
                </td>
                <td className="px-8 py-5">
                  <Badge variant="outline" className={`px-3 py-1 font-semibold ${user.role === "ADMIN" ? "border-primary text-primary bg-primary/5" : ""}`}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={user.tier !== "FREE" ? "default" : "secondary"} className="px-3 py-1 font-semibold">
                    {user.tier}
                  </Badge>
                </td>
                <td className="px-8 py-5 text-right">
                  <select 
                    className="flex h-10 w-[160px] items-center justify-between whitespace-nowrap rounded-xl border border-input bg-transparent px-4 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ml-auto font-medium transition-all"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={isPending || user.role === "ADMIN"}
                  >
                    <option value="CANDIDATE">Candidate</option>
                    <option value="COMPANY">Company</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
