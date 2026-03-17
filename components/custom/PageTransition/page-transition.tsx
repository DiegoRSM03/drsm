"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1] as const,
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
