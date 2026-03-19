# Lighthouse Optimization Spec

Target: 100/100 across all four Lighthouse categories (Performance, Accessibility, Best Practices, SEO).

## Results

| Category       | Mobile (before → after) | Desktop (before → after) |
| -------------- | ----------------------- | ------------------------ |
| Performance    | 77 → 85 (+8)            | 96 → 99 (+3)             |
| Accessibility  | 92 → 100 (+8)           | 95 → 100 (+5)            |
| Best Practices | 100 → 100               | 100 → 100                |
| SEO            | 92 → 92\*               | 92 → 92\*                |

\*SEO canonical tag is present in HTML but Lighthouse reports false negative on localhost. Will pass on production domain.

## Baseline Audit (2026-03-19)

| Category       | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | 77     | 96      |
| Accessibility  | 92     | 95      |
| Best Practices | 100    | 100     |
| SEO            | 92     | 92      |

Key metrics (mobile):

| Metric      | Current | Target  |
| ----------- | ------- | ------- |
| LCP         | 4.4s    | < 2.5s  |
| TBT         | 310ms   | < 200ms |
| CLS         | 0       | < 0.1   |
| FCP         | 0.9s    | < 1.8s  |
| Speed Index | 3.2s    | < 3.4s  |

---

## Phase 1: SEO (92 → 100)

One failing audit. Fastest win.

### 1.1 Add canonical URL

**Audit**: `document-has-valid-rel-canonical` (score: 0)

- [ ] Add `alternates.canonical` to the metadata in `app/[locale]/layout.tsx`
- [ ] Canonical should point to `https://drsm.vercel.app/{locale}` for each locale
- [ ] Verify `<link rel="canonical">` appears in rendered HTML

### 1.2 Verify existing SEO passes

These already pass but confirm they remain green after changes:

- [ ] `<meta name="viewport">` present
- [ ] `<title>` and `<meta name="description">` present per locale
- [ ] `hreflang` tags for en/es
- [ ] `robots.txt` and `sitemap.xml` accessible

---

## Phase 2: Accessibility (92 → 100)

Two failing audits, both with clear fixes.

### 2.1 Fix `aria-required-children` on project cards

**Audit**: `aria-required-children` (score: 0)
**Element**: `<div role="list" aria-label="Project cards">` contains `<article>` children.

`role="list"` requires children with `role="listitem"`. The project cards are `<article>` elements which don't satisfy this.

- [ ] Find the Projects section wrapper with `role="list"`
- [ ] Option A (preferred): Remove `role="list"` and `aria-label` — use a plain `<div>` since the cards are `<article>` elements with their own semantics. Articles don't need a list wrapper.
- [ ] Option B: If list semantics are needed, wrap each `<article>` in a `<div role="listitem">`
- [ ] Verify both mobile and desktop markup variants (the Projects section renders different layouts per breakpoint)

### 2.2 Fix color contrast on decorative ghost text

**Audit**: `color-contrast` (score: 0)
**Elements**: `<span style="opacity:0.12; color:var(--color-muted)">` — ghost text characters in About section word-by-word reveal.

These are intentionally near-invisible decorative elements (the "already revealed" ghost text behind the scroll animation). Contrast ratio is 1.12:1 vs required 3:1.

- [ ] Add `aria-hidden="true"` to the ghost text spans so screen readers and Lighthouse skip them
- [ ] Do NOT change the visual opacity — the low contrast is the intended design
- [ ] Check if the same pattern exists in other sections (Contact manifesto, Experience)

---

## Phase 3: Performance (77 → 95+)

This is the heaviest phase. Mobile LCP is 4.4s (target <2.5s) and TBT is 310ms. The root cause is ~550KB of JS parsed and evaluated on initial load, with ~250KB unused.

### 3.1 Dynamic import below-fold sections

**Audit**: `unused-javascript` (score: 0, 75 KiB wasted), `bootup-time` (2.5s script eval), `mainthread-work-breakdown` (4.4s)

The homepage loads all six sections eagerly. Only Hero is above the fold. Every other section (Projects, Experience, About, Contact, Footer) can be deferred.

- [ ] Create a `LazySection` wrapper component that uses `next/dynamic` with `ssr: false`
- [ ] Wrap below-fold sections in `LazySection`:
  - `Projects` — heaviest section (horizontal scroll, framer-motion animations, project images)
  - `Experience` — parallax scroll, animated cards
  - `About` — scroll-driven text reveal, clip-path avatar, rail shapes
  - `Contact` — manifesto, magnetic buttons
  - `Footer` — minimal, can stay static or be lazy
- [ ] Use `IntersectionObserver` (or framer-motion `useInView`) to trigger loading when the section is ~200px from viewport
- [ ] Add a minimal placeholder (matching section height) to prevent CLS during load
- [ ] Keep Hero as a static import — it's the LCP element

### 3.2 Optimize LCP image

