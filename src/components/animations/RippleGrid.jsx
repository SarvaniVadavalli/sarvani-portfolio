import { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
in vec2 aUv;
out vec2 vUv;
void main() {
    vUv = aUv;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseImpact;
uniform float uRippleIntensity;
uniform float uGridSize;
uniform float uGridThickness;
uniform float uOpacity;
uniform float uFadeDistance;
uniform float uVignetteStrength;
uniform float uGlowIntensity;
uniform vec3 uGridColor;
uniform float uRetract;

in vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.y = 1.0 - st.y;

    float aspect = uResolution.x / uResolution.y;
    vec2 uv = (st - 0.5) * vec2(aspect, 1.0);
    float t = uTime;

    // Normalized mouse position in same aspect UV space
    vec2 normMouse = (uMouse / uResolution - 0.5) * vec2(aspect, 1.0);
    normMouse.y = -normMouse.y;

    // Distance to cursor
    float distToMouse = length(uv - normMouse);

    // Dynamic wave propagation from mouse position
    float wave = sin(distToMouse * 24.0 - t * 4.5);
    float rippleFalloff = exp(-distToMouse * 3.8);
    float ripple = wave * rippleFalloff * uRippleIntensity * uMouseImpact;

    // Retraction transition shift + dynamic ripple displacement
    vec2 warpedUv = uv + vec2(uRetract * 1.5, 0.0) + vec2(ripple);

    // Procedural grid rendering with gridSize & gridThickness
    vec2 gridSt = warpedUv * uGridSize;
    vec2 gridCell = fract(gridSt);
    vec2 gridDist = abs(gridCell - 0.5) * 2.0;

    // Line thickness smoothstep
    float lineDist = max(gridDist.x, gridDist.y);
    float lineWeight = 1.0 - (uGridThickness * 0.008);
    float gridLine = smoothstep(lineWeight, 1.0, lineDist);

    // Vignette and edge fading
    float centerDist = length((st - vec2(0.5)) * vec2(aspect, 1.0));
    float vignette = exp(-pow(centerDist / uFadeDistance, 2.0) * uVignetteStrength);

    // Glow intensity along grid lines
    float glow = exp(-abs(lineDist - lineWeight) * 45.0) * uGlowIntensity;

    // Portfolio design system palette (#09090B base, #3F3F46 grid lines)
    vec3 bgColor = vec3(0.035, 0.035, 0.043); // #09090B
    vec3 lineColor = uGridColor;                 // #3F3F46

    vec3 baseColor = mix(bgColor, lineColor, (gridLine * 0.85 + glow * 1.2) * vignette);

    // Apply subtle film grain
    float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
    baseColor += vec3(grain);

    // Force strict neutral monochrome luminance (0% green/emerald/teal/blue/purple artifacting)
    float luma = dot(baseColor, vec3(0.299, 0.587, 0.114));
    vec3 finalColor = vec3(luma);

    float alpha = uOpacity * vignette * (1.0 - uRetract * 0.95);
    fragColor = vec4(finalColor * uOpacity, alpha);
}
`;

function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
}

export default function RippleGrid({
  className = '',
  isEntering = false,
  gridColor = '#3F3F46',
  rippleIntensity = 0.045,
  gridSize = 6.5,
  gridThickness = 7,
  mouseInteraction = true,
  mouseInteractionRadius = 0.65,
  opacity = 0.55,
  fadeDistance = 1.8,
  vignetteStrength = 1.7,
  glowIntensity = 0.025,
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, impact: 0 });
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
        console.error('RippleGrid Shader Error:', gl.getShaderInfoLog(shader));
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
      console.error('RippleGrid Link Error:', gl.getProgramInfoLog(program));
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
    if (aPositionLoc !== -1) {
      gl.enableVertexAttribArray(aPositionLoc);
      gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);
    }

    // Uniform Locations
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uMouseImpactLoc = gl.getUniformLocation(program, 'uMouseImpact');
    const uRippleIntensityLoc = gl.getUniformLocation(program, 'uRippleIntensity');
    const uGridSizeLoc = gl.getUniformLocation(program, 'uGridSize');
    const uGridThicknessLoc = gl.getUniformLocation(program, 'uGridThickness');
    const uOpacityLoc = gl.getUniformLocation(program, 'uOpacity');
    const uFadeDistanceLoc = gl.getUniformLocation(program, 'uFadeDistance');
    const uVignetteStrengthLoc = gl.getUniformLocation(program, 'uVignetteStrength');
    const uGlowIntensityLoc = gl.getUniformLocation(program, 'uGlowIntensity');
    const uGridColorLoc = gl.getUniformLocation(program, 'uGridColor');
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
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.impact = 1.0;
    };
    window.addEventListener('pointermove', handlePointerMove);

    let startTime = performance.now();

    const render = (now) => {
      gl.clearColor(0.035, 0.035, 0.043, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;
      mouseRef.current.impact *= 0.98;

      if (isEntering) {
        retractRef.current = Math.min(1.0, retractRef.current + 0.05);
      }

      const elapsedTime = isReducedMotion ? 0 : (now - startTime) * 0.001;
      const gridColorRgb = hexToRgb(gridColor);

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsedTime);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uMouseImpactLoc, mouseRef.current.impact);
      gl.uniform1f(uRetractLoc, retractRef.current);

      gl.uniform1f(uRippleIntensityLoc, rippleIntensity);
      gl.uniform1f(uGridSizeLoc, gridSize);
      gl.uniform1f(uGridThicknessLoc, gridThickness);
      gl.uniform1f(uOpacityLoc, opacity);
      gl.uniform1f(uFadeDistanceLoc, fadeDistance);
      gl.uniform1f(uVignetteStrengthLoc, vignetteStrength);
      gl.uniform1f(uGlowIntensityLoc, glowIntensity);
      gl.uniform3f(uGridColorLoc, gridColorRgb[0], gridColorRgb[1], gridColorRgb[2]);

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
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    mouseInteraction,
    mouseInteractionRadius,
    opacity,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
