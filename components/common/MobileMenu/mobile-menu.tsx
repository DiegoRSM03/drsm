"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  className?: string;
}

function MobileMenu({ isOpen, onClose, links, className }: MobileMenuProps) {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn("bg-background fixed inset-0 z-50 flex flex-col", className)}
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at calc(100% - 40px) 40px, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          />

          <div className="flex items-center justify-end p-6">
            <motion.button
              onClick={onClose}
              className="magnetic text-foreground hover:bg-surface p-2 transition-colors"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  delay: 0.15 + index * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group hover:text-accent relative text-4xl font-bold tracking-tight transition-colors md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                  <motion.span
                    className="bg-accent absolute -bottom-2 left-0 h-0.5"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-muted text-sm">Let&apos;s build something amazing together.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MobileMenu };
