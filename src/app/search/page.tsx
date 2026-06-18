"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { globalSearch } from "@/actions/search";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase, Building2, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";

function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<{jobs: any[], companies: any[], blogs: any[]}>({ jobs: [], companies: [], blogs: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = (searchQuery: string, searchType: string, searchPage: number) => {
    setIsLoading(true);
    startTransition(() => {
      globalSearch(searchQuery, searchType, searchPage).then(res => {
        if (res.success && res.data) {
          setResults(res.data);
        }
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchResults(initialQuery, initialType, initialPage);
  }, [initialQuery, initialType, initialPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}&page=1`);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    router.push(`/search?q=${encodeURIComponent(query)}&type=${newType}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}&page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Search Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Global Search</h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-muted-foreground" />
            <Input 
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg rounded-full shadow-lg border-transparent focus-visible:ring-primary"
              placeholder="Search for jobs, companies, career advice..." 
            />
            <Button type="submit" className="absolute right-2 rounded-full px-6 h-10">Search</Button>
          </form>
        </div>

        {/* Filters / Tabs */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-slate-200 pb-4">
          <Button variant={type === "all" ? "default" : "outline"} onClick={() => handleTypeChange("all")} className="rounded-full">All Results</Button>
          <Button variant={type === "jobs" ? "default" : "outline"} onClick={() => handleTypeChange("jobs")} className="rounded-full"><Briefcase className="w-4 h-4 mr-2"/> Jobs</Button>
          <Button variant={type === "companies" ? "default" : "outline"} onClick={() => handleTypeChange("companies")} className="rounded-full"><Building2 className="w-4 h-4 mr-2"/> Companies</Button>
          <Button variant={type === "blogs" ? "default" : "outline"} onClick={() => handleTypeChange("blogs")} className="rounded-full"><BookOpen className="w-4 h-4 mr-2"/> Guides & Blogs</Button>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="py-20 text-center animate-pulse text-muted-foreground">Searching entire platform...</div>
        ) : (
          <div className="space-y-12">
            
            {/* Jobs Section */}
            {(type === "all" || type === "jobs") && results.jobs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center"><Briefcase className="w-6 h-6 mr-2 text-primary"/> Jobs Found</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.jobs.map(job => (
                    <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
                      <div className="modern-card p-6 hover:border-primary transition-colors h-full">
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center"><MapPin className="w-4 h-4 mr-1"/> {job.location} • {job.company?.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Companies Section */}
            {(type === "all" || type === "companies") && results.companies.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center"><Building2 className="w-6 h-6 mr-2 text-primary"/> Companies Found</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {results.companies.map(company => (
                    <div key={company.id} className="modern-card p-6 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-xl text-slate-400">
                        {company.name.charAt(0)}
                      </div>
                      <h3 className="font-bold">{company.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{company.description || "Verified Employer"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blogs Section */}
            {(type === "all" || type === "blogs") && results.blogs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center"><BookOpen className="w-6 h-6 mr-2 text-primary"/> Guides & Advice</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.blogs.map(blog => (
                    <Link key={blog.id} href={`/blog/${blog.slug}`} className="block">
                      <div className="modern-card p-6 hover:border-primary transition-colors h-full">
                        <Badge className="mb-2 bg-primary/10 text-primary border-0">{blog.category.replace('_', ' ')}</Badge>
                        <h3 className="font-bold text-lg">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{blog.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.jobs.length === 0 && results.companies.length === 0 && results.blogs.length === 0 && (
              <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                No results found for "{query}". Try a different keyword.
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-4 pt-8">
              <Button variant="outline" onClick={() => handlePageChange(page - 1)} disabled={page === 1 || isPending}>Previous</Button>
              <div className="flex items-center text-sm font-semibold">Page {page}</div>
              <Button variant="outline" onClick={() => handlePageChange(page + 1)} disabled={isPending}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GlobalSearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center animate-pulse">Loading search...</div>}>
      <GlobalSearch />
    </Suspense>
  );
}
