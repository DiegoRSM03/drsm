"use client";

import { cn } from "@/utils";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function Skeleton({ width, height, rounded = "md", className }: SkeletonProps) {
  return (
    <div
      className={cn("bg-elevated relative overflow-hidden", roundedClasses[rounded], className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.08) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={16} width={i === lines - 1 ? "60%" : "100%"} rounded="sm" />
      ))}
    </div>
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("border-border bg-surface rounded-xl border p-6", className)}>
      <Skeleton height={200} rounded="lg" className="mb-4" />
      <Skeleton height={24} width="70%" rounded="sm" className="mb-2" />
      <SkeletonText lines={2} />
      <div className="mt-4 flex gap-2">
        <Skeleton height={24} width={60} rounded="full" />
        <Skeleton height={24} width={80} rounded="full" />
        <Skeleton height={24} width={50} rounded="full" />
      </div>
    </div>
  );
}

function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  return <Skeleton width={sizes[size]} height={sizes[size]} rounded="full" className={className} />;
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
