"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { MagneticButton } from "@/components/custom/MagneticButton";

const PROJECTS = [
  {
    id: 1,
    title: "Nexus Platform",
    type: "Enterprise SaaS Dashboard",
    description:
      "A real-time analytics platform with WebSocket data streaming, complex data visualizations, and role-based access control.",
    tags: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js"],
    image: "/projects/nexus.jpg",
    color: "#06B6D4",
    github: null,
  },
  {
    id: 2,
    title: "Velocity",
    type: "Performance Monitoring Tool",
    description:
      "Developer-focused performance monitoring with real-time metrics, custom alerts, and CI/CD integration for frontend applications.",
    tags: ["Next.js", "Rust", "PostgreSQL", "Redis", "Docker"],
    image: "/projects/velocity.jpg",
    color: "#EC4899",
    github: "https://github.com/example/velocity",
  },
  {
    id: 3,
    title: "Artemis",
    type: "Design System Framework",
    description:
      "A comprehensive design system with 50+ components, dark mode support, and automatic accessibility auditing built-in.",
    tags: ["React", "Storybook", "Figma API", "Testing Library"],
    image: "/projects/artemis.jpg",
    color: "#10B981",
    github: null,
  },
];

const BRAND_PURPLE = "#8B5CF6";
const ease = [0.22, 1, 0.36, 1] as const;

// ============================================================================
// Section Header with staggered text reveal
// ============================================================================

function SectionHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const titleWords = ["Pixel-Perfect,", "Battle-Tested"];

  return (
    <motion.div ref={containerRef} className="mb-20 md:mb-32">
      {/* Tag with slide-in */}
      <motion.div
        className="mb-6 overflow-hidden"
        initial={{ width: 0 }}
        animate={isInView ? { width: "auto" } : {}}
        transition={{ duration: 0.8, ease }}
      >
        <motion.span
          className="inline-block px-4 py-2 text-xs font-bold tracking-[0.25em] text-white"
          style={{ backgroundColor: BRAND_PURPLE, fontFamily: "var(--font-mono)" }}
          initial={{ x: -100 }}
          animate={isInView ? { x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          PROJECTS
        </motion.span>
      </motion.div>

      {/* Title with word-by-word reveal */}
      <h2
        className="mb-6 text-4xl font-black text-white md:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {titleWords.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              style={{ color: i === 1 ? BRAND_PURPLE : "inherit" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease }}
            >
              {word}
            </motion.span>
            {i === 0 && " "}
          </span>
        ))}
      </h2>

      {/* Description with fade up */}
      <motion.p
        className="max-w-xl text-lg text-neutral-400"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        Highlights from professional engagements and personal explorations — where clean code meets
        bold interfaces.
      </motion.p>
    </motion.div>
  );
}

// ============================================================================
// Main Projects Section
// ============================================================================

