"use client";

import { useRef, useCallback, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
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

export interface ProjectData {
  id: number;
  title: string;
  type: string;
  description: string;
  tags: string[];
  github: string | null;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "Nexus Platform",
    type: "Enterprise SaaS Dashboard",
    description:
      "A real-time analytics platform for enterprise data pipelines. WebSocket-powered live streaming, interactive D3.js visualizations with drill-down, and granular role-based access control — processing 2M+ events per minute at sub-200ms render times.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js"],
    github: null,
  },
  {
    id: 2,
    title: "Velocity",
    type: "Performance Monitoring Tool",
    description:
      "Developer-first performance monitoring that catches regressions before production. Tracks Core Web Vitals, bundle sizes, and custom metrics with CI/CD integration — powered by a Rust ingestion layer handling 50K+ payloads per second.",
    tags: ["Next.js", "Rust", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/example/velocity",
  },
  {
    id: 3,
    title: "Artemis",
    type: "Design System Framework",
    description:
      "A design system shipping 50+ accessible components with dark mode, automatic WCAG auditing, and a Figma-to-code pipeline. Adopted by three product teams, cutting UI development time by 40%.",
    tags: ["React", "Storybook", "Figma API", "Testing Library"],
    github: null,
  },
];

const BRAND_PURPLE = "#8B5CF6";
const CARD_COUNT = PROJECTS.length;
const ease = [0.22, 1, 0.36, 1] as const;
const FLOATING_SHAPES: ProximityShapeData[] = [
  {
    type: "diamond",
    x: "8%",
    y: "20%",
    size: 36,
    color: "#8B5CF6",
    filled: true,
    floatDuration: 6,
    floatDelay: 0,
  },
  {
    type: "circle",
    x: "92%",
    y: "35%",
    size: 28,
    color: "#06B6D4",
    filled: true,
    floatDuration: 7,
    floatDelay: 0.5,
  },
  {
    type: "square",
    x: "5%",
    y: "70%",
    size: 24,
    color: "#EC4899",
    filled: false,
    floatDuration: 5.5,
    floatDelay: 1,
  },
  {
    type: "triangle",
    x: "88%",
    y: "75%",
    size: 32,
    color: "#F59E0B",
    filled: false,
    floatDuration: 8,
    floatDelay: 0.3,
  },
  {
    type: "circle",
    x: "50%",
    y: "8%",
    size: 22,
    color: "#10B981",
    filled: true,
    floatDuration: 6.5,
    floatDelay: 0.8,
  },
];

function MagneticBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      x.set(offsetX * 0.3);
      y.set(offsetY * 0.3);
    },
    [x, y, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        border: `2px solid ${BRAND_PURPLE}`,
        color: BRAND_PURPLE,
        fontFamily: "var(--font-display)",
        x: springX,
        y: springY,
        display: "inline-block",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.span>
  );
}

