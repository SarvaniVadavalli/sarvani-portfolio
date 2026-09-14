/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../../assets/card.glb';
import lanyardTexture from '../../assets/lanyard.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel fallback
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's UV mapping coordinates from card.glb
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 18,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1.05
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI * 0.9} />
        <Physics
          gravity={isReducedMotion ? [0, 0, 0] : gravity}
          timeStep={isReducedMotion ? 0 : isMobile ? 1 / 30 : 1 / 60}
        >
          <Band
            isMobile={isMobile}
            isReducedMotion={isReducedMotion}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={1.5}
            color="#ffffff"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="#ffffff"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="#ffffff"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={4}
            color="#ffffff"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  isReducedMotion = false,
  frontImage = null,
  backImage = null,
  lanyardImage = null,
  lanyardWidth = 0.95
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyardTexture);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas
  // Front = left half (FRONT_UV_RECT), Back = right half (BACK_UV_RECT)
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    // High-resolution canvas texture for razor-sharp clarity
    const W = 2400;
    const H = 2400;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Preserve baked metallic bevels and clamp textures from original atlas
    const baseImg = baseMap?.image;
    if (baseImg) {
      ctx.drawImage(baseImg, 0, 0, W, H);
    }

    // 2. FRONT FACE: Incorporate portrait + red corner markers + bottom strip
    if (frontImage && frontTex.image) {
      const rx = FRONT_UV_RECT.x * W;
      const ry = FRONT_UV_RECT.y * H;
      const rw = FRONT_UV_RECT.w * W;
      const rh = FRONT_UV_RECT.h * H;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();

      // Deep dark background (#09090B)
      ctx.fillStyle = '#09090B';
      ctx.fillRect(rx, ry, rw, rh);

      // Card outer frame border (#121215 with #27272A border)
      const padX = rw * 0.045;
      const padY = rh * 0.035;
      const innerX = rx + padX;
      const innerY = ry + padY;
      const innerW = rw - padX * 2;
      const innerH = rh - padY * 2;

      ctx.fillStyle = '#121215';
      ctx.fillRect(innerX, innerY, innerW, innerH);
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 4;
      ctx.strokeRect(innerX, innerY, innerW, innerH);

      // Portrait area
      const footerH = innerH * 0.11;
      const portX = innerX + 6;
      const portY = innerY + 6;
      const portW = innerW - 12;
      const portH = innerH - footerH - 12;

      ctx.save();
      ctx.beginPath();
      ctx.rect(portX, portY, portW, portH);
      ctx.clip();

      // Editorial high-definition monochrome filter with deep contrast and clarity
      ctx.filter = 'grayscale(80%) contrast(124%) brightness(100%) saturate(20%)';

      const img = frontTex.image;
      const frameAspect = portW / portH;
      // Focus and zoom in on Sarvani (head and upper torso) rather than background canopy
      const cropH = Math.min(img.height * 0.64, 580);
      const cropW = cropH * frameAspect;
      const cropX = (img.width - cropW) / 2;
      const cropY = Math.max(0, Math.min(img.height - cropH, img.height * 0.28));

      ctx.drawImage(img, cropX, cropY, cropW, cropH, portX, portY, portW, portH);
      ctx.restore();

      // Portrait inner frame border
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 3;
      ctx.strokeRect(portX, portY, portW, portH);

      // Red corner markers (#FF2E2E) around portrait frame
      ctx.strokeStyle = '#FF2E2E';
      ctx.lineWidth = 8;
      ctx.lineCap = 'square';
      const tickLen = Math.min(portW, portH) * 0.085;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(portX, portY + tickLen);
      ctx.lineTo(portX, portY);
      ctx.lineTo(portX + tickLen, portY);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(portX + portW - tickLen, portY);
      ctx.lineTo(portX + portW, portY);
      ctx.lineTo(portX + portW, portY + tickLen);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(portX, portY + portH - tickLen);
      ctx.lineTo(portX, portY + portH);
      ctx.lineTo(portX + tickLen, portY + portH);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(portX + portW - tickLen, portY + portH);
      ctx.lineTo(portX + portW, portY + portH);
      ctx.lineTo(portX + portW, portY + portH - tickLen);
      ctx.stroke();

      // Bottom Information Strip (#09090B / #27272A)
      const footY = portY + portH;
      ctx.fillStyle = '#09090B';
      ctx.fillRect(portX, footY, portW, footerH);
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2;
      ctx.strokeRect(portX, footY, portW, footerH);

      // Red square accent marker (#FF2E2E)
      const sqSize = Math.max(12, Math.round(footerH * 0.22));
      const textCenterY = footY + footerH / 2;
      ctx.fillStyle = '#FF2E2E';
      ctx.fillRect(portX + 16, textCenterY - sqSize / 2, sqSize, sqSize);

      // Primary name: SARVANI VADAVALLI (#FAFAFA)
      const fontSize = Math.round(footerH * 0.34);
      ctx.fillStyle = '#FAFAFA';
      ctx.font = `bold ${fontSize}px "JetBrains Mono", "Space Mono", monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText('SARVANI VADAVALLI', portX + 24 + sqSize, textCenterY);

      ctx.restore();
    }

    // 3. BACK FACE: Editorial digital credential plate (BACK_UV_RECT)
    {
      const rx = BACK_UV_RECT.x * W;
      const ry = BACK_UV_RECT.y * H;
      const rw = BACK_UV_RECT.w * W;
      const rh = BACK_UV_RECT.h * H;

      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();

      ctx.fillStyle = '#09090B';
      ctx.fillRect(rx, ry, rw, rh);

      const padX = rw * 0.045;
      const padY = rh * 0.035;
      const innerX = rx + padX;
      const innerY = ry + padY;
      const innerW = rw - padX * 2;
      const innerH = rh - padY * 2;

      ctx.fillStyle = '#121215';
      ctx.fillRect(innerX, innerY, innerW, innerH);
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 3;
      ctx.strokeRect(innerX, innerY, innerW, innerH);

      // Technical blueprint grid lines
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let gx = innerX + 20; gx < innerX + innerW - 20; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, innerY + 20);
        ctx.lineTo(gx, innerY + innerH - 20);
        ctx.stroke();
      }
      for (let gy = innerY + 20; gy < innerY + innerH - 20; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(innerX + 20, gy);
        ctx.lineTo(innerX + innerW - 20, gy);
        ctx.stroke();
      }

      // Red corner markers on back
      ctx.strokeStyle = '#FF2E2E';
      ctx.lineWidth = 5;
      const tickLen = Math.min(innerW, innerH) * 0.08;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(innerX + 4, innerY + 4 + tickLen);
      ctx.lineTo(innerX + 4, innerY + 4);
      ctx.lineTo(innerX + 4 + tickLen, innerY + 4);
      ctx.stroke();
      // Top-right
      ctx.beginPath();
      ctx.moveTo(innerX + innerW - 4 - tickLen, innerY + 4);
      ctx.lineTo(innerX + innerW - 4, innerY + 4);
      ctx.lineTo(innerX + innerW - 4, innerY + 4 + tickLen);
      ctx.stroke();
      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(innerX + 4, innerY + innerH - 4 - tickLen);
      ctx.lineTo(innerX + 4, innerY + innerH - 4);
      ctx.lineTo(innerX + 4 + tickLen, innerY + innerH - 4);
      ctx.stroke();
      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(innerX + innerW - 4 - tickLen, innerY + innerH - 4);
      ctx.lineTo(innerX + innerW - 4, innerY + innerH - 4);
      ctx.lineTo(innerX + innerW - 4, innerY + innerH - 4 - tickLen);
      ctx.stroke();

      // Central ID badge panel
      const plateW = innerW * 0.86;
      const plateH = innerH * 0.44;
      const plateX = innerX + (innerW - plateW) / 2;
      const plateY = innerY + (innerH - plateH) / 2;

      ctx.fillStyle = '#09090B';
      ctx.fillRect(plateX, plateY, plateW, plateH);
      ctx.strokeStyle = '#27272A';
      ctx.lineWidth = 2;
      ctx.strokeRect(plateX, plateY, plateW, plateH);

      // Red accent bar
      ctx.fillStyle = '#FF2E2E';
      ctx.fillRect(plateX, plateY, plateW, 6);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#FAFAFA';
      ctx.font = 'bold 36px "JetBrains Mono", "Space Mono", monospace';
      ctx.fillText('SARVANI VADAVALLI', plateX + 32, plateY + 36);

      ctx.fillStyle = '#A1A1AA';
      ctx.font = '500 20px "JetBrains Mono", "Space Mono", monospace';
      ctx.fillText('SOFTWARE & AI ENGINEER', plateX + 32, plateY + 92);
      ctx.fillText('SECURITY CLEARANCE: PUBLIC // ID-01', plateX + 32, plateY + 130);
      ctx.fillText('SYSTEM ARCHITECTURE × ML RESEARCH', plateX + 32, plateY + 168);

      // Technical barcode pattern
      ctx.fillStyle = '#FAFAFA';
      const barcodeWidths = [4, 2, 7, 3, 2, 8, 3, 2, 5, 2, 6, 4, 2, 8, 3, 5, 2, 7, 3, 4];
      let bx = plateX + 32;
      const barY = plateY + 220;
      for (const w of barcodeWidths) {
        ctx.fillRect(bx, barY, w * 1.5, 60);
        bx += w * 1.5 + 8;
      }

      ctx.fillStyle = '#A1A1AA';
      ctx.font = '500 16px "JetBrains Mono", "Space Mono", monospace';
      ctx.fillText('AUTH: VERIFIED DIGITAL IDENTITY // 2026', plateX + 32, plateY + 310);

      ctx.restore();
    }

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.minFilter = THREE.LinearFilter;
    composite.magFilter = THREE.LinearFilter;
    composite.generateMipmaps = false;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(0, 4, 0)
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      const tx = Math.max(-2.8, Math.min(2.8, vec.x - dragged.x));
      const ty = Math.max(-3.8, Math.min(1.5, vec.y - dragged.y));
      const tz = Math.max(-1.5, Math.min(1.5, vec.z - dragged.z));
      card.current?.setNextKinematicTranslation({ x: tx, y: ty, z: tz });
    }

    if (fixed.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current) return;
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      if (j3.current && j2.current && j1.current && band.current) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped || j2.current.translation());
        curve.points[2].copy(j1.current.lerped || j1.current.translation());
        curve.points[3].copy(fixed.current.translation());
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      // Gentle restorative spring force to keep card facing forward towards camera
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      // Subtle reactive micro-movement on pointer move when hovered (not dragging)
      if (hovered && !dragged) {
        card.current.applyTorqueImpulse(
          { x: state.pointer.y * 0.002, y: -state.pointer.x * 0.002, z: 0 },
          true
        );
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -1, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -3, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -4.5, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : isReducedMotion ? 'fixed' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3.6}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              if (isReducedMotion) return;
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 0.25}
                clearcoatRoughness={0.1}
                roughness={0.15}
                metalness={0.0}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.35}
              material-metalness={0.8}
            />
            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
              material-roughness={0.35}
              material-metalness={0.8}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#27272A"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
