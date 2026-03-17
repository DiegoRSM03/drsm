"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
  minimumLoadTime?: number;
}

const letters = ["D", "R", "S", "M"];

export function LoadingScreen({
  onComplete,
  minimumLoadTime = 1800,
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("drsm-loaded");

    if (hasLoaded) {
      setIsLoading(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("drsm-loaded", "true");
        onComplete?.();
      }, 500);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime, onComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-1">
            {letters.map((letter, index) => (
              <motion.span
                key={letter}
                className="text-6xl font-bold tracking-tight text-foreground md:text-8xl"
                style={{ fontFamily: "var(--font-display)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isExiting
                    ? {
                        opacity: 0,
                        y: -20,
                        scale: 1.1,
                      }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.5,
                  delay: isExiting ? index * 0.05 : 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="absolute bottom-12 left-1/2 h-[2px] -translate-x-1/2 bg-accent"
            initial={{ width: 0 }}
            animate={{ width: isExiting ? 0 : 120 }}
            transition={{
              duration: isExiting ? 0.3 : 1.2,
              delay: isExiting ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
