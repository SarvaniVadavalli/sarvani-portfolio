import Section from '../../layout/Section';
import CenterFlow from '../../animations/CenterFlow';
import GridMotion from '../../animations/GridMotion';

export default function CenterFlowSection({ onNavigateToSection }) {
  return (
    <Section id="center-flow-nav" className="relative py-12 md:py-16 bg-[#09090B] overflow-hidden">
      {/* Background Layer: Animated Technical Text Field (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridMotion gradientColor="#09090B" />
      </div>

      {/* Foreground Content Layer (z-10) */}
      <div className="relative z-10 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
          <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
            <span>EXPLORE // NAVIGATE PORTFOLIO</span>
          </div>
          <span className="font-mono-tech text-[10px] text-[#A1A1AA]/70 uppercase tracking-widest hidden sm:inline">
            RADIAL INDEX // 05 NODES
          </span>
        </div>

        {/* Center Flow Radial Navigation System */}
        <CenterFlow onNavigateToSection={onNavigateToSection} />

      </div>
    </Section>
  );
}
