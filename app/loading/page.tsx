"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/common";

export default function LoadingShowcase() {
  const [showLoading, setShowLoading] = useState(false);

  const triggerLoading = () => {
    sessionStorage.removeItem("drsm-loaded");
    setShowLoading(true);
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1
            className="mb-4 text-4xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Loading Screen
          </h1>
          <p className="text-muted">
            Click to preview the loading animation
          </p>
        </div>

        <button
          onClick={triggerLoading}
          className="mx-auto block rounded-xl border-2 border-accent/30 bg-elevated px-8 py-6 text-center transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
        >
          <span
            className="text-5xl font-black text-accent"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DRSM
          </span>
          <p className="mt-2 text-sm text-muted">
            Click to preview
          </p>
        </button>

        <div className="mt-12 rounded-xl border border-accent/20 bg-elevated/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Features:
          </h2>
          <ul className="grid gap-2 text-sm text-muted md:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              DRSM letter trace animation
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Floating geometric shapes
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Smooth entry and exit animations
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Session storage to show once per visit
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Eased progress bar
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Tagline teaser
            </li>
          </ul>
        </div>
      </div>

      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}
    </main>
  );
}
