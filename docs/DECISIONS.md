# Decision Log

This log records all key architectural, technical, visual, and design decisions made for the **Sarvani Portfolio** project.

---

### Decision 1: Portfolio Aesthetic Direction
- **Decision**: The portfolio direction is confirmed as **Techno-Brutalist + Editorial + Interactive**.
- **Reason**: Aligns with Sarvani's personal technical identity, creating a high-impact, memorable presentation that balances bold editorial typography with interactive digital craft.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 2: ImageWorks Inspiration Scope
- **Decision**: ImageWorks serves strictly as visual and compositional inspiration, not a template to copy or clone.
- **Reason**: Ensures the portfolio remains unique, tailored, and authentic to Sarvani while borrowing successful image-led layout concepts.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 3: Selective Use of React Bits Effects
- **Decision**: React Bits interaction library patterns will be selectively integrated rather than applied globally.
- **Reason**: Maintains high performance and avoids animation bloat, keeping every interaction intentional and performant.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 4: Radial Center-Flow Visual Direction
- **Decision**: Radial center-flow background treatment is selected as a planned secondary/transition visual direction for section transitions and background depth.
- **Reason**: Provides subtle visual continuity and organic focus directing the viewer's eye through section transitions without cluttering the foreground.
- **Status**: CONFIRMED (Planned Secondary Transition Effect)
- **Date**: 2026-09-13

---

### Decision 5: 3D Letter Swap Effect for Hero Name
- **Decision**: 3D Letter Swap animation effect is selected for the portfolio owner's name (`Sarvani`) in the Hero section.
- **Reason**: Creates a strong, tactile first impression and signature interactive moment upon landing on the site.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 6: Controlled Use of Blinking Squares
- **Decision**: Blinking squares are designated as optional, restricted micro-interaction elements that must not be overused.
- **Reason**: Prevents visual noise and distraction while keeping technical micro-details subtle and impactful.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 7: Exclusion of Ambient Golden / Warm Aesthetic
- **Decision**: Ambient golden lighting, warm gold glows, beige backgrounds, and gilded accents are strictly banned.
- **Reason**: Does not fit the technical, high-contrast, techno-brutalist brand direction.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 8: Avoidance of Generic Purple/Blue AI Gradients
- **Decision**: Generic indigo/purple/blue AI glowing gradients are explicitly excluded.
- **Reason**: Avoids cliché aesthetic trends, preserving an authentic and distinct editorial identity.
- **Status**: CONFIRMED
- **Date**: 2026-09-13

---

### Decision 9: Neutral Palette Base
- **Decision**: Confirmed base palette of Background `#09090B`, Primary Surface `#121215`, Border `#27272A`, Primary Text `#FAFAFA`, Muted Text `#A1A1AA`.
- **Reason**: Provides a high-contrast dark canvas for clear readability and techno-brutalist structure.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 10: Approved Sharp Red Accent Color (`#FF2E2E`)
- **Decision**: Sharp Red (`#FF2E2E`) is approved as the sole primary accent color.
- **Reason**: Provides high-contrast editorial emphasis and intentional interaction cues without leaning into AI startup or cyberpunk tropes.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 11: Approved Typography Stack
- **Decision**: Approved typography hierarchy: `Space Grotesk` (Display 500, 600, 700) + `Inter` (Body 400, 500, 600) + `JetBrains Mono` (Technical 400, 500).
- **Reason**: Combines bold geometric headers with maximum body legibility and technical code metadata clarity.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 12: Approved 12/6/4 Column Responsive Grid & 1400px Boundary
- **Decision**: Approved 12-column desktop (1024px+), 6-column tablet (768px+), 4-column mobile grid with a maximum 1400px container boundary (`portfolio-container`).
- **Reason**: Flexible, performance-focused layout system supporting asymmetrical editorial compositions.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 13: Approved Spacing Scale
- **Decision**: Approved 8pt / 4pt sub-scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Reason**: Eliminates arbitrary spacing and guarantees consistent visual rhythm across components.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 14: Approved Geometry Policy (0px – 2px Max Radius)
- **Decision**: Approved default `0px` radius (`rounded-none`) and maximum `2px` radius (`rounded-sm`). Large rounded cards and pill shapes are prohibited.
- **Reason**: Enforces a sharp, utilitarian, techno-brutalist visual identity.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 15: Scroll Offset Strategy for Sticky Navigation (`scroll-mt-16`)
- **Decision**: Pure CSS `scroll-mt-16` (`scroll-margin-top: 4rem`) applied to `<section>` wrappers instead of JavaScript scroll handling.
- **Reason**: Guarantees section headings scroll cleanly into view directly below the 64px (`h-16`) sticky header without custom scroll listeners or layout shifts.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 16: Hero Section Editorial Composition
- **Decision**: Integrated asymmetrical 12-column editorial grid for the Hero section, combining display `Space Grotesk` name with pure CSS 3D Letter Swap, portrait card, technical metadata tags, and background animation.
- **Reason**: Establishes an interactive editorial digital cover identity that sets the visual tone for the entire portfolio.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 17: Hero Portrait Art Direction & Parallax Integration
- **Decision**: Integrated owner portrait (`src/assets/1.jpeg`) with a restrained monochrome editorial treatment (`grayscale-[75%] contrast-[112%] brightness-[96%] saturate-[25%]`), `object-[center_20%]` facial crop, Sharp Red (`#FF2E2E`) corner tick markers, and a restrained (max 8px) pointer parallax movement that respects `@media (prefers-reduced-motion: reduce)`.
- **Reason**: Mutes bright outdoor greenery into charcoal tones while preserving natural facial details, recognizable identity, and high-contrast integration into the techno-brutalist dark canvas.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 18: Removal of Threads Background
- **Decision**: Removed the Threads background component from `Hero.jsx` per owner instruction, maintaining a clean `#09090B` high-contrast dark canvas for the Hero section.
- **Reason**: Owner directive to keep the Hero background clean, focused, and uncluttered.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 19: Strict Adherence to Authoritative Portfolio Content (`PORTFOLIO-CONTENT.md`)
- **Decision**: The About section (`#about`) content is driven strictly by `docs/PORTFOLIO-CONTENT.md`, incorporating factual academic metadata (SRM University AP, B.Tech CSE, 2024–2028, CGPA 9.11), dual build tracks (MERN & TensorFlow/OpenCV), and CS coursework/DSA fundamentals. All `[NEEDS CONFIRMATION]` items and unconfirmed personal narratives are excluded.
- **Reason**: Guarantees complete factual accuracy and alignment with the official portfolio blueprint while eliminating unverified claims or template fluff.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 20: React Bits Depth Carousel Integration for About Section
- **Decision**: The About section is redesigned using `DepthCarousel.jsx` as its signature interactive centerpiece. It pairs a 5-column concise identity narrative with a 7-column 3D Depth Carousel featuring 4 custom portfolio artifact cards (`FULL-STACK`, `COMPUTER VISION`, `BUILD: UniMeet`, `ACADEMICS: SRM AP`), plus a lightweight horizontal academic metadata strip.
- **Reason**: Replaces generic article/headline layouts with a personal, tactile, interactive portfolio presentation ("Meet the person behind the work") while respecting one primary interaction per section.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 21: Personal Identity About Section & 5 Personal Depth Carousel Cards
- **Decision**: The About section (`#about`) is strictly dedicated to personal identity ("This is Sarvani — the person behind the work"). All technical skill lists, frameworks, databases, coursework chips, DSA explanations, and heavy CGPA dashboard cards are completely removed (reserved for Capabilities and Projects).
- **Reason**: Establishes a clear functional role for About (PERSON → INTERESTS → CURIOSITY → BUILDING) without duplicating technical documentation from subsequent sections.
- **Status**: CONFIRMED & SUPERSEDED BY DECISION 22
- **Date**: 2026-09-13

---

### Decision 22: Three Rabbit Holes Personal About Concept & Depth Carousel
- **Decision**: The About section (`#about`) is confirmed around the core personal concept **"THREE RABBIT HOLES"** (`01 / TECHNOLOGY`, `02 / PEOPLE`, `03 / MECHANISMS`).
- **Reason**: Replaces corporate/resume fluff with an authentic, human introduction to the curiosity driving Sarvani's work.
- **Status**: CONFIRMED & SUPERSEDED BY DECISION 23
- **Date**: 2026-09-13

