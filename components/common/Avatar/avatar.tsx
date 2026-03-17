"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  fallback?: string;
  className?: string;
  border?: boolean;
  glow?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base",
  xl: "h-24 w-24 text-lg",
  "2xl": "h-32 w-32 text-xl",
};

const sizePx = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
  "2xl": 128,
};

function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  className,
  border = false,
  glow = false,
}: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const initials = fallback || alt.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const showFallback = !src || hasError;

  return (
    <motion.div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-elevated",
        sizeClasses[size],
        border && "ring-2 ring-border ring-offset-2 ring-offset-background",
        glow && "shadow-glow",
        className
      )}
      whileHover={glow ? { boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" } : undefined}
      transition={{ duration: 0.3 }}
    >
      {showFallback ? (
        <span
          className="font-semibold text-muted"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {initials}
        </span>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-elevated" />
          )}
          <NextImage
            src={src}
            alt={alt}
            width={sizePx[size]}
            height={sizePx[size]}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </>
      )}
    </motion.div>
  );
}

export { Avatar };
