"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo-light.png" alt="CareerHub Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          <span className="font-black text-xl tracking-tight text-slate-900">CareerHub</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/jobs" className="hover:text-indigo-600 transition-colors">Jobs</Link>
          <Link href="/companies" className="hover:text-indigo-600 transition-colors">Companies</Link>
          <Link href="/resume-builder" className="hover:text-indigo-600 transition-colors">Resume Builder</Link>
          <Link href="/ats-checker" className="hover:text-indigo-600 transition-colors">ATS Checker</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">
            Login
          </Link>
          <Link href="/register">
            <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
