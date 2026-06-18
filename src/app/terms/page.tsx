import { Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-zinc-200 p-8 sm:p-12 transition-all duration-300">
        <div className="flex items-center gap-4 mb-10 border-b border-zinc-100 pb-8">
          <Scale className="w-12 h-12 text-blue-600" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950">Terms of Service</h1>
            <p className="text-zinc-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose prose-zinc prose-blue max-w-none text-zinc-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using CareerForge, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on CareerForge's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by CareerForge at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Disclaimer</h2>
            <p>
              The materials on CareerForge's website are provided on an 'as is' basis. CareerForge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Limitations</h2>
            <p>
              In no event shall CareerForge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CareerForge's website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
