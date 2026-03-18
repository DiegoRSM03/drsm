import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("framer-motion", () => ({
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
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    fill,
    priority,
    className,
    onLoad,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    className?: string;
    onLoad?: () => void;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-fill={fill}
      data-priority={priority}
      className={className}
      onLoad={onLoad}
    />
  ),
}));

import { Image } from "./image";

describe("Image", () => {
  describe("Rendering", () => {
    it("renders with correct src", () => {
      render(<Image src="/photo.jpg" alt="A photo" width={400} height={300} />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "/photo.jpg");
    });

    it("renders with correct alt text", () => {
      render(<Image src="/photo.jpg" alt="A scenic view" width={400} height={300} />);
      expect(screen.getByRole("img", { name: "A scenic view" })).toBeInTheDocument();
    });

    it("renders with width and height", () => {
      render(<Image src="/photo.jpg" alt="Photo" width={800} height={600} />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("width", "800");
      expect(img).toHaveAttribute("height", "600");
    });

    it("renders in fill mode", () => {
      render(<Image src="/photo.jpg" alt="Photo" fill />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("data-fill", "true");
    });
  });

  describe("Custom className", () => {
    it("applies className to the image", () => {
      render(
        <Image src="/photo.jpg" alt="Photo" width={400} height={300} className="custom-img" />
      );
      const img = screen.getByRole("img");
      expect(img).toHaveClass("custom-img");
    });

    it("applies containerClassName to the wrapper", () => {
      const { container } = render(
        <Image
          src="/photo.jpg"
          alt="Photo"
          width={400}
          height={300}
          containerClassName="wrapper-class"
        />
      );
      expect(container.firstChild).toHaveClass("wrapper-class");
    });
  });

  describe("Accessibility", () => {
    it("has an accessible name via alt text", () => {
      render(<Image src="/photo.jpg" alt="Diego working at desk" width={400} height={300} />);
      expect(screen.getByRole("img", { name: "Diego working at desk" })).toBeInTheDocument();
    });
  });
});