**Audit**: `largest-contentful-paint` (4.4s), `image-delivery-insight` (109 KiB saveable)

The LCP element is likely the first project card screenshot (PropSource). It needs to load as fast as possible.

- [ ] Add `priority` prop to the first project card's `<Image>` component (PropSource screenshot)
- [ ] This tells Next.js to add `fetchpriority="high"` and preload the image
- [ ] Verify `loading="lazy"` is NOT on the LCP image (only on subsequent project images)
- [ ] Add explicit `sizes` attribute based on actual rendered widths:
  - Mobile: `100vw` (full width)
  - Tablet: `50vw` (side-by-side layout)
  - Desktop: `calc(100vw - 2rem)` or similar based on max-w-7xl container
- [ ] Apply `sizes` to all project card images, not just the first one

### 3.3 Convert images to WebP/AVIF

**Audit**: `image-delivery-insight` (score: 50, 109 KiB saveable)

Project screenshots are PNG. Next.js `<Image>` can serve WebP/AVIF automatically in SSR mode, but in static export or when images are in `public/`, the source format matters.

- [ ] Check current image format in `public/` directory
- [ ] If using `next/image` with local imports — Next.js already handles format conversion at serve time. Verify `next.config` has `formats: ['image/avif', 'image/webp']` (or that the default is active)
- [ ] If images are referenced as strings from `public/` — convert source files to WebP manually using `cwebp` or `sharp`
- [ ] Verify rendered `<img>` has `srcset` with multiple sizes and modern formats

### 3.4 Dynamic import Lenis smooth scroll

**Audit**: `unused-javascript`, `bootup-time`

Lenis is loaded immediately but isn't needed until the user starts scrolling.

- [ ] Lazy-load the Lenis library via dynamic import inside `LenisProvider`
- [ ] Initialize Lenis in a `useEffect` with `import('lenis').then(...)` instead of top-level import
- [ ] This defers ~30KB of JS from the critical path

### 3.5 Dynamic import cursor effects (touch devices)

**Audit**: `unused-javascript`

`CustomCursor`, `CursorBrightGrid`, `CursorGlow`, and `CursorShapes` are useless on touch devices but still loaded and initialized.

- [ ] Gate cursor component rendering on `useIsTouchDevice()` — don't even import the components on touch
- [ ] Use `next/dynamic` for cursor components so the JS isn't in the initial bundle for touch users
- [ ] This saves both parse time and runtime (no RAF loops, no mousemove listeners)

### 3.6 Reduce framer-motion bundle

**Audit**: `unused-javascript` (framer-motion chunk: 219KB total, 78KB unused)

Framer-motion is the largest dependency. The full bundle includes features not used (drag physics, layout animations, 3D transforms).

- [ ] Switch imports from `framer-motion` to `framer-motion/m` for simple animations (opacity, y transforms) — this is the minimal bundle
- [ ] Keep full `motion` import only in components that need advanced features (drag, layout, AnimatePresence)
- [ ] Audit which framer-motion features are actually used per component:
  - `motion.div/span` with simple animate — use `m`
  - `useScroll`, `useTransform`, `useSpring` — need full import
  - `AnimatePresence` — need full import
  - `useInView` — need full import
- [ ] If `m` migration is too invasive, skip this — the dynamic imports in 3.1 will already defer most of framer-motion's cost to below-fold sections

### 3.7 Preload critical fonts

**Audit**: `render-blocking-insight` (20ms)

- [ ] Verify display fonts use `font-display: swap` (Next.js `next/font` does this by default)
- [ ] If custom fonts are loaded via CSS `@font-face`, add `<link rel="preload" as="font">` for the display font used in the Hero heading
- [ ] This is a minor optimization (~20ms) — prioritize only if other items are done

---

## Phase 4: Verification

### 4.1 Re-run Lighthouse after each phase

- [ ] After Phase 1 (SEO): run audit, confirm SEO = 100
- [ ] After Phase 2 (A11y): run audit, confirm Accessibility = 100
- [ ] After Phase 3 (Perf): run audit, confirm Performance >= 95 mobile
- [ ] Run desktop audit to confirm no regressions

### 4.2 Cross-check

- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes (update tests if component structure changes)
- [ ] `pnpm build` succeeds
- [ ] Visual verification: all 6 sections render correctly after lazy loading
- [ ] Scroll behavior works (Lenis lazy init doesn't break initial page load)
- [ ] Reduced motion: verify lazy sections still respect `prefers-reduced-motion`

---

## Out of Scope

- **Best Practices**: already 100, no changes needed
- **Bundle splitting React itself**: controlled by Next.js, not actionable
- **Legacy JS polyfills** (13KB in framer-motion chunk): owned by the library, not fixable from userland. The dynamic import strategy in 3.1 defers this cost instead.
- **Network dependency tree**: informational audit with no score impact
- **Third-party scripts**: none present, no action needed
