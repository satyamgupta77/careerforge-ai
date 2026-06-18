import React from 'react';
import { MonitorPlay, Trophy, Star, History, PlayCircle, BarChart3, Bookmark } from 'lucide-react';

export default function Page() {
  const pastInterviews = [
    { id: 1, role: 'Senior Frontend Engineer', company: 'TechCorp', score: 92, date: 'Oct 24, 2024', duration: '45 mins' },
    { id: 2, role: 'React Developer', company: 'StartupInc', score: 85, date: 'Oct 20, 2024', duration: '30 mins' },
    { id: 3, role: 'UI/UX Engineer', company: 'DesignHub', score: 78, date: 'Oct 15, 2024', duration: '40 mins' },
  ];

  const savedQuestions = [
    { id: 1, question: 'Explain the difference between useMemo and useCallback.', category: 'React', difficulty: 'Medium' },
    { id: 2, question: 'How do you optimize Web Vitals in a Next.js app?', category: 'Performance', difficulty: 'Hard' },
    { id: 3, question: 'Describe a time you resolved a complex state management issue.', category: 'Behavioral', difficulty: 'Medium' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-purple-900 to-indigo-900 p-8 rounded-2xl shadow-xl border border-purple-500/20 text-white gap-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MonitorPlay className="w-8 h-8 text-blue-400" />
              Interview Ecosystem
            </h1>
            <p className="text-purple-200 mt-2 max-w-xl">
              Master your interview skills with AI-driven mock interviews, track your progress, and review your highest-scoring sessions.
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Start Mock Interview
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Average Score</p>
                <p className="text-2xl font-bold text-slate-900">85%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <History className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Completed Sessions</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-indigo-100 rounded-xl">
                <Bookmark className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Saved Questions</p>
                <p className="text-2xl font-bold text-slate-900">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Past Interviews */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              Recent Interviews
            </h2>
            <div className="space-y-4">
              {pastInterviews.map((interview) => (
                <div key={interview.id} className="bg-white p-6 rounded-2xl border border-purple-500/20 shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{interview.role}</h3>
                    <p className="text-sm text-slate-500">{interview.company} • {interview.date}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                        {interview.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end sm:flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-1 text-2xl font-black text-blue-600">
                      {interview.score}<span className="text-sm text-blue-400">%</span>
                    </div>
                    <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-blue-600" />
              Saved Questions
            </h2>
            <div className="space-y-4">
              {savedQuestions.map((q) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl border border-purple-500/20 shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  <p className="font-medium text-slate-800">{q.question}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                        {q.category}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        q.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-100' : 
                        q.difficulty === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                        'bg-green-50 text-green-700 border-green-100'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                      <Bookmark className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
