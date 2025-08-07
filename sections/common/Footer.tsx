// Libs
import { ReactNode } from "react"
// Components
import {
  AnimateOnScroll,
  AnimatedNavLinks,
  Button,
  NavItem,
} from "@/components"
// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  renderDescription,
} from "@/utils"
// Icons
import { AndroidIcon, BriefcaseIcon, HomeIcon } from "@/public/icons"

export interface FooterNavItem extends NavItem {
  icon: ReactNode
}

const LINKEDIN_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const CV_URL =
  "https://drive.google.com/file/d/1vX9XwE8roAbu_dKkjEBUaoQCdQ1v0ox-/view?usp=sharing"
const MAIL_TO_URL = "mailto:diegorsm03@gmail.com"
const FOOTER_SECTION_TITLE = "Have a Nice Day!"
const FOOTER_SECTION_TEXT =
  "That's it! Thanks for reading my personal website, I hope you have a nice day!\nMade with ❤️ by DRSM."
const NAV_ITEMS: FooterNavItem[] = [
  {
    title: "Home",
    href: "/#home",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    href: "/#about",
    icon: <AndroidIcon />,
  },
  {
    title: "Experience",
    href: "/#experience",
    icon: <BriefcaseIcon />,
  },
]

export const Footer = () => {
  return (
    <div className={`${WRAPPER_STYLES} bg-black3 py-16 xl:py-28`}>
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col items-center`}>
        <AnimateOnScroll duration={0.8}>
          <p className="text-lg text-center text-white md:text-xl xl:text-2xl font-pixelated">
            {FOOTER_SECTION_TITLE}
          </p>
          <div className="mt-4 text-sm text-center md:mt-10 md:text-base xl:text-lg xl:leading-4 text-gray">
            {renderDescription("footer", FOOTER_SECTION_TEXT)}
          </div>
        </AnimateOnScroll>

        <div className="flex items-center w-full justify-evenly md:flex-col md:w-auto">
          <AnimatedNavLinks navItems={NAV_ITEMS} />

          <div className="flex flex-col items-center gap-5 mt-10 lg:flex-row md:mt-14">
            <Button href={LINKEDIN_URL} target="_blank">
              Linkedin
            </Button>
            <Button href={CV_URL} target="_blank" variant="drive">
              Resume
            </Button>
            <Button href={MAIL_TO_URL} target="_blank" variant="secondary">
              Mail
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
