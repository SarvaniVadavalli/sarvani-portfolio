import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Section from '../../layout/Section';

const CAPABILITY_PANELS = [
  {
    id: 'programming',
    index: '01',
    title: 'PROGRAMMING',
    label: 'SYNTAX & RUNTIMES',
    description:
      'Computational logic, system algorithms, and database queries across compiled and procedural runtimes.',
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
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const desktopPanelsRef = useRef([]);
  const activeContentRef = useRef(null);

  // Viewport scroll entry observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP Accordion Panel Transition on Desktop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const duration = prefersReducedMotion ? 0 : 0.55;
    const ease = prefersReducedMotion ? 'none' : 'power3.out';

    desktopPanelsRef.current.forEach((panel, idx) => {
      if (!panel) return;
      const isActive = idx === activeIndex;

      gsap.to(panel, {
        flexGrow: isActive ? 4.8 : 0.7,
        duration,
        ease,
        overwrite: 'auto',
      });
    });

    if (activeContentRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        activeContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.08 }
      );
    }
  }, [activeIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (idx + 1) % CAPABILITY_PANELS.length;
        setActiveIndex(nextIndex);
        desktopPanelsRef.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex =
          (idx - 1 + CAPABILITY_PANELS.length) % CAPABILITY_PANELS.length;
        setActiveIndex(prevIndex);
        desktopPanelsRef.current[prevIndex]?.focus();
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
        
        {/* Section Header Annotation Strip */}
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
            <span>SPECIFICATION ACCORDION</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">07 SYSTEMS</span>
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
          <div className="font-mono-tech text-xs text-[#A1A1AA] hidden md:flex items-center gap-4">
            <span>INDEX: 0{activeIndex + 1} // 07</span>
            <span className="text-[#27272A]">|</span>
            <span className="text-[#FAFAFA]">INTERACTIVE TECHNICAL ACCORDION</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP & TABLET HORIZONTAL ACCORDION (md:flex)           */}
        {/* ========================================================= */}
        <div
          role="tablist"
          aria-label="Technical Capabilities Accordion"
          className={`hidden md:flex h-[440px] lg:h-[460px] w-full border border-[#27272A] bg-[#09090B] overflow-hidden transition-all duration-700 delay-150 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {CAPABILITY_PANELS.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                ref={(el) => (desktopPanelsRef.current[idx] = el)}
                role="tab"
                tabIndex={0}
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative border-r border-[#27272A] last:border-r-0 cursor-pointer overflow-hidden select-none focus-visible:outline-2 focus-visible:outline-[#FF2E2E] transition-colors duration-300 ${
                  isActive ? 'bg-[#121215]' : 'bg-[#09090B] hover:bg-[#121215]/50'
                }`}
                style={{
                  flexGrow: isActive ? 4.8 : 0.7,
                  minWidth: '56px',
                }}
              >
                {/* Active Top Red Indicator Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 pointer-events-none ${
                    isActive ? 'bg-[#FF2E2E] opacity-100' : 'bg-transparent opacity-0'
                  }`}
                  aria-hidden="true"
                />

                {/* INACTIVE STATE (Vertical collapsed view) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between py-6 px-2 transition-opacity duration-300 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  aria-hidden={isActive}
                >
                  <span className="font-mono-tech text-xs font-bold text-[#A1A1AA] group-hover:text-[#FF2E2E] transition-colors">
                    {item.index}
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-wider text-[#A1A1AA] [writing-mode:vertical-lr] rotate-180 whitespace-nowrap transition-colors hover:text-[#FAFAFA]">
                    {item.title}
                  </span>
                  <span className="font-mono-tech text-xs text-[#27272A]" aria-hidden="true">
                    +
                  </span>
                </div>

                {/* ACTIVE STATE (Expanded view) */}
                <div
                  ref={isActive ? activeContentRef : null}
                  id={`panel-${item.id}`}
                  aria-labelledby={`tab-${item.id}`}
                  className={`absolute inset-0 flex flex-col justify-between p-6 lg:p-8 transition-opacity duration-300 ${
                    isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Top Panel Meta */}
                  <div className="flex items-center justify-between font-mono-tech text-xs border-b border-[#27272A] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[#FF2E2E] font-bold text-sm tracking-wider">
                        {item.index}
                      </span>
                      <span className="text-[#27272A]" aria-hidden="true">/</span>
                      <span className="text-[#A1A1AA] uppercase tracking-widest text-[11px]">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#A1A1AA]/60 uppercase">
                      <span>SYS_SPEC</span>
                      <span className="text-[#27272A]">//</span>
                      <span className="text-[#FF2E2E] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3 my-auto py-2">
                    <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-tight text-[#FAFAFA]">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>

                  {/* Technology Chips */}
                  <div className="space-y-2 pt-2">
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

                  {/* Project Evidence Citation (USED IN) */}
                  <div className="pt-3 border-t border-[#27272A] font-mono-tech text-xs flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF2E2E] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                        USED IN //
                      </span>
                      <span className="text-[#FAFAFA] text-[11px] font-medium tracking-wide">
                        {item.usedIn}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#A1A1AA]/50 uppercase hidden lg:inline">
                      VERIFIED RESUME RECORD
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE VERTICAL ACCORDION (md:hidden)                     */}
        {/* ========================================================= */}
        <div className="md:hidden space-y-2">
          {CAPABILITY_PANELS.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={`mobile-${item.id}`}
                className={`border border-[#27272A] bg-[#121215] overflow-hidden transition-colors ${
                  isActive ? 'border-[#3F3F46]' : 'border-[#27272A]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  aria-expanded={isActive}
                  className="w-full flex items-center justify-between p-4 text-left font-mono-tech select-none focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold text-sm tracking-wider ${
                        isActive ? 'text-[#FF2E2E]' : 'text-[#A1A1AA]'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span className="text-[#27272A]" aria-hidden="true">/</span>
                    <span className="font-display font-bold text-base uppercase tracking-tight text-[#FAFAFA]">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-sm transition-transform duration-200 ${
                      isActive ? 'text-[#FF2E2E] rotate-90' : 'text-[#A1A1AA]'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isActive && (
                  <div className="px-4 pb-5 pt-1 space-y-3.5 border-t border-[#27272A]/70">
                    <p className="font-body text-xs text-[#A1A1AA] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[11px] bg-[#09090B] border border-[#27272A] px-2 py-0.5 text-[#FAFAFA]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#27272A]/60 flex items-center gap-2 font-mono-tech text-[11px]">
                      <span className="text-[#FF2E2E] text-[10px] font-bold uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                        USED IN //
                      </span>
                      <span className="text-[#FAFAFA] text-[10px] font-medium">
                        {item.usedIn}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
