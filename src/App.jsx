import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,

  Activity,
  GitBranch,
  Server,
  Database,
  Globe,
  Code2,
  Cpu,
  Zap,
  MessageSquare,
  ShieldCheck,
  Layout,
  Smartphone,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Layers,
  PenTool,
  Wrench,
  Rocket
} from 'lucide-react';

// --- UTILS: SCROLL OBSERVER ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- BRAND CONFIGURATION ---

// --- COMPONENT: HERO HEADLINE ROTATOR ---
const HeroHeadlineRotator = () => {
  const headlines = [
    {
      main: "Your Developer Quoted 4 Months.",
      highlight: "We Quote 28 Days.",
      suffix: "You Do The Math."
    },
    {
      main: "Don't Build a Startup.",
      highlight: "Build a Proof of Concept.",
      suffix: "Then Decide."
    },
    {
      main: "14 Days to Prove You're Right.",
      highlight: "28 Days to Prove",
      suffix: "You're Profitable."
    },
    {
      main: "The Gap Between 'AI Code' and 'Shipped Product'",
      highlight: "Is Where Dreams Die.",
      suffix: "We Bridge It."
    }
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % headlines.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[250px] md:min-h-[320px] flex items-center justify-center py-4">
      <h1 className={`text-5xl md:text-[4.5rem] font-bold tracking-tighter text-slate-900 leading-[1.1] transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {headlines[index].main} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          {headlines[index].highlight}
        </span> <br />
        {headlines[index].suffix}
      </h1>
    </div>
  );
};

// --- COMPONENT: SYSTEM TIMELINE (14/28 DAYS) ---
// --- COMPONENT: INTERACTIVE TIMELINE ---
const SystemTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  // Auto-advance timeline on mobile or if user hasn't interacted? Maybe keep manual for now for control.

  const steps = [
    {
      id: "01",
      title: "The Download",
      day: "Day 0",
      desc: "60-minute 'Brain Dump' call. No specs, just raw logic. We understand your vision before writing a single line of code.",
      icon: MessageSquare,
      tags: ["Strategy", "Discovery"],
      color: "bg-blue-500"
    },
    {
      id: "02",
      title: "Architecture",
      day: "Day 1-3",
      desc: "Stack selection (Supabase + Next.js) & DB setup. We lay the foundation for a scalable application.",
      icon: Database,
      tags: ["Tech Stack", "Schema"],
      color: "bg-indigo-500"
    },
    {
      id: "03",
      title: "The 'Ugly' Demo",
      day: "Day 7",
      desc: "Core feature works. Ugly UI, but data saves. You see the logic in action.",
      icon: Layout,
      tags: ["Validation", "Logic"],
      color: "bg-purple-500"
    },
    {
      id: "04",
      title: "POC Delivery",
      day: "Day 14",
      desc: "Functional link. Decision Gate: Go to MVP or Stop? We prove the concept works.",
      icon: CheckCircle2,
      tags: ["Milestone", "Decision"],
      color: "bg-green-500"
    },
    {
      id: "05",
      title: "The 'Glow Up'",
      day: "Day 15-20",
      desc: "UI/UX design, mobile responsiveness, animations. We make it look World-Class.",
      icon: PenTool,
      tags: ["UI/UX", "Design"],
      color: "bg-pink-500"
    },
    {
      id: "06",
      title: "The Gates",
      day: "Day 21-25",
      desc: "Stripe, Auth, Admin Dashboards. All the production-grade features you need.",
      icon: ShieldCheck,
      tags: ["Payments", "Security"],
      color: "bg-orange-500"
    },
    {
      id: "07",
      title: "The Stress Test",
      day: "Day 26",
      desc: "We break it. We fix what breaks. Ensuring stability before the big launch.",
      icon: Activity,
      tags: ["QA", "Testing"],
      color: "bg-red-500"
    },
    {
      id: "08",
      title: "Handover",
      day: "Day 28",
      desc: "Code transfer, video walkthrough, 'Go Live'. Your business is open for business.",
      icon: Rocket,
      tags: ["Launch", "Handover"],
      color: "bg-slate-900"
    }
  ];

  return (
    <section id="timeline" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 mb-6 uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              How We Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
              A Transparent Process. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Designed for Speed.</span>
            </h2>
          </div>
        </FadeIn>

        {/* --- DESKTOP VIEW (Split) --- */}
        <div className="hidden lg:flex gap-12 items-start">
          {/* Navigation List */}
          <div className="w-1/3 relative space-y-2">
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`group relative flex items-center gap-6 p-4 w-full text-left rounded-xl transition-all duration-300 ${activeStep === idx ? 'bg-white shadow-xl shadow-blue-900/5 ring-1 ring-slate-100 scale-105 z-10' : 'hover:bg-white/50 hover:pl-6'}`}
              >
                {/* Node */}
                <div className={`relative z-10 w-14 h-14 rounded-full border-4 border-slate-50 flex items-center justify-center shrink-0 transition-colors duration-300 ${activeStep === idx ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border-slate-100 group-hover:border-blue-100 group-hover:text-blue-500'}`}>
                  <span className="font-mono font-bold text-sm">{step.id}</span>
                </div>

                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block transition-colors ${activeStep === idx ? 'text-blue-600' : 'text-slate-400'}`}>
                    {step.day}
                  </span>
                  <h3 className={`font-bold text-lg transition-colors ${activeStep === idx ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed View Sticky Area */}
          <div className="w-2/3 sticky top-32 p-8">
            <div className="relative aspect-[16/9] bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden group">
              <div className="absolute inset-0 bg-slate-50/50"></div>

              {/* Decorative Elements */}
              <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 transition-colors duration-500 ${steps[activeStep].color}`}></div>

              <div className="relative h-full flex flex-col justify-center p-12 md:p-20 transition-all duration-500">
                <div key={activeStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl ${steps[activeStep].color} text-white shadow-lg`}>
                      {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
                    </div>
                    <span className="text-6xl font-black text-slate-100 select-none absolute right-10 top-10 opacity-20">
                      {steps[activeStep].id}
                    </span>
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                    {steps[activeStep].title}
                  </h3>

                  <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                    {steps[activeStep].desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {steps[activeStep].tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wider shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Horizontal Scroll) --- */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto pb-12 gap-4 snap-x snap-mandatory px-6 -mx-6 scrollbar-hide">
            {steps.map((step, idx) => (
              <div key={step.id} className="snap-center shrink-0 w-[85vw] max-w-sm">
                <div className="h-full bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/20 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl ${step.color} text-white shadow-md`}>
                      {React.createElement(step.icon, { className: "w-6 h-6" })}
                    </div>
                    <span className="font-mono font-bold text-slate-200 text-3xl">{step.id}</span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">{step.day}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {step.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {step.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicator visually hinted by the overflow */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === 0 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


// --- COMPONENT: LOGO ---
const BrandLogo = () => (
  <div className="flex items-baseline group cursor-pointer select-none relative">
    {/* Text Only Logo */}
    <span className="text-3xl font-medium tracking-tight text-slate-700 group-hover:text-slate-900 transition-colors">scale</span>
    {/* Styled superscript x */}
    <sup className="text-xl font-black text-slate-900 -top-2 ml-0.5 tracking-tighter group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'ui-sans-serif, system-ui' }}>x</sup>
  </div>
);

// --- COMPONENT: TECH STACK STRIP ---
const TechStackIcon = ({ label }) => (
  <div className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-lg bg-slate-50/50">
    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
    <span className="text-xs font-bold text-slate-600">{label}</span>
  </div>
)

// --- COMPONENT: SERVICE CARD ---
const ServiceCard = ({ title, desc, icon: Icon, color }) => (
  <div className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
    {/* Top Border Accent */}
    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${color}`}></div>

    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-slate-100">
      <Icon className="w-6 h-6 text-slate-700" />
    </div>

    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed mb-6">{desc}</p>

    <div className="mt-auto flex items-center text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest">
      Learn More <ArrowRight className="w-3 h-3 ml-2" />
    </div>
  </div>
)

// --- COMPONENT: BROWSER WINDOW CASE STUDY ---
const BrowserWindow = ({ title, url, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-500 group">
    {/* Browser Header */}
    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
      </div>
      <div className="flex-1 bg-white border border-slate-200 rounded-md py-1 px-3 text-[10px] text-slate-400 font-mono truncate text-center">
        {url}
      </div>
    </div>
    {/* Browser Body */}
    <div className="relative flex-1 bg-slate-100 overflow-hidden">
      {children}
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-white font-bold text-lg">{title}</h4>
        <div className="flex items-center text-white/80 text-xs mt-2 font-bold">
          View Case Study <ArrowRight className="w-3 h-3 ml-2" />
        </div>
      </div>
    </div>
  </div>
)

// --- COMPONENT: PRICING / PACKAGE CARD ---
const PackageCard = ({ title, days, price, subtitle, features, recommended }) => (
  <div className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${recommended ? 'bg-slate-900 text-white border-slate-800 shadow-2xl shadow-blue-900/20' : 'bg-white/80 backdrop-blur-xl text-slate-900 border-white/20 shadow-xl shadow-slate-200/40'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-blue-600/30">
        Most Popular
      </div>
    )}

    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-xl font-bold ${recommended ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <span className={`text-xs font-mono px-2 py-1 rounded ${recommended ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>{days} Days</span>
      </div>
      <p className={`text-sm ${recommended ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
    </div>

    <div className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">{price}</span>
      </div>
    </div>

    <div className="flex-1 space-y-4 mb-8">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${recommended ? 'text-blue-400' : 'text-slate-900'}`} />
          <span className={recommended ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
        </div>
      ))}
    </div>

    <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${recommended ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20'}`}>
      Start {days}-Day Sprint
    </button>
  </div>
)

// --- COMPONENT: GAP CHART (ANIMATED) ---


// --- ALTERNATING TIMELINE COMPONENT ---
const TimelineStep = ({ step, title, desc, icon: Icon, tags, side }) => {
  return (
    <FadeIn>
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative w-full ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>

        {/* 1. TEXT CONTENT SIDE */}
        <div className={`md:w-1/2 flex flex-col ${side === 'right' ? 'md:items-start' : 'md:items-end md:text-right'}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-blue-600 font-mono text-sm font-bold bg-blue-50 px-2 py-1 rounded border border-blue-100">
              {step}
            </span>
            <div className="h-px w-12 bg-slate-200"></div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
            {desc}
          </p>
          <div className={`flex flex-wrap gap-2 ${side === 'right' ? 'justify-start' : 'justify-end'}`}>
            {tags.map(t => (
              <span key={t} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100 px-2 py-1 rounded bg-slate-50">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 2. CENTER ICON NODE */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center h-full z-10 hidden md:flex">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative z-20 group hover:scale-110 hover:border-blue-500 transition-all duration-300">
            <Icon className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
            {/* Pulse Effect behind icon */}
            <div className="absolute inset-0 bg-blue-100 rounded-xl -z-10 opacity-0 group-hover:opacity-50 blur-lg transition-opacity"></div>
          </div>
        </div>

        {/* 3. EMPTY SIDE (For spacing balance) */}
        <div className="md:w-1/2 hidden md:block"></div>

        {/* Mobile Line Connector (Visible only on mobile) */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 md:hidden"></div>
      </div>
    </FadeIn>
  )
};

// --- COMPONENT: BACKGROUND GRAPH ANIMATION ---
// --- COMPONENT: BACKGROUND GRAPH ANIMATION ---
const BackgroundGraph = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute w-full h-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Small Grid Pattern */}
        <pattern id="smallGrid" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#smallGrid)" />

        {/* Exponential Curve Line (Lowered peak to y=30 to avoid text overlap) */}
        <path
          d="M 5 95 C 40 95, 70 80, 95 30"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="0.8"
          strokeLinecap="round"
          className="animate-draw-line"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0, 1000"
            to="1000, 0"
            dur="3s"
            fill="freeze"
          />
        </path>

        {/* Moving Particle along the path */}
        <circle r="1.5" fill="#C084FC" className="animate-pulse shadow-lg shadow-purple-500">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 5 95 C 40 95, 70 80, 95 30"
          />
        </circle>

        {/* Data Points (Static decoration) */}
        <circle cx="5" cy="95" r="1" fill="#94A3B8" />
        <circle cx="95" cy="95" r="1" fill="#94A3B8" />
        <circle cx="5" cy="30" r="1" fill="#94A3B8" />
      </svg>

      {/* Soft Glow at the peak */}
      <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[100px] rounded-full mix-blend-multiply"></div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [calModalOpen, setCalModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (calModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [calModalOpen]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-50 selection:text-blue-900">

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <BrandLogo />

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#capabilities" className="hover:text-slate-900 transition-colors">Capabilities</a>
            <a href="#process" className="hover:text-slate-900 transition-colors">Process</a>
            <a href="#work" className="hover:text-slate-900 transition-colors">Work</a>
          </div>

          <div className="flex items-center gap-4 z-50">
            <button onClick={() => setCalModalOpen(true)} className="hidden md:flex bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all items-center gap-2 group shadow-[0_10px_20px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(15,23,42,0.2)]">
              Book Strategy Call
              <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
            </button>
            <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>


      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-10 px-6 relative overflow-hidden">
        {/* Background Graph */}
        <BackgroundGraph />

        {/* Subtle Background Pattern & Blobs (Existing - reduced opacity slightly to let graph show) */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-20 opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl -z-20 opacity-60 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto mt-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-[11px] font-bold text-slate-600 mb-8 uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Accepting Q4 Projects
            </div>

            <HeroHeadlineRotator />

            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Most founders spend $50k just to find out nobody wants their app. <span className="text-slate-900 font-medium">Spend 14 days</span> and a fraction of the cost to find out the truth.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <button onClick={() => setCalModalOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 group">
                Start My 14-Day Sprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#timeline" className="bg-white/80 backdrop-blur-sm text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-white transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1">
                See the Timeline
              </a>
            </div>
          </div>



          {/* TECH STACK STRIP */}
          <FadeIn delay={200}>
            <div className="mt-12 flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
              <TechStackIcon label="Next.js 14" />
              <TechStackIcon label="TypeScript" />
              <TechStackIcon label="Tailwind CSS" />
              <TechStackIcon label="Supabase" />
              <TechStackIcon label="Figma" />
              <TechStackIcon label="Stripe" />
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- SPEED ADVANTAGE SECTION --- */}


      {/* --- SYSTEM TIMELINE --- */}
      <SystemTimeline />

      {/* --- CAPABILITIES --- */}
      <section id="capabilities" className="py-32 bg-slate-50/50 border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">Full-Stack Capabilities.</h2>
              <p className="text-lg text-slate-500 leading-relaxed font-light">
                From Day 1 to Scale. We handle every layer of the product journey.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
            <FadeIn delay={100} className="h-full">
              <ServiceCard
                title="SaaS Landing Page"
                desc="Transform your SaaS idea into a stunning, conversion-optimized landing page that attracts users."
                icon={Layout}
                color="bg-purple-500"
                className="bg-white/80 backdrop-blur-xl border-white/20 shadow-xl"
              />
            </FadeIn>
            <FadeIn delay={200} className="h-full">
              <ServiceCard
                title="MVP Development"
                desc="Get your minimum viable product built and launched in 2 weeks. We help you validate quickly."
                icon={Code2}
                color="bg-blue-500"
                className="bg-white/80 backdrop-blur-xl border-white/20 shadow-xl"
              />
            </FadeIn>
            <FadeIn delay={300} className="h-full">
              <ServiceCard
                title="Maintenance"
                desc="Keep your product running smoothly with our ongoing support. Bug fixes, updates, and improvements."
                icon={Wrench}
                color="bg-orange-500"
                className="bg-white/80 backdrop-blur-xl border-white/20 shadow-xl"
              />
            </FadeIn>
            <FadeIn delay={400} className="h-full">
              <ServiceCard
                title="Custom"
                desc="Have something unique in mind? Let's build a tailored solution that fits your vision perfectly."
                icon={PenTool}
                color="bg-pink-500"
                className="bg-white/80 backdrop-blur-xl border-white/20 shadow-xl"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- ALTERNATING PROCESS TIMELINE --- */}
      <section id="process" className="py-32 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-4xl font-bold tracking-tighter mb-4">How We Work.</h2>
              <p className="text-slate-500">A transparent, high-velocity process designed for speed.</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Central Timeline Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-24">

              <TimelineStep
                step="01"
                side="left"
                title="Discovery Call"
                desc="We discuss your vision, market opportunity, and technical requirements to ensure perfect alignment."
                icon={MessageSquare}
                tags={['Strategy', 'Audit']}
              />

              <TimelineStep
                step="02"
                side="right"
                title="Strategic Planning"
                desc="Together, we create a roadmap that includes core features, tech stack decisions, and timelines."
                icon={GitBranch}
                tags={['Roadmap', 'Tech Stack']}
              />

              <TimelineStep
                step="03"
                side="left"
                title="Rapid Development"
                desc="Our agents build your MVP with regular demos and feedback loops to ensure we hit the mark."
                icon={Terminal}
                tags={['Sprints', 'Code']}
              />

              <TimelineStep
                step="04"
                side="right"
                title="Launch & Growth"
                desc="We deploy your MVP and provide guidance on user acquisition and scaling strategies."
                icon={ArrowUpRight}
                tags={['Deploy', 'Scale']}
              />

            </div>
          </div>
        </div>
      </section>

      {/* --- WORK (Browser Style) --- */}
      <section id="work" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-4 text-slate-900">Explore Our Work.</h2>
                <p className="text-slate-500 max-w-xl">
                  Real projects, real results. See what we've built for startups just like yours.
                </p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-sm font-bold border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                View all projects <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-auto md:h-[400px]">
            <FadeIn delay={100} className="h-full">
              <BrowserWindow title="FinTech Dashboard" url="app.finance-ai.com">
                <div className="w-full h-full bg-slate-100 p-4">
                  <div className="w-full h-full bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                    <div className="flex gap-4 mb-4">
                      <div className="w-1/3 h-24 bg-blue-50 rounded"></div>
                      <div className="w-1/3 h-24 bg-slate-50 rounded"></div>
                      <div className="w-1/3 h-24 bg-slate-50 rounded"></div>
                    </div>
                    <div className="w-full h-32 bg-slate-50 rounded"></div>
                  </div>
                </div>
              </BrowserWindow>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <BrowserWindow title="Legal SaaS Platform" url="discovery.legal.io">
                <div className="w-full h-full bg-slate-100 p-4 flex gap-4">
                  <div className="w-1/4 h-full bg-white rounded-lg border border-slate-200"></div>
                  <div className="w-3/4 h-full bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                    <div className="w-full h-4 bg-slate-50 rounded"></div>
                    <div className="w-2/3 h-4 bg-slate-50 rounded"></div>
                    <div className="w-full h-20 bg-blue-50 rounded mt-4"></div>
                  </div>
                </div>
              </BrowserWindow>
            </FadeIn>

            <FadeIn delay={300} className="h-full">
              <BrowserWindow title="E-commerce Analytics" url="shop-insights.co">
                <div className="w-full h-full bg-slate-100 p-4 space-y-3">
                  <div className="flex justify-between">
                    <div className="w-20 h-6 bg-white rounded"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-full h-full bg-white rounded-lg border border-slate-200"></div>
                </div>
              </BrowserWindow>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- ENGAGEMENT MODELS --- */}
      <section id="pricing" className="py-32 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tighter mb-4 text-slate-900">Engagement Models.</h2>
              <p className="text-slate-500">Transparent packages designed for speed and impact.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto h-auto md:h-[600px]">
            <FadeIn delay={100} className="h-full">
              <PackageCard
                title="The POC Sprint"
                days="14"
                subtitle="Validate your core idea technically."
                price="Start Up"
                features={[
                  "Custom-designed landing page",
                  "Core Logic Validation",
                  "Authentication & Database",
                  "Functional Prototype",
                  "14-Day Delivery Guarantee"
                ]}
                recommended={false}
              />
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <PackageCard
                title="The MVP Sprint"
                days="21"
                subtitle="Go live with a market-ready product."
                price="Scale Up"
                features={[
                  "Everything in POC Sprint",
                  "Full Production Deployment",
                  "Stripe Payments Integration",
                  "SEO & Analytics Setup",
                  "First Customer Onboarding",
                  "21-Day Delivery Guarantee"
                ]}
                recommended={true}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white font-bold text-xl font-serif italic">S</span>
            </div>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
              <strong>ScaleX Studio</strong><br />
              The MVP Agency for the AI Era.<br />
              San Francisco, CA
            </p>
          </div>

          <div className="flex gap-12 text-sm font-bold text-slate-900">
            <a href="#" className="hover:text-blue-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="mailto:build@scalex.studio" className="hover:text-blue-600 transition-colors">build@scalex.studio</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 text-xs text-slate-400 flex justify-between font-mono">
          <span>© 2024 ScaleX Studio. All rights reserved.</span>
          <span>Probability = e^x</span>
        </div>
      </footer>

      {/* Cal.com Modal */}
      {calModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-opacity p-4"
          onClick={() => setCalModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Schedule Call</h3>
              <button
                onClick={() => setCalModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 min-h-0 bg-white">
              <iframe
                src="https://cal.com/rishabh-jangid-jvj8qi"
                className="w-full h-full border-0"
                title="Book a meeting"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}