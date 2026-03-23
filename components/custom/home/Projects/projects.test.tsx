/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("framer-motion", () => {
  const _mock = {
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
    useVelocity: () => ({ get: () => 0 }),
    useReducedMotion: () => false,
  };
  _mock.m = _mock.motion;
  return _mock;
});

jest.mock("@/components/custom/MagneticButton", () => ({
  MagneticButton: function MockMagneticButton({ children, ...props }: any) {
    return <button {...props}>{children}</button>;
  },
}));

jest.mock("@/components/custom/CursorEffects", () => ({
  CursorGlow: () => null,
  CursorBrightGrid: () => null,
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
      expect(screen.getAllByText("projects.badge").length).toBeGreaterThan(0);
      expect(screen.getAllByText("projects.titleLine1").length).toBeGreaterThan(0);
      expect(screen.getAllByText("projects.titleLine2").length).toBeGreaterThan(0);
    });

    it("renders all project cards", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(screen.getAllByRole("heading", { name: project.title }).length).toBeGreaterThan(0);
        expect(
          screen.getAllByText(`projects.${project.i18nKey}.description`).length
        ).toBeGreaterThan(0);
        expect(
          screen.getAllByText(`PROJECTS.${project.i18nKey.toUpperCase()}.TYPE`).length > 0 ||
            screen.getAllByText(`projects.${project.i18nKey}.type`.toUpperCase()).length > 0
        ).toBeTruthy();
      });
    });

    it("renders all technology tags for each project", () => {
      render(<Projects />);
      const allTags = PROJECTS.flatMap((p) => p.tags);
      const uniqueTags = [...new Set(allTags)];

      uniqueTags.forEach((tag) => {
        const tagElements = screen.getAllByText(tag);
        expect(tagElements.length).toBeGreaterThan(0);
      });
    });

    it("renders View Project buttons for all projects", () => {
      render(<Projects />);
      const viewButtons = screen.getAllByText("projects.viewProject");
      expect(viewButtons.length).toBeGreaterThanOrEqual(PROJECTS.length);
    });

    it("renders external links for projects with URLs", () => {
      render(<Projects />);
      const projectsWithUrl = PROJECTS.filter((p) => p.url !== null);
      expect(projectsWithUrl.length).toBeGreaterThan(0);
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
      const headings = screen.getAllByRole("heading", { level: 2 });
      expect(headings.some((h) => h.getAttribute("id") === "projects-heading")).toBe(true);
    });

    it("uses semantic header element for section header", () => {
      render(<Projects />);
      const headers = document.querySelectorAll("header");
      expect(headers.length).toBeGreaterThan(0);
    });

    it("uses article elements for project cards", () => {
      render(<Projects />);
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBeGreaterThanOrEqual(PROJECTS.length);
    });

    it("each article has aria-labelledby pointing to its title", () => {
      render(<Projects />);
      const articles = screen.getAllByRole("article");
      const projectIds = PROJECTS.map((p) => p.id);
      articles.forEach((article) => {
        const labelledBy = article.getAttribute("aria-labelledby");
        const idMatch = labelledBy?.match(/project-title-(\d+)/);
        if (idMatch) {
          expect(projectIds).toContain(Number(idMatch[1]));
        }
      });
    });

    it("project titles have correct ids", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        const titles = screen.getAllByRole("heading", { name: project.title });
        expect(titles.some((t) => t.getAttribute("id") === `project-title-${project.id}`)).toBe(
          true
        );
      });
    });

    it("renders tags as proper list with aria-label", () => {
      render(<Projects />);
      const tagLists = screen.getAllByRole("list", { name: /technologies used/i });
      expect(tagLists.length).toBeGreaterThanOrEqual(PROJECTS.length);
    });

    it("image placeholders have role=img and aria-label", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(
          screen.getAllByRole("img", { name: `${project.title} project preview` }).length
        ).toBeGreaterThan(0);
      });
    });

    it("View Project buttons have descriptive aria-labels", () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(
          screen.getAllByLabelText(`View ${project.title} project details`).length
        ).toBeGreaterThan(0);
      });
    });

    it("project cards are rendered as articles", () => {
      render(<Projects />);
      const articles = screen.getAllByRole("article");
      expect(articles.length).toBeGreaterThanOrEqual(PROJECTS.length);
    });
  });

  describe("Content", () => {
    it("displays correct project data", () => {
      render(<Projects />);

      expect(screen.getAllByRole("heading", { name: "PropSource" }).length).toBeGreaterThan(0);
      expect(screen.getAllByText("PROJECTS.PROPSOURCE.TYPE").length).toBeGreaterThan(0);

      expect(screen.getAllByRole("heading", { name: "Fetcher" }).length).toBeGreaterThan(0);
      expect(screen.getAllByText("PROJECTS.FETCHER.TYPE").length).toBeGreaterThan(0);

      expect(screen.getAllByRole("heading", { name: "NeoVim Config" }).length).toBeGreaterThan(0);
      expect(screen.getAllByText("PROJECTS.NEOVIM.TYPE").length).toBeGreaterThan(0);
    });

    it("section description is present", () => {
      render(<Projects />);
      expect(screen.getAllByText("projects.description").length).toBeGreaterThan(0);
    });
  });

  describe("Project Data Export", () => {
    it("exports PROJECTS array with correct structure", () => {
      expect(PROJECTS).toHaveLength(3);
      PROJECTS.forEach((project) => {
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("i18nKey");
        expect(project).toHaveProperty("tags");
        expect(project).toHaveProperty("url");
        expect(project).toHaveProperty("github");
        expect(Array.isArray(project.tags)).toBe(true);
      });
    });

    it("each project has unique id", () => {
      const ids = PROJECTS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(PROJECTS.length);
    });
  });
});
