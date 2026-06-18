"use client";

import { useEffect, useState, useTransition } from "react";
import { getPlatformSettings, updatePlatformSettings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    telegramBotToken: "",
    telegramChannelId: "",
    isTelegramEnabled: false,
    whatsappPhoneNumberId: "",
    whatsappAccessToken: "",
    whatsappGroupId: "",
    isWhatsappEnabled: false,
  });

  useEffect(() => {
    getPlatformSettings().then((res) => {
      if (res) {
        setFormData({
          telegramBotToken: res.telegramBotToken || "",
          telegramChannelId: res.telegramChannelId || "",
          isTelegramEnabled: res.isTelegramEnabled || false,
          whatsappPhoneNumberId: res.whatsappPhoneNumberId || "",
          whatsappAccessToken: res.whatsappAccessToken || "",
          whatsappGroupId: res.whatsappGroupId || "",
          isWhatsappEnabled: res.isWhatsappEnabled || false,
        });
      }
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      updatePlatformSettings(formData).then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 md:p-10 space-y-8 font-sans rounded-3xl border border-border/50 shadow-2xl max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-muted-foreground mt-2 text-lg">Configure global integrations and API keys.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Telegram Integration */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 space-y-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Telegram Integration</h2>
              <p className="text-base text-muted-foreground mt-1">Automatically post approved jobs to a Telegram Channel.</p>
            </div>
            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-zinc-800 p-2 rounded-xl border border-border">
              <Switch 
                checked={formData.isTelegramEnabled}
                onCheckedChange={(c) => setFormData({ ...formData, isTelegramEnabled: c })}
                id="telegram-toggle"
              />
              <Label htmlFor="telegram-toggle" className="font-semibold cursor-pointer">Enable</Label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">Bot Token</Label>
              <Input 
                className="h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                value={formData.telegramBotToken} 
                onChange={(e) => setFormData({ ...formData, telegramBotToken: e.target.value })} 
                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" 
                type="password"
              />
            </div>
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">Channel Chat ID</Label>
              <Input 
                className="h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                value={formData.telegramChannelId} 
                onChange={(e) => setFormData({ ...formData, telegramChannelId: e.target.value })} 
                placeholder="@MyJobChannel or -1001234567890" 
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl ring-1 ring-border/50 p-8 space-y-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">WhatsApp Integration <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full ml-2 align-middle">Cloud API</span></h2>
              <p className="text-base text-muted-foreground mt-1">Automatically broadcast approved jobs via WhatsApp.</p>
            </div>
            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-zinc-800 p-2 rounded-xl border border-border">
              <Switch 
                checked={formData.isWhatsappEnabled}
                onCheckedChange={(c) => setFormData({ ...formData, isWhatsappEnabled: c })}
                id="whatsapp-toggle"
              />
              <Label htmlFor="whatsapp-toggle" className="font-semibold cursor-pointer">Enable</Label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">Phone Number ID</Label>
              <Input 
                className="h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                value={formData.whatsappPhoneNumberId} 
                onChange={(e) => setFormData({ ...formData, whatsappPhoneNumberId: e.target.value })} 
                placeholder="e.g. 101234567890123" 
              />
            </div>
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">Access Token</Label>
              <Input 
                className="h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                value={formData.whatsappAccessToken} 
                onChange={(e) => setFormData({ ...formData, whatsappAccessToken: e.target.value })} 
                placeholder="EAA..." 
                type="password"
              />
            </div>
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">Target Group / Recipient ID</Label>
              <Input 
                className="h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/20 transition-all text-base"
                value={formData.whatsappGroupId} 
                onChange={(e) => setFormData({ ...formData, whatsappGroupId: e.target.value })} 
                placeholder="Recipient Phone Number (with country code)" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isPending} className="h-14 px-10 text-lg rounded-xl shadow-xl shadow-primary/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 font-bold">
            {isPending ? "Saving changes..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
