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

## 3. Page / Section Navigation Anchor Flow

1. **`Navbar`** (`sticky top-0 z-50`): Brand logo (`SARVANI.`) pointing to `#hero`, navigation links pointing to `#projects`, `#about`, `#capabilities`, `#experience`, `#achievements`, `#contact`.
2. **`#hero` Section**: Complete Hero cover featuring `Space Grotesk` display name, 3D Letter Swap, portrait card, and technical metadata matrix.
3. **`CenterFlowSection` (`#center-flow-nav`)**: Interactive radial node navigation system placed directly after Hero. Outer nodes navigate natively to `#about`, `#capabilities`, `#projects`, `#experience`, `#achievements`, `#contact`.
4. **`#about` Section**: Structural boundary for bio summary and engineering philosophy.
5. **`#capabilities` Section**: Structural boundary for technical skills matrix.
6. **`#projects` Section**: Structural boundary for project showcases grid.
7. **`#experience` Section**: Structural boundary for career timeline.
8. **`#achievements` Section**: Structural boundary for key metrics and honors.
9. **`#contact` Section**: Structural boundary for contact form and links.
10. **`Footer`**: Copyright, colophon, and top anchor link (`#hero`).

---

## 4. Center Flow Technical Architecture (Phase 4.2)

- **Node-to-Section Mapping**: Native smooth scrolling to destination section anchors with `scroll-mt-16` offset protection.
- **Active Section Highlighting**: Uses `IntersectionObserver` observing destination IDs (`rootMargin: '-30% 0px -40% 0px'`) to highlight active node with Sharp Red (`#FF2E2E`) border and glowing indicator.
- **Accessibility & Motion**: All nodes render native keyboard-accessible `<a>` links with high-contrast `:focus-visible` focus rings. Disables line pulse animations when `@media (prefers-reduced-motion: reduce)` is active.
