# Component Library Specification

## Overview

A minimal, purposeful component library for the DRSM portfolio. Every component is built with animations from the branding spec and follows the flat, flashy aesthetic.

---

## 1. Component Categories

| Category | Components |
|----------|------------|
| **Layout** | Container, Section, Grid, Spacer |
| **Typography** | Heading, Text, GradientText, Code |
| **Navigation** | Navbar, NavLink, MobileMenu, Footer |
| **Interactive** | MagneticButton, AnimatedLink, ThemeToggle, ScrollToTop |
| **Cards** | HoverCard, ProjectCard, ExperienceCard, SkillCard |
| **Feedback** | LoadingScreen, Skeleton, Toast |
| **Animation** | FadeIn, AnimatedText, StaggerContainer, PageTransition |
| **Media** | Image, Avatar, Icon |
| **Form** | Input, Textarea, ContactForm |

---

## 2. Layout Components

### Container

Constrains content width with responsive padding.

```tsx
interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}
```

| Size | Max Width |
|------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `full` | 100% |

### Section

Full-width section with vertical padding and optional background.

```tsx
interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "surface" | "gradient";
  padding?: "sm" | "md" | "lg";
}
```

| Padding | Value |
|---------|-------|
| `sm` | 48px / 3rem |
| `md` | 96px / 6rem |
| `lg` | 144px / 9rem |

### Grid

Responsive grid with auto-fit columns.

```tsx
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}
```

---

## 3. Typography Components

### Heading

Semantic heading with display font and optional gradient.

```tsx
interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "xl" | "lg" | "md" | "sm";
  gradient?: boolean;
  animate?: boolean;
  className?: string;
}
```

| Size | Font Size | Line Height |
|------|-----------|-------------|
| `display` | 72px | 1.0 |
| `xl` | 48px | 1.1 |
| `lg` | 36px | 1.2 |
| `md` | 24px | 1.3 |
| `sm` | 20px | 1.4 |

### Text

Body text with variants.

```tsx
interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span";
  size?: "lg" | "base" | "sm" | "xs";
  color?: "default" | "muted" | "accent";
  className?: string;
}
```

### Code

Inline or block code with syntax highlighting.

```tsx
interface CodeProps {
  children: string;
  inline?: boolean;
  language?: string;
  className?: string;
}
```

---

## 4. Navigation Components

### Navbar

Fixed top navigation with blur backdrop.

```tsx
interface NavbarProps {
  className?: string;
}
```

**Features:**
- Logo (DRSM) on left
- Nav links center or right
- Theme toggle
- Blur backdrop on scroll
- Mobile hamburger menu
- Hide on scroll down, show on scroll up

**Animation:**
- Fade in on load
- Background blur transitions on scroll
- Link hover underline slide

### NavLink

Navigation link with active state.

```tsx
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}
```

**States:**
- Default: `text-muted`
- Hover: `text-foreground` + underline slide
- Active: `text-accent`

### MobileMenu

Full-screen mobile navigation overlay.

```tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}
```

**Animation:**
- Clip-path reveal from hamburger position
- Staggered link reveal
- Backdrop blur

### Footer

Site footer with links and social icons.

```tsx
interface FooterProps {
  className?: string;
}
```

**Sections:**
- Logo + tagline
- Navigation links
- Social links (GitHub, LinkedIn, Twitter/X, Email)
- Copyright

---

## 5. Card Components

### ProjectCard

