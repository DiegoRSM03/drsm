// Libs
import Image from "next/image"
// Images
import HomeWallpaper from "@/public/images/home-wallpaper.jpg"
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
        className="object-cover h-svh"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black1/60 via-black1/90 to-black1" />

      <div className={`${WRAPPER_STYLES} h-full absolute top-0 left-0`}>
        <div
          className={`${WRAPPER_CHILD_STYLES} h-full flex flex-col justify-start pt-48`}
        >
          <h1 className="m-0 text-6xl text-white font-jacquard">
            {LANDING_HEADER_TITLE}
          </h1>
          <h2 className="mt-2 text-4xl text-gray font-jacquard">
            {LANDING_HEADER_SUBTITLE}
          </h2>
          <p className="max-w-[650px] mt-5 mb-10 leading-7 text-gray">
            {LANDING_HEADER_TEXT}
          </p>
          <Button href={LANDING_HEADER_BUTTON_HREF}>
            {LANDING_HEADER_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </div>
  )
}
