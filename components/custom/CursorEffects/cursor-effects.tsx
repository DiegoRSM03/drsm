"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsTouchDevice } from "@/hooks";
import { useTheme } from "@/contexts";

const RADIUS = 400;

interface CursorBrightGridProps {
  cellSize?: number;
  maxOpacity?: number;
}

export function CursorBrightGrid({ cellSize = 100, maxOpacity = 0.3 }: CursorBrightGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const { theme } = useTheme();

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x - rect.left;
      const my = mouseRef.current.y - rect.top;

      if (mx < -RADIUS || mx > w + RADIUS || my < -RADIUS || my > h + RADIUS) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const isDark = theme === "dark";

      for (let x = 0; x <= w; x += cellSize) {
        if (Math.abs(x - mx) > RADIUS) continue;
        const startY = Math.max(0, my - RADIUS);
        const endY = Math.min(h, my + RADIUS);
        for (let segY = startY; segY < endY; segY += 2) {
          const segDist = Math.sqrt((x - mx) ** 2 + (segY - my) ** 2);
          if (segDist > RADIUS) continue;
          const alpha = (1 - segDist / RADIUS) * maxOpacity;
          ctx.strokeStyle = isDark
            ? `rgba(255,255,255,${alpha})`
            : `rgba(139,92,246,${alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(x, segY);
          ctx.lineTo(x, Math.min(segY + 3, endY));
          ctx.stroke();
        }
      }

      for (let y = 0; y <= h; y += cellSize) {
        const startX = Math.max(0, mx - RADIUS);
        const endX = Math.min(w, mx + RADIUS);
        for (let segX = startX; segX < endX; segX += 2) {
          const segDist = Math.sqrt((segX - mx) ** 2 + (y - my) ** 2);
          if (segDist > RADIUS) continue;
          const alpha = (1 - segDist / RADIUS) * maxOpacity;
          ctx.strokeStyle = isDark
            ? `rgba(255,255,255,${alpha})`
            : `rgba(139,92,246,${alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(segX, y);
          ctx.lineTo(Math.min(segX + 3, endX), y);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion, isTouch, cellSize, maxOpacity, theme]);

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isTouch]);

  if (shouldReduceMotion || isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

interface CursorSpotlightProps {
  radius?: number;
  maxOpacity?: number;
}

export function CursorSpotlight({ radius = 350, maxOpacity = 0.12 }: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const { theme } = useTheme();

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isInside =
        x >= -radius && x <= rect.width + radius && y >= -radius && y <= rect.height + radius;

      if (isInside) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
      } else {
        glowRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isTouch, radius]);

  if (shouldReduceMotion || isTouch) return null;

  const isDark = theme === "dark";
  const color = isDark ? "rgba(255,255,255," : "rgba(139,92,246,";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute will-change-transform"
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}${maxOpacity}) 0%, ${color}0) 70%)`,
          opacity: 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </div>
  );
}
