# DRSM Quick Reference

Copy-paste patterns for common UI elements.

## Shapes Cheatsheet

```
DECORATIVE SHAPES (floating):      UI COMPONENTS (sharp edges):
├─ Squares (45° = diamond)         ├─ Buttons (no border-radius)
├─ Circles (borderRadius: 50%)     ├─ Tags/pills (no border-radius)
├─ Triangles (CSS borders)         ├─ Cards (no border-radius)
├─ SANCHEZ highlight               ├─ Inputs (no border-radius)
└─ Cursor (square + diamond)       └─ Badges (no border-radius)

NEVER USE: rounded-* classes on UI components
OK TO USE: circles for decorative floating shapes
```

## Colors

```
Primary:   #8B5CF6 (purple)  → buttons, highlights, accent
Secondary: #06B6D4 (cyan)    → decorative
           #EC4899 (pink)    → decorative
           #F59E0B (amber)   → decorative
           #10B981 (green)   → decorative
```

## Container (ALWAYS USE)

```tsx
<div className="mx-auto w-full max-w-7xl px-6">
```

## Card

```tsx
<div className="border-border bg-background/80 border-2 p-8">
```

## Tech Tag

```tsx
<span className="border px-3 py-1 text-xs font-medium" style={{ borderColor: color, color }}>
  {tech}
</span>
```

## Duration Badge

```tsx
<span className="px-3 py-0.5 font-mono text-sm" style={{ backgroundColor: `${color}20`, color }}>
  2.5+ yrs
</span>
```

## Heading

```tsx
<h2
  className="text-foreground text-2xl font-black md:text-3xl"
  style={{ fontFamily: "var(--font-display)" }}
>
  {title}
</h2>
```

## Fade In Animation

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

## Highlight Reveal

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

## Floating Shape

```tsx
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
```

## Grid Background

```tsx
<svg className="absolute inset-0 h-full w-full">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```
