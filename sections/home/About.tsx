// Libs
import Image from "next/image"
// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  ABOUT_INNER_SECTIONS,
  renderDescription,
} from "@/utils"
import { AnimateOnScroll, Slider } from "@/components"

const SECTION_TITLE = "About"

export const About = () => {
  return (
    <div
      className={`${WRAPPER_STYLES} relative z-20 -mt-[350px] md:-mt-[300px] xl:-mt-[280px] pt-20`}
      id="about"
    >
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col gap-20 xl:gap-40`}>
        {Object.entries(ABOUT_INNER_SECTIONS).map(
          ([innerSectionKey, innerSection], index) => {
            const isFirstInnerSection = index === 0
            const isEvenInnerSection = !!(index % 2)

            return (
              <AnimateOnScroll
                type={isEvenInnerSection ? "slideFromRight" : "slideFromLeft"}
                delay={isFirstInnerSection ? 0.8 : 0}
                duration={1}
                key={innerSectionKey}
                className="relative flex flex-col items-center w-full gap-8 group/innerSection xl:items-end md:gap-14 xl:gap-20 xl:odd:flex-row xl:even:flex-row-reverse"
              >
                {/* SECTION HEADER FOR TABLET AND MOBILE */}
                {isFirstInnerSection && (
                  <h2 className="w-full -mb-2 text-4xl md:text-5xl font-jacquard xl:hidden">
                    {SECTION_TITLE}
                  </h2>
                )}

                {/* IMAGE SLIDER */}
                <div className="relative w-full overflow-hidden xl:w-3/5 max-w-screen-wrapper shrink-1 md:shrink-0">
                  <div className="absolute w-full h-full top-5 left-5 bg-black2" />

                  <Slider images={innerSection.images} section="about" />

                  <div className="absolute z-50 w-[calc(100%+1px)] h-[calc(100%+1px)] -bottom-px -right-px bg-gradient-to-b from-black/0 from-30% md:from-60% to-black">
                    <div className="absolute right-5 xl:group-odd/innerSection:left-5 xl:group-even/innerSection:right-5 bottom-5">
                      {innerSection.icon}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-end">
                  {isFirstInnerSection && (
                    <h2 className="hidden mb-20 text-6xl font-jacquard xl:block xl:max-2xl:absolute xl:max-2xl:-top-20 xl:max-2xl:left-0 2xl:relative">
                      {SECTION_TITLE}
                    </h2>
                  )}
                  <h3 className="relative mb-2 text-3xl md:text-4xl xl:mb-6 xl:text-5xl font-jacquard">
                    {innerSection.title}
                    <div className="absolute top-0 right-0 xl:-top-6">
                      {innerSection.backgroundIcon}
                    </div>
                  </h3>
                  <div className="text-xs leading-[21px] md:leading-6 lg:text-sm text-gray xl:text-base xl:leading-7">
                    {renderDescription(
                      innerSectionKey,
                      innerSection.description
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            )
          }
        )}
      </div>
    </div>
  )
}
