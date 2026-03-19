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
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { useTheme } from "@/contexts";
import { useIsTouchDevice } from "@/hooks";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAV_KEYS = ["projects", "experience", "about", "contact"] as const;
const GRID_CELL = 100;
const GRID_RADIUS = 400;
const GRID_MAX_OPACITY = 0.35;
const LINE_COLOR_SUBTLE = "rgba(255,255,255,0.25)";
const SPRING_SOFT = { stiffness: 120, damping: 12 } as const;
const SPRING_HEAVY = { stiffness: 60, damping: 15 } as const;

// ─────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────

function MagneticLetter({
  letter,
  index,
  isHovered,
  mouseX,
  mouseY,
  enableMotion = true,
}: {
  letter: string;
  index: number;
  isHovered: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  enableMotion?: boolean;
}) {
  const positions = [
    { x: -6, y: -7 },
    { x: 0, y: 7 },
    { x: 12, y: -7 },
    { x: 18, y: 7 },
  ];

  const factors = [
    { x: 0.25, y: 0.3 },
    { x: 0.35, y: 0.2 },
    { x: 0.2, y: 0.35 },
    { x: 0.3, y: 0.25 },
  ];

  const factor = factors[index];
  const position = positions[index];

  const springConfig = { stiffness: 150 - index * 20, damping: 15 + index * 2 };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const magneticX = useTransform(springX, (val) => (enableMotion ? val * factor.x : 0));
  const magneticY = useTransform(springY, (val) => (enableMotion ? val * factor.y : 0));

  return (
    <motion.span
      className="inline-block"
      animate={{
        x: enableMotion && isHovered ? position.x : 0,
        y: enableMotion && isHovered ? position.y : 0,
      }}
      transition={{ duration: enableMotion ? 0.35 : 0, ease: EASE }}
    >
      <motion.span className="inline-block" style={{ x: magneticX, y: magneticY }}>
        {letter}
      </motion.span>
    </motion.span>
  );
}

function MagneticLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = ["D", "R", "S", "M"];
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const t = useTranslations("nav");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !enableMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative -ml-2 cursor-pointer px-2 py-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={t("home")}
    >
      <motion.div
        className="text-foreground flex items-center text-2xl font-black tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        {letters.map((letter, i) => (
          <MagneticLetter
            key={i}
            letter={letter}
            index={i}
            isHovered={isHovered}
            mouseX={mouseX}
            mouseY={mouseY}
            enableMotion={enableMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Language toggle
// ─────────────────────────────────────────────

function LanguageToggle({
  className = "",
  isMenuOpen = false,
}: {
  className?: string;
  isMenuOpen?: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !enableMotion) return;
    const rect = buttonRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSwitch = () => {
    router.replace(pathname, { locale: locale === "en" ? "es" : "en" });
  };

  const menuIconColor = isMenuOpen ? (theme === "dark" ? "#ffffff" : "#000000") : undefined;

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleSwitch}
      className={`magnetic focus-visible:ring-accent focus-visible:ring-offset-background flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
        isMenuOpen
          ? theme === "dark"
            ? "bg-accent hover:bg-accent/90 border-white/50 text-white hover:border-white"
            : "bg-accent hover:bg-accent/90 border-black/30 text-black hover:border-black/50"
          : "border-border bg-surface text-foreground hover:border-accent hover:bg-elevated"
      } ${className}`}
      whileTap={enableMotion ? { scale: 0.95 } : {}}
      aria-label={t("toggleLanguage")}
    >
      <motion.div
        style={{
          x: enableMotion ? springX : 0,
          y: enableMotion ? springY : 0,
          color: menuIconColor,
        }}
      >
        <Globe className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// Hamburger
// ─────────────────────────────────────────────

function Hamburger({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("nav");

  return (
    <motion.button
      className="focus-visible:ring-accent focus-visible:ring-offset-background relative -mr-[10px] flex h-11 w-11 flex-col items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      onClick={onClick}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      aria-label={isOpen ? t("closeMenu") : t("openMenu")}
      aria-expanded={isOpen}
      aria-controls="main-menu"
    >
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
        aria-hidden="true"
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        aria-hidden="true"
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: EASE }}
        aria-hidden="true"
      />
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// Proximity Grid
// ─────────────────────────────────────────────

function StaticGrid() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="curtain-grid"
            width={GRID_CELL}
            height={GRID_CELL}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${GRID_CELL} 0 L 0 0 0 ${GRID_CELL}`}
              fill="none"
              stroke={`rgba(255,255,255,${GRID_MAX_OPACITY})`}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#curtain-grid)" />
      </svg>
    </div>
  );
}

function ProximityGridCanvas() {
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
        if (Math.abs(x - mx) > GRID_RADIUS) continue;
        const startY = Math.max(0, my - GRID_RADIUS);
        const endY = Math.min(h, my + GRID_RADIUS);
        for (let segY = startY; segY < endY; segY += 2) {
          const segDist = Math.sqrt((x - mx) ** 2 + (segY - my) ** 2);
          if (segDist > GRID_RADIUS) continue;
          ctx.strokeStyle = `rgba(255,255,255,${(1 - segDist / GRID_RADIUS) * GRID_MAX_OPACITY})`;
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
          ctx.strokeStyle = `rgba(255,255,255,${(1 - segDist / GRID_RADIUS) * GRID_MAX_OPACITY})`;
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function ProximityGrid() {
  const isTouch = useIsTouchDevice();
  if (isTouch) return <StaticGrid />;
  return <ProximityGridCanvas />;
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
      railX.set(Math.round(absX / GRID_CELL) * GRID_CELL - rect.left);
      railY.set(Math.round(absY / GRID_CELL) * GRID_CELL - rect.top);
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
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true">
          <polygon points={`${s / 2},0 ${s},${s} 0,${s}`} fill={c} />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${config.type === "circle" ? "rounded-full" : ""}`}
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

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute border ${rail.track === "circle" ? "rounded-full" : ""}`}
      style={{
        width: rail.width,
        height: rail.height,
        left: rail.x,
        top: rail.y,
        borderColor: LINE_COLOR_SUBTLE,
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
// Rail blueprints
// ─────────────────────────────────────────────

interface RailBlueprint {
  track: "rect" | "circle";
  widthCells: number;
  heightCells: number;
  xPct: number;
  yPct: number;
  shapes: RailShapeConfig[];
}

const G = GRID_CELL;

const RAIL_BLUEPRINTS: RailBlueprint[] = [
  {
    track: "circle",
    widthCells: 3,
    heightCells: 3,
    xPct: 5,
    yPct: 8,
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
    widthCells: 2,
    heightCells: 2,
    xPct: 72,
    yPct: 5,
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
    widthCells: 4,
    heightCells: 3,
    xPct: 65,
    yPct: 60,
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
    widthCells: 2,
    heightCells: 2,
    xPct: 8,
    yPct: 65,
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
    widthCells: 1,
    heightCells: 1,
    xPct: 40,
    yPct: 82,
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

function useGridSnappedRails(): RailConfig[] {
  const [rails, setRails] = useState<RailConfig[]>([]);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setRails(
        RAIL_BLUEPRINTS.map((bp) => ({
          track: bp.track,
          width: bp.widthCells * G,
          height: bp.heightCells * G,
          x: `${Math.round(((bp.xPct / 100) * vw) / G) * G}px`,
          y: `${Math.round(((bp.yPct / 100) * vh) / G) * G}px`,
          shapes: bp.shapes,
        }))
      );
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return rails;
}

// ─────────────────────────────────────────────
// Magnetic nav link
// ─────────────────────────────────────────────

interface MagneticNavLinkProps {
  navKey: (typeof NAV_KEYS)[number];
  index: number;
  hoveredIndex: number | null;
  focusedIndex: number | null;
  onHover: (i: number | null) => void;
  onFocus: (i: number | null) => void;
  onClose: () => void;
}

function MagneticNavLink({
  navKey,
  index,
  hoveredIndex,
  focusedIndex,
  onHover,
  onFocus,
  onClose,
}: MagneticNavLinkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const { theme } = useTheme();
  const t = useTranslations("nav");

  const textColor = theme === "dark" ? "var(--color-background)" : "#1a1a1a";
  const highlightColor = theme === "dark" ? "var(--color-background)" : "#1a1a1a";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const isHighlighted = hoveredIndex === index || focusedIndex === index;
  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !enableMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15);
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
        href={`#${navKey}`}
        className="group relative block cursor-pointer focus-visible:outline-none"
        style={{ x: enableMotion ? springX : 0, y: enableMotion ? springY : 0 }}
        onClick={onClose}
        onFocus={() => onFocus(index)}
        onBlur={() => onFocus(null)}
      >
        <span className="relative inline-block">
          <motion.span
            className="relative z-10 flex items-center justify-center text-5xl font-black md:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              x: enableMotion ? springX : 0,
              y: enableMotion ? springY : 0,
            }}
            initial={false}
            animate={{ color: isHighlighted ? "#ffffff" : textColor }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            {t(navKey)}
          </motion.span>
          <motion.span
            className="absolute -inset-x-5 -inset-y-2 -z-0"
            style={{ backgroundColor: highlightColor, originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHighlighted ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE }}
            aria-hidden="true"
          />
        </span>
      </motion.a>
    </div>
  );
}

// ─────────────────────────────────────────────
// Curtain content
// ─────────────────────────────────────────────

function CurtainContent({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const rails = useGridSnappedRails();

  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {rails.map((rail, i) => (
          <ShapeRail key={i} rail={rail} />
        ))}
      </div>

      <ProximityGrid />

      <nav className="relative z-10" aria-label="Main navigation">
        <ul className="flex flex-col items-center justify-center gap-8 pt-20" role="list">
          {NAV_KEYS.map((key, i) => (
            <motion.li
              key={key}
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
                navKey={key}
                index={i}
                hoveredIndex={hoveredIndex}
                focusedIndex={focusedIndex}
                onHover={setHoveredIndex}
                onFocus={setFocusedIndex}
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
// Navbar
// ─────────────────────────────────────────────

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex h-20 items-center transition-[background-color] duration-500 ${
          scrolled && !isOpen ? "bg-surface" : "bg-transparent"
        } ${className}`}
        style={{ paddingRight: scrollbarWidth > 0 ? scrollbarWidth : undefined }}
        role="banner"
      >
        <motion.div
          className="bg-border absolute right-0 bottom-0 left-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled && !isOpen ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <MagneticLogo />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle magnetic isMenuOpen={isOpen} />
            <LanguageToggle isMenuOpen={isOpen} />
            <Hamburger isOpen={isOpen} onClick={handleMenuToggle} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="main-menu"
            className="bg-accent fixed inset-0 z-40"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <CurtainContent onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Navbar };
