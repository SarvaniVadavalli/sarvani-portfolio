import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Landing from '../sections/landing/Landing';
import Hero from '../sections/hero/Hero';
import CenterFlowSection from '../sections/navigation/CenterFlowSection';
import About from '../sections/about/About';
import Capabilities from '../sections/capabilities/Capabilities';
import Projects from '../sections/projects/Projects';
import Achievements from '../sections/achievements/Achievements';
import Section from '../layout/Section';
import SectionTransitionOverlay from './SectionTransitionOverlay';

/**
 * PortfolioShell Component
 * Fullscreen section experience controller.
 * Enforces 100vw x 100vh (100svh) viewport ownership per section, preventing any next-section previews underneath.
 * Note: Experience section removed completely per Phase 6.0A.
 */
export default function PortfolioShell({ navState }) {
  const {
    sections,
    activeIndex,
    prevIndex,
    isTransitioning,
    direction,
    goToSection,
  } = navState;

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Map section components by index (8 sections: 0 to 7)
  const renderSectionContent = (index) => {
    switch (index) {
      case 0:
        return (
          <Landing
            onEnter={() => goToSection(1)}
            isEntering={isTransitioning && activeIndex === 1}
          />
        );
      case 1:
        return <Hero />;
      case 2:
        return <CenterFlowSection onNavigateToSection={(idx) => goToSection(idx)} />;
      case 3:
        return <About />;
      case 4:
        return <Capabilities />;
      case 5:
        return <Projects />;
      case 6:
        return <Achievements />;
      case 7:
        return (
          <div className="flex flex-col min-h-full justify-between">
            <Section id="contact" className="py-16 sm:py-24 border-t border-[#27272A]">
              <div className="border border-[#27272A] p-8 space-y-4 bg-[#121215]/50">
                <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
                  [ SECTION 07 // CONTACT STRUCTURAL SHELL ]
                </div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
                  Contact Section Placeholder
                </h2>
                <p className="font-body text-sm text-[#A1A1AA]">
                  Structural boundary for interactive contact form, direct channels, and blinking square micro-interactions.
                </p>
              </div>
            </Section>
            <Footer />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-[100vh] h-[100svh] overflow-hidden bg-[#09090B] text-[#FAFAFA] font-body antialiased select-none">
      {/* Sticky Top Navbar (Visible for sections 1 to 7) */}
      <Navbar
        isVisible={activeIndex > 0}
        activeIndex={activeIndex}
        onNavigate={(index) => goToSection(index)}
      />

      {/* Mechanical Structural Transition Overlay */}
      <SectionTransitionOverlay
        isTransitioning={isTransitioning}
        prevSection={sections[prevIndex]}
        activeSection={sections[activeIndex]}
        direction={direction}
      />

      {/* Staged Fullscreen Section Viewport Containers */}
      <main className="relative w-full h-full overflow-hidden">
        {sections.map((sec, idx) => {
          const isActive = activeIndex === idx;
          const isExiting = isTransitioning && prevIndex === idx;
          const isVisible = isActive || isExiting;

          if (!isVisible) return null;

          // Transition transform styles
          let transformStyle = 'translate-y-0 scale-100 opacity-100';

          if (isTransitioning) {
            if (isExiting) {
              transformStyle =
                direction === 'next'
                  ? '-translate-y-6 scale-[0.985] opacity-0'
                  : 'translate-y-6 scale-[0.985] opacity-0';
            } else if (isActive) {
              transformStyle = 'translate-y-0 scale-100 opacity-100';
            }
          }

          return (
            <div
              key={sec.id}
              data-active-section={isActive ? 'true' : 'false'}
              className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col justify-between transition-all duration-600 ease-out ${
                isReducedMotion ? 'transition-opacity duration-300' : ''
              } ${transformStyle}`}
              style={{
                zIndex: isActive ? 20 : 10,
              }}
            >
              {renderSectionContent(idx)}
            </div>
          );
        })}
      </main>
    </div>
  );
}
