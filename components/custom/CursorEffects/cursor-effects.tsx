"use client";

import { useRef, useEffect } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useIsTouchDevice } from "@/hooks";
import { useTheme } from "@/contexts";

const RADIUS = 280;

interface CursorBrightGridProps {
  cellSize?: number;
  maxOpacity?: number;
}

export function CursorBrightGrid({ cellSize = 100, maxOpacity = 0.3 }: CursorBrightGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
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
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      canvas.width = Math.round(rect.width) * dpr;
      canvas.height = Math.round(rect.height) * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", resize, { passive: true });

    const draw = () => {
      const w = rectRef.current.width;
      const h = rectRef.current.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x - rectRef.current.left;
      const my = mouseRef.current.y - rectRef.current.top;

      if (mx < -RADIUS || mx > w + RADIUS || my < -RADIUS || my > h + RADIUS) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      for (let x = 0; x <= w; x += cellSize) {
        if (Math.abs(x - mx) > RADIUS) continue;
        const startY = Math.max(0, my - RADIUS);
        const endY = Math.min(h, my + RADIUS);
        for (let segY = startY; segY < endY; segY += 2) {
          const segDist = Math.sqrt((x - mx) ** 2 + (segY - my) ** 2);
          if (segDist > RADIUS) continue;
          const alpha = (1 - segDist / RADIUS) * maxOpacity;
          ctx.strokeStyle =
            theme === "dark" ? `rgba(255,255,255,${alpha})` : `rgba(124,58,237,${alpha * 1.5})`;
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
          ctx.strokeStyle =
            theme === "dark" ? `rgba(255,255,255,${alpha})` : `rgba(124,58,237,${alpha * 1.5})`;
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
      window.removeEventListener("scroll", resize);
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

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const { theme } = useTheme();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const containerRef = useRef<HTMLDivElement>(null);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 30 });

  useEffect(() => {
    if (shouldReduceMotion || isTouch) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [shouldReduceMotion, isTouch, mouseX, mouseY]);

  if (shouldReduceMotion || isTouch) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      <m.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
          background:
            theme === "dark"
              ? "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 20%, transparent) 0%, color-mix(in srgb, var(--color-accent) 7%, transparent) 45%, transparent 60%)"
              : "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 8%, transparent) 0%, color-mix(in srgb, var(--color-accent) 3%, transparent) 45%, transparent 60%)",
        }}
      />
    </div>
  );
}