---

### Decision 23: Final Simplified About Section (ABOUT ME + EDUCATION + INTERESTS) & Cleanup
- **Decision**: The About section (`#about`) is simplified to 3 core elements: **ABOUT ME**, **EDUCATION**, and **INTERESTS**. All complex carousel interactive components, rabbit-hole cards, and elaborate dashboard widgets are removed.
- **Reason**: Replaces complex interactive showcases with an honest, approachable, human personal introduction that lets content breathe without competing animations or corporate fluff.
- **Status**: CONFIRMED & SUPERSEDED BY DECISION 24
- **Date**: 2026-09-13

---

### Decision 24: Magic Bento Interaction Architecture for About Section (Education + Interests)
- **Decision**: The About section (`#about`) is implemented using `MagicBento.jsx` cards for **EDUCATION** (1 prominent card) and **INTERESTS** (4 asymmetric cards: `MUSIC`, `MOVIES & SHOWS`, `WALKING`, `EXPLORING IDEAS`).
- **Reason**: Delivers a tactile, interactive Magic Bento experience tailored to the portfolio's high-contrast dark design system without purple/gradient bloat or dashboard clutter.
- **Status**: CONFIRMED & SUPERSEDED BY DECISION 25
- **Date**: 2026-09-13

---

### Decision 25: Final About Section Simplification (ABOUT ME + EDUCATION) & Removal of Interests
- **Decision**: The About section (`#about`) is simplified to contain ONLY 2 elements: **ABOUT ME** (dominant 7-column visual area with 3 rich, human, personal narrative paragraphs) and **EDUCATION** (secondary 5-column `MagicBento` card with a restrained default `#27272A` border that highlights to Sharp Red `#FF2E2E` on hover). The Interests section is completely removed from the DOM.
- **Details**:
  - **ABOUT ME Prose**:
    1. *"I'm a Computer Science Engineering student at SRM University AP. I like figuring things out for myself — especially when I don't fully understand something yet."*
    2. *"My interests tend to move around. Some days it's technology and tools, other days it's people and why they think the way they do, and sometimes I just want to understand how something works underneath."*
    3. *"I care about doing things properly, and I'd rather test something, find where it breaks, and understand why than pretend I already know the answer. Ultimately, I'm working toward having the freedom to build the things I want, in the way I want."*
  - **Tone Policy**: Quiet, human, personal tone free of corporate portfolio buzzwords (*passionate*, *innovative*, *problem solver*, *tech enthusiast*, *visionary*, *lifelong learner*).
  - **EDUCATION Card Styling**: Toned down default border to `#27272A`, highlighting to `#FF2E2E` with subtle mouse spotlight tracking (`rgba(255, 46, 46, 0.12)`) and 2.5° 3D tilt on hover.
- **Reason**: Elevates personal narrative into the main visual focus while maintaining high contrast, generous dark breathing room, and restrained interaction.
- **Status**: CONFIRMED & IMPLEMENTED
---

### Decision 26: Hero Background Enhancement with React Bits Grid Scan
- **Decision**: Integrated `GridScan.jsx` as the ambient background layer for the Hero section (`z-0 pointer-events-none`).
- **Details**:
  - **Visual Language**: High-precision 1px HTML5 2D Canvas structural grid (`#27272A`) on dark canvas (`#09090B`) with a ping-pong red scanline sweep (`#FF2E2E`).
  - **Hero Content Protection**: Foreground elements (Name, 3D Letter Swap, Philosophy Subhead, Metadata, CTAs, Portrait) remain 100% untouched and visually dominant.
  - **Zero Heavy Dependencies**: Implemented natively via Canvas 2D without `face-api.js`, `three`, `postprocessing`, or remote ML models.
  - **Settings & Restrictions**: NO bloom, NO noise, NO chromatic aberration, NO webcam, NO face tracking, NO purple/blue/gold gradients.
  - **Accessibility & Motion Control**: Set `aria-hidden="true"`, restrained micro mouse displacement (max 4px), and full reduced motion support (freezes scan, removes cursor movement, renders static structural grid).
- **Reason**: Adds ambient technical depth and precision engineering context to the Hero background without competing with foreground reading clarity.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 27: Hero Grid Scan Localized Mouse Interaction (Subtle Grid Line Deflection)
- **Decision**: Refactored `GridScan.jsx` to render localized radial grid line deflection around the cursor instead of moving the entire grid canvas as a rigid object.
- **Details**:
  - **Interaction Math**: Localized radial displacement vector within a ~180px desktop radius (~140px tablet, 0px mobile) with a max 8px deflection at cursor center and smooth quadratic falloff `(1 - dist/R)^2`.
  - **Subdivided Line Warping**: Subdivides grid lines into ~18px sampled line segments in Canvas 2D, rendering smooth curve warping without rigid canvas offset or layout shifts.
  - **Zero React Re-renders**: Mouse position tracked via refs and smoothed with lerp factor `0.08` inside `requestAnimationFrame`. Zero React state updates on mousemove.
  - **Scanline Coexistence**: Red ping-pong scanline sweep (`#FF2E2E`) highlights the active grid lines seamlessly as they warp around cursor.
  - **Fallbacks**: Disabled on touch devices (`isMobile`) and under `@media (prefers-reduced-motion: reduce)`. Fades out naturally on `mouseleave`.
- **Reason**: Creates a responsive, tactile background grid that feels alive and interactive without distracting from the Hero name (`SARVANI VADAVALLI`) or portrait.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 28: Hero Art Direction Redesign (Editorial Poster Spread — "Break Design Rules")
- **Decision**: Redesigned the Hero section into an experimental asymmetrical editorial poster spread inspired by high-end magazine cover layouts.
- **Details**:
  - **Oversized Display Typography**: Scaled display name (`HeroName.jsx`) to `text-6xl` through `text-[13rem]` in `Space Grotesk` with tight negative line height (`0.82`) and tracking, featuring 3D Letter Swap animation and red square tick marker.
  - **Angled Polygon Graphic Portrait Frame**: Transformed portrait (`HeroImage.jsx`) with a brutalist polygon clip-path (`polygon(0 0, 100% 2.5%, 97.5% 100%, 2.5% 97.5%)`), `-2.5deg` container tilt, sharp `#FF2E2E` red corner markers, double structural outline frame, and monochrome image filter (`grayscale-[75%] contrast-[112%]`).
  - **Controlled Editorial Overlap**: Display text intentionally crosses into the visual territory of the right portrait box without obscuring facial detail or compromising legibility.
  - **Top Tag & Editorial Philosophy**: Added top identification bar (`INTERACTIVE PORTFOLIO // EDITION 2026` + `STATUS // AVAILABLE FOR PROJECTS`) and philosophy callout block with a 2px `#FF2E2E` left border accent.
  - **Strict Palette & Scope Isolation**: Restricted palette exclusively to `#09090B`, `#121215`, `#27272A`, `#FAFAFA`, `#A1A1AA`, `#FF2E2E` (zero gold, zero blue/purple AI gradients, zero glassmorphism). Background `GridScan` layer remains active at `z-0 pointer-events-none`.
- **Reason**: Breaks away from standard corporate developer hero templates ("left text + right rectangle photo") to deliver an authentic, high-impact editorial cover statement for Sarvani's portfolio.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 29: Hero Typography & Background Refinement (Halftone Wave & Proportional Scale)
- **Decision**: Refined Hero display typography scale and replaced `GridScan` with React Bits `HalftoneWave.jsx` canvas background.
- **Details**:
  - **Typography Scale Reduction**: Scaled display typography (`HeroName.jsx`) down to `text-[clamp(44px,6.8vw,115px)]` for `SARVANI` and `text-[clamp(36px,5.8vw,98px)]` for `VADAVALLI.`, occupying ~45-55% desktop width. Enforced `whitespace-nowrap` on both words to guarantee zero character wrapping or text clipping across viewports.
  - **Halftone Wave Background**: Replaced `GridScan` completely with `HalftoneWave.jsx` (`absolute inset-0 z-0 pointer-events-none`). Canvas 2D halftone dot grid (`#27272A` dots on `#09090B` canvas with 2D sine wave oscillation, `#A1A1AA` highlights, rare `#FF2E2E` peak accent nodes, and subtle cursor proximity boost).
  - **Removal of Status Redundancy**: Removed duplicate status badge inside `HeroMeta.jsx` so `STATUS // AVAILABLE FOR PROJECTS` appears exactly ONCE in the top identification bar of `Hero.jsx`.
  - **Unified Composition**: Grid layout integrates display typography, philosophy callout, metadata, and angled graphic portrait frame (`HeroImage.jsx`) into one cohesive editorial unit.
