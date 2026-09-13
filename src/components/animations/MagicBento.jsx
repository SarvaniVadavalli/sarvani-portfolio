import { useState, useRef } from 'react';

export default function MagicBento({
  children,
  className = '',
  spotlightColor = 'rgba(255, 46, 46, 0.12)',
  enableTilt = true
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, magX: 0, magY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variable for cursor spotlight tracking
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained max 2.5 degrees tilt & 3px magnetic translation
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;
      const magX = ((x - centerX) / centerX) * 3;
      const magY = ((y - centerY) / centerY) * 3;

      setTilt({ rotateX, rotateY, magX, magY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, magX: 0, magY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered && enableTilt
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.magX}px, ${tilt.magY}px, 0)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out, border-color 0.3s ease-out',
      }}
      className={`group relative overflow-hidden bg-[#121215] border border-[#27272A] hover:border-[#FF2E2E] active:scale-[0.99] transition-colors duration-300 motion-reduce:transform-none motion-reduce:transition-none cursor-default ${className}`}
    >
      {/* Spotlight Cursor Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:hidden"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Hover Active Corner Red Tick */}
      <div className="pointer-events-none absolute top-3 right-3 flex h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="animate-ping absolute inline-flex h-full w-full bg-[#FF2E2E] opacity-75" />
        <span className="relative inline-flex h-2 w-2 bg-[#FF2E2E]" />
      </div>

      {/* Card Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
