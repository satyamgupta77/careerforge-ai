"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Bookmark, 
  Bell, 
  Settings, 
  Search, 
  History, 
  MonitorPlay,
  LayoutTemplate
} from 'lucide-react';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/candidate', icon: LayoutDashboard },
    { name: 'Resume Generator', href: '/candidate/resume-generator', icon: FileText },
    { name: 'Templates', href: '/candidate/templates', icon: LayoutTemplate },
    { name: 'Saved Jobs', href: '/candidate/saved-jobs', icon: Bookmark },
    { name: 'Saved Searches', href: '/candidate/saved-searches', icon: Search },
    { name: 'Job Alerts', href: '/candidate/alerts', icon: Bell },
    { name: 'Applications', href: '/candidate/history', icon: History },
    { name: 'Settings', href: '/candidate/settings', icon: Settings },
    { name: 'Interview Prep', href: '/candidate/interviews', icon: MonitorPlay },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Candidate Space</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/candidate' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
