"use client";

import { forwardRef } from "react";
import { m } from "framer-motion";
import Link from "next/link";

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  underlineStyle?: "slide" | "fade" | "none";
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  (
    { children, href, external = false, underlineStyle = "slide", className = "", ...props },
    ref
  ) => {
    const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

    const baseStyles =
      "relative inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

    const content = (
      <m.span
        className={`${baseStyles} ${className}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <span className="relative">
          {children}
          {underlineStyle === "slide" && (
            <m.span
              className="absolute bottom-0 left-0 h-[1px] bg-current"
              variants={{
                rest: { width: 0 },
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          {underlineStyle === "fade" && (
            <m.span
              className="absolute bottom-0 left-0 h-[1px] w-full bg-current"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
            />
          )}
        </span>
        {external && (
          <m.svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              rest: { x: 0, y: 0 },
              hover: { x: 2, y: -2 },
            }}
            transition={{ duration: 0.2 }}
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </m.svg>
        )}
      </m.span>
    );

    if (external) {
      return (
        <a ref={ref} href={href} {...linkProps} {...props}>
          {content}
        </a>
      );
    }

    return (
      <Link ref={ref} href={href} {...props}>
        {content}
      </Link>
    );
  }
);

AnimatedLink.displayName = "AnimatedLink";

export { AnimatedLink };
