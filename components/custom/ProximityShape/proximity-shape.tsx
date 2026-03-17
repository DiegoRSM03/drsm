"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, MotionValue } from "framer-motion";

const PROXIMITY_RADIUS = 150;

export interface ProximityShapeData {
  type: "square" | "diamond" | "circle" | "triangle";
  x: string;
  y: string;
  size: number;
  color: string;
  filled: boolean;
  floatDuration: number;
  floatDelay: number;
}

export function ProximityShape({
  shape,
  mouseX,
  mouseY,
}: {
  shape: ProximityShapeData;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pushX = useMotionValue(0);
  const pushY = useMotionValue(0);
  const springPushX = useSpring(pushX, { stiffness: 120, damping: 20 });
  const springPushY = useSpring(pushY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubX = mouseX.on("change", () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const shapeCenterX = rect.left + rect.width / 2;
      const shapeCenterY = rect.top + rect.height / 2;
      const mx = mouseX.get();
      const my = mouseY.get();
      const dx = shapeCenterX - mx;
      const dy = shapeCenterY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < PROXIMITY_RADIUS && dist > 0) {
        const force = (1 - dist / PROXIMITY_RADIUS) * 40;
        pushX.set((dx / dist) * force);
        pushY.set((dy / dist) * force);
      } else {
        pushX.set(0);
        pushY.set(0);
      }
    });

    return () => unsubX();
  }, [mouseX, mouseY, pushX, pushY, shouldReduceMotion]);

  const renderShape = () => {
    const solidStyle = { backgroundColor: shape.color };
    const borderedStyle = { border: `2px solid ${shape.color}`, backgroundColor: "transparent" };
    const baseStyle = shape.filled ? solidStyle : borderedStyle;

    if (shape.type === "circle") {
      return (
        <div style={{ width: shape.size, height: shape.size, borderRadius: "50%", ...baseStyle }} />
      );
    }
    if (shape.type === "diamond") {
      return (
        <div
          style={{
            width: shape.size,
            height: shape.size,
            transform: "rotate(45deg)",
            ...baseStyle,
          }}
        />
      );
    }
    if (shape.type === "triangle" && shape.filled) {
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
          }}
        />
      );
    }
    if (shape.type === "triangle" && !shape.filled) {
      return (
        <svg
          width={shape.size}
          height={shape.size}
          viewBox={`0 0 ${shape.size} ${shape.size}`}
          fill="none"
        >
          <polygon
            points={`${shape.size / 2},0 ${shape.size},${shape.size} 0,${shape.size}`}
            stroke={shape.color}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    }
    return <div style={{ width: shape.size, height: shape.size, ...baseStyle }} />;
  };

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute"
      style={{
        left: shape.x,
        top: shape.y,
        x: springPushX,
        y: springPushY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0], x: [0, 5, -5, 0] }}
        transition={{
          duration: shape.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: shape.floatDelay,
        }}
      >
        {renderShape()}
      </motion.div>
    </motion.div>
  );
}
