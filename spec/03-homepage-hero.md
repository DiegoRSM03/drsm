# Homepage Hero Specification

## Overview

The hero is the first impression — the "wow moment" that makes recruiters stop scrolling and pay attention. This section must immediately communicate: **"This developer builds complex applications AND obsesses over every pixel."**

---

## Content

### Headline
**Diego Sanchez**

### Title
**Senior Frontend Engineer**

### Tagline Options (Pick one or remix)
1. "Where complex systems meet pixel-perfect craft"
2. "Engineering interfaces that feel alive"
3. "Building products that users love to use"
4. "Precision engineering meets creative execution"
5. "I build what designers dream"

### Primary CTA
**Download Resume** → Links to PDF

### Secondary CTA
**View Projects** → Scrolls to projects section or `/projects`

---

## Technical Constraints

- Full viewport height (100vh) on all devices
- Smooth entrance animations (staggered, 2-3s total)
- 60fps animations throughout
- Reduced motion support
- Mobile-first responsive
- No 3D/WebGL (flat aesthetic)
- Boldness level: 8/10

---

## Concept 1: "The Living Grid"

### Vision
A dark canvas with an animated grid that breathes and reacts. The grid represents the structured, systematic thinking of engineering while the organic animations show creative flair. Text emerges from the grid intersection points.

