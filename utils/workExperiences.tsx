// Libs
import { StaticImageData } from "next/image"
// Images
import LiteboxCompanyImage from "@/public/images/workExperienceLitebox.png"
import AxonCompanyImage from "@/public/images/workExperienceAxon.png"

type WorkExperienceId = "litebox" | "axon"

type WorkExperience = {
  position: string
  duration: string
  description: string
  companyImage: StaticImageData
}

export const WORK_EXPERIENCES: { [w in WorkExperienceId]: WorkExperience } = {
  litebox: {
    position: "Software Engineer at Litebox",
    duration: "Sep 2022 - Present",
    description: `At Litebox, a boutique software company focused on high-quality product and code, I contributed in the projects working with technologies such as Strapi, Next.js (App and Pages Router), NestJS, Tailwind and Framer Motion.\n
      One of my key projects was to create an internal CLI tool to streamline Strapi/Next.js blog setup, and managed form handling with server actions, useActionState, and react-hook-form. I implemented complex state management using Context, Zustand, and other React state management patterns, while also reviewing code, documenting components in Notion.\n
      Every time I needed to create a marketing website I worked on ensuring accessibility (WCAG 2), strong SEO practices (structured data, Open Graph, Twitter Cards), and consistently achieving Lighthouse scores above 90. Additionally, I integrated marketing tools like Marketo, Hotjar, and FB Pixel, and handled deployments using AWS services (ECR, ECS, EC2, S3). I also set up dev tooling (Prettier, ESLint, Turbo, and Husky), wrote backend tests with SuperTest, and enforced CI/CD via GitHub Actions. Styling was done with Tailwind, Styled Components, or CSS Modules, depending on the project needs.\n
      Besides my frontend background here, I also worked on a big real-state project more backend-focused based on NestJS, SQL, TypeORM, Typescript, Next, React and Tailwind. Form handling was managed using react-hook-forms and useActionState hooks. For role handling we based our logic in RBAC rules.`,
    companyImage: LiteboxCompanyImage,
  },
  axon: {
    position: "Software Engineer at Axon",
    duration: "Sep 2021 - Sep 2022",
    description: `At Axon, an institute with an internal IT team and multiple back-office systems, I contributed to both frontend and backend development across various applications.\n
      I enhanced the marketing website by building new pages, improving performance scores, and incorporating accessibility features to ensure a better user experience.\n
      Some of my key projects were, developing a CRM application for the sales team using Next.js, React TypeScript in the frontend, and SQL, PHP, Composer in the backend. I also took part in maintaining and refactoring the institute's broader suite of back-office applications.\n
      The other project involved the need of a WhatsApp bot to sending automated reminders, notifications, and academic updates to students based on their enrollment and progress, helping improve communication and engagement.`,
    companyImage: AxonCompanyImage,
  },
}
