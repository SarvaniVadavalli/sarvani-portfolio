import Section from '../../layout/Section';
import HeroName from './HeroName';
import HeroImage from './HeroImage';
import HeroMeta from './HeroMeta';

export default function Hero() {
  return (
    <Section 
      id="hero" 
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center !py-6 md:!py-10 lg:!py-12"
    >
      {/* Foreground Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
        
        {/* Left Column: Asymmetrical Display Typography & Metadata (7 cols) */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 animate-fade-in">
          
          {/* Top Editorial Subhead Tag */}
          <div className="flex items-center gap-3 font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#FF2E2E]" aria-hidden="true" />
            <span>INTERACTIVE PORTFOLIO // EDITION 2026</span>
          </div>

          {/* Primary Name Header with 3D Letter Swap */}
          <HeroName />

          {/* Brief Editorial Philosophy Subhead */}
          <p className="font-body text-base md:text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
            Architecting intelligent digital experiences at the intersection of AI, computer vision, and modern full-stack engineering.
          </p>

          {/* Technical Metadata Matrix */}
          <HeroMeta className="pt-1" />

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap gap-4 font-mono-tech text-xs uppercase tracking-wider">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#FF2E2E] text-[#09090B] font-semibold border border-[#FF2E2E] hover:bg-[#09090B] hover:text-[#FF2E2E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
            >
              Explore Selected Work ↓
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-[#121215] text-[#FAFAFA] border border-[#27272A] hover:border-[#FAFAFA] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF2E2E]"
            >
              Initiate Contact
            </a>
          </div>

        </div>

        {/* Right Column: Editorial Portrait Presentation (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end pt-4 lg:pt-0">
          <HeroImage />
        </div>

      </div>
    </Section>
  );
}
