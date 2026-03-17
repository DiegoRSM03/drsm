"use client";

import { useRef, useCallback, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  MotionValue,
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
      "A real-time analytics platform with WebSocket data streaming, complex data visualizations, and role-based access control.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js"],
    color: "#10B981",
    github: null,
  },
  {
    id: 2,
    title: "Velocity",
    type: "Performance Monitoring Tool",
    description:
      "Developer-focused performance monitoring with real-time metrics, custom alerts, and CI/CD integration for frontend applications.",
    tags: ["Next.js", "Rust", "PostgreSQL", "Redis", "Docker"],
    color: "#06B6D4",
    github: "https://github.com/example/velocity",
  },
  {
    id: 3,
    title: "Artemis",
    type: "Design System Framework",
    description:
      "A comprehensive design system with 50+ components, dark mode support, and automatic accessibility auditing built-in.",
    tags: ["React", "Storybook", "Figma API", "Testing Library"],
    color: "#EC4899",
    github: null,
  },
];

const BRAND_PURPLE = "#8B5CF6";
const CARD_COUNT = PROJECTS.length;
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

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: ProjectData;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scale = useTransform(progress, range, [1, targetScale]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgSpringX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const imgSpringY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || shouldReduceMotion) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.06;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.06;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <div className="sticky top-0 flex h-screen items-center" role="listitem">
      <motion.article
        className="relative w-full origin-top bg-black"
        style={{
          scale: shouldReduceMotion ? 1 : springScale,
          top: `calc(-5vh + ${index * 28}px)`,
        }}
        aria-labelledby={`project-title-${project.id}`}
      >
        <div
          className={`relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:gap-12 md:py-16 lg:flex-row lg:gap-16 lg:py-20 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image placeholder */}
          <motion.div
            ref={imageRef}
            className="relative aspect-[4/3] w-full lg:w-[45%]"
            style={{ x: imgSpringX }}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            role="img"
            aria-label={`${project.title} project preview`}
          >
            <motion.div className="absolute inset-0 overflow-clip" style={{ y: imgSpringY }}>
              <div className="absolute inset-0" style={{ backgroundColor: `${project.color}20` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-6xl font-black sm:text-7xl md:text-8xl lg:text-9xl"
                  style={{
                    color: `${project.color}30`,
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

            {/* Decorative accent block */}
            <motion.div
              className="absolute h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
              style={{
                backgroundColor: project.color,
                bottom: "-1rem",
                [isEven ? "right" : "left"]: "-1rem",
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease }}
              aria-hidden="true"
            />

            {/* Decorative diamond accent */}
            <motion.div
              className="absolute h-4 w-4 rotate-45 sm:h-5 sm:w-5 md:h-6 md:w-6"
              style={{
                backgroundColor: project.color,
                top: "-0.5rem",
                [isEven ? "left" : "right"]: "20%",
              }}
              initial={{ scale: 0, rotate: 45 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8, ease }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-[55%]">
            {/* Decorative project number */}
            <motion.div
              className="mb-4 flex items-center gap-4 sm:mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              aria-hidden="true"
            >
              <span
                className="text-5xl font-black sm:text-6xl md:text-7xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: project.color,
                  opacity: 0.3,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>

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

  // Single scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

      {/* Stacked cards - no overflow hidden! */}
      <div role="list" aria-label="Project cards">
        {PROJECTS.map((project, index) => {
          const targetScale = 1 - (CARD_COUNT - index) * 0.04;
          const rangeStart = index * (1 / CARD_COUNT);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
              range={[rangeStart, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
