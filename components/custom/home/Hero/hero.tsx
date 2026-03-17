"use client";

import { useRef, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiJest } from "react-icons/si";
import { MagneticButton } from "@/components/custom/MagneticButton";
import { ProximityShape } from "@/components/custom/ProximityShape";
import type { ProximityShapeData } from "@/components/custom/ProximityShape";

function useIsTouchDevice() {
  const getSnapshot = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const getServerSnapshot = () => false;
  const subscribe = (callback: () => void) => {
    window.addEventListener("touchstart", callback, { once: true });
    return () => window.removeEventListener("touchstart", callback);
  };
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface TechItem {
  icon: typeof SiReact | null;
  label: string;
  color: string;
  showOnMobile: boolean;
}

const TECH_STACK: TechItem[] = [
  { icon: SiReact, label: "React", color: "#61DAFB", showOnMobile: true },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff", showOnMobile: true },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6", showOnMobile: false },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4", showOnMobile: false },
  { icon: SiJest, label: "Jest", color: "#C21325", showOnMobile: false },
  { icon: null, label: "Claude", color: "#D97757", showOnMobile: true },
];

interface ShapeConfig {
  x: string;
  y: string;
  mobileX?: string;
  mobileY?: string;
  size: number;
  mobileSize?: number;
  color: string;
  type: "square" | "circle" | "triangle";
  rotation: number;
  factorX: number;
  factorY: number;
  stiffness: number;
  damping: number;
  hideOnMobile: boolean;
  scrollFactor: number;
}

interface CursorShapeConfig {
  offsetX: number;
  offsetY: number;
  size: number;
  stiffness: number;
  damping: number;
}

const SOLID_SHAPES: ShapeConfig[] = [
  {
    x: "8%",
    y: "18%",
    mobileX: "10%",
    mobileY: "12%",
    size: 55,
    mobileSize: 35,
    color: "#8B5CF6",
    type: "square",
    rotation: 45,
    factorX: 0.015,
    factorY: 0.015,
    stiffness: 50,
    damping: 20,
    hideOnMobile: false,
    scrollFactor: -30,
  },
  {
    x: "92%",
    y: "15%",
    size: 45,
    color: "#06B6D4",
    type: "circle",
    rotation: 0,
    factorX: -0.025,
    factorY: -0.025,
    stiffness: 200,
    damping: 15,
    hideOnMobile: true,
    scrollFactor: 0,
  },
  {
    x: "5%",
    y: "55%",
    size: 40,
    color: "#EC4899",
    type: "square",
    rotation: 12,
    factorX: 0.02,
    factorY: 0,
    stiffness: 100,
    damping: 25,
    hideOnMobile: true,
    scrollFactor: 0,
  },
  {
    x: "95%",
    y: "50%",
    mobileX: "88%",
    mobileY: "15%",
    size: 35,
    mobileSize: 28,
    color: "#F59E0B",
    type: "triangle",
    rotation: 0,
    factorX: 0,
    factorY: 0.03,
    stiffness: 80,
    damping: 30,
    hideOnMobile: false,
    scrollFactor: 50,
  },
  {
    x: "12%",
    y: "82%",
    size: 50,
    color: "#10B981",
    type: "circle",
    rotation: 0,
    factorX: 0.012,
    factorY: -0.012,
    stiffness: 60,
    damping: 25,
    hideOnMobile: true,
    scrollFactor: 0,
  },
  {
    x: "88%",
    y: "85%",
    mobileX: "85%",
    mobileY: "88%",
    size: 48,
    mobileSize: 32,
    color: "#8B5CF6",
    type: "square",
    rotation: 20,
    factorX: 0.035,
    factorY: 0.035,
    stiffness: 300,
    damping: 20,
    hideOnMobile: false,
    scrollFactor: -60,
  },
];

const BORDERED_SHAPES: ShapeConfig[] = [
  {
    x: "18%",
    y: "25%",
    size: 70,
    color: "#8B5CF6",
    type: "square",
    rotation: 15,
    factorX: -0.012,
    factorY: 0.02,
    stiffness: 70,
    damping: 25,
    hideOnMobile: true,
    scrollFactor: 0,
  },
  {
    x: "82%",
    y: "28%",
    mobileX: "12%",
    mobileY: "85%",
    size: 55,
    mobileSize: 40,
    color: "#06B6D4",
    type: "circle",
    rotation: 0,
    factorX: 0.015,
    factorY: -0.015,
    stiffness: 120,
    damping: 20,
    hideOnMobile: false,
    scrollFactor: 40,
  },
  {
    x: "75%",
    y: "72%",
    size: 65,
    color: "#EC4899",
    type: "square",
    rotation: 30,
    factorX: -0.02,
    factorY: -0.012,
    stiffness: 90,
    damping: 22,
    hideOnMobile: true,
    scrollFactor: 0,
  },
  {
    x: "22%",
    y: "68%",
    mobileX: "8%",
    mobileY: "50%",
    size: 50,
    mobileSize: 35,
    color: "#F59E0B",
    type: "circle",
    rotation: 0,
    factorX: 0.025,
    factorY: 0.008,
    stiffness: 150,
    damping: 18,
    hideOnMobile: false,
    scrollFactor: -45,
  },
];

