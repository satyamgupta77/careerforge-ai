import Link from "next/link";
import { Building2, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompaniesPage() {
  const companies = [
    { id: 1, name: "TechFlow", industry: "Software", location: "New York, NY", employees: "100-500", openJobs: 12, logo: "T" },
    { id: 2, name: "Innovate AI", industry: "Artificial Intelligence", location: "San Francisco, CA", employees: "50-200", openJobs: 8, logo: "I" },
    { id: 3, name: "GreenEnergy", industry: "Renewables", location: "Austin, TX", employees: "500-1000", openJobs: 24, logo: "G" },
    { id: 4, name: "FinTech Pro", industry: "Finance", location: "London, UK", employees: "1000+", openJobs: 45, logo: "F" },
    { id: 5, name: "HealthPlus", industry: "Healthcare", location: "Remote", employees: "200-500", openJobs: 15, logo: "H" },
    { id: 6, name: "EduSmart", industry: "Education", location: "Boston, MA", employees: "50-100", openJobs: 5, logo: "E" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Discover Top Companies
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find the perfect workplace. Browse thousands of companies actively hiring on CareerHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl shrink-0">
                  {company.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{company.name}</h3>
                  <span className="text-indigo-600 font-medium text-sm">{company.industry}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center text-slate-600 text-sm gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {company.location}
                </div>
                <div className="flex items-center text-slate-600 text-sm gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  {company.employees} Employees
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                <span className="font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full text-sm">
                  {company.openJobs} open jobs
                </span>
                <Link href={`/jobs?company=${company.name}`}>
                  <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold p-0 px-4 h-9">
                    View Jobs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
