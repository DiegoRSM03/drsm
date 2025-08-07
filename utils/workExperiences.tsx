// Libs
import { StaticImageData } from "next/image"
// Images
import LiteboxCompanyImage from "@/public/images/workExperienceLitebox.png"
import AxonCompanyImage from "@/public/images/workExperienceAxon.png"

type WorkExperienceId = "litebox" | "axon"

type WorkExperience = {
  companyImage: StaticImageData
}

export const WORK_EXPERIENCES: { [w in WorkExperienceId]: WorkExperience } = {
  litebox: {
    companyImage: LiteboxCompanyImage,
  },
  axon: {
    companyImage: AxonCompanyImage,
  },
}
