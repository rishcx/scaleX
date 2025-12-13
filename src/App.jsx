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
import scalexLogo from './assets/scalex-logo.png';

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
  <div className="flex items-center group cursor-pointer select-none relative">
    <img 
      src={scalexLogo} 
      alt="ScaleX Logo" 
      className="h-12 w-auto group-hover:opacity-90 transition-opacity"
    />
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

// --- COMPONENT: SUMMONLM LOGO ---
const SummonLMLogo = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central Circle */}
    <circle cx="16" cy="16" r="4" fill="#0f172a" />

    {/* 8 Arrows pointing outward */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
      const rad = (angle * Math.PI) / 180;
      const startX = 16 + 4 * Math.cos(rad);
      const startY = 16 + 4 * Math.sin(rad);
      const endX = 16 + 12 * Math.cos(rad);
      const endY = 16 + 12 * Math.sin(rad);
      const arrowHeadX = 16 + 14 * Math.cos(rad);
      const arrowHeadY = 16 + 14 * Math.sin(rad);

      // Arrow head points
      const arrowAngle1 = ((angle - 20) * Math.PI) / 180;
      const arrowAngle2 = ((angle + 20) * Math.PI) / 180;
      const headX1 = arrowHeadX - 1.5 * Math.cos(arrowAngle1);
      const headY1 = arrowHeadY - 1.5 * Math.sin(arrowAngle1);
      const headX2 = arrowHeadX - 1.5 * Math.cos(arrowAngle2);
      const headY2 = arrowHeadY - 1.5 * Math.sin(arrowAngle2);

      return (
        <g key={idx}>
          {/* Arrow line */}
          <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Arrow head */}
          <path d={`M ${arrowHeadX} ${arrowHeadY} L ${headX1} ${headY1} L ${headX2} ${headY2} Z`} fill="#0f172a" />
          {/* Small circle at base */}
          <circle cx={startX} cy={startY} r="1" fill="#0f172a" />
        </g>
      );
    })}
  </svg>
);

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

// --- COMPONENT: TESTIMONIAL CARD ---
const TestimonialCard = ({ quote, name, role, company, credentials, initials, type = "client" }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
    {/* Badge */}
    <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${type === "client"
        ? "bg-blue-50 text-blue-700 border border-blue-200"
        : "bg-purple-50 text-purple-700 border border-purple-200"
      }`}>
      {type === "client" ? "Client" : "Consultant"}
    </div>

    {/* Quote */}
    <div className="mb-6 flex-1">
      <svg className="w-8 h-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-slate-700 text-lg leading-relaxed font-medium">{quote}</p>
    </div>

    {/* Author Info */}
    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${type === "client"
          ? "bg-gradient-to-br from-blue-500 to-indigo-600"
          : "bg-gradient-to-br from-purple-500 to-pink-600"
        }`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-slate-900">{name}</div>
        <div className="text-sm text-slate-600">{role}</div>
        {credentials && (
          <div className="text-xs text-slate-500 mt-1">{credentials}</div>
        )}
      </div>
    </div>
  </div>
)

