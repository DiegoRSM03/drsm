// Libs
import Image from "next/image"
// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  ABOUT_INNER_SECTIONS,
  renderDescription,
} from "@/utils"

const SECTION_TITLE = "About"

export const About = () => {
  return (
    <div className={`${WRAPPER_STYLES} relative z-20 -mt-64 pt-20`} id="about">
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col gap-20 lg:gap-40`}>
        {Object.entries(ABOUT_INNER_SECTIONS).map(
          ([innerSectionKey, innerSection], index) => (
            <div
              key={innerSectionKey}
              className="flex flex-col items-center w-full lg:items-start gap-14 lg:gap-20 lg:odd:flex-row lg:even:flex-row-reverse"
            >
              {/* IMAGE SLIDER */}
              {index === 0 && (
                <h2 className="w-full -mb-8 text-5xl font-jacquard lg:hidden">
                  {SECTION_TITLE}
                </h2>
              )}
              <div className="relative w-full max-w-[650px] shrink-0">
                <div className="absolute w-full h-full top-5 left-5 bg-black2" />
                <Image
                  alt={`Image for about ${innerSectionKey} inner section`}
                  src={innerSection.images[0]}
                  width={700}
                  quality={100}
                  className="relative"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/0 from-60% to-black">
                  <div className="absolute bottom-5 left-5">
                    {innerSection.icon}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-end">
                {index === 0 && (
                  <h2 className="hidden mb-20 text-6xl font-jacquard lg:visible">
                    {SECTION_TITLE}
                  </h2>
                )}
                <h3 className="relative mb-2 text-4xl lg:mb-6 lg:text-5xl font-jacquard">
                  {innerSection.title}
                  <div className="absolute top-0 right-0 lg:-top-6">
                    {innerSection.backgroundIcon}
                  </div>
                </h3>
                <div className="text-sm leading-6 text-gray xl:text-base xl:leading-7">
                  {renderDescription(innerSectionKey, innerSection.description)}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
