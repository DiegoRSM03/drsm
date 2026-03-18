"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme } from "@/contexts";
import { ProximityShape } from "@/components/custom/ProximityShape";
import { ACCENT, PINK_HEX, CYAN_HEX, AMBER_HEX, GREEN_HEX, EASE } from "@/utils";
import { useIsTouchDevice } from "@/hooks";
import { GridBackground } from "@/components/custom/GridBackground";
import type { ProximityShapeData } from "@/components/custom/ProximityShape";

interface ExperienceData {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  skills: string[];
  color: string;
  numberColorDark: string;
  numberColorLight: string;
}

const EXPERIENCES: ExperienceData[] = [
  {
    company: "Inaza",
    role: "Software Engineer",
    period: "Jan 2026 - Present",
    duration: "3 mos",
    description:
      "Insurance technology company building modern solutions for the insurance industry.",
    highlights: [
      "Developed frontend features for insurance platform",
      "Collaborated with cross-functional teams",
      "Implemented responsive UI components",
    ],
    skills: ["React", "TypeScript", "REST APIs", "CSS"],
    color: PINK_HEX,
    numberColorDark: "#5C2A45",
    numberColorLight: "#FCE7F3",
  },
  {
    company: "Litebox",
    role: "Software Engineer",
    period: "Sep 2022 - Jan 2026",
    duration: "3.5 yrs",
    description:
      "Boutique software company focused on highly customized marketing websites and scalable back-office applications for American startup companies.",
    highlights: [
      "Built multiple marketing websites with perfect SEO, eye-catching animations, and 95+ Lighthouse scores",
      "Architected entire project infrastructure using AWS, Vercel, and EC2",
      "Created a CLI to automate project scaffolding with Next.js and Strapi",
      "Built back-office apps with React Hook Form, Google Maps API, and OpenAI",
    ],
    skills: ["Next.js", "AWS", "GSAP", "Framer Motion", "TypeScript", "Strapi"],
    color: ACCENT,
    numberColorDark: "#3D2A5C",
    numberColorLight: "#E9E0FF",
  },
  {
    company: "Axon",
    role: "Software Engineer",
    period: "Sep 2021 - Sep 2022",
    duration: "1 yr",
    description:
      "Remote coaching school for athletes and professional leaders. One of the best-known coaching schools in LatAm.",
    highlights: [
      "Built a CRM application from scratch for the sales department",
      "Created a WhatsApp Bot for sales reminders and payment notifications",
      "Implemented CI/CD workflow using GitHub Actions",
      "Ensured cross-browser compatibility and security standards",
    ],
    skills: ["React", "Node.js", "WhatsApp API", "GitHub Actions", "PostgreSQL"],
    color: CYAN_HEX,
    numberColorDark: "#134E5A",
    numberColorLight: "#CFFAFE",
  },
];

const SIDEBAR_PROXIMITY_SHAPES: ProximityShapeData[] = [
  {
    type: "diamond",
    x: "15%",
    y: "15%",
    size: 50,
    color: "#ffffff",
    filled: true,
    floatDuration: 6,
    floatDelay: 0,
  },
  {
    type: "circle",
    x: "75%",
    y: "25%",
    size: 40,
    color: "#ffffff",
    filled: false,
    floatDuration: 7,
    floatDelay: 0.5,
  },
  {
    type: "square",
    x: "25%",
    y: "75%",
    size: 55,
    color: "#ffffff",
    filled: true,
    floatDuration: 5.5,
    floatDelay: 1,
  },
  {
    type: "triangle",
    x: "70%",
    y: "80%",
    size: 35,
    color: "#ffffff",
    filled: false,
    floatDuration: 8,
    floatDelay: 0.3,
  },
];

const CONTENT_PROXIMITY_SHAPES: ProximityShapeData[] = [
  {
    type: "circle",
    x: "85%",
    y: "5%",
    size: 45,
    color: CYAN_HEX,
    filled: true,
    floatDuration: 7,
    floatDelay: 0.4,
  },
  {
    type: "square",
    x: "10%",
    y: "12%",
    size: 50,
    color: PINK_HEX,
    filled: false,
    floatDuration: 5.5,
    floatDelay: 0.8,
  },
  {
    type: "triangle",
    x: "92%",
    y: "22%",
    size: 38,
    color: AMBER_HEX,
    filled: true,
    floatDuration: 8,
    floatDelay: 0.2,
  },
  {
    type: "circle",
    x: "40%",
    y: "38%",
    size: 40,
    color: GREEN_HEX,
    filled: false,
    floatDuration: 6.5,
    floatDelay: 1.0,
  },
  {
    type: "diamond",
    x: "88%",
    y: "48%",
    size: 55,
    color: ACCENT,
    filled: true,
    floatDuration: 5,
    floatDelay: 0.6,
  },
  {
    type: "square",
    x: "45%",
    y: "62%",
    size: 45,
    color: CYAN_HEX,
    filled: false,
    floatDuration: 7,
    floatDelay: 0.3,
  },
  {
    type: "circle",
    x: "90%",
    y: "72%",
    size: 35,
    color: PINK_HEX,
    filled: true,
    floatDuration: 6,
    floatDelay: 0.9,
  },
  {
    type: "triangle",
    x: "15%",
    y: "85%",
    size: 42,
    color: AMBER_HEX,
    filled: false,
    floatDuration: 7.5,
    floatDelay: 0.5,
  },
];

