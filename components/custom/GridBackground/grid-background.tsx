"use client";

import { useTheme } from "@/contexts";

interface GridBackgroundProps {
  id: string;
  cellSize?: number;
  opacity?: string;
  lightMix?: string;
  stroke?: string;
}

export default function GridBackground({
  id,
  cellSize = 100,
  opacity = "0.15",
  lightMix = "30%",
  stroke,
}: GridBackgroundProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const resolvedStroke =
    stroke ??
    (isDark
      ? `rgba(255, 255, 255, ${opacity})`
      : `color-mix(in srgb, var(--color-accent) ${lightMix}, transparent)`);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke={resolvedStroke}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
