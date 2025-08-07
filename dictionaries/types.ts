import { StaticImageData } from "next/image"

export type Header = {
  title: string
  subtitle: string
  text: string
  buttonText: string
  buttonHref: string
  wallpaperAlt: string
}

export type About = {
  title: string
  linkHref: string
  innerSections: {
    [key: string]: {
      title: string
      description: string
      icon: string
      images: StaticImageData[]
    }
  }
}

export type WorkExperience = {
  title: string
  linkHref: string
  buttonText: string
  buttonHref: string
  experiences: {
    [key: string]: {
      position: string
      duration: string
      description: string
    }
  }
}

export type Footer = {
  title: string
  description: string
  linkedinButton: string
  linkedinButtonHref: string
  resumeButton: string
  resumeButtonHref: string
  mailButton: string
  mailButtonHref: string
  navItems: {
    title: string
    href: string
  }[]
}

export type Landing = {
  header: Header
  about: About
  workExperience: WorkExperience
}

export type Dictionary = {
  home: {
    landing: Landing
  }
  footer: Footer
}
