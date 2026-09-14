import { useState, useEffect, useRef } from 'react';
import Section from '../../layout/Section';

const CAPABILITY_GROUPS = [
  {
    id: 'programming',
    index: '01',
    title: 'PROGRAMMING',
    label: 'SYNTAX & RUNTIMES',
    description:
      'Developing computational logic, system algorithms, and database queries across compiled, interpreted, and procedural languages.',
    technologies: [
      'C',
      'C++',
      'Python',
      'JavaScript',
      'SQL',
      'HTML/CSS',
    ],
    usedIn: 'UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT',
    asymmetry: 'lg:pr-4',
  },
  {
    id: 'ai-ml',
    index: '02',
    title: 'AI / MACHINE LEARNING',
    label: 'INTELLIGENCE PIPELINES',
    description:
      'Designing predictive workflows, training statistical models, and evaluating supervised machine learning architectures.',
    technologies: [
      'TensorFlow',
      'Scikit-learn',
      'Machine Learning',
    ],
    usedIn: 'DEEPFAKE DETECTION',
    asymmetry: 'lg:pl-4',
  },
  {
    id: 'fullstack',
    index: '03',
    title: 'FULL-STACK ENGINEERING',
    label: 'CLIENT-SERVER SYSTEMS',
    description:
      'Constructing responsive full-stack web applications with reactive client state, RESTful API routing, and stateless token authorization.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'REST APIs',
      'JWT Authentication',
    ],
    usedIn: 'UNIMEET',
    asymmetry: 'lg:pr-6',
  },
  {
    id: 'databases',
    index: '04',
    title: 'DATABASES',
    label: 'PERSISTENCE & SCHEMAS',
    description:
      'Designing relational and document schemas, maintaining data integrity, writing complex queries, and executing stored procedures and triggers.',
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
    asymmetry: 'lg:pl-5',
  },
  {
    id: 'core-engineering',
    index: '05',
    title: 'CORE ENGINEERING',
    label: 'SYSTEMS & THEORY',
    description:
      'Applying computer science foundations: algorithmic complexity, object-oriented abstraction, database internals, process scheduling, and network layers.',
    technologies: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
    usedIn: 'SYSTEM ARCHITECTURE & COMPUTATIONAL FOUNDATIONS',
    asymmetry: 'lg:pr-3',
  },
  {
    id: 'development-tools',
    index: '06',
    title: 'DEVELOPMENT TOOLS',
    label: 'WORKFLOW & TOOLING',
    description:
      'Managing version control, debugging RESTful endpoints, containerizing application services, and translating design specifications into code.',
    technologies: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Docker',
      'Figma',
    ],
    usedIn: 'DEVELOPMENT & DEPLOYMENT LIFECYCLE',
    asymmetry: 'lg:pl-4',
  },
];

