"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { AnimatedLink } from "@/components/custom/AnimatedLink";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  className?: string;
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ className, links = defaultLinks }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 50);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={cn("fixed top-0 right-0 left-0 z-50 px-6 py-4 md:px-8", className)}
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: isHidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 border-b transition-colors duration-300",
            isScrolled
              ? "border-border/50 bg-background/80 backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        />

        <div className="relative mx-auto flex max-w-[1024px] items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DRSM
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <AnimatedLink
                key={link.href}
                href={link.href}
                underlineStyle="slide"
                className="text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </AnimatedLink>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="magnetic relative z-50 p-2"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="bg-background fixed inset-0 z-40 flex flex-col items-center justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 32px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-accent text-4xl font-bold tracking-tight transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Navbar };
