import { useEffect, useRef } from 'react';

/**
 * HalftoneWave Component — React Bits Halftone Wave pattern adapted for Sarvani's Portfolio.
 * 
 * Renders an ambient, technical Canvas 2D halftone dot matrix background with a slow,
 * print-like wave oscillation. Operates strictly as a background layer.
 * 
 * Banned: Glowing shaders, colorful waves, neon effects, heavy noise, glassmorphism.
 * Palette: #09090B (bg), #27272A (dots), #A1A1AA (subtle highlights), #FF2E2E (accent).
 */
export default function HalftoneWave({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Responsive Canvas Resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Subtle Mouse Proximity Listener
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parentSection = canvas.closest('section') || window;
    parentSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine Spacing & Viewport Tier
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const dotSpacing = isMobile ? 18 : isTablet ? 22 : 26;

      // Mouse Lerp
      if (mouse.active && !isMobile && !prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // Advance wave time unless reduced motion is active
      if (!prefersReducedMotion) {
        time += 0.012;
      }

      // Draw Halftone Dot Matrix
      ctx.fillStyle = '#27272A';

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          // Smooth 2D Halftone Wave Amplitude
          const waveVal1 = Math.sin(i * 0.18 + time) * Math.cos(j * 0.18 + time * 0.7);
          const waveVal2 = Math.sin((i + j) * 0.12 - time * 0.5);
          const waveCombined = (waveVal1 + waveVal2) * 0.5; // [-1, 1]

          // Base Radius Calculation (1.0px to 2.8px)
          let baseRadius = 1.3 + (waveCombined + 1) * 0.75;

          // Subtle Mouse Proximity Boost (up to +1.5px radius)
          let mouseBoost = 0;
          if (mouse.active && !isMobile && !prefersReducedMotion) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const maxDistSq = 140 * 140; // 140px proximity radius
            if (distSq < maxDistSq) {
              const prox = 1 - Math.sqrt(distSq) / 140;
              mouseBoost = prox * 1.5;
            }
          }

          const radius = Math.max(0.8, baseRadius + mouseBoost);

          // Alpha modulation based on wave height
          const alpha = isMobile ? 0.08 : 0.12 + (waveCombined + 1) * 0.04;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          // Subtle Accent Dot (Rare red highlight on peak nodes)
          if (waveCombined > 0.88 && (i + j) % 11 === 0) {
            ctx.fillStyle = 'rgba(255, 46, 46, 0.45)';
          } else if (waveCombined > 0.65) {
            ctx.fillStyle = `rgba(161, 161, 170, ${alpha * 1.1})`; // Subtle #A1A1AA highlight
          } else {
            ctx.fillStyle = `rgba(39, 39, 42, ${alpha})`; // Standard #27272A dot
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parentSection.removeEventListener('mousemove', handleMouseMove);
      parentSection.removeEventListener('mouseleave', handleMouseLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
