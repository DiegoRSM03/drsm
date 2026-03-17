"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "magnetic" | "text" | "hidden";

interface MagneticTarget {
  element: HTMLElement;
  rect: DOMRect;
  centerX: number;
  centerY: number;
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const magneticTarget = useRef<MagneticTarget | null>(null);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const circleX = useSpring(dotX, springConfig);
  const circleY = useSpring(dotY, springConfig);

  const magneticSpring = { stiffness: 150, damping: 20 };
  const magneticX = useSpring(0, magneticSpring);
  const magneticY = useSpring(0, magneticSpring);

  const updateCursorPosition = useCallback(() => {
    let targetX = mouseX.current;
    let targetY = mouseY.current;

    if (magneticTarget.current && cursorState === "magnetic") {
      const { centerX, centerY, rect } = magneticTarget.current;
      const dx = mouseX.current - centerX;
      const dy = mouseY.current - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.max(rect.width, rect.height);
      const pull = Math.max(0, 1 - distance / maxDistance);

      const offsetX = dx * pull * 0.4;
      const offsetY = dy * pull * 0.4;

      magneticX.set(offsetX);
      magneticY.set(offsetY);

      targetX = centerX + offsetX;
      targetY = centerY + offsetY;
    } else {
      magneticX.set(0);
      magneticY.set(0);
    }

    dotX.set(targetX);
    dotY.set(targetY);
  }, [cursorState, dotX, dotY, magneticX, magneticY]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      updateCursorPosition();

      if (!isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible, updateCursorPosition]
  );

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    const checkTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: detect device type on mount
    setIsTouchDevice(checkTouchDevice);

    if (checkTouchDevice) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  useEffect(() => {
    if (isTouchDevice) return;

    const setupInteractiveElements = () => {
      const magneticElements = document.querySelectorAll(".magnetic");
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );

      magneticElements.forEach((el) => {
        const element = el as HTMLElement;

        const handleEnter = () => {
          const rect = element.getBoundingClientRect();
          magneticTarget.current = {
            element,
            rect,
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
          };
          setCursorState("magnetic");
        };

        const handleLeave = () => {
          magneticTarget.current = null;
          setCursorState("default");
          magneticX.set(0);
          magneticY.set(0);
        };

        const handleMove = () => {
          if (magneticTarget.current?.element === element) {
            const rect = element.getBoundingClientRect();
            magneticTarget.current = {
              element,
              rect,
              centerX: rect.left + rect.width / 2,
              centerY: rect.top + rect.height / 2,
            };
            updateCursorPosition();
          }
        };

        element.addEventListener("mouseenter", handleEnter);
        element.addEventListener("mouseleave", handleLeave);
        element.addEventListener("mousemove", handleMove);
      });

      interactiveElements.forEach((el) => {
        if (el.classList.contains("magnetic")) return;

        el.addEventListener("mouseenter", () => setCursorState("hover"));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
    };

    setupInteractiveElements();

    const observer = new MutationObserver(() => {
      setupInteractiveElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouchDevice, magneticX, magneticY, updateCursorPosition]);

  useEffect(() => {
    if (isTouchDevice) return;

    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.id = "custom-cursor-styles";
    style.textContent = `
      *:not(nextjs-portal):not(nextjs-portal *):not([data-nextjs-dialog]):not([data-nextjs-dialog] *),
      *:not(nextjs-portal):not(nextjs-portal *)::before,
      *:not(nextjs-portal):not(nextjs-portal *)::after {
        cursor: none !important;
      }
      nextjs-portal, nextjs-portal *, [data-nextjs-dialog], [data-nextjs-dialog] * {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = "";
      style.remove();
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const getDotSize = () => {
    if (isClicking) return 4;
    switch (cursorState) {
      case "hover":
        return 4;
      case "magnetic":
        return 0;
      case "text":
        return 2;
      default:
        return 8;
    }
  };

  const getCircleSize = () => {
    if (isClicking) return 36;
    switch (cursorState) {
      case "hover":
        return 60;
      case "magnetic":
        return 80;
      case "text":
        return 0;
      default:
        return 40;
    }
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-accent mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: getDotSize(),
          height: getDotSize(),
          opacity: isVisible && cursorState !== "magnetic" ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border-2 border-accent/50"
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: getCircleSize(),
          height: getCircleSize(),
          opacity: isVisible ? 0.8 : 0,
          scale: isClicking ? 0.9 : 1,
          backgroundColor:
            cursorState === "hover" || cursorState === "magnetic"
              ? "rgba(139, 92, 246, 0.1)"
              : "rgba(0, 0, 0, 0)",
          borderColor:
            cursorState === "magnetic"
              ? "rgba(139, 92, 246, 0.8)"
              : "rgba(139, 92, 246, 0.5)",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
