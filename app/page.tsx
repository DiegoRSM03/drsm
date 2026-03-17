"use client";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Navbar } from "@/components/common/Navbar";
import { Hero, Experience } from "@/components/custom/home";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Experience />
      </main>
    </>
  );
}
