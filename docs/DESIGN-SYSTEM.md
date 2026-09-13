# Design System Guidelines

This document outlines the confirmed and approved design system specification for the **Sarvani Portfolio**.

---

## 1. Confirmed Design Direction

The portfolio aesthetic is defined by six core pillars:

- **Techno-Brutalist**: Raw structural elements, visible grid lines, prominent 1px borders, monospaced accents, and utilitarian interface cues.
- **Editorial**: High-contrast typography, image-led compositions, bold display headers, and structured reading rhythm.
- **Interactive**: Tactile micro-interactions, responsive hover states, and dynamic scroll/cursor feedback.
- **Personal**: Distinct individual identity representing Sarvani's unique perspective and technical work.
- **Technical**: Precision layout, clear data density, clean metadata tags, and code-inspired visual language.
- **High Contrast**: Striking visual hierarchy that maximizes readability and visual impact.

---

## 2. Confirmed Aesthetic Constraints

> [!WARNING]
> The following visual patterns are explicitly **BANNED** from this project:

- **NO Ambient Golden Aesthetic**: Avoid warm gold ambient glows, soft yellow lighting, or gilded highlights.
- **NO Warm Beige / Gold-heavy Palette**: Exclude warm cream, beige, or golden color schemes.
- **NO Generic Purple / Blue AI Gradients**: Avoid overused indigo-to-purple glowing gradient meshes typical of generic AI landing pages.
- **NO Generic AI-Startup Style**: Exclude rounded floating white cards, glowing blue badges, and generic SaaS layouts.
- **NO Excessive Glassmorphism**: Avoid heavy blurred frosted-glass cards that degrade readability and performance.
- **NO Excessive Neon Effects**: Avoid overpowering neon glows or cyberpunk HUD aesthetics.
- **NO Random Animation Effects**: Animations must not be applied purely for decorative spectacle.
- **NO Direct Copying**: Reference sites (e.g. ImageWorks, React Bits) provide principle inspiration only, not direct duplication.
- **Usability & Content First**: Layout, typography, and legibility take priority over visual novelty.

---

## 3. Approved Design System Tokens (Phase 1.2 – Phase 4.1)

### 3.1 Approved Color System

The palette is built on an exact neutral, high-contrast dark foundation with a single strong accent:

| Token Name | Hex Code | Purpose / Usage |
| ---------- | -------- | --------------- |
| **Background** | `#09090B` | Root page canvas background |
| **Primary Surface** | `#121215` | Section containers, card backgrounds, structural blocks |
| **Border** | `#27272A` | Restrained 1px grid borders and section boundaries |
| **Primary Text** | `#FAFAFA` | High-contrast headings and primary reading text |
| **Muted Text** | `#A1A1AA` | Sub-titles, captions, metadata tags, secondary details |
| **Accent Red** | `#FF2E2E` | Intentional emphasis, interaction states, active indicators |

---

### 3.2 Approved Hero Portrait Art Direction (Phase 3.2)

- **Source Asset**: Owner-provided portrait ([`src/assets/1.jpeg`](file:///c:/my%20portfolio/src/assets/1.jpeg)).
- **Monochrome Editorial Filter**: Restrained CSS high-contrast monochrome filter (`grayscale-[75%] contrast-[112%] brightness-[96%] saturate-[25%]`). Mutes outdoor green background while preserving facial details, skin tone, and recognizable identity.
- **Responsive Crop & Frame**: Aspect ratio container (`aspect-[4/5]`) with `object-cover object-[center_20%]` positioning. Ensures face and upper body are centered without head cropping.
- **Red Accent Integration**: Sharp Red (`#FF2E2E`) applied exclusively as structural corner tick markers, border hover states, and metadata dots.
- **Restrained Parallax Motion**: Subtle mouse displacement (max 8px) with full support for `@media (prefers-reduced-motion: reduce)`.

---

### 3.3 Approved Threads Background Specification (Phase 4.1)

- **Atmospheric Visual Concept**: Inspired by React Bits Threads. Renders slow, calm, architectural signal lines moving continuously across the canvas to establish visual depth behind the Hero.
- **Color & Opacity**: Low-opacity off-white (`rgba(250, 250, 250, 0.05-0.08)`) lines with a single sparse Sharp Red (`#FF2E2E` `rgba(255, 46, 46, 0.22)`) accent trace line.
- **Layering & Interaction**: Positioned strictly behind content (`-z-10 pointer-events-none`). Extremely subtle pointer deflection (max 10px shift), zero cursor trails.
- **Responsive Density**:
  - Desktop: 18 threads
  - Tablet: 12 threads
  - Mobile: 8 threads (reduced animation complexity and opacity)
- **Reduced Motion**: Automatically pauses continuous animation loop when `@media (prefers-reduced-motion: reduce)` is detected.

---

### 3.4 Approved Typography System

- **Display**: `Space Grotesk` (Weights: 500, 600, 700)
- **Body**: `Inter` (Weights: 400, 500, 600)
- **Technical**: `JetBrains Mono` (Weights: 400, 500)

---

### 3.5 Approved Grid & Container Specification

- **Maximum Content Boundary**: `1400px` (`portfolio-container`).
- **Desktop Grid (1024px+)**: 12-column layout with 32px (`2rem`) gutters (`editorial-grid`).
- **Tablet Grid (768px – 1024px)**: 6-column layout with 24px (`1.5rem`) gutters.
- **Mobile Grid (< 768px)**: 4-column layout with 16px (`1rem`) gutters.

---

### 3.6 Approved Geometry & Surface Principles

- **Corner Radius Policy**: Default radius is `0px` (`rounded-none`). Maximum radius is `2px` (`rounded-sm`).
- **Borders**: Restrained thin 1px borders (`border-[#27272A]`).
- **Surfaces**: Flat surfaces (`#09090B`, `#121215`). NO glassmorphism, NO drop shadows, NO glowing cards.
