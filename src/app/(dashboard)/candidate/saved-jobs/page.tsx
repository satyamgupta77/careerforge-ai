import React from 'react';
import { Bookmark, MapPin, DollarSign, ExternalLink, Trash2 } from 'lucide-react';

export default function SavedJobs() {
  const jobs = [
    { id: 1, title: 'Senior React Developer', company: 'TechNova', location: 'San Francisco, CA (Remote)', salary: '$130k - $160k', tags: ['React', 'TypeScript', 'Next.js'] },
    { id: 2, title: 'Frontend Engineer', company: 'DesignShift', location: 'New York, NY', salary: '$110k - $140k', tags: ['Vue', 'CSS', 'Figma'] },
    { id: 3, title: 'Full Stack Web Developer', company: 'CloudBase', location: 'Remote', salary: '$120k - $150k', tags: ['Node.js', 'React', 'AWS'] },
    { id: 4, title: 'UI Engineer', company: 'FinTech Solutions', location: 'London, UK (Hybrid)', salary: '£80k - £100k', tags: ['React', 'Tailwind', 'Redux'] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 floating-island mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-gray-500 mt-1">Keep track of opportunities you&apos;re interested in.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative group">
              <div className="absolute top-6 right-6 flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Apply Now">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                  {job.company[0]}
                </div>
                <div className="pr-20 sm:pr-0">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{job.title}</h3>
                  <p className="text-gray-500 font-medium">{job.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600 text-sm gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm gap-2">
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {job.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
