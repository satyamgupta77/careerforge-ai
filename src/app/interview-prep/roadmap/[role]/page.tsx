import { ArrowLeft, CheckCircle2, Circle, Clock, Code2, BrainCircuit } from "lucide-react";
import Link from "next/link";

interface RoadmapWeek {
  week: number;
  title: string;
  focus: string;
  topics: string[];
  completed: boolean;
}

const mockRoadmap: RoadmapWeek[] = [
  {
    week: 1,
    title: "Foundations & Core Principles",
    focus: "Language semantics, memory model, and core APIs.",
    topics: ["Closures & Scope", "Event Loop", "Promises & Async/Await", "Type Systems"],
    completed: true,
  },
  {
    week: 2,
    title: "Component Architecture",
    focus: "Building robust, scalable, and reusable UI components.",
    topics: ["State Management", "Lifecycle & Effects", "Custom Hooks", "Performance Optimization"],
    completed: false,
  },
  {
    week: 3,
    title: "System Design & Architecture",
    focus: "High-level design, routing, and state architecture.",
    topics: ["Client vs Server Rendering", "Data Fetching Strategies", "Micro-frontends", "Authentication"],
    completed: false,
  },
  {
    week: 4,
    title: "Testing & Deployment",
    focus: "Ensuring reliability and delivering to production.",
    topics: ["Unit & Integration Testing", "E2E Testing", "CI/CD Pipelines", "Monitoring & Error Tracking"],
    completed: false,
  },
];

export default async function Page({ params }: { params: Promise<{ role: string }> }) {
  const resolvedParams = await params;
  const roleName = resolvedParams.role.charAt(0).toUpperCase() + resolvedParams.role.slice(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6">
          <Link href="/interview-prep" className="inline-flex items-center gap-2 text-purple-400 hover:text-blue-400 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {roleName} Developer Roadmap
            </h1>
            <p className="text-lg text-slate-400 mt-4">
              A comprehensive 4-week preparation plan tailored for {roleName} engineering roles.
            </p>
          </div>
        </header>

        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[1.35rem] before:w-px before:bg-gradient-to-b before:from-purple-500/50 before:to-transparent ml-2 md:ml-0">
          {mockRoadmap.map((week) => (
            <div key={week.week} className="relative pl-12">
              <div className="absolute left-0 top-1.5 bg-slate-950 p-1">
                {week.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                ) : (
                  <Circle className="w-8 h-8 text-purple-500/50" />
                )}
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 group">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                    Week {week.week}: {week.title}
                  </h2>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/20">
                    <Clock className="w-3.5 h-3.5" /> Est. 15-20 hrs
                  </span>
                </div>
                
                <p className="text-slate-400 mb-6">
                  {week.focus}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {week.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                      <div className="p-1.5 bg-purple-900/30 rounded-lg text-purple-400">
                        {idx % 2 === 0 ? <Code2 className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium text-slate-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
