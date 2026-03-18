"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
  useAnimationFrame,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const ACCENT = "#8B5CF6";
const CYAN = "#06B6D4";
const PINK = "#EC4899";
const GREEN = "#10B981";
const ease = [0.22, 1, 0.36, 1] as const;

// ============================================================================
// Section Header — matches Projects/Experience pattern
// ============================================================================

function SectionHeader({ isInView }: { isInView: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const titleWords = ["The Person", "Behind The Pixels"];

  return (
    <header className="border-foreground/[0.08] border-y py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Section tag — matches Projects pattern */}
        <motion.div
          className="mb-4 overflow-clip"
          initial={{ width: shouldReduceMotion ? "auto" : 0 }}
          animate={isInView ? { width: "auto" } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <motion.span
            className="text-foreground inline-block px-3 py-1.5 text-xs font-bold tracking-[0.2em] sm:px-4 sm:py-2"
            style={{ backgroundColor: ACCENT, fontFamily: "var(--font-display)" }}
            initial={{ x: shouldReduceMotion ? 0 : -100 }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            ABOUT
          </motion.span>
        </motion.div>

        <h2
          id="about-heading"
          className="text-foreground mb-3 text-2xl font-black sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className={`inline-block overflow-clip${i === 0 ? "mr-2 sm:mr-3 md:mr-4" : ""}`}
            >
              <motion.span
                className="inline-block"
                style={{ color: i === 1 ? ACCENT : "inherit" }}
                initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="text-foreground/80 max-w-xl text-sm sm:text-base lg:text-lg"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease }}
        >
          The story behind the code — who I am, how I think, and what drives me to build interfaces
          that feel alive.
        </motion.p>
      </div>
    </header>
  );
}

// ============================================================================
// Rail Shape — slides anticlockwise along photo edges, magnetic on hover
// ============================================================================

interface RailShapeConfig {
  size: number;
  color: string;
  speed: number;
  startProgress: number;
  className: string;
}

function getPositionOnRail(
  progress: number,
  width: number,
  height: number,
  shapeSize: number
): { x: number; y: number } {
  const p = ((progress % 1) + 1) % 1;
  const half = shapeSize / 2;

  const perimeter = 2 * (width + height);
  const dist = p * perimeter;

  if (dist <= width) {
    return { x: width - dist - half, y: -half };
  }
  const d2 = dist - width;
  if (d2 <= height) {
    return { x: -half, y: d2 - half };
  }
  const d3 = d2 - height;
  if (d3 <= width) {
    return { x: d3 - half, y: height - half };
  }
  const d4 = d3 - width;
  return { x: width - half, y: height - d4 - half };
}

function RailShape({
  config,
  containerWidth,
  containerHeight,
  isInView,
}: {
  config: RailShapeConfig;
  containerWidth: number;
  containerHeight: number;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const progressRef = useRef(config.startProgress);
  const isDragging = useRef(false);
  const isHovering = useRef(false);

  const railX = useMotionValue(0);
  const railY = useMotionValue(0);

  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const springHoverX = useSpring(hoverX, { stiffness: 120, damping: 12 });
  const springHoverY = useSpring(hoverY, { stiffness: 120, damping: 12 });

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springDragX = useSpring(dragX, { stiffness: 60, damping: 15 });
  const springDragY = useSpring(dragY, { stiffness: 60, damping: 15 });

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
    if (!isInView || containerWidth === 0 || shouldReduceMotion) return;

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

    const pos = getPositionOnRail(
      progressRef.current,
      containerWidth,
      containerHeight,
      config.size
    );
    railX.set(pos.x);
    railY.set(pos.y);
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduceMotion || isDragging.current) return;
      isHovering.current = true;

      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
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

  return (
    <motion.div
      className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing ${config.className}`}
      style={{
        width: config.size,
        height: config.size,
        backgroundColor: config.color,
        left: railX,
        top: railY,
        x: combinedX,
        y: combinedY,
        scale,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 1.6, ease }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    />
  );
}

function RailShapesContainer({ isInView }: { isInView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const shapes: RailShapeConfig[] = [
    { size: 44, color: ACCENT, speed: 0.03, startProgress: 0.05, className: "" },
    { size: 20, color: CYAN, speed: 0.045, startProgress: 0.35, className: "rotate-45" },
    { size: 16, color: PINK, speed: 0.035, startProgress: 0.65, className: "rounded-full" },
    { size: 24, color: GREEN, speed: 0.025, startProgress: 0.85, className: "rotate-45" },
  ];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden md:block"
      aria-hidden="true"
    >
      {dimensions.width > 0 &&
        shapes.map((config, i) => (
          <RailShape
            key={i}
            config={config}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            isInView={isInView}
          />
        ))}
    </div>
  );
}

// ============================================================================
// About Section
// ============================================================================

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.15", "end 0.6"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-30, 30]);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [30, -30]);

  const words =
    "I'm Diego — a Senior Frontend Engineer with 8+ years building interfaces that feel alive. Based in Mexico City, shipping globally. I obsess over the details that most people never notice — the easing curve that makes a transition feel natural, the millisecond that separates fast from instant, the whitespace that lets content breathe.".split(
      " "
    );

  const totalWords = words.length;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28 lg:py-36"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-labelledby="about-heading"
    >
      <SectionHeader isInView={isInView} />

      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 md:pt-12 lg:pt-16">
        <div className="relative flex flex-col-reverse gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-20">
          {/* Left: Scroll-driven word reveal */}
          <motion.div
            className="flex w-full flex-col justify-center lg:w-[55%]"
            style={{ y: textY }}
          >
            <p
              className="text-xl leading-snug font-black sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {words.map((word, i) => {
                const start = (i / totalWords) * 0.75;
                const end = start + 0.75 / totalWords;
                return (
                  <ScrollWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </p>

            {/* Scroll hint */}
            <motion.div
              className="mt-8 flex items-center gap-3 sm:mt-10 md:mt-12"
              style={{ color: "var(--color-muted)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              aria-hidden="true"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Scroll to reveal
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Photo with bottom-up clip-path reveal */}
          <motion.div className="relative w-full lg:w-[45%]" style={{ y: photoY }}>
            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden"
              initial={{ clipPath: shouldReduceMotion ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
              transition={{ duration: 1.4, delay: 0.6, ease }}
            >
              <Image
                src="/about-avatar.png"
                alt="Diego Sanchez — Senior Frontend Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 45vw"
                priority
              />
            </motion.div>

            <RailShapesContainer isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ScrollWord — scroll-driven word opacity reveal
// ============================================================================

function ScrollWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["var(--color-muted)", "var(--color-foreground)"]
  );

  const highlights = ["alive.", "natural,", "instant,", "breathe."];
  const isHighlight = highlights.includes(word);

  return (
    <motion.span
      className="mr-[0.3em] inline-block"
      style={{ opacity, color: isHighlight ? ACCENT : color }}
    >
      {word}
    </motion.span>
  );
}