const CURSOR_SHAPES: CursorShapeConfig[] = [
  { offsetX: -45, offsetY: -50, size: 12, stiffness: 300, damping: 22 },
  { offsetX: 50, offsetY: 45, size: 10, stiffness: 180, damping: 18 },
];

const HERO_SHAPES: ProximityShapeData[] = [
  {
    type: "diamond",
    x: "8%",
    y: "18%",
    size: 55,
    color: "#8B5CF6",
    filled: true,
    floatDuration: 6,
    floatDelay: 0,
  },
  {
    type: "circle",
    x: "92%",
    y: "15%",
    size: 45,
    color: "#06B6D4",
    filled: true,
    floatDuration: 7.5,
    floatDelay: 0.4,
  },
  {
    type: "square",
    x: "5%",
    y: "55%",
    size: 40,
    color: "#EC4899",
    filled: true,
    floatDuration: 5.5,
    floatDelay: 0.8,
  },
  {
    type: "triangle",
    x: "95%",
    y: "50%",
    size: 35,
    color: "#F59E0B",
    filled: true,
    floatDuration: 8,
    floatDelay: 0.2,
  },
  {
    type: "circle",
    x: "12%",
    y: "82%",
    size: 50,
    color: "#10B981",
    filled: true,
    floatDuration: 6.5,
    floatDelay: 1.0,
  },
  {
    type: "diamond",
    x: "88%",
    y: "85%",
    size: 48,
    color: "#8B5CF6",
    filled: true,
    floatDuration: 5,
    floatDelay: 0.6,
  },
  {
    type: "square",
    x: "18%",
    y: "25%",
    size: 70,
    color: "#8B5CF6",
    filled: false,
    floatDuration: 7,
    floatDelay: 0.3,
  },
  {
    type: "circle",
    x: "82%",
    y: "28%",
    size: 55,
    color: "#06B6D4",
    filled: false,
    floatDuration: 6,
    floatDelay: 0.9,
  },
  {
    type: "square",
    x: "75%",
    y: "72%",
    size: 65,
    color: "#EC4899",
    filled: false,
    floatDuration: 8,
    floatDelay: 0.5,
  },
  {
    type: "circle",
    x: "22%",
    y: "68%",
    size: 50,
    color: "#F59E0B",
    filled: false,
    floatDuration: 7,
    floatDelay: 1.1,
  },
];

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const enableParallax = !shouldReduceMotion && !isTouch;

  const y1 = useTransform(scrollYProgress, [0, 1], enableParallax ? [0, -300] : [0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], enableParallax ? [0, -150] : [0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], enableParallax ? [0, -50] : [0, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enableMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      centerX.set(e.clientX - window.innerWidth / 2);
      centerY.set(e.clientY - window.innerHeight / 2);
    },
    [mouseX, mouseY, centerX, centerY, enableMotion]
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-background relative flex h-screen w-full items-center justify-center overflow-hidden"
      aria-label="Hero section introducing Diego Sanchez"
    >
      <GridBackground mouseX={mouseX} mouseY={mouseY} enableMotion={enableMotion} />
      {!isTouch && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {HERO_SHAPES.map((shape, i) => (
            <ProximityShape key={`hero-shape-${i}`} shape={shape} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </div>
      )}
      {!isTouch && (
        <CursorShapes
          mouseX={mouseX}
          mouseY={mouseY}
          enableMotion={enableMotion}
          scrollProgress={scrollYProgress}
        />
      )}

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center"
        style={{ y: y1 }}
      >
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          style={{ y: y2 }}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.5,
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          role="list"
          aria-label="Technology stack"
        >
          {TECH_STACK.map((tech, index) => (
            <MagneticPill
              key={tech.label}
              tech={tech}
              index={index}
              enableMotion={enableMotion}
              className={tech.showOnMobile ? "" : "hidden sm:flex"}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: y3 }}>
          <motion.h1
            className="text-foreground mb-2 text-6xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.8,
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            DIEGO
          </motion.h1>
          <motion.h1
            className="mb-6 text-6xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.9,
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label="Sanchez"
          >
            <span className="relative inline-block">
              <span className="text-background relative z-10">SANCHEZ</span>
              <motion.span
                className="bg-accent absolute -inset-x-4 inset-y-0"
                initial={{ scaleX: shouldReduceMotion ? 1 : 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 1.2,
                  duration: shouldReduceMotion ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden="true"
              />
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-foreground/80 mb-12 max-w-lg text-xl md:text-2xl md:whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 1.6,
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
        >
          Obsessed with making <span className="text-accent font-bold">ideas breathe</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 1.8,
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
        >
          <MagneticButton variant="primary" size="lg">
            <Download className="mr-2 h-5 w-5" aria-hidden="true" />
            Download Resume
          </MagneticButton>
          <MagneticButton variant="ghost" size="lg">
            View Projects
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 2.2 }}
        aria-hidden="true"
      >
        <motion.div
          className="text-muted flex flex-col items-center gap-2"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={
            shouldReduceMotion ? {} : { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="from-muted h-8 w-px bg-gradient-to-b to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticPill({
  tech,
  index,
  enableMotion = true,
  className = "",
}: {
  tech: TechItem;
  index: number;
  enableMotion?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const shouldAnimate = enableMotion && !shouldReduceMotion;

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !shouldAnimate) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isNextJs = tech.color === "#ffffff";

  const getBorderColor = () => {
    if (isHovered && isNextJs) {
      return isDark ? "#ffffff" : "#000000";
    }
    if (isNextJs) {
      return isDark ? "#ffffff" : "#000000";
    }
    return tech.color;
  };

  const getIconColor = () => {
    if (isHovered) {
      if (isNextJs) {
        return isDark ? "#000000" : "#ffffff";
      }
      return "#ffffff";
    }
    if (isNextJs) {
      return isDark ? "#ffffff" : "#000000";
    }
    return tech.color;
  };

  const getTextColor = () => {
    if (isHovered) {
      if (isNextJs) {
        return isDark ? "#000000" : "#ffffff";
      }
      return "#ffffff";
    }
    return isDark ? "var(--color-foreground)" : "#000000";
  };

  const getBackgroundColor = () => {
    if (isHovered) {
      if (isNextJs) {
        return isDark ? "#ffffff" : "#000000";
      }
      return tech.color;
    }
    return "var(--color-background)";
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      role="listitem"
      style={{ x: shouldAnimate ? springX : 0, y: shouldAnimate ? springY : 0 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: shouldReduceMotion ? 0 : 0.6 + index * 0.1,
        duration: shouldReduceMotion ? 0 : 0.4,
      }}
    >
      <motion.div
        className="focus-visible:ring-accent focus-visible:ring-offset-background flex cursor-pointer items-center gap-2 border-2 px-4 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        tabIndex={0}
        initial={false}
        animate={{
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
          scale: shouldAnimate && isHovered ? 1.05 : 1,
        }}
        whileTap={shouldAnimate ? { scale: 0.98 } : {}}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        aria-label={tech.label}
      >
        {tech.icon ? (
          <motion.div
            initial={false}
            animate={{ color: getIconColor() }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            aria-hidden="true"
          >
            <tech.icon className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.span
            className="text-sm font-bold"
            initial={false}
            animate={{ color: isHovered ? "#ffffff" : tech.color }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            aria-hidden="true"
          >
            {tech.label.charAt(0)}
          </motion.span>
        )}
        <motion.span
          className="text-sm font-semibold"
          initial={false}
          animate={{ color: getTextColor() }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          {tech.label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function GridBackground({
  mouseX,
  mouseY,
  enableMotion = true,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  enableMotion?: boolean;
}) {
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {enableMotion && (
        <motion.div
          className="pointer-events-none absolute h-[600px] w-[600px] rounded-full"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.13) 0%, rgba(139, 92, 246, 0.04) 45%, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}

function ReactiveShapes({
  shapes,
  centerX,
  centerY,
  scrollY,
  filled,
  enableMotion = true,
}: {
  shapes: ShapeConfig[];
  centerX: MotionValue<number>;
  centerY: MotionValue<number>;
  scrollY: MotionValue<number>;
  filled: boolean;
  enableMotion?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {shapes.map((shape, i) => (
        <ReactiveShape
          key={i}
          shape={shape}
          centerX={centerX}
          centerY={centerY}
          scrollY={scrollY}
          index={i}
          filled={filled}
          enableMotion={enableMotion}
        />
      ))}
    </div>
  );
}

function ReactiveShape({
  shape,
  centerX,
  centerY,
  scrollY,
  index,
  filled,
  enableMotion = true,
}: {
  shape: ShapeConfig;
  centerX: MotionValue<number>;
  centerY: MotionValue<number>;
  scrollY: MotionValue<number>;
  index: number;
  filled: boolean;
  enableMotion?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const shouldAnimate = enableMotion && !shouldReduceMotion;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const hiddenClass = shape.hideOnMobile ? "hidden md:block" : "";

  const offsetX = useTransform(centerX, (v) => (shouldAnimate ? v * shape.factorX : 0));
  const offsetY = useTransform(centerY, (v) => (shouldAnimate ? v * shape.factorY : 0));
  const scrollOffset = useTransform(
    scrollY,
    [0, 1],
    shouldAnimate ? [0, shape.scrollFactor] : [0, 0]
  );

  const springX = useSpring(offsetX, { stiffness: shape.stiffness, damping: shape.damping });
  const springY = useSpring(offsetY, { stiffness: shape.stiffness, damping: shape.damping });

  const currentSize = isMobile && shape.mobileSize ? shape.mobileSize : shape.size;
  const posX = isMobile && shape.mobileX ? shape.mobileX : shape.x;
  const posY = isMobile && shape.mobileY ? shape.mobileY : shape.y;

  return (
    <motion.div
      className={`absolute ${hiddenClass}`}
      style={{
        left: posX,
        top: posY,
        x: isMobile || !shouldAnimate ? 0 : springX,
        y: isMobile ? scrollOffset : shouldAnimate ? springY : 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0 }}
      animate={{ opacity: isMobile ? 0.6 : 1, scale: 1 }}
      transition={{
        delay: shouldReduceMotion ? 0 : 0.3 + index * 0.08,
        duration: shouldReduceMotion ? 0 : 0.5,
      }}
    >
      <Shape
        type={shape.type}
        size={currentSize}
        color={shape.color}
        rotation={shape.rotation}
        filled={filled}
      />
    </motion.div>
  );
}

function Shape({
  type,
  size,
  color,
  rotation,
  filled,
}: {
  type: "square" | "circle" | "triangle";
  size: number;
  color: string;
  rotation: number;
  filled: boolean;
}) {
  if (type === "circle") {
    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          backgroundColor: filled ? color : "transparent",
          border: filled ? "none" : `2px solid ${color}`,
          borderRadius: "50%",
        }}
      />
    );
  }

  if (type === "triangle") {
    if (filled) {
      return (
        <div
          aria-hidden="true"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }}
        />
      );
    }
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,10 90,90 10,90" fill="none" stroke={color} strokeWidth="3" />
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        backgroundColor: filled ? color : "transparent",
        border: filled ? "none" : `2px solid ${color}`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function CursorShapes({
  mouseX,
  mouseY,
  enableMotion = true,
  scrollProgress,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  enableMotion?: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);

  if (shouldReduceMotion || !enableMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[15]"
      style={{ opacity }}
      aria-hidden="true"
    >
      {CURSOR_SHAPES.map((shape, i) => (
        <CursorFollower key={i} mouseX={mouseX} mouseY={mouseY} shape={shape} index={i} />
      ))}
    </motion.div>
  );
}

function CursorFollower({
  mouseX,
  mouseY,
  shape,
  index,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  shape: CursorShapeConfig;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const targetX = useTransform(mouseX, (v) => v + shape.offsetX - shape.size / 2);
  const targetY = useTransform(mouseY, (v) => v + shape.offsetY - shape.size / 2);

  const x = useSpring(targetX, { stiffness: shape.stiffness, damping: shape.damping });
  const y = useSpring(targetY, { stiffness: shape.stiffness, damping: shape.damping });

  return (
    <motion.div
      className="border-accent/40 absolute top-0 left-0 border-2"
      style={{ width: shape.size, height: shape.size, x, y, rotate: 45 }}
      initial={{ opacity: shouldReduceMotion ? 0.5 : 0, scale: shouldReduceMotion ? 1 : 0 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{
        delay: shouldReduceMotion ? 0 : 1 + index * 0.1,
        duration: shouldReduceMotion ? 0 : 0.3,
      }}
      aria-hidden="true"
    />
  );
}

export { Hero };
