import React, { useEffect, useRef, useState } from 'react';
import Section from '../../layout/Section';
import AchievementItem from './AchievementItem';
import CertificationItem from './CertificationItem';

const ACHIEVEMENTS_DATA = [
  {
    id: 'unstop-hackathon',
    title: '2ND PLACE — UNSTOP HACKATHON',
    organization: 'UNSTOP NATIONAL HACKATHON',
    description:
      'Awarded 2nd place for developing an innovative software solution in a competitive national hackathon.',
  },
  {
    id: 'leetcode-dsa',
    title: 'LEETCODE & STRIVER A2Z DSA PROGRESS',
    organization: 'LEETCODE · STRIVER A2Z SHEET',
    description:
      'Consistent data structures and algorithms practice, solving problems across core CS topics via Striver’s A2Z DSA Sheet.',
  },
];

const CERTIFICATIONS_DATA = [
  {
    id: 'mongodb-cert',
    title: 'MongoDB Associate Developer Certification',
    provider: 'MongoDB',
    status: 'VERIFIED',
  },
  {
    id: 'ibm-cv-cert',
    title: 'Introduction to Computer Vision and Image Processing',
    provider: 'IBM',
    status: 'VERIFIED',
  },
  {
    id: 'nlp-cert',
    title: 'Natural Language Processing with Classification and Vector Spaces',
    provider: null, // Unconfirmed provider per blueprint; omit provider
    status: 'RECORDED',
  },
];

export default function Achievements() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="achievements" className="py-16 sm:py-24 border-t border-[#27272A]">
      <div ref={containerRef} className="space-y-10">
        {/* Section Headline Block */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between border-b border-[#27272A] pb-6 gap-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="space-y-1">
            <div className="font-mono-tech text-xs text-[#FF2E2E] tracking-widest uppercase font-bold">
              RECOGNITION // VERIFIED RECORD
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              ACHIEVEMENTS.
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wider flex items-center gap-2">
            <span>INDEX: 06 // 07</span>
            <span className="text-[#27272A]">//</span>
            <span>SYSTEM: RECOGNITION MATRIX</span>
          </div>
        </div>

        {/* Two-Column Editorial Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 Cols): Achievements List */}
          <div
            className={`lg:col-span-6 space-y-6 transition-all duration-700 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#FAFAFA] font-bold">
                <span className="w-2 h-2 bg-[#FF2E2E]" />
                <span>HONORS & HACKATHONS</span>
              </div>
              <span className="font-mono-tech text-xs text-[#A1A1AA]">
                0{ACHIEVEMENTS_DATA.length} RECORDS
              </span>
            </div>

            <div className="space-y-2">
              {ACHIEVEMENTS_DATA.map((item, idx) => (
                <AchievementItem
                  key={item.id}
                  index={idx + 1}
                  title={item.title}
                  organization={item.organization}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          {/* Right Column (6 Cols): Certifications Registry List */}
          <div
            className={`lg:col-span-6 space-y-6 transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#FAFAFA] font-bold">
                <span className="w-2 h-2 bg-[#FF2E2E]" />
                <span>CERTIFICATIONS & CREDENTIALS</span>
              </div>
              <span className="font-mono-tech text-xs text-[#A1A1AA]">
                0{CERTIFICATIONS_DATA.length} CREDENTIALS
              </span>
            </div>

            <div className="space-y-2">
              {CERTIFICATIONS_DATA.map((item, idx) => (
                <CertificationItem
                  key={item.id}
                  index={idx + 1}
                  title={item.title}
                  provider={item.provider}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
