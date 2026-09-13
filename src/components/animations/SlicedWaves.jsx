import { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uRetract;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y; // Invert WebGL Y coordinate

    float aspect = uResolution.x / uResolution.y;

    // Mouse proximity calculation (subtle horizontal shift)
    vec2 normMouse = uMouse / uResolution;
    normMouse.y = 1.0 - normMouse.y;
    float mouseDist = length((st - normMouse) * vec2(aspect, 1.0));
    float mouseImpact = smoothstep(0.35, 0.0, mouseDist);

    float retractVal = uRetract;

    // Dark Canvas Background Base Color #09090B
    vec3 bgColor = vec3(0.035, 0.035, 0.043);
    vec3 accumulatedColor = bgColor;

    // 12 Major Straight Horizontal Segment Layers
    const int NUM_LAYERS = 12;

    for (int i = 0; i < NUM_LAYERS; i++) {
        float fi = float(i);
        float dir = mod(fi, 2.0) == 0.0 ? 1.0 : -1.0;

        // Base Y position for this straight horizontal layer
        float baseY = (fi + 0.75) / float(NUM_LAYERS + 1);

        // Retraction shift (horizontal split)
        float retractShift = retractVal * 2.5 * dir;

        // Shifted X coordinate with slower horizontal motion & mouse shift
        float speed = 0.035 + mod(fi, 4.0) * 0.015;
        float mouseShift = mouseImpact * 0.03 * dir;
        float shiftedX = st.x + dir * (uTime * speed) + mouseShift + retractShift;

        // Rectangular Horizontal Segment Slicing
        float sliceScale = 2.8 + mod(fi, 3.0) * 1.2;
        float segmentVal = sin(shiftedX * sliceScale * 3.14159 + fi * 1.7);
        float isSegmentActive = smoothstep(-0.25, 0.25, segmentVal);

        // Distance from fragment Y to straight horizontal slice line
        float distY = abs(st.y - baseY);

        // Straight line core with slightly increased width (thickness ~ 4px)
        float thickness = 0.0038;
        float lineCore = smoothstep(thickness, thickness * 0.2, distY) * isSegmentActive;

        // Controlled Subtle Luminance (glow magnitude strictly 0.08 - 0.15, rapid exponential drop-off)
        float subtleGlow = exp(-distY * 240.0) * 0.12 * isSegmentActive;

        // Slice color selection (85-90% Grayscale, 10-15% Selective Sharp Red #FF2E2E)
        vec3 sliceColor = vec3(0.63, 0.63, 0.67); // #A1A1AA / #52525B mix

        if (mod(fi, 4.0) == 0.0) {
            sliceColor = vec3(0.98, 0.98, 0.98); // #FAFAFA bright monochrome highlight
        } else if (mod(fi, 3.0) == 1.0) {
            sliceColor = vec3(0.32, 0.32, 0.35); // #52525B muted dark gray
        }

        // Selective Sharp Red #FF2E2E signal pulse on layers 3 and 8
        if (i == 3 || i == 8) {
            float redCut = sin(shiftedX * 5.0 + fi) * 0.5 + 0.5;
            if (redCut > 0.65) {
                sliceColor = vec3(1.0, 0.18, 0.18); // Sharp Red #FF2E2E
            }
        }

        // Layer contribution with subtle luminance
        vec3 layerContrib = sliceColor * (lineCore * 0.85 + subtleGlow * 0.35);
        accumulatedColor += layerContrib;
    }

    // Central subtle dimming mask behind text to ensure crisp text contrast
    vec2 centerOffset = (st - vec2(0.5, 0.5)) * vec2(aspect, 1.0);
    float distFromCenter = length(centerOffset);
    float textReadabilityFactor = smoothstep(0.12, 0.48, distFromCenter);
    accumulatedColor = mix(bgColor, accumulatedColor, 0.30 + 0.70 * textReadabilityFactor);

    // Retraction transition opacity fade
    vec3 finalColor = min(accumulatedColor, vec3(1.0));
    float alpha = 1.0 - retractVal * 0.95;

    fragColor = vec4(finalColor, alpha);
}
`;

export default function SlicedWaves({ className = '', isEntering = false }) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const retractRef = useRef(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Reduced motion check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    // Helper: Compile Shader
    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader Compile Error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program Link Error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uRetractLoc = gl.getUniformLocation(program, 'uRetract');

    const resize = () => {
      if (!canvasRef.current) return;
      const width = (canvasRef.current.width = canvasRef.current.offsetWidth || window.innerWidth);
      const height = (canvasRef.current.height = canvasRef.current.offsetHeight || window.innerHeight);
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolutionLoc, width, height);
    };
    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    window.addEventListener('pointermove', handlePointerMove);

    let startTime = performance.now();

    const render = (now) => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (isEntering) {
        retractRef.current = Math.min(1.0, retractRef.current + 0.05);
      }

      const elapsedTime = isReducedMotion ? 0 : (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uRetractLoc, retractRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isReducedMotion || retractRef.current < 1.0) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      gl.deleteProgram(program);
    };
  }, [isReducedMotion, isEntering]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
