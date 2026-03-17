"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
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

  return (
    <motion.article
      className={cn("relative flex gap-6", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background"
          animate={{
            scale: isHovered ? 1.25 : 1,
            backgroundColor: isHovered
              ? "var(--color-accent)"
              : "var(--color-background)",
          }}
          transition={{ duration: 0.2 }}
        />
        <div className="absolute top-4 h-full w-px bg-border" />
      </div>

      <motion.div
        className="flex-1 rounded-xl border border-border bg-surface p-6 pb-8"
        animate={{
          borderColor: isHovered
            ? "rgba(139, 92, 246, 0.5)"
            : "var(--color-border)",
          boxShadow: isHovered
            ? "0 8px 32px rgba(139, 92, 246, 0.15)"
            : "0 0 0 rgba(139, 92, 246, 0)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4 flex items-start gap-4">
          {logo && (
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-elevated">
              <NextImage
                src={logo}
                alt={company}
                fill
                className="object-contain p-2"
              />
            </div>
          )}
          <div className="flex-1">
            <h3
              className="text-lg font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {role}
            </h3>
            <p className="text-sm text-accent">{company}</p>
          </div>
          <span className="shrink-0 text-sm text-muted">{period}</span>
        </div>

        <p className="mb-4 text-sm text-muted">{description}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-elevated px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}

export { ExperienceCard };