### Visual Description
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼      │
│     │     │     │     │     │     │     │     │     │      │
│     ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼      │
│     │     │     │                             │     │      │
│     ┼─────┼─────┤   DIEGO SANCHEZ            ├─────┼      │
│     │     │     │   Senior Frontend Engineer  │     │      │
│     ┼─────┼─────┤                             ├─────┼      │
│     │     │     │   "Where complex systems    │     │      │
│     ┼─────┼─────┤    meet pixel-perfect       ├─────┼      │
│     │     │     │    craft"                   │     │      │
│     ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼      │
│     │     │     │     │     │     │     │     │     │      │
│     ┼─────┼─────┼─────┼─[RESUME]──[PROJECTS]──┼─────┼      │
│     │     │     │     │     │     │     │     │     │      │
│                                                             │
│                         ↓ scroll                            │
└─────────────────────────────────────────────────────────────┘
```

### Background Layer
- **Grid pattern**: Subtle lines forming squares (40-60px)
- **Grid color**: `var(--color-border)` at 30% opacity
- **Intersection dots**: Small circles at each intersection
- **Pulse animation**: Random intersection points glow accent color, creating a "data flowing" effect
- **Cursor interaction**: Grid lines near cursor glow brighter, creating a spotlight effect

### Text Layer
- **Name**: Display size (72-96px), Space Grotesk, gradient text
- **Title**: XL size, muted color, letter-spacing wide
- **Tagline**: Glass card with blur backdrop, floating slightly
- **CTAs**: MagneticButtons with glow

### Entrance Animation Sequence
1. **0.0s**: Grid fades in from 0 opacity, lines draw from center outward
2. **0.5s**: Intersection dots appear with scale animation
3. **1.0s**: Name reveals character by character
4. **1.5s**: Title fades up
5. **1.8s**: Tagline glass card slides in from bottom
6. **2.2s**: CTAs fade in with stagger
7. **2.5s**: Scroll indicator pulses

### Cursor Interaction
- Grid lines within 150px of cursor increase opacity
- Intersection dots near cursor scale up slightly
- Creates a "revealing" effect as user explores

### Mobile Adaptation
- Grid becomes larger (80px squares)
- Only 3-4 visible grid lines for performance
- Touch creates temporary glow at touch point
- Stacked layout for text

### Technical Implementation
- CSS Grid for layout
- SVG for grid lines (better performance than canvas)
- Framer Motion for entrance animations
- CSS custom properties for dynamic glow effects
- `useMousePosition` hook for cursor tracking

### Pros
- Shows systematic thinking (grids = structure)
- Interactive without being overwhelming
- Unique but not alienating
- Great performance

### Cons
- Could feel "techy" rather than "creative"
- Grid might feel rigid

---

## Concept 2: "Gradient Mesh Dreams"

### Vision
Flowing, organic gradient blobs that morph slowly in the background, creating a dreamy yet professional atmosphere. Glass morphism cards float with parallax depth. Shows the creative, design-focused side while maintaining professionalism.

### Visual Description
```
┌─────────────────────────────────────────────────────────────┐
│ ○                                                           │
│   ╭──────────╮        ●                                     │
│   │ gradient │    ╱‾‾‾‾‾‾‾‾╲                                │
│   │   blob   │   │  blob 2  │                               │
│   ╰──────────╯    ╲________╱                                │
│                                                             │
│         ┌─────────────────────────────────┐                 │
│         │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← glass card   │
│         │                                 │                 │
│         │      DIEGO SANCHEZ              │                 │
│         │      Senior Frontend Engineer   │                 │
│         │                                 │                 │
│         │      "Engineering interfaces    │                 │
│         │       that feel alive"          │                 │
│         │                                 │                 │
│         │    [RESUME]    [PROJECTS]       │                 │
│         │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │                 │
│         └─────────────────────────────────┘                 │
│                    ●                            ○           │
│              floating                      geometric        │
│               shape                         accent          │
└─────────────────────────────────────────────────────────────┘
```

### Background Layer
- **Gradient blobs**: 3-4 large blobs (300-500px) with accent/pop colors
- **Blob animation**: Slow morphing (10-15s loop), gentle floating movement
- **Blur**: Heavy blur (80-100px) on blobs for soft effect
- **Floating shapes**: Small geometric shapes (circles, rounded squares) with glass effect

### Glass Card
- **Background**: `rgba(255,255,255,0.05)` or surface color at 60%
- **Backdrop filter**: `blur(20px)`
- **Border**: 1px subtle border with gradient
- **Shadow**: Soft glow shadow

### Floating Elements
- Small glass circles/squares floating with parallax
- Different depths (some move more on scroll/mouse)
- Contain subtle icons or patterns

### Text Layer
- All text contained within central glass card
- Name with gradient
- Clean hierarchy
- CTAs at bottom of card

### Entrance Animation Sequence
1. **0.0s**: Blobs fade in at low opacity, already morphing
2. **0.4s**: Blobs scale up to full size
3. **0.6s**: Glass card fades in with slight Y translation
4. **0.8s**: Floating elements drift in from edges
5. **1.2s**: Name reveals (characters or fade)
6. **1.6s**: Title and tagline fade up
7. **2.0s**: CTAs appear

### Cursor Interaction
- Floating elements drift away from cursor slightly (magnetic repel)
- Glass card has subtle tilt based on cursor position
- Blobs shift slightly toward cursor (attracted)

### Mobile Adaptation
- Fewer/smaller blobs for performance
- Glass card takes more width (90%)
- Floating elements reduced to 2-3
- Blobs animate slower

### Technical Implementation
- CSS for gradient blobs (pseudo-elements with filter: blur)
- Framer Motion for morphing (scale, borderRadius keyframes)
- `useMousePosition` for parallax
- CSS backdrop-filter for glass

### Pros
- Feels premium and modern
- Shows design sensibility
- Soft and approachable
- Very trendy (2024-2025 aesthetic)

### Cons
- Could feel "generic startup"
- Performance on older devices
- Glass effect might not work in all browsers

---

## Concept 3: "The Architect's Blueprint"

### Vision
A hero that feels like you're looking at a product being designed in real-time. Wireframe aesthetics with animated connection lines, showing the "building" process. Demonstrates technical thinking and systematic approach.

### Visual Description
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ○──────────────────────────────────────────○            │
│     │                                          │            │
│     │    ┌─ · · · · · · · · · · · · · ─┐      │            │
│     │    ·                              ·      │            │
│     ├────·    DIEGO SANCHEZ             ·──────┤            │
│     │    ·    ─────────────────         ·      │            │
│     │    ·    Senior Frontend Engineer  ·      │            │
│     │    ·                              ·      │            │
│     │    └─ · · · · · · · · · · · · · ─┘      │            │
│     │              │                           │            │
│     │              │                           │            │
│     │    ┌─────────┴─────────┐                │            │
│     │    │                   │                │            │
│     │  [RESUME]         [PROJECTS]            │            │
│     │                                          │            │
│     ○──────────────────────────────────────────○            │
│                                                             │
│              ◇ precision  ◇ systems  ◇ craft               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Background Layer
- **Color**: Pure dark background
- **Blueprint lines**: Subtle construction lines, dashed
- **Corner markers**: Technical drawing corner brackets
- **Measurement lines**: Subtle dimension indicators

### Connection Lines
- Animated dashed lines connecting elements
- Lines draw themselves on load
- Pulse effect traveling along lines
- Show "data flow" or "connection" between concepts

### Annotation Badges
- Small floating labels: "precision", "systems", "craft", "pixels"
- Technical annotation style (like Figma comments)
- Appear with stagger after main content

### Text Layer
- Name in a "bounding box" (dotted border)
- Technical, precise feeling
- Monospace accents for measurements/annotations

### Entrance Animation Sequence
1. **0.0s**: Corner brackets draw in
2. **0.3s**: Connection lines start drawing from corners toward center
3. **0.6s**: Main bounding box draws itself
4. **1.0s**: Name types in (typewriter effect)
5. **1.4s**: Title fades in
6. **1.8s**: Connection lines to CTAs draw
7. **2.2s**: CTAs appear at line endpoints
8. **2.6s**: Annotation badges float in

### Cursor Interaction
- Lines near cursor glow accent color
- Hovering elements shows "tooltip" annotation
- Creates feeling of inspecting a blueprint

### Mobile Adaptation
- Simplified line structure
- Fewer annotations
- Bounding box becomes full-width card
- Lines become subtle borders

### Technical Implementation
- SVG for all lines (path animations)
- `stroke-dasharray` + `stroke-dashoffset` for line drawing
- Framer Motion for orchestration
- CSS for glow effects

### Pros
- Unique and memorable
- Shows technical precision
- Tells a story (building/creating)
- Great for engineering-focused roles

### Cons
- Might feel cold/technical
- Less "design" feeling
- Complex to implement well

---

## Concept 4: "Magnetic Typography"

### Vision
Giant, bold typography that dominates the viewport. The text itself is the hero — massive, confident, and interactive. Letters respond to cursor with magnetic effects. Minimal but maximum impact. Shows confidence and mastery.

### Visual Description
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│     D  I  E  G  O                                          │
│                                                             │
│         S  A  N  C  H  E  Z                                │
│                                                             │
│                                                             │
│     ──────────────────────────────────────                  │
│     Senior Frontend Engineer                                │
│     ──────────────────────────────────────                  │
│                                                             │
│                                                             │
│     Where complex systems                                   │
│     meet pixel-perfect craft ←───── accent line            │
│                                                             │
│                                                             │
│                    [RESUME]  ·  [PROJECTS]                  │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Background Layer
- **Color**: Pure background, minimal decoration
- **Accent lines**: Thin horizontal lines as visual breaks
- **Gradient glow**: Subtle gradient behind name (very subtle)
- **Optional**: Few floating particles (dots) for depth

### Typography
- **Name**: MASSIVE (120-200px on desktop)
- **Letter spacing**: Wide, letters breathe
- **Weight**: Bold/Black
- **Each letter**: Individually animated, magnetic

### Magnetic Effect
- Each letter is a magnetic element
- Cursor pulls letters slightly toward it
- Letters rotate subtly based on cursor angle
- On hover, letter gets accent color glow

### Visual Accents
- Thin lines above/below title
- Accent color vertical line next to tagline
- Minimal, intentional decoration

### Entrance Animation Sequence
1. **0.0s**: Background gradient fades in
2. **0.2s**: First name letters fall/slide in with stagger
3. **0.8s**: Last name letters follow
4. **1.4s**: Lines draw themselves
5. **1.6s**: Title fades up
6. **1.9s**: Tagline slides in from left
7. **2.2s**: CTAs fade in

### Cursor Interaction
- Letters within 200px of cursor pull toward it
- Maximum displacement: 15-20px
- Smooth spring physics
- Letter opacity/glow increases on proximity

### Mobile Adaptation
- Smaller but still bold typography (60-80px)
- Stacked name (DIEGO on one line, SANCHEZ below)
- No magnetic effect (touch creates brief glow)
- Full-width layout

### Technical Implementation
- Each letter wrapped in magnetic component
- Reuse existing `MagneticButton` physics
- Framer Motion for all animations
- CSS custom properties for dynamic glow

### Pros
- Maximum confidence/impact
- Simple but memorable
- Shows typography/design skills
- Fast to load
- Highly interactive

### Cons
- Less "complex" feeling
- Might feel too minimal for some
- Heavy reliance on typography quality

---

## Concept 5: "The Orbit"

### Vision
A solar system of skills and expertise orbiting around the central identity. Shows the breadth of capabilities while keeping focus on the person. Interactive — users can pause orbits, hover for details. Unique and memorable.

### Visual Description
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ○ React                                  │
│               ·    ·    ·                                   │
│          ○ TypeScript  ·   ○ Next.js                       │
│               ·    ·    ·                                   │
│     ○ ─ ─ ─ ─ ─╭─────────╮─ ─ ─ ─ ─ ○                      │
│     Design     │  DIEGO  │      Systems                     │
│                │ SANCHEZ │                                  │
│     ○ ─ ─ ─ ─ ─╰─────────╯─ ─ ─ ─ ─ ○                      │
│     Motion     │ Frontend │      APIs                       │
│                │ Engineer │                                 │
│               ·    ·    ·                                   │
│          ○ Tailwind    ·   ○ Node.js                       │
│               ·    ·    ·                                   │
│                    ○ Figma                                  │
│                                                             │
│         "Engineering interfaces that feel alive"            │
│                                                             │
│              [RESUME]      [PROJECTS]                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Central Element
- Name and title in glass card at center
- Subtle glow/pulse
- Acts as the "sun" of the system

### Orbiting Elements
- **Inner orbit**: Core skills (React, TypeScript, Next.js)
- **Outer orbit**: Secondary skills (Node, Figma, Tailwind)
- **Orbit paths**: Subtle dashed circles
- **Elements**: Small glass pills/badges with icons

### Orbit Animation
- Continuous rotation (different speeds per orbit)
- Inner orbit: 30s full rotation
- Outer orbit: 45s full rotation
- Opposite directions for visual interest

### Orbit Trails
- Subtle gradient trail behind each orbiting element
- Trail fades over ~90 degrees
- Uses accent/pop colors

### Entrance Animation Sequence
1. **0.0s**: Central card scales up from 0
2. **0.4s**: Orbit paths draw as circles
3. **0.8s**: Orbiting elements pop in with stagger
4. **1.2s**: Elements begin rotating
5. **1.6s**: Name text reveals
6. **1.9s**: Tagline fades in
7. **2.2s**: CTAs appear

### Cursor Interaction
- Hovering an orbiting element pauses its orbit
- Shows expanded info (tooltip or card)
- Other elements continue moving
- Click could link to relevant projects

### Mobile Adaptation
- Orbits become horizontal scrolling pills
- Or: Static arrangement in circle
- Or: List of skills below name
- Simpler but maintains concept

### Technical Implementation
- CSS animations for orbits (transform: rotate)
- Individual orbit elements positioned with transform
- Framer Motion for entrance
- `useHover` to pause individual orbits

### Pros
- Very unique and memorable
- Shows breadth of skills
- Interactive and explorable
- Tells a story (you're at the center of these technologies)

### Cons
- Complex to implement
- Could feel busy
- Mobile adaptation challenging
- Might distract from main message

---

## Comparison Matrix

| Aspect | Grid | Gradient Mesh | Blueprint | Typography | Orbit |
|--------|------|---------------|-----------|------------|-------|
| **Uniqueness** | ★★★☆☆ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Wow Factor** | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ |
| **Professionalism** | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| **Performance** | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★☆☆ |
| **Mobile** | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★★ | ★★☆☆☆ |
| **Implementation** | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★★☆☆☆ |
| **Shows Design** | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ |
| **Shows Engineering** | ★★★★★ | ★★☆☆☆ | ★★★★★ | ★★☆☆☆ | ★★★★☆ |

---

## Recommendation

For Diego's goals (showing both complex systems AND pixel-perfect design), I recommend:

### Primary Choice: Concept 4 "Magnetic Typography"
- Maximum impact with minimal elements
- Shows confidence
- Typography mastery = design skills
- Interaction = engineering skills
- Best performance
- Easy to execute perfectly

### Hybrid Alternative: Concepts 1 + 4
- Magnetic typography with subtle grid background
- Best of both worlds
- Shows systematic thinking (grid) + design eye (typography)
- Interactive letters + reactive grid

---

## Next Steps

1. Diego reviews concepts
2. Pick one (or hybrid)
3. Create detailed implementation spec
4. Build component
5. Iterate based on feel

---

## Open Questions

1. Which concept resonates most?
2. Any elements from different concepts to mix?
3. Tagline preference?
4. Include skills preview in hero or save for About section?
