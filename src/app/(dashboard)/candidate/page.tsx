import React from 'react';
import Link from 'next/link';
import { Briefcase, FileText, Bookmark, Activity, MonitorPlay, Trophy, Star } from 'lucide-react';

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-xl border border-border floating-island gap-4 md:gap-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <p className="text-gray-500 mt-1">Here is what&apos;s happening with your job search today.</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Upload Resume
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Applications', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Saved Jobs', value: '24', icon: Bookmark, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Profile Views', value: '156', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Resumes', value: '3', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity & Suggested */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {[
                { company: 'Acme Corp', role: 'Senior Frontend Engineer', status: 'In Review', date: '2 days ago' },
                { company: 'Global Tech', role: 'React Developer', status: 'Interview', date: '5 days ago' },
                { company: 'Startup Inc', role: 'UI/UX Designer', status: 'Applied', date: '1 week ago' },
              ].map((app, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-gray-100 gap-4 sm:gap-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 shrink-0">
                      {app.company[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.role}</h3>
                      <p className="text-sm text-gray-500">{app.company}</p>
                    </div>
                  </div>
                  <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Interview' ? 'bg-green-100 text-green-700' :
                      app.status === 'In Review' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-gray-500 sm:mt-2">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Strength</h2>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="94" className="text-blue-600" />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-900">75%</span>
              </div>
              <p className="text-gray-500 mt-4 text-center">Complete your profile to stand out to recruiters.</p>
              <button className="mt-6 w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md">
                Complete Profile
              </button>
            </div>
          </div>
        </div>

        {/* Interview Progress Widget */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MonitorPlay className="w-6 h-6 text-purple-600" />
                Interview Preparation
              </h2>
              <p className="text-slate-500 text-sm mt-1">Your recent mock interview performance.</p>
            </div>
            <Link href="/candidate/interviews" className="px-4 py-2 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100 transition-colors border border-purple-200 text-sm">
              View All History
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Avg Score</p>
                <p className="text-xl font-bold text-slate-900">85%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Completed</p>
                <p className="text-xl font-bold text-slate-900">12 Sessions</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <MonitorPlay className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Top Skill</p>
                <p className="text-xl font-bold text-slate-900">React.js</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
