import { ArrowLeft, Brain, Target, Trophy, HelpCircle } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: Promise<{ tech: string }>;
};

const mockQuestions = {
  beginner: [
    { q: 'What is the Virtual DOM?', a: 'A lightweight copy of the actual DOM used for performance optimization.' },
    { q: 'Explain JSX.', a: 'A syntax extension for JavaScript that looks similar to XML or HTML.' },
  ],
  intermediate: [
    { q: 'How does React Fiber work?', a: 'It is the new reconciliation engine introduced in React 16.' },
    { q: 'What are Higher-Order Components?', a: 'A function that takes a component and returns a new component.' },
  ],
  advanced: [
    { q: 'Explain the internal workings of hooks.', a: 'Hooks rely on call order and are stored as a linked list in the fiber node.' },
    { q: 'How to optimize context performance?', a: 'By splitting contexts or using memoization techniques like useMemo and useCallback.' },
  ]
};

export default async function Page({ params }: Props) {
  const { tech } = await params;
  const techName = tech.charAt(0).toUpperCase() + tech.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/interview-questions" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            {techName} Interview Questions
          </h1>
          <p className="text-lg text-slate-400">
            Comprehensive guide to cracking {techName} interviews, categorized by difficulty.
          </p>
        </div>

        <div className="space-y-12">
          <Section title="Beginner" icon={Target} questions={mockQuestions.beginner} />
          <Section title="Intermediate" icon={Brain} questions={mockQuestions.intermediate} />
          <Section title="Advanced" icon={Trophy} questions={mockQuestions.advanced} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, questions }: { title: string, icon: any, questions: any[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-900/50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200">{title} Level</h2>
      </div>
      
      <div className="grid gap-4">
        {questions.map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex gap-4">
              <HelpCircle className="w-6 h-6 text-purple-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.q}</h3>
                <p className="text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
