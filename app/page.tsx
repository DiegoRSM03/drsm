// Sections
import { Seo } from "@/components"
import { About, Footer, LandingHeader, WorkExperience } from "@/sections"

export default function Home() {
  return (
    <>
      <Seo />
      <LandingHeader />
      <About />
      <WorkExperience />
      <Footer />
    </>
  )
}
