# Component Inventory & Specification

This document lists all planned and implemented component modules for the **Sarvani Portfolio**.

---

## 1. Layout Components

### `Navbar`
- **Location**: `src/components/layout/Navbar.jsx`
- **Description**: Sticky header navigation containing brand logo (`SARVANI.`), responsive desktop/mobile section links (`#projects`, `#about`, `#capabilities`, `#experience`, `#achievements`, `#contact`), CTA button, and accessible mobile menu toggle.
- **Status**: **IMPLEMENTED (Phase 2.1)**

### `PageContainer`
- **Location**: `src/components/layout/PageContainer.jsx`
- **Description**: Reusable layout container enforcing the approved `1400px` maximum content boundary and responsive horizontal padding.
- **Status**: **IMPLEMENTED (Phase 2.1)**

### `Section`
- **Location**: `src/components/layout/Section.jsx`
- **Description**: Semantic section container (`<section>`) with customizable padding, ID scroll anchors (`scroll-mt-16`), and structural borders.
- **Props**: `id`, `children`, `className`, `containerClassName`.
- **Status**: **IMPLEMENTED (Phase 2.1)**

### `Footer`
- **Location**: `src/components/layout/Footer.jsx`
- **Description**: Page footer containing copyright notice, colophon details, social media anchor links, and scroll-to-top trigger (`#hero`).
- **Status**: **IMPLEMENTED (Phase 2.1)**

---

## 2. Hero Components

### `Hero`
- **Location**: `src/components/sections/hero/Hero.jsx`
- **Description**: Root component for the hero section, featuring an experimental asymmetrical editorial poster spread ("Break Design Rules") combining top identification bar, display `Space Grotesk` name, angled brutalist polygon portrait graphic container, distinct technical positioning statement (`I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE.`), metadata matrix, CTAs, and background `HalftoneWave` layer.
- **Status**: **IMPLEMENTED (Phase 3.4 - 3.6 Refinement)**

### `HeroName`
- **Location**: `src/components/sections/hero/HeroName.jsx`
- **Description**: Intentionally oversized display name header (`SARVANI VADAVALLI`) in `Space Grotesk` display typography (`text-6xl` to `text-[13rem]`), featuring negative line height, tight tracking, interactive 3D Letter Swap per-character animation, and active Sharp Red (`#FF2E2E`) square accent indicator.
- **Status**: **IMPLEMENTED (Phase 3.4)**

### `HeroImage`
- **Location**: `src/components/sections/hero/HeroImage.jsx`
- **Description**: Customized ProfileCard 3D tilt photo plate displaying owner portrait (`src/assets/1.jpeg`) inside a 1px border `#121215` container with `#FF2E2E` corner tick markers, dark bottom specification strip (`SARVANI VADAVALLI // FIGURE 01`), high-contrast monochrome image filter (`grayscale-[75%] contrast-[112%]`), and mouse-following 3D tilt (max 5.5deg, `rAF` lerp loop, smooth return to center). Includes touch & `@media (prefers-reduced-motion: reduce)` fallbacks.
- **Status**: **IMPLEMENTED (Phase 3.9)**

### `HeroMeta`
- **Location**: `src/components/sections/hero/HeroMeta.jsx`
- **Description**: Technical metadata badges displaying availability status ("AVAILABLE FOR PROJECTS"), location ("INDIA // REMOTE"), and specialization tags (`AI / ML`, `COMPUTER VISION`, `FULL STACK`, `CSE / AIML`).
- **Status**: **IMPLEMENTED (Phase 3.1)**

### `HalftoneWave`
- **Location**: `src/components/animations/HalftoneWave.jsx`
- **Description**: Ambient technical Canvas 2D halftone dot matrix wave background component based on the React Bits Halftone Wave pattern. Features subtle `#27272A` halftone dots on `#09090B` canvas with slow 2D sine wave oscillation, `#A1A1AA` highlights, rare `#FF2E2E` peak accent nodes, subtle cursor proximity radius boost, zero heavy ML/shader dependencies (`aria-hidden="true"`), and full `@media (prefers-reduced-motion: reduce)` fallback. Operates strictly as the Hero background layer (`z-0 pointer-events-none`). Replaces `GridScan`.
- **Status**: **IMPLEMENTED (Phase 3.5)**

