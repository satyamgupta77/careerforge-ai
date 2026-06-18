import Link from "next/link";
import { BrainCircuit, Briefcase, GraduationCap, Code, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-2xl mb-4">
            <BrainCircuit className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            AI Interview Setup
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Configure your AI interviewer. Select your target role, experience level, and interview type to generate a hyper-realistic simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-purple-300 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Target Role
            </h2>
            <div className="space-y-3">
              {["Frontend Engineer", "Backend Engineer", "Full Stack Developer", "Product Manager"].map(role => (
                <button key={role} className="w-full text-left px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-purple-900/30 hover:border-purple-500/50 transition-colors text-slate-300 hover:text-white">
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-blue-300 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> Experience Level
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {["Junior", "Mid-Level", "Senior", "Lead"].map(level => (
                  <button key={level} className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-blue-900/30 hover:border-blue-500/50 transition-colors text-slate-300 hover:text-white text-center">
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <h2 className="text-xl font-semibold text-purple-300 mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" /> Interview Type
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 rounded-xl bg-purple-600 border border-purple-400 text-white font-medium shadow-lg shadow-purple-500/20 text-center">
                  Technical
                </button>
                <button className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white text-center">
                  Behavioral
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/mock-interview/session-123">
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Start Interview Simulation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