Showcase card for portfolio projects.

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
}
```

**Features:**
- Image with hover zoom
- Title + description
- Tech stack tags
- Link arrow
- Hover lift + glow

**Animation:**
- FadeIn on scroll
- Image scale on hover (1.05)
- Card lift (Y -8px) + border glow

### ExperienceCard

Timeline card for work experience.

```tsx
interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
  logo?: string;
}
```

**Layout:**
- Timeline dot on left
- Company logo (optional)
- Role + period
- Description
- Tech tags

### SkillCard

Skill or technology showcase.

```tsx
interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
}
```

**Features:**
- Icon
- Name
- Optional proficiency indicator
- Hover glow

---

## 6. Interactive Components

### MagneticButton ✓

Already implemented. Magnetic hover + glow.

### AnimatedLink ✓

Already implemented. Underline slide/fade.

### ThemeToggle ✓

Already implemented. Sun/moon with circular reveal.

### ScrollToTop

Floating button to scroll to top.

```tsx
interface ScrollToTopProps {
  threshold?: number; // Show after scrolling this many pixels
}
```

**Features:**
- Hidden at top
- Fade in after threshold
- Magnetic hover
- Smooth scroll to top

---

## 7. Feedback Components

### LoadingScreen ✓

Already implemented. DRSM letter reveal.

### Skeleton

Loading placeholder with shimmer.

```tsx
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}
```

**Animation:**
- Gradient shimmer sweep (left to right)
- Duration: 1.5s
- Infinite loop

### Toast

Notification toast for feedback.

```tsx
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}
```

**Animation:**
- Slide in from bottom right
- Auto-dismiss after duration
- Manual dismiss on click

---

## 8. Animation Components ✓

Already implemented:
- `FadeIn`
- `AnimatedText`
- `StaggerContainer`
- `StaggerItem`
- `PageTransition`

---

## 9. Media Components

### Image

Optimized image with loading state.

```tsx
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  hover?: "zoom" | "none";
}
```

**Features:**
- Next.js Image optimization
- Skeleton while loading
- Optional hover zoom
- Rounded corners

### Avatar

Profile image with fallback.

```tsx
interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string; // Initials
}
```

| Size | Dimensions |
|------|------------|
| `sm` | 32px |
| `md` | 48px |
| `lg` | 64px |
| `xl` | 96px |

### Icon

Icon wrapper with consistent sizing.

```tsx
interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Icon Set:** Lucide React (recommended) or custom SVGs.

---

## 10. Form Components

### Input

Text input with label and validation.

```tsx
interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "url";
  placeholder?: string;
  required?: boolean;
  error?: string;
}
```

**States:**
- Default: `border-border`
- Focus: `border-accent` + glow
- Error: `border-red-500`
- Disabled: `opacity-50`

**Animation:**
- Label float on focus
- Border glow pulse on focus

### Textarea

Multi-line input.

```tsx
interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
}
```

### ContactForm

Complete contact form with validation.

```tsx
interface ContactFormProps {
  onSubmit: (data: ContactData) => Promise<void>;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}
```

**Features:**
- Name, email, message fields
- Client-side validation
- Loading state on submit
- Success/error toast
- Honeypot spam protection

---

## 11. Page Sections

Pre-composed sections for the portfolio:

### HeroSection

Landing hero with name, title, and CTA.

```tsx
interface HeroSectionProps {
  name: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
}
```

### AboutSection

Bio with avatar and skills.

### ProjectsSection

Grid of ProjectCards.

### ExperienceSection

Timeline of ExperienceCards.

### ContactSection

Contact form with social links.

---

## 12. Component Anatomy

### File Structure

```
components/common/Button/
  button.tsx           # Component implementation
  button.test.tsx      # Unit tests
  index.ts             # Barrel: export { Button } from './button'
```

### Component Template

```tsx
"use client"; // Only if needed

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  // ...
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={/* variants */}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
```

---

## 13. Implementation Priority

| Phase | Components |
|-------|------------|
| **Phase 1** | Container, Section, Heading, Text, Navbar, Footer |
| **Phase 2** | ProjectCard, ExperienceCard, SkillCard, Image |
| **Phase 3** | Input, Textarea, ContactForm, Toast |
| **Phase 4** | MobileMenu, ScrollToTop, Skeleton |

---

## 14. Existing Components

Already implemented in `/components/custom/`:

| Component | Status |
|-----------|--------|
| CustomCursor | ✓ |
| LenisProvider | ✓ |
| LoadingScreen | ✓ |
| ThemeToggle | ✓ |
| MagneticButton | ✓ |
| HoverCard | ✓ |
| AnimatedLink | ✓ |
| AnimatedText | ✓ |
| FadeIn | ✓ |
| StaggerContainer | ✓ |
| StaggerItem | ✓ |
| PageTransition | ✓ |

---

## 15. Dependencies

| Package | Purpose |
|---------|---------|
| `lucide-react` | Icon library |
| `clsx` | Conditional classnames |
| `tailwind-merge` | Merge Tailwind classes |

---

## 16. Utilities

### cn()

Utility for merging classnames:

```tsx
// utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
