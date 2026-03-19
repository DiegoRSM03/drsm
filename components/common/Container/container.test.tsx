import React from "react";
import { render, screen } from "@testing-library/react";

import { Container } from "./container";

describe("Container", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      render(<Container>Content here</Container>);
      expect(screen.getByText("Content here")).toBeInTheDocument();
    });

    it("renders as a div element", () => {
      render(<Container>Content</Container>);
      expect(screen.getByText("Content").tagName).toBe("DIV");
    });

    it("applies base classes", () => {
      render(<Container>Content</Container>);
      const el = screen.getByText("Content");
      expect(el).toHaveClass("mx-auto", "w-full", "px-6");
    });
  });

  describe("Sizes", () => {
    it("renders small max-width", () => {
      render(<Container size="sm">Small</Container>);
      expect(screen.getByText("Small")).toHaveClass("max-w-[640px]");
    });

    it("renders medium max-width", () => {
      render(<Container size="md">Medium</Container>);
      expect(screen.getByText("Medium")).toHaveClass("max-w-[768px]");
    });

    it("renders large max-width by default", () => {
      render(<Container>Default</Container>);
      expect(screen.getByText("Default")).toHaveClass("max-w-[1024px]");
    });

    it("renders full max-width", () => {
      render(<Container size="full">Full</Container>);
      expect(screen.getByText("Full")).toHaveClass("max-w-full");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      render(<Container className="extra-class">Content</Container>);
      expect(screen.getByText("Content")).toHaveClass("extra-class");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
