"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: [0.22, 1, 0.36, 1] as const,
          when: "beforeChildren",
          staggerChildren: shouldReduceMotion ? 0 : 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionItemProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransitionItem({ children, className = "" }: PageTransitionItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
