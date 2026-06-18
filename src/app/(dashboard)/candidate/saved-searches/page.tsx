import React from 'react';
import { Search, Bell, Clock, ArrowRight, Trash2 } from 'lucide-react';

export default function SavedSearches() {
  const searches = [
    { id: 1, query: 'Senior Frontend Engineer', location: 'Remote', frequency: 'Daily', newResults: 12 },
    { id: 2, query: 'React Developer', location: 'San Francisco, CA', frequency: 'Weekly', newResults: 5 },
    { id: 3, query: 'UX Designer', location: 'New York, NY', frequency: 'Daily', newResults: 0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 floating-island hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Searches & Alerts</h1>
              <p className="text-gray-500 mt-1">Never miss a matching job opportunity.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
              <Search className="w-4 h-4" />
              New Search Alert
            </button>
          </div>

          <div className="grid gap-4">
            {searches.map((s) => (
              <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group gap-4 sm:gap-0">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{s.query}</h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-sm text-gray-500">
                      <span>{s.location}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {s.frequency} Alerts</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0 border-gray-100">
                  {s.newResults > 0 ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full whitespace-nowrap">
                      {s.newResults} new jobs
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 whitespace-nowrap">No new jobs</span>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
