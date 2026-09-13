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

// Acid Squares Shader Uniforms
uniform float uGlow;
uniform float uWaveDepth;
uniform float uZoom;
uniform float uDensity;
uniform float uSpeed;
uniform float uExposure;
uniform float uSpread;
uniform float uStepSize;
uniform float uContrast;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uGrainIntensity;

// Pseudo-random noise function for film grain texture
float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y; // Normal Y coordinate

    float aspect = uResolution.x / uResolution.y;
    vec2 uv = (st - 0.5) * vec2(aspect, 1.0) * uZoom;
    float t = uTime * uSpeed;

    // Mouse interaction displacement (playful responsive grid warp)
    vec2 normMouse = (uMouse / uResolution - 0.5) * vec2(aspect, 1.0);
    normMouse.y = -normMouse.y;
    float mouseDist = length(uv - normMouse);
    float mouseImpact = smoothstep(uMouseRadius, 0.0, mouseDist);
    vec2 mouseDir = uv - normMouse;
    float dirLen = length(mouseDir);
    if (dirLen > 0.0001) {
        mouseDir /= dirLen;
    }
    // Dynamic organic push + gentle surface ripple around cursor
    vec2 mouseDisp = mouseDir * mouseImpact * uMouseStrength;
    mouseDisp += mouseDir * sin(mouseDist * 16.0 - t * 2.5) * 0.012 * mouseImpact;
    uv += mouseDisp;

    // Retraction transition shift
    uv += vec2(uRetract * 1.5, 0.0);

    // Acid Squares procedural square grid & wave warping logic
    vec2 gridUV = uv * uDensity;
    vec2 cell = floor(gridUV);
    vec2 f = fract(gridUV);

    // Organic wave distortion & depth warp (varies cell size and phase dynamically)
    float cellPhase = sin(cell.x * 0.75 + cell.y * 0.55);
    float wave = sin(cell.x * 0.35 + cell.y * 0.35 + t * 1.1) * uWaveDepth;
    wave += cos(length(cell) * 0.25 - t * 0.75 + cellPhase) * 0.35;

    // Square cell boundaries with uSpread breathing room
    float activeSpread = clamp(uSpread, 0.2, 0.9);
    vec2 border = abs(f - 0.5) * (1.8 / activeSpread);
    float squareDist = max(border.x, border.y);
    float squareEdge = smoothstep(1.0 - uStepSize * 15.0, 1.0, squareDist + wave * 0.10);

    // Controlled low glow
    float glowEffect = exp(-abs(squareDist - 0.85) * (1.0 / (uGlow + 0.001))) * 0.12;

    // Color mixing strictly adhering to neutral portfolio palette (#09090B, #27272A, #71717A)
    vec3 c1 = vec3(0.035, 0.035, 0.043); // #09090B
    vec3 c2 = vec3(0.153, 0.153, 0.165); // #27272A
    vec3 c3 = vec3(0.443, 0.443, 0.478); // #71717A

    float pattern = sin(cell.x * 0.4 + t) * cos(cell.y * 0.4 - t * 0.6 + cellPhase) * 0.5 + 0.5;
    vec3 baseColor = mix(c1, c2, pattern);

    // Organic square grid edge highlights
    baseColor = mix(baseColor, c3, squareEdge * 0.32 + glowEffect * 0.35);

    // Enforce pure neutral monochrome tint (eliminates any potential blue/cyan/purple artifacts)
    float monoLuma = dot(baseColor, vec3(0.299, 0.587, 0.114));
    baseColor = vec3(monoLuma);

    // Apply brightness and contrast adjustments
    baseColor = (baseColor - 0.5) * uContrast + 0.5;
    baseColor *= uBrightness;

    // Apply film grain texture
    float grain = (rand(gl_FragCoord.xy + t) - 0.5) * uGrainIntensity;
    baseColor += vec3(grain);

    // Subtle central readability mask (ensures text legibility while keeping shader clearly visible)
    vec2 centerOffset = (st - vec2(0.5, 0.5)) * vec2(aspect, 1.0);
    float distFromCenter = length(centerOffset);
    float readability = smoothstep(0.10, 0.55, distFromCenter);
    vec3 bgCanvas = vec3(0.035, 0.035, 0.043); // #09090B
    baseColor = mix(bgCanvas, baseColor, 0.50 + 0.50 * readability);

    // Clamp & Apply retraction transition opacity fade
    vec3 finalColor = min(baseColor, vec3(1.0));
    float finalAlpha = 1.0 - uRetract * 0.95;

    fragColor = vec4(finalColor * uOpacity, finalAlpha);
}
`;

export default function AcidSquares({
  className = '',
  isEntering = false,
  glow = 0.08,
  waveDepth = 0.85,
  zoom = 1.35,
  density = 5,
  speed = 0.35,
  exposure = 3500,
  spread = 0.45,
  stepSize = 0.002,
  contrast = 1.0,
  brightness = 0.60,
  opacity = 0.55,
  mouseStrength = 0.11,
  mouseRadius = 0.35,
  grainIntensity = 0.015,
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const retractRef = useRef(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { alpha: false, preserveDrawingBuffer: false }) ||
               canvas.getContext('webgl', { alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('AcidSquares Shader Error:', gl.getShaderInfoLog(shader));
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
      console.error('AcidSquares Link Error:', gl.getProgramInfoLog(program));
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

    const uGlowLoc = gl.getUniformLocation(program, 'uGlow');
    const uWaveDepthLoc = gl.getUniformLocation(program, 'uWaveDepth');
    const uZoomLoc = gl.getUniformLocation(program, 'uZoom');
    const uDensityLoc = gl.getUniformLocation(program, 'uDensity');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uExposureLoc = gl.getUniformLocation(program, 'uExposure');
    const uSpreadLoc = gl.getUniformLocation(program, 'uSpread');
    const uStepSizeLoc = gl.getUniformLocation(program, 'uStepSize');
    const uContrastLoc = gl.getUniformLocation(program, 'uContrast');
    const uBrightnessLoc = gl.getUniformLocation(program, 'uBrightness');
    const uOpacityLoc = gl.getUniformLocation(program, 'uOpacity');
    const uMouseStrengthLoc = gl.getUniformLocation(program, 'uMouseStrength');
    const uMouseRadiusLoc = gl.getUniformLocation(program, 'uMouseRadius');
    const uGrainIntensityLoc = gl.getUniformLocation(program, 'uGrainIntensity');

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
      gl.clearColor(0.035, 0.035, 0.043, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.09;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.09;

      if (isEntering) {
        retractRef.current = Math.min(1.0, retractRef.current + 0.05);
      }

      const elapsedTime = isReducedMotion ? 0 : (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uRetractLoc, retractRef.current);

      gl.uniform1f(uGlowLoc, glow);
      gl.uniform1f(uWaveDepthLoc, waveDepth);
      gl.uniform1f(uZoomLoc, zoom);
      gl.uniform1f(uDensityLoc, density);
      gl.uniform1f(uSpeedLoc, speed);
      gl.uniform1f(uExposureLoc, exposure);
      gl.uniform1f(uSpreadLoc, spread);
      gl.uniform1f(uStepSizeLoc, stepSize);
      gl.uniform1f(uContrastLoc, contrast);
      gl.uniform1f(uBrightnessLoc, brightness);
      gl.uniform1f(uOpacityLoc, opacity);
      gl.uniform1f(uMouseStrengthLoc, mouseStrength);
      gl.uniform1f(uMouseRadiusLoc, mouseRadius);
      gl.uniform1f(uGrainIntensityLoc, grainIntensity);

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
  }, [
    isReducedMotion,
    isEntering,
    glow,
    waveDepth,
    zoom,
    density,
    speed,
    exposure,
    spread,
    stepSize,
    contrast,
    brightness,
    opacity,
    mouseStrength,
    mouseRadius,
    grainIntensity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
