import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Section from '../../layout/Section';

const CAPABILITY_MODULES = [
  {
    id: 'programming',
    index: '01',
    title: 'PROGRAMMING',
    label: 'SYNTAX & RUNTIMES',
    description:
      'Computational logic, system algorithms, and database queries across compiled, interpreted, and procedural languages.',
    technologies: [
      'C',
      'C++',
      'Python',
      'JavaScript',
      'SQL',
      'HTML/CSS',
    ],
    usedIn: 'UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT',
    preview: 'C · C++ · Python · JavaScript · SQL · HTML/CSS',
  },
  {
    id: 'ai-ml',
    index: '02',
    title: 'AI / MACHINE LEARNING',
    label: 'INTELLIGENCE PIPELINES',
    description:
      'Predictive workflows, supervised classification architectures, and quantitative model evaluation.',
    technologies: [
      'TensorFlow',
      'Scikit-learn',
      'Machine Learning',
    ],
    usedIn: 'DEEPFAKE DETECTION',
    preview: 'TensorFlow · Scikit-learn · Machine Learning',
  },
  {
    id: 'computer-vision',
    index: '03',
    title: 'COMPUTER VISION',
    label: 'IMAGE PROCESSING & CNN',
    description:
      'Convolutional feature extraction, image preprocessing matrices, and synthetic anomaly detection.',
    technologies: [
      'OpenCV',
      'NumPy',
      'CNN',
      'Image Processing',
    ],
    usedIn: 'DEEPFAKE DETECTION',
    preview: 'OpenCV · NumPy · CNN · Image Processing',
  },
  {
    id: 'fullstack',
    index: '04',
    title: 'FULL-STACK ENGINEERING',
    label: 'CLIENT-SERVER SYSTEMS',
    description:
      'Constructing responsive full-stack web applications with reactive client state, RESTful routing, and stateless token authorization.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'REST APIs',
      'JWT Authentication',
    ],
    usedIn: 'UNIMEET',
    preview: 'React · Node.js · Express.js · Tailwind CSS · REST · JWT',
  },
  {
    id: 'databases',
    index: '05',
    title: 'DATABASES',
    label: 'PERSISTENCE & SCHEMAS',
    description:
      'Relational and document storage modeling, data integrity constraints, and transactional triggers.',
    technologies: [
      'MySQL',
      'MongoDB',
      'Database Design',
      'SQL',
      'CRUD Operations',
      'Stored Procedures',
      'Triggers',
    ],
    usedIn: 'HOSPITAL MANAGEMENT · UNIMEET',
    preview: 'MySQL · MongoDB · Database Design · SQL · CRUD · Triggers',
  },
  {
    id: 'core-engineering',
    index: '06',
    title: 'CORE ENGINEERING',
    label: 'SYSTEMS & THEORY',
    description:
      'Algorithmic bounds, memory hierarchy, relational internals, process scheduling, and socket layers.',
    technologies: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
    usedIn: 'SYSTEM ARCHITECTURE & COMPUTATIONAL FOUNDATIONS',
    preview: 'DSA · OOP · DBMS · Operating Systems · Networks',
  },
  {
    id: 'development-tools',
    index: '07',
    title: 'DEVELOPMENT TOOLS',
    label: 'WORKFLOW & TOOLING',
    description:
      'Version control pipelines, API endpoint testing, service containerization, and interface specifications.',
    technologies: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Docker',
      'Figma',
    ],
    usedIn: 'DEVELOPMENT & DEPLOYMENT LIFECYCLE',
    preview: 'Git · GitHub · VS Code · Postman · Docker · Figma',
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const sideInspectorRef = useRef(null);
  const cardRefs = useRef([]);

  const activeModule = CAPABILITY_MODULES[activeIndex] || CAPABILITY_MODULES[0];

  // IntersectionObserver for scroll entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate side inspector content crossfade on active module change
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (sideInspectorRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        sideInspectorRef.current,
        { opacity: 0.45, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % CAPABILITY_MODULES.length;
        setActiveIndex(next);
        cardRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev =
          (idx - 1 + CAPABILITY_MODULES.length) % CAPABILITY_MODULES.length;
        setActiveIndex(prev);
        cardRefs.current[prev]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveIndex(idx);
      }
    },
    []
  );

  return (
    <Section id="capabilities" aria-label="Capabilities — Technical System Specification">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        
        {/* Top Header Annotation Strip */}
        <div
          className={`flex items-center justify-between pb-4 border-b border-[#27272A] font-mono-tech text-xs tracking-wider transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex items-center gap-3 text-[#FAFAFA]">
            <span className="h-2 w-2 bg-[#FF2E2E] inline-block" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">
              CAPABILITIES // TECHNICAL SYSTEM
            </span>
          </div>
          <div className="text-[#A1A1AA] uppercase flex items-center gap-2">
            <span>INDEX: 0{activeIndex + 1} // 07</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">INTERACTIVE TECHNICAL SYSTEM</span>
          </div>
        </div>

        {/* Section Headline Block */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#FAFAFA] leading-none">
              CAPABILITIES<span className="text-[#FF2E2E]">.</span>
            </h2>
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
              WHAT I BUILD WITH.
            </div>
          </div>
          <div className="font-mono-tech text-xs text-[#A1A1AA] hidden lg:flex items-center gap-3">
            <span>SYSTEM SPECIFICATION</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">07 CAPABILITY MODULES</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TWO-COLUMN EDITORIAL SYSTEM (Cards Left, Inspector Right)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT / MAIN COLUMN: Stack of 7 Capability Cards (8 Cols) */}
          <div
            role="tablist"
            aria-label="Capabilities Module Stack"
            className={`lg:col-span-8 space-y-3 transition-all duration-700 delay-150 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {CAPABILITY_MODULES.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  role="tab"
                  tabIndex={0}
                  id={`capability-card-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`capability-panel-${item.id}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative border transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#FF2E2E] ${
                    isActive
                      ? 'bg-[#121215] border-[#3F3F46]'
                      : 'bg-[#121215]/40 border-[#27272A] hover:border-[#3F3F46] hover:bg-[#121215]/70'
                  }`}
                >
                  {/* Left Red Active Edge Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 pointer-events-none ${
                      isActive ? 'bg-[#FF2E2E] opacity-100' : 'bg-transparent opacity-0'
                    }`}
                    aria-hidden="true"
                  />

                  {/* ---------------------------------------------------- */}
                  {/* CARD HEADER / COMPACT STATE (Always Visible Row)    */}
                  {/* ---------------------------------------------------- */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span
                        className={`font-mono-tech text-sm font-bold tracking-wider transition-colors duration-200 ${
                          isActive
                            ? 'text-[#FF2E2E]'
                            : 'text-[#A1A1AA] group-hover:text-[#FF2E2E]'
                        }`}
                      >
                        {item.index}
                      </span>
                      <span className="text-[#27272A]" aria-hidden="true">/</span>
                      <h3 className="font-display font-bold text-base sm:text-lg md:text-xl uppercase tracking-tight text-[#FAFAFA] truncate">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Collapsed Preview Chips (Visible when collapsed on sm+) */}
                      {!isActive && (
                        <span className="hidden sm:inline font-mono-tech text-xs text-[#A1A1AA]/70 truncate max-w-[240px] md:max-w-[320px]">
                          {item.preview}
                        </span>
                      )}

                      {/* Interactive Indicator */}
                      <span
                        className={`font-mono-tech text-sm transition-transform duration-300 ${
                          isActive
                            ? 'text-[#FF2E2E] rotate-90 scale-110'
                            : 'text-[#A1A1AA]/50 group-hover:text-[#FAFAFA]'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* EXPANDED ACCORDION REVEAL (Only Visible When Active) */}
                  {/* ---------------------------------------------------- */}
                  <div
                    id={`capability-panel-${item.id}`}
                    aria-labelledby={`capability-card-${item.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-out border-t ${
                      isActive
                        ? 'max-h-96 opacity-100 border-[#27272A] px-4 pb-5 pt-4 sm:px-6 sm:pb-6'
                        : 'max-h-0 opacity-0 border-transparent px-4 pb-0 pt-0 sm:px-6'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Technical Description */}
                      <p className="font-body text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
                        {item.description}
                      </p>

                      {/* Technology Chips */}
                      <div className="space-y-2">
                        <div className="font-mono-tech text-[10px] text-[#A1A1AA]/70 uppercase tracking-widest">
                          SUPPORTED TECHNOLOGIES & RUNTIMES
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono-tech text-xs bg-[#09090B] border border-[#27272A] px-2.5 py-1 text-[#FAFAFA] hover:border-[#FF2E2E] transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Citation */}
                      <div className="pt-3 border-t border-[#27272A]/70 flex items-center justify-between flex-wrap gap-2 font-mono-tech text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF2E2E] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                            USED IN //
                          </span>
                          <span className="text-[#FAFAFA] text-[11px] font-medium tracking-wide">
                            {item.usedIn}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#A1A1AA]/50 uppercase hidden md:inline">
                          VERIFIED RESUME RECORD
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Persistent Side System Inspector Box (4 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="border border-[#27272A] bg-[#121215] p-5 sm:p-6 space-y-5 font-mono-tech select-none">
              
              {/* Box Header Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] text-xs">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FAFAFA]">
                    CAPABILITY SYSTEM
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] uppercase">
                    SYSTEM // 07 MODULES
                  </div>
                </div>
                <div className="text-[#FF2E2E] flex items-center gap-1.5 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
                  LIVE INSPECTOR
                </div>
              </div>

              {/* Dynamic Animated Content Panel */}
              <div ref={sideInspectorRef} className="space-y-4">
                
                {/* Active Module Header */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    ACTIVE MODULE
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-[#FF2E2E]">
                      {activeModule.index}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-display font-bold uppercase text-[#FAFAFA] tracking-tight truncate">
                        {activeModule.title}
                      </div>
                      <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                        {activeModule.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stack Breakdown */}
                <div className="pt-3 border-t border-[#27272A] space-y-2">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    MODULE STACK
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                    {activeModule.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="text-xs text-[#FAFAFA] flex items-center gap-2 bg-[#09090B]/70 border border-[#27272A] px-2.5 py-1"
                      >
                        <span className="w-1 h-1 bg-[#FF2E2E]" aria-hidden="true" />
                        <span className="truncate">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Used In Section */}
                <div className="pt-3 border-t border-[#27272A] space-y-1">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    PROJECT CITATION
                  </div>
                  <div className="text-xs text-[#FAFAFA] font-medium leading-snug">
                    {activeModule.usedIn}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="pt-3 border-t border-[#27272A] flex items-center justify-between text-[10px] text-[#A1A1AA]">
                  <span>STATUS: VERIFIED</span>
                  <span className="text-[#FF2E2E]">AUTH_OK</span>
                </div>

              </div>

            </div>

            {/* Micro System Coordinates */}
            <div className="hidden lg:flex items-center justify-between font-mono-tech text-[10px] text-[#A1A1AA]/60 px-1" aria-hidden="true">
              <span>SYS_REF: 0x53_MATRIX</span>
              <span>GRID: 12-COL ASYM</span>
              <span>STATE: SYNCHRONIZED</span>
            </div>
          </div>

        </div>

      </div>
    </Section>
  );
}
