// Sections
import { About, Footer, LandingHeader, WorkExperience } from "@/sections"
import { NextSeo } from "next-seo"
import OpenGraphImage from "@/public/images/original/open-graph-image.png"

export default function Home() {
  return (
    <>
      <NextSeo
        title="DRSM - Diego Rodrigo Sanchez Moreno personal website"
        description="DRSM Software Engineer personal website"
        openGraph={{
          title: "DRSM - Personal Website",
          description: "DRSM Software Engineer personal website",
          images: [{ url: OpenGraphImage.src }],
          siteName: "DRSM",
        }}
      />
      <LandingHeader />
      <About />
      <WorkExperience />
      <Footer />
    </>
  )
}
