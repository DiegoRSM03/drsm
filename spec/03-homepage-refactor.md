# Website Audit & Refactor Spec

Final iteration across the entire codebase. Zero visual changes — focus on code quality, standards compliance, test coverage, and consistency.

## Phase 1: Cleanup

### 1.1 Remove concept/unused pages

- [ ] Delete `app/concept-projects/` (concept page)
- [ ] Delete `app/loading/` (standalone loading page — not the LoadingScreen component)
- [ ] Verify only `/` route remains

### 1.2 Clean barrel files

- [ ] Remove exports for deleted pages if any
- [ ] Ensure no broken imports after cleanup

---

## Phase 2: Centralize Colors & Constants

### 2.1 Create shared constants

Create `lib/constants.ts` (or `utils/colors.ts`) with all brand colors:

```ts
export const COLORS = {
  accent: "var(--color-accent)", // #8B5CF6
  cyan: "var(--color-pop)", // #06B6D4 — map to existing token or create new
  pink: "#EC4899", // needs CSS variable
  amber: "#F59E0B", // needs CSS variable
  green: "#10B981", // needs CSS variable
} as const;
```

### 2.2 Add missing CSS variables to `globals.css`

- [ ] Add `--color-cyan`, `--color-pink`, `--color-amber`, `--color-green` (with light mode variants)
- [ ] Ensure all secondary/decorative colors are tokenized

### 2.3 Replace hardcoded colors across all files

Files to update (hardcoded hex/rgba values):

- [ ] `components/common/Footer/footer.tsx` — `#8B5CF6`
- [ ] `components/custom/home/Hero/hero.tsx` — 9 hardcoded colors
- [ ] `components/custom/home/Experience/experience.tsx` — 5 hardcoded colors
- [ ] `components/custom/home/Contact/contact.tsx` — 5 hardcoded colors
- [ ] `components/custom/home/About/about.tsx` — 4 hardcoded colors
- [ ] `components/custom/CustomCursor/custom-cursor.tsx` — multiple rgba values
- [ ] `components/common/LoadingScreen/loading-screen.tsx` — rgba values
- [ ] `components/custom/MagneticButton/magnetic-button.tsx` — rgba values
- [ ] `components/custom/ProximityShape/proximity-shape.tsx` — if any
- [ ] All common components with `rgba(139, 92, 246, ...)` patterns

---

## Phase 3: Extract Shared Hooks & Utils

### 3.1 Extract reusable hooks into `hooks/`

Patterns duplicated across 3+ components:

| Hook                | Currently in                                  | Purpose                                           |
| ------------------- | --------------------------------------------- | ------------------------------------------------- |
| `useMagneticHover`  | Hero, Footer, Contact, MagneticButton, Navbar | Magnetic cursor-follow effect with spring physics |
| `useIsTouchDevice`  | Projects, Hero (duplicate definitions)        | Detect touch device via useSyncExternalStore      |
| `useCurrentTime`    | Contact could use                             | Live clock with timezone                          |
| `useScrollProgress` | Hero, Projects, Experience, About, Contact    | Common useScroll + useTransform pattern           |

### 3.2 Extract shared UI patterns

| Component/Util   | Currently duplicated in           | Purpose                                             |
| ---------------- | --------------------------------- | --------------------------------------------------- |
| `GridBackground` | Hero, Experience, Contact, Footer | SVG grid pattern with theme-aware stroke color      |
| `FloatingShape`  | Hero, Contact, Footer, About      | Decorative animated shape (diamond, circle, square) |

---

## Phase 4: Fix Design System Violations

### 4.1 Remove `rounded-*` from UI components

Per design system: NO rounded corners on UI components. Circles only on decorative elements.

| Component      | Violation                                    | Fix                          |
| -------------- | -------------------------------------------- | ---------------------------- |
| Avatar         | `rounded-full` on container                  | Remove — sharp square avatar |
| Badge          | `rounded-full`                               | Remove                       |
| ContactForm    | `rounded-lg` on button                       | Remove                       |
| ExperienceCard | `rounded-xl` on card, `rounded-full` on tags | Remove                       |
| HoverCard      | `rounded-xl`                                 | Remove                       |
| Image          | Configurable `rounded-*`                     | Remove rounded options       |
| Input          | `rounded-lg`                                 | Remove                       |
| LoadingScreen  | `rounded-full` on progress bar               | Check if decorative          |
| MobileMenu     | `rounded-full` on close button               | Remove                       |
| ProjectCard    | `rounded-xl` on card                         | Remove                       |
| ScrollToTop    | `rounded-full` on button                     | Remove                       |
| Skeleton       | Multiple `rounded-*`                         | Remove                       |
| SkillCard      | `rounded-xl`, `rounded-full`                 | Remove                       |
| Textarea       | `rounded-lg`                                 | Remove                       |
| ThemeToggle    | `rounded-full` on button                     | Remove                       |

**Exception:** `rounded-full` on decorative floating shapes is allowed.

---

## Phase 5: Mobile-First & Responsive Audit

### 5.1 Verify mobile-first class ordering

For every component, check that Tailwind classes follow mobile → sm → md → lg → xl pattern. Flag any desktop-first patterns.

### 5.2 Verify responsive breakpoints

Every component must look correct at:

- Mobile: < 640px
- Tablet: 640px–1024px
- Desktop: > 1024px

### 5.3 Touch targets

All interactive elements must be ≥ 44×44px on mobile.

