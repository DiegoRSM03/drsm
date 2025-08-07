// Libs
import Link from "next/link"
// Components
import { Button } from "@/components"
// Utils
import { WRAPPER_CHILD_STYLES, WRAPPER_STYLES } from "@/utils"
import { Dictionary } from "@/dictionaries/types"

interface NavbarProps {
  dictionary: Dictionary
}

export const Navbar = ({ dictionary }: NavbarProps) => {
  const { navbar, lang } = dictionary

  return (
    <nav
      className={`${WRAPPER_STYLES} z-50 fixed top-0 left-0 h-16 bg-black hidden lg:flex`}
    >
      <div
        className={`${WRAPPER_CHILD_STYLES} flex items-center justify-between`}
      >
        {/* LOGO */}
        <Link href={navbar.logoHref}>
          <div className="text-lg text-white md:text-xl font-pixelated md:-mb-1">
            {navbar.logoText}
          </div>
        </Link>

        {/* NAV ITEMS */}
        <ul className="flex items-center gap-8 text-gray">
          {Object.entries(navbar.navItems).map(([key, navItem]) => (
            <li
              key={key}
              className="text-sm xl:text-base hover:text-white hover:cursor-pointer"
            >
              <Link href={`${lang}${navItem.href}`}>{navItem.title}</Link>
            </li>
          ))}
        </ul>

        {/* CALL TO ACTION */}
        <Button
          variant="drive"
          href={navbar.ctas.resume.href}
          target="_blank"
          className="cursor-pointer"
        >
          {navbar.ctas.resume.text}
        </Button>
      </div>
    </nav>
  )
}
