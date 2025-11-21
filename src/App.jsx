import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Zap,
  Rocket,
  Layers,
  CheckCircle2,
  Mail,
  Globe,
  Shield,
  ChevronDown,
  Code,
  Cpu,
  Smartphone
} from 'lucide-react';

// --- Safe 3D Rocket Component (Pure CSS - Crash Proof) ---

const CssRocket = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      {/* Glow Effect Background */}
      <div className="absolute w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full animate-pulse" />

      {/* Rocket Container with Float Animation */}
      <div className="relative w-48 h-80 animate-[float_6s_ease-in-out_infinite] z-10">

        {/* Rocket SVG */}
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl filter">
          <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3f4f6" /> {/* Gray-100 */}
              <stop offset="50%" stopColor="#e5e7eb" /> {/* Gray-200 */}
              <stop offset="100%" stopColor="#d1d5db" /> {/* Gray-300 */}
            </linearGradient>
            <linearGradient id="rocketFin" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" /> {/* Orange-500 */}
              <stop offset="100%" stopColor="#dc2626" /> {/* Red-600 - matching text gradient */}
            </linearGradient>
            <linearGradient id="windowGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Left Fin */}
          <path d="M40 280 L0 360 L50 340 Z" fill="url(#rocketFin)" />

          {/* Right Fin */}
          <path d="M160 280 L200 360 L150 340 Z" fill="url(#rocketFin)" />

          {/* Main Body */}
          <path d="M100 40 C100 40 160 120 160 280 L100 300 L40 280 C40 120 100 40 100 40 Z" fill="url(#rocketBody)" />

          {/* Body details/seams */}
          <path d="M40 280 Q100 320 160 280" fill="none" stroke="#9ca3af" strokeWidth="1" />

          {/* Center Fin/Spine */}
          <rect x="98" y="150" width="4" height="140" fill="#9ca3af" opacity="0.5" />

          {/* Window */}
          <circle cx="100" cy="140" r="25" fill="#e5e7eb" stroke="#4b5563" strokeWidth="4" />
          <circle cx="100" cy="140" r="20" fill="url(#windowGlass)" />

          {/* Reflection on Window */}
          <path d="M90 130 Q95 125 105 130" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        </svg>

        {/* Engine Flames */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center">
          {/* Core Flame */}
          <div className="w-8 h-24 bg-orange-400 rounded-full blur-sm animate-[flame_0.2s_infinite_alternate] origin-top" />
          {/* Outer Glow */}
          <div className="absolute top-0 w-16 h-32 bg-red-500/40 rounded-full blur-md animate-[flame_0.4s_infinite_alternate-reverse] origin-top" />
        </div>
      </div>

      {/* Smoke Particles */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-0"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              animation: `smoke 2s infinite linear`,
              animationDelay: `${Math.random() * 2}s`,
              left: `${Math.random() * 40 - 20}px`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes flame {
          0% { transform: scaleY(1); opacity: 0.9; }
          100% { transform: scaleY(0.8); opacity: 0.6; }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scale(0.5); opacity: 0.5; }
          100% { transform: translateY(100px) scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- UI Components ---

const BookingModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
              X
            </div>
            <span className="font-bold text-gray-900">Schedule Call</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Cal.com Embed */}
        <div className="flex-1 w-full bg-gray-50">
          <iframe
            src="https://cal.com/rishabh-jangid-jvj8qi" // REPLACE WITH YOUR CAL.COM LINK
            className="w-full h-full border-0"
            title="Book a call"
          />
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onBookCall }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              X
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">scaleX</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#process" className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors">Process</a>
            <a href="#work" className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors">Work</a>
            <a href="#capabilities" className="text-gray-600 hover:text-orange-600 font-medium text-sm transition-colors">Capabilities</a>
            <button
              onClick={onBookCall}
              className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/10 hover:shadow-orange-500/30"
            >
              Book Strategy Call
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full p-6 shadow-xl animate-in slide-in-from-top-5 z-40">
          <div className="flex flex-col space-y-4">
            <a href="#process" className="text-lg font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
            <a href="#work" className="text-lg font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
            <a href="#capabilities" className="text-lg font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookCall();
              }}
              className="bg-orange-600 text-white py-4 rounded-xl font-bold"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onBookCall }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-gray-50 pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col items-start space-y-8 animate-in slide-in-from-left duration-700">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">
                Strategy
              </span>
              <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 shadow-sm">
                Engineering
              </span>
              <span className="px-4 py-1.5 bg-orange-100 border border-orange-200 rounded-full text-xs font-bold uppercase tracking-widest text-orange-700 flex items-center gap-2 shadow-sm">
                <Zap size={14} fill="currentColor" /> Growth
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
              We build <br />
              <span className="relative inline-block">
                digital products
                {/* Small SVG Star Icon decoration */}
                <svg className="absolute -top-6 -right-10 w-10 h-10 text-orange-500 animate-[spin_4s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </span>
              <br />
              that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 italic">scale.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              From MVP to IPO. We are the engineering team behind the fastest growing startups in the valley. 100% US-aligned.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <button
                onClick={onBookCall}
                className="group bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-2xl shadow-gray-900/20 hover:shadow-orange-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Start Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-orange-500 hover:text-orange-500 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                View Case Studies
              </button>
            </div>
          </div>

          {/* Right Column: Animated Rocket */}
          <div className="h-[400px] lg:h-[600px] w-full flex items-center justify-center animate-in fade-in duration-1000 delay-200">
            <CssRocket />
          </div>

        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group hover:-translate-y-1">
    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const Process = () => (
  <section id="process" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 mb-4">The Protocol</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Our military-grade engineering process designed to minimize risk.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Zap}
          title="Rapid POC"
          desc="14-day sprint to validate core logic. We build the ugly but functional version to prove the concept before burning cash."
        />
        <FeatureCard
          icon={Rocket}
          title="MVP Launch"
          desc="Full scale build with security, auth, and payments. Ready for real users and revenue generation."
        />
        <FeatureCard
          icon={Layers}
          title="Scale Ops"
          desc="Long-term maintenance and scaling. We handle the infrastructure while you grow the business."
        />
      </div>
    </div>
  </section>
);