---

## 3. Navigation Components

### `CenterFlowSection`
- **Location**: `src/components/sections/navigation/CenterFlowSection.jsx`
- **Description**: Dedicated section wrapper placed directly after Hero and before About. Features header (`EXPLORE // NAVIGATE PORTFOLIO` / `RADIAL INDEX // 06 NODES`) over interactive `CenterFlow` radial index hub on a clean `#09090B` background.
- **Status**: **IMPLEMENTED (Phase 4.2)**

### `CenterFlow`
- **Location**: `src/components/animations/CenterFlow.jsx`
- **Description**: Interactive signature portfolio navigation system. Features identity center node (`SARVANI PORTFOLIO`), SVG flow paths with red `#FF2E2E` signal pulse dots, and outer destination nodes (`01 / ABOUT`, `02 / CAPABILITIES`, `03 / PROJECTS`, `04 / EXPERIENCE`, `05 / ACHIEVEMENTS`, `06 / CONTACT`) with micro-previews (`"Profile + focus"`, `"Selected work"`, etc.). Includes `IntersectionObserver` active section highlighting and `@media (prefers-reduced-motion: reduce)` support.
- **Status**: **IMPLEMENTED (Phase 4.2 & Visual Upgrade)**

### `GridMotion`
- **Location**: `src/components/animations/GridMotion.jsx`
- **Description**: Atmospheric text field component rendered behind the Center Flow radial navigation system (`z-0`). Features 28 curated technical vocabulary items (`AI / ML`, `COMPUTER VISION`, `FULL STACK`, `CSE / AIML`, `RESEARCH`, `SYSTEMS`, `MODELS`, `BUILD`, `PIPELINES`, `CODE`, `DESIGN`, `LEARNING`, `EXPERIMENT`, `SARVANI`, `RADIAL`, `MATRIX`, `REACT`, `TAILWIND`, `ALGORITHMS`, `NEURAL`, `VISION`, `DATA`, `NETWORKS`, `ENGINEERING`) distributed as borderless text fragments across 5 staggered horizontal rows. Includes faint 8–18% text opacity, subtle pointer parallax, alternating slow horizontal drift animations, central radial dark vignette mask (`#09090B`), and `@media (prefers-reduced-motion: reduce)` pause fallback.
- **Status**: **IMPLEMENTED (Phase 4.8)**



---

## 4. About Component

### `About`
- **Location**: `src/components/sections/about/About.jsx`
- **Description**: Personal identity section consisting of 2 core elements: **ABOUT ME** (dominant 7-column visual area featuring 3 rich, human, personal narrative paragraphs) and **EDUCATION** (secondary 5-column `MagicBento` card: `SRM UNIVERSITY AP` | `B.Tech — CSE` | `2024 — 2028` | `CGPA: 9.11`). Includes staggered `IntersectionObserver` scroll entrance and `@media (prefers-reduced-motion: reduce)` fallback. Interests section is completely removed.
- **Status**: **IMPLEMENTED (Phase 5.3 Final Simplification)**

### `MagicBento`
- **Location**: `src/components/animations/MagicBento.jsx`
- **Description**: Reusable Magic Bento card container handling cursor tracking spotlight (`rgba(255, 46, 46, 0.12)`), restrained 2.5° 3D tilt, 3px magnetic pull, default `#27272A` border with Sharp Red (`#FF2E2E`) hover response, and active red corner tick indicator. Includes `@media (prefers-reduced-motion: reduce)` fallback.
- **Status**: **IMPLEMENTED (Phase 5.3)**

---

## 5. Capabilities Component

### `CapabilitiesSection`
- **Location**: `src/components/capabilities/CapabilitiesSection.jsx`
- **Description**: Structured skill matrix displaying core engineering competencies, frameworks, tools, and technical specialties.
- **Status**: PLANNED (Phase 6)

---

## 6. Projects Components

### `ProjectsSection`
- **Location**: `src/components/projects/ProjectsSection.jsx`
- **Description**: Grid container displaying selected portfolio projects with category filter tags.
- **Status**: PLANNED (Phase 5)

