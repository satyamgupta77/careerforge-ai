import Link from "next/link";
import { Briefcase, Code, Terminal, LayoutDashboard, Database, Star } from "lucide-react";

const categories = [
  {
    name: "Frontend Developer",
    slug: "frontend",
    icon: <LayoutDashboard className="w-6 h-6 text-blue-400" />,
    description: "React, Next.js, CSS, and UI/UX patterns.",
    count: 120,
  },
  {
    name: "Backend Developer",
    slug: "backend",
    icon: <Database className="w-6 h-6 text-purple-400" />,
    description: "Node.js, Databases, API Design, and Scaling.",
    count: 150,
  },
  {
    name: "Full Stack Engineer",
    slug: "fullstack",
    icon: <Code className="w-6 h-6 text-blue-400" />,
    description: "End-to-end development, architecture, and deployment.",
    count: 200,
  },
  {
    name: "DevOps Engineer",
    slug: "devops",
    icon: <Terminal className="w-6 h-6 text-purple-400" />,
    description: "CI/CD, Cloud platforms, Docker, and Kubernetes.",
    count: 85,
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600">
            Interview Prep Hub
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Master your next technical interview. Choose your role, follow our structured roadmaps, and practice with real-world scenarios.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/interview-prep/roadmap/${cat.slug}`}>
              <div className="group relative bg-slate-900/50 backdrop-blur-md border border-purple-500/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-900/30 rounded-xl border border-purple-500/20">
                    {cat.icon}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
                    <Star className="w-3 h-3" /> {cat.count} Questions
                  </span>
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-16 text-center">
          <Link href="/interview-tips/general">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold hover:from-blue-500 hover:to-purple-600 transition-all shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1">
              <Briefcase className="w-5 h-5" /> View General Interview Tips
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
