# Component Inventory & Specification

This document lists all planned component modules for the **Sarvani Portfolio**. These are planning entries that outline expected component responsibilities, props, and status.

> [!NOTE]
> All entries listed below are planning specifications for future phases. Components will be implemented sequentially according to `docs/PROGRESS.md`.

---

## 1. Layout Components

### `Navbar`
- **Location**: `src/components/layout/Navbar.jsx`
- **Description**: Top header navigation containing brand logo, section navigation links, and contact CTA.
- **Key Responsibilities**: Sticky position, mobile menu drawer toggle, scroll-active link highlighting.
- **Status**: PLANNED (Phase 2)

### `PageContainer`
- **Location**: `src/components/layout/PageContainer.jsx`
- **Description**: Root page wrapper providing global max-width constraints, outer gutters, and grid alignment lines.
- **Status**: PLANNED (Phase 2)

### `Section`
- **Location**: `src/components/layout/Section.jsx`
- **Description**: Reusable semantic section container (`<section>`) with customizable padding, ID scroll anchors, and brutalist section header tags.
- **Props**: `id`, `title`, `subtitle`, `children`, `className`.
- **Status**: PLANNED (Phase 2)

### `Footer`
- **Location**: `src/components/layout/Footer.jsx`
- **Description**: Page footer containing copyright notice, colophon details, social media links, and scroll-to-top trigger.
- **Status**: PLANNED (Phase 2)

---

## 2. Hero Components

### `Hero`
- **Location**: `src/components/hero/Hero.jsx`
- **Description**: Root component for the hero section combining statement typography, interactive name, editorial image, and meta badges.
- **Status**: PLANNED (Phase 3)

### `HeroName`
- **Location**: `src/components/hero/HeroName.jsx`
- **Description**: Prominent name display (`SARVANI`) integrating the signature 3D Letter Swap effect on hover/focus.
- **Status**: PLANNED (Phase 3)

### `HeroImage`
- **Location**: `src/components/hero/HeroImage.jsx`
- **Description**: Editorial portrait/composition container featuring techno-brutalist border framing and metadata overlays.
- **Status**: PLANNED (Phase 3)

### `HeroMeta`
- **Location**: `src/components/hero/HeroMeta.jsx`
- **Description**: Metadata badges displaying current status (e.g., "AVAILABLE FOR PROJECTS"), location, and primary role title.
- **Status**: PLANNED (Phase 3)

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
- **Description**: Background Canvas/CSS component rendering radial center-flow gradient and particle transitions.
- **Status**: PLANNED (Phase 4)

### `LetterSwap`
- **Location**: `src/components/animations/LetterSwap.jsx`
- **Description**: Reusable 3D letter swapping text effect primitive for interactive headings.
- **Props**: `text`, `speed`, `trigger`.
- **Status**: PLANNED (Phase 3)

### `BlinkingSquares`
- **Location**: `src/components/animations/BlinkingSquares.jsx`
- **Description**: Controlled grid micro-interaction displaying subtle flickering ambient square nodes in section margins.
- **Status**: PLANNED (Phase 7)
