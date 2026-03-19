import { render, screen } from "@testing-library/react";
import { AnimatedText, FadeIn, StaggerContainer, StaggerItem } from "./text-reveal";

jest.mock("framer-motion", () => ({
  motion: {
    span: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    div: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

describe("AnimatedText", () => {
  it("renders the text content", () => {
    render(<AnimatedText>Hello World</AnimatedText>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders as a paragraph by default", () => {
    const { container } = render(<AnimatedText>Some text</AnimatedText>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders as a custom element", () => {
    const { container } = render(<AnimatedText as="h2">Heading</AnimatedText>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AnimatedText className="custom">Text</AnimatedText>);
    expect(container.querySelector("p")).toHaveClass("custom");
  });

  it("splits text by words by default", () => {
    render(<AnimatedText>One Two Three</AnimatedText>);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });
});

describe("FadeIn", () => {
  it("renders children", () => {
    render(<FadeIn>Faded content</FadeIn>);
    expect(screen.getByText("Faded content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FadeIn className="fade-class">Content</FadeIn>);
    expect(container.firstChild).toHaveClass("fade-class");
  });

  it("renders nested elements", () => {
    render(
      <FadeIn>
        <button>Click</button>
      </FadeIn>
    );
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });
});

describe("StaggerContainer", () => {
  it("renders children", () => {
    render(
      <StaggerContainer>
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggerContainer>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StaggerContainer className="stagger-class">
        <div>Child</div>
      </StaggerContainer>
    );
    expect(container.firstChild).toHaveClass("stagger-class");
  });
});

describe("StaggerItem", () => {
  it("renders children", () => {
    render(<StaggerItem>Stagger child</StaggerItem>);
    expect(screen.getByText("Stagger child")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StaggerItem className="item-class">Child</StaggerItem>);
    expect(container.firstChild).toHaveClass("item-class");
  });

  it("renders nested components", () => {
    render(
      <StaggerItem>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/link">Link text</a>
      </StaggerItem>
    );
    expect(screen.getByRole("link", { name: "Link text" })).toBeInTheDocument();
  });
});
