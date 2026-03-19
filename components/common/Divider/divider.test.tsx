import React from "react";
import { render } from "@testing-library/react";

import { Divider } from "./divider";

describe("Divider", () => {
  describe("Horizontal", () => {
    it("renders a horizontal divider by default", () => {
      const { container } = render(<Divider />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("h-px", "w-full");
    });

    it("applies solid border class without gradient", () => {
      const { container } = render(<Divider />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("bg-border");
    });

    it("applies gradient classes when gradient is true", () => {
      const { container } = render(<Divider gradient />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("bg-gradient-to-r", "from-transparent", "to-transparent");
      expect(divider).not.toHaveClass("bg-border");
    });
  });

  describe("Vertical", () => {
    it("renders a vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("w-px", "self-stretch");
    });

    it("applies solid border class without gradient", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("bg-border");
    });

    it("applies gradient classes when gradient is true", () => {
      const { container } = render(<Divider orientation="vertical" gradient />);
      const divider = container.firstChild as HTMLElement;
      expect(divider).toHaveClass("bg-gradient-to-b", "from-transparent", "to-transparent");
      expect(divider).not.toHaveClass("bg-border");
    });
  });

  describe("Custom className", () => {
    it("applies custom className to horizontal divider", () => {
      const { container } = render(<Divider className="my-4" />);
      expect(container.firstChild).toHaveClass("my-4");
    });

    it("applies custom className to vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" className="mx-2" />);
      expect(container.firstChild).toHaveClass("mx-2");
    });
  });
});
