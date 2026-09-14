import React, { useState } from 'react';

/**
 * CertificationItem Component
 * Compact vertical registry row for verified certifications with status indicators.
 */
export default function CertificationItem({ index, title, provider, status = 'VERIFIED' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      className={`group border-b border-[#27272A] py-4 px-3 transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF2E2E] ${
        isHovered ? 'bg-[#121215] border-[#FF2E2E]/50 translate-x-1.5' : 'bg-transparent'
      }`}
      style={{ borderRadius: '1px' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          {/* Index & Provider Header Strip */}
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            <span
              className={`w-1.5 h-1.5 transition-colors duration-300 ${
                isHovered ? 'bg-[#FF2E2E]' : 'bg-[#3F3F46]'
              }`}
              aria-hidden="true"
            />
            <span className="text-[#FF2E2E] font-bold tracking-wider">
              CREDENTIAL 0{index}
            </span>
            {provider && (
              <>
                <span className="text-[#27272A]">//</span>
                <span className="text-[#A1A1AA] uppercase font-medium">{provider}</span>
              </>
            )}
          </div>

          {/* Certification Title */}
          <h4
            className={`font-display font-semibold text-sm sm:text-base uppercase tracking-tight transition-colors duration-300 ${
              isHovered ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/90'
            }`}
          >
            {title}
          </h4>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 shrink-0 font-mono-tech text-[10px] px-2 py-0.5 bg-[#09090B] border border-[#27272A] uppercase">
          <span className="w-1 h-1 bg-[#FF2E2E]" aria-hidden="true" />
          <span className="text-[#FAFAFA] font-bold">{status}</span>
        </div>
      </div>
    </div>
  );
}
