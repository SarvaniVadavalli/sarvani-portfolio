import { useEffect, useRef, useState } from 'react';

export default function CenterFlowAtmosphere({
  gradientColor = '#09090B',
  className = '',
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 500);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = canvasRef.current.offsetWidth || window.innerWidth;
      height = canvasRef.current.height = canvasRef.current.offsetHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Generate sparse technical geometric element field (NO text, NO card boxes)
    const elementCount = Math.floor(Math.min(width, 1400) / 24);
    const elements = Array.from({ length: elementCount }, (_, i) => {
      const typeSeed = i % 4;
      return {
        baseX: (Math.random() * 0.95 + 0.025) * width,
        baseY: (Math.random() * 0.90 + 0.05) * height,
        currX: 0,
        currY: 0,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        type: typeSeed, // 0: crosshair, 1: line trace, 2: square marker, 3: rare red signal
        size: typeSeed === 1 ? Math.floor(Math.random() * 10 + 10) : 4,
        phase: Math.random() * Math.PI * 2,
        isRed: i % 11 === 3,
      };
    });

    // Initialize current positions
    elements.forEach((el) => {
      el.currX = el.baseX;
      el.currY = el.baseY;
    });

    let startTime = performance.now();

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const elapsed = (now - startTime) * 0.001;

      elements.forEach((el) => {
        // Slow continuous technical drift
        if (!isReducedMotion) {
          el.baseX += el.vx;
          el.baseY += el.vy;

          // Wrap boundaries smoothly
          if (el.baseX < 0) el.baseX = width;
          if (el.baseX > width) el.baseX = 0;
          if (el.baseY < 0) el.baseY = height;
          if (el.baseY > height) el.baseY = 0;
        }

        // Subtle mouse proximity displacement
        let offsetX = 0;
        let offsetY = 0;
        if (!isReducedMotion && mouseRef.current.x > 0) {
          const dx = el.baseX - mouseRef.current.x;
          const dy = el.baseY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist && dist > 0) {
            const factor = Math.pow(1 - dist / maxDist, 2) * 12;
            offsetX = (dx / dist) * factor;
            offsetY = (dy / dist) * factor;
          }
        }

        // Interpolate target render coordinates
        const targetX = el.baseX + offsetX;
        const targetY = el.baseY + offsetY;
        el.currX += (targetX - el.currX) * 0.1;
        el.currY += (targetY - el.currY) * 0.1;

        // Subtle pulse opacity phase
        const pulse = 0.45 + Math.sin(elapsed * 1.2 + el.phase) * 0.25;

        // Render sparse technical geometry
        ctx.lineWidth = 1;

        if (el.isRed) {
          // Rare Sharp Red #FF2E2E signal marker
          ctx.fillStyle = `rgba(255, 46, 46, ${pulse * 0.85})`;
          ctx.fillRect(el.currX - 1, el.currY - 1, 2.5, 2.5);
        } else if (el.type === 0) {
          // Technical 4x4px Crosshair tick
          ctx.strokeStyle = `rgba(63, 63, 70, ${pulse * 0.65})`;
          ctx.beginPath();
          ctx.moveTo(el.currX - 3, el.currY);
          ctx.lineTo(el.currX + 3, el.currY);
          ctx.moveTo(el.currX, el.currY - 3);
          ctx.lineTo(el.currX, el.currY + 3);
          ctx.stroke();
        } else if (el.type === 1) {
          // Short line trace (horizontal or vertical)
          ctx.strokeStyle = `rgba(39, 39, 42, ${pulse * 0.70})`;
          ctx.beginPath();
          ctx.moveTo(el.currX - el.size / 2, el.currY);
          ctx.lineTo(el.currX + el.size / 2, el.currY);
          ctx.stroke();
        } else {
          // Subtle 2x2px square marker
          ctx.fillStyle = `rgba(63, 63, 70, ${pulse * 0.55})`;
          ctx.fillRect(el.currX - 1, el.currY - 1, 2, 2);
        }
      });

      if (!isReducedMotion) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isReducedMotion]);

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />

      {/* Radial Dark Vignette Mask (Guarantees central radial navigation hub remains 100% dominant) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 20%, ${gradientColor} 82%),
                      linear-gradient(to bottom, ${gradientColor} 0%, transparent 15%, transparent 85%, ${gradientColor} 100%)`,
        }}
      />
    </div>
  );
}
