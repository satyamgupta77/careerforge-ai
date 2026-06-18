import { Users, Target, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Sarah Jenkins', role: 'CEO & Founder', image: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Michael Chen', role: 'CTO', image: 'https://i.pravatar.cc/150?u=michael' },
    { name: 'Elena Rodriguez', role: 'Head of Design', image: 'https://i.pravatar.cc/150?u=elena' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-6xl">
            About <span className="text-blue-600">CareerForge</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-600">
            We're on a mission to empower professionals with AI-driven career insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <Target className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Our Mission</h2>
            <p className="text-zinc-600">
              To build the ultimate career advancement platform that leverages cutting-edge artificial intelligence to provide personalized guidance, resume optimization, and interview preparation.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <Zap className="h-10 w-10 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Our Vision</h2>
            <p className="text-zinc-600">
              A world where every individual has access to world-class career coaching, leveling the playing field and unlocking human potential globally.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-zinc-950 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mb-4 border-4 border-blue-50" />
                <h3 className="text-xl font-semibold text-zinc-900">{member.name}</h3>
                <p className="text-zinc-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
