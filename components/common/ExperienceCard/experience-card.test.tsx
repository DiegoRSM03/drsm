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

import { ExperienceCard } from "./experience-card";

const defaultProps = {
  company: "Acme Corp",
  role: "Senior Frontend Engineer",
  period: "2022 - Present",
  description: "Led frontend architecture for enterprise applications.",
  technologies: ["React", "TypeScript", "Next.js"],
};

describe("ExperienceCard", () => {
  describe("Rendering", () => {
    it("renders the company name", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    });

    it("renders the role", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
    });

    it("renders the period", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByText("2022 - Present")).toBeInTheDocument();
    });

    it("renders the description", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(
        screen.getByText("Led frontend architecture for enterprise applications.")
      ).toBeInTheDocument();
    });

    it("renders technology tags", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Next.js")).toBeInTheDocument();
    });

    it("renders without technology tags when empty", () => {
      render(<ExperienceCard {...defaultProps} technologies={[]} />);
      expect(screen.queryByText("React")).not.toBeInTheDocument();
    });

    it("renders logo when provided", () => {
      render(<ExperienceCard {...defaultProps} logo="/logos/acme.png" />);
      expect(screen.getByAltText("Acme Corp")).toBeInTheDocument();
    });

    it("does not render logo when not provided", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has article role", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("has a proper heading for the role", () => {
      render(<ExperienceCard {...defaultProps} />);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Senior Frontend Engineer"
      );
    });
  });
});