function ExperienceCard({
  exp,
  index,
  isActive,
  scrollYProgress,
  enableParallax = true,
}: {
  exp: ExperienceData;
  index: number;
  isActive: boolean;
  scrollYProgress: MotionValue<number>;
  enableParallax?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const useParallax = enableParallax && !shouldReduceMotion;

  const numberY = useTransform(scrollYProgress, [0, 1], useParallax ? [100, -160] : [0, 0]);
  const springNumberY = useSpring(numberY, { stiffness: 80, damping: 25 });

  const cardY = useTransform(scrollYProgress, [0, 1], useParallax ? [50, -80] : [0, 0]);
  const springCardY = useSpring(cardY, { stiffness: 100, damping: 22 });

  return (
    <article
      data-experience-card={index}
      className="group relative"
      aria-labelledby={`exp-${index}-title`}
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: EASE }}
      >
        <motion.div className="relative" style={{ y: useParallax ? springNumberY : 0 }}>
          <motion.span
            className="pointer-events-none block text-[6rem] leading-none font-black sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem]"
            style={{
              fontFamily: "var(--font-display)",
              color: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
            }}
            animate={{ scale: shouldReduceMotion ? 1 : isActive ? 1.02 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            aria-hidden="true"
          >
            {String(EXPERIENCES.length - index).padStart(2, "0")}
          </motion.span>
        </motion.div>

        <motion.div
          className="border-border relative -mt-12 border p-4 sm:-mt-14 sm:p-6 md:-mt-16 md:p-8 lg:-mt-20 lg:ml-4 xl:ml-8"
          style={{
            borderColor: isDark ? "#1f1f1f" : "#e5e5e5",
            backgroundColor: isDark ? "#0a0a0a" : "#fafafa",
            y: useParallax ? springCardY : 0,
          }}
        >
          <div
            className="absolute top-4 right-4 hidden items-center gap-2 sm:top-6 sm:right-6 sm:flex"
            aria-hidden="true"
          >
            <div className="bg-foreground/30 h-px w-8 sm:w-12" />
            <div
              className="bg-foreground/50 h-1.5 w-1.5 sm:h-2 sm:w-2"
              style={{ transform: "rotate(45deg)" }}
            />
          </div>

          <div className="relative mb-2 inline-block sm:mb-3">
            <motion.span
              className="absolute -inset-x-2 -inset-y-1 sm:-inset-x-4 sm:-inset-y-2"
              style={{ backgroundColor: ACCENT, originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: shouldReduceMotion || isActive ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: EASE }}
              aria-hidden="true"
            />
            <h3
              id={`exp-${index}-title`}
              className="relative z-10 text-xl font-black sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <motion.span
                animate={{
                  color:
                    shouldReduceMotion || isActive
                      ? "#fff"
                      : isDark
                        ? "var(--color-foreground)"
                        : "#1a1a1a",
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              >
                {exp.company.toUpperCase()}
              </motion.span>
            </h3>
          </div>

          <p className="text-foreground mb-1 text-base font-medium sm:mb-2 sm:text-lg">
            {exp.role}
          </p>
          <p className="text-foreground/50 mb-4 font-mono text-xs sm:mb-6 sm:text-sm">
            <time>{exp.period}</time>
            <span aria-hidden="true"> · </span>
            <span>{exp.duration}</span>
          </p>

          <p className="text-foreground/70 mb-4 text-sm sm:mb-6 sm:text-base">{exp.description}</p>

          <motion.div
            className="overflow-hidden"
            initial={{
              height: shouldReduceMotion ? "auto" : 0,
              opacity: shouldReduceMotion ? 1 : 0,
            }}
            animate={{
              height: shouldReduceMotion || isActive ? "auto" : 0,
              opacity: shouldReduceMotion || isActive ? 1 : 0,
            }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          >
            <ul className="mb-4 space-y-2 sm:mb-6 sm:space-y-3" role="list">
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="text-foreground flex items-start gap-2 text-xs sm:gap-3 sm:text-sm"
                  initial={{ x: shouldReduceMotion ? 0 : -20, opacity: shouldReduceMotion ? 1 : 0 }}
                  animate={{
                    x: shouldReduceMotion || isActive ? 0 : -20,
                    opacity: shouldReduceMotion || isActive ? 1 : 0,
                  }}
                  transition={{ delay: shouldReduceMotion ? 0 : i * 0.05 }}
                >
                  <span
                    className="bg-foreground mt-1 h-1.5 w-1.5 shrink-0 sm:mt-1.5 sm:h-2 sm:w-2"
                    style={{ transform: "rotate(45deg)" }}
                    aria-hidden="true"
                  />
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3" aria-hidden="true">
            <div className="bg-foreground/20 h-px flex-1" />
            <span className="text-foreground/40 text-[10px] font-medium tracking-wider uppercase sm:text-xs">
              Stack
            </span>
            <div className="bg-foreground/20 h-px flex-1" />
          </div>

          <ul
            className="flex flex-wrap gap-1.5 sm:gap-2"
            role="list"
            aria-label="Technologies used"
          >
            {exp.skills.map((skill, i) => (
              <motion.li
                key={skill}
                className="text-foreground border px-2 py-1 text-[10px] font-medium sm:px-3 sm:text-xs"
                style={{
                  borderColor: isDark ? "#2a2a2a" : "#d4d4d4",
                  backgroundColor: isDark ? "#1a1a1a" : "#f0f0f0",
                }}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3 + i * 0.05 }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                        scale: 1.05,
                      }
                }
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </article>
  );
}

export default function Experience() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      centerX.set(e.clientX - window.innerWidth / 2);
      centerY.set(e.clientY - window.innerHeight / 2);
    },
    [mouseX, mouseY, centerX, centerY, isTouch]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const cards = contentRef.current.querySelectorAll("[data-experience-card]");
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const viewportMiddle = window.innerHeight / 2;
        if (rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
          setActiveSection(index);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-background relative border-t border-white/[0.08]"
      aria-labelledby="experience-heading"
    >
      <GridBackground id="experience-grid" stroke="rgba(255, 255, 255, 0.05)" />

      <div className="relative flex flex-col lg:flex-row">
        <aside
          className="sticky top-0 hidden h-screen w-full shrink-0 overflow-hidden lg:block lg:w-2/5"
          style={{ backgroundColor: ACCENT }}
          aria-label="Work history navigation"
        >
          <GridBackground id="sidebar-grid" stroke="rgba(255, 255, 255, 0.15)" />

          {!isTouch && (
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {SIDEBAR_PROXIMITY_SHAPES.map((shape, i) => (
                <ProximityShape
                  key={`sidebar-${i}`}
                  shape={shape}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              ))}
            </div>
          )}

          <div
            className="relative z-10 flex h-full w-full flex-col justify-center p-6 pr-6 sm:p-8 sm:pr-8 xl:p-12 xl:pr-12"
            style={{ paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1rem))" }}
          >
            <motion.div
              initial={{ x: shouldReduceMotion ? 0 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: EASE }}
            >
              <h2
                id="experience-heading"
                className="text-5xl font-black xl:text-6xl 2xl:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-white">WORK</span>
                <br />
                <span style={{ color: "var(--color-background)" }}>HISTORY</span>
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70 xl:mt-6 xl:text-base">
                Production code, frontend architecture, and cross-functional collaboration.
              </p>
            </motion.div>
          </div>
        </aside>

        <div className="bg-surface relative w-full lg:w-3/5">
          <GridBackground id="content-grid" />

          {!isTouch && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              {CONTENT_PROXIMITY_SHAPES.map((shape, i) => (
                <ProximityShape
                  key={`content-${i}`}
                  shape={shape}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              ))}
            </div>
          )}

          <header className="relative z-10 px-4 pt-20 sm:px-6 sm:pt-24 lg:hidden">
            <h2
              id="experience-heading-mobile"
              className="text-foreground text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WORK <span style={{ color: ACCENT }}>HISTORY</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-base">
              Production code, frontend architecture, and cross-functional collaboration.
            </p>
          </header>

          <div
            ref={contentRef}
            className="relative z-10 w-full space-y-12 px-4 py-16 sm:space-y-16 sm:px-6 sm:py-20 md:space-y-24 md:py-24 lg:space-y-40 lg:py-32 lg:pl-8 xl:space-y-48 xl:py-40 xl:pl-10"
            style={{ paddingRight: "max(1rem, calc((100vw - 1280px) / 2 + 0.875rem))" }}
          >
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                index={index}
                isActive={activeSection === index}
                scrollYProgress={scrollYProgress}
                enableParallax={!shouldReduceMotion && !isTouch}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
