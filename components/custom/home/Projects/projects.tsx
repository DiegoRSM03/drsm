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
  color: string;
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
    color: "#059669",
    github: null,
  },
  {
    id: 2,
    title: "Velocity",
    type: "Performance Monitoring Tool",
    description:
      "Developer-first performance monitoring that catches regressions before production. Tracks Core Web Vitals, bundle sizes, and custom metrics with CI/CD integration — powered by a Rust ingestion layer handling 50K+ payloads per second.",
    tags: ["Next.js", "Rust", "PostgreSQL", "Redis", "Docker"],
    color: "#0891B2",
    github: "https://github.com/example/velocity",
  },
  {
    id: 3,
    title: "Artemis",
    type: "Design System Framework",
    description:
      "A design system shipping 50+ accessible components with dark mode, automatic WCAG auditing, and a Figma-to-code pipeline. Adopted by three product teams, cutting UI development time by 40%.",
    tags: ["React", "Storybook", "Figma API", "Testing Library"],
    color: "#DB2777",
    github: null,
  },
];

const BRAND_PURPLE = "#8B5CF6";
const ease = [0.22, 1, 0.36, 1] as const;

function MagneticBadge({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
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
        backgroundColor: color,
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
          className="inline-block px-3 py-1.5 text-xs font-bold tracking-[0.2em] text-white sm:px-4 sm:py-2"
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
        className="mb-4 text-3xl font-black text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
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
        className="max-w-xl text-base text-white/80 sm:text-lg"
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

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const springGhostY = useSpring(ghostY, { stiffness: 80, damping: 30 });

  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="sticky top-0 flex h-screen items-center" role="listitem">
      <motion.article
        className="bg-background relative w-full origin-top overflow-clip border-t border-white/[0.08]"
        style={{
          top: `calc(-20vh + ${index * 28}px)`,
        }}
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Ghost text */}
        <motion.span
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-black whitespace-nowrap sm:text-[12rem] md:text-[16rem] lg:text-[20rem]"
          style={{
            fontFamily: "var(--font-display)",
            color: "rgba(255, 255, 255, 0.03)",
            y: shouldReduceMotion ? 0 : springGhostY,
          }}
          aria-hidden="true"
        >
          {project.title}
        </motion.span>

        <div
          className={`relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:gap-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image placeholder with reveal mask */}
          <div
            className="relative aspect-[4/3] w-full lg:w-[45%]"
            role="img"
            aria-label={`${project.title} project preview`}
          >
            <motion.div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: project.color, originX: isEven ? 0 : 1 }}
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
              <div className="absolute inset-0 bg-white/[0.04]" />
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
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              <MagneticBadge
                color={project.color}
                className="px-2.5 py-1 text-xs font-bold tracking-wide text-white sm:px-3 sm:py-1.5"
              >
                {project.type.toUpperCase()}
              </MagneticBadge>
            </motion.div>

            {/* Title */}
            <motion.div className="mb-3 overflow-clip sm:mb-4">
              <motion.h3
                id={`project-title-${project.id}`}
                className="text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl"
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
              className="mb-4 max-w-lg text-sm leading-relaxed text-white/80 sm:mb-6 sm:text-base md:text-lg"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              {project.description}
            </motion.p>

            {/* Tags as proper list */}
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
                  <span className="text-xs font-medium sm:text-sm" style={{ color: project.color }}>
                    {tag}
                  </span>
                  {i < project.tags.length - 1 && (
                    <span
                      className="h-1 w-1 rotate-45"
                      style={{ backgroundColor: project.color }}
                      aria-hidden="true"
                    />
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
    </div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      centerX.set(e.clientX - window.innerWidth / 2);
      centerY.set(e.clientY - window.innerHeight / 2);
    },
    [centerX, centerY, isTouch]
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-background relative border-t border-white/[0.08]"
      aria-labelledby="projects-heading"
    >
      <SectionHeader />

      <div role="list" aria-label="Project cards">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
