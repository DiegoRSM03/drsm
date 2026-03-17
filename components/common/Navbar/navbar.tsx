"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { useTheme } from "@/contexts";

const NAV_ITEMS = ["About", "Projects", "Experience", "Links"];

function MagneticLetter({
  letter,
  index,
  isHovered,
  mouseX,
  mouseY,
}: {
  letter: string;
  index: number;
  isHovered: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  // Diagonal positions when hovered:
  // D   S     (D top-left, S top-right)
  //   R   M   (R bottom-left, M bottom-right)
  const positions = [
    { x: -6, y: -7 }, // D - top left
    { x: 0, y: 7 }, // R - bottom left (offset right a bit)
    { x: 12, y: -7 }, // S - top right
    { x: 18, y: 7 }, // M - bottom right
  ];

  // Each letter reacts differently to mouse movement (magnetic intensity)
  const factors = [
    { x: 0.25, y: 0.3 }, // D - strong vertical
    { x: 0.35, y: 0.2 }, // R - strong horizontal
    { x: 0.2, y: 0.35 }, // S - strong vertical
    { x: 0.3, y: 0.25 }, // M - balanced
  ];

  const factor = factors[index];
  const position = positions[index];

  // Different spring configs for each letter - varied for organic feel
  const springConfig = { stiffness: 150 - index * 20, damping: 15 + index * 2 };

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Reactive transforms that update as mouse moves
  const magneticX = useTransform(springX, (val) => val * factor.x);
  const magneticY = useTransform(springY, (val) => val * factor.y);

  return (
    <motion.span
      className="inline-block"
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
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
    >
      <motion.div
        className="text-foreground flex items-center text-2xl font-black tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {letters.map((letter, i) => (
          <MagneticLetter
            key={i}
            letter={letter}
            index={i}
            isHovered={isHovered}
            mouseX={mouseX}
            mouseY={mouseY}
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
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
      className={`magnetic flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
        isMenuOpen
          ? theme === "dark"
            ? "bg-accent hover:bg-accent/90 border-white/50 hover:border-white"
            : "bg-accent hover:bg-accent/90 border-black/30 hover:border-black/50"
          : "border-border bg-surface text-foreground hover:border-accent hover:bg-elevated"
      } ${className}`}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <motion.div style={{ x: springX, y: springY, color: menuIconColor }}>
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
  return (
    <motion.button
      className="relative flex flex-col items-center justify-center gap-1.5 p-2"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="bg-foreground block h-0.5 w-6"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
  const { theme } = useTheme();

  const highlightColor = theme === "dark" ? textColor : "#1a1a1a";
  const hoverTextColor = theme === "dark" ? "#ffffff" : "#ffffff";

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {NAV_ITEMS.map((item, i) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="group relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={onClose}
        >
          <span className="relative inline-block">
            <motion.span
              className="relative z-10 block text-5xl font-black md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
              initial={false}
              animate={{ color: hoveredIndex === i ? hoverTextColor : textColor }}
              transition={{ duration: 0.3 }}
            >
              {item}
            </motion.span>
            <motion.span
              className="absolute -inset-x-5 -inset-y-2 -z-0"
              style={{ backgroundColor: highlightColor, originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function CurvedBottom({ color }: { color: string }) {
  const [path, setPath] = useState("M0,120 C480,20 960,20 1440,120 L1440,120 L0,120 Z");
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isReady || !containerRef.current) return;

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
    if (!isReady) return;
    setPath("M0,120 C480,20 960,20 1440,120 L1440,120 L0,120 Z");
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "150px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
      >
        <motion.path
          fill={color}
          initial={{ d: "M0,120 C480,120 960,120 1440,120 L1440,120 L0,120 Z" }}
          animate={{ d: path }}
          transition={{
            duration: isReady ? 0.15 : 0.6,
            ease: isReady ? "easeOut" : [0.22, 1, 0.36, 1],
            delay: isReady ? 0 : 0.3,
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
  return (
    <>
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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            delay: 0.3 + i * 0.1,
            y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
          }}
        />
      ))}
    </>
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

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 ${
          scrolled && !isOpen ? "bg-surface" : "bg-transparent"
        } ${className}`}
      >
        <motion.div
          className="bg-border absolute right-0 bottom-0 left-0 h-px"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled && !isOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <MagneticLogo />

        <div className="flex items-center gap-2">
          <ThemeToggle magnetic isMenuOpen={isOpen} />
          <LanguageToggle isMenuOpen={isOpen} />
          <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </motion.nav>

      {/* Curtain Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-accent fixed inset-0 z-40"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CurvedBottom color="var(--color-background)" />
            <FloatingShapes shapes={SHAPES_CONFIG} color="rgba(255,255,255,0.15)" />

            <div className="flex h-full items-center justify-center">
              <MenuItems onClose={() => setIsOpen(false)} textColor="var(--color-background)" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Navbar };
