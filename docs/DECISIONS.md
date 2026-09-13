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
