# Diego Sanchez - Personal Website

Portfolio and hiring magnet for a Senior Frontend Engineer. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

**Live**: https://drsm.vercel.app/

## Commands

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `pnpm install`    | Install dependencies                      |
| `pnpm dev`        | Start development server (localhost:3000) |
| `pnpm build`      | Production build (SSG)                    |
| `pnpm start`      | Serve production build locally            |
| `pnpm lint`       | Run ESLint                                |
| `pnpm test`       | Run Jest unit tests                       |
| `pnpm test:watch` | Run tests in watch mode                   |

## Architecture

```
app/
  [lang]/                # i18n: en, es
    layout.tsx           # Root layout with locale
    page.tsx             # Home page
    dictionaries/        # Translation JSON files
      en.json
      es.json
    dictionaries.ts      # getDictionary helper
components/
  common/                # Reusable primitives (Button, Input, Card, etc.)
  custom/                # Feature-specific components (Hero, ProjectCard, etc.)
  index.ts               # Barrel file
hooks/
  index.ts               # Barrel file
utils/
  index.ts               # Barrel file
contexts/
  index.ts               # Barrel file
lib/
  shadcn/                # shadcn/ui components (if ejected)
public/
  locales/               # Static assets per locale if needed
```

### Component Folder Structure

Each component lives in its own folder:

```
components/common/Button/
  button.tsx             # Component implementation
  button.test.tsx        # Unit tests
  index.ts               # Barrel: export { Button } from './button'
```

## Code Style

### Naming

| Entity     | Convention                          | Example                                        |
| ---------- | ----------------------------------- | ---------------------------------------------- |
| Files      | kebab-case                          | `use-translation.ts`, `project-card.tsx`       |
| Components | PascalCase                          | `ProjectCard`, `Button`                        |
| Hooks      | PascalCase                          | `UseTranslation`, exported as `useTranslation` |
| Utils      | PascalCase                          | `FormatDate`, exported as `formatDate`         |
| Interfaces | PascalCase with `I` prefix optional | `ButtonProps`, `IProjectData`                  |

### TypeScript

- **No `any`** — use `unknown` + type guards when type is truly unknown
- **Prefer `interface`** over `type` unless it's a one-liner union/primitive
- **Extracted types** — always extract props to named interfaces
- **Strict mode** — already enabled, maintain it

```tsx
// ✅ Correct
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

// ✅ One-liner type is acceptable
type Variant = "primary" | "secondary";

// ❌ Avoid
function Button({ variant }: { variant: string }) {}
```

### Exports

- **Components**: default export + barrel file re-export
- **Utils/Hooks**: named exports + barrel file
- **Always use barrel files** (`index.ts`) for clean imports

```tsx
// components/common/Button/button.tsx
export default function Button() {}

// components/common/Button/index.ts
export { default as Button } from "./button";

// components/index.ts
export * from "./common/Button";
```

### Import Order

1. React/Next.js
2. Third-party libraries
3. Internal aliases (`@/components`, `@/hooks`, etc.)
4. Relative imports
5. Types (with `type` keyword)

```tsx
import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import { Button } from "@/components";
import { useTranslation } from "@/hooks";

import { formatDate } from "./utils";

import type { ProjectProps } from "./types";
```

### Tailwind

- Use Tailwind utilities directly — avoid `@apply` unless creating base component styles
- Extract to component when class list exceeds ~8-10 utilities
- Use CSS variables via Tailwind's theme for design tokens
- Follow shadcn/ui patterns for component styling

## React Patterns

### Server vs Client Components

- **Default to Server Components** — no directive needed
- **Use `'use client'`** only when required (hooks, event handlers, browser APIs)
- Keep client boundaries as low as possible in the component tree

### Composition Patterns (Priority Order)

1. **Compound Components** — for related component groups

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

2. **Slots / Children as Props** — for flexible layouts

```tsx
<Section header={<Title />} footer={<CTA />}>
  {content}
</Section>
```

3. **Render Props** — when child needs parent state

```tsx
<Toggle>{({ isOn, toggle }) => <Button onClick={toggle}>{isOn ? "On" : "Off"}</Button>}</Toggle>
```

4. **Prop Drilling** — last resort, for 1-2 levels max

### forwardRef

Always use `forwardRef` for reusable components:

```tsx
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, ...props }, ref) => {
    return (
      <button ref={ref} className={variants[variant]} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
```

## Animation

### Libraries (in order of preference)

