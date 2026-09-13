import Section from '../../layout/Section';
import HeroName from './HeroName';
import HeroImage from './HeroImage';
import HeroMeta from './HeroMeta';
import HalftoneWave from '../../animations/HalftoneWave';
import WrapText from '../../animations/WrapText';

export default function Hero() {
  return (
    <Section 
      id="hero" 
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center !py-8 md:!py-12 lg:!py-14"
    >
      {/* Ambient React Bits Halftone Wave Background (Strictly single background layer) */}
      <HalftoneWave className="z-0" />

      {/* Foreground Hero Editorial Composition Container */}
      <div className="relative z-10 w-full space-y-8 lg:space-y-10">
        
        {/* Top Editorial Identification Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-widest border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FF2E2E]" aria-hidden="true" />
            <span>INTERACTIVE PORTFOLIO // EDITION 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#121215] border border-[#27272A] text-[#FAFAFA] text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#FF2E2E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-[#FF2E2E]" />
            </span>
            <span>STATUS // AVAILABLE FOR PROJECTS</span>
          </div>
        </div>

        {/* Unified Editorial Grid Composition (Typography + Portrait = One Unit) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Proportional Display Typography, Philosophy & Metadata (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 animate-fade-in">
            
            {/* Display Name Header with 3D Letter Swap (Takes ~45-55% desktop width) */}
            <HeroName />

            {/* React Bits Wrap Text Animated Statement Block */}
            <div className="space-y-3">
              <WrapText 
                text="I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE."
                className="text-base sm:text-lg md:text-xl xl:text-2xl"
              />

              {/* Normal Static Supporting Paragraph */}
              <p className="font-body text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xl pl-4 sm:pl-5">
                Full-stack systems, computer vision, and ML experiments — built to be tested, broken, and made better.
              </p>
            </div>

            {/* Technical Metadata Matrix */}
            <HeroMeta className="pt-1" />

            {/* Action CTAs */}
            <div className="pt-3 flex flex-wrap gap-4 font-mono-tech text-xs uppercase tracking-wider">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-[#FF2E2E] text-[#09090B] font-semibold border border-[#FF2E2E] hover:bg-[#09090B] hover:text-[#FF2E2E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
              >
                Explore Selected Work ↓
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#121215] text-[#FAFAFA] border border-[#27272A] hover:border-[#FAFAFA] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
              >
                Initiate Contact
              </a>
            </div>

          </div>

          {/* Right Column: Angled Graphic Portrait Frame (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-2 lg:pt-0">
            <HeroImage />
          </div>

        </div>

      </div>
    </Section>
  );
}
