import React from "react";
import { render, screen } from "@testing-library/react";

const filterMotionProps = (props: Record<string, unknown>) => {
  const motionPropKeys = [
    "initial",
    "animate",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport",
    "variants",
    "onMouseEnter",
    "onMouseLeave",
  ];
  const filtered: Record<string, unknown> = {};
  for (const key in props) {
    if (!motionPropKeys.includes(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

jest.mock("framer-motion", () => {
  const _mock = {
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
        <div {...filterMotionProps(props)}>{children}</div>
      ),
    },
    useReducedMotion: () => false,
  };
  _mock.m = _mock.motion;
  return _mock;
});

import { SkillCard } from "./skill-card";

describe("SkillCard", () => {
  const icon = <svg data-testid="skill-icon" />;

  describe("Rendering", () => {
    it("renders the skill name", () => {
      render(<SkillCard name="React" icon={icon} />);
      expect(screen.getByText("React")).toBeInTheDocument();
    });

    it("renders the icon", () => {
      render(<SkillCard name="React" icon={icon} />);
      expect(screen.getByTestId("skill-icon")).toBeInTheDocument();
    });

    it("renders category when provided", () => {
      render(<SkillCard name="React" icon={icon} category="Frontend" />);
      expect(screen.getByText("Frontend")).toBeInTheDocument();
    });

    it("does not render category when not provided", () => {
      render(<SkillCard name="React" icon={icon} />);
      expect(screen.queryByText("Frontend")).not.toBeInTheDocument();
    });
  });

  describe("Level Indicator", () => {
    it("renders level text when level is provided", () => {
      render(<SkillCard name="React" icon={icon} level="expert" />);
      expect(screen.getByText("expert")).toBeInTheDocument();
    });

    it("does not render level when not provided", () => {
      render(<SkillCard name="React" icon={icon} />);
      expect(screen.queryByText("expert")).not.toBeInTheDocument();
      expect(screen.queryByText("advanced")).not.toBeInTheDocument();
      expect(screen.queryByText("intermediate")).not.toBeInTheDocument();
      expect(screen.queryByText("beginner")).not.toBeInTheDocument();
    });

    it("renders beginner level", () => {
      render(<SkillCard name="Rust" icon={icon} level="beginner" />);
      expect(screen.getByText("beginner")).toBeInTheDocument();
    });

    it("renders intermediate level", () => {
      render(<SkillCard name="Go" icon={icon} level="intermediate" />);
      expect(screen.getByText("intermediate")).toBeInTheDocument();
    });

    it("renders advanced level", () => {
      render(<SkillCard name="TypeScript" icon={icon} level="advanced" />);
      expect(screen.getByText("advanced")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders the skill name in a heading", () => {
      render(<SkillCard name="React" icon={icon} />);
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("React");
    });
  });
});
