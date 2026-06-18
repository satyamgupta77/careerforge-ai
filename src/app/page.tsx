"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  ArrowRight, CheckCircle2, Star, Sparkles, Zap, 
  Briefcase, Building, Target, Layers, FileText, 
  BarChart, Rocket, Users, ChevronRight, Mail
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Hero Animations
    gsap.fromTo(".hero-text > *", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
    
    gsap.fromTo(".hero-card-1",
      { y: 100, opacity: 0, rotateX: 45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "back.out(1.7)", delay: 0.8 }
    );

    gsap.fromTo(".hero-card-2",
      { y: -100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "back.out(1.7)", delay: 1 }
    );

    gsap.fromTo(".hero-card-3",
      { x: 100, opacity: 0, rotateY: 45 },
      { x: 0, opacity: 1, rotateY: 0, duration: 1.5, ease: "back.out(1.7)", delay: 1.2 }
    );

    // Float animations
    gsap.to(".hero-card-1", { y: -20, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".hero-card-2", { y: 20, duration: 2.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".hero-card-3", { x: -20, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Scroll Animations
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="overflow-hidden bg-background">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-section-hero pt-32 pb-20 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-text max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-indigo-500/20 text-indigo-700 font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>The Next Generation AI Career Platform</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]">
              Land your dream job <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">faster than ever.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Build ATS-beating resumes, master interviews with AI, and apply to top companies in one click. Join 100,000+ professionals accelerating their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 w-full sm:w-auto">
                  Start for free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/50 backdrop-blur-md border-indigo-100 hover:bg-white w-full sm:w-auto text-indigo-900">
                View Demo
              </Button>
            </div>
          </div>

          {/* 3D Floating Elements Showcase */}
          <div className="relative h-[600px] hidden lg:block perspective-1000">
            {/* ATS Score Card */}
            <div className="hero-card-1 absolute top-10 right-20 w-64 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 z-20">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-700">ATS Score</span>
                <span className="text-emerald-500 font-bold bg-emerald-100 px-2 py-1 rounded-full text-xs">High</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-extrabold text-emerald-600">94</span>
                <span className="text-slate-500 mb-1">/ 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[94%]" />
              </div>
            </div>

            {/* Resume Preview Card */}
            <div className="hero-card-2 absolute top-40 left-0 w-80 bg-white/90 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/50 z-10 transform -rotate-6">
              <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                <div className="p-4 space-y-2">
                  <div className="w-1/2 h-3 bg-slate-300 rounded" />
                  <div className="w-1/3 h-2 bg-slate-200 rounded" />
                  <div className="w-full h-2 bg-slate-200 rounded mt-4" />
                  <div className="w-5/6 h-2 bg-slate-200 rounded" />
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Senior Frontend Developer</h3>
              <p className="text-sm text-indigo-600 mb-4">AI Optimized Template</p>
              <Button size="sm" className="w-full rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700">
                Edit Resume
              </Button>
            </div>

            {/* Job Match Card */}
            <div className="hero-card-3 absolute bottom-20 right-10 w-72 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-slate-700/50 z-30 text-white">
              <div className="flex gap-4 items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Product Designer</h4>
                  <p className="text-sm text-slate-400">Stripe • Remote</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 p-3 bg-slate-800 rounded-xl">
                <span className="text-sm text-slate-300">Match Rate</span>
                <span className="font-bold text-emerald-400">98%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted Companies */}
      <section className="py-12 bg-section-trusted border-y border-slate-200/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by candidates hired at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google', 'Microsoft', 'Meta', 'Amazon', 'Apple', 'Netflix'].map(company => (
              <div key={company} className="text-2xl font-bold font-sans tracking-tight text-slate-800">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Platform Statistics */}
      <section className="py-24 bg-section-stats reveal-section">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2M+", label: "Resumes Generated" },
              { value: "50k+", label: "Interviews Aced" },
              { value: "98%", label: "ATS Pass Rate" },
              { value: "10k+", label: "Companies Hiring" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900">{stat.value}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Resume Builder */}
      <section className="py-32 bg-section-resume reveal-section overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-sky-500/10 blur-[100px] rounded-full" />
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-sky-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="w-full h-8 bg-slate-100 rounded-t-xl mb-6 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-amber-400" />
                 <div className="w-3 h-3 rounded-full bg-emerald-400" />
               </div>
               <div className="space-y-4">
                 <div className="h-8 w-1/3 bg-slate-200 rounded" />
                 <div className="h-4 w-1/4 bg-slate-100 rounded mb-8" />
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="space-y-2">
                     <div className="h-5 w-1/2 bg-sky-100 rounded" />
                     <div className="h-4 w-full bg-slate-50 rounded" />
                     <div className="h-4 w-5/6 bg-slate-50 rounded" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Pixel-perfect resumes in minutes.</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Choose from dozens of premium, recruiter-approved templates. Our AI helps you write compelling bullet points that highlight your impact.
            </p>
            <ul className="space-y-4 mb-8">
              {['AI bullet point generation', 'One-click design switching', 'Export to PDF & DOCX'].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-sky-600" /> {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white rounded-full h-14 px-8 text-lg">
              <Link href="/resume-builder">
                Try Resume Builder
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. ATS Checker */}
      <section className="py-32 bg-section-ats reveal-section">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Beat the robots. Get the interview.</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Upload your resume and the job description. Our AI analyzes your match rate and tells you exactly which keywords you're missing.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-14 px-8 text-lg">
              <Link href="/ats-checker">
                Check ATS Score
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-emerald-100">
               <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                 <div>
                   <h3 className="text-lg font-bold text-slate-800">Match Results</h3>
                   <p className="text-sm text-slate-500">Software Engineer at Google</p>
                 </div>
                 <div className="text-right">
                   <div className="text-4xl font-extrabold text-emerald-500">92%</div>
                   <div className="text-sm font-medium text-emerald-600">Excellent Match</div>
                 </div>
               </div>
               <div className="space-y-6">
                 <div>
                   <div className="flex justify-between text-sm mb-2 font-medium">
                     <span className="text-slate-700">Required Skills Found</span>
                     <span className="text-emerald-600">14/15</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full w-[95%]" /></div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {['React', 'TypeScript', 'Node.js', 'System Design'].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                       {skill}
                     </span>
                   ))}
                   <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                     Missing: GraphQL
                   </span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Resume Enhancer */}
      <section className="py-32 bg-section-enhancer reveal-section">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">AI Resume Enhancer</h2>
          <p className="text-xl text-slate-700 mb-16 leading-relaxed">
            Turn weak descriptions into powerful achievement statements using the STAR method instantly.
          </p>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-purple-100 text-left">
            <div className="mb-6">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Before</span>
              <p className="text-lg text-slate-600 mt-2 line-through decoration-red-400">Fixed bugs and improved website speed.</p>
            </div>
            <div className="flex justify-center my-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Enhanced
              </span>
              <p className="text-xl text-slate-900 font-medium mt-2 leading-relaxed">
                Optimized frontend rendering performance, reducing page load time by 40% and increasing user retention by 15% using React and Next.js.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Job Categories */}
      <section className="py-24 bg-section-categories reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 text-center">Explore Opportunities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target, label: "Engineering" },
              { icon: Briefcase, label: "Product" },
              { icon: Layers, label: "Design" },
              { icon: BarChart, label: "Marketing" },
              { icon: Users, label: "Sales" },
              { icon: Building, label: "Finance" },
              { icon: FileText, label: "Legal" },
              { icon: Rocket, label: "Operations" },
            ].map((cat, i) => (
              <Link href="/jobs" key={i}>
                <div className="bg-white/60 hover:bg-white p-6 rounded-2xl border border-orange-200 transition-all cursor-pointer text-center group">
                  <cat.icon className="w-10 h-10 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-slate-800">{cat.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Jobs */}
      <section className="py-32 bg-section-featured reveal-section">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Roles</h2>
              <p className="text-lg text-slate-700">Handpicked roles at top companies.</p>
            </div>
            <Link href="/jobs" className="hidden md:flex items-center text-amber-700 font-bold hover:underline">
              View all jobs <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-xl"><Briefcase className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Senior Developer</h3>
                    <p className="text-slate-500 text-sm">TechCorp • San Francisco</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">Full Time</span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-bold">$120k - $160k</span>
                </div>
                <Button className="w-full rounded-full bg-slate-900 hover:bg-slate-800 text-white">Apply Now</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Top Companies */}
      <section className="py-32 bg-section-companies reveal-section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Top Companies Hiring Now</h2>
          <p className="text-lg text-slate-700 mb-16 max-w-2xl mx-auto">Discover cultures, benefits, and open roles at the world's most innovative companies.</p>
          <div className="grid md:grid-cols-4 gap-6">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-cyan-100 hover:shadow-2xl transition-all group cursor-pointer">
                 <div className="w-16 h-16 bg-cyan-100 text-cyan-600 flex items-center justify-center rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform"><Building className="w-8 h-8" /></div>
                 <h3 className="font-bold text-slate-900 text-xl mb-2">Innovate Inc.</h3>
                 <p className="text-cyan-600 font-medium mb-4">42 Open Roles</p>
                 <span className="text-sm text-slate-500 line-clamp-2">Leading the future of sustainable energy solutions globally.</span>
               </div>
             ))}
          </div>
          <Button variant="outline" className="mt-12 rounded-full h-12 px-8 border-cyan-600 text-cyan-700 hover:bg-cyan-50">
            Browse All Companies
          </Button>
        </div>
      </section>

      {/* 10. Portfolio Generator */}
      <section className="py-32 bg-section-portfolio reveal-section overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Your personal website, instantly.</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Convert your resume into a stunning, responsive portfolio website with one click. Stand out to recruiters with a professional digital presence.
            </p>
            <ul className="space-y-4 mb-8">
              {['Custom domains', 'Dark mode support', 'SEO optimized'].map(f => (
                <li key={f} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-pink-500" /> {f}
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white rounded-full h-14 px-8 text-lg">
              Create Portfolio
            </Button>
          </div>
          <div className="relative">
             <div className="w-full aspect-[4/3] bg-slate-900 rounded-t-xl rounded-b-md shadow-2xl p-2 border-b-8 border-slate-800 transform rotate-2">
               <div className="w-full h-full bg-white rounded overflow-hidden">
                  <div className="h-12 border-b flex items-center px-6 justify-between bg-slate-50">
                    <div className="font-bold text-slate-800">John Doe</div>
                    <div className="flex gap-4 text-xs font-bold text-slate-400">
                      <span>Work</span><span>About</span><span>Contact</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="w-3/4 h-8 bg-slate-900 rounded mb-4" />
                    <div className="w-1/2 h-4 bg-slate-400 rounded mb-8" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-pink-50 rounded border border-pink-100" />
                      <div className="h-24 bg-pink-50 rounded border border-pink-100" />
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. Career Roadmaps */}
      <section className="py-32 bg-section-roadmaps reveal-section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">AI Career Roadmaps</h2>
          <p className="text-xl text-slate-700 mb-16 max-w-2xl mx-auto">Not sure what to learn next? Our AI analyzes your dream job and builds a step-by-step learning path.</p>
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-teal-100 text-left relative">
            <div className="absolute top-0 right-12 w-1 h-full bg-teal-100" />
            {[
              { title: "Learn React Fundamentals", time: "Week 1-2", done: true },
              { title: "Master Next.js & SSR", time: "Week 3-4", done: false },
              { title: "Build 3 Fullstack Projects", time: "Week 5-8", done: false },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-teal-500 text-white' : 'bg-white border-2 border-teal-200'}`}>
                  {step.done && <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                  <p className="text-teal-600 font-medium text-sm">{step.time}</p>
                </div>
              </div>
            ))}
            <div className="mt-8 flex justify-center">
               <Button className="rounded-full bg-teal-600 hover:bg-teal-700 text-white">Generate Your Roadmap</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. AI Features */}
      <section className="py-32 bg-section-ai reveal-section text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Supercharged by AI</h2>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto">Everything you need to gain an unfair advantage in your job search.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Cover Letter Generator", desc: "Instantly write personalized cover letters tailored to the job description." },
              { title: "Mock Interviews", desc: "Practice with a voice-based AI interviewer and get real-time feedback." },
              { title: "Salary Predictor", desc: "Know your worth. AI analyzes market trends to predict your optimal salary." }
            ].map((f, i) => (
               <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                 <h3 className="text-xl font-bold mb-4 text-white">{f.title}</h3>
                 <p className="text-indigo-100">{f.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Success Stories */}
      <section className="py-32 bg-section-success reveal-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
               <div className="flex gap-4 mb-6">
                 <div className="w-16 h-16 bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold rounded-full">AJ</div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg">Alex Johnson</h3>
                   <p className="text-slate-500">Hired as Software Engineer at Meta</p>
                 </div>
               </div>
               <p className="text-slate-700 leading-relaxed italic">
                 "CareerHub's ATS checker was exactly what I needed. I didn't realize my resume format was completely unreadable by standard systems. Within 2 weeks of using the AI generated templates, I had 5 interviews lined up."
               </p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
               <div className="flex gap-4 mb-6">
                 <div className="w-16 h-16 bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold rounded-full">MG</div>
                 <div>
                   <h3 className="font-bold text-slate-900 text-lg">Maria Garcia</h3>
                   <p className="text-slate-500">Hired as Product Manager at Stripe</p>
                 </div>
               </div>
               <p className="text-slate-700 leading-relaxed italic">
                 "The AI interview prep gave me the confidence I lacked. It asked the exact behavioral questions I ended up getting in my final round. I negotiated a 20% higher salary thanks to the insights."
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 14. Testimonials */}
      <section className="py-32 bg-section-testimonials reveal-section">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Loved by 100k+ candidates</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left hover:-translate-y-1 transition-transform">
                   <div className="flex gap-1 mb-3">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                   </div>
                   <p className="text-slate-700 mb-4 text-sm">"Absolutely life-changing platform. The UI is gorgeous and the AI features actually work as advertised. Highly recommend to anyone job hunting."</p>
                   <div className="font-bold text-slate-900 text-sm">- User {i}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 15. Blog Section */}
      <section className="py-32 bg-section-blog reveal-section">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest Career Insights</h2>
            </div>
            <Button variant="link" className="hidden md:flex text-slate-700">View all articles <ArrowRight className="ml-1 w-4 h-4" /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "How to beat the ATS in 2026",
              "Top 10 highest paying tech roles",
              "Negotiating your salary like a pro"
            ].map((title, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
                   <FileText className="w-16 h-16 text-slate-300" />
                   <div className="absolute inset-0 bg-slate-800/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Career Tips</div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
                  <p className="text-slate-600 text-sm mb-4">Learn the secrets to standing out in a crowded job market with our latest comprehensive guide.</p>
                  <span className="text-sm font-medium text-slate-500 flex items-center group-hover:text-blue-600">Read Article <ChevronRight className="w-4 h-4 ml-1" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Newsletter Section */}
      <section className="py-24 bg-section-newsletter reveal-section">
        <div className="container mx-auto px-6">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-pink-100 max-w-5xl mx-auto text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Get hired faster.</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Join 50,000+ professionals who receive our weekly newsletter packed with exclusive job listings, interview tips, and salary insights.</p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <input type="email" placeholder="Enter your email address" className="h-14 px-6 rounded-full border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg" required />
                <Button size="lg" className="h-14 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-lg shrink-0">Subscribe</Button>
              </form>
              <p className="text-sm text-slate-400 mt-4">We care about your data. Read our Privacy Policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Pricing Section */}
      <section className="py-32 bg-section-pricing reveal-section text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Simple, transparent pricing</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Start for free, upgrade when you need the full power of AI.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-slate-500 transition-colors">
              <h3 className="text-2xl font-bold mb-2 text-white">Candidate Free</h3>
              <p className="text-slate-400 mb-8">Everything you need to start.</p>
              <div className="text-5xl font-extrabold mb-8 text-white">$0<span className="text-xl text-slate-500 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {["1 AI Resume", "3 ATS Checks / month", "Basic Job Search", "Standard Portfolio"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-14 rounded-full border-slate-600 text-white hover:bg-slate-700 bg-transparent text-lg">Get Started</Button>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-gradient-to-b from-indigo-600 to-violet-800 p-10 rounded-3xl shadow-2xl relative border border-indigo-400 transform md:-translate-y-4">
              <div className="absolute top-0 right-8 bg-amber-400 text-amber-950 text-xs font-bold px-4 py-1 rounded-b-lg tracking-wider">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2 text-white">Candidate Pro</h3>
              <p className="text-indigo-200 mb-8">Unleash the full power of AI.</p>
              <div className="text-5xl font-extrabold mb-8 text-white">$12<span className="text-xl text-indigo-300 font-medium">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {["Unlimited AI Resumes", "Unlimited ATS Checks", "Mock AI Interviews", "Premium Portfolio Templates", "Priority Application Status", "Salary Insights"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full h-14 rounded-full bg-white text-indigo-900 hover:bg-slate-100 text-lg font-bold shadow-xl hover:scale-[1.02] transition-transform">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 18. FAQ Section */}
      <section className="py-32 bg-section-faq reveal-section">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "How accurate is the ATS Checker?", a: "Our ATS checker is built on the same parsing algorithms used by over 80% of Fortune 500 companies (Taleo, Workday, Greenhouse). It accurately simulates how a machine reads your resume." },
              { q: "Can I use my own domain for the portfolio?", a: "Yes, Pro users can connect custom domains to their auto-generated portfolios in just a few clicks." },
              { q: "Is the AI interview practice tailored to my role?", a: "Absolutely. The AI interviewer analyzes the specific job description you provide and generates behavioral and technical questions relevant to that exact role." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors group">
                <h3 className="font-bold text-lg text-slate-900 mb-2 flex justify-between items-center">
                  {faq.q} <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. CTA Section */}
      <section className="py-32 bg-section-cta reveal-section text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 opacity-50" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
           <div className="bg-white/60 backdrop-blur-2xl p-16 rounded-[3rem] border border-white shadow-2xl">
             <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 tracking-tight">Ready to launch your career?</h2>
             <p className="text-2xl text-slate-700 mb-12">Join thousands of professionals landing their dream jobs with CareerHub today.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/register">
                 <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-600/30 w-full sm:w-auto text-white">
                   Create Free Account
                 </Button>
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 20. Premium Footer */}
      <footer className="bg-section-footer text-indigo-200 py-20 border-t border-indigo-900/50 relative overflow-hidden">
        {/* Footer Top Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <Image src="/logo-dark.png" alt="CareerHub Logo" width={32} height={32} className="rounded-lg shadow-sm" />
                <span className="text-3xl font-black text-white tracking-tight">CareerHub.</span>
              </Link>
              <p className="text-indigo-200/80 max-w-sm mb-8 leading-relaxed">
                The AI-powered career accelerator. We provide the tools you need to build your resume, ace interviews, and land your dream job faster.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer text-white">
                    S{i}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Product</h4>
              <ul className="space-y-4">
                {['Resume Builder', 'ATS Checker', 'AI Interviews', 'Portfolio Maker', 'Pricing'].map(link => (
                  <li key={link}><Link href="#" className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Resources</h4>
              <ul className="space-y-4">
                {['Blog', 'Career Roadmaps', 'Interview Questions', 'Success Stories', 'Help Center'].map(link => (
                  <li key={link}><Link href="#" className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map(link => (
                  <li key={link}><Link href="#" className="hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-indigo-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-indigo-300/60 text-sm">© {new Date().getFullYear()} CareerHub Inc. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-indigo-300/60 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-indigo-300/60 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-indigo-300/60 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
