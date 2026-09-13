import { useEffect, useRef } from 'react';
import SlicedWaves from '../../animations/SlicedWaves';

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
      className={`relative w-full h-screen min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isEntering ? 'opacity-0 scale-98 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Techno-Brutalist Stacked Horizontal Slice Layers */}
      <SlicedWaves className="z-0" isEntering={isEntering} />

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
      <main className="relative z-10 mx-auto my-auto text-center flex flex-col items-center justify-center max-w-3xl animate-fade-in px-4">
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-[#FAFAFA] text-center">
          WELCOME TO MY<br />WORK<span className="text-[#FF2E2E]">.</span>
        </h1>
      </main>

      {/* Bottom Minimal [ ENTER ] Action Control */}
      <footer className="relative z-10 flex items-center justify-center font-mono-tech text-xs sm:text-sm uppercase tracking-widest border-t border-[#27272A]/80 pt-4">
        <button
          type="button"
          onClick={triggerEnter}
          className="text-[#FF2E2E] hover:text-[#FAFAFA] font-mono-tech text-xs sm:text-sm uppercase tracking-widest font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[#FF2E2E] cursor-pointer active:scale-95 py-2 px-4"
        >
          [ ENTER ]
        </button>
      </footer>
    </div>
  );
}
