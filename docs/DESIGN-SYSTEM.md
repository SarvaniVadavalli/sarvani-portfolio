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

### 3.3 Approved Grid Motion & Center Flow Visual Specification (Phase 4.2 Visual Upgrade)

- **Center Flow Navigation Role**: Dedicated signature portfolio navigation system.
- **Grid Motion Atmospheric Layer**: Used **exclusively** as the subtle background for the Center Flow navigation section.
  - React Bits Pattern: Implements `<GridMotion items={items} gradientColor="#09090B" />` API architecture.
  - Zero Stock Imagery: Custom controlled array of 24 technical/editorial JSX tiles (`AI / ML`, `COMPUTER VISION`, `FULL STACK`, `SYSTEMS`, `MODELS`, `SARVANI`, `INDEX`, etc.).
  - Positioned at `z-0` (`absolute inset-0 pointer-events-none overflow-hidden`).
  - Palette: `#121215` translucent tile surfaces (`bg-[#121215]/50`), `#27272A` borders, `#FAFAFA` text, `#A1A1AA` muted indexes, `#FF2E2E` accent dots. Fades seamlessly into background via `gradientColor` (`#09090B`) vignette mask.
  - Motion: 4 staggered horizontal rows with continuous GPU-accelerated infinite drift animations (`animate-grid-drift-left`, `animate-grid-drift-right`).
  - Mobile/Reduced Motion: Reduced row count and tile density on smaller screens; motion loop automatically paused under `@media (prefers-reduced-motion: reduce)`.

- **Center Node (Technical Identity Marker)**:
  - Text: `SARVANI PORTFOLIO` + `SYSTEM ACTIVE` status indicator.
  - Geometry: Sharp borders (`0px`), subtle `#FF2E2E` corner tick markers, flat `#121215` surface.
- **Outer Navigation Nodes**:
  - Format: Small index (`01`, `02`, `03`, `04`, `05`, `06`) in `JetBrains Mono` + Section Label (`ABOUT`, `CAPABILITIES`, `PROJECTS`, `EXPERIENCE`, `ACHIEVEMENTS`, `CONTACT`) in `Space Grotesk`.
  - Contextual Micro-Preview: Compact description shown on hover/focus (`"Profile + focus"`, `"Selected work"`, `"Journey + roles"`, etc.).
  - Sharp corners, compact interactive controls, keyboard accessible focus outline (`focus-visible:ring-2 focus-visible:ring-[#FF2E2E]`).
- **Connection Lines**:
  - `#27272A` SVG track lines with restrained `#FF2E2E` red signal dots traveling along connection paths toward outer nodes.

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

