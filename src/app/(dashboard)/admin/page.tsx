"use client";

import { useEffect, useState } from "react";
import { getAdminAnalytics } from "@/actions/admin";
import { Users, Building2, Briefcase, DollarSign, TrendingUp, Activity, FileText, CheckCircle, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAdminAnalytics().then(res => {
      if (res.success) setStats(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 space-y-8 pb-12 font-sans rounded-3xl border border-border/50 shadow-2xl">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Platform Analytics</h1>
        <p className="text-muted-foreground mt-2 text-lg">Overview of CareerHub's performance and health.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Total Users</div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl"><Users className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.totalUsers || 0}</h2>
            <p className="text-sm text-emerald-600 flex items-center mt-2 font-medium"><TrendingUp className="w-4 h-4 mr-1" /> Growing rapidly</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Active Users (30d)</div>
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Activity className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.activeUsers || 0}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Active Jobs</div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Briefcase className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.activeJobs || 0}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Applications Submitted</div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><FileText className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.applicationsSubmitted || 0}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Resume Downloads</div>
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><Download className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.resumeDownloads || 0}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 dark:text-slate-400 font-medium">ATS Checks</div>
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
          </div>
          <div className="mt-6">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">{stats?.atsChecks || 0}</h2>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 space-y-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Revenue Growth (MRR)</h3>
          <div className="h-[350px] w-full">
            {stats?.chartData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{ stroke: '#94a3b8', strokeWidth: 1 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} dot={{ r: 5, strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-medium">Loading premium chart...</div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 space-y-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User Acquisition</h3>
          <div className="h-[350px] w-full">
            {stats?.chartData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="users" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-medium">Loading premium chart...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
