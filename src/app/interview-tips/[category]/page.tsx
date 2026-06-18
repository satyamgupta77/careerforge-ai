import { ArrowLeft, Lightbulb, Target, MessageSquare, Zap, BookOpen } from "lucide-react";
import Link from "next/link";

const mockTips = [
  {
    icon: <Target className="w-6 h-6 text-blue-400" />,
    title: "The STAR Method",
    content: "Structure your behavioral answers using Situation, Task, Action, and Result. Always emphasize the 'Action' and 'Result' phases.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Think Out Loud",
    content: "During technical assessments, communication is as important as the solution. Walk the interviewer through your thought process.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Optimize Later",
    content: "Start with a brute-force working solution if you are stuck. Once it works, discuss bottlenecks and optimize space/time complexity.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    title: "Know Your Resume",
    content: "Be prepared to discuss any technology or project listed on your resume in depth. If you used it, you should understand its trade-offs.",
  },
];

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category === 'general' 
    ? 'General Interview' 
    : resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-900/40 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <Lightbulb className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500">
            {categoryName} Tips & Strategies
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Essential advice to help you communicate effectively, solve problems efficiently, and leave a lasting impression.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTips.map((tip, index) => (
            <div 
              key={index} 
              className="group bg-slate-900/50 backdrop-blur-md border border-purple-500/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-900/30 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {tip.title}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link href="/interview-prep" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-900/20 hover:text-blue-400 transition-all hover:-translate-y-1">
            <ArrowLeft className="w-5 h-5" /> Back to Interview Prep Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
