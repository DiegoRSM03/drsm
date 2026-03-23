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
      input: React.forwardRef(
        (props: Record<string, unknown>, ref: React.Ref<HTMLInputElement>) => (
          <input ref={ref} {...filterMotionProps(props)} />
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

import { Input } from "./input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders an input element", () => {
      render(<Input label="Name" name="name" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders the label text", () => {
      render(<Input label="Email" name="email" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("renders with the correct input type", () => {
      render(<Input label="Email" name="email" type="email" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("renders the required indicator when required", () => {
      render(<Input label="Name" name="name" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not render required indicator when not required", () => {
      render(<Input label="Name" name="name" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<Input label="Name" name="name" error="Name is required" />);
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("error message has role alert", () => {
      render(<Input label="Name" name="name" error="Name is required" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("does not display error when no error prop", () => {
      render(<Input label="Name" name="name" />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("associates label with input via htmlFor and id", () => {
      render(<Input label="Name" name="username" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "username");
      const label = screen.getByText("Name");
      expect(label).toHaveAttribute("for", "username");
    });

    it("sets the name attribute", () => {
      render(<Input label="Name" name="fullname" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "fullname");
    });

    it("sets the required attribute when required", () => {
      render(<Input label="Name" name="name" required />);
      expect(screen.getByRole("textbox")).toBeRequired();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", () => {
      const handleChange = jest.fn();
      render(<Input label="Name" name="name" onChange={handleChange} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "John" },
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", () => {
      const handleBlur = jest.fn();
      render(<Input label="Name" name="name" onBlur={handleBlur} />);
      fireEvent.focus(screen.getByRole("textbox"));
      fireEvent.blur(screen.getByRole("textbox"));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("renders with controlled value", () => {
      render(<Input label="Name" name="name" value="Diego" onChange={jest.fn()} />);
      expect(screen.getByRole("textbox")).toHaveValue("Diego");
    });
  });
});