---

## Phase 6: Accessibility (WCAG 2.2 AA)

### 6.1 Per-component audit

For each component verify:

- [ ] Semantic HTML elements used (`nav`, `header`, `footer`, `section`, `article`, `button`)
- [ ] Heading hierarchy — no skipped levels
- [ ] All interactive elements have visible focus states (`focus-visible:ring-*`)
- [ ] All icon-only buttons have `aria-label`
- [ ] All decorative elements have `aria-hidden="true"`
- [ ] `prefers-reduced-motion` respected (Framer Motion: `useReducedMotion`)
- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text/UI elements
- [ ] Images have alt text or `aria-hidden`
- [ ] Keyboard navigation works (Tab, Enter, Escape)

### 6.2 Specific known items to check

- [ ] Navbar curtain menu: Escape key closes it, focus trap
- [ ] Theme toggle: announces state change to screen readers
- [ ] Contact copy button: announces "Copied" status
- [ ] Footer back-to-top: focus management after scroll

---

## Phase 7: Performance Audit

### 7.1 useEffect review

Audit each `useEffect` for necessity. Replace with:

- **Derived state** during render where possible
- **Event handlers** for user-triggered side effects
- **useSyncExternalStore** for subscriptions
- **useRef** for mutable values that don't trigger re-render

| Component     | Effect                              | Review needed                           |
| ------------- | ----------------------------------- | --------------------------------------- |
| CustomCursor  | Mouse tracking, mutation observer   | Necessary — external DOM sync           |
| LenisProvider | Lenis init + RAF                    | Necessary — external library            |
| LoadingScreen | Progress animation + sessionStorage | Review — could simplify                 |
| Navbar        | Multiple effects                    | Review — may have unnecessary ones      |
| ScrollToTop   | Scroll listener                     | Review — could use IntersectionObserver |
| MobileMenu    | Body lock + escape key              | Review — body lock could be CSS-only    |
| About         | ResizeObserver for rail shapes      | Necessary — external measurement        |

### 7.2 Bundle considerations

- [ ] Verify dynamic imports for below-fold sections
- [ ] Check that unused components aren't bundled
- [ ] Verify `next/image` used everywhere (no `<img>` tags)

---

## Phase 8: Unit Tests

### 8.1 Missing test files (26 components)

Every component needs a colocated `.test.tsx` file.

**Priority 1 — In production use:**

- [ ] `LoadingScreen` — renders, disappears after load, sessionStorage
- [ ] `MagneticButton` — renders variants, hover behavior, accessibility
- [ ] `ProximityShape` — renders shape types, aria-hidden
- [ ] `LenisProvider` — renders children, doesn't crash without Lenis
- [ ] `TextReveal` — renders children, animation props

**Priority 2 — Common components (kept for future):**

- [ ] Avatar — renders, sizes, fallback, accessibility
- [ ] Badge — renders, variants, accessibility
- [ ] ContactForm — renders, validation, submission, accessibility
- [ ] Container — renders, max-width variants
- [ ] Divider — renders, orientation variants
- [ ] ExperienceCard — renders, content, accessibility
- [ ] Heading — renders, levels, accessibility
- [ ] Image — renders, alt text, loading states
- [ ] Input — renders, floating label, focus states, accessibility
- [ ] MobileMenu — renders, open/close, escape key, accessibility
- [ ] ProjectCard — renders, content, links, accessibility
- [ ] ScrollToTop — renders, visibility threshold, click behavior
- [ ] Section — renders, padding/background variants
- [ ] Skeleton — renders, variants
- [ ] SkillCard — renders, skill level, accessibility
- [ ] Text — renders, size/color variants
- [ ] Textarea — renders, floating label, focus states, accessibility
- [ ] Toast — renders, variants, auto-dismiss

**Priority 3 — Custom components:**

- [ ] AnimatedLink — renders, href, underline styles
- [ ] HoverCard — renders, hover states
- [ ] PageTransition — renders children

### 8.2 Enhance existing tests

Current tests cover basics. Add:

- [ ] Accessibility assertions (`toHaveAttribute('aria-*')`, `getByRole`)
- [ ] Keyboard interaction tests where applicable
- [ ] Reduced motion behavior tests
- [ ] Edge cases (empty props, missing data)

---

## Phase 9: Code Readability

### 9.1 Consistent file structure

Every component folder must follow:

```
ComponentName/
  component-name.tsx       # Implementation
  component-name.test.tsx  # Tests
  index.ts                 # Barrel export
```

### 9.2 Consistent patterns

- [ ] All components use `useReducedMotion` when animating
- [ ] All components use semantic color tokens (not hardcoded)
- [ ] Animation constants (`ease`, spring configs) imported from shared location
- [ ] No duplicate hook/utility definitions across files

---

## Execution Order

1. **Phase 1** — Cleanup (remove dead code first)
2. **Phase 2** — Centralize colors (foundation for everything else)
3. **Phase 3** — Extract hooks/utils (reduce duplication)
4. **Phase 4** — Design system fixes (rounded corners)
5. **Phase 5** — Mobile-first audit
6. **Phase 6** — Accessibility audit
7. **Phase 7** — Performance audit
8. **Phase 8** — Unit tests (test the final state, not intermediate)
9. **Phase 9** — Readability pass

Each phase gets its own commit. Each phase must pass `pnpm lint && pnpm test && pnpm build` before moving on.
