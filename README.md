# Sarvani Portfolio

An interactive, techno-brutalist personal portfolio website built with modern web technologies, showcasing technical expertise, projects, experience, and editorial design aesthetic.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: JavaScript (JSX)

## Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm

### How to Run Locally

1. Clone the repository and navigate to the project directory:
   ```bash
   cd "c:/my portfolio"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

## Project Structure

```
.
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── assets/             # Images, graphics, icons
│   ├── components/         # Modular React components
│   │   ├── layout/         # Layout components (Navbar, Footer, Section)
│   │   ├── hero/           # Hero section components
│   │   ├── about/          # About section components
│   │   ├── capabilities/   # Skills & capabilities components
│   │   ├── projects/       # Portfolio project showcase components
│   │   ├── experience/     # Career experience components
│   │   ├── achievements/   # Key achievements & highlights
│   │   ├── contact/        # Contact form and links
│   │   └── animations/     # Reusable interaction & background effect components
│   ├── App.jsx             # Root Application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global CSS & Tailwind imports
├── docs/                   # Complete project documentation
│   ├── PROGRESS.md         # Phase & task tracking
│   ├── DESIGN-SYSTEM.md    # Design system, direction & constraints
│   ├── DECISIONS.md       # Project decision log
│   ├── ARCHITECTURE.md     # System architecture overview
│   └── COMPONENTS.md       # Component inventory & specifications
├── AGENTS.md               # Developer & AI Agent guidelines
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite configuration
```

## Development Phases Overview

- **Phase 0**: Project Scaffolding & Documentation System (Current)
- **Phase 1**: Design System & Theme Foundations (Colors, Typography, Layout Grid)
- **Phase 2**: Core Application Architecture & Shell (Navbar, Layout, Section Containers)
- **Phase 3**: Hero Section & Signature Micro-Interactions (3D Letter Swap, Meta Info)
- **Phase 4**: Editorial Composition & Radial Flow Background (Center-flow radial transition)
- **Phase 5**: Projects Showcase Component System
- **Phase 6**: Capabilities, Experience & Achievements Sections
- **Phase 7**: Interactive Contact Section & Micro-details (Blinking Squares)
- **Phase 8**: Performance Optimization, Asset Delivery & Accessibility Audit
- **Phase 9**: End-to-End Responsive & Browser Verification
- **Phase 10**: Production Build, Final Quality Audit & Deployment

## Project Documentation

- [AGENTS.md](file:///c:/my%20portfolio/AGENTS.md) — Architectural guidelines, coding standards, and workflow rules.
- [docs/PROGRESS.md](file:///c:/my%20portfolio/docs/PROGRESS.md) — Real-time progress and phase completion status.
- [docs/DESIGN-SYSTEM.md](file:///c:/my%20portfolio/docs/DESIGN-SYSTEM.md) — Confirmed design direction, constraints, and aesthetic rules.
- [docs/DECISIONS.md](file:///c:/my%20portfolio/docs/DECISIONS.md) — Architectural and design decision log.
- [docs/ARCHITECTURE.md](file:///c:/my%20portfolio/docs/ARCHITECTURE.md) — Application structure, data flow, and styling strategy.
- [docs/COMPONENTS.md](file:///c:/my%20portfolio/docs/COMPONENTS.md) — Complete inventory of planned components.
