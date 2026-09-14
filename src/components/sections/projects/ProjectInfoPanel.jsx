import React from 'react';

/**
 * ProjectInfoPanel Component
 * Side inspector panel displaying detailed, resume-grounded project metadata.
 * Updates dynamically when active project card changes.
 */
export default function ProjectInfoPanel({ project, index, total, onNext, onPrev }) {
  if (!project) return null;

  const { title, subtitle, stack, description, systems, status } = project;

  return (
    <div
      className="bg-[#121215] border border-[#27272A] p-6 sm:p-8 flex flex-col justify-between h-full relative"
      style={{ borderRadius: '1px' }}
    >
      {/* Top Header Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-end border-b border-[#27272A] pb-4">
          <span className="font-mono-tech text-xs text-[#FAFAFA] font-bold px-2 py-0.5 bg-[#09090B] border border-[#27272A]">
            0{index + 1} / 0{total}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1 pt-2">
          <div className="font-mono-tech text-xs text-[#FF2E2E] tracking-widest uppercase font-bold">
            ACTIVE SPECIFICATION
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#FAFAFA] uppercase tracking-tight">
            {title}
          </h3>
          <p className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* Description Block */}
        <div className="pt-4 border-t border-[#27272A] space-y-2">
          <div className="font-mono-tech text-[11px] text-[#A1A1AA] uppercase tracking-wider">
            [ DESCRIPTION ]
          </div>
          <p className="font-body text-sm text-[#FAFAFA]/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack List */}
        <div className="pt-4 border-t border-[#27272A] space-y-2">
          <div className="font-mono-tech text-[11px] text-[#A1A1AA] uppercase tracking-wider">
            [ TECH STACK ]
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((item, idx) => (
              <span
                key={idx}
                className="font-mono-tech text-xs px-2.5 py-1 bg-[#09090B] border border-[#27272A] text-[#FAFAFA] hover:border-[#FF2E2E]/50 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Systems / Technical Elements */}
        {systems && systems.length > 0 && (
          <div className="pt-4 border-t border-[#27272A] space-y-2">
            <div className="font-mono-tech text-[11px] text-[#A1A1AA] uppercase tracking-wider">
              [ TECHNICAL ELEMENTS & SYSTEMS ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {systems.map((sys, idx) => (
                <div
                  key={idx}
                  className="font-mono-tech text-xs p-2 bg-[#09090B] border border-[#27272A] text-[#A1A1AA] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#FF2E2E]" />
                  <span className="text-[#FAFAFA] font-medium">{sys}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer System Status & Navigation Controls */}
      <div className="pt-6 mt-6 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-xs text-[#A1A1AA]">STATUS:</span>
          <span className="font-mono-tech text-xs text-[#FAFAFA] px-2 py-0.5 bg-[#09090B] border border-[#27272A] font-bold">
            {status}
          </span>
        </div>

        {/* Quick Inspector Switch Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            aria-label="Previous Project"
            className="font-mono-tech text-xs px-3 py-1.5 bg-[#09090B] border border-[#27272A] text-[#FAFAFA] hover:border-[#FF2E2E] hover:text-[#FF2E2E] focus:outline-none focus:ring-1 focus:ring-[#FF2E2E] transition-colors"
          >
            ← PREV
          </button>
          <button
            onClick={onNext}
            aria-label="Next Project"
            className="font-mono-tech text-xs px-3 py-1.5 bg-[#09090B] border border-[#27272A] text-[#FAFAFA] hover:border-[#FF2E2E] hover:text-[#FF2E2E] focus:outline-none focus:ring-1 focus:ring-[#FF2E2E] transition-colors"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
