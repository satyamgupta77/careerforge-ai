import { Activity, TrendingUp } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Platform Analytics</h1>
        <p className="text-zinc-500 mt-1">Deep dive into platform usage, engagement, and conversion metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">User Engagement</h2>
            <Activity className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="h-64 flex flex-col justify-end space-y-4">
             <div className="w-full h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center px-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-blue-500 w-3/4"></div>
                <span className="relative z-10 text-xs font-medium text-blue-900 dark:text-blue-100">Daily Active Users (75%)</span>
             </div>
             <div className="w-full h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center px-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-purple-500 w-1/2"></div>
                <span className="relative z-10 text-xs font-medium text-purple-900 dark:text-purple-100">Weekly Active Users (50%)</span>
             </div>
             <div className="w-full h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded flex items-center px-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-emerald-500 w-5/6"></div>
                <span className="relative z-10 text-xs font-medium text-emerald-900 dark:text-emerald-100">Monthly Active Users (83%)</span>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Revenue Growth</h2>
            <TrendingUp className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 pt-4">
            {[20, 35, 45, 60, 75, 95, 120].map((val, i) => (
              <div key={i} className="w-full bg-emerald-100 dark:bg-emerald-900/20 rounded-t-md relative group">
                <div
                  className="absolute bottom-0 w-full bg-emerald-500 dark:bg-emerald-400 rounded-t-md transition-all duration-500 group-hover:bg-emerald-400"
                  style={{ height: `${(val / 120) * 100}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-4 px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
