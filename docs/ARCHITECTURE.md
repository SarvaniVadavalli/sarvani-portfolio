# Application Architecture Overview

This document describes the high-level technical architecture, component layout, styling strategy, and performance considerations for the **Sarvani Portfolio**.

---

## 1. Frontend Architecture

- **Core Engine**: Single Page Application (SPA) built with **React 19** and bundled with **Vite**.
- **Language**: Standard JavaScript (JSX) for lightweight, rapid development without type compilation overhead.
- **State Management**: Local component state (`useState`, `useRef`, `useContext` where necessary). No heavy global state libraries (e.g., Redux/Zustand) required for a portfolio site.
- **DOM Structure**: Continuous single-page scroll layout divided into semantic sections.

---

## 2. Component Structure

The component hierarchy is organized into logical feature folders:

```
src/
├── App.jsx                     # Top-level shell and continuous section composition
├── main.jsx                    # React root entry point
├── index.css                   # Tailwind v4 import & design system token definitions
├── components/
│   ├── layout/                 # Global structural frames
│   │   ├── Navbar.jsx          # Sticky header navigation
│   │   ├── PageContainer.jsx   # Layout boundary wrapper
│   │   ├── Section.jsx         # Section container with semantic tag & scroll anchor
│   │   └── Footer.jsx          # Page footer
│   ├── hero/                   # Hero section components
│   │   ├── Hero.jsx            # Hero section root
│   │   ├── HeroName.jsx        # Name header with 3D Letter Swap
│   │   ├── HeroImage.jsx       # Editorial image presentation
│   │   └── HeroMeta.jsx        # Status tags & quick details
│   ├── about/                  # About & bio section
│   ├── capabilities/           # Tech stack & skills matrix
│   ├── projects/               # Project showcases & card items
│   ├── experience/             # Career timeline & experience
│   ├── achievements/           # Key achievements & highlights
│   ├── contact/                # Contact form & social channels
│   └── animations/             # Reusable interactive motion primitives
│       ├── RadialFlow.jsx      # Background radial center-flow effect
│       ├── LetterSwap.jsx      # 3D Letter Swap interactive effect
│       └── BlinkingSquares.jsx # Micro-interaction decorative grid
└── assets/                     # Images, icons, static resources
```

---

## 3. Page / Section Structure

The application renders a single scrollable page with the following section flow:

1. **Navbar**: Fixed header with logo, section jump links, and action button.
2. **Hero Section**: Statement header, 3D letter swap name, image showcase, meta information.
3. **About Section**: Editorial summary, technical philosophy, personal statement.
4. **Capabilities Section**: Technical skills, architecture capabilities, tools matrix.
5. **Projects Section**: Interactive project showcase cards with technical details.
6. **Experience Section**: Career timeline, key roles, impact metrics.
7. **Achievements Section**: Selected awards, publications, or key highlights.
8. **Contact Section**: Interactive reach-out interface and links.
9. **Footer**: Copyright, colophon, and bottom navigation.

---

## 4. Assets Organization

- Static assets reside in `public/` (favicons, manifest) and `src/assets/` (processed media, icons).
- Images formatted in WebP/SVG for optimal compression and clarity.
- Dynamic asset imports handled via standard Vite ES module imports.

---

## 5. Styling Approach

- **Tailwind CSS v4**: Utility-first CSS engine integrated directly via `@tailwindcss/vite`.
- **Design Tokens**: Color, typography, and spacing variables declared in `src/index.css`.
- **Responsive Layout**: Tailwind flexbox and CSS grid utilities (`grid-cols-1 md:grid-cols-12`).
- **No Heavy CSS Preprocessors**: Standard CSS features combined with Tailwind utility classes.

---

## 6. Animation & Effects Organization

- Motion components isolated inside `src/components/animations/`.
- GPU-accelerated transforms (`transform: translate3d / rotateX / scale`, `opacity`).
- Event listeners for cursor/scroll tracking throttled with `requestAnimationFrame`.
- Graceful fallbacks for reduced-motion preferences (`prefers-reduced-motion`).

---

## 7. Accessibility Considerations

- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Standard focus rings and keyboard focus management across all interactive controls.
- Explicit `aria-label` attributes on icon buttons and dynamic interactive elements.
- Accessible color contrast ratios (WCAG AA/AAA compliant).

---

## 8. Performance Considerations

- Code splitting via dynamic `import()` for non-critical section modules.
- Lazy-loading for below-the-fold project images using `loading="lazy"`.
- Minimal third-party dependency overhead to maintain sub-100KB initial JS bundle size goal.