### `ProjectItem`
- **Location**: `src/components/projects/ProjectItem.jsx`
- **Description**: Individual project card displaying project preview, title, tech stack tags, summary, live demo link, and repository link.
- **Props**: `project` (object containing title, description, tags, image, demoUrl, repoUrl).
- **Status**: PLANNED (Phase 5)

---

## 7. Experience Component

### `ExperienceSection`
- **Location**: `src/components/experience/ExperienceSection.jsx`
- **Description**: Timeline component presenting professional experience, career milestones, roles, and key achievements.
- **Status**: PLANNED (Phase 6)

---

## 8. Achievements Component

### `AchievementsSection`
- **Location**: `src/components/achievements/AchievementsSection.jsx`
- **Description**: High-contrast grid highlighting notable recognitions, key metrics, certifications, and technical accomplishments.
- **Status**: PLANNED (Phase 6)

---

## 9. Contact Component

### `ContactSection`
- **Location**: `src/components/contact/ContactSection.jsx`
- **Description**: Direct contact interface featuring email contact button, social links (GitHub, LinkedIn, Twitter/X), and availability status.
- **Status**: PLANNED (Phase 7)

---

## 10. Animation & Interaction Components

### `RadialFlow`
- **Location**: `src/components/animations/RadialFlow.jsx`
- **Description**: Secondary/transition Canvas background effect rendering radial center-flow gradient and particle directional ticks.
- **Status**: PLANNED SECONDARY TRANSITION EFFECT

### `LetterSwap`
- **Location**: `src/components/sections/hero/HeroName.jsx`
- **Description**: 3D letter swapping text effect primitive for interactive headings.
- **Status**: **IMPLEMENTED (Phase 3.1)**

### `WrapText`
- **Location**: `src/components/animations/WrapText.jsx`
- **Description**: React Bits Wrap Text interaction component applied to the primary Hero positioning statement (`I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE.`). Renders semantic `<Component>` with Space Grotesk bold text (`#FAFAFA`), featuring staggered word-reveal entrance animation on scroll/mount and subtle word hover translation (`-2px`) with Sharp Red (`#FF2E2E`) color accent highlight. Includes full `@media (prefers-reduced-motion: reduce)` static text fallback. Replaces `ParticleText`.
- **Status**: **IMPLEMENTED (Phase 3.8)**

### `Landing`
- **Location**: `src/components/sections/landing/Landing.jsx`
- **Description**: Dedicated `100svh` entrance title screen rendered before the Hero section. Features centered title (`WELCOME TO MY<br />WORK.`), top header (`SARVANI.` top-left, `PORTFOLIO ENTRY // 2026` top-right), label `INTERACTIVE ARCHITECTURE`, text-only `[ ENTER ]` action trigger (hovering to `#FF2E2E`), and bottom-right `SCROLL TO ENTER ↓` indicator. Includes window keydown (`Enter`), button click, and scroll/swipe listeners wired to a unified `enterPortfolio()` transition handler. Renders background `<RippleGrid />`.
- **Status**: **IMPLEMENTED (Phase 4.9.5 RippleGrid)**

### `RippleGrid`
- **Location**: `src/components/animations/RippleGrid.jsx`
- **Description**: WebGL GLSL shader background component based on React Bits RippleGrid. Renders a sparse, dark, atmospheric grid (`gridSize: 6.5`, `gridThickness: 7`, `gridColor: #3F3F46`, `opacity: 0.48`, `vignetteStrength: 1.5`, `fadeDistance: 1.8`, `glowIntensity: 0.035`), central dark vignette fade, dynamic pointer ripple wave propagation (`rippleIntensity: 0.035`, `mouseInteractionRadius: 0.65`), smooth retraction transition on portfolio entrance, and `@media (prefers-reduced-motion: reduce)` fallback. Replaces `AcidSquares`.
- **Status**: **IMPLEMENTED (Phase 4.9.5)**

### `BlinkingSquares`
- **Location**: `src/components/animations/BlinkingSquares.jsx`
- **Description**: Controlled grid micro-interaction displaying subtle flickering ambient square nodes in section margins.
- **Status**: PLANNED (Phase 7)
