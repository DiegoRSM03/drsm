"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

interface LoadingScreenProps {
  onComplete?: () => void;
  minimumLoadTime?: number;
}

const letters = ["D", "R", "S", "M"];

export function LoadingScreen({ onComplete, minimumLoadTime = 2200 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("loading");

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("drsm-loaded");

    if (hasLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: skip loading if already loaded
      setIsLoading(false);
      onComplete?.();
      return;
    }

    // Animate progress bar with easeOut curve
    const startTime = Date.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / minimumLoadTime, 1);
      const easedProgress = easeOutCubic(linearProgress) * 100;
      setProgress(easedProgress);
    }, 16);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("drsm-loaded", "true");
        onComplete?.();
      }, 500);
    }, minimumLoadTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [minimumLoadTime, onComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="bg-background fixed inset-0 z-[10000] flex h-screen w-screen items-center justify-center"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating geometric shapes */}
          <div aria-hidden="true">
            {[
              { x: "5%", y: "8%", size: 48, shape: "circle", delay: 0 },
              { x: "72%", y: "5%", size: 24, shape: "square", delay: 0.2 },
              { x: "92%", y: "22%", size: 56, shape: "circle", delay: 0.4 },
              { x: "3%", y: "42%", size: 32, shape: "square", delay: 0.6 },
              { x: "88%", y: "55%", size: 20, shape: "circle", delay: 0.3 },
              { x: "18%", y: "78%", size: 64, shape: "circle", delay: 0.5 },
              { x: "65%", y: "85%", size: 36, shape: "square", delay: 0.1 },
              { x: "95%", y: "88%", size: 28, shape: "square", delay: 0.7 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.shape === "circle" ? "rounded-full" : "rounded-sm"} bg-accent`}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.size,
                  height: item.size,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isExiting ? 0 : 0.3,
                  scale: isExiting ? 0 : 1,
                  x: isExiting || shouldReduceMotion ? 0 : [0, 10, -8, 0],
                  y: isExiting || shouldReduceMotion ? 0 : [0, -8, 6, 0],
                }}
                transition={{
                  opacity: {
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : item.delay,
                  },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : item.delay,
                  },
                  x: {
                    duration: 8,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                  },
                  y: {
                    duration: 6,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                  },
                }}
              />
            ))}
          </div>

          {/* Center glow */}
          <motion.div
            className="pointer-events-none absolute h-[400px] w-[400px] rounded-full"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
            }}
            animate={{
              scale: isExiting ? 2 : shouldReduceMotion ? 1 : [1, 1.1, 1],
              opacity: isExiting ? 0 : shouldReduceMotion ? 0.8 : [0.6, 1, 0.6],
            }}
            transition={{
              duration: isExiting ? 0.4 : shouldReduceMotion ? 0 : 2,
              repeat: isExiting || shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          {/* DRSM Letters with trace effect */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1">
              {letters.map((letter, index) => (
                <div key={letter} className="relative">
                  {/* Trace outline - same size as solid letter */}
                  <motion.span
                    className="absolute inset-0 text-6xl font-black tracking-tight md:text-8xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      WebkitTextStroke: "2px rgba(139, 92, 246, 0.7)",
                      color: "transparent",
                      clipPath: `inset(0 ${100}% 0 0)`,
                    }}
                    animate={{
                      clipPath: isExiting ? `inset(0 100% 0 0)` : `inset(0 0% 0 0)`,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: isExiting ? 0 : index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>

                  {/* Solid letter that fades in after trace */}
                  <motion.span
                    className="text-foreground relative text-6xl font-black tracking-tight md:text-8xl"
                    style={{ fontFamily: "var(--font-display)" }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isExiting ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isExiting ? index * 0.05 : 0.3 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Tagline teaser */}
            <motion.p
              className="text-muted/80 text-sm tracking-wide md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: isExiting ? -10 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: isExiting ? 0 : 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("tagline")}
            </motion.p>
          </div>

          {/* Progress bar at bottom */}
          <div className="bg-accent/10 absolute right-0 bottom-0 left-0 h-2">
            <motion.div
              className="bg-accent h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
