/* eslint-disable @typescript-eslint/no-explicit-any */
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
    "whileFocus",
    "whileDrag",
    "viewport",
    "variants",
    "layout",
    "layoutId",
    "onAnimationStart",
    "onAnimationComplete",
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
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...filterMotionProps(props)}>{children}</p>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...filterMotionProps(props)}>{children}</section>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...filterMotionProps(props)}>{children}</button>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <a {...filterMotionProps(props)}>{children}</a>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: () => ({ get: () => 0, set: () => {} }),
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useReducedMotion: () => false,
  useInView: () => true,
}));

jest.mock("lucide-react", () => ({
  Github: ({ className }: any) => <svg data-testid="github-icon" className={className} />,
  Linkedin: ({ className }: any) => <svg data-testid="linkedin-icon" className={className} />,
  Mail: ({ className }: any) => <svg data-testid="mail-icon" className={className} />,
  Copy: ({ className }: any) => <svg data-testid="copy-icon" className={className} />,
  Check: ({ className }: any) => <svg data-testid="check-icon" className={className} />,
}));

jest.mock("@/contexts", () => ({
  useTheme: () => ({
    theme: "dark",
    toggleTheme: jest.fn(),
  }),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

import Contact from "./contact";

describe("Contact Section", () => {
  describe("Rendering", () => {
    it("renders the section with correct id", () => {
      render(<Contact />);
      expect(document.getElementById("contact")).toBeInTheDocument();
    });

    it("renders all manifesto lines", () => {
      render(<Contact />);
      expect(screen.getByText("Make it fast.")).toBeInTheDocument();
      expect(screen.getByText("Make it right.")).toBeInTheDocument();
      expect(screen.getByText("Make it lasting.")).toBeInTheDocument();
      expect(screen.getByText("Make it memorable.")).toBeInTheDocument();
      expect(screen.getByText("Make it breathe.")).toBeInTheDocument();
    });

    it("renders the copy email button with email address", () => {
      render(<Contact />);
      expect(screen.getByText("diegorsm03@gmail.com")).toBeInTheDocument();
    });

    it("renders all social link buttons", () => {
      render(<Contact />);
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("social links have correct href attributes", () => {
      render(<Contact />);
      expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/diego-rodrigo-sanchez-moreno/"
      );
      expect(screen.getByLabelText("GitHub")).toHaveAttribute(
        "href",
        "https://github.com/DiegoRSM03"
      );
      expect(screen.getByLabelText("Email")).toHaveAttribute("href", "mailto:diegorsm03@gmail.com");
    });

    it("social links open in new tab", () => {
      render(<Contact />);
      const links = [
        screen.getByLabelText("LinkedIn"),
        screen.getByLabelText("GitHub"),
        screen.getByLabelText("Email"),
      ];
      links.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Copy Email Interaction", () => {
    it("copies email to clipboard on click", () => {
      render(<Contact />);
      const button = screen.getByText("diegorsm03@gmail.com").closest("button")!;
      fireEvent.click(button);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("diegorsm03@gmail.com");
    });

    it("shows copied text after clicking", () => {
      render(<Contact />);
      const button = screen.getByText("diegorsm03@gmail.com").closest("button")!;
      fireEvent.click(button);
      expect(screen.getByText("contact.copied")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-labelledby on section", () => {
      render(<Contact />);
      const section = document.getElementById("contact");
      expect(section).toHaveAttribute("aria-labelledby", "contact-heading");
    });

    it("has a screen-reader heading with correct id", () => {
      render(<Contact />);
      const heading = screen.getByRole("heading", { name: "Contact" });
      expect(heading).toHaveAttribute("id", "contact-heading");
    });

    it("heading is visually hidden with sr-only", () => {
      render(<Contact />);
      const heading = screen.getByRole("heading", { name: "Contact" });
      expect(heading).toHaveClass("sr-only");
    });

    it("heading hierarchy is correct (h2 present)", () => {
      render(<Contact />);
      const heading = screen.getByRole("heading", { name: "Contact" });
      expect(heading.tagName).toBe("H2");
    });

    it("social links nav has aria-label", () => {
      render(<Contact />);
      expect(screen.getByRole("navigation", { name: "Social links" })).toBeInTheDocument();
    });

    it("each social link has descriptive aria-label", () => {
      render(<Contact />);
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("decorative shapes are hidden from screen readers", () => {
      render(<Contact />);
      const decorativeElements = document.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements.length).toBeGreaterThanOrEqual(3);
    });

    it("copy email button is keyboard accessible", () => {
      render(<Contact />);
      const button = screen.getByText("diegorsm03@gmail.com").closest("button")!;
      expect(button.tagName).toBe("BUTTON");
    });
  });
});
