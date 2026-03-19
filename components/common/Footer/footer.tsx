"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACCENT_HEX, EASE } from "@/utils";
import { useLenis } from "@/components/custom/LenisProvider";

const NAV_KEYS = ["experience", "projects", "about", "contact"] as const;

function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const { lenis } = useLenis();

  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: ACCENT_HEX }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Ghost monogram — mobile/tablet: full-width, half-cropped at bottom */}
      <motion.span
        className="pointer-events-none absolute bottom-[-20%] left-0 w-screen text-[42vw] leading-none font-black whitespace-nowrap text-white/[0.06] select-none lg:hidden"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE }}
        aria-hidden="true"
      >
        DRSM
      </motion.span>
      {/* Ghost monogram — desktop: positioned right */}
      <motion.span
        className="pointer-events-none absolute right-[-5%] bottom-[-20%] hidden text-[28vw] leading-none font-black text-white/[0.06] select-none lg:block"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: EASE }}
        aria-hidden="true"
      >
        DRSM
      </motion.span>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Main content row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2
              className="mb-2 text-2xl font-black text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              DIEGO SANCHEZ
            </h2>
            <p className="max-w-sm text-sm text-white/60">{t("description")}</p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="flex flex-wrap gap-4 sm:gap-5"
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(key);
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 80;
                    if (lenis) {
                      lenis.scrollTo(top, { duration: 1.2 });
                    } else {
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }
                }}
                className="focus-visible:ring-offset-accent text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {tNav(key)}
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          <p className="text-xs text-white/30">{t("copyright", { year: currentYear })}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="focus-visible:ring-offset-accent flex items-center gap-1 text-xs text-white/40 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-3 w-3" aria-hidden="true" /> {t("scrollToTop")}
          </button>
        </motion.div>
      </div>

      {/* Decorative shapes */}
      <motion.div
        className="absolute top-[20%] left-[8%] h-3 w-3 rotate-45 sm:h-4 sm:w-4"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[30%] left-[25%] h-2 w-2 rounded-full sm:h-3 sm:w-3"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </footer>
  );
}

export { Footer };
