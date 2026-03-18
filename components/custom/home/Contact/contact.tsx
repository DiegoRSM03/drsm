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

const ACCENT = "#8B5CF6";
const CYAN = "#06B6D4";
const PINK = "#EC4899";
const AMBER = "#F59E0B";
const GREEN = "#10B981";
const ease = [0.22, 1, 0.36, 1] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/drsm", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/DiegoRSM03", icon: Github },
  { label: "Email", href: "mailto:diego@example.com", icon: Mail },
];

const EMAIL = "diego@example.com";

// ============================================================================
// MagneticWrapper — reusable magnetic hover effect
// ============================================================================

function MagneticWrapper({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

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
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// CopyEmailButton — magnetic + hover/active/focus states + light theme
// ============================================================================

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MagneticWrapper className="inline-block">
      <motion.button
        onClick={handleCopy}
        className="group flex items-center gap-2 border-2 px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base"
        style={{
          borderColor: copied ? ACCENT : "var(--color-border)",
          color: copied ? "#fff" : ACCENT,
          backgroundColor: copied ? ACCENT : "transparent",
          // @ts-expect-error CSS custom property
          "--tw-ring-color": ACCENT,
          "--tw-ring-offset-color": "var(--color-background)",
        }}
        whileHover={{
          borderColor: ACCENT,
          boxShadow: `0 0 20px ${ACCENT}30`,
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {EMAIL}
          </>
        )}
      </motion.button>
    </MagneticWrapper>
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
    <MagneticWrapper className="inline-block">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="border-border text-muted hover:border-accent hover:text-accent focus-visible:ring-accent active:bg-accent/10 flex h-10 w-10 items-center justify-center border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-11 sm:w-11 md:h-12 md:w-12"
        style={{
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--color-background)",
        }}
        whileHover={{
          boxShadow: `0 0 20px ${ACCENT}30`,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
      </motion.a>
    </MagneticWrapper>
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
    { text: "Make it fast.", color: CYAN },
    { text: "Make it beautiful.", color: PINK },
    { text: "Make it accessible.", color: GREEN },
    { text: "Make it memorable.", color: AMBER },
    { text: "Make it right.", color: ACCENT },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="border-foreground/[0.08] relative flex h-svh w-full items-center overflow-hidden border-t"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-labelledby="contact-heading"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 sm:px-6"
        style={{ y: contentY }}
      >
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        {/* Manifesto */}
        <div className="mb-8 space-y-0.5 sm:mb-10 sm:space-y-1 md:mb-14 md:space-y-2 lg:mb-16 lg:space-y-3">
          {manifesto.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: "var(--font-display)", color: line.color }}
                initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease }}
              >
                {line.text}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="mb-6 h-px origin-left sm:mb-8 md:mb-10"
          style={{ backgroundColor: `${ACCENT}30` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.4, ease }}
          aria-hidden="true"
        />

        {/* Actions row */}
        <motion.div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8, ease }}
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
        style={{ backgroundColor: `${ACCENT}12` }}
        animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[15%] left-[4%] h-5 w-5 rounded-full sm:bottom-[20%] sm:left-[6%] sm:h-6 sm:w-6 md:h-8 md:w-8"
        style={{ backgroundColor: `${PINK}10` }}
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[40%] left-[3%] hidden h-5 w-5 sm:block md:h-6 md:w-6"
        style={{ backgroundColor: `${CYAN}08` }}
        animate={shouldReduceMotion ? {} : { rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </section>
  );
}
