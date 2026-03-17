"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span";
  size?: "lg" | "base" | "sm" | "xs";
  color?: "default" | "muted" | "accent";
  className?: string;
}

const sizeClasses = {
  lg: "text-lg",
  base: "text-base",
  sm: "text-sm",
  xs: "text-xs",
};

const colorClasses = {
  default: "text-foreground",
  muted: "text-muted",
  accent: "text-accent",
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { children, as = "p", size = "base", color = "default", className },
    ref
  ) => {
    const Tag = as;

    return (
      <Tag
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(sizeClasses[size], colorClasses[color], className)}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";

export { Text };
