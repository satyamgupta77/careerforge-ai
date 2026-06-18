import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import JobFilters from "@/components/jobs/JobFilters";
import { JobCard } from "@/components/jobs/JobCard";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Helper to generate quick filter links
function CategoryChip({ label, paramKey, paramValue }: { label: string, paramKey: string, paramValue: string }) {
  return (
    <Link href={`/jobs?${paramKey}=${paramValue}`}>
      <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
        {label}
      </Badge>
    </Link>
  );
}

export default async function JobsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // Parse search params for database filtering
  const { location, type, experience, remote } = searchParams;

  // Since we don't have real data seeded yet, we will mock some data that respects the filters loosely
  // In a real app, we'd use prisma.job.findMany({ where: { ... } })
  
  const mockJobs = [
    { id: "1", title: "Frontend Developer", companyName: "TechFlow", location: "New York, NY", salary: "$100k - $130k", experience: "Mid-Level", skills: ["React", "Next.js", "TypeScript"], isRemote: false },
    { id: "2", title: "Senior Backend Engineer", companyName: "Innovate AI", location: "Remote", salary: "$140k - $180k", experience: "Senior", skills: ["Node.js", "PostgreSQL", "AWS"], isRemote: true },
    { id: "3", title: "Junior UI Designer", companyName: "Starlight", location: "San Francisco, CA", salary: "$70k - $90k", experience: "Fresher", skills: ["Figma", "UI/UX", "CSS"], isRemote: false },
    { id: "4", title: "Full Stack Developer", companyName: "Acme Corp", location: "Remote", salary: "$120k - $150k", experience: "Mid-Level", skills: ["React", "Python", "Docker"], isRemote: true },
  ];

  // Apply filters to mock data
  const filteredJobs = mockJobs.filter(job => {
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (experience && job.experience !== experience) return false;
    if (remote === "true" && !job.isRemote) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">Find your next role</h1>
        {/* Category Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <CategoryChip label="Fresher Jobs" paramKey="experience" paramValue="Fresher" />
          <CategoryChip label="Experienced Jobs" paramKey="experience" paramValue="Senior" />
          <CategoryChip label="Internships" paramKey="type" paramValue="Internship" />
          <CategoryChip label="Remote Jobs" paramKey="remote" paramValue="true" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">Filters</h2>
              <Link href="/jobs" className="text-sm text-primary hover:text-primary/80 transition-colors">Clear all</Link>
            </div>
            <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-md" />}>
              <JobFilters />
            </Suspense>
          </div>
        </aside>

        {/* Job Listings */}
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">{filteredJobs.length} jobs found</p>
          </div>
          
          {filteredJobs.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-12 text-center text-muted-foreground transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              No jobs found matching your criteria. Try adjusting your filters.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </main>
      </div>
    </div>
    </div>
  );
}
