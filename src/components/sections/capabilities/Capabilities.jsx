import { useState, useEffect, useRef } from 'react';
import Section from '../../layout/Section';

const CAPABILITY_GROUPS = [
  {
    id: 'ai-ml',
    index: '01',
    title: 'AI & MACHINE LEARNING',
    label: 'INTELLIGENCE PIPELINES',
    description:
      'Designing and training machine learning pipelines, optimizing predictive models, and running quantitative evaluation benchmarks for real-world tasks.',
    technologies: [
      'Python',
      'Scikit-Learn',
      'TensorFlow',
      'Machine Learning',
      'Model Training',
      'Model Evaluation',
    ],
    details: {
      scope: 'TRAINING & VALIDATION WORKFLOWS',
      subsystems: 'Data Preprocessing · Hyperparameter Tuning · Cross-Validation · Accuracy/Loss Benchmarking',
      metric: 'ACCURACY // LOSS OPTIMIZATION',
    },
    asymmetry: 'lg:pr-4',
  },
  {
    id: 'computer-vision',
    index: '02',
    title: 'COMPUTER VISION',
    label: 'SPATIAL & VISUAL INFERENCE',
    description:
      'Applying convolutional neural networks and matrix transformations to extract visual features, process image streams, and detect synthetic artifacts.',
    technologies: [
      'OpenCV',
      'NumPy',
      'Image Processing',
      'CNN-based Computer Vision',
      'Deepfake Detection',
    ],
    details: {
      scope: 'PIXEL TRANSFORMATIONS & INFERENCE',
      subsystems: 'Feature Extraction · Convolutional Filters · Synthetic Anomaly Detection · Matrix Math',
      metric: 'SPATIAL TENSOR CONV',
    },
    asymmetry: 'lg:pl-6',
  },
  {
    id: 'fullstack',
    index: '03',
    title: 'FULL-STACK ENGINEERING',
    label: 'REACTIVE CLIENT-SERVER SYSTEMS',
    description:
      'Constructing resilient end-to-end web applications, reactive client state systems, modular component trees, secure token authentication, and RESTful backends.',
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'Vite',
      'Tailwind CSS',
      'REST APIs',
      'JWT Authentication',
    ],
    details: {
      scope: 'END-TO-END APPLICATION ARCHITECTURE',
      subsystems: 'Client-Server Lifecycle · Stateless Auth · Route Handlers · Component Modularization',
      metric: 'ZERO-LATENCY CLIENT RUNTIME',
    },
    asymmetry: 'lg:pr-8',
  },
  {
    id: 'databases',
    index: '04',
    title: 'DATA & DATABASES',
    label: 'PERSISTENCE & SCHEMAS',
    description:
      'Architecting persistent data storage schemas, enforcing relational integrity, modeling document collections, writing stored procedures, and handling CRUD transactions.',
    technologies: [
      'MongoDB',
      'MySQL',
      'SQL',
      'Mongoose',
      'Database Design',
      'CRUD / Stored Procedures / Triggers',
    ],
    details: {
      scope: 'PERSISTENCE & STORAGE MECHANISMS',
      subsystems: 'Schema Normalization · Document Object Mapping · Trigger Logic · Query Indexing',
      metric: 'ACID / DOCUMENT PERSISTENCE',
    },
    asymmetry: 'lg:pl-4',
  },
  {
    id: 'core-engineering',
    index: '05',
    title: 'CORE ENGINEERING',
    label: 'COMPUTATIONAL FOUNDATIONS',
    description:
      'Applying foundational computer science theory: algorithmic time-space complexity, memory management, operating system process models, and networking protocols.',
    technologies: [
      'C',
      'C++',
      'JavaScript',
      'Python',
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
    details: {
      scope: 'LOW-LEVEL FOUNDATIONS & COMPUTATION',
      subsystems: 'Memory Allocation · Object Hierarchies · Process Scheduling · TCP/IP Socket Fundamentals',
      metric: 'O(N) ALGORITHMIC BOUNDS',
    },
    asymmetry: 'lg:pr-2',
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
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="capabilities" aria-label="Capabilities — Technical Systems Specification">
      <div ref={sectionRef} className="space-y-10 md:space-y-14">
        
        {/* Top Header Annotation Strip */}
        <div
          className={`flex items-center justify-between pb-4 border-b border-[#27272A] font-mono-tech text-xs tracking-wider transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 text-[#FAFAFA]">
            <span className="h-2 w-2 bg-[#FF2E2E] inline-block" aria-hidden="true" />
            <span className="font-semibold uppercase">CAPABILITIES // 04 SYSTEMS</span>
          </div>
          <div className="text-[#A1A1AA] uppercase flex items-center gap-2">
            <span>SPECIFICATION MATRIX</span>
            <span className="text-[#27272A]">//</span>
            <span className="text-[#FAFAFA]">05 DOMAINS</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Matrix Layout */}
        <div className="editorial-grid items-start">
          
          {/* Left Column (Sticky Editorial Header & System Monitor) */}
          <div
            className={`col-span-4 md:col-span-6 lg:col-span-4 lg:sticky lg:top-24 space-y-6 lg:pr-6 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="space-y-3">
              <span className="font-mono-tech text-[11px] text-[#FF2E2E] font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
                TECHNICAL ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold uppercase tracking-tight text-[#FAFAFA] leading-[1.08]">
                CAPABILITIES<span className="text-[#FF2E2E]">.</span>
              </h2>
              <p className="font-body text-sm text-[#A1A1AA] leading-relaxed pt-2">
                Technical domains, engineering stacks, and algorithmic systems engineered and deployed across software and machine intelligence.
              </p>
            </div>

            {/* System Status Matrix Panel */}
            <div className="border border-[#27272A] bg-[#121215] p-4 space-y-3.5 font-mono-tech text-xs select-none">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272A] text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                <span>INSPECTION CONSOLE</span>
                <span className="text-[#FF2E2E] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
                  LIVE
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="text-[10px] text-[#A1A1AA] uppercase">ACTIVE SYSTEM</div>
                <div className="text-sm font-bold text-[#FAFAFA] uppercase truncate">
                  {CAPABILITY_GROUPS[activeGroupIndex].title}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272A] text-[11px]">
                <div>
                  <div className="text-[9px] text-[#A1A1AA] uppercase">INDEX ID</div>
                  <div className="text-[#FAFAFA] font-medium mt-0.5">
                    0{activeGroupIndex + 1} // 05
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
            <div className="hidden lg:flex items-center justify-between font-mono-tech text-[10px] text-[#A1A1AA]/60 pt-2 select-none" aria-hidden="true">
              <span>REF: 0x53_SYS</span>
              <span>GRID: 12-COL ASYM</span>
              <span>STATE: OPERATIONAL</span>
            </div>
          </div>

          {/* Right Column: 5 Capability System Rows */}
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
                    isGroupActive ? 'bg-[#121215]/75' : 'bg-transparent hover:bg-[#121215]/40'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${150 + idx * 75}ms` : '0ms',
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

                  <div className={`p-5 sm:p-6 md:p-8 space-y-4 ${group.asymmetry}`}>
                    
                    {/* Row Header: Number Index + System Label + Accent Bar */}
                    <div className="flex items-center justify-between font-mono-tech text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-[#FF2E2E] tracking-wider">
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
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#FAFAFA] group-hover:text-[#FAFAFA] transition-colors">
                        {group.title}
                      </h3>
                      {/* Interactive indicator crosshair */}
                      <span
                        className={`font-mono-tech text-sm transition-transform duration-300 pointer-events-none mt-1 ${
                          isGroupActive
                            ? 'text-[#FF2E2E] translate-x-1 rotate-90'
                            : 'text-[#A1A1AA]/50 group-hover:text-[#FAFAFA]'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </div>

                    {/* Operational Description */}
                    <p className="font-body text-sm sm:text-[15px] text-[#A1A1AA] leading-relaxed max-w-2xl">
                      {group.description}
                    </p>

                    {/* Technology Stack Matrix Chips */}
                    <div className="pt-1">
                      <div className="text-[10px] font-mono-tech text-[#A1A1AA]/80 uppercase tracking-widest mb-2">
                        SUPPORTED TECHNOLOGIES & METHODS
                      </div>
                      <div className="flex flex-wrap gap-2 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                        {group.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono-tech text-xs bg-[#121215] border border-[#27272A] px-2.5 py-1 text-[#FAFAFA] hover:border-[#FF2E2E] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Technical Specification Reveal (On Hover & Focus) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out border-t border-[#27272A]/70 ${
                        isGroupActive
                          ? 'max-h-32 opacity-100 pt-3 mt-4'
                          : 'max-h-0 opacity-0 pt-0 mt-0 pointer-events-none'
                      }`}
                    >
                      <div className="font-mono-tech text-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-4">
                          <span className="text-[10px] text-[#FF2E2E] uppercase font-semibold tracking-wider block">
                            SPECIFICATION // SCOPE
                          </span>
                          <span className="text-[#FAFAFA] text-xs mt-0.5 block">
                            {group.details.scope}
                          </span>
                        </div>
                        <div className="md:col-span-8">
                          <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
                            SUBSYSTEM HIGHLIGHTS
                          </span>
                          <span className="text-[#A1A1AA] text-xs mt-0.5 block">
                            {group.details.subsystems}
                          </span>
                        </div>
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
