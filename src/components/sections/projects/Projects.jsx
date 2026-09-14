import React, { useState, useEffect, useCallback } from 'react';
import Section from '../../layout/Section';
import BounceCards from '../../animations/BounceCards';
import ProjectPreviewCard from './ProjectPreviewCard';
import ProjectInfoPanel from './ProjectInfoPanel';

// Final resume-grounded project data specification
const PROJECTS_DATA = [
  {
    id: 'unimeet',
    title: 'UNIMEET',
    subtitle: 'FACULTY APPOINTMENT MANAGEMENT SYSTEM',
    stackTag: 'MERN STACK',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    description:
      'A MERN-based faculty appointment platform with role-based dashboards, protected APIs, and appointment scheduling.',
    systems: [
      'AUTHENTICATION',
      'APPOINTMENT SCHEDULING',
      'ROLE-BASED ACCESS',
    ],
    status: 'COMPLETED',
  },
  {
    id: 'deepfake',
    title: 'DEEPFAKE IMAGE DETECTION',
    subtitle: 'CNN-BASED DEEPFAKE IMAGE DETECTION',
    stackTag: 'COMPUTER VISION',
    stack: ['TensorFlow', 'OpenCV', 'NumPy', 'CNN'],
    description:
      'CNN-based deepfake image detection system using TensorFlow and computer-vision tooling.',
    systems: [
      'CNN ARCHITECTURE',
      'IMAGE PREPROCESSING',
      'IMAGE AUGMENTATION',
      'MODEL TUNING',
    ],
    status: 'COMPLETED',
  },
  {
    id: 'hospital',
    title: 'HOSPITAL MANAGEMENT SYSTEM',
    subtitle: 'RELATIONAL DATABASE APPLICATION',
    stackTag: 'MYSQL / DATABASE',
    stack: ['MySQL', 'SQL'],
    description:
      'Relational database system for managing patients, doctors, appointments, and billing.',
    systems: [
      'NORMALIZATION',
      'CRUD',
      'STORED PROCEDURES',
      'TRIGGERS',
    ],
    status: 'COMPLETED',
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length
    );
  }, []);

  // Global arrow key navigation when Projects section is active/visible
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept arrow keys if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <Section id="projects" className="py-16 sm:py-24 border-t border-[#27272A]">
      <div className="space-y-10">
        {/* Section Headline & Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#27272A] pb-6 gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#FAFAFA]">
              PROJECT ARCHIVE.
            </h2>
          </div>
          <p className="font-body text-sm text-[#A1A1AA] max-w-md">
            Interactive repository of full-stack web platforms, computer vision neural networks, and relational database systems.
          </p>
        </div>

        {/* 12-Column Asymmetrical Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 Cols): BounceCards Visual Stack (No outer border box) */}
          <div className="lg:col-span-7 p-2 sm:p-4 flex flex-col justify-between relative overflow-hidden">
            {/* BounceCards Hero Interactive Stack */}
            <div className="my-auto py-2">
              <BounceCards
                items={PROJECTS_DATA}
                activeIndex={activeIndex}
                onSelectProject={(index) => setActiveIndex(index)}
                renderCard={(project, isActive, index) => (
                  <ProjectPreviewCard
                    project={project}
                    isActive={isActive}
                    index={index}
                    total={PROJECTS_DATA.length}
                  />
                )}
              />
            </div>

            {/* Bottom Quick Select Indicator Controls */}
            <div className="pt-4 border-t border-[#27272A] flex items-center justify-between font-mono-tech text-xs">
              <span className="text-[#A1A1AA]">
                ACTIVE: <span className="text-[#FAFAFA] font-bold">0{activeIndex + 1} // {PROJECTS_DATA[activeIndex].title}</span>
              </span>
              <div className="flex gap-2">
                {PROJECTS_DATA.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to project 0${idx + 1}`}
                    className={`w-7 h-7 border text-[11px] font-bold transition-colors ${
                      activeIndex === idx
                        ? 'border-[#FF2E2E] bg-[#FF2E2E]/10 text-[#FF2E2E]'
                        : 'border-[#27272A] bg-[#121215] text-[#A1A1AA] hover:text-[#FAFAFA]'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Persistent Technical Inspector Panel */}
          <div className="lg:col-span-5 min-h-[460px]">
            <ProjectInfoPanel
              project={PROJECTS_DATA[activeIndex]}
              index={activeIndex}
              total={PROJECTS_DATA.length}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
