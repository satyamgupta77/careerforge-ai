import Link from 'next/link';
import { Code2, Database, Monitor, Server, Smartphone, Cloud, ChevronRight } from 'lucide-react';

const technologies = [
  { name: 'React', slug: 'react', icon: Monitor, description: 'Frontend library for building UIs', count: 120 },
  { name: 'Next.js', slug: 'nextjs', icon: Code2, description: 'React framework for production', count: 85 },
  { name: 'Node.js', slug: 'nodejs', icon: Server, description: 'JavaScript runtime built on V8', count: 150 },
  { name: 'MongoDB', slug: 'mongodb', icon: Database, description: 'NoSQL document database', count: 65 },
  { name: 'AWS', slug: 'aws', icon: Cloud, description: 'Cloud computing services', count: 200 },
  { name: 'React Native', slug: 'react-native', icon: Smartphone, description: 'Framework for mobile apps', count: 90 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            Interview Questions Library
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Master your next tech interview with our curated collection of questions across various technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <Link key={tech.slug} href={`/interview-questions/${tech.slug}`}>
              <div className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-900/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-900/50 rounded-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                      <tech.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100">{tech.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">{tech.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="relative z-10 mt-6 flex items-center justify-between text-sm">
                  <span className="text-purple-400 font-medium">{tech.count} Questions</span>
                  <span className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Practice now &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
