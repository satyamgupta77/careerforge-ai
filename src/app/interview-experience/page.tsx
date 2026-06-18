import Link from 'next/link';
import { Building2, Briefcase, Users, Star, ArrowRight } from 'lucide-react';

const companies = [
  { name: 'Google', slug: 'google', role: 'Software Engineer', rating: 4.8, interviews: 150 },
  { name: 'Amazon', slug: 'amazon', role: 'SDE II', rating: 4.2, interviews: 320 },
  { name: 'Microsoft', slug: 'microsoft', role: 'Senior SDE', rating: 4.5, interviews: 210 },
  { name: 'TCS', slug: 'tcs', role: 'System Engineer', rating: 3.9, interviews: 540 },
  { name: 'Meta', slug: 'meta', role: 'Frontend Engineer', rating: 4.6, interviews: 180 },
  { name: 'Apple', slug: 'apple', role: 'Software Engineer', rating: 4.7, interviews: 130 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            Company Interview Experiences
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Read real interview experiences, round details, and tips from candidates who cracked top companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Link key={company.slug} href={`/interview-experience/${company.slug}`}>
              <div className="group bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center border border-purple-500/30">
                      <Building2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">{company.name}</h3>
                      <div className="flex items-center text-sm text-slate-400 mt-1">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {company.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-800/80 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-medium text-slate-200">{company.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <div className="flex items-center text-sm text-slate-400">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    {company.interviews} Experiences
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
