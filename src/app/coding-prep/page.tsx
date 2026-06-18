import { Terminal, BookOpen, Trophy, PlayCircle, Activity } from "lucide-react";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", status: "Solved" },
  { id: 2, title: "LRU Cache", difficulty: "Medium", category: "Design", status: "Attempted" },
  { id: 3, title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked Lists", status: "Unsolved" },
  { id: 4, title: "Valid Parentheses", difficulty: "Easy", category: "Stacks", status: "Solved" },
  { id: 5, title: "Course Schedule", difficulty: "Medium", category: "Graphs", status: "Unsolved" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-blue-500" /> Coding Prep
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Master algorithms and data structures for your next interview.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-md flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Trophy className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Global Rank</div>
                <div className="text-xl font-bold text-white">#4,281</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">Total Solved</h3>
              <Activity className="w-5 h-5 text-slate-500" />
            </div>
            <div className="text-4xl font-bold text-white">124<span className="text-lg text-slate-500 font-normal">/450</span></div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-400/80 font-medium">Easy</h3>
            </div>
            <div className="text-4xl font-bold text-green-400">82</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-yellow-400/80 font-medium">Medium</h3>
            </div>
            <div className="text-4xl font-bold text-yellow-400">35</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-red-400/80 font-medium">Hard</h3>
            </div>
            <div className="text-4xl font-bold text-red-400">7</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> Recommended Problems
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-sm text-slate-400 uppercase tracking-wider">
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Difficulty</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-300">
                {problems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      {prob.status === "Solved" && <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>}
                      {prob.status === "Attempted" && <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>}
                      {prob.status === "Unsolved" && <div className="w-3 h-3 rounded-full bg-slate-600"></div>}
                    </td>
                    <td className="p-4 font-medium text-white group-hover:text-blue-400 transition-colors">
                      {prob.id}. {prob.title}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        prob.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        prob.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {prob.category}
                    </td>
                    <td className="p-4 text-right">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-medium rounded-lg border border-blue-500/20 transition-colors">
                        <PlayCircle className="w-4 h-4" /> Solve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
