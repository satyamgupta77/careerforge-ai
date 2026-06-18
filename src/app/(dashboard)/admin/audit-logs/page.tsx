import { ShieldAlert, Terminal, UserX, LogIn } from "lucide-react";

export default function AdminAuditLogsPage() {
  const logs = [
    { id: "AL-1001", action: "Failed Login Attempt", user: "unknown@example.com", ip: "192.168.1.45", time: "2 mins ago", type: "warning" },
    { id: "AL-1002", action: "Deleted User Account", user: "admin_sarah", ip: "10.0.0.12", time: "15 mins ago", type: "danger" },
    { id: "AL-1003", action: "API Key Generated", user: "dev_team", ip: "172.16.0.5", time: "1 hour ago", type: "info" },
    { id: "AL-1004", action: "System Update", user: "system", ip: "localhost", time: "3 hours ago", type: "info" },
    { id: "AL-1005", action: "Successful Login", user: "manager_john", ip: "192.168.1.100", time: "5 hours ago", type: "success" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Audit Logs</h1>
          <p className="text-zinc-500 mt-1">Track system activity, security events, and administrative actions.</p>
        </div>
        <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">
          Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
                <th className="px-6 py-4 font-medium">Log ID</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">User / Actor</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-zinc-500">{log.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
                    {log.type === 'danger' && <UserX className="w-4 h-4 text-red-500" />}
                    {log.type === 'warning' && <ShieldAlert className="w-4 h-4 text-yellow-500" />}
                    {log.type === 'info' && <Terminal className="w-4 h-4 text-blue-500" />}
                    {log.type === 'success' && <LogIn className="w-4 h-4 text-green-500" />}
                    <span>{log.action}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">{log.user}</td>
                  <td className="px-6 py-4 text-sm font-mono text-zinc-500">{log.ip}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
