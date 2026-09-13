import Navbar from './components/layout/Navbar';
import Section from './components/layout/Section';
import Footer from './components/layout/Footer';
import Hero from './components/sections/hero/Hero';
import CenterFlowSection from './components/sections/navigation/CenterFlowSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-body antialiased">
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Content Shell */}
      <main className="flex-1">
        
        {/* Section 1: Hero Interactive Section (Phase 3.1 & 3.2) */}
        <Hero />

        {/* Section 2: Center Flow Interactive Navigation System (Phase 4.2) */}
        <CenterFlowSection />

        {/* Section 3: About Structural Placeholder */}
        <Section id="about">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 03 // ABOUT STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              About Section Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for editorial bio summary, engineering philosophy, and personal background.
            </p>
          </div>
        </Section>

        {/* Section 4: Capabilities Structural Placeholder */}
        <Section id="capabilities">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 04 // CAPABILITIES STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              Capabilities Section Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for technical skills matrix, architectural specialties, and toolstack breakdown.
            </p>
          </div>
        </Section>

        {/* Section 5: Projects Structural Placeholder */}
        <Section id="projects">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 05 // PROJECTS STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              Projects Showcase Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for project cards, filtering grid, and technical showcase items.
            </p>
          </div>
        </Section>

        {/* Section 6: Experience Structural Placeholder */}
        <Section id="experience">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 06 // EXPERIENCE STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              Experience Section Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for career trajectory timeline, roles, and impact metrics.
            </p>
          </div>
        </Section>

        {/* Section 7: Achievements Structural Placeholder */}
        <Section id="achievements">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 07 // ACHIEVEMENTS STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              Achievements Section Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for key highlights, recognitions, metrics, and certifications.
            </p>
          </div>
        </Section>

        {/* Section 8: Contact Structural Placeholder */}
        <Section id="contact">
          <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
            <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
              [ SECTION 08 // CONTACT STRUCTURAL SHELL ]
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              Contact Section Placeholder
            </h2>
            <p className="font-body text-sm text-[#A1A1AA]">
              Structural boundary for interactive contact form, direct channels, and blinking square micro-interactions.
            </p>
          </div>
        </Section>

      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
