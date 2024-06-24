// Libs
import Link from "next/link"
// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  ABOUT_INNER_SECTIONS,
  renderDescription,
} from "@/utils"
import { AnimateOnScroll, Slider } from "@/components"

const SECTION_TITLE = "About"
const LINK_HREF = "#about"

export const About = () => {
  return (
    <div
      className={`${WRAPPER_STYLES} relative z-20 -mt-[200px] sm:-mt-[350px] md:-mt-[300px] xl:-mt-[280px] pt-20`}
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
                delay={isFirstInnerSection ? 1 : 0}
                mobileIntersectionAmount={!isFirstInnerSection ? 0.5 : 0}
                duration={1}
                key={innerSectionKey}
                className="relative flex flex-col items-center w-full gap-10 group/innerSection xl:items-end md:gap-14 xl:gap-8 2xl:gap-12 xl:odd:flex-row xl:even:flex-row-reverse"
              >
                {/* SECTION HEADER FOR TABLET AND MOBILE */}
                {isFirstInnerSection && (
                  <Link href={LINK_HREF} className="w-full xl:hidden">
                    <h2 className="w-full -mb-2 text-xl md:-mb-8 md:text-2xl font-pixelated">
                      <span className="mr-2 text-xl text-primary">#</span>
                      {SECTION_TITLE}
                    </h2>
                  </Link>
                )}

                {/* IMAGE SLIDER */}
                <div className="relative w-full xl:w-3/5 max-w-screen-wrapper shrink-1 md:shrink-0">
                  <div className="absolute w-full h-full rounded-md top-5 left-5 bg-black2/50" />

                  <Slider images={innerSection.images} section="about" />

                  <div className="rounded-md overflow-hidden absolute z-50 w-[calc(100%+1px)] h-[calc(100%+1px)] -bottom-px -right-px bg-gradient-to-b from-black/0 from-60% md:from-80% to-tertiary">
                    <div className="absolute right-5 xl:group-odd/innerSection:left-5 xl:group-even/innerSection:right-5 bottom-5">
                      {innerSection.icon}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-end">
                  {isFirstInnerSection && (
                    <Link href={LINK_HREF} className="hidden xl:block">
                      <h2 className="mb-20 text-2xl font-pixelated xl:max-2xl:absolute xl:max-2xl:-top-20 xl:max-2xl:left-0 2xl:relative">
                        <span className="mr-2 xl:text-2xl text-primary">#</span>
                        {SECTION_TITLE}
                      </h2>
                    </Link>
                  )}
                  <h3 className="relative mb-4 text-base md:mb-2 md:text-xl xl:mb-3 xl:text-xl font-pixelated">
                    {innerSection.title}
                    <div className="absolute top-0 right-0 xl:-top-10">
                      {innerSection.backgroundIcon}
                    </div>
                  </h3>
                  <div className="text-sm md:text-base leading-[21px] md:leading-5 lg:text-sm text-gray xl:text-base xl:leading-6">
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
