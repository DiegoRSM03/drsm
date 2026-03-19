# Performance Optimization Spec

Target: Lighthouse performance score 95+ on mobile.

## Results (localhost)

| Metric            | Before  | After            |
| ----------------- | ------- | ---------------- |
| Performance score | 85      | **91** (+6)      |
| LCP               | 4.3s    | **3.5s** (-0.8s) |
| LCP render delay  | 3,030ms | **132ms** (-96%) |
| TBT               | 60ms    | **30ms**         |
| Speed Index       | 2.3s    | 2.3s             |
| FCP               | 0.9s    | 0.9s             |

Key change: Hero headings and tagline use CSS `@keyframes` animations instead of framer-motion `motion.h1`. LCP text ("SANCHEZ") is visible at `opacity: 1` in SSR HTML — no JS hydration needed to paint.

## Production Baseline (2026-03-19)

| Metric      | Value | Score  | Target  |
| ----------- | ----- | ------ | ------- |
| FCP         | 2.0s  | yellow | < 1.8s  |
| LCP         | 3.4s  | yellow | < 2.5s  |
| Speed Index | 6.3s  | red    | < 3.4s  |
| TBT         | 40ms  | green  | < 200ms |
| CLS         | 0     | green  | < 0.1   |

## Root Cause

LCP element is `<span class="text-background relative z-10">SANCHEZ</span>` in the Hero heading. LCP breakdown shows **3,030ms element render delay** — the text exists in SSR HTML but is invisible because framer-motion sets `initial={{ opacity: 0, y: 50 }}`, meaning the text only appears after JS hydrates and runs the entrance animation.

Two JS chunks dominate execution:

- `d2f170b530...js` (framer-motion): 1,165ms eval
- `0497d1ed27...js` (page bundle): 533ms eval

---

## Phase 1: Fix LCP render delay

The Hero heading ("DIEGO" / "SANCHEZ") uses `motion.h1` with `initial={{ opacity: 0 }}`. SSR renders the HTML with inline `opacity: 0`, so the browser sees the text but can't paint it as LCP until React hydrates and framer-motion triggers the animation.

### 1.1 Make Hero heading visible on SSR

- [ ] Replace `motion.h1` for the two heading lines with plain `<h1>` elements
- [ ] Use CSS animations (`@keyframes`) for the entrance effect instead of framer-motion
- [ ] The headings render at `opacity: 1` in the SSR HTML — browser can paint LCP immediately
- [ ] CSS animation triggers on load, providing the same visual entrance
- [ ] The accent bar behind "SANCHEZ" can stay as `motion.span` (not LCP)

### 1.2 Make Hero tagline visible on SSR

- [ ] Same pattern for the tagline `<motion.p>` — replace with CSS animation
- [ ] Keeps the visual entrance effect without blocking LCP

---

## Phase 2: Reduce JS execution time

### 2.1 Lazy-load Hero non-critical components

The Hero imports heavy dependencies that aren't needed for the initial paint:

- `ProximityShape` — floating decorative shapes
- `CursorBrightGrid` — canvas cursor effect
- `GridBackground` — SVG grid pattern
- `MagneticButton` — CTA buttons with hover physics
- `react-icons/si` — tech stack icons

- [ ] Wrap `ProximityShape` instances in the Hero with a client-only dynamic import
- [ ] Wrap `CursorBrightGrid` with dynamic import (already lazy in other sections)
- [ ] Consider lazy-loading `MagneticButton` or simplifying to plain `<a>` for initial render

### 2.2 Defer tech stack pills

- [ ] The tech stack pills (`MagneticPill`) are below the fold on mobile and use `react-icons`
- [ ] Dynamic import the pills section or gate behind `useInView`

### 2.3 Inline critical LoadingScreen

- [ ] The `LoadingScreen` component imports framer-motion for its animation
- [ ] If it shows on first visit only (sessionStorage check), consider whether it adds to JS cost on repeat visits where it renders nothing

---

## Phase 3: Reduce render-blocking CSS

### 3.1 Inline critical CSS

- [ ] The render-blocking stylesheet (`db8d7c5499c44d69.css`, 11.4KB) delays FCP by 150ms
- [ ] Next.js handles CSS optimization automatically — check if `optimizeCss` experimental flag helps
- [ ] Alternatively, this may be the Tailwind CSS output which must stay render-blocking

---

## Phase 4: Verification

- [ ] Rebuild and run Lighthouse mobile audit
- [ ] Target: LCP < 2.5s, FCP < 1.8s, Speed Index < 3.4s
- [ ] Visual verification: Hero entrance animation still works
- [ ] All tests pass
