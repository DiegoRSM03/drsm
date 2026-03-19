"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { Github, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { GridBackground } from "@/components/custom/GridBackground";
import { CursorBrightGrid } from "@/components/custom/CursorEffects";
import {
  ACCENT_HEX,
  CYAN_HEX,
  PINK_HEX,
  AMBER_HEX,
  GREEN_HEX,
  EASE,
  SPRING_MAGNETIC,
} from "@/utils";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/drsm", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/DiegoRSM03", icon: Github },
  { label: "Email", href: "mailto:diego@example.com", icon: Mail },
];

const EMAIL = "diego@example.com";

// ============================================================================
// Magnetic3DWrapper — magnetic hover effect with 3D parallax and glow
// ============================================================================

function Magnetic3DWrapper({
  children,
  className,
  strength = 0.3,
  glowColor = ACCENT_HEX,
}: {
  children: (
    springX: ReturnType<typeof useSpring>,
    springY: ReturnType<typeof useSpring>
  ) => React.ReactNode;
  className?: string;
  strength?: number;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_MAGNETIC);
  const springY = useSpring(y, SPRING_MAGNETIC);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        boxShadow: isHovered ? `0 0 25px ${glowColor}50` : `0 0 0px ${glowColor}00`,
      }}
      transition={{ duration: 0.2 }}
    >
      {children(springX, springY)}
    </motion.div>
  );
}

// ============================================================================
// CopyEmailButton — magnetic + hover/active/focus states + light theme
// ============================================================================

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("contact");

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Magnetic3DWrapper className="inline-block">
      {(springX, springY) => (
        <motion.button
          onClick={handleCopy}
          className="group flex items-center gap-2 border-2 px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base"
          style={{
            borderColor: copied ? ACCENT_HEX : "var(--color-border)",
            color: copied ? "#fff" : ACCENT_HEX,
            backgroundColor: copied ? ACCENT_HEX : "transparent",
            // @ts-expect-error CSS custom property
            "--tw-ring-color": ACCENT_HEX,
            "--tw-ring-offset-color": "var(--color-background)",
          }}
          whileHover={
            copied
              ? {}
              : {
                  borderColor: ACCENT_HEX,
                  backgroundColor: ACCENT_HEX,
                  color: "#ffffff",
                }
          }
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <motion.span className="flex items-center gap-2" style={{ x: springX, y: springY }}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {EMAIL}
              </>
            )}
          </motion.span>
        </motion.button>
      )}
    </Magnetic3DWrapper>
  );
}

// ============================================================================
// SocialLinkButton — magnetic + hover/active/focus states + light theme
// ============================================================================

function SocialLinkButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <Magnetic3DWrapper className="inline-block">
      {(springX, springY) => (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="border-border text-muted focus-visible:ring-accent flex h-10 w-10 items-center justify-center border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-11 sm:w-11 md:h-12 md:w-12"
          style={{
            // @ts-expect-error CSS custom property
            "--tw-ring-offset-color": "var(--color-background)",
          }}
          whileHover={{
            borderColor: ACCENT_HEX,
            backgroundColor: ACCENT_HEX,
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <motion.span
            className="flex items-center justify-center"
            style={{ x: springX, y: springY }}
          >
            <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
          </motion.span>
        </motion.a>
      )}
    </Magnetic3DWrapper>
  );
}

// ============================================================================
// Contact Section
// ============================================================================

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, -40]);

  const manifesto = [
    { text: "Make it fast.", color: CYAN_HEX },
    { text: "Make it right.", color: PINK_HEX },
    { text: "Make it lasting.", color: GREEN_HEX },
    { text: "Make it memorable.", color: AMBER_HEX },
    { text: "Make it breathe.", color: ACCENT_HEX },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="border-foreground/[0.08] relative flex w-full items-center overflow-hidden border-t py-16 sm:py-20 md:py-24 lg:min-h-[70vh] lg:pt-28 lg:pb-10"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-labelledby="contact-heading"
      data-cursor-grid
    >
      <GridBackground id="contact-grid" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 sm:px-6"
        style={{ y: contentY }}
      >
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        {/* Manifesto */}
        <div className="mb-16 space-y-0.5 sm:mb-20 sm:space-y-1 md:mb-24 md:space-y-2 lg:mb-28 lg:space-y-3">
          {manifesto.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: "var(--font-display)", color: line.color }}
                initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease: EASE }}
              >
                {line.text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Actions row */}
        <motion.div
          className="flex flex-col items-start gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-8 md:pb-10 lg:pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
        >
          <CopyEmailButton />

          <nav aria-label="Social links" className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {SOCIAL_LINKS.map((link) => (
              <SocialLinkButton
                key={link.label}
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            ))}
          </nav>
        </motion.div>
      </motion.div>

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-[12%] right-[6%] h-6 w-6 rotate-45 sm:top-[15%] sm:right-[8%] sm:h-8 sm:w-8 md:h-10 md:w-10"
        style={{ backgroundColor: `${ACCENT_HEX}12` }}
        animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[15%] left-[4%] h-5 w-5 rounded-full sm:bottom-[20%] sm:left-[6%] sm:h-6 sm:w-6 md:h-8 md:w-8"
        style={{ backgroundColor: `${PINK_HEX}10` }}
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[40%] left-[3%] hidden h-5 w-5 sm:block md:h-6 md:w-6"
        style={{ backgroundColor: `${CYAN_HEX}08` }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <CursorBrightGrid cellSize={100} />
    </section>
  );
}
