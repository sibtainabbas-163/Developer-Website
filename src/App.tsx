/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Mail,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Globe,
  Award,
  Send,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Sliders,
  Database,
  Terminal,
  MessageSquare
} from 'lucide-react';

// Timezone configuration for the live footer clock
const locales = [
  { id: 'london', name: 'LONDON, UK', tz: 'Europe/London', label: 'BST/GMT' },
  { id: 'new-york', name: 'NEW YORK, US', tz: 'America/New_York', label: 'EDT/EST' },
  { id: 'tokyo', name: 'TOKYO, JP', tz: 'Asia/Tokyo', label: 'JST' },
  { id: 'san-francisco', name: 'SAN FRANCISCO, US', tz: 'America/Los_Angeles', label: 'PDT/PST' },
  { id: 'sydney', name: 'SYDNEY, AU', tz: 'Australia/Sydney', label: 'AEST/AEDT' }
];

// Interactive projects list for the portfolio
const projects = [
  {
    id: 'aether-ui',
    title: "Aether UI Kit",
    subtitle: "A spatial design system for next-gen interfaces.",
    description: "Designing layout patterns, gaze indicators, and 3D glassmorphic controls for spatial devices. Engineered with responsive layouts and WebGL background components.",
    category: "FEATURED WORK",
    gradient: "from-[#7C3AED] to-[#0A051A]",
    icon: "✧",
    techs: ["WebXR", "GLSL Shaders", "React Canvas"]
  },
  {
    id: 'hyperion',
    title: "Hyperion Engine",
    subtitle: "Real-time 3D GPU-driven graphic visualizer.",
    description: "A state-of-the-art rendering environment utilizing WebGL & WebGPU to represent multi-layered geospatial datasets with low-latency particle rendering.",
    category: "GRAPHICS SYSTEMS",
    gradient: "from-cyan-500 to-slate-950",
    icon: "◈",
    techs: ["Three.js", "WebGPU", "TypeScript"]
  },
  {
    id: 'chronos',
    title: "Chronos Console",
    subtitle: "Telemetry dashboard for quantum simulation.",
    description: "An experimental interactive interface monitoring quantum coherence, telemetry, and network activity with real-time reactive nodes.",
    category: "EXPERIMENTAL UI",
    gradient: "from-rose-500 to-violet-950",
    icon: "⚡",
    techs: ["D3.js", "WebSockets", "TailwindCSS"]
  }
];

// Experience entries
const workHistory = [
  {
    role: "Lead Creative Architect",
    company: "Spatial Labs",
    period: "2024 - PRESENT",
    description: "Architecting high-performance spatial environments, interactive 3D interfaces, and custom design languages for upcoming headsets."
  },
  {
    role: "Senior Creative Technologist",
    company: "Apple",
    period: "2021 - 2024",
    description: "Engineered high-fidelity design-to-code prototypes and collaborated with visual teams to refine micro-interactions on VisionOS."
  },
  {
    role: "UI Engineer",
    company: "Vercel",
    period: "2018 - 2021",
    description: "Developed UI optimization systems, fast layout patterns, and robust open-source library modules for creative front-end applications."
  },
  {
    role: "Interactive Developer",
    company: "Freelance / Agency",
    period: "2015 - 2018",
    description: "Built tailored digital experiences, 3D portfolios, and bespoke motion graphics engines for award-winning international projects."
  }
];

