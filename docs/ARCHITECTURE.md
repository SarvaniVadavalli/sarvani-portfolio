# Application Architecture Overview

This document describes the technical architecture, layout structure, styling strategy, and performance considerations for the **Sarvani Portfolio**.

---

## 1. Frontend Architecture

- **Core Engine**: Single Page Application (SPA) built with **React 19** and bundled with **Vite**.
- **Language**: Standard JavaScript (JSX) for lightweight, rapid development without type compilation overhead.
- **State Management**: Local component state (`useState`, `useRef`). No heavy global state libraries required.
- **DOM Structure**: Continuous single-page scroll layout assembled with semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).

---

## 2. Implemented Component Architecture (Phase 4.1)

The application component tree is organized into single-responsibility modules:

```
src/
├── App.jsx                     # Single-page continuous shell composing Navbar, Hero, Section placeholders, and Footer
├── main.jsx                    # React root entry point
├── index.css                   # Tailwind v4 import & design system token definitions
├── components/
│   ├── layout/                 # Global structural frames (IMPLEMENTED Phase 2.1)
│   │   ├── Navbar.jsx          # Sticky header navigation
│   │   ├── PageContainer.jsx   # Reusable 1400px boundary wrapper
│   │   ├── Section.jsx         # Reusable semantic section container with scroll anchors
│   │   └── Footer.jsx          # Structural page footer
│   ├── sections/
│   │   └── hero/               # Hero section components (IMPLEMENTED Phase 3.1 & 3.2)
│   │       ├── Hero.jsx        # Hero root composition (12-col editorial grid + Threads background)
│   │       ├── HeroName.jsx    # Display name header with 3D Letter Swap
│   │       ├── HeroImage.jsx   # Editorial portrait presentation (src/assets/1.jpeg)
│   │       └── HeroMeta.jsx    # Monospace availability badges & specialization tags
│   ├── about/                  # About section components (Phase 6)
│   ├── capabilities/           # Skills & tech matrix (Phase 6)
│   ├── projects/               # Portfolio project showcases (Phase 5)
│   ├── experience/             # Career timeline (Phase 6)
│   ├── achievements/           # Key achievements (Phase 6)
│   ├── contact/                # Contact section (Phase 7)
│   └── animations/             # Reusable motion primitives
│       ├── Threads.jsx         # Primary Hero atmospheric background (IMPLEMENTED Phase 4.1)
│       └── RadialFlow.jsx      # Secondary section transition effect (Phase 4.2)
└── assets/
    └── 1.jpeg                  # Owner editorial portrait asset
```

---

## 3. Page / Section Navigation Anchor Flow

1. **`Navbar`** (`sticky top-0 z-50`): Brand logo (`SARVANI.`) pointing to `#hero`, navigation links pointing to `#projects`, `#about`, `#capabilities`, `#experience`, `#achievements`, `#contact`.
2. **`#hero` Section**: Complete Hero cover featuring `Threads` signal wave background, `Space Grotesk` display name, 3D Letter Swap, portrait card, and technical metadata matrix.
3. **`#about` Section**: Structural boundary for bio summary and engineering philosophy.
4. **`#capabilities` Section**: Structural boundary for technical skills matrix.
5. **`#projects` Section**: Structural boundary for project showcases grid.
6. **`#experience` Section**: Structural boundary for career timeline.
7. **`#achievements` Section**: Structural boundary for key metrics and honors.
8. **`#contact` Section**: Structural boundary for contact form and links.
9. **`Footer`**: Copyright, colophon, and top anchor link (`#hero`).

---

## 4. Threads Background Architecture & Performance (Phase 4.1)

- **React Bits Threads Concept**: Art-directed to the Sarvani Portfolio design system. Draws technical signal lines across an HTML5 `<canvas>` element.
- **Color & Opacity**: Utilizes low-opacity off-white (`rgba(250, 250, 250, 0.05-0.08)`) with a single sparse Sharp Red accent thread (`rgba(255, 46, 46, 0.22)`).
- **Pointer Interaction**: Subtle cursor deflection interpolated smoothly (`mouse.x += (target - mouse.x) * 0.04`) without trail effects or camera chasing.
- **Layering**: Positioned behind Hero content (`-z-10 pointer-events-none`) with zero input blocking or layout shifts.
- **Reduced Motion**: Listens to `@media (prefers-reduced-motion: reduce)` and pauses `requestAnimationFrame` while keeping a static thread composition.
