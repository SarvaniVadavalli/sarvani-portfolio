import { useEffect, useState } from 'react';

// Default controlled array of 24 technical/editorial portfolio tiles (NO stock images)
const DEFAULT_TECHNICAL_ITEMS = [
  { id: '01', index: '// 01', label: 'AI / ML', tag: 'FIELD' },
  { id: '02', index: '// 02', label: 'COMPUTER\nVISION', tag: 'DOMAIN', accent: true },
  { id: '03', index: '// 03', label: 'FULL\nSTACK', tag: 'ENGINEERING' },
  { id: '04', index: '// 04', label: 'CSE / AIML', tag: 'SPECIALIZATION' },
  { id: '05', index: '// 05', label: 'RESEARCH', tag: 'CORE' },
  { id: '06', index: '// 06', label: 'SYSTEMS', tag: 'ARCH', accent: true },
  { id: '07', index: '// 07', label: 'MODELS', tag: 'DATA' },
  { id: '08', index: '// 08', label: 'INTERFACE', tag: 'WEB' },
  { id: '09', index: '// 09', label: 'BUILD', tag: 'ACTION' },
  { id: '10', index: '// 10', label: 'PIPELINES', tag: 'DATA' },
  { id: '11', index: '// 11', label: 'CODE', tag: 'DEV' },
  { id: '12', index: '// 12', label: 'DESIGN', tag: 'SYSTEM' },
  { id: '13', index: '// 13', label: 'VISION', tag: 'AI', accent: true },
  { id: '14', index: '// 14', label: 'LEARNING', tag: 'METHOD' },
  { id: '15', index: '// 15', label: 'EXPERIMENT', tag: 'LAB' },
  { id: '16', index: '// 16', label: 'PROJECTS', tag: 'SHOWCASE' },
  { id: '17', index: '// 17', label: 'SARVANI', tag: 'IDENTITY', accent: true },
  { id: '18', index: '// 18', label: 'INDEX', tag: 'STATUS' },
  { id: '19', index: '// 19', label: 'RADIAL', tag: 'NAV' },
  { id: '20', index: '// 20', label: 'MATRIX', tag: 'GRID' },
  { id: '21', index: '// 21', label: 'REACT', tag: 'STACK' },
  { id: '22', index: '// 22', label: 'TAILWIND', tag: 'STYLE' },
  { id: '23', index: '// 23', label: 'ALGORITHMS', tag: 'LOGIC' },
  { id: '24', index: '// 24', label: 'NEURAL', tag: 'NETWORKS', accent: true },
];

export default function GridMotion({
  items = DEFAULT_TECHNICAL_ITEMS,
  gradientColor = '#09090B',
  className = '',
}) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  // Organize items into 4 distinct staggered horizontal rows
  const rowsCount = 4;
  const itemsPerRow = Math.ceil(items.length / rowsCount);
  const rows = Array.from({ length: rowsCount }, (_, i) =>
    items.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Moving Grid Rows Container */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 sm:gap-4 py-4 sm:py-6 opacity-30 md:opacity-40">
        {rows.map((rowItems, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const animClass = isReducedMotion
            ? ''
            : isEven
            ? 'animate-grid-drift-left'
            : 'animate-grid-drift-right';

          // Repeat items 3x for seamless infinite scrolling loop
          const displayItems = [...rowItems, ...rowItems, ...rowItems];

          return (
            <div
              key={`row-${rowIndex}`}
              className="flex items-center gap-3 sm:gap-4 w-max whitespace-nowrap"
              style={{
                transform: `translateX(${rowIndex * -30}px)`,
              }}
            >
              <div className={`flex items-center gap-3 sm:gap-4 ${animClass}`}>
                {displayItems.map((item, itemIdx) => {
                  const isObject = typeof item === 'object' && item !== null;
                  const itemKey = isObject && item.id ? item.id : itemIdx;

                  return (
                    <div
                      key={`tile-${rowIndex}-${itemKey}-${itemIdx}`}
                      className="w-32 sm:w-44 h-16 sm:h-20 p-2.5 bg-[#121215]/50 border border-[#27272A]/40 rounded-none flex flex-col justify-between"
                    >
                      {isObject ? (
                        <>
                          <div className="flex items-center justify-between font-mono-tech text-[8px] sm:text-[9px] text-[#A1A1AA]/60">
                            <span>{item.index || `// ${(itemIdx % 24) + 1}`}</span>
                            {item.accent && (
                              <span className="w-1 h-1 bg-[#FF2E2E]" aria-hidden="true" />
                            )}
                          </div>
                          <div className="font-display font-semibold text-[10px] sm:text-xs text-[#FAFAFA]/90 uppercase tracking-wider whitespace-pre-line leading-tight">
                            {item.label || String(item)}
                          </div>
                          <div className="font-mono-tech text-[7px] sm:text-[8px] text-[#A1A1AA]/40 uppercase tracking-widest">
                            {item.tag || 'SYSTEM'}
                          </div>
                        </>
                      ) : (
                        <div className="font-mono-tech text-xs text-[#FAFAFA]">
                          {String(item)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark Vignette Overlay (`gradientColor` mask for visual depth) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 20%, ${gradientColor} 90%),
                      linear-gradient(to bottom, ${gradientColor} 0%, transparent 20%, transparent 80%, ${gradientColor} 100%)`,
        }}
      />
    </div>
  );
}