function SectionHeader() {
  const shouldReduceMotion = useReducedMotion();
  const titleWords = ["Pixel-Perfect,", "Battle-Tested"];

  return (
    <header className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <motion.div
        className="mb-4 overflow-clip"
        initial={{ width: shouldReduceMotion ? "auto" : 0 }}
        whileInView={{ width: "auto" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <motion.span
          className="text-foreground inline-block px-3 py-1.5 text-xs font-bold tracking-[0.2em] sm:px-4 sm:py-2"
          style={{ backgroundColor: BRAND_PURPLE, fontFamily: "var(--font-display)" }}
          initial={{ x: shouldReduceMotion ? 0 : -100 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          PROJECTS
        </motion.span>
      </motion.div>

      <h2
        id="projects-heading"
        className="text-foreground mb-4 text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {titleWords.map((word, i) => (
          <span key={i} className={`inline-block overflow-clip${i === 0 ? "mr-3 sm:mr-4" : ""}`}>
            <motion.span
              className="inline-block"
              style={{ color: i === 1 ? BRAND_PURPLE : "inherit" }}
              initial={{ y: shouldReduceMotion ? 0 : "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        className="text-foreground/80 max-w-xl text-base sm:text-lg"
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        Highlights from professional engagements and personal explorations — where clean code meets
        bold interfaces.
      </motion.p>
    </header>
  );
}

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: ProjectData;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const shouldReduceMotion = useReducedMotion();

  const BREAKPOINTS = [0, 0.2, 0.55, 1];
  const rangeStart = BREAKPOINTS[index];
  const rangeEnd = BREAKPOINTS[index + 1];

  const xSlide = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  return (
    <motion.article
      className="bg-background absolute inset-0 flex items-center overflow-clip"
      style={{
        x: shouldReduceMotion ? 0 : xSlide,
        zIndex: index,
      }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Ghost text */}
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-black whitespace-nowrap sm:text-[12rem] md:text-[16rem] lg:text-[20rem]"
        style={{
          fontFamily: "var(--font-display)",
          color: "rgba(255, 255, 255, 0.03)",
        }}
        aria-hidden="true"
      >
        {project.title}
      </span>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:gap-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20">
        {/* Image placeholder with reveal mask */}
        <div
          className="relative aspect-[4/3] w-full lg:w-[45%]"
          role="img"
          aria-label={`${project.title} project preview`}
        >
          <motion.div
            className="absolute inset-0 z-10"
            style={{ backgroundColor: BRAND_PURPLE, originX: 0 }}
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: 0.2,
              ease,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.01, delay: 0.2 }}
          >
            <div className="bg-foreground/[0.04] absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-6xl font-black sm:text-7xl md:text-8xl lg:text-9xl"
                style={{
                  color: "rgba(255, 255, 255, 0.06)",
                  fontFamily: "var(--font-display)",
                }}
                aria-hidden="true"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-[55%]">
          {/* Type badge */}
          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <MagneticBadge className="px-2.5 py-1 text-xs font-bold tracking-wide sm:px-3 sm:py-1.5">
              {project.type.toUpperCase()}
            </MagneticBadge>
          </motion.div>

          {/* Title */}
          <motion.div className="mb-3 overflow-clip sm:mb-4">
            <motion.h3
              id={`project-title-${project.id}`}
              className="text-foreground text-2xl font-black sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ y: shouldReduceMotion ? 0 : "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              {project.title}
            </motion.h3>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-foreground/80 mb-4 max-w-lg text-sm leading-relaxed sm:mb-6 sm:text-base md:text-lg"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.ul
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 sm:mb-8 sm:gap-x-3 sm:gap-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            aria-label={`Technologies used in ${project.title}`}
          >
            {project.tags.map((tag, i) => (
              <motion.li
                key={tag}
                className="flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.06, ease }}
              >
                <span className="text-foreground/60 text-xs font-medium sm:text-sm">{tag}</span>
                {i < project.tags.length - 1 && (
                  <span className="bg-foreground/30 h-1 w-1 rotate-45" aria-hidden="true" />
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              aria-label={`View ${project.title} project details`}
            >
              <span>View Project</span>
              <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </MagneticButton>
            {project.github && (
              <MagneticButton
                variant="ghost"
                size="lg"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY, isTouch]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-background border-foreground/[0.08] relative border-t"
      style={{ height: `${CARD_COUNT * 100}vh` }}
      aria-labelledby="projects-heading"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <SectionHeader />

        <div
          role="list"
          aria-label="Project cards"
          className="border-foreground/[0.08] relative flex-1 border-t"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Proximity-reactive floating shapes */}
          {!isTouch && (
            <div className="pointer-events-none absolute inset-0 z-[20]" aria-hidden="true">
              {FLOATING_SHAPES.map((shape, i) => (
                <ProximityShape key={i} shape={shape} mouseX={mouseX} mouseY={mouseY} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
