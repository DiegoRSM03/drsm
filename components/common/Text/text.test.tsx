import React from "react";
import { render, screen } from "@testing-library/react";

import { Text } from "./text";

describe("Text", () => {
  describe("Rendering", () => {
    it("renders children text", () => {
      render(<Text>Hello world</Text>);
      expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("renders as a paragraph by default", () => {
      render(<Text>Content</Text>);
      expect(screen.getByText("Content").tagName).toBe("P");
    });

    it("renders as a span when specified", () => {
      render(<Text as="span">Inline text</Text>);
      expect(screen.getByText("Inline text").tagName).toBe("SPAN");
    });
  });

  describe("Sizes", () => {
    it("renders large size", () => {
      render(<Text size="lg">Large</Text>);
      expect(screen.getByText("Large")).toHaveClass("text-lg");
    });

    it("renders base size by default", () => {
      render(<Text>Base</Text>);
      expect(screen.getByText("Base")).toHaveClass("text-base");
    });

    it("renders small size", () => {
      render(<Text size="sm">Small</Text>);
      expect(screen.getByText("Small")).toHaveClass("text-sm");
    });

    it("renders extra small size", () => {
      render(<Text size="xs">Extra small</Text>);
      expect(screen.getByText("Extra small")).toHaveClass("text-xs");
    });
  });

  describe("Colors", () => {
    it("renders default color", () => {
      render(<Text>Default</Text>);
      expect(screen.getByText("Default")).toHaveClass("text-foreground");
    });

    it("renders muted color", () => {
      render(<Text color="muted">Muted</Text>);
      expect(screen.getByText("Muted")).toHaveClass("text-muted");
    });

    it("renders accent color", () => {
      render(<Text color="accent">Accent</Text>);
      expect(screen.getByText("Accent")).toHaveClass("text-accent");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      render(<Text className="custom-text">Content</Text>);
      expect(screen.getByText("Content")).toHaveClass("custom-text");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to the element", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Text ref={ref}>Content</Text>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });
});
