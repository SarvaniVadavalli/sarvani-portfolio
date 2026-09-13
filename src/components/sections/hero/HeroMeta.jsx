export default function HeroMeta({ className = '' }) {
  const TECH_TAGS = ['AI / ML', 'COMPUTER VISION', 'FULL STACK', 'CSE / AIML'];

  return (
    <div className={`space-y-5 font-mono-tech ${className}`}>
      
      {/* Technical Specialization Matrix Tags */}
      <div className="space-y-2">
        <div className="text-[10px] text-[#A1A1AA] uppercase tracking-widest">
          CORE FOCUS & SPECIALIZATION
        </div>
        <div className="flex flex-wrap gap-2">
          {TECH_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-[#121215] border border-[#27272A] text-xs text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FF2E2E] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Specification Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#27272A] text-xs">
        <div>
          <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">ROLE ARCHITECTURE</div>
          <div className="text-[#FAFAFA] font-medium mt-0.5">Software & AI Engineer</div>
        </div>
        <div>
          <div className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">GEOGRAPHIC BASE</div>
          <div className="text-[#FAFAFA] font-medium mt-0.5">India // Remote</div>
        </div>
      </div>

    </div>
  );
}
