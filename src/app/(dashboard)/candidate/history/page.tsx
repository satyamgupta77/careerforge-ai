import React from 'react';
import { Clock, FileText, Download, Eye, MoreVertical } from 'lucide-react';

export default function ResumeHistory() {
  const versions = [
    { id: 1, name: 'Frontend_Dev_Resume_v3.pdf', date: 'Today, 2:30 PM', size: '2.4 MB', active: true },
    { id: 2, name: 'Frontend_Dev_Resume_v2.pdf', date: 'Oct 15, 2023', size: '2.1 MB', active: false },
    { id: 3, name: 'Software_Engineer_Resume.pdf', date: 'Sep 02, 2023', size: '1.8 MB', active: false },
    { id: 4, name: 'Old_Resume_2022.pdf', date: 'Jan 10, 2023', size: '1.5 MB', active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 floating-island hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Resume History</h1>
              <p className="text-gray-500 mt-1">Manage and track your different resume versions.</p>
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Upload New Version
            </button>
          </div>

          <div className="space-y-4">
            {versions.map((v) => (
              <div key={v.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${v.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">{v.name}</h3>
                      {v.active && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full shrink-0">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {v.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{v.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
