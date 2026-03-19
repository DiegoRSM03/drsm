/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

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
    "drag",
    "dragMomentum",
    "dragElastic",
    "dragConstraints",
    "onDragStart",
    "onDrag",
    "onDragEnd",
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
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: () => ({ get: () => 0, set: () => {} }),
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useReducedMotion: () => false,
  useInView: () => true,
  useAnimationFrame: () => {},
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, priority, ...rest } = props;
    return (
      <img
        {...rest}
        data-fill={fill ? "true" : undefined}
        data-priority={priority ? "true" : undefined}
      />
    );
  },
}));

jest.mock("lucide-react", () => ({
  ArrowDown: () => <svg data-testid="arrow-down-icon" aria-hidden="true" />,
}));

jest.mock("@/components/custom/CursorEffects", () => ({
  CursorGlow: () => null,
  CursorBrightGrid: () => null,
}));

import About from "./about";

describe("About Section", () => {
  describe("Rendering", () => {
    it("renders the section with correct id", () => {
      render(<About />);
      const section = document.getElementById("about");
      expect(section).toBeInTheDocument();
    });

    it("renders the section tag", () => {
      render(<About />);
      expect(screen.getByText("about.badge")).toBeInTheDocument();
    });

    it("renders the section heading", () => {
      render(<About />);
      expect(screen.getByText("about.titleLine1")).toBeInTheDocument();
      expect(screen.getByText("about.titleLine2")).toBeInTheDocument();
    });

    it("renders the section description", () => {
      render(<About />);
      expect(screen.getByText("about.description")).toBeInTheDocument();
    });

    it("renders the bio text as individual words", () => {
      render(<About />);
      expect(screen.getByText("about.bio")).toBeInTheDocument();
    });

    it("renders the avatar image", () => {
      render(<About />);
      const img = screen.getByRole("img", {
        name: /Diego Sanchez/i,
      });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/about-avatar.png");
    });

    it("renders the scroll hint", () => {
      render(<About />);
      expect(screen.getByText("about.scrollHint")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-labelledby on section", () => {
      render(<About />);
      const section = document.getElementById("about");
      expect(section).toHaveAttribute("aria-labelledby", "about-heading");
    });

    it("heading has correct id for aria reference", () => {
      render(<About />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "about-heading");
    });

    it("uses semantic header element", () => {
      render(<About />);
      const header = document.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("avatar image has descriptive alt text", () => {
      render(<About />);
      const img = screen.getByRole("img", {
        name: /Diego Sanchez — Senior Frontend Engineer/i,
      });
      expect(img).toBeInTheDocument();
    });

    it("decorative shapes container is hidden from screen readers", () => {
      render(<About />);
      const decorativeContainers = document.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeContainers.length).toBeGreaterThan(0);
    });

    it("scroll hint is hidden from screen readers", () => {
      render(<About />);
      const scrollHint = screen.getByText("about.scrollHint").closest("div");
      expect(scrollHint).toHaveAttribute("aria-hidden", "true");
    });

    it("heading hierarchy is correct (h2 present)", () => {
      render(<About />);
      const headings = screen.getAllByRole("heading");
      expect(headings.length).toBeGreaterThanOrEqual(1);
      expect(headings[0].tagName).toBe("H2");
    });
  });
});

describe("Decorative Elements", () => {
  it("rail shapes container is rendered as aria-hidden", () => {
    render(<About />);
    const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
    const hasRailContainer = Array.from(hiddenElements).some(
      (el) => el.classList.contains("absolute") && el.classList.contains("inset-0")
    );
    expect(hasRailContainer).toBe(true);
  });
});
