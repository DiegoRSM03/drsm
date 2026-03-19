"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Globe } from "lucide-react";
import { useTheme } from "@/contexts";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { Hero } from "@/components/custom/home";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAV_ITEMS = ["The Work", "The Journey", "The Person", "Reach Out"];
const DISPLAY_FONT = "var(--font-display)";
const LINE_COLOR = "rgba(255,255,255,0.35)";
const LINE_COLOR_SUBTLE = "rgba(255,255,255,0.25)";

// ─────────────────────────────────────────────
// Proximity Grid — invisible lines that glow near cursor
// ─────────────────────────────────────────────

const GRID_CELL = 100;
const GRID_RADIUS = 250;
const GRID_MAX_OPACITY = 0.35;

function ProximityGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let x = 0; x <= w; x += GRID_CELL) {
        const dist = Math.abs(x - mx);
        if (dist > GRID_RADIUS) continue;
        const closestY = Math.max(0, Math.min(h, my));
        const vertDist = Math.sqrt(dist * dist + 0);

        const startY = Math.max(0, my - GRID_RADIUS);
        const endY = Math.min(h, my + GRID_RADIUS);

        for (let segY = startY; segY < endY; segY += 2) {
          const segDist = Math.sqrt((x - mx) ** 2 + (segY - my) ** 2);
          if (segDist > GRID_RADIUS) continue;
          const alpha = (1 - segDist / GRID_RADIUS) * GRID_MAX_OPACITY;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, segY);
          ctx.lineTo(x, Math.min(segY + 3, endY));
          ctx.stroke();
        }
      }

      for (let y = 0; y <= h; y += GRID_CELL) {
        const startX = Math.max(0, mx - GRID_RADIUS);
        const endX = Math.min(w, mx + GRID_RADIUS);

        for (let segX = startX; segX < endX; segX += 2) {
          const segDist = Math.sqrt((segX - mx) ** 2 + (y - my) ** 2);
          if (segDist > GRID_RADIUS) continue;
          const alpha = (1 - segDist / GRID_RADIUS) * GRID_MAX_OPACITY;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(segX, y);
          ctx.lineTo(Math.min(segX + 3, endX), y);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!shouldReduceMotion) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────
// Navbar shell
// ─────────────────────────────────────────────

function ConceptNavbar({
  curtainContent,
}: {
  curtainContent: (props: { onClose: () => void }) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  const handleMenuToggle = () => {
    if (!isOpen) {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(width);
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${width}px`;
      setIsOpen(true);
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      setScrollbarWidth(0);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        setScrollbarWidth(0);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <header
        className="absolute top-0 right-0 left-0 z-50 flex h-20 items-center bg-transparent"
        style={{ paddingRight: scrollbarWidth > 0 ? scrollbarWidth : undefined }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div
            className="text-foreground text-2xl font-black tracking-tight"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            DRSM
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle magnetic isMenuOpen={isOpen} />
            <motion.button
              className={`magnetic flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? theme === "dark"
                    ? "bg-accent hover:bg-accent/90 border-white/50 text-white hover:border-white"
                    : "bg-accent hover:bg-accent/90 border-black/30 text-black hover:border-black/50"
                  : "border-border bg-surface text-foreground hover:border-accent hover:bg-elevated"
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="relative -mr-[10px] flex h-11 w-11 flex-col items-center justify-center gap-1.5"
              onClick={handleMenuToggle}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <motion.span
                className="bg-foreground block h-0.5 w-6"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
              />
              <motion.span
                className="bg-foreground block h-0.5 w-6"
                animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              />
              <motion.span
                className="bg-foreground block h-0.5 w-6"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
              />
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-accent fixed inset-0 z-40"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {curtainContent({ onClose: handleMenuToggle })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────
// Magnetic nav link — same pattern as MagneticButton
// Outer div tracks mouse, applies delta * strength to spring.
// Text + highlight are both inside the motion wrapper,
// so they move together as one unit.
// ─────────────────────────────────────────────

function MagneticNavLink({
  label,
  index,
  hoveredIndex,
  onHover,
  onClose,
}: {
  label: string;
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number | null) => void;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "var(--color-background)" : "#1a1a1a";
  const hoverTextColor = "#ffffff";
  const highlightColor = theme === "dark" ? "var(--color-background)" : "#1a1a1a";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const isHovered = hoveredIndex === index;
  const strength = 0.15;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.a
        href="#"
        className="group relative block cursor-pointer"
        style={{ x: springX, y: springY }}
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <span className="relative inline-block">
          <motion.span
            className="relative z-10 flex items-center justify-center text-5xl font-black md:text-6xl"
            style={{ fontFamily: DISPLAY_FONT, x: springX, y: springY }}
            initial={false}
            animate={{ color: isHovered ? hoverTextColor : textColor }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            {label}
          </motion.span>
          <motion.span
            className="absolute -inset-x-5 -inset-y-2 -z-0"
            style={{ backgroundColor: highlightColor, originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE }}
            aria-hidden="true"
          />
        </span>
      </motion.a>
    </div>
  );
}

// ─────────────────────────────────────────────
// Nav items with vertical slide reveal
// ─────────────────────────────────────────────

function CurtainNavItems({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav className="relative z-10">
      <ul className="flex flex-col items-center gap-8" role="list">
        {NAV_ITEMS.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.15 + i * 0.08,
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: EASE,
            }}
          >
            <MagneticNavLink
              label={item}
              index={i}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
              onClose={onClose}
            />
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

// ─────────────────────────────────────────────
// Rail system
// ─────────────────────────────────────────────

interface RailConfig {
  track: "rect" | "circle";
  width: number;
  height: number;
  x: string;
  y: string;
  shapes: RailShapeConfig[];
}

interface RailShapeConfig {
  type: "square" | "circle" | "triangle";
  size: number;
  color: string;
  speed: number;
  startProgress: number;
}

function getPositionOnRect(
  progress: number,
  width: number,
  height: number,
  shapeSize: number
): { x: number; y: number } {
  const p = ((progress % 1) + 1) % 1;
  const half = shapeSize / 2;
  const perimeter = 2 * (width + height);
  const dist = p * perimeter;

  if (dist <= width) return { x: width - dist - half, y: -half };
  const d2 = dist - width;
  if (d2 <= height) return { x: -half, y: d2 - half };
  const d3 = d2 - height;
  if (d3 <= width) return { x: d3 - half, y: height - half };
  const d4 = d3 - width;
  return { x: width - half, y: height - d4 - half };
}

function getPositionOnCircle(
  progress: number,
  width: number,
  height: number,
  shapeSize: number
): { x: number; y: number } {
  const p = ((progress % 1) + 1) % 1;
  const angle = p * Math.PI * 2;
  const half = shapeSize / 2;
  return {
    x: width / 2 + Math.cos(angle) * (width / 2) - half,
    y: height / 2 + Math.sin(angle) * (height / 2) - half,
  };
}

function getPositionOnTrack(
  track: "rect" | "circle",
  progress: number,
  width: number,
  height: number,
  shapeSize: number
): { x: number; y: number } {
  if (track === "circle") return getPositionOnCircle(progress, width, height, shapeSize);
  return getPositionOnRect(progress, width, height, shapeSize);
}

const SPRING_SOFT = { stiffness: 120, damping: 12 } as const;
const SPRING_HEAVY = { stiffness: 60, damping: 15 } as const;

function RailShape({
  config,
  railWidth,
  railHeight,
  track = "rect",
  containerRef,
}: {
  config: RailShapeConfig;
  railWidth: number;
  railHeight: number;
  track?: "rect" | "circle";
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const progressRef = useRef(config.startProgress);
  const isDragging = useRef(false);
  const isHovering = useRef(false);

  const railX = useMotionValue(0);
  const railY = useMotionValue(0);

  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const springHoverX = useSpring(hoverX, SPRING_SOFT);
  const springHoverY = useSpring(hoverY, SPRING_SOFT);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springDragX = useSpring(dragX, SPRING_HEAVY);
  const springDragY = useSpring(dragY, SPRING_HEAVY);

  const combinedX = useTransform(
    [springHoverX, springDragX],
    ([h, d]) => (h as number) + (d as number)
  );
  const combinedY = useTransform(
    [springHoverY, springDragY],
    ([h, d]) => (h as number) + (d as number)
  );

  const scale = useSpring(1, { stiffness: 200, damping: 15 });

  useAnimationFrame((_, delta) => {
    if (railWidth === 0 || shouldReduceMotion) return;

    if (!isDragging.current && !isHovering.current) {
      progressRef.current += (config.speed * delta) / 1000;

      const currentDragX = dragX.get();
      const currentDragY = dragY.get();
      if (Math.abs(currentDragX) > 0.5 || Math.abs(currentDragY) > 0.5) {
        dragX.set(currentDragX * 0.92);
        dragY.set(currentDragY * 0.92);
      } else if (currentDragX !== 0 || currentDragY !== 0) {
        dragX.set(0);
        dragY.set(0);
      }
    }

    const pos = getPositionOnTrack(track, progressRef.current, railWidth, railHeight, config.size);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const absX = rect.left + pos.x;
      const absY = rect.top + pos.y;
      const snappedAbsX = Math.round(absX / GRID_CELL) * GRID_CELL;
      const snappedAbsY = Math.round(absY / GRID_CELL) * GRID_CELL;
      railX.set(snappedAbsX - rect.left);
      railY.set(snappedAbsY - rect.top);
    } else {
      railX.set(pos.x);
      railY.set(pos.y);
    }
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion || isDragging.current) return;
      isHovering.current = true;
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const distX = e.clientX - (rect.left + rect.width / 2);
      const distY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist > 0) {
        const strength = Math.min(dist * 0.8, 50);
        hoverX.set((distX / dist) * strength);
        hoverY.set((distY / dist) * strength);
      }
      scale.set(1.2);
    },
    [shouldReduceMotion, hoverX, hoverY, scale]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDragging.current) {
      isHovering.current = false;
      hoverX.set(0);
      hoverY.set(0);
      scale.set(1);
    }
  }, [hoverX, hoverY, scale]);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
    isHovering.current = false;
    hoverX.set(0);
    hoverY.set(0);
    scale.set(1.4);
  }, [hoverX, hoverY, scale]);

  const handleDrag = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      dragX.set(info.offset.x);
      dragY.set(info.offset.y);
    },
    [dragX, dragY]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    scale.set(1);
  }, [scale]);

  const dragProps = {
    drag: true as const,
    dragMomentum: false,
    dragElastic: 0,
    dragConstraints: { top: 0, left: 0, right: 0, bottom: 0 },
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    role: "presentation" as const,
  };

  const s = config.size;
  const c = config.color;

  const baseStyle = { left: railX, top: railY, x: combinedX, y: combinedY, scale };
  const baseAnim = {
    initial: { opacity: 0, scale: 0 } as const,
    animate: { opacity: 1, scale: 1 } as const,
    transition: { delay: 0.3 + config.startProgress, duration: 0.6, ease: EASE },
  };

  if (config.type === "triangle") {
    return (
      <motion.div
        className="pointer-events-auto absolute cursor-grab active:cursor-grabbing"
        style={{ width: s, height: s, ...baseStyle }}
        {...baseAnim}
        {...dragProps}
      >
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${s / 2},0 ${s},${s} 0,${s}`} fill={c} />
        </svg>
      </motion.div>
    );
  }

  const shapeClass = config.type === "circle" ? "rounded-full" : "";

  return (
    <motion.div
      className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${shapeClass}`}
      style={{ width: s, height: s, backgroundColor: c, ...baseStyle }}
      {...baseAnim}
      {...dragProps}
    />
  );
}

