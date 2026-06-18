"use client";

import { useEffect, useState, useTransition } from "react";
import { getUserAlerts, addJobAlert, removeJobAlert, updateTelegramChatId } from "@/actions/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, BellRing, Send } from "lucide-react";

export default function AlertsPage() {
  const [isPending, startTransition] = useTransition();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [telegramId, setTelegramId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [newKeyword, setNewKeyword] = useState("");
  const [useEmail, setUseEmail] = useState(true);
  const [useTelegram, setUseTelegram] = useState(false);

  useEffect(() => {
    getUserAlerts().then(res => {
      if (res.success) {
        setAlerts(res.alerts || []);
        setTelegramId(res.telegramChatId || "");
      }
      setIsLoading(false);
    });
  }, []);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword) return;
    startTransition(() => {
      addJobAlert(newKeyword, useEmail, useTelegram).then(res => {
        if (res.success) {
          setNewKeyword("");
          getUserAlerts().then(r => setAlerts(r.alerts || []));
        }
      });
    });
  };

  const handleRemove = (id: string) => {
    startTransition(() => {
      removeJobAlert(id).then(() => {
        setAlerts(alerts.filter(a => a.id !== id));
      });
    });
  };

  const handleUpdateTelegram = () => {
    startTransition(() => {
      updateTelegramChatId(telegramId).then(res => {
        if (res.success) alert(res.message);
      });
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Targeted Job Alerts</h1>
        <p className="text-muted-foreground mt-1">Get instantly notified when your dream job is posted.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Alerts List */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleAddAlert} className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 flex flex-col md:flex-row gap-4 items-end transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex-1 space-y-2 w-full">
              <Label>Keyword / Category</Label>
              <Input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="e.g. React, Remote, Intern" required />
            </div>
            <div className="flex items-center gap-4 pb-2">
              <div className="flex items-center space-x-2">
                <Switch checked={useEmail} onCheckedChange={setUseEmail} id="email-tg" />
                <Label htmlFor="email-tg">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={useTelegram} onCheckedChange={setUseTelegram} id="tele-tg" />
                <Label htmlFor="tele-tg">Telegram</Label>
              </div>
            </div>
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">Add Alert</Button>
          </form>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2"><BellRing className="w-5 h-5 text-primary" /> Active Subscriptions</h2>
            {alerts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No active alerts. Add one above.</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="p-4 border border-border rounded-lg bg-card flex justify-between items-center">
                  <div>
                    <div className="font-bold">{alert.keyword}</div>
                    <div className="flex gap-2 mt-2">
                      {alert.notifyEmail && <Badge variant="secondary">Email</Badge>}
                      {alert.notifyTelegram && <Badge className="bg-[#0088cc] text-white">Telegram</Badge>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(alert.id)} disabled={isPending}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Telegram Config */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 space-y-4 bg-gradient-to-b from-[#0088cc]/10 to-transparent border-[#0088cc]/20 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex items-center gap-2 font-bold text-[#0088cc]">
              <Send className="w-5 h-5" /> Telegram Setup
            </div>
            <p className="text-sm text-muted-foreground">
              To receive instant DMs, message our bot to get your Chat ID, then paste it here.
            </p>
            <div className="space-y-2">
              <Label>Your Telegram Chat ID</Label>
              <Input value={telegramId} onChange={e => setTelegramId(e.target.value)} placeholder="e.g. 123456789" />
            </div>
            <Button onClick={handleUpdateTelegram} disabled={isPending} className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white">
              Save Chat ID
            </Button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
