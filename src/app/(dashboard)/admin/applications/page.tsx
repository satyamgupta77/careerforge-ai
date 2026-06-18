import { Search, Filter, MoreVertical } from "lucide-react";

export default function AdminApplicationsPage() {
  const applications = [
    { id: "APP-001", company: "TechCorp", role: "Senior Engineer", candidate: "Alice Wang", status: "In Review", date: "Oct 24, 2024" },
    { id: "APP-002", company: "DesignStudio", role: "UX Researcher", candidate: "Bob Smith", status: "Rejected", date: "Oct 23, 2024" },
    { id: "APP-003", company: "DataCo", role: "Data Scientist", candidate: "Charlie Davis", status: "Hired", date: "Oct 20, 2024" },
    { id: "APP-004", company: "TechCorp", role: "Product Manager", candidate: "Diana Prince", status: "Screening", date: "Oct 19, 2024" },
    { id: "APP-005", company: "StartupInc", role: "Frontend Dev", candidate: "Evan Wright", status: "In Review", date: "Oct 18, 2024" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">All Applications</h1>
          <p className="text-zinc-500 mt-1">Platform-wide view of job applications and their statuses.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center space-x-2 text-sm font-medium">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-4">
        <Search className="w-5 h-5 text-zinc-400 ml-2" />
        <input 
          type="text" 
          placeholder="Search by candidate, company, or role..." 
          className="flex-1 bg-transparent border-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
        />
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
                <th className="px-6 py-4 font-medium">App ID</th>
                <th className="px-6 py-4 font-medium">Candidate</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-zinc-500">{app.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{app.candidate}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">{app.role}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">{app.company}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                      ${app.status === 'Hired' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-sm text-zinc-500">
          <span>Showing 1 to 5 of 245 entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
