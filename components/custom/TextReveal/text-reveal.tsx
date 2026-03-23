"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();

  const items = splitBy === "chars" ? children.split("") : children.split(" ");

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`${gradient ? "gradient-text" : ""} ${className}`}
      style={style}
    >
      {items.map((item, index) => (
        <m.span
          key={index}
          className="inline-block"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : delay + index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {item}
          {splitBy === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </m.span>
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
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return {};
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
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, ...getInitialPosition() }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: shouldReduceMotion ? 1 : 0, ...getInitialPosition() }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : shouldReduceMotion ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: shouldReduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
