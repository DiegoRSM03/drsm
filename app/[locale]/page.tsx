"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/common/Navbar";
import { Hero } from "@/components/custom/home";

const LoadingScreen = dynamic(
  () => import("@/components/common/LoadingScreen").then((m) => m.LoadingScreen),
  { ssr: false }
);

const Projects = dynamic(() => import("@/components/custom/home/Projects").then((m) => m.Projects));
const Experience = dynamic(() =>
  import("@/components/custom/home/Experience").then((m) => m.Experience)
);
const About = dynamic(() => import("@/components/custom/home/About").then((m) => m.About));
const Contact = dynamic(() => import("@/components/custom/home/Contact").then((m) => m.Contact));
const Footer = dynamic(() => import("@/components/common/Footer").then((m) => m.Footer));

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
