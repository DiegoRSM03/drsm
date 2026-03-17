/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";

// Mock framer-motion before importing component
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )),
    span: React.forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => (
      <span ref={ref} {...props}>
        {children}
      </span>
    )),
    article: React.forwardRef<HTMLElement, any>(({ children, ...props }, ref) => (
      <article ref={ref as React.Ref<HTMLElement>} {...props}>
        {children}
      </article>
    )),
    p: React.forwardRef<HTMLParagraphElement, any>(({ children, ...props }, ref) => (
      <p ref={ref} {...props}>
        {children}
      </p>
    )),
    ul: React.forwardRef<HTMLUListElement, any>(({ children, ...props }, ref) => (
      <ul ref={ref} {...props}>
        {children}
      </ul>
    )),
    li: React.forwardRef<HTMLLIElement, any>(({ children, ...props }, ref) => (
      <li ref={ref} {...props}>
        {children}
      </li>
    )),
    h3: React.forwardRef<HTMLHeadingElement, any>(({ children, ...props }, ref) => (
      <h3 ref={ref} {...props}>
        {children}
      </h3>
    )),
  },
  useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: () => ({ get: () => 0 }),
  useReducedMotion: () => false,
}));

// Mock MagneticButton
jest.mock("@/components/custom/MagneticButton", () => ({
  MagneticButton: function MockMagneticButton({ children, ...props }: any) {
    return <button {...props}>{children}</button>;
  },
}));

import { Projects, PROJECTS } from "./projects";

describe("Projects", () => {
  describe("Rendering", () => {
    it("renders the section with correct id", () => {
      render(<Projects />);
      const section = document.getElementById("projects");
      expect(section).toBeInTheDocument();
    });

    it("renders the section header", () => {
      render(<Projects />);
      expect(screen.getByText("PROJECTS")).toBeInTheDocument();
      expect(screen.getByText("Pixel-Perfect,")).toBeInTheDocument();
      expect(screen.getByText("Battle-Tested")).toBeInTheDocument();
    });

    it("renders all project cards", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
        expect(screen.getByText(project.type.toUpperCase())).toBeInTheDocument();
      });
    });

    it("renders all technology tags for each project", () => {
      render(<Projects />);
      // Count total unique tags
      const allTags = PROJECTS.flatMap((p) => p.tags);
      const uniqueTags = [...new Set(allTags)];

      uniqueTags.forEach((tag) => {
        const tagElements = screen.getAllByText(tag);
        expect(tagElements.length).toBeGreaterThan(0);
      });
    });

    it("renders View Project buttons for all projects", () => {
      render(<Projects />);
      const viewButtons = screen.getAllByText("View Project");
      expect(viewButtons).toHaveLength(PROJECTS.length);
    });

    it("renders GitHub button only for projects with github link", () => {
      render(<Projects />);
      const projectsWithGithub = PROJECTS.filter((p) => p.github !== null);
      const githubButtons = screen.getAllByLabelText(/source code on GitHub/i);
      expect(githubButtons).toHaveLength(projectsWithGithub.length);
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-labelledby on section", () => {
      render(<Projects />);
      const section = document.getElementById("projects");
      expect(section).toHaveAttribute("aria-labelledby", "projects-heading");
    });

    it("has heading with correct id", () => {
      render(<Projects />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveAttribute("id", "projects-heading");
    });

    it("uses semantic header element for section header", () => {
      render(<Projects />);
      const header = document.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("uses article elements for project cards", () => {
      render(<Projects />);
      const articles = screen.getAllByRole("article");
      expect(articles).toHaveLength(PROJECTS.length);
    });

    it("each article has aria-labelledby pointing to its title", () => {
      render(<Projects />);
      const articles = screen.getAllByRole("article");
      articles.forEach((article, index) => {
        expect(article).toHaveAttribute("aria-labelledby", `project-title-${PROJECTS[index].id}`);
      });
    });

    it("project titles have correct ids", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        const title = screen.getByRole("heading", { name: project.title });
        expect(title).toHaveAttribute("id", `project-title-${project.id}`);
      });
    });

    it("renders tags as proper list with aria-label", () => {
      render(<Projects />);
      const tagLists = screen.getAllByRole("list", { name: /technologies used/i });
      expect(tagLists).toHaveLength(PROJECTS.length);
    });

    it("image placeholders have role=img and aria-label", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(
          screen.getByRole("img", { name: `${project.title} project preview` })
        ).toBeInTheDocument();
      });
    });

    it("GitHub button has sr-only text for screen readers", () => {
      render(<Projects />);
      const srOnlyGithub = screen.getAllByText("GitHub");
      srOnlyGithub.forEach((el) => {
        expect(el).toHaveClass("sr-only");
      });
    });

    it("View Project buttons have descriptive aria-labels", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(screen.getByLabelText(`View ${project.title} project details`)).toBeInTheDocument();
      });
    });

    it("project cards container has list role", () => {
      render(<Projects />);
      expect(screen.getByRole("list", { name: "Project cards" })).toBeInTheDocument();
    });

    it("each project card wrapper has listitem role", () => {
      render(<Projects />);
      // Get the main project list container
      const projectList = screen.getByRole("list", { name: "Project cards" });
      // Get direct children that are list items (project wrappers, not tag items)
      const projectListItems = projectList.querySelectorAll(":scope > [role='listitem']");
      expect(projectListItems).toHaveLength(PROJECTS.length);
    });
  });

  describe("Content", () => {
    it("displays correct project data", () => {
      render(<Projects />);

      expect(screen.getByRole("heading", { name: "Nexus Platform" })).toBeInTheDocument();
      expect(screen.getByText("ENTERPRISE SAAS DASHBOARD")).toBeInTheDocument();

      expect(screen.getByRole("heading", { name: "Velocity" })).toBeInTheDocument();
      expect(screen.getByText("PERFORMANCE MONITORING TOOL")).toBeInTheDocument();

      expect(screen.getByRole("heading", { name: "Artemis" })).toBeInTheDocument();
      expect(screen.getByText("DESIGN SYSTEM FRAMEWORK")).toBeInTheDocument();
    });

    it("section description is present", () => {
      render(<Projects />);
      expect(screen.getByText(/Highlights from professional engagements/i)).toBeInTheDocument();
    });
  });

  describe("Project Data Export", () => {
    it("exports PROJECTS array with correct structure", () => {
      expect(PROJECTS).toHaveLength(3);
      PROJECTS.forEach((project) => {
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("type");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("tags");
        expect(project).toHaveProperty("color");
        expect(project).toHaveProperty("github");
        expect(Array.isArray(project.tags)).toBe(true);
      });
    });

    it("each project has unique id", () => {
      const ids = PROJECTS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(PROJECTS.length);
    });

    it("project colors are valid hex colors", () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      PROJECTS.forEach((project) => {
        expect(project.color).toMatch(hexColorRegex);
      });
    });
  });
});
