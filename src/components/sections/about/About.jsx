import { useState, useEffect, useRef } from 'react';
import Section from '../../layout/Section';
import MagicBento from '../../animations/MagicBento';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="about">
      <div ref={sectionRef} className="space-y-10 md:space-y-14">
        
        {/* 1. Section Header */}
        <div
          className={`flex items-center justify-between pb-4 border-b border-[#27272A] font-mono-tech text-xs tracking-wider transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 text-[#FAFAFA]">
            <span className="h-2 w-2 bg-[#FF2E2E] inline-block" />
            <span className="font-semibold uppercase">01 / ABOUT</span>
          </div>
          <div className="text-[#A1A1AA] uppercase">
            SRM UNIVERSITY AP // 2024–2028
          </div>
        </div>

        {/* 2. Main 12-Column Desktop Grid Layout (ABOUT ME + EDUCATION) */}
        <div className="editorial-grid items-start">
          
          {/* Left Column (7 Cols Desktop, 6 Tablet, 4 Mobile): Dominant ABOUT ME Narrative */}
          <div
            className={`col-span-4 md:col-span-6 lg:col-span-7 space-y-6 transition-all duration-700 delay-100 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="space-y-3">
              <span className="font-mono-tech text-xs text-[#FF2E2E] font-semibold tracking-wide uppercase">
                HI, I'M SARVANI.
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#FAFAFA] leading-[1.15]">
                Computer Science Engineering student at SRM University AP.
              </h2>
            </div>

            <div className="space-y-4 pt-1 font-body text-sm md:text-base text-[#A1A1AA] leading-relaxed">
              <p>
                I'm a Computer Science Engineering student at SRM University AP. I like figuring things out for myself — especially when I don't fully understand something yet.
              </p>

              <p>
                My interests tend to move around. Some days it's technology and tools, other days it's people and why they think the way they do, and sometimes I just want to understand how something works underneath.
              </p>

              <p>
                I care about doing things properly, and I'd rather test something, find where it breaks, and understand why than pretend I already know the answer. Ultimately, I'm working toward having the freedom to build the things I want, in the way I want.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 font-mono-tech text-xs text-[#A1A1AA] pt-4 border-t border-[#27272A]/50">
              <span className="h-1.5 w-1.5 bg-[#FF2E2E]" />
              <span className="uppercase tracking-wider">PERSONAL PROFILE // CURIOSITY & FREEDOM</span>
            </div>
          </div>

          {/* Right Column (5 Cols Desktop, 6 Tablet, 4 Mobile): Secondary EDUCATION Magic Bento Card */}
          <div
            className={`col-span-4 md:col-span-6 lg:col-span-5 mt-6 lg:mt-0 transition-all duration-700 delay-200 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <MagicBento className="p-6 md:p-8 h-full flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#A1A1AA] border-b border-[#27272A] pb-3">
                <span className="text-[#FF2E2E] font-semibold tracking-wider">01 // EDUCATION</span>
                <span className="text-[10px] text-[#A1A1AA] uppercase">ACADEMIC METADATA</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider">
                    INSTITUTION
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#FAFAFA]">
                    SRM UNIVERSITY AP
                  </h3>
                </div>

                <div className="space-y-3 font-mono-tech text-xs pt-3 border-t border-[#27272A]">
                  <div>
                    <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">DEGREE PROGRAM</div>
                    <div className="text-[#FAFAFA] font-medium mt-1">B.Tech — Computer Science & Engineering</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">TIMELINE</div>
                    <div className="text-[#FAFAFA] font-medium mt-1">2024 — 2028</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono-tech text-xs pt-4 border-t border-[#27272A]">
                <span className="text-[#A1A1AA] uppercase text-[10px]">ACADEMIC METRIC</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#FAFAFA]">CGPA:</span>
                  <span className="text-[#FF2E2E] font-bold text-sm">9.11</span>
                </div>
              </div>
            </MagicBento>
          </div>

        </div>

      </div>
    </Section>
  );
}