const Work = () => (
  <section id="work" className="py-24 bg-gray-50 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Selected Work</h2>
          <p className="text-gray-500 max-w-lg">We don't just build software; we build businesses. Here are a few of our recent exits and scaling stories.</p>
        </div>
        <button className="text-orange-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
          View all projects <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group relative h-96 rounded-3xl overflow-hidden shadow-md cursor-pointer">
            {/* Lighter gradient overlay with mix-blend-overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item === 1 ? 'from-blue-400 to-purple-400' : item === 2 ? 'from-emerald-400 to-teal-400' : 'from-orange-400 to-red-400'} mix-blend-overlay opacity-40 z-10`} />

            {/* New lighter theme images */}
            <img
              src={`https://images.unsplash.com/photo-${item === 1 ? '1460925895917-afdab827c52f' : item === 2 ? '1505751172876-fa1923c5c528' : '1454165804606-c3d57bc86b40'}?auto=format&fit=crop&w=800&q=80`}
              alt="Project"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between text-white">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-4 group-hover:translate-y-0 duration-300">
                <span className="px-3 py-1 border border-white/30 rounded-full text-xs font-bold backdrop-blur-sm">FINTECH</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Project Alpha</h3>
                <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Redefining the future of payments with blockchain integration and AI-driven fraud detection.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Capabilities = () => (
  <section id="capabilities" className="py-24 bg-gray-900 text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black mb-6">Full-Stack Capabilities</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We are stack agnostic but opinionated. We choose the right tools for the scale you need to achieve. No bloat, just performance.
          </p>

          <div className="space-y-6">
            {[
              { icon: Code, title: "Frontend Engineering", desc: "React, Next.js, TypeScript, Tailwind, Framer Motion" },
              { icon: Cpu, title: "Backend & Infrastructure", desc: "Node.js, Python, Go, AWS, Kubernetes, Supabase" },
              { icon: Smartphone, title: "Mobile Native", desc: "React Native, iOS Swift, Android Kotlin" }
            ].map((cap, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                  <cap.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{cap.title}</h4>
                  <p className="text-gray-500 text-sm">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs font-mono text-gray-500">deploy.sh</div>
          </div>
          <div className="font-mono text-sm space-y-2 text-gray-400">
            <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> initialize_project --scale=high</p>
            <p className="text-white">Initializing ScaleX Engine v2.0...</p>
            <p>Loading modules:</p>
            <div className="pl-4 border-l-2 border-white/10 ml-1 my-2">
              <p>✓ Analytics........<span className="text-green-400">Ready</span></p>
              <p>✓ Security.........<span className="text-green-400">Ready</span></p>
              <p>✓ Scalability......<span className="text-green-400">Optimized</span></p>
            </div>
            <p><span className="text-green-400">➜</span> Deploying to production...</p>
            <p className="animate-pulse text-blue-400">Waiting for command_</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold">X</div>
          <span className="text-2xl font-bold">scaleX</span>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-400 mb-2">Ready to build something great?</p>
          <a href="mailto:hello@scalex.studio" className="text-xl font-bold hover:text-blue-500 transition-colors">hello@scalex.studio</a>
        </div>
      </div>
      <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2024 ScaleX. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 bg-gray-50">
      <Navbar onBookCall={openBooking} />
      <Hero onBookCall={openBooking} />
      <Process />
      <Work />
      <Capabilities />
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default App;