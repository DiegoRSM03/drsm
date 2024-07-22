// Libs
import { StaticImageData } from "next/image"
// Images
import LiteboxCompanyImage from "@/public/images/workExperienceLitebox.png"
import AxonCompanyImage from "@/public/images/workExperienceAxon.png"
import BCCompanyImage from "@/public/images/workExperienceBC.png"

type WorkExperienceId = "litebox" | "axon" | "bc"

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
    description:
      "Litebox is a design and development company. Here I've learned pretty much about technical knowledge since the company has several clients with different kind of needs for their projects. The main projects that I've been on are BuildrFi, Clarent and Fetcher. All clients are American so I could sharpen my English skills quite a bit.\nAt BuildrFi, I worked as a main dev for the client without TL or PM since it was an early MVP app, this helped me a lot to have excellent daily independence at work.\nLuckily, I've learned pretty much about docker and AWS, since I had to dockerize the app to upload the built images to ECR and then using ECS I could deploy our app as EC2 instances. Besides that, in the backend side of the app I had to run load tests using Apache JMeter for the API endpoints, writing and running Non-SQL database migrations, coding unit tests and clean code. And on the front side I had to write fast, scalable and clean code for the new features such as implementing RBAC using React function components.\nAt Fetcher, I worked developing a marketing website using NextJS as a framework and Strapi as a content manager application since one of the main needs of the client was having a page for each one of the blog posts, events, customer stories and guides. On top of that, we had to achieve an excellent performance, SEO ranking and accessibility metrics. We had a weekly meeting and a slack channel for clearing any doubts about the requirements.At Clarent, I worked creating a back office application using React including its ecosystem tools (storybook, react query, css modules) following the design files delivered by client design team.Here I was able to propose some UX ideas, for example, a suggestion to improve the steps for the creation process of KPIs. We had a weekly meeting and a slack channel for clearing any doubts about the tasks.",
    companyImage: LiteboxCompanyImage,
  },
  axon: {
    position: "Fullstack Developer at AxonTraining",
    duration: "Sep 2021 - Sep 2022",
    description:
      "Axon is an ontological coaching academy in Argentina, where you can learn multiple soft skills in order to be a better professional at work.\nHere my contributions as a Full Stack Developer were writing code for our backend (PHP, MySQL) and frontend apps (React, Next, Typescript, Chakra) in a scalable and clean way for the several company’s areas, such as sales, finance, students campus, professors, etc.\nBesides the maintenance tasks, I was responsible for projects like creating a CRM from scratch (Next application with UI lib). And bigger tasks like creating a Whatsapp bot for helping students remember their assignments, their debts, their learning material, etc. Additionally,  I was in charge of the marketing website project, so I managed to improve its performance, accessibility, SEO ranking and code reliability.",
    companyImage: AxonCompanyImage,
  },
  bc: {
    position: "Fullstack Developer at BordadosCordoba",
    duration: "Jul 2021 - Sep 2021",
    description:
      "BordadosCórdoba is a family business which needed a marketing website. They specialize in computerized broidery.\nThis was my first freelance experience. Here I developeded a back office from scratch, where my client could upload images, title and description for his products.And for the marketing website, I made the design with Figma, and then I started to code it with VueJS.The back office was made using PHP, PhpMyAdmin,MySQL and raw SQL queries.",
    companyImage: BCCompanyImage,
  },
}
