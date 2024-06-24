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

const CTA_LINK_TEXT = "Linkedin"
const CTA_LINK_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const FOOTER_SECTION_TITLE = "Have a Nice Day!"
const FOOTER_SECTION_TEXT =
  "That’s it! Thanks for reading my personal website, hope you have a nice day!\nMade with ❤️ by DRSM."
const NAV_ITEMS: FooterNavItem[] = [
  {
    title: "Home",
    href: "#home",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    href: "#about",
    icon: <AndroidIcon />,
  },
  {
    title: "Experience",
    href: "#work-experience",
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
          <div className="mt-8 text-sm text-center md:text-base xl:text-lg xl:leading-4 text-gray">
            {renderDescription("footer", FOOTER_SECTION_TEXT)}
          </div>
        </AnimateOnScroll>

        <AnimatedNavLinks navItems={NAV_ITEMS} />

        <Button href={CTA_LINK_URL} target="_blank" className="mt-10">
          {CTA_LINK_TEXT}
        </Button>
      </div>
    </div>
  )
}