// Skill specifications
const skillDetails: Record<string, { label: string; details: string; level: number; tools: string[] }> = {
  'Web3': {
    label: 'Decentralized Architecture',
    details: 'Decentralized identity mapping, zero-knowledge states, and persistent blockchain event-listeners.',
    level: 92,
    tools: ['Ethers.js', 'Solidity', 'IPFS']
  },
  'Three.js': {
    label: 'Creative Coding & GLSL',
    details: 'Custom fragment shader mathematical computations, interactive point clouds, and canvas physics engines.',
    level: 96,
    tools: ['Three.js', 'React Three Fiber', 'GLSL']
  },
  'UI/UX': {
    label: 'Spatial Product Design',
    details: 'Precision typography pairings, responsive fluid margins, glassmorphism layouts, and interactive micro-animations.',
    level: 98,
    tools: ['Figma', 'Systemic Layouts', 'Design Systems']
  },
  'Motion': {
    label: 'Interaction Animation',
    details: 'Spring physics, hardware-accelerated layouts, gestural feedback animations, and transition timings.',
    level: 94,
    tools: ['framer-motion', 'CSS Paint API', 'Web Animations']
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('works');
  
  // Projects slider index
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const currentProject = projects[projectIndex];

  // Live timezone state
  const [localeIndex, setLocaleIndex] = useState<number>(0);
  const currentLocale = locales[localeIndex];
  const [currentTime, setCurrentTime] = useState<string>('');

  // Hover states for interactions
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Contact Form & Local Storage persistence
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Spatial UI Design',
    budget: '$5,000 - $10,000',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [sentMessages, setSentMessages] = useState<any[]>([]);

  // Load saved client-side contacts
  useEffect(() => {
    const saved = localStorage.getItem('alex_studio_contacts');
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading storage:", e);
      }
    }
  }, []);

  // Sync clock based on timezone index
  useEffect(() => {
    const updateTime = () => {
      const locale = locales[localeIndex];
      try {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: locale.tz,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setCurrentTime(formatter.format(date));
      } catch (e) {
        // Fallback to local system time
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [localeIndex]);

  // Handle contact submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    // Simulate interactive transmission with brief loading latency
    setTimeout(() => {
      const payload = {
        id: 'msg-' + Date.now(),
        ...formData,
        dateString: new Date().toLocaleDateString(),
        timeString: new Date().toLocaleTimeString()
      };

      const updated = [payload, ...sentMessages];
      setSentMessages(updated);
      localStorage.setItem('alex_studio_contacts', JSON.stringify(updated));

      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset text inputs but preserve selections
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        message: ''
      }));
    }, 1200);
  };

  const handleClearInquiries = () => {
    setSentMessages([]);
    localStorage.removeItem('alex_studio_contacts');
  };

  const cycleTimezone = () => {
    setLocaleIndex((prev) => (prev + 1) % locales.length);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col p-4 sm:p-6 md:p-8 overflow-x-hidden bg-[#05010d] text-white selection:bg-[#7C3AED] selection:text-white">
      {/* Immersive Glowing Background Blobs */}
      <div id="bg-glow-top" className="glow -top-32 -left-32 sm:-top-20 sm:-left-20" />
      <div id="bg-glow-bottom" className="glow -bottom-32 -right-32 sm:-bottom-20 sm:-right-20" />
      <div id="bg-glow-center" className="glow top-1/2 left-1/3 opacity-40" />

      {/* Main Content Layout Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        
        {/* Header Navigation Module */}
        <header id="portfolio-header" className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 md:mb-16">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('works')}
            className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center font-bold text-white shadow-lg shadow-[#7C3AED]/30 group-hover:bg-[#8B5CF6] transition-colors">
              A
            </div>
            <span className="font-bold tracking-tighter text-xl group-hover:accent-gradient transition-all">
              ALEX.STUDIO
            </span>
          </div>

          {/* Tab Navigation Menu */}
          <nav 
            id="main-navigation"
            className="glass glass-strong px-5 py-2 rounded-full flex gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
          >
            {(['works', 'experience', 'about', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                id={`nav-tab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  setIsSuccess(false); // Reset success pane when switching tabs
                }}
                className={`cursor-pointer transition-all hover:text-white min-h-[32px] px-2 ${
                  activeTab === tab ? 'text-[#7C3AED] font-black scale-105' : 'text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Hire Button */}
          <div id="hire-action">
            <button
              id="header-hire-button"
              onClick={() => {
                setActiveTab('contact');
                setIsSuccess(false);
                setFormData(prev => ({
                  ...prev,
                  message: "Hi Alex, I would like to hire you for " + formData.service + "."
                }));
              }}
              className="px-5 py-2 rounded-lg border border-[#7C3AED] text-[#7C3AED] text-xs font-bold hover:bg-[#7C3AED] hover:text-white transition-all shadow-lg shadow-[#7C3AED]/10 hover:shadow-[#7C3AED]/30 active:scale-95 cursor-pointer min-h-[40px] uppercase tracking-wider"
            >
              HIRE ME
            </button>
          </div>
        </header>

        {/* Interactive Main Sections */}
        <main id="portfolio-main-grid" className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* TAB 1: WORKS (The Default Hero Layout from Mockup) */}
          {activeTab === 'works' && (
            <>
              {/* Left Column: Bold Statement & Statistics */}
              <section id="works-hero-panel" className="lg:col-span-8 flex flex-col justify-center text-left">
                <h2 className="text-xs uppercase tracking-[0.4em] mb-4 text-[#7C3AED] font-black">
                  Digital Architect & Developer
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['UX Systems', 'Glassmorphism', 'Motion-led', 'Responsive'].map((tag) => (
                    <span key={tag} className="hero-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[110px] font-black leading-[0.85] tracking-tighter mb-6 select-none">
                  CRAFTING<br />
                  <span className="text-outline">IMMERSIVE</span><br />
                  <span className="accent-gradient">REALITIES.</span>
                </h1>
                <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-7 mb-8">
                  Building soft, luminous interfaces with tactile glassmorphism, motion-rich micro-interactions, and responsive UI systems that feel sculpted in code.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className="button-morph rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-2xl transition-all hover:scale-[1.01]"
                  >
                    LET'S CONNECT
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('experience')}
                    className="glass-soft rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-200 hover:text-white transition-all"
                  >
                    VIEW EXPERIENCE
                  </button>
                </div>

                <div className="code-panel glass-soft rounded-[32px] p-5 border border-white/10 shadow-[0_35px_80px_rgba(0,0,0,0.22)] mb-10 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#f97316]" />
                      <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                      <span className="h-2 w-2 rounded-full bg-[#34d399]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">CODE PREVIEW</span>
                  </div>
                  <div className="space-y-2 text-[11px] font-mono text-gray-300">
                    <div className="code-line"><span className="code-key">const</span> <span className="code-var">heroTheme</span> = <span className="code-value">{'{'}</span></div>
                    <div className="code-line indent-1"><span className="code-key">background</span>: <span className="code-value">'glassy'</span>,</div>
                    <div className="code-line indent-1"><span className="code-key">interaction</span>: <span className="code-value">'morph'</span>,</div>
                    <div className="code-line indent-1"><span className="code-key">motion</span>: <span className="code-value">'fluid'</span></div>
                    <div className="code-line"><span className="code-value">{'}'}</span>;</div>
                  </div>
                </div>

                {/* Interactive Metric Cards */}
                <div id="metrics-container" className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xl">
                  {[
                    { number: "08+", label: "Years XP", tip: "Over 8 years of engineering web tools, spatial components, and visual interactions." },
                    { number: "120", label: "Projects", tip: "Successfully delivered high-fidelity layouts, customized portals, and 3D graphics libraries." },
                    { number: "24", label: "Awards", tip: "Honored with design recognition for flawless layouts and spatial computing interactions." }
                  ].map((metric, i) => (
                    <div 
                      key={i}
                      id={`metric-card-${i}`}
                      onMouseEnter={() => setHoveredMetric(metric.label)}
                      onMouseLeave={() => setHoveredMetric(null)}
                      className="glass-soft rounded-[32px] p-4 sm:p-5 flex flex-col justify-center relative cursor-help transform transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className="text-2xl sm:text-4xl font-black text-[#7C3AED]">{metric.number}</span>
                      <span className="text-[9px] sm:text-[11px] uppercase opacity-60 tracking-widest font-bold mt-1">{metric.label}</span>
                      
                      {/* Interactive Hover Tooltip */}
                      {hoveredMetric === metric.label && (
                        <div className="absolute left-0 right-0 -bottom-16 bg-slate-950/95 border border-[#7C3AED]/30 p-2 rounded-lg text-[10px] text-gray-300 z-20 backdrop-blur-md shadow-xl animate-fade-in">
                          {metric.tip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Right Column: Featured Interactive Project & Interactive Skill Matrix */}
              <section id="works-featured-panel" className="lg:col-span-4 flex flex-col gap-6 w-full">
                
                {/* 1. Featured Project Card (Carousel) */}
                <div 
                  id={`project-card-${currentProject.id}`}
                  className="glass-strong rounded-[40px] p-6 relative overflow-hidden group border border-white/10"
                >
                  <div className="absolute top-4 right-4 text-[9px] text-[#7C3AED] font-mono tracking-widest font-black uppercase bg-[#7C3AED]/12 px-2 py-1 rounded-full backdrop-blur-sm">
                    {currentProject.category}
                  </div>
                  
                  <div className="mt-4 mb-4">
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-[#7C3AED] transition-colors">{currentProject.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">{currentProject.subtitle}</p>
                    <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed font-light">{currentProject.description}</p>
                  </div>

                  {/* Gradient Visual Representation with next/prev interactivity */}
                  <div className={`h-32 w-full bg-gradient-to-br ${currentProject.gradient} rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    <span className="text-4xl relative z-10 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] select-none">
                      {currentProject.icon}
                    </span>

                    {/* Skill Badges inside Gradient */}
                    <div className="absolute bottom-2 left-2 flex gap-1 z-10">
                      {currentProject.techs.map((t, idx) => (
                        <span key={idx} className="text-[8px] bg-black/40 text-gray-300 px-1.5 py-0.5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                      id="prev-project-btn"
                      title="Previous Project"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectIndex(prev => (prev - 1 + projects.length) % projects.length);
                      }}
                      className="absolute left-2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#7C3AED] flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-90"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button 
                      id="next-project-btn"
                      title="Next Project"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectIndex(prev => (prev + 1) % projects.length);
                      }}
                      className="absolute right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-[#7C3AED] flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-90"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Slider Indicators */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {projects.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setProjectIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === projectIndex ? 'w-6 bg-[#7C3AED]' : 'w-2 bg-gray-600'
                        }`}
                        title={`Go to project ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Interactive Tech Skills Grid */}
                <div id="skills-interactive-container" className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(skillDetails).map((skill) => (
                      <div 
                        key={skill}
                        id={`skill-badge-${skill}`}
                        onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`glass rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer transform transition-all duration-200 ${
                          selectedSkill === skill || hoveredSkill === skill
                            ? 'border-[#7C3AED]/80 bg-[#7C3AED]/10 -translate-y-0.5 shadow-md shadow-[#7C3AED]/5'
                            : 'border-white/5'
                        }`}
                      >
                        <span className="text-[#7C3AED] font-bold text-base">◈</span>
                        <span className="text-[10px] uppercase tracking-widest font-black">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Diagnostics Dynamic Panel */}
                  <div className="glass rounded-xl p-3 min-h-[70px] flex flex-col justify-center border border-white/5 bg-white/[0.01]">
                    {selectedSkill ? (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-[#d8b4fe] uppercase font-black tracking-wider">
                            {skillDetails[selectedSkill].label}
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                            {skillDetails[selectedSkill].level}% Core Depth
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-normal font-light">
                          {skillDetails[selectedSkill].details}
                        </p>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          {skillDetails[selectedSkill].tools.map((t, index) => (
                            <span key={index} className="text-[8px] bg-[#7C3AED]/20 text-[#d8b4fe] px-1 py-0.5 rounded font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : hoveredSkill ? (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-[#d8b4fe] uppercase font-black tracking-wider">
                            {skillDetails[hoveredSkill].label}
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                            {skillDetails[hoveredSkill].level}% Depth
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-normal font-light">
                          {skillDetails[hoveredSkill].details}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-500 italic text-center leading-normal font-light">
                        Click on any badge above to analyze skill diagnostics, technology tools, and level metrics.
                      </p>
                    )}
                  </div>
                </div>

              </section>
            </>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <>
              {/* Left Column: Bold Header and Curated Timeline */}
              <section id="experience-timeline-panel" className="lg:col-span-8 flex flex-col justify-center text-left">
                <h2 className="text-xs uppercase tracking-[0.4em] mb-4 text-[#7C3AED] font-black">
                  Professional Journey
                </h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[110px] font-black leading-[0.85] tracking-tighter mb-10 select-none">
                  CURATED<br />
                  <span className="text-outline">WORK</span><br />
                  <span className="accent-gradient">HISTORY.</span>
                </h1>

                {/* Experience List Container */}
                <div id="timeline-scroll-container" className="space-y-6 max-w-2xl pr-2 max-h-[400px] overflow-y-auto">
                  {workHistory.map((item, index) => (
                    <div 
                      key={index}
                      id={`experience-row-${index}`}
                      className="glass rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start gap-3 hover:border-[#7C3AED]/50 transition-all duration-300 border-l-4 border-l-[#7C3AED]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black tracking-tight">{item.role}</h3>
                          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-400 font-bold">
                            {item.company}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                        <span className="text-xs font-mono font-bold text-[#d8b4fe] bg-[#7C3AED]/10 px-2 py-0.5 rounded">
                          {item.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Right Column: Skill Radar Breakdown and Philosophy */}
              <section id="experience-stats-panel" className="lg:col-span-4 flex flex-col gap-6 w-full">
                
                {/* core philosophy block */}
                <div id="philosophy-card" className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                    <span>Product Creed</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    "Interfaces of tomorrow must transcend physical borders. My technical mission is focused on engineering micro-interactions that mimic natural physics, optimizing WebGL draw-calls to lock framerates at 120 FPS, and building robust design tokens that map flawlessly to dynamic hardware systems."
                  </p>
                </div>

                {/* Skill affinity breakdown bar chart */}
                <div id="skills-bars-card" className="glass rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">
                    Creative Capability Engine
                  </h3>
                  
                  <div className="space-y-3.5">
                    {[
                      { name: "3D Rendering & WebGL", percent: 95 },
                      { name: "React / State Architecture", percent: 98 },
                      { name: "Physics & Core Animation", percent: 92 },
                      { name: "Holographic UX & Typography", percent: 94 }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-gray-300 uppercase tracking-wider">{stat.name}</span>
                          <span className="text-[#7C3AED] font-bold">{stat.percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#d8b4fe] rounded-full transition-all duration-1000"
                            style={{ width: `${stat.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </section>
            </>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <>
              {/* Left Column: Bold Header and Bio */}
              <section id="about-intro-panel" className="lg:col-span-8 flex flex-col justify-center text-left">
                <h2 className="text-xs uppercase tracking-[0.4em] mb-4 text-[#7C3AED] font-black">
                  The Architect
                </h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[110px] font-black leading-[0.85] tracking-tighter mb-10 select-none">
                  CODE<br />
                  <span className="text-outline">MEETS</span><br />
                  <span className="accent-gradient">DESIGN.</span>
                </h1>

                {/* Extended Bio Card */}
                <div id="bio-container" className="glass rounded-2xl p-6 sm:p-8 max-w-2xl border border-white/10 space-y-4">
                  <p className="text-sm sm:text-base text-gray-100 font-medium leading-relaxed">
                    Hello, I'm Alex. A multidisciplinary developer and digital space architect dedicated to synthesizing raw aesthetic form with high-octane engineering systems.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    Believing that traditional, completely flat visual interfaces are reaching their conceptual limits, I design and construct spatial concepts that incorporate custom shaders, tactile feedback loops, and bold typography. Leveraging a dual education background in pure hardware systems and design layouts, I build modular code platforms that execute at peak performance.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Currently working with boutique creative laboratories, venture-backed tech firms, and industry giants to prototype and launch next-generation products. When not coding, I design hardware modular synthesizers and study responsive physical architectures.
                  </p>
                </div>
              </section>

              {/* Right Column: Labs Specifications */}
              <section id="about-spec-panel" className="lg:col-span-4 flex flex-col gap-6 w-full">
                
                {/* Setup Specifications Card */}
                <div id="specs-card" className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#7C3AED]" />
                    <span>ALEX.LABS STACK SPEC</span>
                  </h3>
                  
                  <div className="space-y-3 font-mono text-[10px] text-gray-300">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500 font-black">CORE MODULE:</span>
                      <span className="text-[#d8b4fe]">Apple M3 Max (128GB)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500 font-black">HOLOGRAPHIC VIEW:</span>
                      <span className="text-[#d8b4fe]">Vision Pro / Dual 6K</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500 font-black">SYNTH AUDIO:</span>
                      <span className="text-[#d8b4fe]">Analog Eurorack Logic</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500 font-black">SHELL ENVIRONMENT:</span>
                      <span className="text-[#d8b4fe]">Zsh + Tmux + Neovim</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500 font-black">PRIMARY LANGUAGE:</span>
                      <span className="text-[#d8b4fe]">TypeScript / Rust / GLSL</span>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <a 
                      id="github-profile-link"
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/5 hover:bg-[#7C3AED]/20 hover:text-white border border-white/10 hover:border-[#7C3AED]/40 transition-all text-xs text-gray-300 font-bold"
                    >
                      <span>Github</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      id="linkedin-profile-link"
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/5 hover:bg-[#7C3AED]/20 hover:text-white border border-white/10 hover:border-[#7C3AED]/40 transition-all text-xs text-gray-300 font-bold"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Aesthetic values list */}
                <div id="values-card" className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs uppercase tracking-widest font-black text-[#7C3AED] mb-3">Creative Philosophy</h3>
                  <ul className="space-y-2 text-xs font-medium text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-[#7C3AED]">✓</span>
                      <span>No design-to-code gaps. Pixel perfect execution.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#7C3AED]">✓</span>
                      <span>Zero unneeded dependencies. Slim packages.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#7C3AED]">✓</span>
                      <span>Uncompromising performance. 120 FPS render runs.</span>
                    </li>
                  </ul>
                </div>

              </section>
            </>
          )}

          {/* TAB 4: CONTACT */}
          {activeTab === 'contact' && (
            <>
              {/* Left Column: Bold Header and Contact Info Details */}
              <section id="contact-intro-panel" className="lg:col-span-8 flex flex-col justify-center text-left">
                <h2 className="text-xs uppercase tracking-[0.4em] mb-4 text-[#7C3AED] font-black">
                  Initiate Network
                </h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[110px] font-black leading-[0.85] tracking-tighter mb-10 select-none">
                  LET'S<br />
                  <span className="text-outline">CREATE</span><br />
                  <span className="accent-gradient">TOGETHER.</span>
                </h1>

                {/* Direct Contact coordinates / Local storage messages view */}
                <div id="contact-coordinates" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  {/* Info Panel */}
                  <div className="glass rounded-xl p-5 border border-white/10 space-y-3.5">
                    <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">Direct Coordinates</h3>
                    <div className="space-y-3 font-medium text-xs">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-[#7C3AED]" />
                        <span>alex@alex.studio</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-[#7C3AED]" />
                        <span>London Workspace (UK)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-[#7C3AED]" />
                        <span>Secured Encryption Channel</span>
                      </div>
                    </div>
                  </div>

                  {/* Sent messages overview (Persistent logs) */}
                  <div className="glass rounded-xl p-5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">Submission Node</h3>
                        {sentMessages.length > 0 && (
                          <button 
                            id="clear-logs-btn"
                            onClick={handleClearInquiries}
                            className="text-[9px] text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                            title="Clear saved message entries"
                          >
                            <Trash2 className="w-2.5 h-2.5" /> Clear Logs
                          </button>
                        )}
                      </div>
                      
                      {sentMessages.length > 0 ? (
                        <div className="space-y-2 max-h-[80px] overflow-y-auto pr-1">
                          {sentMessages.slice(0, 3).map((msg, i) => (
                            <div key={msg.id || i} className="text-[10px] bg-white/5 p-1.5 rounded border border-white/5 font-mono">
                              <div className="flex justify-between text-[#d8b4fe] font-bold">
                                <span>{msg.name.substring(0, 10)}...</span>
                                <span>{msg.dateString || 'Just now'}</span>
                              </div>
                              <p className="text-gray-400 line-clamp-1 mt-0.5">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-500 italic mt-2">
                          No messages submitted from this terminal session yet. Complete the form to establish a secure link.
                        </p>
                      )}
                    </div>

                    <div className="text-[9px] font-mono text-gray-500 mt-2 border-t border-white/5 pt-1.5 flex justify-between">
                      <span>SECURE PROTOCOL V4.1</span>
                      <span>ACTIVE SUBMISSIONS: {sentMessages.length}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right Column: Dynamic Contact Submission Form Card */}
              <section id="contact-form-panel" className="lg:col-span-4 w-full">
                
                {/* Form Card with Holographic Success transition */}
                <div id="contact-panel-card" className="glass rounded-2xl p-6 border border-white/10 relative min-h-[420px] flex flex-col justify-between">
                  
                  {!isSuccess ? (
                    <form id="portfolio-contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="border-b border-white/10 pb-2">
                        <h3 className="text-lg font-black tracking-tight">TRANSMIT BRIEF</h3>
                        <p className="text-[10px] text-gray-400 font-light mt-0.5">Fill in coordinates below to initiate contact node.</p>
                      </div>

                      {/* Name input */}
                      <div className="space-y-1">
                        <label htmlFor="form-name" className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">NAME</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input 
                            id="form-name"
                            required
                            type="text"
                            placeholder="Alex Mercer"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-slate-950/60 border border-white/10 hover:border-[#7C3AED]/40 focus:border-[#7C3AED] rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label htmlFor="form-email" className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">EMAIL COORDINATE</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                          <input 
                            id="form-email"
                            required
                            type="email"
                            placeholder="client@net.com"
                            value={formData.email}
                            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="w-full bg-slate-950/60 border border-white/10 hover:border-[#7C3AED]/40 focus:border-[#7C3AED] rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none placeholder-gray-600 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Select Project Type dropdown */}
                      <div className="space-y-1">
                        <label htmlFor="form-service" className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">CHOSEN DOMAIN</label>
                        <select 
                          id="form-service"
                          value={formData.service}
                          onChange={(e) => setFormData(p => ({ ...p, service: e.target.value }))}
                          className="w-full bg-slate-950 border border-white/10 hover:border-[#7C3AED]/40 focus:border-[#7C3AED] rounded-lg py-2 px-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="Spatial UI Design">Spatial UI/UX Design</option>
                          <option value="WebGL / Three.js Dev">WebGL / Three.js Dev</option>
                          <option value="Full-Stack Web App">Full-Stack Web App</option>
                          <option value="Bespoke Design Token Kit">Bespoke Design System</option>
                        </select>
                      </div>

                      {/* Select Project Budget */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">PROJECT BUDGET</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['$5k - $10k', '$10k - $25k'].map((budgetOption) => (
                            <button
                              key={budgetOption}
                              type="button"
                              id={`budget-btn-${budgetOption.replace(/\s+/g, '-')}`}
                              onClick={() => setFormData(p => ({ ...p, budget: budgetOption }))}
                              className={`py-1.5 px-2 rounded text-[10px] font-bold tracking-wider font-mono cursor-pointer transition-all border ${
                                formData.budget === budgetOption 
                                  ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#d8b4fe]'
                                  : 'bg-slate-950/40 border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              {budgetOption}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="space-y-1">
                        <label htmlFor="form-message" className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider block">MESSAGE BRIEF</label>
                        <textarea 
                          id="form-message"
                          required
                          rows={3}
                          placeholder="Tell us about your next immersive project..."
                          value={formData.message}
                          onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                          className="w-full bg-slate-950/60 border border-white/10 hover:border-[#7C3AED]/40 focus:border-[#7C3AED] rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none placeholder-gray-600 transition-colors resize-none"
                        />
                      </div>

                      {/* Submit action */}
                      <button
                        id="form-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-[#7C3AED] hover:bg-[#8B5CF6] disabled:bg-purple-900 text-white font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider transition-colors shadow-lg shadow-[#7C3AED]/20 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>TRANSMIT NODE LINK</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Elegant success screen */
                    <div id="contact-success-screen" className="flex-1 flex flex-col justify-center items-center text-center p-4 animate-fade-in space-y-5">
                      <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/40 flex items-center justify-center shadow-lg shadow-[#7C3AED]/5">
                        <CheckCircle2 className="w-8 h-8 text-[#d8b4fe] animate-pulse" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-black tracking-tight accent-gradient">TRANSMISSION LINK SECURED</h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          Your coordinates and project briefing have been fully authenticated and routed to Alex.Studio's primary terminal.
                        </p>
                      </div>

                      <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 w-full text-[10px] text-left font-mono space-y-1 text-gray-400">
                        <div><span className="text-[#d8b4fe] font-black">NODE STATUS:</span> SECURE/ACTIVE</div>
                        <div><span className="text-[#d8b4fe] font-black">MESSAGE HASH:</span> {Math.random().toString(16).substring(2, 10).toUpperCase()}</div>
                        <div><span className="text-[#d8b4fe] font-black">CHOSEN DOMAIN:</span> {formData.service}</div>
                        <div><span className="text-[#d8b4fe] font-black">ESTIMATED RESPONSE:</span> &lt; 24 SECURE CYCLES</div>
                      </div>

                      <button
                        id="return-to-form-btn"
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2 rounded-lg bg-white/5 hover:bg-[#7C3AED]/20 hover:text-white border border-white/10 hover:border-[#7C3AED]/40 text-xs font-bold transition-all cursor-pointer min-h-[40px] w-full"
                      >
                        TRANSMIT ANOTHER BRIEF
                      </button>
                    </div>
                  )}

                </div>
              </section>
            </>
          )}

        </main>

        {/* Footer Navigation Section */}
        <footer id="portfolio-footer" className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mt-16 md:mt-20 border-t border-white/5 pt-6 text-[10px] uppercase tracking-widest text-gray-400">
          {/* Social Coordinates */}
          <div id="social-footer-links" className="flex gap-5 sm:gap-6 font-semibold opacity-60 hover:opacity-100 transition-opacity">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors flex items-center gap-1">
              <span>Twitter</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors flex items-center gap-1">
              <span>Behance</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors flex items-center gap-1">
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors flex items-center gap-1">
              <span>Dribbble</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
          </div>

          {/* Timezone and Time Indicator */}
          <div id="timezone-footer-card" className="text-center sm:text-right flex flex-col items-center sm:items-end gap-1 select-none">
            <button
              id="cycle-timezone-btn"
              onClick={cycleTimezone}
              className="text-[9px] text-[#7C3AED] bg-[#7C3AED]/5 border border-[#7C3AED]/20 px-2 py-0.5 rounded hover:bg-[#7C3AED]/20 hover:border-[#7C3AED]/40 active:scale-95 transition-all cursor-pointer font-bold tracking-[0.2em] flex items-center gap-1.5"
              title="Click to cycle active office timezones"
            >
              <MapPin className="w-2.5 h-2.5" />
              <span>BASED IN {currentLocale.name}</span>
            </button>
            <p id="live-timezone-clock" className="text-sm font-mono tracking-tighter text-white font-bold mt-0.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#7C3AED] animate-pulse" />
              <span>{currentTime || '00:00:00 AM'}</span>
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
