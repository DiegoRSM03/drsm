// Libs
import Image from "next/image"
// Images
import HomeWallpaper from "@/public/images/home-wallpaper.jpg"
// Utils
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils/styles"
// Components
import { AnimateOnScroll, Button } from "@/components"

const LANDING_HEADER_WALLPAPER_ALT = "DRSM website home wallpaper"
const LANDING_HEADER_TITLE = "Diego Rodrigo Sanchez Moreno"
const LANDING_HEADER_SUBTITLE = "Software Engineer"
const LANDING_HEADER_TEXT =
  "What's up? 👨‍💻 I'm a web developer who doesn't shy away from big challenges, I consider them the key for a nice growth. I have a proven track record of the several skills that I've been working out during these years."
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
        className="object-cover h-screen md:h-[900px]"
        quality={85}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 50vw, 100vw"
        priority
      />
      <div className="absolute left-0 w-full h-[calc(100%+1px)] -bottom-px bg-gradient-to-b from-black/60 via-black/90 to-black" />

      {/* CONTENT */}
      <div className={`${WRAPPER_STYLES} h-full absolute top-0 left-0`}>
        <div
          className={`${WRAPPER_CHILD_STYLES} h-full flex flex-col justify-start pt-32 md:pt-48 xl:pt-56`}
        >
          <AnimateOnScroll duration={1}>
            <h1 className="m-0 text-base text-white md:text-xl xl:text-2xl font-pixelated">
              {LANDING_HEADER_TITLE}
            </h1>
            <h2 className="mt-2 text-xs md:mt-3 md:text-sm text-gray font-pixelated">
              {LANDING_HEADER_SUBTITLE}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.25} duration={1}>
            <p className="w-full mt-5 mb-10 text-sm leading-5 md:text-base xl:text-lg xl:max-w-screen-wrapper text-gray">
              {LANDING_HEADER_TEXT}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.5} duration={1}>
            <Button href={LANDING_HEADER_BUTTON_HREF} target="_blank">
              {LANDING_HEADER_BUTTON_TEXT}
            </Button>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
