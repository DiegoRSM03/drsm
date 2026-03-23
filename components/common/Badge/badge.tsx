"use client";

import { forwardRef } from "react";
import { m } from "framer-motion";
import { cn } from "@/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "pop" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const variantClasses = {
  default: "bg-elevated text-muted",
  accent: "bg-accent/20 text-accent",
  pop: "bg-pop/20 text-pop",
  outline: "border border-border bg-transparent text-muted",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", size = "md", className, animated = false }, ref) => {
    const Component = animated ? m.span : "span";

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...(animated && {
          whileHover: { scale: 1.05 },
          transition: { duration: 0.2 },
        })}
      >
        {children}
      </Component>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
