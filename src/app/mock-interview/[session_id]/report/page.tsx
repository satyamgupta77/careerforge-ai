import { Award, Target, Zap, MessageCircle, BarChart3, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ session_id: string }> }) {
  const { session_id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link href="/mock-interview" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Interview Scorecard
            </h1>
            <p className="text-slate-400 mt-2">Session: {session_id} • Senior Frontend Engineer</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-purple-500/20 backdrop-blur-md">
            <div className="text-right">
              <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Overall Score</div>
              <div className="text-3xl font-bold text-white">85<span className="text-slate-500 text-xl">/100</span></div>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" /> Performance Metrics
              </h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2"><Target className="w-4 h-4 text-blue-400"/> Technical</span>
                    <span className="font-semibold text-white">90%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-purple-400"/> Communication</span>
                    <span className="font-semibold text-white">82%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400"/> Confidence</span>
                    <span className="font-semibold text-white">78%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-2">AI Recommendation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Strong technical foundation! Focus on structuring your answers more clearly using the STAR method to improve communication and confidence scores.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Detailed Feedback</h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-medium text-white">System Design Architecture</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        Excellent explanation of the WebSocket implementation for real-time notifications. You clearly identified the trade-offs between SSE and WebSockets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-800"></div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-medium text-white">React State Management</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        Good mention of Zustand for global state. Your reasoning for avoiding Context API for high-frequency updates was spot on.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-800"></div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg font-medium text-white">Offline Synchronization</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        While you mentioned reconnect logic, you missed discussing IndexedDB or local storage caching strategies for preserving notifications during complete offline states. Review service worker caching strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
