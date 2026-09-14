import { useEffect, useRef } from 'react';

/**
 * HalftoneWave Component — Techno-Brutalist Technical Grid & Crosshair Motion Matrix.
 * 
 * Provides a subtle, mechanical, pointer-responsive background layer for the Hero section.
 * Features grid matrix alignment, crosshairs, slow technical scanning, elastic cursor displacement,
 * center typographic readability masking, and structural red accents (#FF2E2E).
 * 
 * Banned: Neon colors, glowing gradients, purple/blue/cyan/gold, liquid waves, particle clouds.
 * Palette: #09090B (bg), #27272A (grid/border), #A1A1AA (muted), #FF2E2E (accents).
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

    // Smooth pointer state using rAF lerp physics
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    // Accessibility check
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

    // Pointer event tracking
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

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const gridSpacing = isMobile ? 32 : isTablet ? 38 : 44;

      // Elastic pointer interpolation (lerp = 0.07)
      if (mouse.active && !isMobile && !prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.07;
        mouse.y += (mouse.targetY - mouse.y) * 0.07;
      } else {
        // Return offscreen smoothly
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      if (!prefersReducedMotion) {
        time += 0.008; // Mechanical time step
      }

      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      // Slow mechanical scan sweep (vertical position across viewport)
      const scanY = (Math.sin(time * 0.8) * 0.5 + 0.5) * height;

      // 1. Draw subtle background structural grid lines and crosshairs
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * gridSpacing;
          const baseY = j * gridSpacing;

          // Distance to mouse for localized displacement
          let dispX = 0;
          let dispY = 0;
          let mouseFactor = 0;

          if (!isMobile && !prefersReducedMotion) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 170; // Localized proximity radius

            if (dist < radius && dist > 0) {
              mouseFactor = Math.pow(1 - dist / radius, 2); // Quadratic falloff
              const maxDisp = 8; // Max displacement px
              dispX = (dx / dist) * mouseFactor * maxDisp;
              dispY = (dy / dist) * mouseFactor * maxDisp;
            }
          }

          const nodeX = baseX + dispX;
          const nodeY = baseY + dispY;

          // Center readability vignette mask (lower opacity near center-left where name/copy sits)
          const normCenterX = (nodeX - width * 0.35) / (width * 0.5);
          const normCenterY = (nodeY - height * 0.5) / (height * 0.5);
          const centerDistSq = normCenterX * normCenterX + normCenterY * normCenterY;
          const centerMask = Math.min(1, Math.max(0.12, Math.sqrt(centerDistSq)));

          // Alpha modulation
          const baseAlpha = isMobile ? 0.06 : 0.12 * centerMask;

          // Technical Scan Proximity Boost
          const scanDist = Math.abs(nodeY - scanY);
          const scanBoost = Math.max(0, 1 - scanDist / 90) * 0.12;
          const finalAlpha = Math.min(0.35, baseAlpha + scanBoost);

          // Render precision crosshair (+) at intersection
          const crossSize = isMobile ? 2 : 3.5;
          ctx.strokeStyle = `rgba(39, 39, 42, ${finalAlpha})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(nodeX - crossSize, nodeY);
          ctx.lineTo(nodeX + crossSize, nodeY);
          ctx.moveTo(nodeX, nodeY - crossSize);
          ctx.lineTo(nodeX, nodeY + crossSize);
          ctx.stroke();

          // Render subtle dot matrix at center
          ctx.fillStyle = mouseFactor > 0.3
            ? `rgba(250, 250, 250, ${finalAlpha * 1.4})`
            : `rgba(161, 161, 170, ${finalAlpha * 0.8})`;

          ctx.beginPath();
          ctx.arc(nodeX, nodeY, isMobile ? 1 : 1.2, 0, Math.PI * 2);
          ctx.fill();

          // Structural Red Accent Ticks (#FF2E2E) at select outer grid intersections
          const isOuterArea = centerMask > 0.65;
          const isAccentNode = (i * 7 + j * 13) % 17 === 0;

          if (isOuterArea && isAccentNode) {
            const redAlpha = (0.28 + Math.sin(time * 2 + i) * 0.12) * centerMask;
            ctx.strokeStyle = `rgba(255, 46, 46, ${redAlpha})`;
            ctx.lineWidth = 1.2;

            // Small L-shaped technical corner tick
            const tickSize = 4;
            ctx.beginPath();
            ctx.moveTo(nodeX - tickSize, nodeY);
            ctx.lineTo(nodeX - tickSize, nodeY - tickSize);
            ctx.lineTo(nodeX, nodeY - tickSize);
            ctx.stroke();
          }
        }
      }

      // 2. Draw subtle horizontal scanline pulse across outer viewport edge
      if (!isMobile && !prefersReducedMotion) {
        ctx.strokeStyle = `rgba(255, 46, 46, 0.08)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width * 0.65, scanY);
        ctx.lineTo(width * 0.98, scanY);
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Render initial state
    render();

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
