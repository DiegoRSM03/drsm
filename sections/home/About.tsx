// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  ABOUT_INNER_SECTIONS,
} from "@/utils"
import Image from "next/image"

const SECTION_TITLE = "About"

const renderInnerSectionDescription = (
  innerSectionKey: string,
  text: string
) => {
  return text.split("\n").map((paragraph, index) => (
    <p key={`${innerSectionKey}-paragraph-${index}`} className="even:mt-3">
      {paragraph}
    </p>
  ))
}

export const About = () => {
  return (
    <div className={`${WRAPPER_STYLES} relative z-20 -mt-[15rem]`}>
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col gap-40`}>
        {Object.entries(ABOUT_INNER_SECTIONS).map(
          ([innerSectionKey, innerSection], index) => (
            <div
              key={innerSectionKey}
              className="flex w-full gap-20 odd:flex-row even:flex-row-reverse"
            >
              {/* IMAGE SLIDER */}
              <div className="relative w-[650px] shrink-0">
                <div className="absolute w-full h-full top-5 left-5 bg-black2" />
                <Image
                  alt={`Image for about ${innerSectionKey} inner section`}
                  src={innerSection.images[0]}
                  width={650}
                  quality={100}
                  className="relative"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black1/0 from-60% to-black1">
                  <div className="absolute bottom-5 left-5">
                    {innerSection.icon}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-end">
                {index === 0 && (
                  <h2 className="mb-20 text-6xl font-jacquard">
                    {SECTION_TITLE}
                  </h2>
                )}
                <h3 className="relative mb-6 text-5xl font-jacquard">
                  {innerSection.title}
                  <div className="absolute right-0 -top-6">
                    {innerSection.backgroundIcon}
                  </div>
                </h3>
                <div className="text-sm leading-6 text-gray xl:text-base xl:leading-7">
                  {renderInnerSectionDescription(
                    innerSectionKey,
                    innerSection.description
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