- **Reason**: Balances the visual weight of the Hero section, giving display typography an editorial presence that fits harmoniously alongside the portrait frame and ambient print-like background texture.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 30: Hero Supporting Copy Rewrite (Technical Positioning vs Personal About)
- **Decision**: Rewrote the Hero supporting text block to feature explicit technical positioning ("What Sarvani builds") distinct from the personal mindset/education narrative of the About section.
- **Details**:
  - **Primary Headline Statement**: `"I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE."` (`Space Grotesk` semibold, `#FAFAFA`, uppercase tracking).
  - **Secondary Context Line**: `"Full-stack systems, computer vision, and ML experiments — built to be tested, broken, and made better."` (`Inter` regular, `#A1A1AA`).
  - **Functional Separation**: Establishes Hero as concise technical positioning (BUILDING / SYSTEMS / EDGE INTELLIGENCE) while preserving About section for personal background (PERSON / THINKING / EDUCATION).
- **Reason**: Replaces generic corporate fluff with a confident, distinct positioning statement that avoids repeating About section wording or metadata tags.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 31: Hero Particle Text Experiment (`BUILD / BREAK / LEARN / REPEAT`)
- **Decision**: Embedded a single interactive React Bits Particle Text signature element (`ParticleText.jsx`) into the Hero left column.
- **Details**:
  - **Signature Phrase**: `"BUILD / BREAK / LEARN / REPEAT"` rendered via Canvas 2D offscreen text sampling in `Space Grotesk 700`.
  - **Visual Language**: `#FAFAFA` base particles with a ~8% Sharp Red (`#FF2E2E`) accent subset, ~1.4s entrance gather animation, subtle 0.2px idle drift, gentle 16px max pointer repel within 85px cursor radius, zero glow (`glow = false`), and `<span className="sr-only">` accessibility fallback.
  - **Placement & Scale**: Positioned directly below the supporting positioning statement callout block and above `HeroMeta` (`max-w-[480px]`). Does NOT replace main typography (`SARVANI VADAVALLI.`) or compete with portrait.
- **Reason**: Adds a subtle, interactive digital signature detail that communicates Sarvani's hands-on engineering mindset without cluttering the Hero foreground.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 32: Hero Wrap Text Interaction (`WrapText.jsx`)
- **Decision**: Replaced the experimental `ParticleText.jsx` component with React Bits `WrapText.jsx` applied to the primary Hero positioning statement (`"I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE."`).
- **Details**:
  - **Component Architecture**: `WrapText.jsx` splits statement into word units wrapped in `inline-block overflow-hidden` tags, featuring staggered word-reveal entrance animation on scroll/mount (42ms stagger per word) and word hover translation with Sharp Red (`#FF2E2E`) color accent highlight.
  - **Cleanup**: Completely deleted `ParticleText.jsx` file and removed all particle imports.
  - **Visual Hierarchy**: Main name `SARVANI VADAVALLI.` remains static display header, `WrapText` statement acts as animated positioning header, and supporting description remains static `Inter` `#A1A1AA` text block.
  - **Single Background**: `<HalftoneWave />` remains the single background layer (`z-0 pointer-events-none`).
- **Reason**: Delivers a controlled, sophisticated typographic interaction that brings the editorial statement alive without visual clutter or heavy particle effects.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 33: Replace Hero Portrait with Techno-Brutalist Profile Card (`HeroImage.jsx`)
- **Decision**: Replaced the static Hero portrait polygon frame with a customized 3D tilt Profile Card (`HeroImage.jsx`) adapting React Bits ProfileCard interaction to the techno-brutalist editorial design system.
- **Details**:
  - **Portrait Preservation**: Retained owner portrait asset (`src/assets/1.jpeg`) with photographic high-contrast monochrome filter (`grayscale-[75%] contrast-[112%] brightness-[96%] saturate-[25%] group-hover:grayscale-[15%] group-hover:contrast-[105%] transition-all duration-700`).
  - **3D Tilt Physics**: Implemented restrained mouse-following 3D tilt (max visual rotation 5.5 degrees) using `perspective(1000px)`, `rotateX()`, `rotateY()`, and `scale3d(1.015)`. Smooth pointer interpolation and return-to-center executed via `requestAnimationFrame` lerp loop (`0.08` factor) without React `setState` per frame.
  - **Removal of Default React Bits Aesthetics**: Explicitly removed purple/cyan/blue glows, glare, shine, linear gradients, and neon effects. Restricted palette strictly to `#09090B` (bg), `#121215` (surface), `#27272A` (border), `#FAFAFA` (primary), `#A1A1AA` (muted), `#FF2E2E` (accent).
  - **Editorial Card Structure**: Replaced social media UI (@handle, online indicator, contact buttons) with an editorial photo plate + technical specification strip (`[red square] SARVANI VADAVALLI` + `FIGURE // 01` in `JetBrains Mono`).
  - **Accessibility & Mobile Safety**: Disabled interactive tilt on touch/mobile devices (`isMobile`) and under `@media (prefers-reduced-motion: reduce)`. Preserved exact alt text (`"Sarvani Vadavalli — Editorial Portrait"`).
- **Reason**: Elevates the Hero portrait into a tactile, interactive editorial photo plate without defaulting to colorful gaming/social card aesthetics or compromising performance.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 34: Restore Profile Card Behind-Glow (`HeroImage.jsx`)
- **Decision**: Restored the Profile Card "behind-glow" visual effect in `HeroImage.jsx` sitting directly behind the portrait card (`-z-20`).
- **Details**:
  - **Visual Language**: Radial `#FF2E2E` falloff (`rgba(255, 46, 46, 0.14)` peak center opacity, `blur(32px)` soft falloff) extending ~55-65% beyond card boundaries.
  - **Layering & Tone**: Layered behind the structural offset frame (`-z-20`). Zero blue, zero purple, zero cyan, zero front glare on the photograph, zero pulsing flash.
  - **Physics Synchronization**: Dynamic `rotateX`, `rotateY`, and `translate3d` transform synced to card tilt physics inside the existing `rAF` animation loop.
  - **Fallbacks**: Scale and opacity reduced on mobile viewports; static subtle glow under `@media (prefers-reduced-motion: reduce)`.
- **Reason**: Reintroduces ambient back-lighting behind the photographic plate ("red light leaking subtly from behind a printed photo plate") while upholding strict high-contrast brutalist design principles.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 35: Portfolio Entry / Landing Screen Architecture (`Landing.jsx`, `SlicedWaves.jsx`)
- **Decision**: Added a dedicated `100vh` Landing screen (`Landing.jsx`) as the entry gate before the Hero section, featuring exact requested copy (`WELCOME TO MY WORK.`, `COMPUTER SCIENCE × AI / ML`, `PRESS ENTER OR SCROLL TO CONTINUE ↓`, `SARVANI.`, `PORTFOLIO ENTRY // 2026`), primary `[ ENTER ]` control, and background `SlicedWaves.jsx` Editorial Horizontal Slice System.
- **Details**:
  - **Visual Language (Editorial Horizontal Slices)**: Landing uses a Sliced Waves-inspired horizontal slice motion system adapted to the portfolio's black/white/red design system (`#09090B`, `#121215`, `#18181B`, `#27272A`, `#FF2E2E`). Renders 8 horizontal slice rows with irregular rectangular segments, dark negative space (`#09090B`), alternating horizontal sliding drift, subtle mouse displacement, 95% dark charcoal grayscale, selective `#FF2E2E` stroke accents, and zero neon glow or vertical tile grid artifacts.
  - **Unified Entry Transition (`enterPortfolio`)**: Button click, keyboard `Enter` keypress, and wheel/touch scroll down gesture all invoke the exact same transition callback (`~700ms`). Even slice rows slide left and odd slice rows slide right offscreen to visually reveal the Hero section underneath.
  - **Navbar Integration**: Main sticky `Navbar` remains hidden during Landing and smoothly reveals upon portfolio entry.
