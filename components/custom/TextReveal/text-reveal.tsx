"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  once?: boolean;
  gradient?: boolean;
  splitBy?: "chars" | "words";
}

export function AnimatedText({
  children,
  as: Component = "p",
  className = "",
  style,
  delay = 0,
  stagger = 0.03,
  once = true,
  gradient = false,
  splitBy = "words",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const items = splitBy === "chars" ? children.split("") : children.split(" ");

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`${gradient ? "gradient-text" : ""} ${className}`}
      style={style}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: delay + index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {item}
          {splitBy === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  distance?: number;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
  distance = 40,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
