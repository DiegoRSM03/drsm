// Libs
import Image from "next/image"
// Components
import { Button } from "@/components"
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
    <div className={`${WRAPPER_STYLES} mt-52 pt-20`} id="work-experience">
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col`}>
        <div className="flex justify-between w-full">
          <h2 className="text-6xl font-jacquard">{WORK_EXPERIENCE_TITLE}</h2>
          <Button href={WORK_EXPERIENCE_BUTTON_HREF} target="_blank">
            {WORK_EXPERIENCE_BUTTON_TEXT}
          </Button>
        </div>

        <div className="flex flex-col gap-20 my-20">
          {Object.entries(WORK_EXPERIENCES).map(
            ([workExperienceKey, workExperience]) => (
              <div key={workExperienceKey} className="flex gap-14">
                <Image
                  alt={`Work experience in ${workExperienceKey}`}
                  src={workExperience.companyImage}
                  className="h-[200px]"
                  quality={85}
                />

                <div className="flex flex-col">
                  <h3 className="text-4xl text-white font-jacquard">
                    {workExperience.position}
                  </h3>
                  <h4 className="mb-5 text-3xl text-gray font-jacquard">
                    {workExperience.duration}
                  </h4>
                  <div className="leading-7 text-gray">
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
