// Components
import { AnimateOnScroll, AnimatedNavLinks, Button } from "@/components"
// Utils
import {
  WRAPPER_CHILD_STYLES,
  WRAPPER_STYLES,
  renderDescription,
} from "@/utils"
import { Dictionary } from "@/dictionaries/types"
// Icons
import { AndroidIcon, BriefcaseIcon, HomeIcon } from "@/public/icons"

const NAV_ITEMS_ICONS = {
  home: <HomeIcon />,
  about: <AndroidIcon />,
  experience: <BriefcaseIcon />,
}

interface FooterProps {
  dictionary: Dictionary
}

export const Footer = ({ dictionary }: FooterProps) => {
  const { footer, lang } = dictionary
  const navItems = Object.entries(footer.navItems).map(([key, navItem]) => ({
    ...navItem,
    icon: NAV_ITEMS_ICONS[key as keyof typeof NAV_ITEMS_ICONS],
    href: `${lang}${navItem.href}`,
  }))

  return (
    <div className={`${WRAPPER_STYLES} bg-black3 py-16 xl:py-28`}>
      <div className={`${WRAPPER_CHILD_STYLES} flex flex-col items-center`}>
        <AnimateOnScroll duration={0.8}>
          <p className="text-lg text-center text-white md:text-xl xl:text-2xl font-pixelated">
            {footer.title}
          </p>
          <div className="mt-4 text-sm text-center md:mt-10 md:text-base xl:text-lg xl:leading-4 text-gray">
            {renderDescription("footer", footer.description)}
          </div>
        </AnimateOnScroll>

        <div className="flex items-center w-full justify-evenly md:flex-col md:w-auto">
          <AnimatedNavLinks navItems={navItems} />

          <div className="flex flex-col items-center gap-5 mt-10 lg:flex-row md:mt-14">
            <Button href={footer.linkedinButtonHref} target="_blank">
              {footer.linkedinButton}
            </Button>
            <Button
              href={footer.resumeButtonHref}
              target="_blank"
              variant="drive"
            >
              {footer.resumeButton}
            </Button>
            <Button
              href={footer.mailButtonHref}
              target="_blank"
              variant="secondary"
            >
              {footer.mailButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
