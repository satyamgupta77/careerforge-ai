"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started with your job hunt.",
    features: ["1 Primary Resume", "3 Resume Downloads", "2 ATS Checks", "Basic Job Search"],
    cta: "Get Started",
    href: "/register",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    description: "Unlock the full power of the AI resume builder.",
    features: ["Unlimited Resume Downloads", "Unlimited ATS Checks", "AI Resume Enhancer", "Advanced Job Filters", "Priority Support"],
    cta: "Upgrade to Pro",
    href: "/dashboard/billing",
    popular: true,
  },
  {
    name: "Premium",
    price: "₹299",
    period: "/month",
    description: "The ultimate toolkit for serious professionals.",
    features: ["Everything in Pro", "Personal Portfolio Builder", "Custom Domain Support", "AI Career Roadmaps", "Featured Applicant Status"],
    cta: "Upgrade to Premium",
    href: "/dashboard/billing",
    popular: false,
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
            Simple, transparent pricing
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Choose the plan that best fits your career goals. Upgrade anytime to unlock advanced AI features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`relative flex flex-col p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border ${plan.popular ? 'border-primary ring-4 ring-primary/20 scale-105 z-10' : 'border-slate-200 dark:border-zinc-800 ring-1 ring-border/50'}`}>
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-extrabold tracking-widest uppercase shadow-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-3 min-h-[48px] text-lg leading-relaxed">{plan.description}</p>
              </div>
              
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-xl text-slate-500 dark:text-slate-400 font-bold">{plan.period}</span>}
              </div>

              <ul className="space-y-5 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <CheckCircle2 className={`w-6 h-6 shrink-0 ${plan.popular ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-auto block w-full">
                <Button className={`w-full py-7 text-xl font-extrabold rounded-2xl transition-all duration-300 ${plan.popular ? 'shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1' : 'shadow-md hover:shadow-lg hover:-translate-y-1'}`} variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
