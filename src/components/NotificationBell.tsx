"use client";

import { useEffect, useState } from "react";
import { getUnreadNotifications, markAsRead, markAllAsRead } from "@/actions/notifications";
import { Bell, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = () => {
    getUnreadNotifications().then(res => {
      if (res.success) setNotifications(res.data);
    });
  };

  useEffect(() => {
    fetchNotifications();
    // Real-time Polling Strategy: Fetch every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRead = async (id: string, link: string | null) => {
    await markAsRead(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (link) router.push(link);
  };

  const handleReadAll = async () => {
    await markAllAsRead();
    setNotifications([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative rounded-full" />}>
        <Bell className="w-5 h-5 text-slate-600" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden border-border rounded-xl">
        <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border">
          <DropdownMenuLabel className="p-0 font-semibold text-base">Notifications</DropdownMenuLabel>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReadAll} className="h-auto p-0 text-xs text-primary font-semibold hover:bg-transparent">
              <Check className="w-3 h-3 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        
        <div className="max-h-75 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
              You're all caught up!
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => handleRead(notif.id, notif.link)}>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-sm leading-none flex items-center justify-between">
                      {notif.title}
                      {notif.link && <ExternalLink className="w-3 h-3 text-muted-foreground" />}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
