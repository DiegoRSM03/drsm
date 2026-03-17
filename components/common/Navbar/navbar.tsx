"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { Globe } from "lucide-react";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { useTheme } from "@/contexts";

function useIsTouchDevice() {
  const getSnapshot = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const getServerSnapshot = () => false;
  const subscribe = (callback: () => void) => {
    window.addEventListener("touchstart", callback, { once: true });
    return () => window.removeEventListener("touchstart", callback);
  };
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const NAV_ITEMS = ["About", "Projects", "Experience", "Links"];

function MagneticLetter({
  letter,
  index,
  isHovered,
  mouseX,
  mouseY,
  enableMotion = true,
}: {
  letter: string;
  index: number;
  isHovered: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  enableMotion?: boolean;
}) {
  const positions = [
    { x: -6, y: -7 },
    { x: 0, y: 7 },
    { x: 12, y: -7 },
    { x: 18, y: 7 },
  ];

  const factors = [
    { x: 0.25, y: 0.3 },
    { x: 0.35, y: 0.2 },
    { x: 0.2, y: 0.35 },
    { x: 0.3, y: 0.25 },
  ];

  const factor = factors[index];
  const position = positions[index];

  const springConfig = { stiffness: 150 - index * 20, damping: 15 + index * 2 };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const magneticX = useTransform(springX, (val) => (enableMotion ? val * factor.x : 0));
  const magneticY = useTransform(springY, (val) => (enableMotion ? val * factor.y : 0));

  return (
    <motion.span
      className="inline-block"
      animate={{
        x: enableMotion && isHovered ? position.x : 0,
        y: enableMotion && isHovered ? position.y : 0,
      }}
      transition={{ duration: enableMotion ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="inline-block"
        style={{
          x: magneticX,
          y: magneticY,
        }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

function MagneticLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = ["D", "R", "S", "M"];
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !enableMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative cursor-pointer px-2 py-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="DRSM - Home"
    >
      <motion.div
        className="text-foreground flex items-center text-2xl font-black tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        {letters.map((letter, i) => (
          <MagneticLetter
            key={i}
            letter={letter}
            index={i}
            isHovered={isHovered}
            mouseX={mouseX}
            mouseY={mouseY}
            enableMotion={enableMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

interface LanguageToggleProps {
  className?: string;
  isMenuOpen?: boolean;
}

function LanguageToggle({ className = "", isMenuOpen = false }: LanguageToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const enableMotion = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !enableMotion) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const menuIconColor = isMenuOpen ? (theme === "dark" ? "#ffffff" : "#000000") : undefined;

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic focus-visible:ring-accent focus-visible:ring-offset-background flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
        isMenuOpen
          ? theme === "dark"
            ? "bg-accent hover:bg-accent/90 border-white/50 hover:border-white"
            : "bg-accent hover:bg-accent/90 border-black/30 hover:border-black/50"
          : "border-border bg-surface text-foreground hover:border-accent hover:bg-elevated"
      } ${className}`}
      whileTap={enableMotion ? { scale: 0.95 } : {}}
      aria-label="Toggle language"
    >
      <motion.div
        style={{
          x: enableMotion ? springX : 0,
          y: enableMotion ? springY : 0,
          color: menuIconColor,
        }}
      >
        <Globe className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

function Hamburger({ isOpen, onClick }: HamburgerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className="focus-visible:ring-accent focus-visible:ring-offset-background relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      onClick={onClick}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="main-menu"
    >
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        aria-hidden="true"
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </motion.button>
  );
}

interface MenuItemsProps {
  onClose: () => void;
  textColor: string;
}

function MenuItems({ onClose, textColor }: MenuItemsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const highlightColor = theme === "dark" ? textColor : "#1a1a1a";
  const hoverTextColor = theme === "dark" ? "#ffffff" : "#ffffff";

  const isHighlighted = (i: number) => hoveredIndex === i || focusedIndex === i;

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col items-center justify-center gap-8" role="list">
        {NAV_ITEMS.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.15 + i * 0.08,
              duration: shouldReduceMotion ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href={`#${item.toLowerCase()}`}
              className="group relative block focus-visible:outline-none"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onClick={onClose}
            >
              <span className="relative inline-block">
                <motion.span
                  className="relative z-10 block text-5xl font-black md:text-6xl"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={false}
                  animate={{ color: isHighlighted(i) ? hoverTextColor : textColor }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                >
                  {item}
                </motion.span>
                <motion.span
                  className="absolute -inset-x-5 -inset-y-2 -z-0"
                  style={{ backgroundColor: highlightColor, originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHighlighted(i) ? 1 : 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

function CurvedBottom({ color }: { color: string }) {
  const [path, setPath] = useState("M0,120 C480,20 960,20 1440,120 L1440,120 L0,120 Z");
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const enableMotion = !shouldReduceMotion && !isTouch;

  useEffect(() => {
    if (!enableMotion) return;
    const timer = setTimeout(() => setIsReady(true), 900);
    return () => clearTimeout(timer);
  }, [enableMotion]);

  const effectiveIsReady = !enableMotion || isReady;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!effectiveIsReady || !containerRef.current || !enableMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    const relativeX = (x / window.innerWidth) * 1440;
    const distanceFromBottom = rect.bottom - y;
    const influence = Math.max(0, Math.min(1, distanceFromBottom / 150));

    const baseY = 20;
    const dragAmount = influence * 35;

    const leftControlY = baseY + (relativeX < 720 ? dragAmount * (1 - relativeX / 720) : 0);
    const rightControlY = baseY + (relativeX >= 720 ? dragAmount * ((relativeX - 720) / 720) : 0);

    const peakX = relativeX;

    setPath(
      `M0,120 C${Math.max(200, peakX - 400)},${leftControlY} ${Math.min(1240, peakX + 400)},${rightControlY} 1440,120 L1440,120 L0,120 Z`
    );
  };

  const handleMouseLeave = () => {
    if (!effectiveIsReady || !enableMotion) return;
    setPath("M0,120 C480,20 960,20 1440,120 L1440,120 L0,120 Z");
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "150px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        aria-hidden="true"
      >
        <motion.path
          fill={color}
          initial={{ d: "M0,120 C480,120 960,120 1440,120 L1440,120 L0,120 Z" }}
          animate={{ d: path }}
          transition={{
            duration: enableMotion ? (isReady ? 0.15 : 0.6) : 0,
            ease: isReady ? "easeOut" : [0.22, 1, 0.36, 1],
            delay: enableMotion && !isReady ? 0.3 : 0,
          }}
        />
      </svg>
    </div>
  );
}

interface FloatingShape {
  x: string;
  y: string;
  size: number;
  type: "circle" | "square";
}

function FloatingShapes({ shapes, color }: { shapes: FloatingShape[]; color: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.type === "circle" ? "rounded-full" : ""}`}
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            backgroundColor: color,
            rotate: shape.type === "square" ? 45 : 0,
          }}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -12, 0],
          }}
          exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.3 + i * 0.1,
            y: shouldReduceMotion ? {} : { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

const SHAPES_CONFIG: FloatingShape[] = [
  { x: "5%", y: "12%", size: 48, type: "circle" },
  { x: "15%", y: "28%", size: 16, type: "square" },
  { x: "8%", y: "55%", size: 32, type: "square" },
  { x: "18%", y: "72%", size: 12, type: "circle" },
  { x: "92%", y: "18%", size: 24, type: "square" },
  { x: "85%", y: "35%", size: 44, type: "circle" },
  { x: "90%", y: "58%", size: 18, type: "circle" },
  { x: "82%", y: "75%", size: 36, type: "square" },
  { x: "25%", y: "85%", size: 14, type: "circle" },
  { x: "75%", y: "88%", size: 20, type: "square" },
];

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex h-20 items-center px-6 transition-all duration-500 ${
          scrolled && !isOpen ? "bg-surface" : "bg-transparent"
        } ${className}`}
        role="banner"
      >
        <motion.div
          className="bg-border absolute right-0 bottom-0 left-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled && !isOpen ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <MagneticLogo />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle magnetic isMenuOpen={isOpen} />
            <LanguageToggle isMenuOpen={isOpen} />
            <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="main-menu"
            className="bg-accent fixed inset-0 z-40"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <CurvedBottom color="var(--color-background)" />
            <FloatingShapes shapes={SHAPES_CONFIG} color="rgba(255,255,255,0.15)" />

            <div className="flex h-full items-center justify-center pt-20">
              <MenuItems onClose={() => setIsOpen(false)} textColor="var(--color-background)" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Navbar };
