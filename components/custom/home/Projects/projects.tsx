"use client";

import { useRef, useCallback, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
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
      "A real-time analytics platform built for enterprise teams managing large-scale data pipelines. Features WebSocket-powered live data streaming, interactive D3.js visualizations with drill-down capabilities, and granular role-based access control. The dashboard processes over 2M events per minute while maintaining sub-200ms render times across all chart types.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js"],
    color: "#059669",
    github: null,
  },
  {
    id: 2,
    title: "Velocity",
    type: "Performance Monitoring Tool",
    description:
      "A developer-first performance monitoring suite designed to catch regressions before they hit production. Tracks Core Web Vitals, custom metrics, and bundle sizes across every deploy with automated CI/CD integration. Features a Rust-powered ingestion layer that handles thousands of metric payloads per second, paired with a Next.js dashboard for real-time alerting and historical trend analysis.",
    tags: ["Next.js", "Rust", "PostgreSQL", "Redis", "Docker"],
    color: "#0891B2",
    github: "https://github.com/example/velocity",
  },
  {
    id: 3,
    title: "Artemis",
    type: "Design System Framework",
    description:
      "A comprehensive design system powering consistent UI across multiple product lines. Ships 50+ accessible components with full dark mode support, automatic WCAG auditing, and a Figma-to-code pipeline that keeps design and engineering in sync. Adopted by three product teams and reduced UI development time by 40% while eliminating visual inconsistencies across applications.",
    tags: ["React", "Storybook", "Figma API", "Testing Library"],
    color: "#DB2777",
    github: null,
  },
];

const SHAPE_COLORS = ["#8B5CF6", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"];

interface FloatingShape {
  type: "square" | "diamond" | "circle" | "triangle";
  top: string;
  left: string;
  size: number;
  filled: boolean;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

function getShapesForProject(_color: string, index: number): FloatingShape[] {
  const isEven = index % 2 === 0;
  const c = SHAPE_COLORS;
  return [
    {
      type: "diamond",
      top: "-10%",
      left: isEven ? "12%" : "78%",
      size: 40,
      filled: true,
      delay: 0.6,
      duration: 5,
      color: c[0],
      opacity: 0.45,
    },
    {
      type: "circle",
      top: "8%",
      left: isEven ? "88%" : "2%",
      size: 56,
      filled: false,
      delay: 0.9,
      duration: 7,
      color: c[1],
      opacity: 0.3,
    },
    {
      type: "square",
      top: "78%",
      left: isEven ? "92%" : "-2%",
      size: 32,
      filled: true,
      delay: 0.7,
      duration: 6,
      color: c[2],
      opacity: 0.4,
    },
    {
      type: "triangle",
      top: "92%",
      left: isEven ? "22%" : "68%",
      size: 36,
      filled: false,
      delay: 1.0,
      duration: 8,
      color: c[3],
      opacity: 0.35,
    },
    {
      type: "circle",
      top: "45%",
      left: isEven ? "-6%" : "96%",
      size: 24,
      filled: true,
      delay: 0.5,
      duration: 6,
      color: c[4],
      opacity: 0.5,
    },
    {
      type: "diamond",
      top: "-6%",
      left: isEven ? "58%" : "32%",
      size: 18,
      filled: false,
      delay: 1.1,
      duration: 7,
      color: c[0],
      opacity: 0.35,
    },
    {
      type: "square",
      top: "30%",
      left: isEven ? "-8%" : "98%",
      size: 48,
      filled: false,
      delay: 0.8,
      duration: 5.5,
      color: c[1],
      opacity: 0.25,
    },
    {
      type: "triangle",
      top: "-12%",
      left: isEven ? "80%" : "10%",
      size: 28,
      filled: true,
      delay: 1.2,
      duration: 6.5,
      color: c[2],
      opacity: 0.4,
    },
  ];
}

const BRAND_PURPLE = "#8B5CF6";
const ease = [0.22, 1, 0.36, 1] as const;

function SectionHeader() {
  const shouldReduceMotion = useReducedMotion();
  const titleWords = ["Pixel-Perfect,", "Battle-Tested"];

  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
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
          <span key={i} className="inline-block overflow-clip">
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
            {i === 0 && " "}
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

  const isEven = index % 2 === 0;
  const shapes = getShapesForProject(project.color, index);

  return (
    <div className="sticky top-0 flex h-screen items-center" role="listitem">
      <motion.article
        className="relative w-full origin-top bg-black"
        style={{
          top: `calc(-5vh + ${index * 28}px)`,
        }}
        aria-labelledby={`project-title-${project.id}`}
      >
        <div
          className={`relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:gap-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image placeholder with floating shapes */}
          <motion.div
            className="relative aspect-[4/3] w-full lg:w-[45%]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            role="img"
            aria-label={`${project.title} project preview`}
          >
            <div className="absolute inset-0 overflow-clip">
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
            </div>

            {/* Floating geometric shapes */}
            {shapes.map((shape, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ top: shape.top, left: shape.left }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: shape.opacity }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shape.delay, ease }}
                aria-hidden="true"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut" }}
                >
                  {shape.type === "square" && (
                    <div
                      style={{
                        width: shape.size,
                        height: shape.size,
                        ...(shape.filled
                          ? { backgroundColor: shape.color }
                          : { border: `2px solid ${shape.color}`, backgroundColor: "transparent" }),
                      }}
                    />
                  )}
                  {shape.type === "diamond" && (
                    <div
                      style={{
                        width: shape.size,
                        height: shape.size,
                        transform: "rotate(45deg)",
                        ...(shape.filled
                          ? { backgroundColor: shape.color }
                          : { border: `2px solid ${shape.color}`, backgroundColor: "transparent" }),
                      }}
                    />
                  )}
                  {shape.type === "circle" && (
                    <div
                      style={{
                        width: shape.size,
                        height: shape.size,
                        borderRadius: "50%",
                        ...(shape.filled
                          ? { backgroundColor: shape.color }
                          : { border: `2px solid ${shape.color}`, backgroundColor: "transparent" }),
                      }}
                    />
                  )}
                  {shape.type === "triangle" && shape.filled && (
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: `${shape.size / 2}px solid transparent`,
                        borderRight: `${shape.size / 2}px solid transparent`,
                        borderBottom: `${shape.size}px solid ${shape.color}`,
                      }}
                    />
                  )}
                  {shape.type === "triangle" && !shape.filled && (
                    <svg
                      width={shape.size}
                      height={shape.size}
                      viewBox={`0 0 ${shape.size} ${shape.size}`}
                      fill="none"
                    >
                      <polygon
                        points={`${shape.size / 2},0 ${shape.size},${shape.size} 0,${shape.size}`}
                        stroke={shape.color}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

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
              <span
                className="inline-block px-2.5 py-1 text-xs font-bold tracking-wide text-white sm:px-3 sm:py-1.5"
                style={{ backgroundColor: project.color, fontFamily: "var(--font-display)" }}
              >
                {project.type.toUpperCase()}
              </span>
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
      className="relative"
      style={{ backgroundColor: "#000" }}
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
