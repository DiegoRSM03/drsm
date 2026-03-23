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

jest.mock("framer-motion", () => {
  const _mock = {
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
        <div {...filterMotionProps(props)}>{children}</div>
      ),
    },
    useReducedMotion: () => false,
  };
  _mock.m = _mock.motion;
  return _mock;
});

import { PageTransition, PageTransitionItem } from "./page-transition";

describe("PageTransition", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(
        <PageTransition>
          <p>Page content</p>
        </PageTransition>
      );
      expect(screen.getByText("Page content")).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      render(
        <PageTransition>
          <h1>Title</h1>
          <p>Body</p>
        </PageTransition>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <PageTransition className="custom-transition">
          <p>Content</p>
        </PageTransition>
      );
      expect(container.firstElementChild).toHaveClass("custom-transition");
    });

    it("applies empty className by default", () => {
      const { container } = render(
        <PageTransition>
          <p>Content</p>
        </PageTransition>
      );
      expect(container.firstElementChild).toHaveAttribute("class", "");
    });
  });

  describe("Structure", () => {
    it("wraps children in a div element", () => {
      const { container } = render(
        <PageTransition>
          <p>Content</p>
        </PageTransition>
      );
      expect(container.firstElementChild?.tagName).toBe("DIV");
    });
  });
});

describe("PageTransitionItem", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(
        <PageTransitionItem>
          <p>Item content</p>
        </PageTransitionItem>
      );
      expect(screen.getByText("Item content")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <PageTransitionItem className="item-class">
          <p>Content</p>
        </PageTransitionItem>
      );
      expect(container.firstElementChild).toHaveClass("item-class");
    });

    it("applies empty className by default", () => {
      const { container } = render(
        <PageTransitionItem>
          <p>Content</p>
        </PageTransitionItem>
      );
      expect(container.firstElementChild).toHaveAttribute("class", "");
    });
  });

  describe("Structure", () => {
    it("wraps children in a div element", () => {
      const { container } = render(
        <PageTransitionItem>
          <p>Content</p>
        </PageTransitionItem>
      );
      expect(container.firstElementChild?.tagName).toBe("DIV");
    });
  });

  describe("Composition", () => {
    it("works as a child of PageTransition", () => {
      render(
        <PageTransition>
          <PageTransitionItem>
            <p>First item</p>
          </PageTransitionItem>
          <PageTransitionItem>
            <p>Second item</p>
          </PageTransitionItem>
        </PageTransition>
      );
      expect(screen.getByText("First item")).toBeInTheDocument();
      expect(screen.getByText("Second item")).toBeInTheDocument();
    });
  });
});
