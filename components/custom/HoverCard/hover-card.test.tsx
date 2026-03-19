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
    div: React.forwardRef(
      (
        { children, ...props }: React.PropsWithChildren<Record<string, unknown>>,
        ref: React.Ref<HTMLDivElement>
      ) => (
        <div ref={ref} {...filterMotionProps(props)}>
          {children}
        </div>
      )
    ),
  },
  useReducedMotion: () => false,
}));

import { HoverCard } from "./hover-card";

describe("HoverCard", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(
        <HoverCard>
          <p>Card content</p>
        </HoverCard>
      );
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <HoverCard>
          <h3>Title</h3>
          <p>Description</p>
        </HoverCard>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies default border and background classes", () => {
      const { container } = render(
        <HoverCard>
          <p>Content</p>
        </HoverCard>
      );
      const card = container.firstElementChild as HTMLElement;
      expect(card).toHaveClass("border-border");
      expect(card).toHaveClass("bg-surface");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("p-6");
    });

    it("applies custom className", () => {
      const { container } = render(
        <HoverCard className="custom-class">
          <p>Content</p>
        </HoverCard>
      );
      const card = container.firstElementChild as HTMLElement;
      expect(card).toHaveClass("custom-class");
    });

    it("merges custom className with default classes", () => {
      const { container } = render(
        <HoverCard className="mt-4">
          <p>Content</p>
        </HoverCard>
      );
      const card = container.firstElementChild as HTMLElement;
      expect(card).toHaveClass("border-border");
      expect(card).toHaveClass("mt-4");
    });
  });

  describe("Structure", () => {
    it("wraps children in a relative z-10 container", () => {
      render(
        <HoverCard>
          <p>Content</p>
        </HoverCard>
      );
      const content = screen.getByText("Content");
      expect(content.parentElement).toHaveClass("relative");
      expect(content.parentElement).toHaveClass("z-10");
    });

    it("renders glow overlay when glowOnHover is true (default)", () => {
      const { container } = render(
        <HoverCard>
          <p>Content</p>
        </HoverCard>
      );
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBe(1);
    });

    it("does not render glow overlay when glowOnHover is false", () => {
      const { container } = render(
        <HoverCard glowOnHover={false}>
          <p>Content</p>
        </HoverCard>
      );
      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBe(0);
    });
  });

  describe("Accessibility", () => {
    it("glow overlay is hidden from screen readers", () => {
      const { container } = render(
        <HoverCard>
          <p>Content</p>
        </HoverCard>
      );
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass("pointer-events-none");
    });
  });
});
