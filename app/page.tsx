"use client";

import { useState, useEffect } from "react";
import {
  Code,
  Figma,
  Database,
  Layers,
  Zap,
  Globe,
} from "lucide-react";
import {
  AnimatedText,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  HoverCard,
  AnimatedLink,
  PageTransition,
  Container,
  Section,
  Heading,
  Text,
  Navbar,
  Footer,
  ProjectCard,
  ExperienceCard,
  SkillCard,
  ContactForm,
  ScrollToTop,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  Avatar,
  Badge,
  Divider,
} from "@/components";

export default function Home() {
  const [initialDelay, setInitialDelay] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("drsm-loaded");
    if (!hasLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync with loading screen timing
      setInitialDelay(1.9);
    }
  }, []);

  return (
    <PageTransition>
      <Navbar />

      <main className="pt-20">
        <Section padding="lg">
          <Container>
            <div className="flex flex-col gap-6">
              <AnimatedText
                as="h1"
                className="text-6xl font-bold tracking-tight md:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
                gradient
                splitBy="chars"
                stagger={0.02}
                delay={initialDelay + 0.5}
              >
                Diego Sanchez
              </AnimatedText>
              <FadeIn delay={initialDelay + 0.9}>
                <Text size="lg" color="muted">
                  Senior Frontend Engineer crafting exceptional digital
                  experiences
                </Text>
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section id="about" padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Magnetic Buttons
              </Heading>

              <FadeIn>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton variant="primary" size="lg">
                    Primary Button
                  </MagneticButton>
                  <MagneticButton variant="secondary" size="lg">
                    Secondary
                  </MagneticButton>
                  <MagneticButton variant="ghost" size="lg">
                    Ghost
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section id="projects" padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Hover Cards
              </Heading>

              <StaggerContainer
                className="grid gap-6 md:grid-cols-2"
                stagger={0.1}
              >
                <StaggerItem>
                  <HoverCard>
                    <Heading as="h4" size="md" className="mb-2">
                      Project One
                    </Heading>
                    <Text color="muted">
                      A beautiful web application with smooth animations and
                      delightful interactions.
                    </Text>
                  </HoverCard>
                </StaggerItem>
                <StaggerItem>
                  <HoverCard>
                    <Heading as="h4" size="md" className="mb-2">
                      Project Two
                    </Heading>
                    <Text color="muted">
                      Mobile-first design system with comprehensive component
                      library.
                    </Text>
                  </HoverCard>
                </StaggerItem>
                <StaggerItem>
                  <HoverCard>
                    <Heading as="h4" size="md" className="mb-2">
                      Project Three
                    </Heading>
                    <Text color="muted">
                      Real-time collaboration tool built with cutting-edge
                      technologies.
                    </Text>
                  </HoverCard>
                </StaggerItem>
                <StaggerItem>
                  <HoverCard>
                    <Heading as="h4" size="md" className="mb-2">
                      Project Four
                    </Heading>
                    <Text color="muted">
                      E-commerce platform with seamless checkout experience.
                    </Text>
                  </HoverCard>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        <Section padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Project Cards
              </Heading>

              <StaggerContainer
                className="grid gap-6 md:grid-cols-2"
                stagger={0.1}
              >
                <StaggerItem className="md:col-span-2">
                  <ProjectCard
                    title="Design System Platform"
                    description="A comprehensive design system with documentation, component library, and design tokens. Built for scalability and developer experience."
                    image="/placeholder-project.svg"
                    tags={["React", "TypeScript", "Storybook", "Figma"]}
                    href="#"
                    featured
                  />
                </StaggerItem>
                <StaggerItem>
                  <ProjectCard
                    title="E-commerce Dashboard"
                    description="Real-time analytics dashboard with beautiful data visualizations."
                    image="/placeholder-project.svg"
                    tags={["Next.js", "D3.js", "Tailwind"]}
                    href="#"
                  />
                </StaggerItem>
                <StaggerItem>
                  <ProjectCard
                    title="AI Writing Assistant"
                    description="Smart writing tool powered by machine learning."
                    image="/placeholder-project.svg"
                    tags={["React", "OpenAI", "Vercel AI"]}
                    href="#"
                  />
                </StaggerItem>
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        <Section id="experience" padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Experience Timeline
              </Heading>

              <div className="flex flex-col gap-0">
                <FadeIn>
                  <ExperienceCard
                    company="Acme Corp"
                    role="Senior Frontend Engineer"
                    period="2022 - Present"
                    description="Leading the frontend architecture for a high-traffic e-commerce platform. Building design systems and mentoring junior developers."
                    technologies={["React", "TypeScript", "Next.js", "GraphQL"]}
                  />
                </FadeIn>
                <FadeIn delay={0.1}>
                  <ExperienceCard
                    company="StartupXYZ"
                    role="Frontend Developer"
                    period="2020 - 2022"
                    description="Built and shipped multiple web applications from scratch. Collaborated closely with design and product teams."
                    technologies={["Vue.js", "Nuxt", "Tailwind CSS"]}
                  />
                </FadeIn>
                <FadeIn delay={0.2}>
                  <ExperienceCard
                    company="Digital Agency"
                    role="Junior Developer"
                    period="2018 - 2020"
                    description="Developed responsive websites and web applications for various clients across different industries."
                    technologies={["JavaScript", "React", "SCSS"]}
                  />
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Skills
              </Heading>

              <StaggerContainer
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
                stagger={0.05}
              >
                <StaggerItem>
                  <SkillCard
                    name="React"
                    icon={<Code className="h-8 w-8" />}
                    level="expert"
                    category="Frontend"
                  />
                </StaggerItem>
                <StaggerItem>
                  <SkillCard
                    name="TypeScript"
                    icon={<Layers className="h-8 w-8" />}
                    level="expert"
                    category="Language"
                  />
                </StaggerItem>
                <StaggerItem>
                  <SkillCard
                    name="Next.js"
                    icon={<Zap className="h-8 w-8" />}
                    level="advanced"
                    category="Framework"
                  />
                </StaggerItem>
                <StaggerItem>
                  <SkillCard
                    name="Figma"
                    icon={<Figma className="h-8 w-8" />}
                    level="advanced"
                    category="Design"
                  />
                </StaggerItem>
                <StaggerItem>
                  <SkillCard
                    name="Node.js"
                    icon={<Globe className="h-8 w-8" />}
                    level="intermediate"
                    category="Backend"
                  />
                </StaggerItem>
                <StaggerItem>
                  <SkillCard
                    name="PostgreSQL"
                    icon={<Database className="h-8 w-8" />}
                    level="intermediate"
                    category="Database"
                  />
                </StaggerItem>
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Avatar & Badges
              </Heading>

              <FadeIn>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-wrap items-end gap-4">
                    <Avatar alt="Diego Sanchez" size="sm" fallback="DS" />
                    <Avatar alt="Diego Sanchez" size="md" fallback="DS" />
                    <Avatar alt="Diego Sanchez" size="lg" fallback="DS" border />
                    <Avatar alt="Diego Sanchez" size="xl" fallback="DS" glow />
                    <Avatar alt="Diego Sanchez" size="2xl" fallback="DS" border glow />
                  </div>

                  <Divider gradient />

                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="accent">Accent</Badge>
                    <Badge variant="pop">Pop</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge size="sm">Small</Badge>
                    <Badge size="lg" variant="accent">Large</Badge>
                    <Badge animated variant="pop">Animated</Badge>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Animated Links
              </Heading>

              <FadeIn>
                <div className="flex flex-wrap gap-6">
                  <AnimatedLink href="#" underlineStyle="slide">
                    Slide Underline
                  </AnimatedLink>
                  <AnimatedLink href="#" underlineStyle="fade">
                    Fade Underline
                  </AnimatedLink>
                  <AnimatedLink
                    href="https://github.com"
                    external
                    underlineStyle="slide"
                  >
                    External Link
                  </AnimatedLink>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Text Animations
              </Heading>

              <div className="flex flex-col gap-6">
                <FadeIn>
                  <Text color="muted">Character by character reveal:</Text>
                </FadeIn>
                <AnimatedText
                  as="p"
                  className="text-2xl font-medium"
                  splitBy="chars"
                  stagger={0.02}
                >
                  Building the future of the web
                </AnimatedText>

                <FadeIn delay={0.5}>
                  <Text color="muted">Word by word reveal:</Text>
                </FadeIn>
                <AnimatedText
                  as="p"
                  className="text-2xl font-medium"
                  splitBy="words"
                  stagger={0.08}
                  delay={0.5}
                >
                  Creating experiences that inspire and delight
                </AnimatedText>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Color Palette
              </Heading>

              <StaggerContainer
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
                stagger={0.05}
              >
                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <div className="h-20 rounded-lg border border-border bg-background" />
                    <Text size="sm" color="muted">
                      Background
                    </Text>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <div className="h-20 rounded-lg border border-border bg-surface" />
                    <Text size="sm" color="muted">
                      Surface
                    </Text>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <div className="h-20 rounded-lg bg-accent" />
                    <Text size="sm" color="muted">
                      Accent
                    </Text>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-2">
                    <div className="h-20 rounded-lg bg-pop" />
                    <Text size="sm" color="muted">
                      Pop
                    </Text>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Typography
              </Heading>

              <StaggerContainer className="flex flex-col gap-4" stagger={0.1}>
                <StaggerItem>
                  <Heading as="h3" size="display">
                    Display — Space Grotesk
                  </Heading>
                </StaggerItem>
                <StaggerItem>
                  <Text size="lg">Body text — Inter font for readability.</Text>
                </StaggerItem>
                <StaggerItem>
                  <code
                    className="inline-block rounded bg-surface px-3 py-1 text-pop"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Code — JetBrains Mono
                  </code>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </Container>
        </Section>

        <Section id="contact" padding="md" background="surface">
          <Container size="md">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <Heading as="h2" size="xl" gradient animate>
                  Get In Touch
                </Heading>
                <FadeIn>
                  <Text color="muted" className="mt-4">
                    Have a project in mind? Let&apos;s work together to create
                    something amazing.
                  </Text>
                </FadeIn>
              </div>

              <FadeIn>
                <ContactForm className="mx-auto max-w-lg" />
              </FadeIn>
            </div>
          </Container>
        </Section>

        <Section padding="md">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Loading Skeletons
              </Heading>

              <div className="grid gap-6 md:grid-cols-2">
                <FadeIn>
                  <div className="rounded-xl border border-border bg-surface p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <SkeletonAvatar size="lg" />
                      <div className="flex-1">
                        <Skeleton height={20} width="60%" className="mb-2" />
                        <Skeleton height={14} width="40%" />
                      </div>
                    </div>
                    <SkeletonText lines={3} />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <SkeletonCard />
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="md" background="surface">
          <Container>
            <div className="flex flex-col gap-8">
              <Heading as="h2" size="xl" gradient animate>
                Theme Transition
              </Heading>

              <FadeIn>
                <Text color="muted">
                  Click the sun/moon icon in the navbar to see the circular
                  reveal theme transition. The animation expands from the toggle
                  button position.
                </Text>
              </FadeIn>
            </div>
          </Container>
        </Section>
      </main>

      <ScrollToTop />
      <Footer />
    </PageTransition>
  );
}
