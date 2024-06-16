// Libs
import Image from "next/image"
// Images
import HomeWallpaper from "@/public/images/compressed/home-wallpaper.jpg"
// Utils
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils/styles"
// Components
import { Button } from "@/components"

const LANDING_HEADER_WALLPAPER_ALT = "DRSM website home wallpaper"
const LANDING_HEADER_TITLE = "Diego Rodrigo Sanchez Moreno"
const LANDING_HEADER_SUBTITLE = "Software Engineer"
const LANDING_HEADER_TEXT =
  "Currently working as a software engineer covering various roles for different kinds of projects. I have a proven track record of the several skills that I needed to develop."
const LANDING_HEADER_BUTTON_TEXT = "Linkedin"
const LANDING_HEADER_BUTTON_HREF =
  "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"

export const LandingHeader = () => {
  return (
    <div className="relative">
      {/* BACKGROUND */}
      <Image
        src={HomeWallpaper}
        alt={LANDING_HEADER_WALLPAPER_ALT}
        className="object-cover h-svh 2xl:h-[800px]"
        quality={85}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/90 to-black" />

      {/* CONTENT */}
      <div className={`${WRAPPER_STYLES} h-full absolute top-0 left-0`}>
        <div
          className={`${WRAPPER_CHILD_STYLES} h-full flex flex-col justify-start pt-48 2xl:pt-40`}
        >
          <h1 className="m-0 text-5xl text-white xl:text-6xl font-jacquard">
            {LANDING_HEADER_TITLE}
          </h1>
          <h2 className="mt-2 text-3xl xl:text-4xl text-gray font-jacquard">
            {LANDING_HEADER_SUBTITLE}
          </h2>
          <p className="w-full mt-5 mb-10 leading-7 xl:max-w-screen-wrapper text-gray md:text-base">
            {LANDING_HEADER_TEXT}
          </p>
          <Button href={LANDING_HEADER_BUTTON_HREF} target="_blank">
            {LANDING_HEADER_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </div>
  )
}
