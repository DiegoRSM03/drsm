"use client";

import { forwardRef } from "react";
import { cn } from "@/utils";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const sizeClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  full: "max-w-full",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = "lg", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-6 md:px-8", sizeClasses[size], className)}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
