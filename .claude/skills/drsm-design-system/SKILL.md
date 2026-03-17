---
name: drsm-design-system
description: DRSM portfolio design system. Use this skill when building ANY UI component, section, or page for this project. Ensures visual consistency with established shape language, colors, typography, animations, and layout patterns.
metadata:
  version: 1.0.0
  project: drsm-portfolio
---

# DRSM Design System

Design system for Diego Sanchez's portfolio website. This skill ensures all UI components follow the established visual language: sharp UI components, geometric decorative shapes, purple accent palette, and premium animation patterns.

**IMPORTANT**: Always apply these guidelines when creating or modifying UI components in this project.

## Shape Language: The Core Principle

**NO ROUNDED CORNERS on UI components.** All interactive elements use sharp edges. However, circles ARE allowed as decorative floating shapes.

### Decorative Shapes (Geometric Variety)

| Element                   | Implementation                    | Purpose                |
| ------------------------- | --------------------------------- | ---------------------- |
| Floating squares          | `rotate-45` (diamond) or straight | Visual interest        |
| Floating circles          | `borderRadius: "50%"`             | Soft contrast, variety |
| Floating triangles        | CSS borders                       | Geometric decoration   |
| Brand highlight (SANCHEZ) | No border-radius                  | Bold statement         |
| Custom cursor             | Square + diamond                  | Distinctive, on-brand  |
| Bullet points             | Small rotated squares             | Accent detail          |

### UI Components (Sharp Edges Only)

| Element               | Implementation   | Purpose               |
| --------------------- | ---------------- | --------------------- |
| Buttons               | No border-radius | Bold, decisive        |
| Tech pills/tags       | No border-radius | Sharp, technical      |
| Cards/containers      | No border-radius | Clean boundaries      |
| Form inputs           | No border-radius | Geometric consistency |
| Duration badges       | No border-radius | Sharp data display    |
| Section number badges | No border-radius | Sharp geometric       |
| Navbar toggles        | No border-radius | Geometric controls    |

### The Psychology

- **Sharp UI components** = Bold, memorable, distinctive brand identity
- **Decorative circles** = Softness, prevents overly boxy feel
- **Mix of shapes** = Visual variety while maintaining sharp UI consistency

## Color Palette

### Primary Accent

```
#8B5CF6 (Purple) — var(--color-accent)
```

Used for: Primary buttons, highlights, brand elements, cursor, grid lines

### Secondary Colors (Decorative Only)

```
#06B6D4 (Cyan)    — Tech, freshness
#EC4899 (Pink)    — Energy, creativity
#F59E0B (Amber)   — Warmth, attention
#10B981 (Green)   — Growth, success
```

Used for: Floating shapes, tech tag borders, experience card accents

### Usage Rules

- Primary actions: Always purple (`bg-accent`)
- Decorative shapes: Rotate through secondary colors
- Text highlights: Purple background, white/dark text
- Borders on tags: Match the section's accent color
- Never use gradients on buttons (solid colors only)

## Typography

### Display Font

```tsx
style={{ fontFamily: "var(--font-display)" }}
```

Used for: All headings, brand text (DRSM, DIEGO, SANCHEZ), nav items

### Weights

- `font-black` — Main headings, brand text
- `font-bold` — Emphasis, subheadings
- `font-semibold` — Button text, labels
- `font-medium` — Body emphasis
- Default — Body text

### Heading Hierarchy

```tsx
// Hero name
className = "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black";

// Section titles
className = "text-2xl md:text-3xl font-black";

// Card titles
className = "text-xl md:text-2xl font-black";

// Subsections
className = "text-lg font-bold";
```

## Layout & Containers

### Standard Container

All sections must use a max-width container:

```tsx
<div className="mx-auto w-full max-w-7xl px-6">{/* Content */}</div>
```

### Using the Section Component

```tsx
import { Section } from "@/components/common/Section";

<Section
  container={true} // default: true
  maxWidth="7xl" // default: "7xl" (1280px)
  padding="md" // "none" | "sm" | "md" | "lg"
  background="default" // "default" | "surface" | "gradient"
>
  {/* Content automatically wrapped */}
</Section>;
```

### Spacing Standards

- Section padding: `py-24` (default), `py-12` (sm), `py-36` (lg)
- Horizontal padding: `px-6` (always)
- Card padding: `p-6` or `p-8`
- Gap between cards: `gap-6` or `gap-8`

## Animation Patterns

### Required Libraries

1. **Framer Motion** — All component animations
2. **GSAP** — Complex timelines only (ask before using)
3. **No CSS animations** — Never use `@keyframes`

### Standard Easing

```tsx
// Custom ease for all transitions
ease: [0.22, 1, 0.36, 1]

// Spring config for magnetic effects
{ stiffness: 150, damping: 15 }
```

### Common Patterns

**Fade In + Slide Up (content reveal):**

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

