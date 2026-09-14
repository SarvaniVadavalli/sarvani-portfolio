import { useState, useEffect, useRef } from 'react';

const NODES = [
  { id: 'about', index: '01', label: 'ABOUT', preview: 'Profile + focus', targetIndex: 3, angle: -90 },
  { id: 'capabilities', index: '02', label: 'CAPABILITIES', preview: 'Skills + stack', targetIndex: 4, angle: -18 },
  { id: 'projects', index: '03', label: 'PROJECTS', preview: 'Selected work', targetIndex: 5, angle: 54 },
  { id: 'achievements', index: '04', label: 'ACHIEVEMENTS', preview: 'Recognition', targetIndex: 6, angle: 126 },
  { id: 'contact', index: '05', label: 'CONTACT', preview: "Let's connect", targetIndex: 7, angle: 198 },
];

export default function CenterFlow({ onNavigateToSection }) {
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1200) : 1000,
    height: 500,
  });
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
        const measuredWidth = containerRef.current.offsetWidth || containerRef.current.clientWidth;
        const w = measuredWidth > 0 ? measuredWidth : Math.min(window.innerWidth - 32, 1200);
        const mobile = w < 640;
        const tablet = w >= 640 && w < 1024;
        
        setIsMobile(mobile);
        setIsTablet(tablet);

        // Compute container height based on width for dynamic responsive canvas
        const calcHeight = mobile ? 500 : tablet ? 560 : 620;
        setDimensions({
          width: w,
          height: calcHeight,
        });
      }
    };

    updateSize();
    const rafId = requestAnimationFrame(updateSize);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', updateSize);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Responsive radial distances (Enlarged for enhanced visual composition)
  const radiusX = isMobile ? 145 : isTablet ? 210 : 275;
  const radiusY = isMobile ? 160 : isTablet ? 215 : 240;

  const handleNodeClick = (e, targetIndex) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(targetIndex);
    }
  };

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
          <filter id="pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const nodeX = centerX + Math.cos(rad) * radiusX;
          const nodeY = centerY + Math.sin(rad) * radiusY;
          
          const isHovered = hoveredNode === node.id;

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
                strokeOpacity={isHovered ? "0.8" : "0.35"}
              />

              {/* Foreground interactive line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={nodeX}
                y2={nodeY}
                stroke={isHovered ? '#FF2E2E' : '#3F3F46'}
                strokeWidth={isHovered ? '1.5' : '1'}
                strokeDasharray={isHovered ? 'none' : '3 3'}
                className="transition-all duration-300"
              />

              {/* Animated Red Signal Pulse (Disabled if reduced motion) */}
              {!isReducedMotion && (
                <circle
                  r={isHovered ? '3' : '2'}
                  fill="#FF2E2E"
                  filter={isHovered ? 'url(#pulse-glow)' : undefined}
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
              href={`#${node.id}`}
              onClick={(e) => handleNodeClick(e, node.targetIndex)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              className={`relative group px-3 py-2 sm:px-4 sm:py-2.5 bg-[#121215] border transition-all duration-300 flex flex-col items-start gap-0.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E2E] ${
                isHovered
                  ? 'border-[#FF2E2E]/80 text-[#FAFAFA] bg-[#18181C] translate-y-[-1px]'
                  : 'border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {/* Top Row: Index + Section Name */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 transition-colors duration-300 ${
                    isHovered ? 'bg-[#FF2E2E]' : 'bg-[#3F3F46] group-hover:bg-[#FF2E2E]'
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
                <span className={isHovered ? 'text-[#FAFAFA]/90' : 'text-[#A1A1AA]/60'}>
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
