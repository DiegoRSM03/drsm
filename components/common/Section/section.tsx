"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "surface" | "gradient";
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "py-12",
  md: "py-24",
  lg: "py-36",
};

const backgroundClasses = {
  default: "bg-background",
  surface: "bg-surface",
  gradient: "bg-gradient-to-b from-background via-surface to-background",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { children, id, className, background = "default", padding = "md" },
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
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
