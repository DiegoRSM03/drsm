import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("framer-motion", () => {
  const _mock = {
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
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
        return <div {...filtered}>{children}</div>;
      },
    },
  };
  _mock.m = _mock.motion;
  return _mock;
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    onLoad,
    onError,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  ),
}));

import { Avatar } from "./avatar";

describe("Avatar", () => {
  describe("Rendering", () => {
    it("renders with an image when src is provided", () => {
      render(<Avatar src="/photo.jpg" alt="Diego Sanchez" />);
      const img = screen.getByRole("img", { name: "Diego Sanchez" });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/photo.jpg");
    });

    it("renders fallback initials when no src is provided", () => {
      render(<Avatar alt="Diego Sanchez" />);
      expect(screen.getByText("DS")).toBeInTheDocument();
    });

    it("renders custom fallback text", () => {
      render(<Avatar alt="Diego Sanchez" fallback="DR" />);
      expect(screen.getByText("DR")).toBeInTheDocument();
    });

    it("generates initials from single name", () => {
      render(<Avatar alt="Diego" />);
      expect(screen.getByText("D")).toBeInTheDocument();
    });

    it("limits initials to two characters", () => {
      render(<Avatar alt="Diego R Sanchez Martinez" />);
      expect(screen.getByText("DR")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Avatar alt="Test" src="/photo.jpg" size="sm" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "32");
      expect(img).toHaveAttribute("height", "32");
    });

    it("renders medium size by default", () => {
      render(<Avatar alt="Test" src="/photo.jpg" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "48");
      expect(img).toHaveAttribute("height", "48");
    });

    it("renders large size", () => {
      render(<Avatar alt="Test" src="/photo.jpg" size="lg" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "64");
      expect(img).toHaveAttribute("height", "64");
    });

    it("renders xl size", () => {
      render(<Avatar alt="Test" src="/photo.jpg" size="xl" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "96");
      expect(img).toHaveAttribute("height", "96");
    });

    it("renders 2xl size", () => {
      render(<Avatar alt="Test" src="/photo.jpg" size="2xl" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "128");
      expect(img).toHaveAttribute("height", "128");
    });
  });

  describe("Accessibility", () => {
    it("has proper alt text on the image", () => {
      render(<Avatar src="/photo.jpg" alt="Diego Sanchez" />);
      expect(screen.getByRole("img", { name: "Diego Sanchez" })).toBeInTheDocument();
    });

    it("shows fallback initials when image fails to load", () => {
      render(<Avatar src="/broken.jpg" alt="Diego Sanchez" />);
      const img = screen.getByRole("img");
      act(() => {
        fireEvent.error(img);
      });
      expect(screen.getByText("DS")).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("applies custom className to the container", () => {
      const { container } = render(<Avatar alt="Test" className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });
});
