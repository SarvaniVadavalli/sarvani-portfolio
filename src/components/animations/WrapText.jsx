import { useEffect, useState, useRef } from 'react';

/**
 * WrapText Component — React Bits Wrap Text pattern adapted for Sarvani's Portfolio.
 * 
 * Renders an animated, interactive word-wrap statement where words assemble smoothly into
 * position on entrance and subtly respond to pointer hover with subtle red accent highlights.
 * 
 * Banned: Glitch text, hacker text, cyberpunk neon, rainbow colors, explosive distortion.
 * Palette: #FAFAFA (base text), #FF2E2E (hover accent state).
 */
export default function WrapText({
  text = 'I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE.',
  className = '',
  as: Component = 'h2',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    // Intersection Observer for single smooth entrance reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Fire once and stay stable
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef}
      className={`font-display font-bold uppercase tracking-wide text-[#FAFAFA] leading-tight select-none border-l-2 border-[#FF2E2E] pl-4 sm:pl-5 py-1.5 bg-[#121215]/40 max-w-2xl ${className}`}
    >
      <span className="flex flex-wrap gap-x-[0.3em] gap-y-[0.15em]">
        {words.map((word, index) => {
          const delay = isReducedMotion ? '0ms' : `${index * 42}ms`;
          const isRevealed = isVisible || isReducedMotion;

          return (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden py-0.5"
            >
              <span
                className={`inline-block transition-all duration-600 ease-out transform group/word cursor-pointer hover:text-[#FF2E2E] hover:-translate-y-[2px] ${
                  isRevealed
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
                style={{
                  transitionDelay: delay,
                  transitionProperty: 'transform, opacity, color',
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
