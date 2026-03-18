"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  category?: string;
  className?: string;
}

const levelColors = {
  beginner: "bg-muted",
  intermediate: "bg-pop",
  advanced: "bg-accent",
  expert: "bg-gradient-to-r from-accent to-pop",
};

const levelWidths = {
  beginner: "25%",
  intermediate: "50%",
  advanced: "75%",
  expert: "100%",
};

function SkillCard({ name, icon, level, category, className }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "border-border bg-surface flex flex-col items-center gap-3 border p-6",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        borderColor: isHovered ? "rgba(139, 92, 246, 0.5)" : "var(--color-border)",
        boxShadow: isHovered
          ? "0 8px 32px rgba(139, 92, 246, 0.15)"
          : "0 0 0 rgba(139, 92, 246, 0)",
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="text-accent flex h-12 w-12 items-center justify-center"
        animate={{ scale: isHovered && !shouldReduceMotion ? 1.1 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        {icon}
      </motion.div>

      <div className="text-center">
        <h4 className="font-medium" style={{ fontFamily: "var(--font-display)" }}>
          {name}
        </h4>
        {category && <p className="text-muted text-xs">{category}</p>}
      </div>

      {level && (
        <div className="w-full">
          <div className="bg-elevated h-1 w-full overflow-hidden">
            <motion.div
              className={cn("h-full", levelColors[level])}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? levelWidths[level] : "0%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-muted mt-1 text-center text-xs capitalize">{level}</p>
        </div>
      )}

      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

export { SkillCard };
