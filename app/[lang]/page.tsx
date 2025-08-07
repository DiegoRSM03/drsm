// Utils
import { getDictionary, Locale } from "@/dictionaries/dictionaries"
// Sections
import { About, Footer, LandingHeader, WorkExperience } from "@/sections"

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)

  return (
    <>
      <LandingHeader dictionary={dictionary} />
      <About dictionary={dictionary} />
      <WorkExperience dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </>
  )
}

export default Home
