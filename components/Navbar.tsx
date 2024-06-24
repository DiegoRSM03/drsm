// Libs
import Link from "next/link"
// Components
import { Button } from "@/components"
// Utils
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils"

export interface NavItem {
  title: string
  href: string
}

const LOGO_TEXT = "DRSM"
const CTA_LINK_TEXT = "Linkedin"
const CTA_LINK_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Experience",
    href: "#work-experience",
  },
]

export const Navbar = () => {
  return (
    <nav
      className={`${WRAPPER_STYLES} z-50 fixed top-0 left-0 h-16 bg-black hidden lg:flex`}
    >
      <div
        className={`${WRAPPER_CHILD_STYLES} flex items-center justify-between`}
      >
        {/* LOGO */}
        <Link href="#home">
          <div className="text-lg text-white md:text-xl font-pixelated md:-mb-1">
            {LOGO_TEXT}
          </div>
        </Link>

        {/* NAV ITEMS */}
        <ul className="flex items-center gap-8 text-gray">
          {NAV_ITEMS.map((navItem) => (
            <li
              key={navItem.href}
              className="text-sm xl:text-base hover:text-white hover:cursor-pointer"
            >
              <Link href={navItem.href}>{navItem.title}</Link>
            </li>
          ))}
        </ul>

        {/* CALL TO ACTION */}
        <Button variant="secondary" href={CTA_LINK_URL} target="_blank">
          {CTA_LINK_TEXT}
        </Button>
      </div>
    </nav>
  )
}