function ShapeRail({ rail }: { rail: RailConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const trackClasses = rail.track === "circle" ? "rounded-full" : "";
  const trackTransform = "translate(-50%, -50%)";

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute border ${trackClasses}`}
      style={{
        width: rail.width,
        height: rail.height,
        left: rail.x,
        top: rail.y,
        borderColor: LINE_COLOR_SUBTLE,
        transform: trackTransform,
      }}
      aria-hidden="true"
    >
      {dims.w > 0 &&
        rail.shapes.map((shape, i) => (
          <RailShape
            key={i}
            config={shape}
            railWidth={dims.w}
            railHeight={dims.h}
            track={rail.track}
            containerRef={containerRef}
          />
        ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Curtain content — Scattered Rails
// ─────────────────────────────────────────────

const G = GRID_CELL;

const RAILS: RailConfig[] = [
  {
    track: "circle",
    width: G * 3,
    height: G * 3,
    x: "12%",
    y: "25%",
    shapes: [
      { type: "square", size: G, color: "rgba(255,255,255,0.14)", speed: 0.04, startProgress: 0.0 },
      {
        type: "circle",
        size: G / 2,
        color: "rgba(255,255,255,0.12)",
        speed: 0.04,
        startProgress: 0.5,
      },
    ],
  },
  {
    track: "rect",
    width: G * 2,
    height: G * 2,
    x: "85%",
    y: "18%",
    shapes: [
      {
        type: "triangle",
        size: G,
        color: "rgba(255,255,255,0.16)",
        speed: -0.055,
        startProgress: 0.2,
      },
      {
        type: "square",
        size: G / 2,
        color: "rgba(255,255,255,0.10)",
        speed: -0.055,
        startProgress: 0.7,
      },
    ],
  },
  {
    track: "rect",
    width: G * 4,
    height: G * 3,
    x: "80%",
    y: "72%",
    shapes: [
      { type: "circle", size: G, color: "rgba(255,255,255,0.12)", speed: 0.03, startProgress: 0.1 },
      {
        type: "square",
        size: G / 2,
        color: "rgba(255,255,255,0.16)",
        speed: 0.03,
        startProgress: 0.4,
      },
      {
        type: "triangle",
        size: G / 2,
        color: "rgba(255,255,255,0.10)",
        speed: 0.03,
        startProgress: 0.75,
      },
    ],
  },
  {
    track: "circle",
    width: G * 2,
    height: G * 2,
    x: "18%",
    y: "78%",
    shapes: [
      {
        type: "triangle",
        size: G,
        color: "rgba(255,255,255,0.14)",
        speed: -0.065,
        startProgress: 0.3,
      },
    ],
  },
  {
    track: "rect",
    width: G,
    height: G,
    x: "45%",
    y: "88%",
    shapes: [
      {
        type: "circle",
        size: G / 2,
        color: "rgba(255,255,255,0.12)",
        speed: 0.08,
        startProgress: 0.0,
      },
      {
        type: "square",
        size: G / 2,
        color: "rgba(255,255,255,0.10)",
        speed: 0.08,
        startProgress: 0.5,
      },
    ],
  },
];

function CurtainContent({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {RAILS.map((rail, i) => (
          <ShapeRail key={i} rail={rail} />
        ))}
      </div>

      <ProximityGrid />

      <nav className="relative z-10">
        <ul className="flex flex-col items-center gap-8" role="list">
          {NAV_ITEMS.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE }}
            >
              <MagneticNavLink
                label={item}
                index={i}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                onClose={onClose}
              />
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ConceptCurtainPage() {
  return (
    <section className="relative h-screen overflow-hidden">
      <ConceptNavbar curtainContent={({ onClose }) => <CurtainContent onClose={onClose} />} />
      <Hero />
    </section>
  );
}
