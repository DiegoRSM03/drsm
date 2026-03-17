"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { cn } from "@/utils";
import { AnimatedLink } from "@/components/custom/AnimatedLink";
import { FadeIn } from "@/components/custom/TextReveal";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface FooterProps {
  className?: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com",
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com",
    icon: <Twitter className="h-5 w-5" />,
    label: "Twitter",
  },
  {
    href: "mailto:hello@drsm.dev",
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <FadeIn>
      <footer className={cn("border-border bg-surface border-t px-6 py-12 md:px-8", className)}>
        <div className="mx-auto flex max-w-[1024px] flex-col gap-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DRSM
              </Link>
              <p className="text-muted text-sm">
                Senior Frontend Engineer crafting exceptional digital experiences.
              </p>
            </div>

            <nav className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  underlineStyle="slide"
                  className="text-muted hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </AnimatedLink>
              ))}
            </nav>
          </div>

          <div className="border-border flex flex-col items-start justify-between gap-6 border-t pt-8 md:flex-row md:items-center">
            <p className="text-muted text-sm">
              &copy; {currentYear} Diego Sanchez. All rights reserved.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic text-muted hover:bg-elevated hover:text-foreground rounded-full p-2 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}

export { Footer };
