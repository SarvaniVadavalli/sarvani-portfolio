import { useEffect, useRef } from 'react';

export default function RadialFlow({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.006;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxDim = Math.max(width, height);
      const pulseRadius = maxDim * 0.28 + Math.sin(time) * 15;

      // Soft center-flow radial gradient using accent red hints
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, pulseRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(255, 46, 46, 0.09)');
      gradient.addColorStop(0.35, 'rgba(39, 39, 42, 0.15)');
      gradient.addColorStop(0.85, 'rgba(18, 18, 21, 0.05)');
      gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Technical radial directional ticks
      const totalTicks = 32;
      ctx.lineWidth = 1;
      for (let i = 0; i < totalTicks; i++) {
        const angle = (i / totalTicks) * Math.PI * 2 + time * 0.03;
        const innerR = pulseRadius * 0.7;
        const outerR = pulseRadius * 1.15;

        const x1 = centerX + Math.cos(angle) * innerR;
        const y1 = centerY + Math.sin(angle) * innerR;
        const x2 = centerX + Math.cos(angle) * outerR;
        const y2 = centerY + Math.sin(angle) * outerR;

        const tickAlpha = (Math.sin(time * 1.5 + i) + 1) * 0.05 + 0.02;
        ctx.strokeStyle = `rgba(255, 46, 46, ${tickAlpha})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className={`absolute inset-0 -z-10 pointer-events-none overflow-hidden ${className}`} 
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
    </div>
  );
}
