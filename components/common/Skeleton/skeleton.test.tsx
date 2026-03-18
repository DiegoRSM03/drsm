import { render } from "@testing-library/react";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from "./skeleton";

describe("Skeleton", () => {
  describe("Base Skeleton", () => {
    it("renders a skeleton element", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies width and height as numbers", () => {
      const { container } = render(<Skeleton width={200} height={40} />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("200px");
      expect(el.style.height).toBe("40px");
    });

    it("applies width and height as strings", () => {
      const { container } = render(<Skeleton width="100%" height="2rem" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("100%");
      expect(el.style.height).toBe("2rem");
    });

    it("applies custom className", () => {
      const { container } = render(<Skeleton className="mb-4" />);
      expect(container.firstChild).toHaveClass("mb-4");
    });
  });

  describe("SkeletonText", () => {
    it("renders default 3 lines", () => {
      const { container } = render(<SkeletonText />);
      const skeletons = container.querySelectorAll(".bg-elevated");
      expect(skeletons.length).toBe(3);
    });

    it("renders specified number of lines", () => {
      const { container } = render(<SkeletonText lines={5} />);
      const skeletons = container.querySelectorAll(".bg-elevated");
      expect(skeletons.length).toBe(5);
    });

    it("applies custom className", () => {
      const { container } = render(<SkeletonText className="mt-2" />);
      expect(container.firstChild).toHaveClass("mt-2");
    });
  });

  describe("SkeletonCard", () => {
    it("renders card skeleton with image and text placeholders", () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll(".bg-elevated");
      expect(skeletons.length).toBeGreaterThanOrEqual(4);
    });

    it("applies custom className", () => {
      const { container } = render(<SkeletonCard className="w-full" />);
      expect(container.firstChild).toHaveClass("w-full");
    });
  });

  describe("SkeletonAvatar", () => {
    it("renders with default md size (48px)", () => {
      const { container } = render(<SkeletonAvatar />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("48px");
      expect(el.style.height).toBe("48px");
    });

    it("renders with sm size (32px)", () => {
      const { container } = render(<SkeletonAvatar size="sm" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("32px");
      expect(el.style.height).toBe("32px");
    });

    it("renders with lg size (64px)", () => {
      const { container } = render(<SkeletonAvatar size="lg" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("64px");
      expect(el.style.height).toBe("64px");
    });

    it("renders with xl size (96px)", () => {
      const { container } = render(<SkeletonAvatar size="xl" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe("96px");
      expect(el.style.height).toBe("96px");
    });

    it("applies custom className", () => {
      const { container } = render(<SkeletonAvatar className="mx-auto" />);
      expect(container.firstChild).toHaveClass("mx-auto");
    });
  });
});
