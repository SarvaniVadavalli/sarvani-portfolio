import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Section from '../../layout/Section';

const CAPABILITY_MODULES = [
  {
    id: 'programming',
    index: '01',
    title: 'PROGRAMMING & LANGUAGES',
    meta: 'LANGUAGE STACK',
    summary:
      'Computational logic, system algorithms, and database queries across compiled, interpreted, and procedural runtimes.',
    technologies: [
      'C',
      'C++',
      'Python',
      'JavaScript',
      'SQL',
      'HTML/CSS',
    ],
    usedIn: 'UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT',
  },
  {
    id: 'ai-cv',
    index: '02',
    title: 'AI / ML + COMPUTER VISION',
    meta: 'INTELLIGENCE PIPELINES',
    summary:
      'Predictive models, neural network architectures, matrix transformations, and synthetic artifact detection.',
    technologies: [
      'TensorFlow',
      'Scikit-learn',
      'Machine Learning',
      'OpenCV',
      'NumPy',
      'CNN',
      'Image Processing',
    ],
    usedIn: 'DEEPFAKE DETECTION',
  },
  {
    id: 'fullstack',
    index: '03',
    title: 'FULL-STACK ENGINEERING',
    meta: 'APPLICATION ARCHITECTURE',
    summary:
      'End-to-end web architectures, reactive client state trees, RESTful API routing, and stateless token authorization.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'REST APIs',
      'JWT Authentication',
    ],
    usedIn: 'UNIMEET',
  },
  {
    id: 'data-systems',
    index: '04',
    title: 'DATA, SYSTEMS & TOOLS',
    meta: 'INFRASTRUCTURE & FOUNDATIONS',
    summary:
      'Relational and document storage, algorithmic problem solving, system-level design, and automated developer tooling.',
    technologies: [
      'MySQL',
      'MongoDB',
      'Database Design',
      'Stored Procedures',
      'Triggers',
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Docker',
      'Figma',
    ],
    usedIn: 'HOSPITAL MANAGEMENT · UNIMEET',
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const sideInspectorRef = useRef(null);
  const rowRefs = useRef([]);

  const activeModule = CAPABILITY_MODULES[activeIndex] || CAPABILITY_MODULES[0];

  // Viewport scroll entrance observer
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

  // Subtle GSAP crossfade on side inspector when active module changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (sideInspectorRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        sideInspectorRef.current,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }, [activeIndex]);

  // Keyboard navigation across the 4 editorial rows
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % CAPABILITY_MODULES.length;
        setActiveIndex(next);
        rowRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev =
          (idx - 1 + CAPABILITY_MODULES.length) % CAPABILITY_MODULES.length;
        setActiveIndex(prev);
        rowRefs.current[prev]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveIndex(idx);
      }
    },
    []
  );

  return (
    <Section id="capabilities" aria-label="Capabilities — Technical Editorial Index">
      <div ref={sectionRef} className="space-y-10 md:space-y-12">

        {/* Section Headline Block */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="space-y-2">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#FAFAFA] leading-none">
              CAPABILITIES<span className="text-[#FF2E2E]">.</span>
            </h2>
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
              WHAT I BUILD WITH.
            </div>
          </div>
          <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-widest hidden md:flex items-center gap-2">
            <span>SYSTEM SPECIFICATION</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">04 MODULES</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TWO-COLUMN EDITORIAL SYSTEM (Index Left, Inspector Right)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          
          {/* LEFT / MAIN COLUMN: Large Typographic Capability Index (8 Cols) */}
          <div
            role="tablist"
            aria-label="Capabilities Editorial Index"
            className={`lg:col-span-8 divide-y divide-[#27272A] border-t border-b border-[#27272A] transition-all duration-700 delay-150 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {CAPABILITY_MODULES.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => (rowRefs.current[idx] = el)}
                  role="tab"
                  tabIndex={0}
                  id={`capability-row-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`capability-spec-${item.id}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative py-7 sm:py-9 lg:py-10 cursor-pointer select-none transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-[#FF2E2E] ${
                    isActive ? 'bg-[#121215]/30' : 'bg-transparent hover:bg-[#121215]/15'
                  }`}
                >
                  {/* Subtle Red Edge Marker */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-opacity duration-300 pointer-events-none ${
                      isActive ? 'bg-[#FF2E2E] opacity-100' : 'bg-transparent opacity-0'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="pl-4 sm:pl-6 pr-2 sm:pr-4 space-y-4">
                    
                    {/* Top Row: Large Number + Title + Right Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        {/* Large Module Number (48-64px) */}
                        <span
                          className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'text-[#FF2E2E]'
                              : 'text-[#A1A1AA]/50 group-hover:text-[#FAFAFA]'
                          }`}
                        >
                          {item.index}
                        </span>

                        {/* Large Capability Title (36-52px) */}
                        <h3
                          className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold uppercase tracking-tight text-[#FAFAFA] transition-all duration-300 ${
                            isActive
                              ? 'translate-x-2 text-[#FAFAFA]'
                              : 'group-hover:translate-x-1.5'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Right Sub-Meta & Active Tag */}
                      <div className="font-mono-tech text-xs flex items-center gap-3 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                        <span className="text-[11px] uppercase tracking-wider text-[#A1A1AA] hidden md:inline">
                          {item.meta}
                        </span>
                        <span
                          className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border transition-colors duration-300 ${
                            isActive
                              ? 'border-[#FF2E2E] text-[#FF2E2E] bg-[#FF2E2E]/10'
                              : 'border-[#27272A] text-[#A1A1AA]/60 group-hover:text-[#FAFAFA] group-hover:border-[#3F3F46]'
                          }`}
                        >
                          {isActive ? '[ ACTIVE ]' : `[ ${item.index} ]`}
                        </span>
                      </div>
                    </div>

                    {/* Below: Technology String (Muted, Brightens on Hover/Active) */}
                    <div className="sm:pl-16 lg:pl-20">
                      <p
                        className={`font-mono-tech text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                          isActive
                            ? 'text-[#FAFAFA]'
                            : 'text-[#A1A1AA] group-hover:text-[#FAFAFA]/90'
                        }`}
                      >
                        {item.technologies.join(' · ')}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Persistent Technical System Inspector (4 Cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="border border-[#27272A] bg-[#121215] p-6 lg:p-7 space-y-6 font-mono-tech select-none">
              
              {/* Box Header Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-[#27272A] text-xs">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#FAFAFA]">
                    CAPABILITY SYSTEM
                  </div>
                  <div className="text-[10px] text-[#A1A1AA] uppercase">
                    SYSTEM // 04 MODULES
                  </div>
                </div>
                <div className="text-[#FF2E2E] flex items-center gap-1.5 text-[10px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
                  LIVE INSPECTOR
                </div>
              </div>

              {/* Dynamic Animated Content Panel */}
              <div ref={sideInspectorRef} className="space-y-5">
                
                {/* Active Module Header */}
                <div className="space-y-2">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    ACTIVE MODULE
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-[#FF2E2E]">
                      {activeModule.index}
                    </span>
                    <div className="min-w-0">
                      <div className="text-base font-display font-bold uppercase text-[#FAFAFA] tracking-tight truncate">
                        {activeModule.title}
                      </div>
                      <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-0.5">
                        {activeModule.meta}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module Operational Summary */}
                <p className="font-body text-xs text-[#A1A1AA] leading-relaxed pt-1">
                  {activeModule.summary}
                </p>

                {/* Stack Breakdown */}
                <div className="pt-3 border-t border-[#27272A] space-y-2">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModule.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-[#FAFAFA] bg-[#09090B] border border-[#27272A] px-2.5 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Used In Section */}
                <div className="pt-3 border-t border-[#27272A] space-y-1.5">
                  <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                    USED IN
                  </div>
                  <div className="text-xs text-[#FAFAFA] font-medium leading-snug">
                    {activeModule.usedIn}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </Section>
  );
}
