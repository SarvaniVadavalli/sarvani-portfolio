import { useEffect, useRef } from 'react';

/**
 * EditorialField Component — Abstract Geometric Fragment Matrix for Landing Screen.
 * 
 * Renders a sparse, techno-brutalist abstract field of geometric fragments, structural wireframes,
 * technical alignment ticks, and tiny red indicators (#FF2E2E) behind the Landing typography.
 * 
 * Features:
 * - Layer 1: Slow harmonic ambient drift making the background feel alive when still.
 * - Layer 2: Localized elastic mouse reaction (smooth rAF lerp, displacement, subtle rotation).
 * - Typography Protection: Center 45% viewport exclusion zone keeping main title 100% readable.
 * - Accessibility: Fully respects prefers-reduced-motion with static fallback.
 * 
 * Palette: #09090B (bg), #121215 (surface), #27272A (border), #FAFAFA (primary), #A1A1AA (muted), #FF2E2E (accent).
 */
export default function EditorialField({ className = '', isEntering = false }) {
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

    // Reduced motion preference check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Responsive Canvas Resize & Fragment Initialization
    let fragments = [];

    const initFragments = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const count = isMobile ? 14 : isTablet ? 22 : 32;

      fragments = [];

      // Seed fragments avoiding central text area (x: 25%-75%, y: 25%-75%)
      for (let i = 0; i < count; i++) {
        let x, y;
        let attempts = 0;

        // Ensure fragments spawn primarily in outer areas
        do {
          x = Math.random() * width;
          y = Math.random() * height;
          const normX = (x - width * 0.5) / (width * 0.42);
          const normY = (y - height * 0.5) / (height * 0.42);
          const distFromCenter = Math.sqrt(normX * normX + normY * normY);

          if (distFromCenter > 0.65 || attempts > 25) break;
          attempts++;
        } while (attempts < 30);

        const types = ['rect', 'corner', 'cross', 'bar', 'scale'];
        const type = types[i % types.length];

        fragments.push({
          baseX: x,
          baseY: y,
          x,
          y,
          width: 16 + Math.random() * 32,
          height: 10 + Math.random() * 22,
          type,
          angle: (Math.random() - 0.5) * 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.6,
          hasRedAccent: i % 7 === 0, // Tiny structural red square on ~15% of fragments
          opacity: 0.15 + Math.random() * 0.22,
        });
      }
    };

    initFragments();
    window.addEventListener('resize', initFragments, { passive: true });

    // Mouse Event Tracking
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;

      // Pointer Lerp (lerp = 0.08)
      if (mouse.active && !isMobile && !prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      if (!prefersReducedMotion) {
        time += 0.01;
      }

      // Draw each fragment
      fragments.forEach((frag) => {
        // 1. Layer 1 — Ambient Drift (Slow harmonic wave oscillation)
        const ambientX = Math.sin(time * frag.speed + frag.phase) * 3;
        const ambientY = Math.cos(time * frag.speed * 0.8 + frag.phase) * 3;

        // 2. Layer 2 — Localized Mouse Reaction (Elastic displacement push)
        let mouseDispX = 0;
        let mouseDispY = 0;
        let mouseRotate = 0;
        let mouseAlphaBoost = 0;

        if (!isMobile && !prefersReducedMotion) {
          const targetX = frag.baseX + ambientX;
          const targetY = frag.baseY + ambientY;
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRadius = 220;

          if (dist < maxRadius && dist > 0) {
            const factor = Math.pow(1 - dist / maxRadius, 2); // Quadratic falloff
            const maxPush = 14;
            mouseDispX = (dx / dist) * factor * maxPush;
            mouseDispY = (dy / dist) * factor * maxPush;
            mouseRotate = factor * 0.08; // Subtle 4-5 deg rotation
            mouseAlphaBoost = factor * 0.25;
          }
        }

        // Smooth position integration
        frag.x = frag.baseX + ambientX + mouseDispX;
        frag.y = frag.baseY + ambientY + mouseDispY;

        // Center Typography Readability Mask
        const normCenterX = (frag.x - width * 0.5) / (width * 0.42);
        const normCenterY = (frag.y - height * 0.5) / (height * 0.42);
        const centerDistSq = normCenterX * normCenterX + normCenterY * normCenterY;
        const centerMask = Math.min(1, Math.max(0, (Math.sqrt(centerDistSq) - 0.35) / 0.4));

        if (centerMask <= 0.02) return; // Skip drawing if inside quiet center zone

        const finalAlpha = Math.min(0.55, (frag.opacity + mouseAlphaBoost) * centerMask);

        ctx.save();
        ctx.translate(frag.x, frag.y);
        ctx.rotate(frag.angle + mouseRotate);

        ctx.strokeStyle = `rgba(39, 39, 42, ${finalAlpha})`;
        ctx.fillStyle = `rgba(18, 18, 21, ${finalAlpha * 0.5})`;
        ctx.lineWidth = 1;

        // Render Fragment Shapes
        if (frag.type === 'rect') {
          ctx.strokeRect(-frag.width / 2, -frag.height / 2, frag.width, frag.height);
          ctx.fillRect(-frag.width / 2, -frag.height / 2, frag.width, frag.height);
        } else if (frag.type === 'corner') {
          const s = 8;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.lineTo(-s, -s);
          ctx.lineTo(0, -s);
          ctx.stroke();
        } else if (frag.type === 'cross') {
          const s = 4;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.lineTo(s, 0);
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.stroke();
        } else if (frag.type === 'bar') {
          ctx.beginPath();
          ctx.moveTo(-frag.width / 2, 0);
          ctx.lineTo(frag.width / 2, 0);
          ctx.stroke();
        } else if (frag.type === 'scale') {
          ctx.beginPath();
          ctx.moveTo(-12, 0);
          ctx.lineTo(12, 0);
          for (let tick = -12; tick <= 12; tick += 6) {
            ctx.moveTo(tick, -2);
            ctx.lineTo(tick, 2);
          }
          ctx.stroke();
        }

        // Structural Red Indicator (#FF2E2E) on designated outer nodes
        if (frag.hasRedAccent) {
          ctx.fillStyle = `rgba(255, 46, 46, ${finalAlpha * 1.2})`;
          ctx.fillRect(frag.width / 2 + 2, -frag.height / 2, 3.5, 3.5);
        }

        ctx.restore();
      });

      if (!prefersReducedMotion && !isEntering) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Trigger initial render
    render();

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initFragments);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [isEntering]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
