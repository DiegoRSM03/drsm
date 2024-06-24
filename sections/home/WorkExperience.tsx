// Libs
import Image from "next/image"
import Link from "next/link"
// Components
import { AnimateOnScroll, Button } from "@/components"
// Utils
import {
  WORK_EXPERIENCES,
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  renderDescription,
} from "@/utils"

const LINK_HREF = "#experience"
const WORK_EXPERIENCE_TITLE = "Experience"
const WORK_EXPERIENCE_BUTTON_TEXT = "Linkedin"
const WORK_EXPERIENCE_BUTTON_HREF =
  "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"

export const WorkExperience = () => {
  return (
    <div className={`${WRAPPER_STYLES} mt-10 xl:mt-52 pt-20`} id="experience">
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col`}>
        <AnimateOnScroll duration={0.8} className="flex justify-between w-full">
          <Link href={LINK_HREF}>
            <h2 className="text-xl md:text-xl xl:text-2xl font-pixelated">
              <span className="mr-2 text:xl xl:text-2xl text-primary">#</span>
              {WORK_EXPERIENCE_TITLE}
            </h2>
          </Link>
          <Button
            href={WORK_EXPERIENCE_BUTTON_HREF}
            target="_blank"
            className="hidden md:block"
          >
            {WORK_EXPERIENCE_BUTTON_TEXT}
          </Button>
        </AnimateOnScroll>

        <div className="flex flex-col gap-10 mt-10 mb-16 md:mt-16 xl:mb-20 xl:mt-14 xl:gap-20">
          {Object.entries(WORK_EXPERIENCES).map(
            ([workExperienceKey, workExperience]) => (
              <div
                key={workExperienceKey}
                className="flex flex-col gap-6 md:flex-row xl:gap-14"
              >
                <AnimateOnScroll
                  delay={0.1}
                  duration={0.8}
                  desktopIntersectionAmount={1}
                  mobileIntersectionAmount={0.5}
                  className="h-[100px] w-[100px] xl:h-[150px] xl:w-[150px] shrink-0"
                >
                  <Image
                    alt={`Work experience in ${workExperienceKey}`}
                    src={workExperience.companyImage}
                    className="w-full h-full"
                    width={100}
                    height={100}
                    quality={100}
                    loading="lazy"
                  />
                </AnimateOnScroll>

                <div className="flex flex-col">
                  <h3 className="mb-4 text-xs leading-5 text-white sm:mb-2 md:leading-normal xl:text-lg font-pixelated">
                    {workExperience.position}
                  </h3>
                  <h4 className="mb-5 text-[12px] text-gray font-pixelated">
                    {workExperience.duration}
                  </h4>
                  <div className="text-sm leading-[21px] md:leading-5 md:text-sm xl:leading-6 text-gray xl:text-base">
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
