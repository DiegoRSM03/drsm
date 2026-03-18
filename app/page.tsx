"use client";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Navbar } from "@/components/common/Navbar";
import { Hero, Projects, Experience, About } from "@/components/custom/home";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
      </main>
    </>
  );
}
