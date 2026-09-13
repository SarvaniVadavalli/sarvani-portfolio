import { useEffect, useRef } from 'react';
import RippleGrid from '../../animations/RippleGrid';

export default function Landing({ onEnter, isEntering = false }) {
  const isTriggeredRef = useRef(false);
  const touchStartYRef = useRef(0);

  const triggerEnter = () => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;
    onEnter();
  };

  useEffect(() => {
    // 1. Keyboard Handler (Pressing Enter key anywhere on Landing)
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        triggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 2. Wheel Scroll Handler (Scrolling downward triggers entry)
    const handleWheel = (e) => {
      if (e.deltaY > 15) {
        triggerEnter();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });

    // 3. Touch Swipe Handler for Mobile
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      if (deltaY > 25) {
        triggerEnter();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-[100svh] min-h-[100svh] bg-[#09090B] text-[#FAFAFA] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isEntering ? 'opacity-0 scale-98 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background RippleGrid Shader Layer */}
      <RippleGrid
        className="z-0"
        isEntering={isEntering}
        enableRainbow={false}
        gridColor="#3F3F46"
        rippleIntensity={0.045}
        gridSize={12.5}
        gridThickness={5}
        mouseInteraction={true}
        mouseInteractionRadius={0.65}
        opacity={0.55}
        fadeDistance={1.8}
        vignetteStrength={1.7}
        glowIntensity={0.025}
        gridRotation={0}
        lightMode={false}
      />

      {/* Top Editorial Identity Bar */}
      <header className="relative z-10 flex items-center justify-between font-mono-tech text-xs uppercase tracking-widest text-[#A1A1AA] border-b border-[#27272A]/80 pb-4">
        <div className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#FAFAFA]">
          SARVANI<span className="text-[#FF2E2E]">.</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
          <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
          <span>PORTFOLIO ENTRY // 2026</span>
        </div>
      </header>

      {/* Center Main Hero Entrance Callout */}
      <main className="relative z-10 mx-auto my-auto text-center flex flex-col items-center justify-center max-w-4xl animate-fade-in px-4 space-y-6 sm:space-y-8">
        <div className="font-mono-tech text-xs sm:text-sm uppercase tracking-widest text-[#A1A1AA] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
          <span>INTERACTIVE ARCHITECTURE</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-tight text-[#FAFAFA] text-center">
          WELCOME TO MY<br />WORK<span className="text-[#FF2E2E]">.</span>
        </h1>

        {/* Minimal Monospace Text [ ENTER ] Trigger (No button container/glow/fill) */}
        <div className="pt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={triggerEnter}
            className="font-mono-tech text-sm sm:text-base uppercase tracking-widest text-[#A1A1AA] hover:text-[#FF2E2E] hover:tracking-[0.25em] transition-all duration-300 focus-visible:outline-none cursor-pointer bg-transparent border-0 p-0"
          >
            [ ENTER ]
          </button>
        </div>
      </main>

      {/* Bottom Editorial Scroll Instruction */}
      <footer className="relative z-10 flex items-center justify-end font-mono-tech text-xs uppercase tracking-widest text-[#A1A1AA] border-t border-[#27272A]/80 pt-4">
        <div className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
          <span>SCROLL TO ENTER ↓</span>
        </div>
      </footer>
    </div>
  );
}
