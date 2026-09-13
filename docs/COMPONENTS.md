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
- **Description**: Root component for the hero section combining asymmetrical 12-column editorial grid, 3D Letter Swap name, editorial portrait frame, technical metadata, and clean dark canvas background.
- **Status**: **IMPLEMENTED (Phase 3.1 & Phase 3.2)**

### `HeroName`
- **Location**: `src/components/sections/hero/HeroName.jsx`
- **Description**: Prominent name display (`SARVANI VADAVALLI`) in `Space Grotesk` display typography, featuring 3D Letter Swap interaction on hover/focus.
- **Status**: **IMPLEMENTED (Phase 3.1)**

### `HeroImage`
- **Location**: `src/components/sections/hero/HeroImage.jsx`
- **Description**: Editorial portrait container displaying the owner's portrait (`src/assets/1.jpeg`) with monochrome filter art-direction, techno-brutalist border framing, metadata overlays, and subtle parallax pointer response.
- **Status**: **IMPLEMENTED (Phase 3.1 & Phase 3.2)**

### `HeroMeta`
- **Location**: `src/components/sections/hero/HeroMeta.jsx`
- **Description**: Technical metadata badges displaying availability status ("AVAILABLE FOR PROJECTS"), location ("INDIA // REMOTE"), and specialization tags (`AI / ML`, `COMPUTER VISION`, `FULL STACK`, `CSE / AIML`).
- **Status**: **IMPLEMENTED (Phase 3.1)**

---

## 3. About Component

### `AboutSection`
- **Location**: `src/components/about/AboutSection.jsx`
- **Description**: Narrative overview detailing Sarvani's background, technical philosophy, engineering mindset, and personal approach.
- **Status**: PLANNED (Phase 6)

---

## 4. Capabilities Component

### `CapabilitiesSection`
- **Location**: `src/components/capabilities/CapabilitiesSection.jsx`
- **Description**: Structured skill matrix displaying core engineering competencies, frameworks, tools, and technical specialties.
- **Status**: PLANNED (Phase 6)

---

## 5. Projects Components

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

## 6. Experience Component

### `ExperienceSection`
- **Location**: `src/components/experience/ExperienceSection.jsx`
- **Description**: Timeline component presenting professional experience, career milestones, roles, and key achievements.
- **Status**: PLANNED (Phase 6)

---

## 7. Achievements Component

### `AchievementsSection`
- **Location**: `src/components/achievements/AchievementsSection.jsx`
- **Description**: High-contrast grid highlighting notable recognitions, key metrics, certifications, and technical accomplishments.
- **Status**: PLANNED (Phase 6)

---

## 8. Contact Component

### `ContactSection`
- **Location**: `src/components/contact/ContactSection.jsx`
- **Description**: Direct contact interface featuring email contact button, social links (GitHub, LinkedIn, Twitter/X), and availability status.
- **Status**: PLANNED (Phase 7)

---

## 9. Animation & Interaction Components

### `RadialFlow`
- **Location**: `src/components/animations/RadialFlow.jsx`
- **Description**: Secondary/transition Canvas background effect rendering radial center-flow gradient and particle directional ticks.
- **Status**: PLANNED SECONDARY TRANSITION EFFECT

### `LetterSwap`
- **Location**: `src/components/sections/hero/HeroName.jsx`
- **Description**: 3D letter swapping text effect primitive for interactive headings.
- **Status**: **IMPLEMENTED (Phase 3.1)**

### `BlinkingSquares`
- **Location**: `src/components/animations/BlinkingSquares.jsx`
- **Description**: Controlled grid micro-interaction displaying subtle flickering ambient square nodes in section margins.
- **Status**: PLANNED (Phase 7)
