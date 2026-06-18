import { Users, Briefcase, FileText, TrendingUp, Bell } from "lucide-react";

export default function CompanyDashboardPage() {
  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, trend: "+2 this week" },
    { label: "Total Applicants", value: "2,451", icon: Users, trend: "+15% vs last month" },
    { label: "Interviews Scheduled", value: "48", icon: FileText, trend: "8 today" },
    { label: "Offer Acceptance", value: "85%", icon: TrendingUp, trend: "+5% vs last quarter" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Welcome back! Here's what's happening with your hiring pipeline.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl duration-300">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Applications Overview</h2>
          <div className="h-64 flex items-end justify-between space-x-2 pt-4">
            {[40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 50, 70].map((height, i) => (
              <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-t-md relative group">
                <div
                  className="absolute bottom-0 w-full bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-4 px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-2xl duration-300">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Recent Activity</h2>
          <div className="space-y-6 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full flex-shrink-0">
                  <Bell className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Sarah Jenkins applied for Senior Designer</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