- **Reason**: Establishes an atmospheric, tactile entrance sequence ("opening the portfolio") that builds anticipation before handing the user into the main Hero section.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 36: Landing Background Glow Reduction, Straight Horizontal Slices, & Center Content Alignment (`SlicedWaves.jsx`, `Landing.jsx`)
- **Decision**: Refined the Landing screen background and layout: reduced WebGL GLSL shader glow factor to `0.08–0.15` range with rapid exponential falloff, replaced sine wave bending curves with 12 straight horizontal segment layers, and horizontally + vertically centered the central content block (`WELCOME TO MY<br />WORK.`, `INTERACTIVE ARCHITECTURE`, `COMPUTER SCIENCE × AI / ML`, `[ ENTER ]`).
- **Details**:
  - **Shader Math Refinement (`SlicedWaves.jsx`)**: Shader GLSL updated with 12 horizontal layers at fixed $Y$ base levels ($y = \text{baseY}$). Zero sine curve wave distortion, zero neon halos (`glow = 0.12 * exp(-distY * 240.0)`), layered horizontal motion at alternating slow speeds, 85-90% grayscale (`#27272A`, `#52525B`, `#A1A1AA`, `#FAFAFA`) with 10-15% selective `#FF2E2E` red accents, and a subtle central radial mask (`textReadabilityFactor`) to guarantee text readability.
  - **Centering Composition (`Landing.jsx`)**: Main `<main>` container centered both horizontally and vertically (`mx-auto my-auto text-center items-center justify-center`). Title `WELCOME TO MY<br />WORK.` formatted on two lines with `text-center`. Header (`SARVANI.` top-left, `PORTFOLIO ENTRY // 2026` top-right) and footer (`PRESS ENTER OR SCROLL TO CONTINUE ↓` bottom-left, `SCROLL TO ENTER ↓` bottom-right) retained at viewport edges.
- **Reason**: Eliminates neon glowing light trails and wave distortion while establishing a balanced, centered editorial cover layout.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 37: Landing Page Background Replacement with React Bits Acid Squares (`AcidSquares.jsx`, `Landing.jsx`)
- **Decision**: Replaced `SlicedWaves.jsx` on the Landing screen with WebGL GLSL shader component `AcidSquares.jsx`, adapting the React Bits Acid Squares pattern to the portfolio's monochrome/red design system.
- **Details**:
  - **Shader Configuration**: `density = 8`, `waveDepth = 0.55`, `zoom = 1.15`, `speed = 0.45`, `glow = 0.18`, `contrast = 1.05`, `brightness = 0.8`, `opacity = 0.78`, `grainIntensity = 0.025`, `mouseStrength = 0.06`, `mouseRadius = 0.35`.
  - **Color Palette Policy**: Uses `#121215` (surface dark), `#3F3F46` (muted zinc), `#FAFAFA` (white highlight), and selective `#FF2E2E` (sharp red accent signal). Zero purple, violet, blue, cyan, magenta, gold, or neon colors.
  - **Content & Layout Hierarchy**: Preserved centered typography (`WELCOME TO MY<br />WORK.`, `INTERACTIVE ARCHITECTURE`, `COMPUTER SCIENCE × AI / ML`, rectangular `[ ENTER ]` button, top identification header, and bottom scroll footer).
  - **Viewport**: Set container height to `100svh` to eliminate mobile browser viewport overflow issues.
- **Reason**: Replaces 2D horizontal slices with a dynamic, atmospheric 3D WebGL shader field that frames the centered typography and creates anticipation upon portfolio entry.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 38: Landing Page Final Simplification (`AcidSquares.jsx`, `Landing.jsx`)
- **Decision**: Simplified the Landing page content and visual density to create a minimal, spacious title screen with a dark, subtle AcidSquares atmospheric background.
- **Details**:
  - **Content Simplification**: Removed `COMPUTER SCIENCE × AI / ML` and `PRESS ENTER OR SCROLL TO CONTINUE`. Replaced the rectangular brutalist `[ ENTER ]` button with a simple monospace text link (`[ ENTER ]`) featuring `#A1A1AA` base color and `#FF2E2E` hover text color (zero button border, zero fill, zero shadow, zero glow). Retained `SCROLL TO ENTER ↓` aligned bottom-right.
  - **Shader Tuning**: Adjusted `AcidSquares.jsx` parameters for subtle dark depth: `glow: 0.08`, `brightness: 0.55`, `opacity: 0.42`, `density: 8`, `waveDepth: 0.45`, `speed: 0.35`, `contrast: 0.95`, `mouseStrength: 0.04`, `mouseRadius: 0.30`.
  - **Palette & Shader Cleanup**: Palette set to neutral darks `#09090B`, `#18181B`, `#52525B`. Removed all red pulse shader calculations from `AcidSquares.jsx` (red reserved strictly for UI elements like the period after `WORK.`).
  - **Viewport**: Enforced `100svh` container height with centered horizontal alignment and spacious negative padding.
- **Reason**: Shifts Landing focus from heavy shader effects to negative space and high-contrast typography, presenting a refined entrance experience.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 39: Playful & Mouse Responsive AcidSquares Interaction (`AcidSquares.jsx`)
- **Decision**: Enhanced the mouse interaction math in `AcidSquares.jsx` to make the dark volumetric background visibly push, bend, and ripple in response to cursor movement without increasing glow or altering colors.
- **Details**:
  - **Shader Math**: Updated GLSL displacement with directional unit vector push (`mouseDir * mouseImpact * uMouseStrength`) plus a localized surface wave ripple (`sin(mouseDist * 16.0 - t * 2.5) * 0.012 * mouseImpact`).
  - **Parameter Tuning**: Set `mouseStrength = 0.11` (range 0.08–0.14) and `mouseRadius = 0.35`. Updated pointer lerp tracking factor to `0.09` in JS animation loop for smooth, responsive cursor tracking.
  - **Locked Aesthetics**: Glow remains low (`glow = 0.08`), brightness subdued (`0.55`), opacity restrained (`0.42`), palette neutral (`#09090B`, `#18181B`, `#52525B`), typography and layout completely locked.
- **Reason**: Delivers an organic, playful tactile interaction that immediately responds to cursor velocity and direction while preserving dark visual restraint and central legibility.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-13

---

### Decision 40: Restore AcidSquares Shader Visibility & Parameters (`AcidSquares.jsx`, `Landing.jsx`)
- **Decision**: Restored visible WebGL shader rendering for `AcidSquares.jsx` on the Landing page, adjusting tone levels and opacity to ensure clear background presence without overwhelming centered typography.
- **Details**:
  - **Color Palette & Edge Visibility**: Set `color1: #09090B`, `color2: #27272A`, `color3: #71717A` with grid edge boost (`squareEdge * 0.35 + glowEffect * 0.45`).
  - **Shader Parameters**: `opacity: 0.62`, `brightness: 0.72`, `waveDepth: 0.65`, `glow: 0.12`, `speed: 0.45`, `density: 8`, `zoom: 1.15`, `exposure: 3500`, `mouseStrength: 0.10`, `mouseRadius: 0.35`, `grainIntensity: 0.02`.
  - **Center Vignette Adjustment**: Refactored the center readability mask (`0.55 + 0.45 * readability`) so the shader geometry remains visibly active and animated across the entire viewport while preserving centered title contrast.
  - **Zero Layout Changes**: Kept centered Landing content (`WELCOME TO MY WORK.`, `INTERACTIVE ARCHITECTURE`, `[ ENTER ]`, `SCROLL TO ENTER ↓`) and all subsequent portfolio sections 100% locked.
