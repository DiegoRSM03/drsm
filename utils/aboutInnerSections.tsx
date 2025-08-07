// Libs
import { ReactNode } from "react"
import { StaticImageData } from "next/image"
// Libs
import AboutDiegoImage from "@/public/images/about-diego.jpg"
import AboutDiegoImage2 from "@/public/images/about-diego2.jpg"
import AboutDiegoImage3 from "@/public/images/about-diego3.jpg"
import AboutDiegoImage4 from "@/public/images/about-diego4.jpg"
import AboutDiegoImage5 from "@/public/images/about-diego5.jpg"
import AboutDiegoImage6 from "@/public/images/about-diego6.jpg"
import AboutTheJobImage from "@/public/images/about-thejob.jpg"
import AboutTheJobImage2 from "@/public/images/about-thejob2.jpg"
import AboutTheJobImage3 from "@/public/images/about-thejob3.jpg"
import AboutTheJobImage4 from "@/public/images/about-thejob4.jpg"
import AboutTheJobImage5 from "@/public/images/about-thejob5.jpg"
import AboutTheJobImage6 from "@/public/images/about-thejob6.jpg"
import AboutTheJobImage7 from "@/public/images/about-thejob7.jpg"
import AboutPetsImage from "@/public/images/about-pets.jpg"
import AboutPetsImage2 from "@/public/images/about-pets2.jpg"
import AboutPetsImage4 from "@/public/images/about-pets4.jpg"
import AboutPetsImage5 from "@/public/images/about-pets5.jpg"
import AboutPetsImage6 from "@/public/images/about-pets6.jpg"
import AboutPetsImage7 from "@/public/images/about-pets7.jpg"
import AboutPetsImage8 from "@/public/images/about-pets8.jpg"
// Icons
import { UserIcon, UsersIcon, PetIcon } from "@/public/icons"

type InnerSectionId = "diego" | "theJob" | "pets"

type InnerSection = {
  title: string
  description: string
  icon: ReactNode
  backgroundIcon: ReactNode
  images: StaticImageData[]
}

export const ABOUT_INNER_SECTIONS: { [t in InnerSectionId]: InnerSection } = {
  diego: {
    title: "Diego",
    description:
      "I'm an Argentinian software developer who's always looking for big challenges.\nI discovered coding years ago and since then I've been amazed at the enormous amount of solutions someone can offer just by having a laptop, and that's why I've never stopped learning about new technologies, good practices, and how to be a nice teammate.",
    icon: <UserIcon />,
    backgroundIcon: (
      <UserIcon width={120} height={150} color="rgba(255, 255, 255, 0.04)" />
    ),
    images: [
      AboutDiegoImage2,
      AboutDiegoImage,
      AboutDiegoImage3,
      AboutDiegoImage4,
      AboutDiegoImage5,
      AboutDiegoImage6,
    ],
  },
  theJob: {
    title: "The Job",
    description:
      "I love what I do, and some of the things that make me say that are the flexibility, working from home, providing solutions to dedicated clients, and most importantly, the people you can meet.\nLuckily I have found really nice people in my career so far, and I’m glad to be in touch with many of them even when we’re no longer coworkers. I feel I can easily find people who are polite, devoted to work, competent and pretty wise.",
    icon: <UsersIcon />,
    backgroundIcon: (
      <UsersIcon width={125} height={125} color="rgba(255, 255, 255, 0.04)" />
    ),
    images: [
      AboutTheJobImage,
      AboutTheJobImage2,
      AboutTheJobImage3,
      AboutTheJobImage4,
      AboutTheJobImage5,
      AboutTheJobImage6,
      AboutTheJobImage7,
    ],
  },
  pets: {
    title: "Mori & Ron",
    description:
      "They're my pets. I'd love to have them both in a single picture but they don't get along haha. Anyway, they're the priority in my house.\nMori comes from “Moribundo” (moribund) and Ron comes from “Ronroneo” (purring) 'cause he always starts purring at the slightest contact.",
    icon: <PetIcon />,
    backgroundIcon: (
      <PetIcon width={150} height={125} color="rgba(255, 255, 255, 0.04)" />
    ),
    images: [
      AboutPetsImage,
      AboutPetsImage2,
      AboutPetsImage4,
      AboutPetsImage5,
      AboutPetsImage6,
      AboutPetsImage7,
      AboutPetsImage8,
    ],
  },
}
