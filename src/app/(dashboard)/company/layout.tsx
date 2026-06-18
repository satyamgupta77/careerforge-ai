"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building, Briefcase, PlusCircle, Users } from "lucide-react";

const navItems = [
  { name: "Company Profile", href: "/company/settings", icon: Building },
  { name: "Manage Jobs", href: "/company/jobs", icon: Briefcase },
  { name: "Post a Job", href: "/company/jobs/new", icon: PlusCircle },
  { name: "Applicants", href: "/company/applicants", icon: Users }, // Note: We might route this to a unified applicants view or keep it job specific
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight">Employer Hub</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage your hiring pipeline</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