- **Reason**: Guarantees that the AcidSquares WebGL canvas renders as an active, dark, visible background layer immediately upon page load without being obscured by over-aggressive center masking or low opacity.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 41: AcidSquares GLSL Shader Variable Scope Fix & Visual Verification (`AcidSquares.jsx`)
- **Decision**: Diagnosed and fixed GLSL fragment shader compilation error caused by using variable `t` before declaration in mouse displacement calculation. Verified active WebGL canvas rendering via browser subagent.
- **Details**:
  - **Root Cause Analysis**: `FRAGMENT_SHADER` in `AcidSquares.jsx` referenced variable `t` on line 60 inside mouse displacement calculation (`sin(mouseDist * 16.0 - t * 2.5)`) prior to its declaration `float t = uTime * uSpeed;` on line 66. GLSL ES 3.0 strictly forbids using undeclared variables, causing `gl.compileShader()` to fail silently, log a compilation error to `console.error`, and return `null`, aborting WebGL program linking and leaving the canvas completely black/flat.
  - **The Fix**: Moved `float t = uTime * uSpeed;` to the very top of `main()` in `FRAGMENT_SHADER`, immediately resolving shader compilation.
  - **Browser Visual Verification**: Executed live browser inspection via `browser_subagent` at `http://localhost:5173`. Confirmed WebGL canvas is actively mounted (`z-0`), rendering dark volumetric square grid geometry (`#09090B`, `#27272A`, `#71717A`), smoothly animating across animation frames, and displacement-warping under pointer movement.
- **Reason**: Restores active WebGL GLSL shader execution on the Landing screen while keeping typography, layout, and performance 100% intact.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 42: Fluid Organic AcidSquares Shader Architecture (`AcidSquares.jsx`)
- **Decision**: Transformed AcidSquares from a dense, rigid ice-box grid into an open, organic, fluid dark surface with zero blue/cyan edge artifacts.
- **Details**:
  - **Open Composition Parameters**: Set `density = 5` (larger forms instead of tiny cells), `zoom = 1.35`, `waveDepth = 0.85` (dynamic cell phase variation), `spread = 0.45` (~70% dark negative space, ~30% geometric forms), `speed = 0.35`, `glow = 0.08`, `brightness = 0.60`, `opacity = 0.55`, `mouseStrength = 0.11`, `mouseRadius = 0.35`.
  - **Elimination of Blue/Cyan Edge Artifacts**: Enforced pure neutral monochrome luminance calculation (`vec3 monoLuma = vec3(dot(baseColor, vec3(0.299, 0.587, 0.114)))`) in GLSL, set `alpha: false` on WebGL context, and initialized `gl.clearColor(0.035, 0.035, 0.043, 1.0)`.
  - **Zero Layout Changes**: Centered Landing content (`WELCOME TO MY WORK.`, `INTERACTIVE ARCHITECTURE`, `[ ENTER ]`, `SCROLL TO ENTER ↓`) and all subsequent sections remain 100% locked.
- **Reason**: Replaces rigid tiled box grids with an organic, flowing, responsive technical surface that frames typography cleanly without chromatic edge bleeding.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 43: Replace AcidSquares with React Bits RippleGrid (`RippleGrid.jsx`, `Landing.jsx`)
- **Decision**: Removed `AcidSquares` from the Landing background and replaced it with `RippleGrid.jsx` based on the React Bits RippleGrid architecture.
- **Details**:
  - **Component Location**: `src/components/animations/RippleGrid.jsx`.
  - **Baseline Parameters**: `enableRainbow = false`, `gridColor = "#3F3F46"`, `rippleIntensity = 0.035`, `gridSize = 6.5`, `gridThickness = 7`, `mouseInteraction = true`, `mouseInteractionRadius = 0.65`, `opacity = 0.48`, `fadeDistance = 1.8`, `vignetteStrength = 1.5`, `glowIntensity = 0.035`, `gridRotation = 0`, `lightMode = false`.
  - **Strict Color Policy**: Restricts palette strictly to portfolio neutral darks (`#09090B` background, `#3F3F46` grid lines, `#52525B` highlights). Zero purple, violet, blue, cyan, gold, or rainbow colors.
  - **Interactive Wave Propagation**: Pointer movement generates real-time localized ripple wave propagation through the sparse grid without moving typography or layout elements.
  - **Zero Layout Changes**: Centered Landing content (`WELCOME TO MY WORK.`, `INTERACTIVE ARCHITECTURE`, `[ ENTER ]`, `SCROLL TO ENTER ↓`) and all subsequent sections remain 100% locked.
- **Reason**: Replaces box-like grid walls with an open, responsive digital grid surface ("touching a digital architectural surface") that reacts fluidly to pointer movement while maintaining typography legibility.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 44: Reduced Title Scale & Refined Grid Box Dimensions (`Landing.jsx`)
- **Decision**: Scaled down the Landing title font size and increased grid density so background grid line boxes appear smaller and more detailed.
- **Details**:
  - **Typography Scale**: Reduced `WELCOME TO MY<br />WORK.` display title from `text-5xl..text-9xl` to `text-3xl sm:text-5xl md:text-6xl lg:text-7xl` (`leading-tight`), creating a balanced, spacious title composition that leaves ample negative padding around edges.
  - **Grid Box Refinement**: Increased `RippleGrid` prop `gridSize` from `6.5` to `12.5` (`gridThickness: 5`), rendering smaller, finer, high-precision architectural grid squares across the `#09090B` canvas.
- **Reason**: Improves typographic elegance and background grid detail, providing a refined title cover layout with tactile cursor ripple interaction.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 45: Phase 5.0 — Landing → Hero Transition & Hero Validation Confirmation
- **Decision**: Validated and locked the Landing → Hero transition flow, sticky Navbar revelation, zero page flash, Hero starting position, exact approved copy, actual portrait plate, 3D Letter Swap, quiet HalftoneWave background, and seamless scroll continuity into Center Flow.
- **Details**:
  - **Transition Sequence**: Confirmed deliberate ~600–700ms fade transition on `[ ENTER ]` click, keyboard `Enter`, or downward scroll/touch swipe. Landing exits cleanly; Hero reveals naturally.
  - **Zero Page Flash & Layout Jump**: Confirmed consistent `#09090B` background layer across Landing, App shell, and Hero. Zero white/grey flash, unstyled flash, layout jump, or scrollbar jump.
  - **Navbar Hierarchy**: Landing header (`SARVANI.` / `PORTFOLIO ENTRY // 2026`) belongs strictly to Landing. Portfolio sticky Navbar activates smoothly upon entry without competing navigation headers.
  - **Hero Positioning & Content**: Hero lands at top viewport position (`y=0`). Preserves exact primary statement (`"I BUILD AT THE EDGE OF SOFTWARE AND MACHINE INTELLIGENCE."`), secondary description, core specializations, 3D Letter Swap name interaction (`SARVANI VADAVALLI`), and actual desaturated portrait plate (`src/assets/1.jpeg`) with restrained `#FF2E2E` behind-glow.
  - **Locked Components**: Landing, RippleGrid, Center Flow, Grid Motion, About, Capabilities, Projects, Experience, Achievements, Contact, and Footer remain 100% untouched.
- **Reason**: Ensures the portfolio entrance feels deliberate, polished, continuous, and high-performance while preserving all locked visual and structural components.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 46: Phase 5.1 — Hero Technical Grid & Crosshair Motion Matrix (`HalftoneWave.jsx`)
- **Decision**: Implemented a mechanical, pointer-responsive Technical Grid Motion Matrix in `HalftoneWave.jsx` for the Hero section.
- **Details**:
  - **Grid & Crosshair Structure**: Rendered a Canvas 2D precision matrix of dots and crosshairs (`+`) in `#27272A` with tiny structural `#FF2E2E` corner accents at select outer grid intersections. Zero glow, zero neon halos.
  - **Slow Mechanical Scan**: Continuous vertical scanline pulse sweeping across the background at a slow, deliberate cadence.
  - **Elastic Mouse Proximity & Displacement**: Localized cursor displacement (~170px radius, max 8px node deflection) powered by `rAF` and linear interpolation (`lerp = 0.07`). Elastic damping gently returns grid nodes to precision alignment when the cursor stops.
  - **Center Typographic Readability Mask**: Applied a dynamic radial opacity mask over the central left region (`SARVANI VADAVALLI` title & primary copy), keeping background motion subdued (~0.05–0.08 opacity) while focusing motion toward outer margins (~0.18–0.25 opacity).
  - **Accessibility & Compliance**: Respects `@media (prefers-reduced-motion: reduce)` by disabling continuous animation loops and rendering a static technical grid. Palette strictly uses `#09090B`, `#121215`, `#27272A`, `#FAFAFA`, `#A1A1AA`, `#FF2E2E`. Zero forbidden colors or floating particle clouds.
