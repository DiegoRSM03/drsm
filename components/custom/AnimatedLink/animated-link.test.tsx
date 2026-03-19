/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";

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
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterMotionProps(props)}>{children}</span>
    ),
    svg: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <svg {...filterMotionProps(props)}>{children}</svg>
    ),
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: React.forwardRef(
    (
      {
        children,
        href,
        ...props
      }: { children: React.ReactNode; href: string } & Record<string, unknown>,
      ref: React.Ref<HTMLAnchorElement>
    ) => (
      <a ref={ref} href={href} {...filterMotionProps(props)}>
        {children}
      </a>
    )
  ),
}));

import { AnimatedLink } from "./animated-link";

describe("AnimatedLink", () => {
  describe("Rendering", () => {
    it("renders link with children", () => {
      render(<AnimatedLink href="/about">About</AnimatedLink>);
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("renders with correct href for internal links", () => {
      render(<AnimatedLink href="/projects">Projects</AnimatedLink>);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/projects");
    });

    it("renders with correct href for external links", () => {
      render(
        <AnimatedLink href="https://github.com" external>
          GitHub
        </AnimatedLink>
      );
      expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com");
    });
  });

  describe("Underline styles", () => {
    it("renders slide underline by default", () => {
      const { container } = render(<AnimatedLink href="/test">Test</AnimatedLink>);
      const underlineSpans = container.querySelectorAll(".absolute.bottom-0");
      expect(underlineSpans.length).toBeGreaterThan(0);
    });

    it("renders fade underline when specified", () => {
      const { container } = render(
        <AnimatedLink href="/test" underlineStyle="fade">
          Test
        </AnimatedLink>
      );
      const underlineSpans = container.querySelectorAll(".absolute.bottom-0");
      expect(underlineSpans.length).toBeGreaterThan(0);
    });

    it("renders no underline when style is none", () => {
      const { container } = render(
        <AnimatedLink href="/test" underlineStyle="none">
          Test
        </AnimatedLink>
      );
      const underlineSpans = container.querySelectorAll(".absolute.bottom-0");
      expect(underlineSpans.length).toBe(0);
    });
  });

  describe("External links", () => {
    it("opens external links in new tab", () => {
      render(
        <AnimatedLink href="https://example.com" external>
          Example
        </AnimatedLink>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders arrow icon for external links", () => {
      const { container } = render(
        <AnimatedLink href="https://example.com" external>
          Example
        </AnimatedLink>
      );
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("does not render arrow icon for internal links", () => {
      const { container } = render(<AnimatedLink href="/about">About</AnimatedLink>);
      expect(container.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses Next.js Link for internal navigation", () => {
      render(<AnimatedLink href="/contact">Contact</AnimatedLink>);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/contact");
    });

    it("uses native anchor for external links", () => {
      render(
        <AnimatedLink href="https://example.com" external>
          External
        </AnimatedLink>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("applies custom className", () => {
      const { container } = render(
        <AnimatedLink href="/test" className="custom-class">
          Test
        </AnimatedLink>
      );
      const span = container.querySelector(".custom-class");
      expect(span).toBeInTheDocument();
    });
  });
});
