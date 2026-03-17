# Branding Specification

## Overview

Dark-first design with **Electric Violet** as the primary accent. Bold, techy, creative energy that stands out from typical developer portfolios. The brand feels alive, premium, and immersive while maintaining 60fps performance.

**Logo:** DRSM (Space Grotesk, 700 weight)

**Figma Reference:** [Color Palette Exploration](https://www.figma.com/design/qGfTEU9dg8VP580XARGJrN)

---

## 1. Color Palette

### Dark Mode (Default)

#### Base Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `background` | `#0A0A0A` | `10, 10, 10` | Page background |
| `surface` | `#111111` | `17, 17, 17` | Cards, sections |
| `elevated` | `#1A1A1A` | `26, 26, 26` | Hover states, modals |
| `border` | `#262626` | `38, 38, 38` | Subtle dividers |
| `border-strong` | `#404040` | `64, 64, 64` | Emphasized borders |
| `muted` | `#888888` | `136, 136, 136` | Secondary text, placeholders |
| `foreground` | `#FAFAFA` | `250, 250, 250` | Primary text |

### Light Mode

#### Base Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `background` | `#FAFAFA` | `250, 250, 250` | Page background |
| `surface` | `#FFFFFF` | `255, 255, 255` | Cards, sections |
| `elevated` | `#F5F5F5` | `245, 245, 245` | Hover states, modals |
| `border` | `#E5E5E5` | `229, 229, 229` | Subtle dividers |
| `border-strong` | `#D4D4D4` | `212, 212, 212` | Emphasized borders |
| `muted` | `#737373` | `115, 115, 115` | Secondary text, placeholders |
| `foreground` | `#0A0A0A` | `10, 10, 10` | Primary text |

### Accent Colors (Shared)

#### Electric Violet (Primary)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `accent` | `#8B5CF6` | `139, 92, 246` | CTAs, links, highlights |
| `accent-hover` | `#A78BFA` | `167, 139, 250` | Hover states (dark) |
| `accent-hover-light` | `#7C3AED` | `124, 58, 237` | Hover states (light) |
| `accent-muted` | `#C4B5FD` | `196, 181, 253` | Backgrounds, tags |
| `accent-subtle` | `#8B5CF620` | — | 12% opacity overlays |

#### Cyan Pop (Secondary)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `pop` | `#06B6D4` | `6, 182, 212` | Secondary highlights |
| `pop-hover` | `#22D3EE` | `34, 211, 238` | Hover states (dark) |
| `pop-hover-light` | `#0891B2` | `8, 145, 178` | Hover states (light) |
| `pop-muted` | `#67E8F9` | `103, 232, 249` | Subtle accents |

### State Colors

| State | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| Focus ring | `#8B5CF6` | `#8B5CF6` | Keyboard focus outline |
| Selection | `#8B5CF640` | `#8B5CF630` | Text selection background |
| Disabled | `#404040` | `#D4D4D4` | Disabled elements |

---

## 2. Gradients

| Name | Value | Usage |
|------|-------|-------|
| `gradient-accent` | `linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)` | Hero text, section titles |
| `gradient-glow` | `radial-gradient(circle at center, #8B5CF640 0%, transparent 70%)` | Background glows |
| `gradient-fade-dark` | `linear-gradient(180deg, #0A0A0A 0%, #111111 100%)` | Section transitions (dark) |
| `gradient-fade-light` | `linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)` | Section transitions (light) |

### Gradient Text Usage

| Element | Gradient | Notes |
|---------|----------|-------|
| Hero headline (display) | `gradient-accent` | Always gradient |
| Section titles (h2) | `gradient-accent` | Always gradient |
| Other headings | Solid `foreground` | No gradient |

---

## 3. Shadows

### Dark Mode

| Name | Value | Usage |
|------|-------|-------|
| `shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.4)` | Cards |
| `shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.5)` | Elevated elements |
| `shadow-lg` | `0 8px 32px rgba(0, 0, 0, 0.6)` | Modals, dropdowns |
| `shadow-glow` | `0 0 40px rgba(139, 92, 246, 0.3)` | Accent glow effects |

### Light Mode

| Name | Value | Usage |
|------|-------|-------|
| `shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.08)` | Cards |
| `shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.1)` | Elevated elements |
| `shadow-lg` | `0 8px 32px rgba(0, 0, 0, 0.12)` | Modals, dropdowns |
| `shadow-glow` | `0 0 40px rgba(139, 92, 246, 0.2)` | Accent glow effects |

---

## 4. Typography

### Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Logo** | Space Grotesk | 700 | system-ui, sans-serif |
| **Headlines** | Space Grotesk | 600, 700 | system-ui, sans-serif |
| **Body** | Inter | 400, 500, 600 | system-ui, sans-serif |
| **Code** | JetBrains Mono | 400, 500 | monospace |

### Type Scale

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `display` | 72px / 4.5rem | 1.0 | -0.03em | Hero headline |
| `h1` | 48px / 3rem | 1.1 | -0.02em | Page titles |
| `h2` | 36px / 2.25rem | 1.2 | -0.02em | Section titles |
| `h3` | 24px / 1.5rem | 1.3 | -0.01em | Subsections |
| `h4` | 20px / 1.25rem | 1.4 | -0.01em | Card titles |
| `body` | 16px / 1rem | 1.6 | 0 | Body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 0 | Secondary text |
| `caption` | 12px / 0.75rem | 1.4 | 0.02em | Labels, captions |
| `code` | 14px / 0.875rem | 1.5 | 0 | Code blocks |

### Responsive Scaling

| Breakpoint | Display | H1 | H2 | Body |
|------------|---------|-----|-----|------|
| Mobile (<640px) | 40px | 32px | 24px | 16px |
| Tablet (640-1024px) | 56px | 40px | 30px | 16px |
| Desktop (>1024px) | 72px | 48px | 36px | 16px |

### Typography Colors

| Context | Dark Mode | Light Mode |
|---------|-----------|------------|
| Headings | `#FAFAFA` | `#0A0A0A` |
| Body text | `#FAFAFA` | `#0A0A0A` |
| Secondary text | `#888888` | `#737373` |
| Links | `#8B5CF6` | `#8B5CF6` |
| Links (hover) | `#A78BFA` | `#7C3AED` |
| Code | `#06B6D4` | `#0891B2` |

---

## 5. Theme Transition

A signature animation when switching between dark and light modes.

### Transition Effect: Circular Reveal

The theme change originates from the toggle button position and expands as a circular clip-path.

```tsx
// Theme transition animation
{
  type: "circularReveal",
  origin: "toggle", // Expands from theme toggle button position
  duration: 600,
  easing: [0.22, 1, 0.36, 1], // easeOutExpo
}
```

### Implementation

1. Capture current screen state
2. Apply new theme to DOM
3. Overlay captured state with `clip-path: circle()`
4. Animate clip-path from `circle(0px at X Y)` to `circle(150% at X Y)`
5. Remove overlay

### Fallback (Reduced Motion)

Instant theme switch with no animation.

---

## 6. Animation System

### Tech Stack

| Library | Purpose | Priority |
|---------|---------|----------|
| **Lenis** | Smooth scroll, scroll velocity | Core |
| **Framer Motion** | Component animations, gestures, layout | Core |
| **GSAP + ScrollTrigger** | Complex timelines, scroll-driven effects | Core |
| **split-type** | Text splitting (chars, words, lines) | Core |

### 6.1 Smooth Scroll

**Library:** Lenis

```tsx
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
}
```

**Behavior:**
- Natural momentum on trackpad/touch
- Syncs with GSAP ScrollTrigger
- Supports `position: sticky`
- Accessible: respects `prefers-reduced-motion`

### 6.2 Custom Cursor (Dual-Layer Magnetic)

**Library:** Framer Motion + GSAP

**Cursor Layers:**
| Layer | Size | Behavior |
|-------|------|----------|
| Dot (inner) | 8px | Follows mouse instantly |
| Circle (outer) | 40px | Follows with spring delay |

**States:**
| State | Dot | Circle | Trigger |
|-------|-----|--------|---------|
| Default | 8px, accent | 40px, border | — |
| Hover (link) | 4px | 60px, filled 10% | `<a>`, `<button>` |
| Hover (magnetic) | hidden | 80px, magnetic pull | `.magnetic` class |
| Click | scale 0.8 | scale 0.9 | mousedown |
| Text hover | vertical bar | hidden | Text selection areas |
| Hidden | hidden | hidden | Outside viewport |

**Magnetic Effect:**
```tsx
const distance = Math.sqrt(dx * dx + dy * dy);
const pull = Math.max(0, 1 - distance / 100);
const offsetX = dx * pull * 0.4;
const offsetY = dy * pull * 0.4;
```

**Note:** Custom cursor hidden on touch devices.

### 6.3 Scroll Animations (Flat)

**Library:** GSAP ScrollTrigger + Framer Motion

All animations are **flat** (no 3D transforms like rotateX/Y, perspective).

#### Reveal Types

| Type | Description | Trigger |
|------|-------------|---------|
| Fade Up | Opacity 0→1, Y 40→0 | Enter viewport |
| Fade In | Opacity 0→1 | Enter viewport |
| Scale In | Scale 0.95→1, opacity | Enter viewport |
| Stagger | Sequential children reveal | Enter viewport |
| Slide In | X ±100→0, opacity | Enter viewport |
| Blur In | Blur 10px→0, opacity | Enter viewport |

**Default Config:**
```tsx
{
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}
```

#### Parallax Effects

| Element | Speed | Direction |
|---------|-------|-----------|
| Hero background | 0.5x | Slower |
| Floating elements | 1.2x | Faster |
| Images | 0.8x | Slower |
| Text blocks | 1.0x | Normal |

### 6.4 Text Animations

**Library:** split-type + GSAP + Framer Motion

| Type | Description | Use Case |
|------|-------------|----------|
| Character reveal | Staggered char opacity/Y | Hero headline |
| Word reveal | Staggered word animation | Section titles |
| Line reveal | Clip-path line by line | Paragraphs |
| Typewriter | Sequential character appear | Code snippets |
| Gradient sweep | Moving gradient mask | Accent text |

**Hero Title Animation:**
```tsx
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
    stagger: 0.03
  }
}
```

### 6.5 Page Transitions

**Library:** Framer Motion (AnimatePresence) + View Transitions API

| Transition | Description | Duration |
|------------|-------------|----------|
| Fade | Cross-fade between pages | 300ms |
| Slide | Slide left/right | 400ms |
| Clip | Rectangular reveal | 500ms |

**Default:**
```tsx
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" }
}
```

### 6.6 Hover Effects (Flat)

All hover effects are **flat** — using scale, opacity, color, shadow, and Y translation only.

| Element | Effect |
|---------|--------|
| Buttons | Scale 1.02, glow shadow, magnetic pull |
| Cards | Lift (Y -8px), shadow increase, border glow |
| Links | Underline slide in, color shift |
| Images | Subtle zoom (1.05), cursor change |
| Nav items | Background slide, text color shift |
| Tags | Background fill, scale 1.02 |

**Card Hover:**
```tsx
{
  whileHover: {
    y: -8,
    boxShadow: "0 16px 48px rgba(139, 92, 246, 0.25)",
    borderColor: "rgba(139, 92, 246, 0.5)"
  },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
}
```

**Button Hover (Magnetic):**
```tsx
{
  whileHover: {
    scale: 1.02,
    boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)"
  },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}
```

### 6.7 Micro-interactions

| Interaction | Animation |
|-------------|-----------|
| Button click | Scale down 0.97 → up 1.0 |
| Toggle switch | Sliding dot with bounce |
| Checkbox | Check icon draw animation |
| Input focus | Border glow pulse |
| Copy button | Checkmark morph |
| Menu open | Staggered item reveal |
| Tooltip | Fade + scale from origin |
| Theme toggle | Icon morph (sun ↔ moon) + circular reveal |

### 6.8 Loading States

**Logo:** "DRSM" in Space Grotesk, 700 weight

| State | Animation |
|-------|-----------|
| Page load | DRSM reveal → content fade in |
| Skeleton | Shimmer gradient sweep |
| Spinner | Rotating accent gradient |
| Progress | Smooth width transition |

**Initial Page Load Sequence:**
1. Black/white screen based on theme (0ms)
2. "DRSM" letters fade in sequentially (0-500ms)
3. "DRSM" scales up slightly + fades out (500-800ms)
4. Content reveals with stagger (800-1300ms)

```tsx
// DRSM logo animation
{
  letters: ["D", "R", "S", "M"],
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  stagger: 0.1,
  exit: { opacity: 0, scale: 1.1 },
  font: "Space Grotesk",
  weight: 700,
  size: "clamp(48px, 10vw, 96px)"
}
```

---

## 7. Animation Tokens

### Durations

| Token | Value | Use Case |
|-------|-------|----------|
| `instant` | 100ms | Micro-feedback |
| `fast` | 200ms | Hovers, toggles |
| `normal` | 300ms | Standard transitions |
| `slow` | 500ms | Page transitions |
| `slower` | 800ms | Complex sequences |

### Easings

| Token | Value | Use Case |
|-------|-------|----------|
| `ease-out` | `[0.22, 1, 0.36, 1]` | Enter animations |
| `ease-in-out` | `[0.4, 0, 0.2, 1]` | Symmetrical |
| `ease-spring` | `type: "spring", stiffness: 300, damping: 30` | Snappy |
| `ease-bounce` | `type: "spring", stiffness: 400, damping: 10` | Playful |

### Spring Presets

```tsx
const springs = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 10 },
  stiff: { stiffness: 700, damping: 30 },
};
```

---

## 8. CSS Custom Properties

```css
/* Dark Mode (default) */
:root {
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-elevated: #1A1A1A;
  --color-border: #262626;
  --color-border-strong: #404040;
  --color-muted: #888888;
  --color-foreground: #FAFAFA;

  --color-accent: #8B5CF6;
  --color-accent-hover: #A78BFA;
  --color-accent-muted: #C4B5FD;
  --color-accent-subtle: rgba(139, 92, 246, 0.12);

  --color-pop: #06B6D4;
  --color-pop-hover: #22D3EE;
  --color-pop-muted: #67E8F9;

  --gradient-accent: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
  --gradient-glow: radial-gradient(circle at center, rgba(139, 92, 246, 0.25) 0%, transparent 70%);
  --gradient-fade: linear-gradient(180deg, #0A0A0A 0%, #111111 100%);

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-glow: 0 0 40px rgba(139, 92, 246, 0.3);

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Light Mode */
[data-theme="light"] {
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-elevated: #F5F5F5;
  --color-border: #E5E5E5;
  --color-border-strong: #D4D4D4;
  --color-muted: #737373;
  --color-foreground: #0A0A0A;

  --color-accent-hover: #7C3AED;
  --color-pop-hover: #0891B2;

  --gradient-fade: linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%);

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 40px rgba(139, 92, 246, 0.2);
}
```

---

## 9. Performance Guidelines

1. **Transform & Opacity Only** — Avoid animating layout properties
2. **will-change** — Apply sparingly, remove after animation
3. **GPU Acceleration** — Use `transform: translateZ(0)` for complex animations
4. **Reduced Motion** — Respect `prefers-reduced-motion: reduce`
5. **Viewport Culling** — Don't animate off-screen elements
6. **RAF Throttling** — Throttle scroll listeners to animation frames
7. **Flat Only** — No 3D transforms (rotateX/Y, perspective) for performance

### Reduced Motion Fallback

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Fallback: instant transitions, no parallax, static cursor, instant theme switch
```

---

## 10. Implementation Priority

| Phase | Scope |
|-------|-------|
| **Phase 1** | Colors, typography, Lenis scroll, theme toggle |
| **Phase 2** | Custom cursor, text animations, hover effects |
| **Phase 3** | Page transitions, parallax, theme transition animation |
| **Phase 4** | DRSM loading sequence, micro-interactions, polish |

---

## References

### Libraries
- [Lenis - Smooth Scroll](https://www.lenis.dev/)
- [GSAP](https://gsap.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [split-type](https://github.com/lukePeavey/SplitType) — Free text splitting (replaces GSAP SplitText)

### Tutorials
- [Codrops - Custom Cursor Effects](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/)
- [Codrops - Animated Custom Cursor Effects](https://tympanus.net/codrops/2020/03/24/animated-custom-cursor-effects/)
- [Codrops - 3D Scroll-Driven Text Animations](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/)
- [Motion.dev - Magnetic Cursors](https://motion.dev/blog/introducing-magnetic-cursors-in-motion-cursor)
- [split-type Examples](https://github.com/lukePeavey/SplitType#examples)

### Inspiration
- [Awwwards - Hovers, Cursors Collection](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/)
- [Awwwards - Magnetic Hover](https://www.awwwards.com/inspiration/magnetic-hover-inette)
- [Awwwards - GSAP Websites](https://www.awwwards.com/websites/gsap/)
- [FreeFrontend - GSAP Examples](https://freefrontend.com/gsap-js/)
- [GSAP Showcase](https://gsap.com/showcase/)
