"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  hover?: "zoom" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  hover = "none",
  rounded = "lg",
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden", roundedClasses[rounded], containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isLoaded && (
        <div
          className={cn("bg-elevated absolute inset-0 animate-pulse", roundedClasses[rounded])}
        />
      )}

      <motion.div
        className="h-full w-full"
        animate={{
          scale: hover === "zoom" && isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {fill ? (
          <NextImage
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </motion.div>
    </div>
  );
}

export { Image };
