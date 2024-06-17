// Libs
import Image from "next/image"
// Components
import { AnimateOnScroll, Button } from "@/components"
// Utils
import {
  WORK_EXPERIENCES,
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  renderDescription,
} from "@/utils"

const WORK_EXPERIENCE_TITLE = "Work Experience"
const WORK_EXPERIENCE_BUTTON_TEXT = "Linkedin"
const WORK_EXPERIENCE_BUTTON_HREF =
  "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"

export const WorkExperience = () => {
  return (
    <div
      className={`${WRAPPER_STYLES} mt-10 xl:mt-52 pt-20`}
      id="work-experience"
    >
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col`}>
        <AnimateOnScroll duration={0.8} className="flex justify-between w-full">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-jacquard">
            {WORK_EXPERIENCE_TITLE}
          </h2>
          <Button
            href={WORK_EXPERIENCE_BUTTON_HREF}
            target="_blank"
            className="hidden md:block"
          >
            {WORK_EXPERIENCE_BUTTON_TEXT}
          </Button>
        </AnimateOnScroll>

        <div className="flex flex-col gap-10 mt-10 mb-16 md:mt-16 xl:mb-20 xl:mt-20 xl:gap-20">
          {Object.entries(WORK_EXPERIENCES).map(
            ([workExperienceKey, workExperience]) => (
              <div
                key={workExperienceKey}
                className="flex flex-col gap-6 md:flex-row xl:gap-14"
              >
                <AnimateOnScroll
                  delay={0.3}
                  duration={0.8}
                  desktopIntersectionAmount={1}
                  mobileIntersectionAmount={0.5}
                  className="h-[120px] w-[120px] xl:h-[200px] xl:w-[200px] shrink-0"
                >
                  <Image
                    alt={`Work experience in ${workExperienceKey}`}
                    src={workExperience.companyImage}
                    className="w-full h-full"
                    width={120}
                    height={120}
                    quality={100}
                    loading="lazy"
                  />
                </AnimateOnScroll>

                <div className="flex flex-col">
                  <h3 className="text-2xl text-white md:text-3xl xl:text-4xl font-jacquard">
                    {workExperience.position}
                  </h3>
                  <h4 className="mb-5 text-xl md:text-2xl xl:text-3xl text-gray font-jacquard">
                    {workExperience.duration}
                  </h4>
                  <div className="text-xs leading-[21px] md:leading-6 md:text-sm xl:leading-7 text-gray xl:text-base">
                    {renderDescription(
                      workExperienceKey,
                      workExperience.description
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