- **Reason**: Provides visual vitality and mechanical reactivity to the Hero section without competing with typography, portrait asset, or downstream sections.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 47: Phase 5.2 — Landing True Grid Motion Image Tile Background (`LandingGridMotion.jsx`, `Landing.jsx`)
- **Decision**: Implemented a true image-tile Grid Motion background system (`LandingGridMotion.jsx`) for the Landing screen based on React Bits Grid Motion architecture.
- **Details**:
  - **4-Row Image Grid Architecture**: Replaced text tiles and sparse fragment canvas with 4 horizontal rows of large rectangular visual image tiles (`w-[240px..360px] h-[140px..210px]`, `border-[#27272A]`, `bg-[#121215]`). Absolutely zero text inside tiles and zero text labels.
  - **Curated Monochrome Editorial Imagery**: Curated pool of high-contrast monochrome architectural, structural, and mechanical photography (brutalist concrete facades, steel beam frameworks, geometric shadow planes) treated with CSS `grayscale(100%) contrast(125%) brightness(75%)` to align strictly with `#09090B` dark backdrop.
  - **Alternating Continuous Motion & Mouse Inertia**: Alternating row motion directions (Odd rows drift right, even rows drift left) with continuous horizontal sliding when pointer is stationary. Pointer X movement applies smooth linear interpolation inertia (`lerp = 0.05`) across rows without per-frame React re-renders.
  - **Center Protection Mask**: Central radial dark gradient mask (`radial-gradient(circle at center, rgba(9,9,11,0.72) 0%, rgba(9,9,11,0.88) 55%, rgba(9,9,11,0.96) 90%)`) preserves 100% crispness and legibility for `WELCOME TO MY WORK.` and Landing metadata.
  - **Exact Content & Transition Protection**: Preserved all approved Landing typography (`SARVANI.`, `PORTFOLIO ENTRY // 2026`, `INTERACTIVE ARCHITECTURE`, `WELCOME TO MY WORK.` with terminal red period, `[ ENTER ]`, `SCROLL TO ENTER ↓`) and portfolio entry transition logic.
  - **Accessibility**: Full `@media (prefers-reduced-motion: reduce)` fallback rendering static image tiles. Zero forbidden colors.
- **Reason**: Provides a memorable, high-impact, interactive editorial entrance that visually communicates through brutalist architectural imagery while keeping foreground typography dominant.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 48: Phase 5.2 Revision — Landing Abstract Distorted Monochrome Panel Grid Motion (`LandingGridMotion.jsx`, `Landing.jsx`)
- **Decision**: Revised `LandingGridMotion.jsx` visual treatment to replace photographic imagery with abstract procedural distorted monochrome panels ("AcidSquares-like abstract geometry organized into Grid Motion panels").
- **Details**:
  - **Zero Photography & Zero Text**: Completely removed all photography, architecture photos, and Unsplash URLs. Absolutely zero text tiles and zero text labels inside panels.
  - **Abstract Procedural Panels**: Rendered 4 horizontal rows of large rectangular panels (`w-[260px..380px] h-[160px..230px]`, `border-[#27272A]`, `bg-[#121215]`) containing high-contrast procedural wave deformation lines, optical interference bands, and topographic contour curves (`#09090B`, `#121215`, `#27272A`, `#FAFAFA`).
  - **Preserved 4-Row Grid Motion Physics**: Kept alternating horizontal continuous drift (Row 0 right, Row 1 left, Row 2 right, Row 3 left) and pointer X inertia displacement (`rAF` lerp physics = 0.05).
  - **Center Protection Mask & Readability**: Central radial dark gradient mask preserves 100% legibility and contrast for `WELCOME TO MY WORK.` and Landing metadata.
  - **Exact Landing Content & Transition Logic**: Preserved all approved Landing copy (`SARVANI.`, `PORTFOLIO ENTRY // 2026`, `INTERACTIVE ARCHITECTURE`, `WELCOME TO MY WORK.` with terminal red period, `[ ENTER ]`, `SCROLL TO ENTER ↓`) and entry transition trigger handlers.
  - **Accessibility**: Respects `@media (prefers-reduced-motion: reduce)` with static panel composition. Zero forbidden colors.
- **Reason**: Replaces photographic tiles with an experimental, brutalist, distorted graphic visual language while retaining the signature Grid Motion movement and pointer reactivity.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 49: Phase 5.2 — Landing Grid Motion Optical Lens Reference Panels (`LandingGridMotion.jsx`, `Landing.jsx`)
- **Decision**: Updated `LandingGridMotion.jsx` tile visual renderer to match the exact visual reference image provided by the user (optical lens distortion panels with fine vertical ribs and crisp semicircular shadow cutouts).
- **Details**:
  - **Reference-Matching Tile Renderer**: Created `OpticalLensPanel` component rendering a procedural optical lens pattern matching the reference image: off-white/silver-grey base (`#FAFAFA` / `#E4E4E7`), circular lens distortion field, fine vertical ribbed scanlines, and a sharp semicircular dark shadow cutout (`#09090B`). Panels feature rounded corners (`rounded-2xl`, `border-[#27272A]`) with deep black gaps (`gap-4 sm:gap-6`).
  - **28 Seeded Tile Variations**: Generated 28 unique tile variations across 4 horizontal rows by modulating rotation angles (`0°`, `90°`, `180°`, `270°`), shadow cut orientations, lens radii, and scale.
  - **4-Row Grid Motion Physics**: Retained exact React Bits Grid Motion structure (4 horizontal rows, 7 tiles per row). Rows 0 & 2 drift right; Rows 1 & 3 drift left when stationary. Pointer X movement applies distinct inertia factors per row (`[0.6, -0.4, 0.5, -0.3]`) with `rAF` lerp physics (`lerp = 0.05`).
  - **Center Protection Overlay**: Radial dark protection gradient mask preserves 100% crispness and contrast for `WELCOME TO MY WORK.` and Landing metadata.
  - **Zero Downstream Impact**: Hero, Center Flow, About, Capabilities, Projects, Experience, Achievements, Contact, Navbar, Footer, and transition handlers remain 100% untouched.
- **Reason**: Perfectly aligns the Landing background visual style with the user's reference image while preserving the signature React Bits Grid Motion movement, inertia physics, and typography contrast.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 50: Phase 5.2 — Diagonal Grid Motion Alignment & Trajectory (`LandingGridMotion.jsx`)
- **Decision**: Oriented the Grid Motion row tracks onto a tilted diagonal axis (-14° rotation) matching the angled perspective of the reference image, with blocks sliding continuously along the diagonal vector.
- **Details**:
  - **Angled Track Rotation**: Rotated the row container by `-14deg` with `scale(1.18)`, spanning 5 rows of optical lens panels to ensure seamless edge-to-edge coverage across all screen ratios without horizontal page overflow.
  - **Diagonal Movement & Inertia**: Alternating tracks slide continuously along the tilted -14° diagonal axis. Pointer movement along the diagonal axis applies smooth lerp inertia (`lerp = 0.05`), responding elastically to cursor gestures.
  - **Reference Aesthetics & Typography**: Preserved the procedural `OpticalLensPanel` visual styling (spherical lens distortion, vertical ribs, semicircular dark shadow cutout, rounded corners) and the central dark protection vignette layer over `WELCOME TO MY WORK.`.
- **Reason**: Aligns the physical movement direction with the user's explicit aesthetic preference for diagonal sliding, directly reflecting the diagonal angle in the visual reference image.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 51: Phase 5.2 — Minimalist Landing Typography Refinement (`Landing.jsx`)
- **Decision**: Removed `INTERACTIVE ARCHITECTURE`, `PORTFOLIO ENTRY // 2026`, and `SCROLL TO ENTER ↓` from the Landing screen to create a pure, high-impact minimalist composition.
- **Details**:
  - **Removed Text Elements**: Removed top-right label `PORTFOLIO ENTRY // 2026`, subtitle tag `INTERACTIVE ARCHITECTURE`, and bottom footer text `SCROLL TO ENTER ↓`.
  - **Preserved Core Hierarchy**: Kept top-left branding `SARVANI.` and centered focal headline `WELCOME TO MY WORK.` with terminal red dot followed by monospace trigger `[ ENTER ]`.
  - **Maintained Interactions**: Portfolio entry triggers remain 100% active (click `[ ENTER ]`, keyboard `Enter`, mouse wheel downward scroll, mobile upward swipe).
