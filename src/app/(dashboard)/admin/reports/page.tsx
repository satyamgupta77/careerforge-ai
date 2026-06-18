import { Download, FileBarChart, PieChart } from "lucide-react";

export default function AdminReportsPage() {
  const reports = [
    { name: "Q3 Financial Summary", date: "Oct 1, 2024", size: "2.4 MB", type: "PDF" },
    { name: "User Growth Metrics", date: "Sep 28, 2024", size: "1.1 MB", type: "CSV" },
    { name: "Platform Churn Analysis", date: "Sep 15, 2024", size: "3.8 MB", type: "PDF" },
    { name: "Annual Compliance Audit", date: "Aug 30, 2024", size: "15.2 MB", type: "PDF" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Reports</h1>
          <p className="text-zinc-500 mt-1">Generated financial, user, and compliance reports.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-md">
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-4">
             <FileBarChart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Financial Reports</h3>
          <p className="text-xs text-zinc-500 mt-1">12 Available</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
             <PieChart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">User Analytics</h3>
          <p className="text-xs text-zinc-500 mt-1">24 Available</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Recent Downloads</h2>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {reports.map((report, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <FileBarChart className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{report.name}</h4>
                  <p className="text-xs text-zinc-500">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