**Staggered Children:**

```tsx
transition={{ delay: index * 0.1 }}
```

**Scale on Hover:**

```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.98 }}
```

**SANCHEZ-style Highlight Reveal:**

```tsx
<span className="relative inline-block">
  <span className="relative z-10">{text}</span>
  <motion.span
    className="absolute -inset-x-4 -inset-y-1"
    style={{ backgroundColor: color, originX: 0 }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: isHovered ? 1 : 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  />
</span>
```

**Magnetic Button Effect:**

```tsx
const springX = useSpring(x, { stiffness: 150, damping: 15 });
const springY = useSpring(y, { stiffness: 150, damping: 15 });

// On mouse move, set x/y based on cursor offset from center
// Apply springX/springY to element's transform
```

## Decorative Elements

### Grid Background

```tsx
<svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

### Floating Shapes

```tsx
// Diamond (rotated square)
<motion.div
  className="absolute"
  style={{
    left: "10%",
    top: "20%",
    width: 50,
    height: 50,
    backgroundColor: "#8B5CF6",
    transform: "rotate(45deg)",
  }}
  animate={{ y: [0, -15, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
/>

// Square (no rotation)
style={{ width: 50, height: 50, backgroundColor: "#06B6D4" }}

// Circle (decorative only)
style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: "#10B981" }}

// Triangle (CSS borders)
style={{
  width: 0,
  height: 0,
  borderLeft: "25px solid transparent",
  borderRight: "25px solid transparent",
  borderBottom: "50px solid #F59E0B",
}}
```

### Cursor Follower Shapes

- 2 small squares trailing the cursor
- Positioned diagonally (top-left, bottom-right)
- Different spring stiffness for organic feel

## Component Patterns

### Cards

```tsx
<div className="border-border bg-background/80 border-2 p-8 backdrop-blur-sm">
  {/* Card content - NO rounded corners */}
</div>
```

### Tech Tags

```tsx
<span
  className="border px-3 py-1 text-xs font-medium"
  style={{ borderColor: accentColor, color: accentColor }}
>
  {tech}
</span>
```

### Duration Badges

```tsx
<span
  className="inline-block px-3 py-0.5 font-mono text-sm"
  style={{ backgroundColor: `${color}20`, color: color }}
>
  2.5+ yrs
</span>
```

### Buttons (MagneticButton)

```tsx
<MagneticButton variant="primary" size="lg">
  <Icon className="mr-2 h-5 w-5" />
  Button Text
</MagneticButton>

// Variants: "primary" | "secondary" | "ghost"
// Sizes: "sm" | "md" | "lg"
// All use sharp edges (no border-radius)
```

### Section Titles

```tsx
<div className="mb-4 flex items-center gap-4">
  <span
    className="flex h-10 w-10 items-center justify-center text-sm font-bold text-white"
    style={{ backgroundColor: "#8B5CF6" }}
  >
    {number}
  </span>
  <h2 className="text-foreground text-2xl font-black md:text-3xl">{title}</h2>
</div>
```

## Custom Cursor

The site uses a custom geometric cursor:

- **Dot**: Small square (no border-radius), purple fill
- **Ring**: Diamond shape (rotated 45°), purple border
- **Followers**: 2 small trailing squares on Hero

## Dark/Light Mode

- Default: Dark mode
- Toggle: ThemeToggle component in navbar
- CSS variables handle color switching
- All colors should use semantic tokens:
  - `bg-background`, `bg-surface`, `bg-elevated`
  - `text-foreground`, `text-muted`
  - `border-border`
  - `bg-accent`, `text-accent`

## Checklist for New Components

Before submitting any UI component, verify:

- [ ] Shape language: Sharp edges on UI components (no `rounded-*` classes)
- [ ] Decorative shapes: Can use squares, triangles, AND circles
- [ ] Colors: Using palette colors, not arbitrary values
- [ ] Container: Wrapped in max-w-7xl centered container
- [ ] Typography: Using font-display for headings, correct weights
- [ ] Animation: Framer Motion only, correct easing
- [ ] Spacing: Consistent padding/gaps (multiples of 4/6/8)
- [ ] Dark mode: Using semantic color tokens
- [ ] Hover states: Magnetic effect or scale transform
- [ ] Mobile: Responsive breakpoints considered

## Don'ts

- **Don't** use `rounded-*` classes on UI components (buttons, cards, inputs, tags)
- **Don't** use CSS `@keyframes` animations
- **Don't** use gradients on buttons
- **Don't** use arbitrary colors outside the palette
- **Don't** skip the container wrapper on sections
- **Don't** add new dependencies without asking
- **Don't** use glass morphism or blur effects on cards
- **Don't** use L-shaped corner brackets as decorative framing elements
- **Don't** use hollow/bordered boxes (thin stroke squares) as decorative elements — use solid fills instead
