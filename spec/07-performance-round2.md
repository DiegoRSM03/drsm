# Performance Optimization Round 2

Target: Lighthouse mobile performance 95+, desktop 98+.

## Current Baseline (2026-03-22, production)

| Metric      | Mobile    | Desktop    |
| ----------- | --------- | ---------- |
| **Score**   | **89**    | **95**     |
| FCP         | 2.1s (80) | 0.3s (100) |
| LCP         | 3.3s (71) | 0.6s (99)  |
| TBT         | 80ms (99) | 0ms (100)  |
| CLS         | 0 (100)   | 0 (100)    |
| Speed Index | 3.8s (83) | 2.3s (51)  |

Previous rounds: 77 (spec 05) → 85 (spec 05) → 89 (spec 06) → 89 (current).

## Failing Audits

### 1. Locale redirect: `/` → `/en` (307) — ~810ms wasted on mobile

The i18n middleware returns a 307 redirect from `/` to `/en`. Every first visit pays a full round-trip penalty before the document even starts loading.

**Chunk:** `middleware.ts` using `next-intl/middleware`.

### 2. Unused JavaScript — 42 KiB saveable

| Chunk                                       | Transfer | Wasted   |
| ------------------------------------------- | -------- | -------- |
| `d2f170b530…` (Next.js runtime + polyfills) | 69.6 KiB | 21.9 KiB |
| `910e5022a2…` (Next.js internals)           | 38.6 KiB | 20.0 KiB |

### 3. Legacy JavaScript — 14 KiB of unnecessary polyfills

All from `d2f170b530…`:

- `Array.prototype.at`
- `Array.prototype.flat` / `flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimEnd` / `trimStart`

These are Baseline features supported by all modern browsers.

### 4. Main-thread work — 2.9s on mobile

| Category             | Time     |
| -------------------- | -------- |
| Script Evaluation    | 1,695 ms |
| Other                | 488 ms   |
| Style & Layout       | 314 ms   |
| Garbage Collection   | 172 ms   |
| Rendering            | 164 ms   |
| Script Parse/Compile | 84 ms    |

Top scripts by execution time:

| Chunk                         | Total    | Scripting | Parse |
| ----------------------------- | -------- | --------- | ----- |
| `d2f170b530…` (runtime)       | 1,515 ms | 1,317 ms  | 24 ms |
| `0497d1ed27…` (framer-motion) | 798 ms   | 336 ms    | 13 ms |

### 5. Render-blocking CSS — 150ms

`ec2cea036a65e487.css` (11.6 KiB) blocks first paint. This is the Tailwind output stylesheet.

### 6. Network dependency chain — 1,328ms critical path

```
/en (20.67 KiB) — 1,216ms
  └── ec2cea036a…css (11.63 KiB) — 1,328ms
```

---

## Phase 1: Eliminate locale redirect

The 307 from `/` → `/en` adds ~800ms on mobile. Convert to a rewrite so the browser gets content immediately without a round-trip.

- [x] Change middleware from redirect to rewrite for the root path (`localePrefix: "as-needed"`)
- [x] Ensure `/` serves `/en` content directly (200 with `x-middleware-rewrite: /en`)
- [x] Verify deep links (`/es/...`) still work — `/en` redirects to `/` (correct `as-needed` behavior)
- [x] Update canonical URLs and alternates in metadata

---

## Phase 2: Reduce JS bundle size

### 2.1 Target modern browsers only (Legacy JS)

- [x] Add `browserslist` config targeting last 2 versions of Chrome/Firefox/Safari/Edge
- [ ] Verify the polyfills are no longer shipped (needs production deploy to confirm)

### 2.2 LazyMotion migration

- [x] Created `MotionProvider` wrapping app with `LazyMotion features={domMax} strict`
- [x] Migrated all 29 component files from `motion` to `m` components
- [x] Updated all 29 test files with `m` mock
- [ ] Verify bundle size reduction (needs production deploy to confirm)

### 2.3 Audit and reduce unused JS

- [x] `gsap` — **removed** (unused dependency, never imported)
- [x] `split-type` — **removed** (unused dependency, never imported)
- [x] `lenis` — already dynamically imported in `LenisProvider`
- [x] `react-icons/si` — justified (5 tech logos not available in lucide-react)
- [x] `@formatjs/intl-localematcher` and `negotiator` — not imported in source, server-only via next-intl

---

## Phase 3: Reduce render-blocking CSS

### 3.1 Inline critical CSS

- [x] Enabled `experimental.inlineCss: true` in `next.config.ts` — CSS is inlined into HTML, eliminating render-blocking stylesheet request

### 3.2 Font loading

- [x] Verified: all 3 fonts use `display: "swap"` via `next/font`
- [x] `next/font` handles preloading automatically
- [x] JetBrains Mono only used below-fold (Experience, About) but deferring not worth the complexity

---

## Phase 4: Improve Speed Index

- [x] Removed `hero-fade-in` keyframe — no more `opacity: 0` on any hero element
- [x] Reduced animation delays: titles 0.1-0.2s (was 0.8-0.9s), tagline 0.3s (was 1.6s), CTA 0.4s (was 1.8s), pills 0.15s (was 0.5s)
- [x] Shortened animation durations from 0.8s to 0.5-0.6s
- [x] All hero content visible at opacity 1 from SSR — only transform animations during entrance

---

## Phase 5: Verification

- [x] `pnpm build` passes
- [x] `pnpm test` passes (388/388)
- [x] `pnpm lint` passes
- [ ] Run Lighthouse mobile audit — target: score 95+, LCP < 2.5s, FCP < 1.8s
- [ ] Run Lighthouse desktop audit — target: score 98+
- [ ] Visual verification: all animations still work
- [ ] Test both locales (`/`, `/es`) and locale switching
