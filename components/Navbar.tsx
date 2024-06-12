// Libs
import Link from "next/link";

interface NavItem {
  title: string;
  href: string;
}

const LOGO_TEXT = "DRSM"
const CTA_LINK_TEXT = "Linkedin"
const CTA_LINK_URL = "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
const NAV_ITEMS: NavItem[] = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Experience',
    href: '/experience'
  },
]

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 flex items-center justify-between w-full h-16 px-20 bg-black1">
      {/* LOGO */}
      <div className="text-4xl text-white font-jacquard">{LOGO_TEXT}</div>

      {/* NAV ITEMS */}
      <ul className="flex items-center gap-8 text-gray">
        {NAV_ITEMS.map(navItem => (
          <li className="hover:text-white hover:cursor-pointer">{navItem.title}</li>
        ))}
      </ul>

      {/* CALL TO ACTION */}
      <Link href={CTA_LINK_URL} className="text-white">{CTA_LINK_TEXT}</Link>
    </nav>
  )
}