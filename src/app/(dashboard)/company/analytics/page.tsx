import { BarChart, Users, Target, Clock } from "lucide-react";

export default function CompanyAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Hiring Analytics</h1>
        <p className="text-zinc-500 mt-1">Measure the effectiveness of your recruitment pipeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl duration-300 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Conversion Funnel</h2>
            <BarChart className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="space-y-4">
            {[
              { label: "Job Views", value: "10,245", percent: 100, color: "bg-blue-500" },
              { label: "Applications Started", value: "3,401", percent: 33, color: "bg-indigo-500" },
              { label: "Applications Completed", value: "2,150", percent: 21, color: "bg-purple-500" },
              { label: "Interviews", value: "340", percent: 3, color: "bg-pink-500" },
              { label: "Offers Made", value: "45", percent: 0.4, color: "bg-emerald-500" },
            ].map((step, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{step.label}</span>
                  <span className="text-zinc-500">{step.value}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3">
                  <div className={`h-3 rounded-full ${step.color}`} style={{ width: `${Math.max(step.percent, 2)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-full mb-3">
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">18 Days</h3>
            <p className="text-sm text-zinc-500 mt-1">Average Time to Hire</p>
            <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full mt-3">-2 days vs last month</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-3">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">$4,200</h3>
            <p className="text-sm text-zinc-500 mt-1">Cost per Hire</p>
            <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full mt-3">-5% vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
