/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

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
      label: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
        <label {...filterMotionProps(props)}>{children}</label>
      ),
      textarea: React.forwardRef(
        (props: Record<string, unknown>, ref: React.Ref<HTMLTextAreaElement>) => (
          <textarea ref={ref} {...filterMotionProps(props)} />
        )
      ),
      p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
        <p {...filterMotionProps(props)}>{children}</p>
      ),
    },
  };
  _mock.m = _mock.motion;
  return _mock;
});

import { Textarea } from "./textarea";

describe("Textarea", () => {
  describe("Rendering", () => {
    it("renders a textarea element", () => {
      render(<Textarea label="Message" name="message" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders the label text", () => {
      render(<Textarea label="Message" name="message" />);
      expect(screen.getByText("Message")).toBeInTheDocument();
    });

    it("renders with the correct number of rows", () => {
      render(<Textarea label="Message" name="message" rows={6} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "6");
    });

    it("renders with default rows of 4", () => {
      render(<Textarea label="Message" name="message" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
    });

    it("renders the required indicator when required", () => {
      render(<Textarea label="Message" name="message" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<Textarea label="Message" name="message" error="Message is required" />);
      expect(screen.getByText("Message is required")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(<Textarea label="Message" name="message" error="Message is required" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("does not display error when no error prop", () => {
      render(<Textarea label="Message" name="message" />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("associates label with textarea via htmlFor and id", () => {
      render(<Textarea label="Message" name="msg" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("id", "msg");
      const label = screen.getByText("Message");
      expect(label).toHaveAttribute("for", "msg");
    });

    it("sets the name attribute", () => {
      render(<Textarea label="Message" name="msg" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "msg");
    });

    it("sets the required attribute when required", () => {
      render(<Textarea label="Message" name="message" required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", () => {
      const handleChange = jest.fn();
      render(<Textarea label="Message" name="message" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "Hello" },
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when textarea loses focus", () => {
      const handleBlur = jest.fn();
      render(<Textarea label="Message" name="message" onBlur={handleBlur} />);
      fireEvent.focus(screen.getByRole("textbox"));
      fireEvent.blur(screen.getByRole("textbox"));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("renders with controlled value", () => {
      render(<Textarea label="Message" name="message" value="Test message" onChange={jest.fn()} />);
      expect(screen.getByRole("textbox")).toHaveValue("Test message");
    });
  });
});
