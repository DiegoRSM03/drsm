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

interface CursorShapeConfig {
  offsetX: number;
  offsetY: number;
  size: number;
  stiffness: number;
  damping: number;
}

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
    color: "var(--color-accent)",
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
    color: "var(--color-accent)",
    filled: true,
    floatDuration: 5,
    floatDelay: 0.6,
  },
  {
    type: "square",
    x: "18%",
    y: "25%",
    size: 70,
    color: "var(--color-accent)",
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
      <GridBackground />
      {!isTouch && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {HERO_SHAPES.map((shape, i) => (
            <ProximityShape key={`hero-shape-${i}`} shape={shape} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </div>
      )}
      {!isTouch && <CursorShapes enableMotion={enableMotion} />}

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6"
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
          Obsessed with making <span className="font-bold text-white">ideas breathe</span>
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

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}

function CursorShapes({ enableMotion = true }: { enableMotion?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);
  const smoothX = useSpring(globalMouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(globalMouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (shouldReduceMotion || !enableMotion) return;
    const handler = (e: MouseEvent) => {
      globalMouseX.set(e.clientX);
      globalMouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [globalMouseX, globalMouseY, shouldReduceMotion, enableMotion]);

  if (shouldReduceMotion || !enableMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[15]" aria-hidden="true">
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 13%, transparent) 0%, color-mix(in srgb, var(--color-accent) 4%, transparent) 45%, transparent 60%)",
        }}
      />
      {CURSOR_SHAPES.map((shape, i) => (
        <CursorFollower
          key={i}
          mouseX={globalMouseX}
          mouseY={globalMouseY}
          shape={shape}
          index={i}
        />
      ))}
    </div>
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
  const angle = useMotionValue(index * Math.PI);
  const orbitRadius = 35 + index * 10;
  const speed = 0.02 + index * 0.008;

  useEffect(() => {
    if (shouldReduceMotion) return;
    let raf: number;
    const tick = () => {
      angle.set(angle.get() + speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [angle, speed, shouldReduceMotion]);

  const orbitX = useTransform(angle, (a) => Math.cos(a) * orbitRadius);
  const orbitY = useTransform(angle, (a) => Math.sin(a) * orbitRadius);

  const targetX = useTransform(
    [mouseX, orbitX] as MotionValue<number>[],
    ([mx, ox]: number[]) => mx + ox - shape.size / 2
  );
  const targetY = useTransform(
    [mouseY, orbitY] as MotionValue<number>[],
    ([my, oy]: number[]) => my + oy - shape.size / 2
  );

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
