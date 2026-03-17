"use client";

import { cn } from "@/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  gradient?: boolean;
}

function Divider({
  orientation = "horizontal",
  className,
  gradient = false,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px self-stretch",
          gradient
            ? "bg-gradient-to-b from-transparent via-border to-transparent"
            : "bg-border",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full",
        gradient
          ? "bg-gradient-to-r from-transparent via-border to-transparent"
          : "bg-border",
        className
      )}
    />
  );
}

export { Divider };