function ProjectsSection() {
  return (
    <section
      id="projects-concept"
      className="relative w-full overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader />
      </div>

      {/* Floating shapes with brand colors */}
      <FloatingShapes />

      <div className="relative space-y-0">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// Project Card - Bold animations, strong colors
// ============================================================================

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });

  // Scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax values
  const bgX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-50, 50]);
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [80, -80]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-2, 2]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, -40]);
  const diagonalY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [100, -100]
  );

  // Magnetic image effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgSpringX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const imgSpringY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current || shouldReduceMotion) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  // Stagger delays for content elements
  const baseDelay = 0.1;

  return (
    <div ref={cardRef} className="relative">
      {/* BOLD SOLID COLOR BACKGROUND - Higher opacity, full section */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: project.color }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.12 } : {}}
        transition={{ duration: 1.2, ease }}
      />

      {/* Diagonal color slash with strong parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ y: diagonalY }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute h-[300%] w-[40%]"
          style={{
            backgroundColor: project.color,
            opacity: 0.08,
            transform: isEven ? "rotate(-20deg)" : "rotate(20deg)",
            top: "-100%",
            left: isEven ? "60%" : "0%",
            x: bgX,
          }}
        />
      </motion.div>

      {/* Bold vertical accent bar */}
      <motion.div
        className="absolute top-0 h-full w-2 origin-top"
        style={{
          backgroundColor: project.color,
          [isEven ? "left" : "right"]: 0,
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease }}
      />

      {/* Horizontal accent line across the section */}
      <motion.div
        className={`absolute h-px w-full ${isEven ? "origin-left" : "origin-right"}`}
        style={{
          backgroundColor: project.color,
          top: "50%",
          opacity: 0.2,
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease }}
      />

      {/* Content container */}
      <div
        className={`relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-24 md:py-32 lg:flex-row lg:gap-20 ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image with magnetic effect + parallax */}
        <motion.div
          ref={imageRef}
          className="relative aspect-[4/3] w-full cursor-none lg:w-[42%]"
          style={{
            y: imgY,
            rotate: imgRotate,
            x: imgSpringX,
          }}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
        >
          {/* Image reveal with clip-path */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0%)" } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: `${project.color}20`,
                y: imgSpringY,
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ y: imgSpringY }}
            >
              <motion.span
                className="text-8xl font-black md:text-9xl"
                style={{ color: `${project.color}35`, fontFamily: "var(--font-display)" }}
                animate={shouldReduceMotion ? {} : { scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Bold corner accent block with scale animation */}
          <motion.div
            className="absolute h-20 w-20"
            style={{
              backgroundColor: project.color,
              bottom: "-1.5rem",
              [isEven ? "right" : "left"]: "-1.5rem",
            }}
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          />

          {/* Secondary smaller accent */}
          <motion.div
            className="absolute h-8 w-8 rotate-45"
            style={{
              backgroundColor: project.color,
              top: "-1rem",
              [isEven ? "left" : "right"]: "20%",
            }}
            initial={{ scale: 0, rotate: 45 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1, ease }}
          />
        </motion.div>

        {/* Content with staggered reveal */}
        <motion.div className="w-full lg:w-[58%]" style={{ y: contentY }}>
          {/* Type badge - prominent, no year */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay, ease }}
          >
            <span
              className="inline-block px-4 py-2 text-sm font-bold tracking-wide text-white"
              style={{ backgroundColor: project.color, fontFamily: "var(--font-mono)" }}
            >
              {project.type.toUpperCase()}
            </span>
          </motion.div>

          {/* Title with character stagger */}
          <motion.div className="mb-5 overflow-hidden">
            <motion.h3
              className="text-4xl font-black text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: baseDelay + 0.15, ease }}
            >
              {project.title}
            </motion.h3>
          </motion.div>

          {/* Description with fade */}
          <motion.p
            className="mb-8 max-w-lg text-lg leading-relaxed text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: baseDelay + 0.3, ease }}
          >
            {project.description}
          </motion.p>

          {/* Tags with staggered reveal */}
          <motion.div
            className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: baseDelay + 0.45 }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: baseDelay + 0.5 + i * 0.08, ease }}
              >
                <span
                  className="text-sm font-semibold transition-colors duration-300 hover:text-white"
                  style={{ color: project.color }}
                >
                  {tag}
                </span>
                {i < project.tags.length - 1 && (
                  <motion.span
                    className="h-1.5 w-1.5 rotate-45"
                    style={{ backgroundColor: project.color }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: baseDelay + 0.6 + i * 0.08 }}
                  />
                )}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs with stagger */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: baseDelay + 0.7, ease }}
          >
            <MagneticButton variant="primary" size="lg">
              <span>View Project</span>
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            {project.github && (
              <MagneticButton variant="ghost" size="lg">
                <Github className="h-5 w-5" />
              </MagneticButton>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 w-full ${isEven ? "origin-right" : "origin-left"}`}
        style={{ backgroundColor: project.color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease }}
      />
    </div>
  );
}

// ============================================================================
// Floating Shapes - Multi-layer parallax
// ============================================================================

function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -200]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -100]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep layer */}
      <motion.div style={{ y: layer1Y }} className="absolute inset-0">
        <div
          className="absolute top-[5%] left-[3%] h-16 w-16 rotate-45"
          style={{ backgroundColor: BRAND_PURPLE, opacity: 0.05 }}
        />
        <div
          className="absolute top-[20%] right-[8%] h-20 w-20 rounded-full"
          style={{ backgroundColor: "#EC4899", opacity: 0.04 }}
        />
        <div
          className="absolute top-[60%] left-[12%] h-12 w-12"
          style={{ backgroundColor: "#06B6D4", opacity: 0.05 }}
        />
        <div
          className="absolute top-[75%] right-[5%] h-24 w-24 rotate-45"
          style={{ backgroundColor: "#10B981", opacity: 0.04 }}
        />
      </motion.div>

      {/* Front layer */}
      <motion.div style={{ y: layer2Y }} className="absolute inset-0">
        <motion.div
          className="absolute top-[30%] left-[8%] h-6 w-6 rotate-45"
          style={{ backgroundColor: BRAND_PURPLE, opacity: 0.08 }}
          animate={shouldReduceMotion ? {} : { rotate: [45, 135, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[45%] right-[15%] h-8 w-8 rounded-full"
          style={{ backgroundColor: "#EC4899", opacity: 0.06 }}
          animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[15%] left-[50%] h-5 w-5"
          style={{ backgroundColor: "#06B6D4", opacity: 0.07 }}
          animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ConceptProjectsPage() {
  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      {/* Page Header */}
      <section
        className="relative w-full py-24 md:py-36"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1
              className="mb-4 text-5xl font-black text-white md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Projects Section
              <br />
              <span style={{ color: BRAND_PURPLE }}>Final Concept</span>
            </h1>
            <p className="max-w-2xl text-lg text-neutral-400">
              Bolder colors (12% opacity backgrounds), sophisticated animations (clip-path reveals,
              magnetic images, staggered content, multi-layer parallax), project type focus.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full bg-neutral-900" />
      <ProjectsSection />
      <div className="h-24" />
    </main>
  );
}
