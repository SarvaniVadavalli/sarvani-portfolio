import { useState, useEffect, useRef } from 'react';
import portraitAsset from '../../../assets/1.jpeg';

export default function HeroImage({ className = '' }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const containerRef = useRef(null);

  // Animation physics state stored in refs to avoid React re-renders on mouse movement
  const animFrameId = useRef(null);
  const targetRot = useRef({ x: 0, y: 0, scale: 1 });
  const currentRot = useRef({ x: 0, y: 0, scale: 1 });
  const isHovered = useRef(false);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Reduced Motion Detection
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    // 2. Touch/Mobile Device Detection (enableMobileTilt = false by default)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkMobile);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Animation Loop via rAF with linear interpolation (lerp)
  const animate = () => {
    if (!cardRef.current) return;

    const lerp = 0.08; // Smooth pointer interpolation factor
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * lerp;
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * lerp;
    currentRot.current.scale += (targetRot.current.scale - currentRot.current.scale) * lerp;

    const { x, y, scale } = currentRot.current;
    
    // Main Profile Card Transform
    cardRef.current.style.transform = `perspective(1000px) rotateX(${x.toFixed(3)}deg) rotateY(${y.toFixed(3)}deg) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`;

    // Behind Glow Spatial Depth Response
    if (glowRef.current) {
      glowRef.current.style.transform = `perspective(1000px) rotateX(${(x * 0.75).toFixed(3)}deg) rotateY(${(y * 0.75).toFixed(3)}deg) translate3d(${(y * 1.2).toFixed(2)}px, ${(-x * 1.2).toFixed(2)}px, -20px) scale3d(${(1 + (scale - 1) * 1.3).toFixed(3)}, ${(1 + (scale - 1) * 1.3).toFixed(3)}, 1)`;
    }

    // Continue loop while hovered or while smoothly returning to 0
    const deltaX = Math.abs(targetRot.current.x - currentRot.current.x);
    const deltaY = Math.abs(targetRot.current.y - currentRot.current.y);
    const deltaScale = Math.abs(targetRot.current.scale - currentRot.current.scale);

    if (isHovered.current || deltaX > 0.005 || deltaY > 0.005 || deltaScale > 0.001) {
      animFrameId.current = requestAnimationFrame(animate);
    } else {
      // Resting position
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (glowRef.current) {
        glowRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, -20px) scale3d(1, 1, 1)';
      }
      animFrameId.current = null;
    }
  };

  const startAnimation = () => {
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(animate);
    }
  };

  const handlePointerMove = (e) => {
    if (isReducedMotion || isMobile || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Constrain normalized coords between -1 and 1
    const nx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, (py - 0.5) * 2));

    const maxTilt = 5.5; // Restrained editorial visual tilt (max ~5.5 degrees)
    targetRot.current.x = -ny * maxTilt;
    targetRot.current.y = nx * maxTilt;
    targetRot.current.scale = 1.015; // Subtle tactile depth

    isHovered.current = true;
    startAnimation();
  };

  const handlePointerLeave = () => {
    if (isReducedMotion || isMobile) return;
    targetRot.current.x = 0;
    targetRot.current.y = 0;
    targetRot.current.scale = 1;
    isHovered.current = false;
    startAnimation();
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative group max-w-[320px] sm:max-w-[370px] lg:max-w-[400px] xl:max-w-[440px] w-full select-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Profile Card Restrained Red Behind Glow (#FF2E2E Radial Falloff) */}
      <div 
        ref={glowRef}
        className="absolute -inset-6 sm:-inset-8 -z-20 pointer-events-none rounded-full opacity-60 sm:opacity-75 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 46, 46, 0.14) 0%, rgba(255, 46, 46, 0.04) 55%, transparent 75%)',
          filter: 'blur(32px)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Background Structural Angular Offset Frame (#FF2E2E Accent Outline) */}
      <div 
        className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full border border-[#FF2E2E]/40 -z-10 bg-[#121215] pointer-events-none transform -rotate-2 transition-all duration-500 group-hover:border-[#FF2E2E] group-hover:rotate-0"
        aria-hidden="true" 
      />

      {/* Main 3D Tiltable Profile Card */}
      <div 
        ref={cardRef}
        className="relative bg-[#121215] border border-[#27272A] p-2 sm:p-2.5 shadow-2xl transition-colors duration-300 group-hover:border-[#FF2E2E]/60"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Red Corner Tick Indicators (#FF2E2E) */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF2E2E] z-20 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF2E2E] z-20 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF2E2E] z-20 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF2E2E] z-20 pointer-events-none" aria-hidden="true" />

        {/* Inner Editorial Crop Frame */}
        <div className="relative aspect-[4/5] bg-[#09090B] overflow-hidden border border-[#27272A]">
          <img
            src={portraitAsset}
            alt="Sarvani Vadavalli — Editorial Portrait"
            loading="eager"
            className="w-full h-full object-cover object-[center_18%] transition-all duration-700 ease-out filter grayscale-[75%] contrast-[112%] brightness-[96%] saturate-[25%] group-hover:grayscale-[15%] group-hover:contrast-[105%] group-hover:scale-[1.03]"
          />

          {/* Editorial Technical Specification Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#09090B]/95 border-t border-[#27272A] px-3.5 py-2.5 flex items-center justify-between font-mono-tech text-[10px] sm:text-xs uppercase text-[#FAFAFA] z-20">
            <span className="flex items-center gap-2 font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#FF2E2E]" aria-hidden="true" />
              SARVANI VADAVALLI
            </span>
            <span className="text-[#A1A1AA] tracking-widest">FIGURE // 01</span>
          </div>
        </div>
      </div>
    </div>
  );
}
