"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "surface" | "gradient";
  padding?: "sm" | "md" | "lg" | "none";
  container?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
}

const paddingClasses = {
  none: "",
  sm: "py-12",
  md: "py-24",
  lg: "py-36",
};

const backgroundClasses = {
  default: "bg-background",
  surface: "bg-surface",
  gradient: "bg-gradient-to-b from-background via-surface to-background",
};

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      id,
      className,
      background = "default",
      padding = "md",
      container = true,
      maxWidth = "7xl",
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full",
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
      >
        {container ? (
          <div className={cn("mx-auto w-full px-6", maxWidthClasses[maxWidth])}>{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
