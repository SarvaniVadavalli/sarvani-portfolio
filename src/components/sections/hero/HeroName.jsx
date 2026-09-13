import { useState } from 'react';

const FIRST_NAME = 'SARVANI';
const LAST_NAME = 'VADAVALLI';

function LetterSwapWord({ word, className = '' }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {word.split('').map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden group/letter cursor-pointer select-none"
          style={{ transitionDelay: `${index * 25}ms` }}
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

export default function HeroName() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="space-y-1 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Sarvani Vadavalli"
    >
      <div className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] leading-[0.9] tracking-tighter uppercase text-[#FAFAFA]">
        <LetterSwapWord word={FIRST_NAME} />
      </div>
      <div className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.9] tracking-tighter uppercase text-[#A1A1AA] flex items-center gap-3">
        <LetterSwapWord word={LAST_NAME} />
        <span 
          className={`inline-block w-3 h-3 md:w-5 md:h-5 bg-[#FF2E2E] transition-transform duration-300 ${
            isHovered ? 'scale-125 rotate-45' : 'scale-100'
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
