// Libs
import { ReactNode } from "react"
import Link from "next/link"
// Components
import { Button, NavItem } from "@/components"
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
        <p className="text-3xl text-center text-white md:text-5xl xl:text-6xl font-jacquard">
          {FOOTER_SECTION_TITLE}
        </p>
        <div className="mt-8 text-xs text-center md:text-sm text-gray xl:text-base">
          {renderDescription("footer", FOOTER_SECTION_TEXT)}
        </div>
        <ul className="flex flex-col justify-center gap-5 mt-10 w-min">
          {NAV_ITEMS.map((navItem) => (
            <li key={navItem.href} className="w-min">
              <Link
                href={navItem.href}
                className="flex gap-3 text-xs md:text-sm xl:text-base"
              >
                {navItem.icon}
                {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
        <Button href={CTA_LINK_URL} target="_blank" className="mt-10">
          {CTA_LINK_TEXT}
        </Button>
      </div>
    </div>
  )
}
