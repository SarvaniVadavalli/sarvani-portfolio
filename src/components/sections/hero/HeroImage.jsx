import { useState, useEffect, useRef } from 'react';
import portraitAsset from '../../../assets/1.jpeg';

export default function HeroImage({ className = '' }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check user reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Restrained Pointer Parallax Handler (Max 8px translation)
  const handleMouseMove = (e) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setOffset({
      x: Math.max(-1, Math.min(1, deltaX)) * 8,
      y: Math.max(-1, Math.min(1, deltaY)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group max-w-[320px] sm:max-w-[360px] lg:max-w-[390px] w-full select-none ${className}`}
    >
      {/* Outer Techno-Brutalist Frame with Parallax Layer */}
      <div 
        className="relative bg-[#121215] border border-[#27272A] p-2 shadow-2xl transition-colors duration-300 group-hover:border-[#FF2E2E]/60"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(${offset.x * 0.4}px, ${offset.y * 0.4}px, 0)`,
        }}
      >
        {/* Red Accent Corner Markers (#FF2E2E) */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF2E2E] z-10" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF2E2E] z-10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF2E2E] z-10" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF2E2E] z-10" aria-hidden="true" />

        {/* Editorial Responsive Crop Container (Max height constrained to viewport) */}
        <div className="relative aspect-[4/5] max-h-[50vh] sm:max-h-[55vh] lg:max-h-[60vh] bg-[#09090B] overflow-hidden border border-[#27272A]">
          <img
            src={portraitAsset}
            alt="Sarvani — Personal Editorial Portrait"
            loading="eager"
            className="w-full h-full object-cover object-[center_20%] transition-all duration-500 ease-out filter grayscale-[75%] contrast-[112%] brightness-[96%] saturate-[25%] group-hover:grayscale-[20%] group-hover:contrast-[105%] group-hover:scale-[1.03]"
            style={{
              transform: isReducedMotion ? 'none' : `translate3d(${offset.x * 0.8}px, ${offset.y * 0.8}px, 0)`,
            }}
          />

          {/* Technical Metadata Badge Overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-[#09090B]/90 border border-[#27272A] px-3 py-1.5 flex items-center justify-between font-mono-tech text-[10px] uppercase text-[#FAFAFA] z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#FF2E2E]" />
              SARVANI VADAVALLI
            </span>
            <span className="text-[#A1A1AA]">PORTRAIT // 01</span>
          </div>
        </div>
      </div>

      {/* Background Structural Offset Grid Frame */}
      <div 
        className="absolute -bottom-3 -right-3 w-full h-full border border-[#27272A] -z-10 bg-[#09090B] pointer-events-none"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(${-offset.x * 0.3}px, ${-offset.y * 0.3}px, 0)`,
        }}
        aria-hidden="true" 
      />
    </div>
  );
}
