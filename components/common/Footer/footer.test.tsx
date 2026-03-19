import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const filterMotionProps = (props: Record<string, unknown>) => {
  const motionPropKeys = [
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport",
    "variants",
  ];
  const filtered: Record<string, unknown> = {};
  for (const key in props) {
    if (!motionPropKeys.includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <nav {...filterMotionProps(props)}>{children}</nav>
    ),
  },
  useReducedMotion: () => false,
  useInView: () => true,
}));

jest.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("lucide-react", () => ({
  ArrowUp: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-up-icon" className={className} />
  ),
}));

jest.mock("@/components/custom/LenisProvider", () => ({
  useLenis: () => ({ lenis: null }),
}));

import { Footer } from "./footer";

describe("Footer", () => {
  describe("Rendering", () => {
    it("renders the footer element", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("renders the brand name", () => {
      render(<Footer />);
      expect(screen.getByText("DIEGO SANCHEZ")).toBeInTheDocument();
    });

    it("renders the tagline", () => {
      render(<Footer />);
      expect(screen.getByText("footer.description")).toBeInTheDocument();
    });

    it("renders all navigation links", () => {
      render(<Footer />);
      expect(screen.getByText("nav.experience")).toBeInTheDocument();
      expect(screen.getByText("nav.projects")).toBeInTheDocument();
      expect(screen.getByText("nav.about")).toBeInTheDocument();
      expect(screen.getByText("nav.contact")).toBeInTheDocument();
    });

    it("renders copyright with current year", () => {
      render(<Footer />);
      expect(screen.getByText("footer.copyright")).toBeInTheDocument();
    });

    it("renders back to top button", () => {
      render(<Footer />);
      expect(screen.getByLabelText("Scroll back to top")).toBeInTheDocument();
    });

    it("renders ghost monogram", () => {
      render(<Footer />);
      const monograms = screen.getAllByText("DRSM");
      expect(monograms.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("has role contentinfo", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toHaveAttribute("aria-label", "Site footer");
    });

    it("has navigation with aria-label", () => {
      render(<Footer />);
      expect(screen.getByRole("navigation", { name: "Footer navigation" })).toBeInTheDocument();
    });

    it("decorative elements are hidden from screen readers", () => {
      render(<Footer />);
      const hidden = document.querySelectorAll('[aria-hidden="true"]');
      expect(hidden.length).toBeGreaterThanOrEqual(3);
    });

    it("back to top button has descriptive aria-label", () => {
      render(<Footer />);
      expect(screen.getByLabelText("Scroll back to top")).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("navigation links have correct hrefs", () => {
      render(<Footer />);
      expect(screen.getByText("nav.experience").closest("a")).toHaveAttribute(
        "href",
        "#experience"
      );
      expect(screen.getByText("nav.projects").closest("a")).toHaveAttribute("href", "#projects");
      expect(screen.getByText("nav.about").closest("a")).toHaveAttribute("href", "#about");
      expect(screen.getByText("nav.contact").closest("a")).toHaveAttribute("href", "#contact");
    });
  });

  describe("Interactions", () => {
    it("scrolls to top when button is clicked", () => {
      window.scrollTo = jest.fn();
      render(<Footer />);
      fireEvent.click(screen.getByLabelText("Scroll back to top"));
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });
  });
});
