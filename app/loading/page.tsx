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
    <main className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h1
            className="text-foreground mb-4 text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Loading Screen
          </h1>
          <p className="text-muted">Click to preview the loading animation</p>
        </div>

        <button
          onClick={triggerLoading}
          className="border-accent/30 bg-elevated hover:border-accent hover:shadow-accent/10 mx-auto block rounded-xl border-2 px-8 py-6 text-center transition-all hover:shadow-lg"
        >
          <span
            className="text-accent text-5xl font-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DRSM
          </span>
          <p className="text-muted mt-2 text-sm">Click to preview</p>
        </button>

        <div className="border-accent/20 bg-elevated/50 mt-12 rounded-xl border p-6">
          <h2 className="text-foreground mb-4 text-xl font-semibold">Features:</h2>
          <ul className="text-muted grid gap-2 text-sm md:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              DRSM letter trace animation
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Floating geometric shapes
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Smooth entry and exit animations
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Session storage to show once per visit
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Eased progress bar
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              Tagline teaser
            </li>
          </ul>
        </div>
      </div>

      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
    </main>
  );
}