1. **View Transitions API** — for page transitions
2. **Framer Motion** — for component animations and gestures
3. **GSAP** — for complex timeline animations and scroll-driven effects

### Rules

- **No handmade CSS animations** — use the libraries above
- Prefer `motion` components over manual animation code
- Use `AnimatePresence` for exit animations
- Keep animations performant: transform and opacity only when possible

## i18n

### Structure

```
app/[lang]/
  dictionaries/
    en.json
    es.json
  dictionaries.ts
```

### Usage (Server Components)

```tsx
// app/[lang]/dictionaries.ts
import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
```

```tsx
// app/[lang]/page.tsx
export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return <h1>{dict.hero.title}</h1>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
```

### Dictionary Structure

```json
{
  "hero": {
    "title": "Diego Sanchez",
    "subtitle": "Senior Frontend Engineer"
  },
  "nav": {
    "about": "About",
    "projects": "Projects",
    "contact": "Contact"
  }
}
```

## Testing

- **Framework**: Jest + React Testing Library
- **Scope**: Unit tests only
- **Location**: Colocated with component (`button.test.tsx`)
- **ALWAYS write unit tests** for every component you create or modify

```tsx
// components/common/Button/button.test.tsx
import { render, screen } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Deployment

- **Platform**: Vercel
- **Strategy**: Static Site Generation (SSG)
- **Branch**: `main` auto-deploys to production

### CI/CD (GitHub Actions)

Before merge:

1. `pnpm lint` — ESLint passes
2. `pnpm build` — Build succeeds
3. `pnpm test` — All tests pass

## Environment

Copy `.env.example` to `.env.local` for local development.

```bash
cp .env.example .env.local
```

## Git Workflow

- **Strategy**: Git Flow
- **Main branch**: `main`
- **Development branch**: `dev`
- **NEVER commit directly to `main` or `dev`** — always use feature or fix branches
- **Feature branches**: `feature/branch-name` (for new features)
- **Fix branches**: `fix/branch-name` (for bug fixes)
- **Merge strategy**: Squash merge via PR
- **Commits**: Conventional commits
- **No AI attribution** — never add co-authors, AI mentions, or "generated by" notes in commits, PRs, code, or comments

```
feat: add hero section with animations
fix: correct button hover state
chore: update dependencies
```

## Gotchas

- **Never add dependencies without asking** — discuss first
- **No comments unless absolutely necessary** — code should be self-explanatory
- **No "Open to Work" messaging** — this is a professional portfolio, not a job board
- **Client components are expensive** — always justify `'use client'`
- **i18n keys must exist in both locales** — build will fail otherwise
- **Images**: Use `next/image` only, no external optimization services

## Design System

**IMPORTANT**: Always use the `drsm-design-system` skill when building UI components. Full documentation at `.claude/skills/drsm-design-system/SKILL.md`.

### Shape Language (Core Principle)

**NO ROUNDED CORNERS on UI components.** Circles are allowed for decorative floating shapes only.

| Element                   | Implementation                         |
| ------------------------- | -------------------------------------- |
| Decorative shapes         | Squares, circles, triangles (floating) |
| Brand highlight (SANCHEZ) | Sharp rectangle, no border-radius      |
| Custom cursor             | Square + diamond (rotated square)      |
| Bullet points             | Tiny rotated squares                   |
| Buttons                   | Sharp edges, no border-radius          |
| Cards/containers          | Sharp edges, no border-radius          |
| Tags/pills                | Sharp edges, no border-radius          |
| Form inputs               | Sharp edges, no border-radius          |

**Rule**: Sharp UI + geometric variety = Bold brand identity without being too boxy.

**NEVER use**: `rounded-*` classes on UI components (buttons, cards, inputs, tags)

### Color Palette

- **Primary**: `#8B5CF6` (purple) — buttons, highlights, accent
- **Secondary** (decorative only): `#06B6D4` (cyan), `#EC4899` (pink), `#F59E0B` (amber), `#10B981` (green)

### Layout Standard

All sections must use a max-width container:

```tsx
<div className="mx-auto w-full max-w-7xl px-6">
```

### Animation

- **Framer Motion only** — no CSS `@keyframes`
- **Easing**: `[0.22, 1, 0.36, 1]`
- **Springs**: `{ stiffness: 150, damping: 15 }`

### Key Components

- `Section` — wrapper with container, padding, background options
- `MagneticButton` — primary button with magnetic hover effect
- Grid background + floating geometric shapes for visual interest

