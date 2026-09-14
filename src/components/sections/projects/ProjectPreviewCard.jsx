import React from 'react';

/**
 * ProjectPreviewCard Component
 * Renders an editorial, physical project plate with structural typography,
 * technical diagrams, monospace metadata, and restrained #FF2E2E red indicators.
 * Strictly no stock photography, unsplash, or generic AI imagery.
 */
export default function ProjectPreviewCard({ project, isActive, index, total }) {
  const { id, title, subtitle, stackTag, stack } = project;

  return (
    <div
      className={`relative w-full h-full bg-[#121215] border transition-colors duration-300 select-none flex flex-col justify-between p-5 sm:p-6 text-left ${
        isActive
          ? 'border-[#FF2E2E] shadow-[0_0_0_1px_#FF2E2E]'
          : 'border-[#27272A] hover:border-[#A1A1AA]/50'
      }`}
      style={{ borderRadius: '1px' }}
    >
      {/* Top Red Structural Corner Accents for Active State */}
      {isActive && (
        <>
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#FF2E2E] z-10" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[#FF2E2E] z-10" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[#FF2E2E] z-10" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#FF2E2E] z-10" />
        </>
      )}

      {/* Header Metadata Bar */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF2E2E] inline-block" />
          <span className="font-mono-tech text-xs tracking-wider text-[#FAFAFA] font-bold">
            PROJECT 0{index + 1} // 0{total}
          </span>
        </div>
        <span className="font-mono-tech text-[10px] sm:text-xs text-[#A1A1AA] uppercase tracking-wider">
          {stackTag}
        </span>
      </div>

      {/* Oversized Number & Title Block */}
      <div className="my-4 space-y-1">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#FAFAFA] tracking-tight uppercase line-clamp-1">
            {title}
          </h3>
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#27272A] ml-2 select-none">
            0{index + 1}
          </span>
        </div>
        <p className="font-mono-tech text-xs text-[#A1A1AA] uppercase tracking-wide">
          {subtitle}
        </p>
      </div>

      {/* Geometric Editorial Diagram Representation (Project-Specific) */}
      <div className="flex-1 my-3 bg-[#09090B] border border-[#27272A] p-4 sm:p-5 flex flex-col justify-center min-h-[180px] sm:min-h-[220px] relative overflow-hidden font-mono-tech">
        {id === 'unimeet' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-1">
              <span className="text-[#FAFAFA] font-bold">UNIMEET DASHBOARD</span>
              <span className="text-[#FF2E2E] text-[10px]">[ROLE_AUTH]</span>
            </div>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between items-center bg-[#121215] p-1.5 border border-[#27272A]/70">
                <span className="text-[#A1A1AA]">01 DASHBOARD</span>
                <span className="text-[#FAFAFA]">STUDENT / FACULTY</span>
              </div>
              <div className="flex justify-between items-center bg-[#121215] p-1.5 border border-[#27272A]/70">
                <span className="text-[#A1A1AA]">02 FACULTY</span>
                <span className="text-[#FAFAFA]">AVAILABILITY MATRIX</span>
              </div>
              <div className="flex justify-between items-center bg-[#121215] p-1.5 border border-[#27272A]/70">
                <span className="text-[#A1A1AA]">03 APPOINTMENT</span>
                <span className="text-[#FF2E2E]">JWT PROTECTED</span>
              </div>
            </div>
          </div>
        )}

        {id === 'deepfake' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-1">
              <span className="text-[#FAFAFA] font-bold">CNN VISION PIPELINE</span>
              <span className="text-[#FF2E2E] text-[10px]">[TENSORFLOW]</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div className="bg-[#121215] p-1.5 border border-[#27272A] flex flex-col justify-center">
                <span className="text-[#A1A1AA]">INPUT</span>
                <span className="text-[#FAFAFA] font-semibold">IMAGE</span>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#27272A] flex flex-col justify-center">
                <span className="text-[#A1A1AA]">OPENCV</span>
                <span className="text-[#FAFAFA] font-semibold">PREPROC</span>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#FF2E2E]/60 flex flex-col justify-center bg-[#FF2E2E]/5">
                <span className="text-[#FF2E2E]">MODEL</span>
                <span className="text-[#FAFAFA] font-semibold">CNN LAYER</span>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#27272A] flex flex-col justify-center">
                <span className="text-[#A1A1AA]">OUTPUT</span>
                <span className="text-[#FAFAFA] font-semibold">DETECT</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-[#A1A1AA] pt-1">
              <span>AUGMENTATION: ACTIVE</span>
              <span>TUNING: ITERATIVE</span>
            </div>
          </div>
        )}

        {id === 'hospital' && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-1">
              <span className="text-[#FAFAFA] font-bold">RELATIONAL SCHEMA</span>
              <span className="text-[#FF2E2E] text-[10px]">[MYSQL_ENGINE]</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="bg-[#121215] p-1.5 border border-[#27272A] space-y-1">
                <div className="text-[#FF2E2E] font-bold">TABLE: PATIENTS</div>
                <div className="text-[#A1A1AA] truncate">ID · NAME · RECORD</div>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#27272A] space-y-1">
                <div className="text-[#FAFAFA] font-bold">TABLE: DOCTORS</div>
                <div className="text-[#A1A1AA] truncate">ID · DEPT · SCHEDULE</div>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#27272A] space-y-1">
                <div className="text-[#FAFAFA] font-bold">TABLE: APPOINTMENTS</div>
                <div className="text-[#A1A1AA] truncate">FK_PATIENT · FK_DOCTOR</div>
              </div>
              <div className="bg-[#121215] p-1.5 border border-[#27272A] space-y-1">
                <div className="text-[#FAFAFA] font-bold">TABLE: BILLING</div>
                <div className="text-[#A1A1AA] truncate">TRIGGERS · PROCEDURES</div>
              </div>
            </div>
          </div>
        )}

        {/* Ambient Subtle Diagonal Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(45deg,transparent_25%,#FAFAFA_25%,#FAFAFA_50%,transparent_50%,transparent_75%,#FAFAFA_75%,#FAFAFA_100%)] bg-[length:12px_12px]" />
      </div>

      {/* Technical Stack Badges Strip */}
      <div className="pt-3 border-t border-[#27272A] flex flex-wrap gap-1.5 items-center">
        {stack.slice(0, 4).map((tech, i) => (
          <span
            key={i}
            className="font-mono-tech text-[10px] px-1.5 py-0.5 bg-[#09090B] border border-[#27272A] text-[#A1A1AA]"
          >
            {tech}
          </span>
        ))}
        {stack.length > 4 && (
          <span className="font-mono-tech text-[10px] text-[#A1A1AA]">
            +{stack.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
