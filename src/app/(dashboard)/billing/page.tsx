"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, Zap } from "lucide-react";
import { useTransition } from "react";

export default function BillingDashboard() {
  const [isPending, startTransition] = useTransition();

  // MVP Mock Data. In prod, fetch from User and Subscription models.
  const currentPlan = "FREE"; 
  const atsChecksUsed = 2;
  const resumeDownloadsUsed = 1;

  const handleUpgrade = (tier: string) => {
    startTransition(() => {
      // In production, this calls a Server Action to create a Razorpay/Stripe checkout session
      alert(`Initiating checkout for ${tier} plan via Razorpay (Mock)`);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan and track your feature usage.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-8 bg-primary text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-medium opacity-90 mb-1">Current Plan</p>
                <h2 className="text-4xl font-extrabold">{currentPlan}</h2>
              </div>
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                Active
              </Badge>
            </div>
            {currentPlan === "FREE" && (
              <p className="text-primary-foreground/80 mb-6">Upgrade to Pro to unlock unlimited ATS checks and the AI Enhancer.</p>
            )}
            <div className="flex gap-4">
              {currentPlan === "FREE" && (
                <>
                  <Button variant="secondary" className="font-bold" onClick={() => handleUpgrade("PRO")} disabled={isPending}>Upgrade to Pro (₹99)</Button>
                  <Button variant="outline" className="text-primary bg-white hover:bg-slate-100 border-0" onClick={() => handleUpgrade("PREMIUM")} disabled={isPending}>Get Premium (₹299)</Button>
                </>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Usage Limits</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>ATS Checks</span>
                  <span className={atsChecksUsed >= 2 ? "text-destructive" : "text-muted-foreground"}>{atsChecksUsed} / 2 Used</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${atsChecksUsed >= 2 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min((atsChecksUsed/2)*100, 100)}%` }}></div>
                </div>
                {atsChecksUsed >= 2 && <p className="text-xs text-destructive mt-2">Limit reached. Upgrade required for more checks.</p>}
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Resume Downloads</span>
                  <span className="text-muted-foreground">{resumeDownloadsUsed} / 3 Used</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min((resumeDownloadsUsed/3)*100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 border-primary/20 bg-primary/5 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" /> Pro Features
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited ATS Checks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Downloads</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> AI Resume Enhancer</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl ring-1 ring-border/50 p-6 transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-muted-foreground" /> Payment Method
            </h3>
            <p className="text-sm text-muted-foreground mb-4">No payment method on file.</p>
            <Button variant="outline" className="w-full" disabled>Add Payment Method</Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
