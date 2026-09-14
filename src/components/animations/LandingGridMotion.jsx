import { useEffect, useRef, useState } from 'react';

/**
 * OpticalLensPanel Component — Procedural optical lens tile matching the user's visual reference image.
 * 
 * Features:
 * - Off-white / silver-grey base (#FAFAFA / #E4E4E7)
 * - Spherical lens distortion circle with radial gradient
 * - Fine vertical ribbed scanlines
 * - Crisp semicircular dark shadow cutout (#09090B)
 * - Seed-based variations (rotations: 0°, 90°, 180°, 270°, shadow cut directions, lens scales)
 */
function OpticalLensPanel({ seed = 0, isReducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = 360;
    const height = 220;
    canvas.width = width;
    canvas.height = height;

    let animFrameId;
    let time = seed * 1.2;

    // Seed-based parameters
    const rotationDeg = (seed % 4) * 90;
    const rotationRad = (rotationDeg * Math.PI) / 180;
    const radius = 95 + (seed % 3) * 15;
    const shadowDirection = seed % 2 === 0 ? 1 : -1;

    const render = () => {
      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Base off-white background fill
      ctx.fillStyle = '#E4E4E7';
      ctx.fillRect(0, 0, width, height);

      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotationRad);

      if (!isReducedMotion) {
        time += 0.008;
      }

      const cx = 0;
      const cy = 0;

      // 1. Draw outer spherical lens radial gradient
      const lensGrad = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.3, radius * 0.1,
        cx, cy, radius * 1.2
      );
      lensGrad.addColorStop(0, '#FFFFFF');
      lensGrad.addColorStop(0.5, '#F4F4F5');
      lensGrad.addColorStop(0.85, '#D4D4D8');
      lensGrad.addColorStop(1, '#A1A1AA');

      ctx.fillStyle = lensGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw sharp semicircular dark shadow cutout (#09090B) across lower hemisphere
      ctx.fillStyle = '#09090B';
      ctx.beginPath();
      const startAngle = shadowDirection > 0 ? 0 : Math.PI;
      const endAngle = shadowDirection > 0 ? Math.PI : Math.PI * 2;
      ctx.arc(cx, cy, radius * 0.96, startAngle, endAngle);
      ctx.fill();

      // 3. Draw fine vertical ribbed scanlines across lens field
      const ribSpacing = 3;
      ctx.lineWidth = 1.2;

      for (let x = -radius; x <= radius; x += ribSpacing) {
        const h = Math.sqrt(Math.max(0, radius * radius - x * x));
        if (h <= 0) continue;

        // Modulate alpha based on radial distance & wave phase
        const normDist = Math.abs(x) / radius;
        const wave = Math.sin(x * 0.1 + time + seed) * 0.15;
        const alpha = Math.max(0.08, (1 - normDist * 0.6 + wave) * 0.45);

        ctx.strokeStyle = `rgba(9, 9, 11, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, -h * 0.95);
        ctx.lineTo(x, h * 0.95);
        ctx.stroke();
      }

      // 4. Subtle specular highlight arc on upper hemisphere
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.92, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      ctx.restore();

      if (!isReducedMotion) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [seed, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

/**
 * LandingGridMotion Component — True 4-Row Grid Motion with Reference Optical Lens Panels.
 * 
 * Implements 4 horizontal rows with 7 tiles per row (28 total tiles).
 * Row 1 -> Right, Row 2 -> Left, Row 3 -> Right, Row 4 -> Left.
 * Continuous horizontal drift + mouse X inertia physics.
 */
export default function LandingGridMotion({ className = '', isEntering = false }) {
  const containerRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseRef = useRef({ x: 0, targetX: 0 });
  const driftRef = useRef(0);
  const animFrameId = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Reduced motion preference check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    // Pointer tracking across viewport with diagonal projection
    const handlePointerMove = (e) => {
      if (mediaQuery.matches || isEntering) return;
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      // Project mouse motion along the diagonal movement axis (-14deg tilt)
      mouseRef.current.targetX = normX * 0.85 + normY * 0.45;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Main animation loop: continuous diagonal row drift + mouse inertia
    const updateMotion = () => {
      if (!isReducedMotion && !isEntering) {
        // Autonomous slow diagonal drift
        driftRef.current += 0.38;

        // Pointer lerp (lerp = 0.05 for smooth inertia settling)
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;

        // Inertia factors per row
        const inertiaFactors = [0.65, -0.45, 0.55, -0.35, 0.45];

        rowRefs.current.forEach((rowEl, index) => {
          if (!rowEl) return;

          const isEven = index % 2 === 0;
          const driftDirection = isEven ? 1 : -1;
          const mouseFactor = (inertiaFactors[index] || 0.4) * 290;

          const currentDrift = (driftRef.current * driftDirection * (0.75 + index * 0.12)) % 700;
          const mouseShift = mouseRef.current.x * mouseFactor;

          rowEl.style.transform = `translate3d(${currentDrift + mouseShift}px, 0, 0)`;
        });

        animFrameId.current = requestAnimationFrame(updateMotion);
      }
    };

    animFrameId.current = requestAnimationFrame(updateMotion);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isReducedMotion, isEntering]);

  // 5 rows x 7 tiles (35 total tile seeds for full diagonal coverage)
  const rows = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
  ];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#09090B] ${className}`}
      aria-hidden="true"
    >
      {/* Rotated Diagonal Tracks Container (-14deg tilt matching reference image) */}
      <div 
        className="absolute -inset-48 sm:-inset-64 flex flex-col justify-center gap-6 sm:gap-8 py-6 opacity-85 will-change-transform"
        style={{
          transform: 'rotate(-14deg) scale(1.18)',
        }}
      >
        {rows.map((rowSeeds, rowIndex) => {
          // Tripled items for seamless infinite loop appearance
          const displaySeeds = [...rowSeeds, ...rowSeeds, ...rowSeeds];

          return (
            <div
              key={`grid-row-${rowIndex}`}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              className="flex items-center gap-5 sm:gap-7 w-max whitespace-nowrap will-change-transform"
              style={{
                transform: `translate3d(${rowIndex * -140}px, 0, 0)`,
              }}
            >
              {displaySeeds.map((seed, tileIdx) => (
                <div
                  key={`panel-${rowIndex}-${tileIdx}`}
                  className="relative shrink-0 w-[260px] sm:w-[310px] md:w-[350px] h-[160px] sm:h-[195px] md:h-[225px] bg-[#121215] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Procedural Optical Lens Panel matching User Reference */}
                  <OpticalLensPanel seed={seed} isReducedMotion={isReducedMotion} />

                  {/* Dark Wireframe Edge Frame */}
                  <div className="absolute inset-0 border border-[#27272A]/80 rounded-2xl pointer-events-none" />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Center Dark Protection Vignette Layer (Guarantees central typography stays 100% readable & dominant) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(9, 9, 11, 0.72) 0%, rgba(9, 9, 11, 0.88) 55%, rgba(9, 9, 11, 0.96) 90%),
                      linear-gradient(to bottom, rgba(9, 9, 11, 0.95) 0%, transparent 15%, transparent 85%, rgba(9, 9, 11, 0.95) 100%)`,
        }}
      />
    </div>
  );
}
