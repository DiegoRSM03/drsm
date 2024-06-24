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

const LINK_HREF = "#home"
const LOGO_TEXT = "DRSM"
const CTA_LINK_TEXT = "Curriculum"
const CTA_LINK_URL =
  "https://drive.google.com/file/d/1vX9XwE8roAbu_dKkjEBUaoQCdQ1v0ox-/view?usp=sharing"
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
    href: "#experience",
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
        <Link href={LINK_HREF}>
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
        <Button
          variant="drive"
          href={CTA_LINK_URL}
          target="_blank"
          className="cursor-pointer"
        >
          {CTA_LINK_TEXT}
        </Button>
      </div>
    </nav>
  )
}
