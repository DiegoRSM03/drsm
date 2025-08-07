// Libs
import Image from "next/image"
// Images
import HomeWallpaper from "@/public/images/home-wallpaper.jpg"
// Utils
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils/styles"
import { Dictionary } from "@/dictionaries/types"
// Components
import { AnimateOnScroll, Button } from "@/components"

interface LandingHeaderProps {
  dictionary: Dictionary
}

export const LandingHeader = ({ dictionary }: LandingHeaderProps) => {
  const { header } = dictionary.home.landing

  return (
    <div className="relative">
      {/* BACKGROUND */}
      <Image
        src={HomeWallpaper}
        alt={header.wallpaperAlt}
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
              {header.title}
            </h1>
            <h2 className="mt-2 text-xs md:mt-3 md:text-sm text-gray font-pixelated">
              {header.subtitle}
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.25} duration={1}>
            <p className="w-full mt-5 mb-10 text-sm leading-5 md:text-base xl:text-lg xl:max-w-screen-wrapper text-gray">
              {header.text}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.5} duration={1}>
            <Button href={header.buttonHref} target="_blank">
              {header.buttonText}
            </Button>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}
