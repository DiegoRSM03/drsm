"use client";

import { useState } from "react";
import NextImage from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/utils";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
  logo?: string;
  className?: string;
}

function ExperienceCard({
  company,
  role,
  period,
  description,
  technologies = [],
  logo,
  className,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.article
      className={cn("relative flex gap-6", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        <m.div
          className="border-accent bg-background relative z-10 flex h-4 w-4 items-center justify-center border-2"
          animate={{
            scale: isHovered ? 1.25 : 1,
            backgroundColor: isHovered ? "var(--color-accent)" : "var(--color-background)",
          }}
          transition={{ duration: 0.2 }}
        />
        <div className="bg-border absolute top-4 h-full w-px" />
      </div>

      <m.div
        className="border-border bg-surface flex-1 border p-6 pb-8"
        animate={{
          borderColor: isHovered ? "rgba(139, 92, 246, 0.5)" : "var(--color-border)",
          boxShadow: isHovered
            ? "0 8px 32px rgba(139, 92, 246, 0.15)"
            : "0 0 0 rgba(139, 92, 246, 0)",
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 flex items-start gap-4">
          {logo && (
            <div className="bg-elevated relative h-12 w-12 overflow-hidden">
              <NextImage src={logo} alt={company} fill className="object-contain p-2" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              {role}
            </h3>
            <p className="text-accent text-sm">{company}</p>
          </div>
          <span className="text-muted shrink-0 text-sm">{period}</span>
        </div>

        <p className="text-muted mb-4 text-sm">{description}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="bg-elevated text-muted px-3 py-1 text-xs">
                {tech}
              </span>
            ))}
          </div>
        )}
      </m.div>
    </m.article>
  );
}

export { ExperienceCard };
