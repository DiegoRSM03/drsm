# Diego Sanchez - Personal Website

Portfolio and hiring magnet for a Senior Frontend Engineer. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

**Live**: https://drsm.vercel.app/

## Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Production build (SSG) |
| `pnpm start` | Serve production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Jest unit tests |
| `pnpm test:watch` | Run tests in watch mode |

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

| Entity | Convention | Example |
|--------|------------|---------|
| Files | kebab-case | `use-translation.ts`, `project-card.tsx` |
| Components | PascalCase | `ProjectCard`, `Button` |
| Hooks | PascalCase | `UseTranslation`, exported as `useTranslation` |
| Utils | PascalCase | `FormatDate`, exported as `formatDate` |
| Interfaces | PascalCase with `I` prefix optional | `ButtonProps`, `IProjectData` |

### TypeScript

- **No `any`** — use `unknown` + type guards when type is truly unknown
- **Prefer `interface`** over `type` unless it's a one-liner union/primitive
- **Extracted types** — always extract props to named interfaces
- **Strict mode** — already enabled, maintain it

```tsx
// ✅ Correct
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

// ✅ One-liner type is acceptable
type Variant = 'primary' | 'secondary';

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
export { default as Button } from './button';

// components/index.ts
export * from './common/Button';
```

### Import Order

1. React/Next.js
2. Third-party libraries
3. Internal aliases (`@/components`, `@/hooks`, etc.)
4. Relative imports
5. Types (with `type` keyword)

```tsx
import { useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from '@/components';
import { useTranslation } from '@/hooks';

import { formatDate } from './utils';

import type { ProjectProps } from './types';
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
<Toggle>
  {({ isOn, toggle }) => <Button onClick={toggle}>{isOn ? 'On' : 'Off'}</Button>}
</Toggle>
```

4. **Prop Drilling** — last resort, for 1-2 levels max

### forwardRef

Always use `forwardRef` for reusable components:

```tsx
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    return (
      <button ref={ref} className={variants[variant]} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
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
import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

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

- **Framework**: Jest
- **Scope**: Unit tests only
- **Location**: Colocated with component (`button.test.tsx`)

```tsx
// components/common/Button/button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
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
- **Feature branches**: `feature/branch-name`
- **Merge strategy**: Squash merge
- **Commits**: Conventional commits (no co-authors)

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

Built on **shadcn/ui** with customizations:

- Light/dark mode via CSS variables + `dark:` classes
- Theme toggle component required
- Follow shadcn patterns for new components
- Typography: TBD (to be discussed)

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
