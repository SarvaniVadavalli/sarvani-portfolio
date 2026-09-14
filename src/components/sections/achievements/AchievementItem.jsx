import React, { useState } from 'react';

/**
 * AchievementItem Component
 * Renders an editorial achievement record row with monospace index tags,
 * restrained hover translation, and #FF2E2E registration tick marks.
 */
export default function AchievementItem({ index, title, organization, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      className={`group border-b border-[#27272A] py-5 px-3 transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2E2E] ${
        isHovered ? 'bg-[#121215] border-[#FF2E2E]/50 translate-x-1.5' : 'bg-transparent'
      }`}
      style={{ borderRadius: '1px' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          {/* Top Row: Index Tag & Red Indicator */}
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            <span
              className={`w-1.5 h-1.5 transition-colors duration-300 ${
                isHovered ? 'bg-[#FF2E2E]' : 'bg-[#3F3F46]'
              }`}
              aria-hidden="true"
            />
            <span className="text-[#FF2E2E] font-bold tracking-wider">
              ACHIEVEMENT 0{index}
            </span>
          </div>

          {/* Title */}
          <h4
            className={`font-display font-bold text-lg sm:text-xl uppercase tracking-tight transition-colors duration-300 ${
              isHovered ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/90'
            }`}
          >
            {title}
          </h4>

          {/* Subtitle / Organization */}
          {organization && (
            <div className="font-mono-tech text-xs text-[#FF2E2E]/90 uppercase tracking-wide font-medium">
              {organization}
            </div>
          )}

          {/* Description Line */}
          {description && (
            <p className="font-body text-xs text-[#A1A1AA] leading-relaxed pt-1 max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Right Status Tag */}
        <span className="font-mono-tech text-[10px] text-[#A1A1AA] px-2 py-0.5 bg-[#09090B] border border-[#27272A] uppercase tracking-wider shrink-0 mt-1">
          [ RECORDED ]
        </span>
      </div>
    </div>
  );
}