export default function Capabilities() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const sectionRef = useRef(null);

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

  return (
    <Section id="capabilities" aria-label="Capabilities — Technical System Specification">
      <div ref={sectionRef} className="space-y-10 md:space-y-12">
        
        {/* Top Header Annotation Strip */}
        <div
          className={`flex items-center justify-between pb-4 border-b border-[#27272A] font-mono-tech text-xs tracking-wider transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex items-center gap-3 text-[#FAFAFA]">
            <span className="h-2 w-2 bg-[#FF2E2E] inline-block" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">CAPABILITIES // TECHNICAL SYSTEM</span>
          </div>
          <div className="text-[#A1A1AA] uppercase flex items-center gap-2">
            <span>SPECIFICATION MATRIX</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">06 SYSTEMS</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Matrix Layout */}
        <div className="editorial-grid items-start">
          
          {/* Left Column (Sticky Editorial Header & System Monitor) */}
          <div
            className={`col-span-4 md:col-span-6 lg:col-span-4 lg:sticky lg:top-24 space-y-6 lg:pr-6 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="space-y-3">
              <span className="font-mono-tech text-[11px] text-[#FF2E2E] font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                06 SYSTEMS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#FAFAFA] leading-[1.08]">
                CAPABILITIES<span className="text-[#FF2E2E]">.</span>
              </h2>
              <div className="font-mono-tech text-xs text-[#FAFAFA] tracking-wider uppercase font-semibold">
                WHAT I BUILD WITH.
              </div>
              <p className="font-body text-sm text-[#A1A1AA] leading-relaxed pt-1">
                Technical skill system and engineering domains derived from verified project implementations and core computer science fundamentals.
              </p>
            </div>

            {/* System Status Matrix Panel */}
            <div className="border border-[#27272A] bg-[#121215] p-4 space-y-3.5 font-mono-tech text-xs select-none">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272A] text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                <span>INSPECTION CONSOLE</span>
                <span className="text-[#FF2E2E] flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
                  LIVE
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] text-[#A1A1AA] uppercase">ACTIVE SYSTEM</div>
                <div className="text-sm font-bold text-[#FAFAFA] uppercase truncate">
                  {CAPABILITY_GROUPS[activeGroupIndex]?.title || CAPABILITY_GROUPS[0].title}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272A] text-[11px]">
                <div>
                  <div className="text-[9px] text-[#A1A1AA] uppercase">INDEX ID</div>
                  <div className="text-[#FAFAFA] font-medium mt-0.5">
                    {CAPABILITY_GROUPS[activeGroupIndex]?.index || '01'} // 06
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-[#A1A1AA] uppercase">TOTAL UNITS</div>
                  <div className="text-[#FAFAFA] font-medium mt-0.5">
                    33 TECHNOLOGIES
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Coordinate Markings */}
            <div className="hidden lg:flex items-center justify-between font-mono-tech text-[10px] text-[#A1A1AA]/60 pt-1 select-none" aria-hidden="true">
              <span>REF: 0x53_SYS</span>
              <span>GRID: 12-COL ASYM</span>
              <span>STATUS: VERIFIED</span>
            </div>
          </div>

          {/* Right Column: 06 Capability System Rows */}
          <div className="col-span-4 md:col-span-6 lg:col-span-8 space-y-0">
            {CAPABILITY_GROUPS.map((group, idx) => {
              const isGroupActive = activeGroupIndex === idx;

              return (
                <article
                  key={group.id}
                  tabIndex={0}
                  onMouseEnter={() => setActiveGroupIndex(idx)}
                  onFocus={() => setActiveGroupIndex(idx)}
                  className={`group relative border-t border-[#27272A] last:border-b transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-[#FF2E2E] cursor-default ${
                    isGroupActive ? 'bg-[#121215]/70 border-[#3F3F46]' : 'bg-transparent hover:bg-[#121215]/40'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${100 + idx * 50}ms` : '0ms',
                  }}
                  aria-label={`${group.index} ${group.title}`}
                >
                  {/* Left Red Active Edge Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 pointer-events-none ${
                      isGroupActive ? 'bg-[#FF2E2E] opacity-100' : 'bg-transparent opacity-0'
                    }`}
                    aria-hidden="true"
                  />

                  <div className={`p-5 sm:p-6 md:p-7 space-y-3.5 ${group.asymmetry} transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none`}>
                    
                    {/* Row Header: Number Index + System Label + SYS_ID */}
                    <div className="flex items-center justify-between font-mono-tech text-xs">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold text-sm tracking-wider transition-colors duration-200 ${
                          isGroupActive ? 'text-[#FF2E2E]' : 'text-[#FAFAFA]/70 group-hover:text-[#FF2E2E]'
                        }`}>
                          {group.index}
                        </span>
                        <span className="text-[#27272A]" aria-hidden="true">/</span>
                        <span className="text-[11px] uppercase tracking-widest text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors">
                          {group.label}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#A1A1AA]/70 uppercase" aria-hidden="true">
                        <span>SYS_ID</span>
                        <span className="text-[#27272A]">//</span>
                        <span className="text-[#FAFAFA]/90">MOD_{group.index}</span>
                      </div>
                    </div>

                    {/* Domain Title */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl sm:text-2xl md:text-[26px] font-bold uppercase tracking-tight text-[#FAFAFA] transition-colors">
                        {group.title}
                      </h3>
                      {/* Interactive indicator crosshair */}
                      <span
                        className={`font-mono-tech text-sm transition-transform duration-200 pointer-events-none mt-0.5 ${
                          isGroupActive
                            ? 'text-[#FF2E2E] rotate-90 scale-110'
                            : 'text-[#A1A1AA]/40 group-hover:text-[#FAFAFA]'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </div>

                    {/* Operational Description */}
                    <p className="font-body text-sm text-[#A1A1AA] leading-relaxed max-w-2xl">
                      {group.description}
                    </p>

                    {/* Technology Stack Matrix Chips */}
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-2 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                        {group.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono-tech text-xs bg-[#121215] border border-[#27272A] px-2.5 py-1 text-[#FAFAFA] group-hover:border-[#3F3F46] hover:!border-[#FF2E2E] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Evidence Citation (USED IN) */}
                    <div className="pt-2 border-t border-[#27272A]/70 flex items-center justify-between flex-wrap gap-2 font-mono-tech text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF2E2E] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                          USED IN //
                        </span>
                        <span className="text-[#FAFAFA] text-[11px] tracking-wide font-medium">
                          {group.usedIn}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#A1A1AA]/60 uppercase tracking-widest hidden md:block">
                        VERIFIED EVIDENCE
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>

        </div>

      </div>
    </Section>
  );
}
