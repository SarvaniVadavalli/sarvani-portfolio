import { useState } from 'react';

const FIRST_NAME = 'SARVANI';
const LAST_NAME = 'VADAVALLI';

function LetterSwapWord({ word, className = '' }) {
  return (
    <span className={`inline-flex flex-nowrap whitespace-nowrap ${className}`}>
      {word.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden group/letter cursor-pointer select-none"
          style={{ transitionDelay: `${index * 22}ms` }}
        >
          {/* Default Front Character */}
          <span 
            className="inline-block transition-transform duration-300 ease-out group-hover/letter:-translate-y-full group-focus/letter:-translate-y-full text-[#FAFAFA]"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
          {/* Swapped Accent Character */}
          <span 
            className="absolute left-0 top-0 inline-block transition-transform duration-300 ease-out translate-y-full group-hover/letter:translate-y-0 group-focus/letter:translate-y-0 text-[#FF2E2E]"
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function HeroName({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`space-y-0 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Sarvani Vadavalli"
    >
      {/* Refined Display First Name Header (Occupies ~45-55% desktop width, zero wrapping) */}
      <div className="font-display font-bold text-[clamp(44px,6.8vw,115px)] leading-[0.88] tracking-tighter uppercase text-[#FAFAFA] whitespace-nowrap">
        <LetterSwapWord word={FIRST_NAME} />
      </div>

      {/* Refined Display Last Name Header + Terminal Red Square */}
      <div className="font-display font-bold text-[clamp(36px,5.8vw,98px)] leading-[0.88] tracking-tighter uppercase text-[#A1A1AA] flex items-center gap-2 sm:gap-4 whitespace-nowrap">
        <LetterSwapWord word={LAST_NAME} />
        <span 
          className={`inline-block w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-[#FF2E2E] transition-transform duration-300 ${
            isHovered ? 'scale-125 rotate-45' : 'scale-100'
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
