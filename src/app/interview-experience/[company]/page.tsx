import { ArrowLeft, Clock, Code, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: Promise<{ company: string }>;
};

const experienceData = {
  rounds: [
    { title: 'Online Assessment', duration: '90 mins', type: 'Coding', desc: '2 medium-hard algorithm questions focusing on DP and Graphs.' },
    { title: 'Technical Screen', duration: '60 mins', type: 'System Design', desc: 'High-level design of a scalable messaging system.' },
    { title: 'Onsite Round 1', duration: '45 mins', type: 'Coding', desc: 'Data structures and problem-solving on a whiteboard.' },
    { title: 'Behavioral / Leadership', duration: '45 mins', type: 'HR', desc: 'Deep dive into past experiences, conflicts, and leadership principles.' }
  ],
  tips: [
    'Focus heavily on time and space complexity analysis.',
    'Communicate your thought process clearly before coding.',
    'Prepare stories using the STAR method for the behavioral round.',
    'Ask clarifying questions before making assumptions in system design.'
  ]
};

export default async function Page({ params }: Props) {
  const { company } = await params;
  const companyName = company.charAt(0).toUpperCase() + company.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/interview-experience" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Experiences
        </Link>
        
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/5 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                {companyName} Interview Guide
              </h1>
              <p className="text-slate-400 text-lg">Comprehensive breakdown of the interview process</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-xl border border-purple-500/20 text-purple-400 font-medium">
              <Users className="w-5 h-5" /> Highly Competitive
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-500" /> Interview Rounds
          </h2>
          <div className="space-y-4 mb-12">
            {experienceData.rounds.map((round, idx) => (
              <div key={idx} className="relative pl-8 pb-4 border-l-2 border-purple-500/30 last:border-0 last:pb-0">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-200">{round.title}</h3>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <span className="bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full">{round.type}</span>
                      <span className="flex items-center text-slate-400"><Clock className="w-4 h-4 mr-1" /> {round.duration}</span>
                    </div>
                  </div>
                  <p className="text-slate-400">{round.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-purple-500" /> Pro Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {experienceData.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