## Dependencies Policy

**Approved**:

- framer-motion
- gsap
- shadcn/ui components (via CLI)
- @formatjs/intl-localematcher (i18n)
- negotiator (i18n)

**Ask before adding**: Any new dependency

## Performance Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Use Server Components by default
- Lazy load below-fold content
- Optimize images with next/image

## Responsive Design

### Mobile-First Approach (Required)

Always write mobile styles first, then enhance for larger screens:

```tsx
// ✅ Correct - Mobile first
<div className="p-4 md:p-6 lg:p-8">
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// ❌ Incorrect - Desktop first
<div className="p-8 sm:p-4">
```

### Breakpoints

| Breakpoint | Size     | Target Device     | Container Max |
| ---------- | -------- | ----------------- | ------------- |
| Default    | < 640px  | Mobile phones     | 100%          |
| `sm`       | ≥ 640px  | Large phones      | 640px         |
| `md`       | ≥ 768px  | Tablets portrait  | 768px         |
| `lg`       | ≥ 1024px | Tablets landscape | 1024px        |
| `xl`       | ≥ 1280px | Desktops          | 1280px        |
| `2xl`      | ≥ 1536px | Large desktops    | 1536px        |

### Responsive Patterns

**Typography Scale:**

```tsx
// Headings
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
<h2 className="text-2xl md:text-3xl lg:text-4xl">
<h3 className="text-xl md:text-2xl">

// Body
<p className="text-sm md:text-base">
```

**Spacing Scale:**

```tsx
// Section padding
<section className="py-16 md:py-24 lg:py-32">

// Container padding
<div className="px-4 sm:px-6 lg:px-8">

// Component spacing
<div className="space-y-4 md:space-y-6 lg:space-y-8">
```

**Layout Shifts:**

```tsx
// Stack → Row
<div className="flex flex-col md:flex-row">

// Grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Sidebar layouts (hide on mobile)
<aside className="hidden lg:block lg:w-1/3">
```

### Touch Targets

- **Minimum size**: 44×44px for all interactive elements
- **Spacing**: 8px minimum between touch targets
- Use `p-3` or larger for buttons/links on mobile

### Motion on Mobile

- Reduce or disable parallax effects on mobile (performance)
- Hide mouse-reactive elements on touch devices
- Use simpler animations for mobile
- Always respect `prefers-reduced-motion`

## Accessibility (WCAG 2.2 AA)

### Color Contrast

| Element       | Minimum Ratio | Check Tool           |
| ------------- | ------------- | -------------------- |
| Normal text   | 4.5:1         | WebAIM Contrast      |
| Large text    | 3:1           | (≥18pt or 14pt bold) |
| UI components | 3:1           | Icons, borders       |

### Focus States

All interactive elements must have visible focus:

```tsx
// Standard focus ring
className =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

// For dark backgrounds
className = "focus-visible:ring-white focus-visible:ring-offset-background";
```

### Semantic HTML

```tsx
// ✅ Use semantic elements
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

// ✅ Heading hierarchy (never skip levels)
<h1> → <h2> → <h3>

// ✅ Lists for navigation
<nav aria-label="Main">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

### ARIA Labels

```tsx
// Decorative elements
<div aria-hidden="true">

// Icon buttons
<button aria-label="Close menu">
  <XIcon />
</button>

// Sections
<section aria-labelledby="experience-heading">
  <h2 id="experience-heading">Experience</h2>
</section>

// Live regions (for dynamic content)
<div aria-live="polite" aria-atomic="true">
```

### Reduced Motion

Always provide alternatives for users who prefer reduced motion:

```tsx
// CSS approach
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

// Framer Motion approach
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={{ opacity: 1, y: shouldReduceMotion ? 0 : 20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    />
  );
}
```

### Keyboard Navigation

- All interactive elements must be reachable via Tab
- Logical tab order (visual order matches DOM order)
- Escape closes modals/overlays
- Arrow keys for complex widgets (tabs, menus)

### Accessibility Checklist

Before shipping any component:

- [ ] Color contrast passes WCAG AA (4.5:1 text, 3:1 UI)
- [ ] All images have alt text (or aria-hidden if decorative)
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works completely
- [ ] Screen reader announces content correctly
- [ ] `prefers-reduced-motion` is respected
- [ ] Touch targets are ≥44×44px on mobile
- [ ] Heading hierarchy is sequential (h1→h2→h3)
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
