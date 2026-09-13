import { useEffect, useRef, useState } from 'react';

// Curated technical vocabulary items relating directly to Sarvani's portfolio identity
const TECHNICAL_VOCABULARY = [
  { id: 'v01', index: '// 01', label: 'AI / ML', tag: 'FIELD' },
  { id: 'v02', index: '// 02', label: 'COMPUTER\nVISION', tag: 'DOMAIN', accent: true },
  { id: 'v03', index: '// 03', label: 'FULL STACK', tag: 'SYSTEMS' },
  { id: 'v04', index: '// 04', label: 'CSE / AIML', tag: 'CORE' },
  { id: 'v05', index: '// 05', label: 'RESEARCH', tag: 'LAB' },
  { id: 'v06', index: '// 06', label: 'SYSTEMS', tag: 'ARCH', accent: true },
  { id: 'v07', index: '// 07', label: 'MODELS', tag: 'DATA' },
  { id: 'v08', index: '// 08', label: 'BUILD', tag: 'ACTION' },
  { id: 'v09', index: '// 09', label: 'PIPELINES', tag: 'FLOW' },
  { id: 'v10', index: '// 10', label: 'CODE', tag: 'DEV' },
  { id: 'v11', index: '// 11', label: 'DESIGN', tag: 'SYSTEM' },
  { id: 'v12', index: '// 12', label: 'LEARNING', tag: 'METHOD', accent: true },
  { id: 'v13', index: '// 13', label: 'EXPERIMENT', tag: 'LAB' },
  { id: 'v14', index: '// 14', label: 'SARVANI', tag: 'IDENTITY' },
  { id: 'v15', index: '// 15', label: 'RADIAL', tag: 'NAV' },
  { id: 'v16', index: '// 16', label: 'MATRIX', tag: 'GRID' },
  { id: 'v17', index: '// 17', label: 'REACT', tag: 'STACK' },
  { id: 'v18', index: '// 18', label: 'TAILWIND', tag: 'STYLE' },
  { id: 'v19', index: '// 19', label: 'ALGORITHMS', tag: 'LOGIC', accent: true },
  { id: 'v20', index: '// 20', label: 'NEURAL', tag: 'NETWORKS' },
  { id: 'v21', index: '// 21', label: 'ENGINEERING', tag: 'CS' },
  { id: 'v22', index: '// 22', label: 'INTERFACE', tag: 'WEB' },
  { id: 'v23', index: '// 23', label: 'PROJECTS', tag: 'SHOWCASE' },
  { id: 'v24', index: '// 24', label: 'VISION', tag: 'AI', accent: true },
  { id: 'v25', index: '// 25', label: 'DATA', tag: 'FLOW' },
  { id: 'v26', index: '// 26', label: 'NETWORKS', tag: 'MODEL' },
  { id: 'v27', index: '// 27', label: 'ANALYSIS', tag: 'CORE' },
  { id: 'v28', index: '// 28', label: 'DEPLOY', tag: 'OPS' },
];

export default function GridMotion({
  items = TECHNICAL_VOCABULARY,
  gradientColor = '#09090B',
  className = '',
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Subtle pointer lerp loop for soft background parallax
    const updateParallax = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (containerRef.current && !isReducedMotion) {
        const moveX = mouseRef.current.x * 6;
        const moveY = mouseRef.current.y * 4;
        containerRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(updateParallax);
    };

    animFrameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReducedMotion]);

  // Distribute vocabulary items across 5 staggered horizontal rows
  const rowsCount = 5;
  const itemsPerRow = Math.ceil(items.length / rowsCount);
  const rows = Array.from({ length: rowsCount }, (_, i) =>
    items.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Moving Text Field Rows Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col justify-center gap-6 sm:gap-8 py-6 opacity-80 transition-transform duration-300 ease-out"
      >
        {rows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const animClass = isReducedMotion
            ? ''
            : isEven
            ? 'animate-grid-drift-left'
            : 'animate-grid-drift-right';

          // Repeat items 3x for seamless infinite horizontal scrolling loop
          const displayItems = [...rowItems, ...rowItems, ...rowItems];

          return (
            <div
              key={`text-row-${rowIndex}`}
              className="flex items-center gap-8 sm:gap-14 w-max whitespace-nowrap"
              style={{
                transform: `translateX(${rowIndex * -45}px)`,
              }}
            >
              <div className={`flex items-center gap-8 sm:gap-14 ${animClass}`}>
                {displayItems.map((item, itemIdx) => (
                  <div
                    key={`text-frag-${rowIndex}-${item.id}-${itemIdx}`}
                    className="inline-flex flex-col items-start px-3 py-1.5 bg-transparent border-0 rounded-none transition-opacity duration-300 group"
                  >
                    {/* Top Row: Index + Accent Marker */}
                    <div className="flex items-center gap-1.5 font-mono-tech text-[8px] sm:text-[9px] text-[#52525B]/40 tracking-wider">
                      <span>{item.index}</span>
                      {item.accent && (
                        <span className="w-1 h-1 bg-[#FF2E2E]/60 rounded-none" aria-hidden="true" />
                      )}
                    </div>

                    {/* Technical Label (Faint, Crisp Typography — NO UI Card Box) */}
                    <div className="font-display font-medium text-[10px] sm:text-xs tracking-widest text-[#A1A1AA]/20 uppercase whitespace-pre-line leading-tight">
                      {item.label}
                    </div>

                    {/* Tag / Category Subtext */}
                    <div className="font-mono-tech text-[7px] sm:text-[8px] tracking-widest text-[#52525B]/30 uppercase">
                      {item.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark Radial Mask (Guarantees central radial navigation hub stays 100% dominant) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 20%, ${gradientColor} 82%),
                      linear-gradient(to bottom, ${gradientColor} 0%, transparent 15%, transparent 85%, ${gradientColor} 100%)`,
        }}
      />
    </div>
  );
}
