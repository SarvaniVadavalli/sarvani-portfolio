# AGENTS.md — Project Development Guide

## 1. Project Purpose

This repository houses the personal portfolio website for **Sarvani**. The portfolio is designed as an interactive, techno-brutalist, editorial digital experience. It presents technical expertise, projects, career experience, and achievements through bold composition, precision typography, and intentional micro-interactions.

---

## 2. Mandatory Rules for Developers & AI Agents

> [!IMPORTANT]
> Every AI agent and developer working on this codebase **MUST** follow these mandatory check procedures:
> 
> 1. **Consult `docs/DESIGN-SYSTEM.md`** before implementing or modifying any visual components or styling.
> 2. **Consult `docs/DECISIONS.md`** before altering any established architectural, design, or visual decisions.
> 3. **Update `docs/PROGRESS.md`** immediately after completing any task or meaningful unit of work. Never claim a phase or task is finished unless it is verified in code.

---

## 3. Architecture Principles

- **Simplicity & Maintainability**: Keep the architecture straightforward and modular. Avoid unnecessary abstraction layers.
- **Component Isolation**: Components must be single-responsibility, reusable, and self-contained.
- **Minimal Dependencies**: Use core React and Tailwind CSS capabilities. Avoid pulling in third-party libraries without explicit justification.
- **No Premature Optimization or Design Inventions**: Do not invent unconfirmed colors, fonts, layouts, or animation parameters until documented in `docs/DESIGN-SYSTEM.md`.

---

## 4. Coding Conventions

- **Language**: JavaScript (JSX). Do not introduce TypeScript unless explicitly required and approved.
- **Component Style**: Functional React components with hooks.
- **Naming Conventions**:
  - Components: `PascalCase` (e.g., `HeroName.jsx`, `ProjectItem.jsx`).
  - Helper functions / Hooks: `camelCase` (e.g., `useScrollProgress.js`).
  - Constants & Enums: `UPPER_SNAKE_CASE`.
- **Props**: Use explicit prop destructuring and provide sensible defaults.
- **Code Cleanliness**: Remove dead code, console logs, and unused imports before committing.

---

## 5. Component Organization Rules

Place components in designated directories inside `src/components/`:

- `src/components/layout/`: Global structural wrappers (`Navbar.jsx`, `Footer.jsx`, `Section.jsx`, `PageContainer.jsx`).
- `src/components/hero/`: Hero section specific components (`Hero.jsx`, `HeroName.jsx`, `HeroImage.jsx`, `HeroMeta.jsx`).
- `src/components/about/`: About section components (`AboutSection.jsx`).
- `src/components/capabilities/`: Skills and tech matrix (`CapabilitiesSection.jsx`).
- `src/components/projects/`: Portfolio showcases (`ProjectsSection.jsx`, `ProjectItem.jsx`).
- `src/components/experience/`: Career trajectory components (`ExperienceSection.jsx`).
- `src/components/achievements/`: Key achievements and highlights (`AchievementsSection.jsx`).
- `src/components/contact/`: Interactive contact & footer (`ContactSection.jsx`).
- `src/components/animations/`: Isolated motion and background effects (`RadialFlow.jsx`, `LetterSwap.jsx`, `BlinkingSquares.jsx`).

Do not create duplicate or overlapping components.

---

## 6. Styling Rules

- **Framework**: Tailwind CSS v4.
- **Design Tokens**: Standardized CSS variables / Tailwind utility classes defined in `src/index.css`.
- **No Ad-hoc Inline Styles**: Inline styles are strictly prohibited unless computing dynamic values (e.g., transform coordinates, dynamic canvas dimensions).
- **Aesthetic Direction**: Techno-brutalist + editorial. High contrast, sharp grid structures, structured typography layout.

---

## 7. Accessibility Requirements (a11y)

- **Semantic Markup**: Use correct HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Contrast**: Maintain strict high contrast meeting WCAG AA standards (aiming for AAA).
- **Keyboard Navigation**: Ensure all interactive controls (links, buttons, interactive cards) are fully accessible via keyboard (`Tab`, `Enter`, `Space`) with visible focus outlines.
- **Screen Readers**: Provide `aria-label`, `aria-expanded`, and proper heading hierarchy (`h1` -> `h6`).
- **Media**: All images must include descriptive `alt` text.

---

## 8. Performance Requirements

- **Fast Load**: Target sub-second First Contentful Paint (FCP).
- **Layout Stability**: Zero Cumulative Layout Shift (CLS). Specify image dimensions and container aspect ratios.
- **Asset Optimization**: Use optimized web formats (WebP/AVIF) for graphics and SVGs for vector assets.
- **Execution Efficiency**: Avoid heavy re-renders. Memoize expensive operations where appropriate.

---

## 9. Responsive Design Requirements

- **Mobile First**: Standard screen breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).
- **Touch Targets**: Minimum interactive element size of 44x44px on mobile viewports.
- **Fluid Layouts**: Text and structural grids must adapt smoothly to arbitrary viewport widths without horizontal overflow.

---

## 10. Animation & Interaction Philosophy

- **Purposeful Motion**: Every animation must serve a clear function—directing attention, indicating hierarchy, or providing tactile feedback.
- **No Random Effects**: Avoid decorative visual clutter or distracting ambient animations.
- **Performance First**: Animate GPU-accelerated CSS properties only (`transform`, `opacity`).
- **Reduced Motion**: Respect user preferences via `@media (prefers-reduced-motion: reduce)`.

---

## 11. Dependency Management Rules

- **Minimalist Approach**: Rely on native browser APIs, CSS, and lightweight React hooks.
- **No Unnecessary Packages**: Do not add packages simply because they are popular.
- **Evaluation**: Any proposed dependency must be evaluated for bundle size impact, maintenance status, and security.

---

## 12. Change Management & Git Guidelines

- **Atomic Commits**: Commit logical units of work separately.
- **Descriptive Messages**: Use conventional commits format (e.g., `feat: setup foundation scaffolding`, `docs: create AGENTS.md`).
- **Verification Before Commit**: Run build (`npm run build`) before pushing changes.
