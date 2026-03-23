"use client";

import type { ReactNode } from "react";
import { LazyMotion, domMax } from "framer-motion";

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
