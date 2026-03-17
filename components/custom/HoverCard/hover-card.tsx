"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowOnHover?: boolean;
}

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ children, className = "", hoverScale = 1, hoverY = -8, glowOnHover = true }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        ref={ref}
        className={`border-border bg-surface relative rounded-xl border p-6 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? hoverY : 0,
          scale: isHovered ? hoverScale : 1,
          borderColor: isHovered ? "rgba(139, 92, 246, 0.5)" : "var(--color-border)",
          boxShadow:
            isHovered && glowOnHover
              ? "0 16px 48px rgba(139, 92, 246, 0.2)"
              : "0 0 0 rgba(139, 92, 246, 0)",
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {glowOnHover && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, rgba(0,0,0,0) 70%)",
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

HoverCard.displayName = "HoverCard";

export { HoverCard };