// --- COMPONENT: PRICING / PACKAGE CARD ---
const PackageCard = ({ title, days, price, subtitle, features, recommended, guarantee }) => (
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
      {guarantee && (
        <div className="text-emerald-500 text-xs font-bold mt-2">
          {guarantee}
        </div>
      )}
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
const TimelineStep = ({ day, title, desc, icon: Icon, tags, side, tagColor = "blue", iconColor = null }) => {
  const tagColorClasses = {
    blue: {
      tagBg: "bg-blue-50/60",
      tagText: "text-blue-700"
    },
    purple: {
      tagBg: "bg-purple-50/60",
      tagText: "text-purple-700"
    },
    pink: {
      tagBg: "bg-pink-50/60",
      tagText: "text-pink-700"
    },
    green: {
      tagBg: "bg-green-50/60",
      tagText: "text-green-700"
    },
    indigo: {
      tagBg: "bg-indigo-50/60",
      tagText: "text-indigo-700"
    },
    slate: {
      tagBg: "bg-slate-50/60",
      tagText: "text-slate-700"
    },
    emerald: {
      tagBg: "bg-emerald-50/60",
      tagText: "text-emerald-700"
    }
  };

  const iconColorClasses = {
    blue: {
      iconBg: "bg-blue-600",
      iconText: "text-white"
    },
    purple: {
      iconBg: "bg-purple-600",
      iconText: "text-white"
    },
    pink: {
      iconBg: "bg-pink-600",
      iconText: "text-white"
    },
    green: {
      iconBg: "bg-green-600",
      iconText: "text-white"
    },
    indigo: {
      iconBg: "bg-indigo-600",
      iconText: "text-white"
    },
    slate: {
      iconBg: "bg-slate-700",
      iconText: "text-white"
    },
    emerald: {
      iconBg: "bg-emerald-600",
      iconText: "text-white"
    }
  };

  const tagColors = tagColorClasses[tagColor] || tagColorClasses.blue;
  const finalIconColor = iconColor || tagColor;
  const iconColors = iconColorClasses[finalIconColor] || iconColorClasses.blue;

  return (
    <FadeIn>
      <div className={`flex flex-col md:flex-row items-start relative w-full ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>

        {/* 1. TEXT CONTENT SIDE */}
        <div className={`md:w-1/2 flex flex-col ${side === 'right' ? 'md:items-start md:text-left md:pl-8' : 'md:items-end md:text-right md:pr-8'}`}>
          <div className={`mb-3 ${side === 'right' ? 'self-start' : 'self-end'}`}>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-slate-50/60 text-slate-700">
              {day}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md mb-4">
            {desc}
          </p>
          <div className={`flex flex-wrap gap-2 ${side === 'right' ? 'justify-start' : 'justify-end'}`}>
            {tags.map(t => (
              <span key={t} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded ${tagColors.tagBg} ${tagColors.tagText}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 2. CENTER ICON NODE */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-10 hidden md:flex">
          <div className={`w-10 h-10 rounded-full ${iconColors.iconBg} flex items-center justify-center relative z-20 shadow-lg ring-4 ring-white`}>
            <Icon className={`w-5 h-5 ${iconColors.iconText}`} />
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
        className="absolute w-full h-full opacity-20"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl -z-20 opacity-40 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl -z-20 opacity-40 mix-blend-multiply"></div>

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
              <a href="#process" className="bg-white/80 backdrop-blur-sm text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-white transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1">
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


      {/* --- CAPABILITIES --- */}
      <section id="capabilities" className="py-32 bg-slate-50/50 border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"></div>

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

      {/* --- PROCESS TIMELINE --- */}
      <section id="process" className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl -z-10 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                THE 28-DAY FOUNDER SPRINT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-slate-900">
                From Idea to Revenue <br />
                <span className="text-blue-600">in 4 Weeks.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Central Timeline Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-8 md:space-y-10">

              <TimelineStep
                day="DAY 0"
                side="left"
                title="The Brain Dump"
                desc="Strategy & Discovery. We extract your vision, challenge your assumptions, and define the absolute minimum viable product."
                icon={MessageSquare}
                tags={['STRATEGY', 'SCOPE']}
                tagColor="blue"
                iconColor="blue"
              />

              <TimelineStep
                day="DAY 7"
                side="right"
                title="The 'Ugly' Demo"
                desc="Core Logic Validation. Ugly UI, but data saves and the logic works. You see your idea breathing for the first time."
                icon={Layout}
                tags={['VALIDATION', 'LOGIC']}
                tagColor="indigo"
                iconColor="indigo"
              />

              <TimelineStep
                day="DAY 14"
                side="left"
                title="The Decision Gate"
                desc="Go/No-Go. We deliver a functional POC. You decide: pivot, kill it, or double down and build the full MVP."
                icon={CheckCircle2}
                tags={['DECISION', 'POC']}
                tagColor="purple"
                iconColor="purple"
              />

              <TimelineStep
                day="DAY 21"
                side="right"
                title="The Polish"
                desc="Production Grade. We add Stripe payments, Authentication, Admin Dashboards, and world-class UI/UX."
                icon={PenTool}
                tags={['PAYMENTS', 'DESIGN']}
                tagColor="slate"
                iconColor="slate"
              />

              <TimelineStep
                day="DAY 28"
                side="left"
                title="The Launch"
                desc="Handover & Scale. Your business is open for business. We hand over the code, the keys, and the documentation."
                icon={Rocket}
                tags={['LAUNCH', 'SCALE']}
                tagColor="emerald"
                iconColor="emerald"
              />

            </div>
          </div>
        </div>
      </section>

      {/* --- WORK (Browser Style) --- */}
      <section id="work" className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-slate-900">Explore Our Work.</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Real projects, real results. See what we've built for startups just like yours.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <FadeIn delay={100}>
              <BrowserWindow title="SummonLM - GEO Platform" url="http://summonlm.com">
                <div className="w-full h-full bg-white p-6 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <SummonLMLogo className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Project</div>
                        <div className="text-base font-bold text-slate-900">SummonLM</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                      Summon your brand in <span className="text-blue-600">LLM responses</span>
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Let's ensure your brand dominates the new age of AI-powered search. Own the future of traffic and conversions by appearing in LLM responses.
                    </p>
                  </div>

                  {/* Dashboard Preview */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="text-xs font-bold text-slate-700">Live Dashboard</div>
                      </div>
                    </div>

                    {/* AI Mentions */}
                    <div className="mb-5 p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">AI Mentions</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-black text-slate-900">2.5K+</div>
                        <div className="text-xs text-green-600 font-bold">+340% ↑</div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">AI Mentions</div>
                    </div>

                    {/* LLM Models */}
                    <div className="mb-5">
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">LLM Models</div>
                      <div className="flex flex-wrap gap-2">
                        {['OpenAI', 'Gemini', 'Perplexity', 'Claude', 'Grok'].map((model, idx) => (
                          <div key={idx} className="px-2.5 py-1 bg-white rounded-md border border-slate-200">
                            <span className="text-xs font-semibold text-slate-700">{model}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* GEO Performance */}
                    <div>
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">GEO Performance</div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-slate-700">Brand Mentions</span>
                            <span className="text-xs font-bold text-slate-900">85%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-slate-700">Positive Sentiment</span>
                            <span className="text-xs font-bold text-slate-900">72%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-semibold text-slate-700">Citation Quality</span>
                            <span className="text-xs font-bold text-slate-900">68%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BrowserWindow>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-32 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tighter mb-4 text-slate-900">What Our Clients & Consultants Say.</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Real feedback from founders who've worked with us, and the world-class consultants helping us grow.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={100}>
              <TestimonialCard
                quote="ScaleX built our POC end-to-end. The speed and quality were exceptional. We are extremely happy with the product."
                name="IIT"
                role="Co-founder @ SummonLM"
                credentials="Ex-Meesho | Ex-Flipkart | IIT Roorkee'23"
                initials="IIT"
                type="client"
              />
            </FadeIn>

            <FadeIn delay={200}>
              <TestimonialCard
                quote="World-Class Team"
                name="Aayush Agarwal"
                role="Inito"
                credentials="Ex-Groww | CFA L3 Cleared"
                initials="AA"
                type="consultant"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- ENGAGEMENT MODELS --- */}
      <section id="pricing" className="py-32 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-slate-100/30 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>

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
                title="POC Sprint"
                days="14"
                subtitle="Validate your core idea technically."
                price="$499"
                guarantee="14-day delivery or we work free."
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
                title="MVP Sprint"
                days="21"
                subtitle="Go live with a market-ready product."
                price="$899"
                guarantee="Launch guarantee"
                features={[
                  "Everything in POC Sprint",
                  "Full Production Deployment",
                  "Stripe Payments Integration",
                  "SEO & Analytics Setup",
                  "First Customer Onboarding",
                  "28-Day Delivery Guarantee"
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
            </p>
          </div>

          <div className="flex gap-12 text-sm font-bold text-slate-900">
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="mailto:admin@scalex.studio" className="hover:text-blue-600 transition-colors">admin@scalex.studio</a>
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
                src="https://cal.com/adminscalex"
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