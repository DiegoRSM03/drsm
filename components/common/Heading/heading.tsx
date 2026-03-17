"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";
import { AnimatedText } from "@/components/custom/TextReveal";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "xl" | "lg" | "md" | "sm";
  gradient?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  display: "text-[72px] leading-none",
  xl: "text-[48px] leading-tight",
  lg: "text-[36px] leading-snug",
  md: "text-[24px] leading-normal",
  sm: "text-[20px] leading-relaxed",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      as = "h2",
      size = "lg",
      gradient = false,
      animate = false,
      className,
    },
    ref
  ) => {
    const baseClasses = cn(
      "font-bold tracking-tight",
      sizeClasses[size],
      className
    );

    if (animate && typeof children === "string") {
      return (
        <AnimatedText
          as={as}
          className={baseClasses}
          style={{ fontFamily: "var(--font-display)" }}
          gradient={gradient}
          splitBy="chars"
          stagger={0.02}
        >
          {children}
        </AnimatedText>
      );
    }

    const Tag = as;

    return (
      <Tag
        ref={ref}
        className={cn(
          baseClasses,
          gradient && "bg-gradient-brand bg-clip-text text-transparent"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };
