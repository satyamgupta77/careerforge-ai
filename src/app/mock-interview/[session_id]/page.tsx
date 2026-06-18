import { Video, Mic, PhoneOff, MessageSquare, Sparkles, User, MonitorPlay } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ session_id: string }> }) {
  const { session_id } = await params;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <header className="px-6 py-4 border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <MonitorPlay className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold">Senior Frontend Interview</h1>
            <p className="text-xs text-slate-400">Session ID: {session_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Recording
          </div>
          <span className="text-slate-300 font-mono text-sm">24:15</span>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex-1 bg-slate-900 rounded-3xl border border-purple-500/20 relative overflow-hidden group shadow-2xl shadow-purple-900/20 min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-slate-900 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-1 shadow-[0_0_60px_-10px_rgba(147,51,234,0.5)]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-white font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Sarah (AI Interviewer)
            </div>
          </div>

          <div className="h-48 rounded-3xl bg-slate-800 border border-blue-500/20 overflow-hidden relative shadow-lg shadow-blue-900/20">
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <User className="w-16 h-16 text-slate-600" />
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 text-white text-sm font-medium">
              You
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl flex flex-col h-full lg:max-h-[calc(100vh-140px)]">
          <div className="p-5 border-b border-purple-500/20 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-medium">Live Transcript</h2>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-1">
                <Sparkles className="w-3 h-3" /> Sarah (AI)
              </div>
              <p className="text-slate-300 bg-purple-900/20 border border-purple-500/10 p-3 rounded-2xl rounded-tl-sm">
                Welcome to your Senior Frontend Engineer interview. Let's start with a design question. How would you architect a highly scalable real-time notification system in React?
              </p>
            </div>
            
            <div className="space-y-1 flex flex-col items-end">
              <div className="text-blue-400 text-sm font-medium mb-1 mr-1">
                You
              </div>
              <p className="text-slate-200 bg-blue-600/20 border border-blue-500/20 p-3 rounded-2xl rounded-tr-sm max-w-[90%]">
                I would likely start by considering the transport layer, perhaps using WebSockets or Server-Sent Events. For the state management in React, I'd use a context provider or a library like Zustand to maintain the notification queue globally...
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-1">
                <Sparkles className="w-3 h-3" /> Sarah (AI)
              </div>
              <p className="text-slate-300 bg-purple-900/20 border border-purple-500/10 p-3 rounded-2xl rounded-tl-sm">
                That's a good start. How would you handle connection dropouts and offline synchronization when the user reconnects?
              </p>
            </div>
          </div>

          <div className="p-5 border-t border-purple-500/20">
            <div className="flex items-center justify-center gap-4">
              <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <Mic className="w-6 h-6" />
              </button>
              <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <Video className="w-6 h-6" />
              </button>
              <Link href={`/mock-interview/${session_id}/report`}>
                <button className="p-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 transition-colors group">
                  <PhoneOff className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
