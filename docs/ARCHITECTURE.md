# Application Architecture Overview

This document describes the technical architecture, layout structure, styling strategy, and performance considerations for the **Sarvani Portfolio**.

---

## 1. Frontend Architecture

- **Core Engine**: Single Page Application (SPA) built with **React 19** and bundled with **Vite**.
- **Language**: Standard JavaScript (JSX) for lightweight, rapid development without type compilation overhead.
- **State Management**: Local component state (`useState`, `useRef`, `IntersectionObserver`). No heavy global state libraries required.
- **DOM Structure**: Continuous single-page scroll layout assembled with semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).

---

## 2. Implemented Component Architecture (Phase 4.2)

The application component tree is organized into single-responsibility modules:

```
src/
├── App.jsx                     # Single-page continuous shell composing Navbar, Hero, CenterFlowSection, Section placeholders, and Footer
├── main.jsx                    # React root entry point
├── index.css                   # Tailwind v4 import & design system token definitions
├── components/
│   ├── layout/                 # Global structural frames (IMPLEMENTED Phase 2.1)
│   │   ├── Navbar.jsx          # Sticky header navigation
│   │   ├── PageContainer.jsx   # Reusable 1400px boundary wrapper
│   │   ├── Section.jsx         # Reusable semantic section container with scroll anchors
│   │   └── Footer.jsx          # Structural page footer
│   ├── sections/
│   │   ├── hero/               # Hero section components (IMPLEMENTED Phase 3.1 & 3.2)
│   │   │   ├── Hero.jsx        # Hero root composition (12-col editorial grid)
│   │   │   ├── HeroName.jsx    # Display name header with 3D Letter Swap
│   │   │   ├── HeroImage.jsx   # Editorial portrait presentation (src/assets/1.jpeg)
│   │   │   └── HeroMeta.jsx    # Monospace availability badges & specialization tags
│   │   └── navigation/         # Center Flow Navigation (IMPLEMENTED Phase 4.2)
│   │       └── CenterFlowSection.jsx # Dedicated navigation section placed after Hero and before About
│   ├── about/                  # About section components (Phase 6)
│   ├── capabilities/           # Skills & tech matrix (Phase 6)
│   ├── projects/               # Portfolio project showcases (Phase 5)
│   ├── experience/             # Career timeline (Phase 6)
│   ├── achievements/           # Key achievements (Phase 6)
│   ├── contact/                # Contact section (Phase 7)
│   └── animations/             # Reusable motion primitives
│       ├── CenterFlow.jsx      # Interactive radial node navigation system (IMPLEMENTED Phase 4.2)
│       └── RadialFlow.jsx      # Secondary section transition effect (Phase 4.2)
└── assets/
    └── 1.jpeg                  # Owner editorial portrait asset
```

---

## 3. Fullscreen Section Navigation Architecture (Phase 6.0)

- **Presentation Model**: Staged full-screen presentation (`PortfolioShell.jsx`). Every section occupies exactly `100vw × 100vh` (`100svh`), completely hiding the next section underneath.
- **Centralized Controller**: `useSectionNavigation.js` manages state across 9 ordered sections (`00: landing`, `01: hero`, `02: center-flow`, `03: about`, `04: capabilities`, `05: projects`, `06: journey`, `07: achievements`, `08: contact`).
- **Gesture Engine & Locking**: Handles mouse wheel, trackpad, touch swipe up/down (50px min threshold), and keyboard arrows/page keys. Implements a ~650ms input lock during section transitions to prevent section skipping or overscroll drift.
- **Structural Transition Overlay**: `SectionTransitionOverlay.jsx` renders mechanical transition indicators (`01 // HERO → 02 // CENTER FLOW`), `#FF2E2E` registration mark, and grid lines.
- **Component Link Integration**: `Navbar.jsx` and `CenterFlow.jsx` map directly to `goToSection(index)` for direct fullscreen navigation.

---

## 4. Center Flow Technical Architecture (Phase 4.2 & 6.0)

- **Node-to-Section Mapping**: Radial node clicks trigger `goToSection(index)` via `useSectionNavigation` for instant fullscreen section presentation.
- **Accessibility & Motion**: All nodes render native keyboard-accessible controls with high-contrast `:focus-visible` focus rings. Disables pulse animations when `@media (prefers-reduced-motion: reduce)` is active.
