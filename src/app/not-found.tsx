import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />

      <div className="relative z-10 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full transition-all hover:shadow-[0_0_50px_rgba(37,99,235,0.15)]">
        <Compass className="w-20 h-20 text-blue-500 mx-auto mb-8 animate-[spin_10s_linear_infinite]" />
        
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">
          Page not found
        </h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-zinc-950 px-6 py-3 text-sm font-semibold shadow-sm hover:bg-zinc-200 transition-all hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
