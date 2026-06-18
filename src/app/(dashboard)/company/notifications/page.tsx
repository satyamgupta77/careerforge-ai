import { Bell, CheckCircle, Calendar, MessageSquare } from "lucide-react";

export default function CompanyNotificationsPage() {
  const notifications = [
    { id: 1, title: "New Application Received", message: "Jane Doe applied for Senior Frontend Engineer.", time: "10 mins ago", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20", read: false },
    { id: 2, title: "Interview Scheduled", message: "Technical interview with Mark Smith tomorrow at 10:00 AM.", time: "1 hour ago", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", read: false },
    { id: 3, title: "Message Received", message: "Sarah sent a message regarding the Product Manager role.", time: "3 hours ago", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", read: true },
    { id: 4, title: "System Update", message: "Platform maintenance scheduled for this weekend.", time: "1 day ago", icon: Bell, color: "text-zinc-500", bg: "bg-zinc-100 dark:bg-zinc-800", read: true },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Notifications</h1>
          <p className="text-zinc-500 mt-1">Stay updated with your latest hiring activities.</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/50">
        {notifications.map((note) => (
          <div key={note.id} className={`p-5 flex items-start space-x-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30 ${note.read ? 'opacity-70' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}>
            <div className={`p-3 rounded-full ${note.bg} flex-shrink-0 mt-1`}>
              <note.icon className={`w-5 h-5 ${note.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-semibold ${note.read ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {note.title}
                </h3>
                <span className="text-xs text-zinc-500 whitespace-nowrap ml-4">{note.time}</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{note.message}</p>
            </div>
            {!note.read && (
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
