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
    "onMouseEnter",
    "onMouseLeave",
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
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <article {...filterMotionProps(props)}>{children}</article>
    ),
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterMotionProps(props)}>{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, fill, ...props }: { alt: string; fill?: boolean; [key: string]: unknown }) => (
    <img alt={alt} data-fill={fill} {...props} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
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
  ArrowUpRight: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-icon" className={className} />
  ),
}));

import { ProjectCard } from "./project-card";

const defaultProps = {
  title: "Portfolio Website",
  description: "A modern portfolio built with Next.js and Framer Motion.",
  image: "/projects/portfolio.png",
  tags: ["Next.js", "TypeScript", "Tailwind"],
  href: "/projects/portfolio",
};

describe("ProjectCard", () => {
  describe("Rendering", () => {
    it("renders the project title", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Portfolio Website");
    });

    it("renders the description", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(
        screen.getByText("A modern portfolio built with Next.js and Framer Motion.")
      ).toBeInTheDocument();
    });

    it("renders all tags", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByText("Next.js")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Tailwind")).toBeInTheDocument();
    });

    it("renders the project image", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByAltText("Portfolio Website")).toBeInTheDocument();
    });

    it("renders the arrow icon", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has a link with the correct href", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/projects/portfolio");
    });

    it("has an article element", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("has a proper heading", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("image has alt text matching title", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByAltText("Portfolio Website")).toBeInTheDocument();
    });
  });
});
