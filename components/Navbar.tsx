// Components
import { Button } from "@/components"
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils"

interface NavItem {
  title: string
  href: string
}

const LOGO_TEXT = "DRSM"
const CTA_LINK_TEXT = "Linkedin"
const CTA_LINK_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Experience",
    href: "/experience",
  },
]

export const Navbar = () => {
  return (
    <nav className={`${WRAPPER_STYLES} z-50 fixed top-0 left-0 h-16 bg-black1`}>
      <div
        className={`${WRAPPER_CHILD_STYLES} flex items-center justify-between`}
      >
        {/* LOGO */}
        <div className="text-4xl text-white font-jacquard">{LOGO_TEXT}</div>

        {/* NAV ITEMS */}
        <ul className="flex items-center gap-8 text-gray">
          {NAV_ITEMS.map((navItem) => (
            <li
              key={navItem.href}
              className="text-sm hover:text-white hover:cursor-pointer"
            >
              {navItem.title}
            </li>
          ))}
        </ul>

        {/* CALL TO ACTION */}
        <Button href={CTA_LINK_URL} target="_blank">
          {CTA_LINK_TEXT}
        </Button>
      </div>
    </nav>
  )
}