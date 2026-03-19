import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("framer-motion", () => ({
  motion: {
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const motionKeys = [
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
        if (!motionKeys.includes(key)) {
          filtered[key] = props[key];
        }
      }
      return <span {...filtered}>{children}</span>;
    },
  },
}));

import { Badge } from "./badge";

describe("Badge", () => {
  describe("Rendering", () => {
    it("renders children text", () => {
      render(<Badge>Frontend</Badge>);
      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });

    it("renders as a span element", () => {
      render(<Badge>Tag</Badge>);
      expect(screen.getByText("Tag").tagName).toBe("SPAN");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("bg-elevated", "text-muted");
    });

    it("renders accent variant", () => {
      render(<Badge variant="accent">Accent</Badge>);
      const badge = screen.getByText("Accent");
      expect(badge).toHaveClass("text-accent");
    });

    it("renders pop variant", () => {
      render(<Badge variant="pop">Pop</Badge>);
      const badge = screen.getByText("Pop");
      expect(badge).toHaveClass("text-pop");
    });

    it("renders outline variant", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).toHaveClass("border", "bg-transparent", "text-muted");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText("Small")).toHaveClass("px-2", "py-0.5");
    });

    it("renders medium size by default", () => {
      render(<Badge>Medium</Badge>);
      expect(screen.getByText("Medium")).toHaveClass("px-3", "py-1");
    });

    it("renders large size", () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText("Large")).toHaveClass("px-4", "py-1.5");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      render(<Badge className="custom-badge">Custom</Badge>);
      expect(screen.getByText("Custom")).toHaveClass("custom-badge");
    });
  });
});
