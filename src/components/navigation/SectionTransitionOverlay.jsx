import React from 'react';

/**
 * SectionTransitionOverlay Component
 * Techno-brutalist mechanical transition overlay layer.
 * Briefly displays structural grid lines, red registration mark, and monospace section transition tag during section changes.
 */
export default function SectionTransitionOverlay({
  isTransitioning,
  prevSection,
  activeSection,
  direction,
}) {
  if (!isTransitioning) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-6 sm:p-10 select-none animate-fade-in"
    >
      {/* Background Structural Vignette & Lines */}
      <div className="absolute inset-0 bg-[#09090B]/60 backdrop-blur-[2px] transition-opacity duration-300" />
      
      {/* Top Transition Header Tag */}
      <div className="relative z-50 flex items-center justify-between border-b border-[#27272A] pb-3 font-mono-tech text-xs tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF2E2E] animate-pulse" />
          <span className="text-[#FAFAFA] font-bold">
            SECTION TRANSITION // {direction === 'next' ? 'FORWARD' : 'BACKWARD'}
          </span>
        </div>
        <div className="text-[#A1A1AA]">
          {prevSection?.num} {prevSection?.label} →{' '}
          <span className="text-[#FF2E2E] font-bold">
            {activeSection?.num} {activeSection?.label}
          </span>
        </div>
      </div>

      {/* Center Structural Crosshair & Section Identity Marker */}
      <div className="relative z-50 my-auto text-center space-y-2">
        <div className="inline-block px-4 py-2 bg-[#121215] border border-[#27272A] shadow-2xl">
          <div className="font-mono-tech text-[10px] text-[#FF2E2E] uppercase tracking-widest">
            LOADING SECTION
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#FAFAFA] uppercase tracking-tight">
            {activeSection?.num} // {activeSection?.title}
          </div>
        </div>
      </div>

      {/* Bottom Structural Grid Line */}
      <div className="relative z-50 border-t border-[#27272A] pt-3 flex justify-between font-mono-tech text-[10px] text-[#A1A1AA] uppercase">
        <span>SARVANI PORTFOLIO PRESENTATION</span>
        <span>SYSTEM STATE // SYNCHRONIZING</span>
      </div>
    </div>
  );
}
