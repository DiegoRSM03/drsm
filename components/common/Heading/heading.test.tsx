import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/custom/TextReveal", () => ({
  AnimatedText: ({
    children,
    as: Tag = "h2",
    className,
  }: {
    children: React.ReactNode;
    as?: string;
    className?: string;
    gradient?: boolean;
    splitBy?: string;
    stagger?: number;
    style?: React.CSSProperties;
  }) => <Tag className={className}>{children}</Tag>,
}));

import { Heading } from "./heading";

describe("Heading", () => {
  describe("Heading levels", () => {
    it("renders as h2 by default", () => {
      render(<Heading>Title</Heading>);
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("renders as h1", () => {
      render(<Heading as="h1">Title</Heading>);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("renders as h3", () => {
      render(<Heading as="h3">Title</Heading>);
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("renders as h4", () => {
      render(<Heading as="h4">Title</Heading>);
      expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("renders children text", () => {
      render(<Heading>My Heading</Heading>);
      expect(screen.getByText("My Heading")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      render(
        <Heading>
          <span>Nested</span> Content
        </Heading>
      );
      expect(screen.getByText("Nested")).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      render(<Heading className="custom-heading">Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("custom-heading");
    });
  });

  describe("Gradient", () => {
    it("applies gradient classes when gradient is true", () => {
      render(<Heading gradient>Title</Heading>);
      expect(screen.getByRole("heading")).toHaveClass("bg-clip-text", "text-transparent");
    });

    it("does not apply gradient classes by default", () => {
      render(<Heading>Title</Heading>);
      expect(screen.getByRole("heading")).not.toHaveClass("text-transparent");
    });
  });

  describe("Animated", () => {
    it("renders AnimatedText when animate is true and children is a string", () => {
      render(
        <Heading animate as="h1">
          Animated Title
        </Heading>
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Animated Title");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to the heading element", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref}>Title</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });
});
