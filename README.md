# OperinLabs — Website Redesign

Next-generation autonomous AI healthcare workforce platform.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.8-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-teal?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-v14-black?style=flat-square&logo=framer)](https://motion.dev/)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://operin-labs-seven.vercel.app/)

[Live Demo](https://operin-labs-seven.vercel.app/) • [Original Website](https://www.operinlabs.com/)

---

## Project Overview

OperinLabs builds autonomous digital workforce systems for hospitals and clinics across India. Its core products include an **AI Receptionist**, **AI Patient Care Coordinator**, **Clinical AI Scribe**, and **AI Claims Associate**, operating 24/7 across native regional Indian languages (Assamese, Bengali, Hindi, and English) to automate front-desk operations, appointment scheduling, ambient clinical note generation, and insurance claims.

### Redesign Scope & Architecture

This project is an end-to-end frontend reconstruction of the public OperinLabs web platform:

- **Original Architecture**: A client-rendered Single-Page Application (SPA) built with Vite and React, using an off-white palette, static editorial typography, and basic text cards.
- **Redesigned Platform**: Re-engineered from scratch with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Tailwind CSS v4** into an obsidian dark-mode interface (`#0F0F11` / `#03050a`) featuring scroll-scrubbed storytelling, HTML5 Canvas 2D audio visualizations, 3D mathematical orbital carousels, and custom animated SVG cutout cards.

> **Note**: This project is an independent frontend engineering showcase and redesign concept. For the official commercial platform, visit [operinlabs.com](https://www.operinlabs.com/).

---

## Key Features & Engineering Highlights

### 1. Scroll-Scrubbed Story Hero
- **Pinned Viewport Track**: A 4.8-viewport-height (`480vh`) sticky container that coordinates a four-beat clinical emergency narrative (*Guwahati Clinic · 2:07 AM*).
- **HTML5 Canvas 2D Audio Simulation**:
  - *Unanswered Call*: Parametric concentric ripples with pulsing alpha gradients in muted grey (`rgba(128,136,152)`), simulating an unanswered telephone ringing at 2:07 AM.
  - *Answered Call*: Seamlessly transitions into a 47-bar active audio equalizer modulated by dual sine equations (`Math.sin(t * 3.1 + i * 0.45)`), accompanied by an active call duration chip.
- **Spring Physics**: Uses Framer Motion's `useSpring` (`stiffness: 90, damping: 24, mass: 0.6`) to ensure smooth scrubbing across stepped mouse wheels, with device pixel ratio scaling capped at 2 for consistent 60fps performance on Retina displays.

### 2. Vernacular Language Engine
- **Native Phonetics Demonstration**: Showcases multilingual operational readiness across four Indian languages: **Assamese** (`নমস্কাৰ`), **Bengali** (`নমস্কার`), **Hindi** (`नमस्ते`), and **English** (`Hello`).
- **Text Blur Morphing**: Automated 3,200ms interval cycling powered by `AnimatePresence` with entrance/exit Gaussian blur (`filter: blur(10px)`) and directional translation.
- **Interactive Call Transcripts**: Hovering pauses rotation; clicking individual language pills instantly switches native patient utterances and automated receptionist confirmations.

### 3. Autonomous Workforce Grid
- **Organic Cutout Cards**: Four symmetrical role cards with custom bottom-right organic silhouette cutouts.
- **Animated SVG Morphing Paths**: Hover and focus trigger `<motion.path>` transitions between idle and hover states with spring bounce physics.
- **Vector Strokes & Drop Shadows**: Uses `vectorEffect="non-scaling-stroke"` to keep a crisp 1px border alongside CSS `filter: drop-shadow()` tracing the exact curved alpha cutout.
- **Accessibility**: Full keyboard navigation (`tabIndex={0}`, `role="article"`), visible focus rings, and `useReducedMotion` support.

### 4. 3D Trigonometric Elliptical Carousel
- **Parametric Elliptical Projection**: Replaces third-party carousel libraries with pure trigonometric projection math (`getItemPosition`), calculating 3D elliptical coordinates `(x, y, scale, opacity, zIndex)`.
- **Adaptive Breakpoint Radii**: Dynamically adjusts horizontal and vertical radii (`rx` 80px–180px, `ry` 10px–18px) via resize listeners.
- **Keyboard & Touch Navigation**: Arrow key controls (`ArrowLeft` / `ArrowRight`), auto-play with hover pause, next/previous buttons, and animated pill pagination.

### 5. Direction-Aware Navigation Header
- **Velocity-Based Auto-Hide**: Detects scroll direction via `useMotionValueEvent(scrollY)`. Scrolling down past 80px slides the header out of view (`y: "-100%"`), while scrolling up 8px immediately restores it (`y: "0%"`).
- **Original Site Indicator**: Glassmorphic pill badge linking to the official live website.
- **Mobile Navigation Drawer**: Responsive slide-down menu with backdrop blur and keyboard `Escape` dismiss listener.

### 6. Mouse-Tracking SVG Radial Mask Footer
- **Vector Text Hover Light**: An SVG `<mask id="textMask">` linked to a `<motion.radialGradient>` whose focal coordinates `(cx, cy)` track real-time mouse coordinates relative to the SVG bounding box (`getBoundingClientRect()`).
- **Flashlight Reveal Effect**: Hovering sweeps a multi-stop vibrant linear gradient through the OperinLabs brandmark with zero raster asset overhead.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Runtime** | Next.js 16.3.8 (App Router), React 19.2.8, TypeScript 5, Node.js |
| **Styling & Design System** | Tailwind CSS v4 (`@theme` variables), PostCSS, clsx, tailwind-merge |
| **UI Components & Primitives** | Radix UI (`@radix-ui/react-slot`), class-variance-authority (CVA), Lucide React |
| **Motion & Graphics** | Framer Motion 14, HTML5 Canvas 2D API, Dynamic SVG Masks & Keyframes |
| **Typography & Fonts** | `next/font` preloading Vercel Geist & Geist Mono (zero CLS) |
| **Deployment & Build** | Vercel (Turbopack Static Prerendering), ESLint 9 |

---

## Project Structure

```
OperinLabs/
├── public/
│   └── assets/
│       ├── logo-light.png                     # Transparent light brand logo
│       ├── logo.png                           # Primary icon
│       └── operinlabs-logo.png                # Full brandmark
├── src/
│   ├── app/
│   │   ├── globals.css                        # Tailwind v4 @theme, custom keyframes & base resets
│   │   ├── layout.tsx                         # Root HTML shell, Geist fonts & metadata
│   │   └── page.tsx                           # Page orchestrator assembling the 6 live sections
│   ├── components/
│   │   ├── footer.tsx                         # Multi-column footer & SVG dynamic mask hover effect
│   │   ├── navbar.tsx                         # Direction-aware floating glass navigation header
│   │   ├── hero/
│   │   │   └── glowy-waves-canvas.tsx         # Trigonometric 4-layer Canvas wave engine
│   │   ├── story/
│   │   │   ├── language-section.tsx           # Auto-cycling 4-language phonetics showcase
│   │   │   └── story-hero.tsx                 # 480vh scroll-scrubbed hero with audio canvas
│   │   ├── thesis/
│   │   │   ├── thesis-section.tsx             # Active thesis section wrapper
│   │   │   └── thesis-story-section.tsx       # Clinical triage architecture console
│   │   ├── ui/
│   │   │   ├── button.tsx                     # Atomic Radix/CVA button primitive
│   │   │   ├── circular-carousel.tsx          # 3D trigonometric card carousel
│   │   │   ├── flicker-lamp.tsx               # 10-step fluorescent ignition animation engine
│   │   │   └── organic-card-small.tsx         # Morphing SVG cutout silhouette card
│   │   └── workforce/
│   │       ├── clinic-floor-section.tsx       # 4-stage hospital workflow simulator
│   │       ├── orbital-stage.tsx              # Standalone SVG orbit, ticks, and comet geometry
│   │       ├── receptionist-simulator.tsx     # Simulated WhatsApp chat & voice timer state machine
│   │       ├── role-card.tsx                  # Unboxed role card component
│   │       └── workforce-section.tsx          # Active 4-card workforce grid section
│   ├── data/
│   │   └── workforce-data.ts                  # Centralized clinical roles data source
│   ├── lib/
│   │   └── utils.ts                           # Tailwind class merging utility (cn)
│   └── types/
│       └── workforce.ts                       # TypeScript interfaces for workforce nodes and tabs
├── package.json
└── tsconfig.json
```

---

## Technical Metrics

- **Code Volume**: 4,634 lines of source code across 25 TypeScript and CSS files in `src/`.
- **Type Safety**: 0 TypeScript compilation errors (`npx tsc --noEmit`).
- **Static Prerendering**: 100% static prerendered HTML (`/`) compiling in under 600 ms via Turbopack.
- **Component Architecture**: 14 modular components separating business logic, mathematical projection, and presentation.
- **Responsive Coverage**: 4 responsive breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

---

## License & Attribution

- **Engineering & Redesign Implementation**: [Shiwangi Upadhyay](https://github.com/shiwangi-upadhyay)
- **Original Brand & Intellectual Property**: [OperinLabs](https://www.operinlabs.com/)
- Released under the [MIT License](LICENSE) for educational and portfolio demonstration purposes.
