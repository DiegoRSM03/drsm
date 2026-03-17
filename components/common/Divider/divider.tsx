"use client";

import { cn } from "@/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  gradient?: boolean;
}

function Divider({ orientation = "horizontal", className, gradient = false }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px self-stretch",
          gradient ? "via-border bg-gradient-to-b from-transparent to-transparent" : "bg-border",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full",
        gradient ? "via-border bg-gradient-to-r from-transparent to-transparent" : "bg-border",
        className
      )}
    />
  );
}

export { Divider };
