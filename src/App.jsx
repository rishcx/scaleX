import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
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
  Wrench
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

const ExponentialSuccessGraph = () => {
  const [week, setWeek] = useState(0);
  const containerRef = useRef(null);

  // Smooth Animation Loop
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setWeek(prev => {
        // Reset cleanly at end
        if (prev >= 12) return 0;
        return prev + 0.03; // Slightly faster for better flow
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const width = 800;
  const height = 400;
  const padding = 80; // Increased padding to prevent edge clipping

  const getLinearY = (w) => (w / 12) * (height * 0.35);
  const getExponentialY = (w) => {
    const growth = Math.exp(w * 0.38) - 1;
    const maxGrowth = Math.exp(12 * 0.38) - 1;
    return (growth / maxGrowth) * (height * 0.75);
  };

  const generatePath = (type) => {
    let d = `M ${padding} ${height - padding}`;
    for (let w = 0; w <= 12; w += 0.1) {
      const x = padding + (w / 12) * (width - 2 * padding);
      const y = height - padding - (type === 'linear' ? getLinearY(w) : getExponentialY(w));
      d += ` L ${x} ${y}`;
    }
    return d;
  };

  const currentX = padding + (week / 12) * (width - 2 * padding);
  const currentExpY = height - padding - getExponentialY(week);

  // Live numbers
  const rawProb = Math.min(99.9, (Math.exp(week * 0.4) - 1) * 2.2);
  const displayProb = rawProb.toFixed(2);
  const displayVelocity = Math.exp(week * 0.2).toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-12 px-4">
      {/* REMOVED overflow-hidden to allow tooltip to extend beyond bounds if needed */}
      <div className="bg-white border border-slate-200 rounded-3xl p-1 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] relative group">

        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-8 flex flex-col md:flex-row justify-between items-start md:items-center z-20 pointer-events-none">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 text-blue-600 text-[10px] font-mono font-bold uppercase tracking-widest border border-blue-50 bg-blue-50/50 px-3 py-1.5 rounded-full">
              <Activity className="w-3 h-3" />
              Live Projection
            </div>
            <h3 className="text-2xl text-slate-900 font-bold tracking-tight">Velocity Delta</h3>
          </div>

          <div className="mt-4 md:mt-0 bg-white/80 backdrop-blur-md border border-slate-100 rounded-lg px-4 py-2 shadow-sm flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</span>
            <div className="w-px h-3 bg-slate-300"></div>
            <span className="text-xs font-mono font-bold text-slate-700">Week {week.toFixed(1)}</span>
          </div>
        </div>

        {/* The Graph Visual */}
        {/* Added rounded-3xl and overflow-hidden HERE to clip the grid lines but NOT the tooltip if it floats out (tooltip is absolute in parent? no wait tooltip is inside here) */}
        {/* Correction: The tooltip is inside this div. I will remove overflow-hidden from THIS div too, and apply border-radius via a background mask or separate container if needed. 
            Actually, the safest way is to keep overflow-visible and ensure padding is sufficient. */}
        <div className="relative h-[500px] w-full bg-white rounded-3xl" ref={containerRef}>
          {/* Grid Background - Masked manually to respect rounded corners if needed, or just let it fill */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:80px_80px] rounded-3xl"></div>

          <svg preserveAspectRatio="none" width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 overflow-visible pointer-events-none">
            <defs>
              <linearGradient id="expGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Axes */}
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#F1F5F9" strokeWidth="2" />
            <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#F1F5F9" strokeWidth="2" />

            {/* Linear Ghost */}
            <path d={generatePath('linear')} fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
            <text x={width - padding - 10} y={height - padding - getLinearY(12) - 10} textAnchor="end" fill="#94A3B8" fontSize="11" fontWeight="500" fontFamily="sans-serif">Standard Agency</text>

            {/* Exponential Curve */}
            <path d={generatePath('exponential')} fill="url(#expGradientLight)" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" className="drop-shadow-md" />
            <text x={width - padding - 10} y={height - padding - getExponentialY(12) - 15} textAnchor="end" fill="#2563EB" fontSize="14" fontWeight="800" fontFamily="sans-serif">ScaleX (e^x)</text>

            {/* Scanner Line & Dot (Animated) */}
            <line
              x1={currentX} y1={padding} x2={currentX} y2={height - padding}
              stroke="#2563EB" strokeWidth="1" strokeOpacity="0.15"
              style={{ transition: 'x1 0.1s linear, x2 0.1s linear' }}
            />
            <circle
              cx={currentX} cy={currentExpY} r="6"
              fill="#2563EB" stroke="white" strokeWidth="2"
              style={{ transition: 'cx 0.1s linear, cy 0.1s linear' }}
            />
          </svg>

          {/* Precision Data Overlay */}
          <div
            className="absolute z-30 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-1 pointer-events-none p-6 min-w-[200px]"
            style={{
              left: `${(currentX / width) * 100}%`,
              top: `${(currentExpY / height) * 100}%`,
              // Smart positioning: flip to left after week 6, smooth transition
              transform: `translate(${week > 6 ? '-110%' : '10%'}, -50%)`,
              transition: 'left 0.1s linear, top 0.1s linear, transform 0.3s ease-out'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse`}></div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Exponential Probability</span>
            </div>

            <div className="text-5xl font-bold text-slate-900 tabular-nums leading-none tracking-tighter">
              {displayProb}%
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Velocity Factor</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {displayVelocity}x
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  <div className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
    {/* Top Border Accent */}
    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${color}`}></div>

    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
  <div className={`relative p-8 rounded-3xl border flex flex-col h-full ${recommended ? 'bg-slate-900 text-white border-slate-800 shadow-2xl' : 'bg-white text-slate-900 border-slate-200'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
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

    <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${recommended ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
      Start {days}-Day Sprint
    </button>
  </div>
)

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
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto mt-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-600 mb-8 uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Accepting Q4 Projects
            </div>

            <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-slate-900 mb-8 leading-[0.95] -ml-1">
              BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">MVP</span> <br />
              AND GET YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">FIRST CUSTOMERS</span> <br />
              IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">21 DAYS</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              We build your MVP fast and help you <span className="text-slate-900 font-medium">market it</span>, turning your vision into a <span className="text-slate-900 font-medium">validated business</span> with rapid market entry.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <button onClick={() => setCalModalOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-900/10 group">
                Book Your Sprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                View Architecture
              </button>
            </div>
          </div>

          {/* EXPONENTIAL GRAPH */}
          <ExponentialSuccessGraph />

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

      {/* --- CAPABILITIES --- */}
      <section id="capabilities" className="py-32 bg-slate-50/50 border-t border-slate-200 relative">
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
              />
            </FadeIn>
            <FadeIn delay={200} className="h-full">
              <ServiceCard
                title="MVP Development"
                desc="Get your minimum viable product built and launched in 2 weeks. We help you validate quickly."
                icon={Code2}
                color="bg-blue-500"
              />
            </FadeIn>
            <FadeIn delay={300} className="h-full">
              <ServiceCard
                title="Maintenance"
                desc="Keep your product running smoothly with our ongoing support. Bug fixes, updates, and improvements."
                icon={Wrench}
                color="bg-orange-500"
              />
            </FadeIn>
            <FadeIn delay={400} className="h-full">
              <ServiceCard
                title="Custom"
                desc="Have something unique in mind? Let's build a tailored solution that fits your vision perfectly."
                icon={PenTool}
                color="bg-pink-500"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- ALTERNATING PROCESS TIMELINE --- */}
      <section id="process" className="py-32 bg-white border-y border-slate-100 relative overflow-hidden">
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
      <section id="pricing" className="py-32 bg-white border-t border-slate-200">
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