- **Reason**: Enhances visual focus and brutalist editorial clarity by eliminating secondary descriptive copy, allowing the centered title and diagonal optical lens Grid Motion background to take full focus.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 52: Phase 5.3 — Hero Portrait: Replace Profile Card with Physics-Based Lanyard (`Lanyard.jsx`, `HeroImage.jsx`)
- **Decision**: Replaced the Hero portrait `ProfileCard` CSS tilt card with a full 3D physics-based React Bits Lanyard component (`@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, `three`, `card.glb`, `lanyard.png`).
- **Details**:
  - **Removed Old ProfileCard**: Completely removed all remnants of the old `ProfileCard` (CSS transforms, tilt refs, behind-glow radial blur, and angled offset background outline).
  - **Physics Architecture**: Implemented real Rapier 3D rigid body and rope joint physics (`useRopeJoint`, `useSphericalJoint`, `BallCollider`, `CuboidCollider`) with Catmull-Rom spline rope deformation, pointer dragging with pointer capture, gravity `[0, -40, 0]`, velocity awakening, and natural settling.
  - **Editorial Card Texture Compositing**: Built an integrated canvas atlas compositing engine directly in `Lanyard.jsx`:
    - **Front Face (`FRONT_UV_RECT`)**: Incorporates the owner's actual portrait (`src/assets/1.jpeg`) with a focused high-definition crop on Sarvani (head + upper torso), an editorial desaturated high-contrast monochrome filter (`grayscale(80%) contrast(124%) brightness(100%) saturate(20%)`), sharp red corner tick markers (`#FF2E2E`), and bottom information strip (`#09090B` / `#27272A`) displaying only the red square indicator and `SARVANI VADAVALLI` (#FAFAFA), with `FIGURE // 01` removed for a clean, focused editorial layout. Zero HTML overlay is rendered on top of the physical card.
    - **Back Face (`BACK_UV_RECT`)**: Renders a deep dark brutalist ID badge credential plate with technical grid lines, red corner markers, system credential metadata, and barcode elements.
  - **Lanyard Band Treatment**: Integrated `src/assets/lanyard.png` tinted to dark zinc border tone (`#27272A`) for a physical, restrained badge strap appearance without harsh white tones.
  - **Restrained Lighting & Aesthetic**: White ambient + directional Lightformer lighting without neon, bloom, glassmorphism, or holographic effects. Strictly respects portfolio palette (`#09090B`, `#121215`, `#27272A`, `#FAFAFA`, `#A1A1AA`, `#FF2E2E`).
  - **High-Definition Portrait Framing & Texture Clarity**:
    - Replaced full-canopy framing with a focused, cropped portrait composition (`cropH = 580`, `cropY = 0.28`), zooming in directly on Sarvani from the upper torso and head up, increasing facial pixel density by over 2.5x.
    - Upgraded dynamic texture atlas resolution to `2400x2400` with `imageSmoothingQuality = 'high'`.
    - Configured `CanvasTexture` with `minFilter = THREE.LinearFilter`, `magFilter = THREE.LinearFilter`, and `generateMipmaps = false` to completely eliminate Three.js perspective mipmap downsampling blur.
    - Optimized physical material parameters (`roughness={0.15}`, `metalness={0.0}`) so the diffuse image is crisp, high-contrast, and punchy without foggy roughness scattering.
  - **Enlarged Physical Scale**: Scaled the card mesh to `3.6` and adjusted camera framing (`position={[0, -0.65, 12.8]}`) with container `max-w-[500px]`, giving the portrait card an immediate, commanding presence matching the left-side typography.
  - **Instant Arrival (Background Pre-Warming)**: Pre-mounted the main app shell (`fixed inset-0 pointer-events-none opacity-0`) while on the Landing screen. Three.js, Rapier WASM, `card.glb`, and the composite canvas textures are fully initialized and settled before the user clicks Enter, ensuring **instant visual arrival with zero delay or pop-in lag**.
  - **Zero Downstream Impact**: Landing, Center Flow, and downstream sections remain completely untouched.
- **Reason**: Delivers an immediate, commanding, tactile, and physical editorial ID badge experience with crisp legibility and zero arrival latency.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 53: Phase 6.0 — Resume-grounded Capabilities System (`Capabilities.jsx`, `App.jsx`)
- **Decision**: Implemented the redesigned Capabilities section (`#capabilities`) as an asymmetric editorial specification matrix answering "What can Sarvani build with?", strictly derived from the finalized resume and structured into seven primary capability systems with verified project evidence indicators.
- **Details**:
  - **Component Structure**: `src/components/sections/capabilities/Capabilities.jsx` mounted via `<Capabilities />` in `App.jsx` inside standard `<Section id="capabilities">`.
  - **Header & System Metadata**:
    - Top annotation strip: `CAPABILITIES // TECHNICAL SYSTEM` (left) and `SPECIFICATION MATRIX // 06 SYSTEMS` (right).
    - Section display heading: `CAPABILITIES.` with terminal red dot (`#FF2E2E`), system label `06 SYSTEMS`, and supporting line `WHAT I BUILD WITH.`.
    - Live `INSPECTION CONSOLE`: Synchronously displays active system title, dynamic index (`01 // 06`), and total unit count (`33 TECHNOLOGIES`) with pulsing red `LIVE` beacon.
  - **Strict Resume-Derived Technology Content (6 Groups, 33 Exact Units, Zero Inventions)**:
    - `01 / PROGRAMMING`: C, C++, Python, JavaScript, SQL, HTML/CSS | `USED IN // UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT`
    - `02 / AI / MACHINE LEARNING`: TensorFlow, Scikit-learn, Machine Learning | `USED IN // DEEPFAKE DETECTION`
    - `03 / FULL-STACK ENGINEERING`: React, Node.js, Express.js, Tailwind CSS, REST APIs, JWT Authentication | `USED IN // UNIMEET`
    - `04 / DATABASES`: MySQL, MongoDB, Database Design, SQL, CRUD Operations, Stored Procedures, Triggers | `USED IN // HOSPITAL MANAGEMENT · UNIMEET`
    - `05 / CORE ENGINEERING`: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks | `USED IN // SYSTEM ARCHITECTURE & COMPUTATIONAL FOUNDATIONS`
    - `06 / DEVELOPMENT TOOLS`: Git, GitHub, VS Code, Postman, Docker, Figma | `USED IN // DEVELOPMENT & DEPLOYMENT LIFECYCLE`
  - **Computer Vision Removed**: Per user request, the Computer Vision domain was completely removed from the specification matrix, consolidating the system into 6 core technical capability domains with 33 verified technologies.
  - **Project Evidence Links ("USED IN")**: Capability rows connect directly to portfolio projects as evidence without duplicating the Projects section.
  - **Interaction & Responsive Behavior**:
    - Hovering or focusing a row activates the left `#FF2E2E` edge indicator, subtly shifts the content 3–5px horizontally (`translate-x-1`), changes the index number to red, and syncs the inspection console.
    - On mobile viewports (400px), cleanly stacks into a single vertical list where technology chips and `USED IN` project citations remain 100% visible without requiring hover. Zero horizontal overflow.
  - **Strict Palette & Design Tokens**:
    - `#09090B` (Background), `#121215` (Surface), `#27272A` (Borders), `#FAFAFA` (Primary), `#A1A1AA` (Muted), `#FF2E2E` (Accent).
    - Corners 0px throughout. Zero gradients, zero neon, zero glassmorphism, zero WebGL.
  - **Zero Downstream/Upstream Impact**: Landing, Hero, Center Flow, About, Projects, Experience, Achievements, Contact, Navbar, and Footer remain 100% locked.
- **Reason**: Translates the resume into a structured, high-impact interactive technical specification system that provides concrete proof of Sarvani's engineering range and technical depth.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

---

### Decision 54: Phase 6.1 — Capabilities Accordion System (`Capabilities.jsx`)
- **Decision**: Replaced the previous vertically stacked card-based layout with a compact, interactive horizontal accordion system (desktop/tablet) and vertical accordion (mobile) inspired by the React Bits AccordionGallery architecture, adapted into a text-first technical specification system.
- **Details**:
  - **Dramatically Reduced Vertical Height**: Replaced seven stacked full-width cards with a single unified container (`h-[440px]` on desktop, `h-[460px]` on large displays), cutting vertical scroll distance by over 65%.
  - **Accordion Gallery Architecture Adaptation**:
    - Removed all images, photos, media layers, and gallery masks from the React Bits component, translating the interaction into a pure techno-brutalist typography and specification interface.
    - **Desktop/Tablet Horizontal Mode (`md:flex`)**: 7 horizontal panels side-by-side. Inactive panels remain narrow (`flexGrow: 0.7`) displaying a rotated vertical title (`[writing-mode:vertical-lr]`) and muted monospace index (`01` to `07`). Hovering or clicking expands the target panel (`flexGrow: 4.8`) via GSAP (`gsap.to`, duration 0.55s, ease `power3.out`), revealing the complete category title, subheader label, concise description, verified technology chips, and `USED IN //` project citation with active `#FF2E2E` top indicator line.
    - **Mobile Vertical Mode (`md:hidden`)**: Cleanly converts into a stacked vertical accordion where each panel header displays `01 / PROGRAMMING`, `02 / AI / MACHINE LEARNING`, etc., with an interactive `+` indicator. Tapping an item expands it smoothly to display description, technology chips, and project links without horizontal overflow.
  - **Strict Resume Content (7 Groups, Zero Inventions)**:
    - `01 / PROGRAMMING`: C, C++, Python, JavaScript, SQL, HTML/CSS | `USED IN // UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT`
    - `02 / AI / MACHINE LEARNING`: TensorFlow, Scikit-learn, Machine Learning | `USED IN // DEEPFAKE DETECTION`
    - `03 / COMPUTER VISION`: OpenCV, NumPy, CNN, Image Processing | `USED IN // DEEPFAKE DETECTION`
    - `04 / FULL-STACK ENGINEERING`: React, Node.js, Express.js, Tailwind CSS, REST APIs, JWT Authentication | `USED IN // UNIMEET`
    - `05 / DATABASES`: MySQL, MongoDB, Database Design, SQL, CRUD Operations, Stored Procedures, Triggers | `USED IN // HOSPITAL MANAGEMENT · UNIMEET`
    - `06 / CORE ENGINEERING`: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks | `SYSTEM ARCHITECTURE & COMPUTATIONAL FOUNDATIONS`
    - `07 / DEVELOPMENT TOOLS`: Git, GitHub, VS Code, Postman, Docker, Figma | `DEVELOPMENT & DEPLOYMENT LIFECYCLE`
  - **Keyboard Navigation & Accessibility**:
    - Full keyboard support: `ArrowRight` / `ArrowDown` to advance, `ArrowLeft` / `ArrowUp` to go back, `Enter` / `Space` to activate.
    - High-contrast red focus outline: `focus-visible:outline-2 focus-visible:outline-[#FF2E2E]`.
    - ARIA tablist/tab roles (`aria-selected`, `aria-controls`, `aria-expanded`).
    - Full `@media (prefers-reduced-motion: reduce)` fallback with instant transitions.
  - **Strict Visual Language**:
    - `#09090B` (Background), `#121215` (Surface), `#27272A` (Borders), `#FAFAFA` (Primary), `#A1A1AA` (Muted), `#FF2E2E` (Accent).
    - Corners: `0px` throughout. Zero gradients, zero neon, zero glassmorphism, zero stock images.
  - **Zero Downstream/Upstream Impact**: Landing, Hero, Center Flow, About, Projects, Experience, Achievements, Contact, Navbar, and Footer remain 100% locked.
- **Reason**: Solves the excessive vertical page length of the previous card stack while delivering an engaging, tactile, high-density technical inspection experience.
- **Status**: SUPERSEDED BY DECISION 55
- **Date**: 2026-09-14

---

### Decision 55: Phase 6.2 — Restore Capabilities Composition + Accordion Interaction (`Capabilities.jsx`)
- **Decision**: Reverted the single horizontal accordion layout and restored the two-column editorial composition: 7 distinct capability cards in the left/main column paired with a persistent side technical system inspector panel on the right, embedding compact accordion expansion/collapse mechanics inside the cards.
- **Details**:
  - **Composition Architecture**:
    - **Left / Main Column (8 Cols)**: Vertical stack of 7 distinct capability modules (`01 PROGRAMMING` through `07 DEVELOPMENT TOOLS`). In inactive/collapsed state, each card is a compact, streamlined row displaying module index, category title, technology preview string (`C · C++ · Python · JavaScript · SQL · HTML/CSS`), and a `+` indicator. Only one card expands at a time, revealing full operational description, technology badges, left `#FF2E2E` active indicator bar, and `USED IN //` project citation.
    - **Right Column (4 Cols, Desktop Sticky)**: Persistent technical instrument panel (`CAPABILITY SYSTEM // 07 MODULES`, `● LIVE INSPECTOR` status with pulsing red beacon) displaying the active module number in large Space Grotesk (`01`–`07`), module title and operational label, complete technology stack breakdown, project citation, and `STATUS: VERIFIED` metadata. Synchronously updates via GSAP crossfade whenever the active card changes.
    - **Mobile Adaptation (< 1024px / 400px)**: Cards stack vertically with click-to-toggle accordion functionality. The side system inspector moves cleanly below the card stack, preserving full layout fidelity with zero horizontal overflow.
  - **Interactive Mechanics**:
    - Desktop hover and click activation: Moving between cards activates and expands the target card while collapsing neighbors, simultaneously updating the persistent side inspector.
    - Keyboard navigation: `ArrowUp` / `ArrowLeft` for previous module, `ArrowDown` / `ArrowRight` for next module, `Enter` / `Space` to activate, with visible `#FF2E2E` focus rings.
    - Reduced motion: Full `@media (prefers-reduced-motion: reduce)` support with instant transitions.
  - **Resume Content Grounding (7 Modules, 37 Technologies, Zero Inventions)**:
    - `01 / PROGRAMMING`: C, C++, Python, JavaScript, SQL, HTML/CSS | `USED IN // UNIMEET · DEEPFAKE DETECTION · HOSPITAL MANAGEMENT`
    - `02 / AI / MACHINE LEARNING`: TensorFlow, Scikit-learn, Machine Learning | `USED IN // DEEPFAKE DETECTION`
    - `03 / COMPUTER VISION`: OpenCV, NumPy, CNN, Image Processing | `USED IN // DEEPFAKE DETECTION`
    - `04 / FULL-STACK ENGINEERING`: React, Node.js, Express.js, Tailwind CSS, REST APIs, JWT Authentication | `USED IN // UNIMEET`
    - `05 / DATABASES`: MySQL, MongoDB, Database Design, SQL, CRUD Operations, Stored Procedures, Triggers | `USED IN // HOSPITAL MANAGEMENT · UNIMEET`
    - `06 / CORE ENGINEERING`: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks | `SYSTEM ARCHITECTURE & COMPUTATIONAL FOUNDATIONS`
    - `07 / DEVELOPMENT TOOLS`: Git, GitHub, VS Code, Postman, Docker, Figma | `DEVELOPMENT & DEPLOYMENT LIFECYCLE`
  - **Strict Techno-Brutalist Visual Language**:
    - Palette: `#09090B` (Background), `#121215` (Surface), `#27272A` (Borders), `#FAFAFA` (Primary), `#A1A1AA` (Muted), `#FF2E2E` (Accent).
    - Corners: `0px` throughout. Zero gradients, zero neon, zero glassmorphism, zero stock images.
  - **Zero Downstream/Upstream Impact**: Landing, Hero, Center Flow, About, Projects, Experience, Achievements, Contact, Navbar, and Footer remain 100% locked.
- **Reason**: The previous single horizontal accordion destroyed the intended editorial composition and side inspector hierarchy. Combining the two-column card + persistent inspector layout with compact accordion card expansion achieves the optimal balance of visual structure, reduced vertical repetition, and interactive precision.
- **Status**: CONFIRMED & IMPLEMENTED
- **Date**: 2026-09-14

