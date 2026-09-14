import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * BounceCards Component
 * Adapts React Bits BounceCards animation philosophy to the portfolio's editorial design system.
 * Features GSAP elastic scale-in entrance, asymmetric stack transforms, overlapping cards,
 * interactive sibling displacement, keyboard navigation, and reduced-motion fallback.
 */
export default function BounceCards({
  items = [],
  activeIndex = 0,
  onSelectProject,
  renderCard,
  className = '',
}) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  // Asymmetric base transform presets for 3 cards
  const baseTransforms = [
    { rotate: -6, translateX: -90, translateY: 10 },
    { rotate: 2, translateX: 0, translateY: -10 },
    { rotate: 6, translateX: 90, translateY: 15 },
  ];

  // Responsive mobile transforms to prevent horizontal overflow on small screens
  const getTransformForCard = (index, isActive, isReducedMotion) => {
    if (isReducedMotion) {
      return {
        transform: `rotate(0deg) translate(0px, 0px)`,
        zIndex: isActive ? 30 : 10,
      };
    }

    const base = baseTransforms[index % baseTransforms.length];

    if (isActive) {
      return {
        rotate: 0,
        translateX: base.translateX * 0.4,
        translateY: -16,
        scale: 1.04,
        zIndex: 30,
      };
    }

    // Sibling shifting relative to active card
    const isLeft = index < activeIndex;
    const isRight = index > activeIndex;

    const extraShiftX = isLeft ? -25 : isRight ? 25 : 0;
    const extraRotate = isLeft ? -3 : isRight ? 3 : 0;

    return {
      rotate: base.rotate + extraRotate,
      translateX: base.translateX + extraShiftX,
      translateY: base.translateY,
      scale: 0.96,
      zIndex: 10 + (3 - Math.abs(index - activeIndex)),
    };
  };

  // Entrance GSAP Elastic Animation Trigger
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { scale: 1, opacity: 1 });
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const cards = cardsRef.current.filter(Boolean);
          gsap.fromTo(
            cards,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              delay: 0.2,
              stagger: 0.1,
              ease: 'elastic.out(1, 0.5)',
              clearProps: 'opacity',
            }
          );
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[440px] sm:min-h-[520px] flex items-center justify-center py-4 overflow-hidden ${className}`}
    >
      <div className="relative w-full max-w-[340px] sm:max-w-[440px] h-[400px] sm:h-[460px] flex items-center justify-center">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          const transformStyle = getTransformForCard(
            index,
            isActive,
            isReducedMotion
          );

          return (
            <div
              key={item.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => onSelectProject(index)}
              onMouseEnter={() => onSelectProject(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select project ${index + 1}: ${item.title}`}
              aria-selected={isActive}
              className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#FF2E2E]"
              style={{
                zIndex: transformStyle.zIndex,
                transform: isReducedMotion
                  ? 'none'
                  : `translate3d(${transformStyle.translateX}px, ${transformStyle.translateY}px, 0px) rotate(${transformStyle.rotate}deg) scale(${transformStyle.scale || 1})`,
                transformOrigin: 'center center',
              }}
            >
              {renderCard ? renderCard(item, isActive, index) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
