import { useState, useEffect, useRef } from 'react';

const NODES = [
  { id: 'about', index: '01', label: 'ABOUT', preview: 'Profile + focus', href: '#about', angle: -90 },
  { id: 'capabilities', index: '02', label: 'CAPABILITIES', preview: 'Skills + stack', href: '#capabilities', angle: -30 },
  { id: 'projects', index: '03', label: 'PROJECTS', preview: 'Selected work', href: '#projects', angle: 30 },
  { id: 'experience', index: '04', label: 'EXPERIENCE', preview: 'Journey + roles', href: '#experience', angle: 90 },
  { id: 'achievements', index: '05', label: 'ACHIEVEMENTS', preview: 'Recognition', href: '#achievements', angle: 150 },
  { id: 'contact', index: '06', label: 'CONTACT', preview: "Let's connect", href: '#contact', angle: 210 },
];

export default function CenterFlow() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 500 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check reduced motion preference & window dimensions
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const mobile = w < 640;
        const tablet = w >= 640 && w < 1024;
        
        setIsMobile(mobile);
        setIsTablet(tablet);

        // Compute container height based on width for dynamic responsive canvas
        const calcHeight = mobile ? 460 : tablet ? 500 : 540;
        setDimensions({
          width: w,
          height: calcHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // IntersectionObserver to highlight currently active section
  useEffect(() => {
    const sectionIds = NODES.map((n) => n.id);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Responsive radial distances
  const radiusX = isMobile ? 120 : isTablet ? 170 : 220;
  const radiusY = isMobile ? 140 : isTablet ? 180 : 200;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none transition-opacity duration-700 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: dimensions.height }}
    >
      {/* SVG Connecting Flow Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle glow filter for active pulses */}
          <filter id="pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const nodeX = centerX + Math.cos(rad) * radiusX;
          const nodeY = centerY + Math.sin(rad) * radiusY;
          
          const isActive = activeSection === node.id;
          const isHovered = hoveredNode === node.id;
          const isHighlighted = isActive || isHovered;

          return (
            <g key={`line-${node.id}`}>
              {/* Outer faint background track line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={nodeX}
                y2={nodeY}
                stroke="#27272A"
                strokeWidth="1"
                strokeOpacity={isHighlighted ? "0.8" : "0.35"}
              />

              {/* Foreground interactive line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={nodeX}
                y2={nodeY}
                stroke={isHighlighted ? '#FF2E2E' : '#3F3F46'}
                strokeWidth={isHighlighted ? '1.5' : '1'}
                strokeDasharray={isHighlighted ? 'none' : '3 3'}
                className="transition-all duration-300"
              />

              {/* Animated Red Signal Pulse (Disabled if reduced motion) */}
              {!isReducedMotion && (
                <circle
                  r={isHighlighted ? '3' : '2'}
                  fill="#FF2E2E"
                  filter={isHighlighted ? 'url(#pulse-glow)' : undefined}
                >
                  <animateMotion
                    path={`M ${centerX} ${centerY} L ${nodeX} ${nodeY}`}
                    dur={`${2.2 + (NODES.indexOf(node) % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Center Identity Node (Technical Identity Marker) */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-500"
        style={{ left: `${centerX}px`, top: `${centerY}px` }}
      >
        <div className="relative group px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#121215] border border-[#27272A] hover:border-[#FF2E2E]/60 transition-all duration-300 flex flex-col items-center justify-center space-y-1 text-center shadow-xl">
          {/* Subtle red corner markers */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FF2E2E]" aria-hidden="true" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#FF2E2E]" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#FF2E2E]" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#FF2E2E]" aria-hidden="true" />

          {/* Core Branding Label */}
          <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#FAFAFA] uppercase">
            SARVANI
          </span>
          <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-widest text-[#FF2E2E] uppercase">
            PORTFOLIO
          </span>

          {/* Minimal internal pulse indicator */}
          <div className="flex items-center gap-1 pt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#FF2E2E] animate-pulse" aria-hidden="true" />
            <span className="font-mono-tech text-[8px] tracking-widest text-[#A1A1AA]/60 uppercase">
              SYSTEM ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Radial Outer Navigation Nodes */}
      {NODES.map((node, idx) => {
        const rad = (node.angle * Math.PI) / 180;
        const nodeX = centerX + Math.cos(rad) * radiusX;
        const nodeY = centerY + Math.sin(rad) * radiusY;

        const isActive = activeSection === node.id;
        const isHovered = hoveredNode === node.id;

        return (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
            style={{
              left: `${nodeX}px`,
              top: `${nodeY}px`,
              transitionDelay: isReducedMotion ? '0ms' : `${idx * 80}ms`,
            }}
          >
            <a
              href={node.href}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              className={`relative group px-3 py-2 sm:px-4 sm:py-2.5 bg-[#121215] border transition-all duration-300 flex flex-col items-start gap-0.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E2E] ${
                isActive
                  ? 'border-[#FF2E2E] text-[#FAFAFA] bg-[#121215] shadow-lg shadow-[#FF2E2E]/10 translate-y-[-1px]'
                  : isHovered
                  ? 'border-[#FF2E2E]/80 text-[#FAFAFA] bg-[#18181C] translate-y-[-1px]'
                  : 'border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {/* Top Row: Index + Section Name */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#FF2E2E]'
                      : isHovered
                      ? 'bg-[#FF2E2E]'
                      : 'bg-[#3F3F46] group-hover:bg-[#FF2E2E]'
                  }`}
                  aria-hidden="true"
                />
                
                {/* Small Index in JetBrains Mono */}
                <span className="font-mono-tech text-[10px] sm:text-xs text-[#FF2E2E] font-medium tracking-tight">
                  {node.index}
                </span>

                <span className="text-[#3F3F46] font-mono-tech text-[10px]">/</span>

                {/* Section Name in Space Grotesk */}
                <span className="font-display text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FAFAFA]">
                  {node.label}
                </span>
              </div>

              {/* Micro-preview contextual description */}
              <div className="pl-3.5 font-mono-tech text-[9px] text-[#A1A1AA] tracking-wider transition-opacity duration-200">
                <span className={isHovered || isActive ? 'text-[#FAFAFA]/90' : 'text-[#A1A1AA]/60'}>
                  "{node.preview}"
                </span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}

