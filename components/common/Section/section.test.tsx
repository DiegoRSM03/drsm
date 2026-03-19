import React from "react";
import { render, screen } from "@testing-library/react";

import { Section } from "./section";

describe("Section", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(<Section>Section content</Section>);
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("renders as a section element", () => {
      render(<Section>Content</Section>);
      expect(screen.getByText("Content").closest("section")).toBeInTheDocument();
    });

    it("renders with an id", () => {
      const { container } = render(<Section id="experience">Content</Section>);
      expect(container.querySelector("#experience")).toBeInTheDocument();
    });
  });

  describe("Padding variants", () => {
    it("applies no padding when padding is none", () => {
      const { container } = render(<Section padding="none">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section.className).not.toMatch(/py-/);
    });

    it("applies small padding", () => {
      const { container } = render(<Section padding="sm">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("py-12");
    });

    it("applies medium padding by default", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("py-24");
    });

    it("applies large padding", () => {
      const { container } = render(<Section padding="lg">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("py-36");
    });
  });

  describe("Background variants", () => {
    it("applies default background", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("bg-background");
    });

    it("applies surface background", () => {
      const { container } = render(<Section background="surface">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("bg-surface");
    });

    it("applies gradient background", () => {
      const { container } = render(<Section background="gradient">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("bg-gradient-to-b");
    });
  });

  describe("Container", () => {
    it("wraps children in container by default", () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector("section")!;
      const innerDiv = section.querySelector("div");
      expect(innerDiv).toHaveClass("mx-auto", "w-full", "px-6");
    });

    it("does not wrap in container when container is false", () => {
      const { container } = render(<Section container={false}>Content</Section>);
      const section = container.querySelector("section")!;
      expect(section.querySelector("div.mx-auto")).toBeNull();
      expect(screen.getByText("Content").closest("section")).toBe(section);
    });

    it("applies max-w-7xl by default", () => {
      const { container } = render(<Section>Content</Section>);
      const innerDiv = container.querySelector("section div");
      expect(innerDiv).toHaveClass("max-w-7xl");
    });

    it("applies custom maxWidth", () => {
      const { container } = render(<Section maxWidth="4xl">Content</Section>);
      const innerDiv = container.querySelector("section div");
      expect(innerDiv).toHaveClass("max-w-4xl");
    });
  });

  describe("Custom className", () => {
    it("applies custom className to section", () => {
      const { container } = render(<Section className="custom-section">Content</Section>);
      const section = container.querySelector("section")!;
      expect(section).toHaveClass("custom-section");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to the section element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Section ref={ref}>Content</Section>);
      expect(ref.current?.tagName).toBe("SECTION");
    });
  });
});
