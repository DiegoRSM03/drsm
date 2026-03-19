# Homepage Internationalization Spec

Add full i18n support (English + Spanish) to the homepage using Next.js App Router conventions. URL-based routing with `[locale]` dynamic segment, `next-intl` as the translation layer, and complete SEO for both locales.

**Scope**: Homepage only. Projects page i18n will be a separate spec.

---

## Phase 1: Dependencies & Configuration

### 1.1 Install packages

```bash
pnpm add next-intl @formatjs/intl-localematcher negotiator
pnpm add -D @types/negotiator
```

`next-intl` is the community standard for App Router i18n. It uses `@formatjs/intl-localematcher` and `negotiator` under the hood for locale detection — both already approved in CLAUDE.md.

### 1.2 i18n configuration file

Create `i18n/config.ts`:

```ts
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
```

### 1.3 next-intl request config

Create `i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 1.4 Routing config

Create `i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

### 1.5 Next.js plugin

Update `next.config.ts`:

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {};

export default withNextIntl(nextConfig);
```

---

## Phase 2: Middleware & Routing

### 2.1 Create middleware

Create `middleware.ts` at project root:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
```

**Behavior**:

- `/` → redirects to `/en` (302)
- `/en` → serves English homepage
- `/es` → serves Spanish homepage
- Unknown locale → redirects to `/en`
- Detects browser `Accept-Language` header on first visit for automatic locale suggestion (but always redirects to `/en` as default)

### 2.2 Restructure app directory

Move from flat structure to locale-segmented:

```
app/
├── [locale]/
│   ├── layout.tsx      ← current app/layout.tsx (adapted)
│   └── page.tsx        ← current app/page.tsx (adapted)
├── layout.tsx          ← minimal root layout (html + body only)
└── not-found.tsx       ← global not-found
```

**Root layout** (`app/layout.tsx`) — minimal shell:

```tsx
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
```

**Locale layout** (`app/[locale]/layout.tsx`) — moves current layout here:

- Receives `params.locale` from the dynamic segment
- Sets `<html lang={locale}>` dynamically
- Keeps all existing providers (ThemeProvider, ToastProvider, LenisProvider)
- Keeps LoadingScreen, CustomCursor
- Wraps children with `NextIntlClientProvider`
- Generates locale-aware metadata

**Locale page** (`app/[locale]/page.tsx`) — moves current page here:

- Same homepage with all sections
- No changes to section rendering order

### 2.3 Static generation

Add `generateStaticParams` to the locale layout:

```ts
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}
```

This ensures both `/en` and `/es` are statically generated at build time.

---

## Phase 3: Translation Files

### 3.1 File structure

```
messages/
├── en.json
└── es.json
```

Flat namespace structure organized by section. Keys must exist in both files — build will fail otherwise.

### 3.2 Translation keys & copy

Below is the complete dictionary. Non-translatable content (name, company names, tech labels, social links, manifesto lines) stays hardcoded in components.

#### Namespace: `meta`

| Key                  | EN                                                                                                                                   | ES                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `meta.title`         | `Diego Sanchez · Senior Frontend Engineer`                                                                                           | `Diego Sanchez · Senior Frontend Engineer`                                                                                       |
| `meta.description`   | `Frontend engineer building high-performance interfaces with React, Next.js, and TypeScript. Based in Argentina, shipping globally.` | `Ingeniero frontend construyendo interfaces de alto rendimiento con React, Next.js y TypeScript. Desde Argentina para el mundo.` |
| `meta.ogTitle`       | `Diego Sanchez · Portfolio`                                                                                                          | `Diego Sanchez · Portfolio`                                                                                                      |
| `meta.ogDescription` | `Senior Frontend Engineer. React, Next.js, TypeScript.`                                                                              | `Senior Frontend Engineer. React, Next.js, TypeScript.`                                                                          |

#### Namespace: `nav`

| Key                  | EN                  | ES                 |
| -------------------- | ------------------- | ------------------ |
| `nav.projects`       | `Projects`          | `Proyectos`        |
| `nav.experience`     | `Experience`        | `Experiencia`      |
| `nav.about`          | `About`             | `Acerca`           |
| `nav.contact`        | `Contact`           | `Contacto`         |
| `nav.home`           | `DRSM - Home`       | `DRSM - Inicio`    |
| `nav.toggleTheme`    | `Toggle theme`      | `Cambiar tema`     |
| `nav.toggleLanguage` | `Switch to Spanish` | `Cambiar a Ingles` |
| `nav.openMenu`       | `Open menu`         | `Abrir menu`       |
| `nav.closeMenu`      | `Close menu`        | `Cerrar menu`      |

#### Namespace: `hero`

| Key                   | EN                                       | ES                                                    |
| --------------------- | ---------------------------------------- | ----------------------------------------------------- |
| `hero.tagline`        | `Obsessed with making **ideas breathe**` | `Obsesionado con hacer que las **ideas cobren vida**` |
| `hero.downloadResume` | `Download Resume`                        | `Descargar CV`                                        |
| `hero.viewProjects`   | `View Projects`                          | `Ver Proyectos`                                       |
| `hero.scroll`         | `Scroll`                                 | `Scroll`                                              |

Note: "DIEGO" and "SANCHEZ" remain hardcoded — they are the name, not translatable content.

#### Namespace: `projects`

| Key                             | EN                                                                                                                                                                                                                                                       | ES                                                                                                                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projects.badge`                | `PROJECTS`                                                                                                                                                                                                                                               | `PROYECTOS`                                                                                                                                                                                                                                             |
| `projects.titleLine1`           | `Pixel-Perfect,`                                                                                                                                                                                                                                         | `Pixel-Perfect,`                                                                                                                                                                                                                                        |
| `projects.titleLine2`           | `Battle-Tested`                                                                                                                                                                                                                                          | `A Prueba de Todo`                                                                                                                                                                                                                                      |
| `projects.description`          | `Highlights from professional engagements and personal explorations — where clean code meets bold interfaces.`                                                                                                                                           | `Lo mejor de proyectos profesionales y exploraciones personales — donde el codigo limpio se encuentra con interfaces que impactan.`                                                                                                                     |
| `projects.viewProject`          | `View Project`                                                                                                                                                                                                                                           | `Ver Proyecto`                                                                                                                                                                                                                                          |
| `projects.nexus.type`           | `Enterprise SaaS Dashboard`                                                                                                                                                                                                                              | `Dashboard SaaS Empresarial`                                                                                                                                                                                                                            |
| `projects.nexus.description`    | `A real-time analytics platform for enterprise data pipelines. WebSocket-powered live streaming, interactive D3.js visualizations with drill-down, and granular role-based access control — processing 2M+ events per minute at sub-200ms render times.` | `Plataforma de analitica en tiempo real para pipelines de datos empresariales. Streaming en vivo con WebSocket, visualizaciones interactivas con D3.js y control de acceso granular — procesando 2M+ eventos por minuto con renders en menos de 200ms.` |
| `projects.velocity.type`        | `Performance Monitoring Tool`                                                                                                                                                                                                                            | `Herramienta de Monitoreo de Rendimiento`                                                                                                                                                                                                               |
| `projects.velocity.description` | `Developer-first performance monitoring that catches regressions before production. Tracks Core Web Vitals, bundle sizes, and custom metrics with CI/CD integration — powered by a Rust ingestion layer handling 50K+ payloads per second.`              | `Monitoreo de rendimiento developer-first que detecta regresiones antes de produccion. Rastrea Core Web Vitals, tamano de bundles y metricas con integracion CI/CD — impulsado por una capa de ingestion en Rust procesando 50K+ payloads por segundo.` |
| `projects.artemis.type`         | `Design System Framework`                                                                                                                                                                                                                                | `Framework de Design System`                                                                                                                                                                                                                            |
| `projects.artemis.description`  | `A design system shipping 50+ accessible components with dark mode, automatic WCAG auditing, and a Figma-to-code pipeline. Adopted by three product teams, cutting UI development time by 40%.`                                                          | `Un design system con 50+ componentes accesibles, dark mode, auditorias WCAG automaticas y un pipeline de Figma a codigo. Adoptado por tres equipos de producto, reduciendo el tiempo de desarrollo UI en un 40%.`                                      |

#### Namespace: `experience`

| Key                               | EN                                                                                                                                                | ES                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experience.titleWord1`           | `WORK`                                                                                                                                            | `MI`                                                                                                                                                        |
| `experience.titleWord2`           | `HISTORY`                                                                                                                                         | `TRAYECTORIA`                                                                                                                                               |
| `experience.description`          | `Production code, frontend architecture, and cross-functional collaboration.`                                                                     | `Codigo en produccion, arquitectura frontend y colaboracion cross-funcional.`                                                                               |
| `experience.inaza.role`           | `Deployments Engineer`                                                                                                                            | `Deployments Engineer`                                                                                                                                      |
| `experience.inaza.period`         | `Jan 2026 - Present`                                                                                                                              | `Ene 2026 - Presente`                                                                                                                                       |
| `experience.inaza.duration`       | `3 mos`                                                                                                                                           | `3 meses`                                                                                                                                                   |
| `experience.inaza.description`    | `Insurance technology company building modern solutions for the insurance industry.`                                                              | `Empresa de tecnologia en seguros construyendo soluciones modernas para la industria aseguradora.`                                                          |
| `experience.inaza.highlights.0`   | `Built serverless automation pipelines processing hundreds of insurance claims weekly`                                                            | `Desarrollo de pipelines serverless de automatizacion procesando cientos de reclamos de seguros semanalmente`                                               |
| `experience.inaza.highlights.1`   | `Developed PDF parsing and validation systems enforcing complex business rules`                                                                   | `Desarrollo de sistemas de parsing y validacion de PDFs aplicando reglas de negocio complejas`                                                              |
| `experience.inaza.highlights.2`   | `Automated ingestion workflows eliminating manual claim-data entry`                                                                               | `Automatizacion de workflows de ingestion eliminando la carga manual de datos de reclamos`                                                                  |
| `experience.litebox.role`         | `Software Engineer`                                                                                                                               | `Software Engineer`                                                                                                                                         |
| `experience.litebox.period`       | `Sep 2022 - Jan 2026`                                                                                                                             | `Sep 2022 - Ene 2026`                                                                                                                                       |
| `experience.litebox.duration`     | `3.5 yrs`                                                                                                                                         | `3.5 anos`                                                                                                                                                  |
| `experience.litebox.description`  | `Boutique software company focused on highly customized marketing websites and scalable back-office applications for American startup companies.` | `Empresa boutique de software enfocada en sitios web de marketing altamente personalizados y aplicaciones back-office escalables para startups americanas.` |
| `experience.litebox.highlights.0` | `Built 10+ production Next.js platforms achieving 90+ Lighthouse scores`                                                                          | `Desarrollo de 10+ plataformas Next.js en produccion con scores de 90+ en Lighthouse`                                                                       |
| `experience.litebox.highlights.1` | `Architected project infrastructure using AWS, Vercel, and EC2`                                                                                   | `Arquitectura de infraestructura de proyectos usando AWS, Vercel y EC2`                                                                                     |
| `experience.litebox.highlights.2` | `Created an internal CLI automating project scaffolding with Next.js and Strapi`                                                                  | `Creacion de una CLI interna automatizando el scaffolding de proyectos con Next.js y Strapi`                                                                |
| `experience.litebox.highlights.3` | `Built back-office apps with React Hook Form, Google Maps API, and OpenAI`                                                                        | `Desarrollo de aplicaciones back-office con React Hook Form, Google Maps API y OpenAI`                                                                      |
| `experience.axon.role`            | `Software Engineer`                                                                                                                               | `Software Engineer`                                                                                                                                         |
| `experience.axon.period`          | `Sep 2021 - Sep 2022`                                                                                                                             | `Sep 2021 - Sep 2022`                                                                                                                                       |
| `experience.axon.duration`        | `1 yr`                                                                                                                                            | `1 ano`                                                                                                                                                     |
| `experience.axon.description`     | `Remote coaching school for athletes and professional leaders. One of the best-known coaching schools in LatAm.`                                  | `Escuela de coaching remoto para atletas y lideres profesionales. Una de las escuelas de coaching mas reconocidas en LatAm.`                                |
| `experience.axon.highlights.0`    | `Built a CRM application from scratch for the sales department`                                                                                   | `Desarrollo de una aplicacion CRM desde cero para el departamento de ventas`                                                                                |
| `experience.axon.highlights.1`    | `Created a WhatsApp Bot for sales reminders and payment notifications`                                                                            | `Creacion de un Bot de WhatsApp para recordatorios de ventas y notificaciones de pago`                                                                      |
| `experience.axon.highlights.2`    | `Implemented CI/CD workflow using GitHub Actions`                                                                                                 | `Implementacion de workflows CI/CD usando GitHub Actions`                                                                                                   |
| `experience.axon.highlights.3`    | `Ensured cross-browser compatibility and security standards`                                                                                      | `Garantia de compatibilidad cross-browser y estandares de seguridad`                                                                                        |

#### Namespace: `about`

| Key                 | EN                                                                                                                                                                                                                                                                                                                                       | ES                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `about.badge`       | `ABOUT`                                                                                                                                                                                                                                                                                                                                  | `ACERCA`                                                                                                                                                                                                                                                                                                                                                             |
| `about.titleLine1`  | `The Person`                                                                                                                                                                                                                                                                                                                             | `La Persona`                                                                                                                                                                                                                                                                                                                                                         |
| `about.titleLine2`  | `Behind The Pixels`                                                                                                                                                                                                                                                                                                                      | `Detras de los Pixeles`                                                                                                                                                                                                                                                                                                                                              |
| `about.description` | `The story behind the code — who I am, how I think, and what drives me to build interfaces that feel alive.`                                                                                                                                                                                                                             | `La historia detras del codigo — quien soy, como pienso y que me impulsa a construir interfaces que se sienten vivas.`                                                                                                                                                                                                                                               |
| `about.bio`         | `I'm Diego — a Frontend Engineer with 4+ years building interfaces that feel alive. Based in Argentina, shipping globally. I obsess over the details that most people never notice — the easing curve that makes a transition feel natural, the millisecond that separates fast from instant, the whitespace that lets content breathe.` | `Soy Diego — un Ingeniero Frontend con 4+ anos construyendo interfaces que se sienten vivas. Desde Argentina para el mundo. Me obsesiono con los detalles que la mayoria nunca nota — la curva de easing que hace que una transicion se sienta natural, el milisegundo que separa lo rapido de lo instantaneo, el espacio en blanco que deja al contenido respirar.` |
| `about.scrollHint`  | `Scroll to reveal`                                                                                                                                                                                                                                                                                                                       | `Desplaza para revelar`                                                                                                                                                                                                                                                                                                                                              |

Note: highlighted words within the bio ("alive.", "natural,", "instant,", "breathe.") are determined by position/index in the component, not by translation keys. The component must handle this per locale — see Phase 5.

#### Namespace: `contact`

| Key              | EN        | ES         |
| ---------------- | --------- | ---------- |
| `contact.copied` | `Copied!` | `Copiado!` |

Note: manifesto lines ("Make it fast.", etc.) remain hardcoded — they are brand statements, not translatable content. Social links and email also remain hardcoded.

#### Namespace: `footer`

| Key                  | EN                                                                 | ES                                                                           |
| -------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `footer.description` | `Crafting interfaces that feel alive. Available for new projects.` | `Creando interfaces que se sienten vivas. Disponible para nuevos proyectos.` |
| `footer.copyright`   | `© {year} Diego Sanchez`                                           | `© {year} Diego Sanchez`                                                     |
| `footer.scrollToTop` | `Top`                                                              | `Inicio`                                                                     |

Note: "DIEGO SANCHEZ" heading and "DRSM" monogram remain hardcoded. Nav links use the `nav.*` keys.

#### Namespace: `loading`

| Key             | EN      | ES       |
| --------------- | ------- | -------- |
| `loading.enter` | `Enter` | `Entrar` |

#### Namespace: `common`

| Key              | EN        | ES         |
| ---------------- | --------- | ---------- |
| `common.present` | `Present` | `Presente` |

---

## Phase 4: SEO & Metadata

### 4.1 Dynamic metadata per locale

In `app/[locale]/layout.tsx`, generate metadata using `next-intl`:

```ts
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://drsm.vercel.app/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://drsm.vercel.app/${l}`])),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      url: `https://drsm.vercel.app/${locale}`,
      siteName: "Diego Sanchez",
      type: "website",
    },
  };
}
```

### 4.2 hreflang tags

Handled automatically by Next.js through the `alternates.languages` field in metadata. Produces:

```html
<link rel="alternate" hreflang="en" href="https://drsm.vercel.app/en" />
<link rel="alternate" hreflang="es" href="https://drsm.vercel.app/es" />
```

### 4.3 Sitemap

Update or create `app/sitemap.ts`:

```ts
import { locales } from "@/i18n/config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drsm.vercel.app";

  return locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
      },
    },
  ]);
}
```

---

## Phase 5: Component Integration

### 5.1 Server components

Use `next-intl/server` for server components:

```ts
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  // use t("description"), tNav("projects"), etc.
}
```

### 5.2 Client components

Use `next-intl` hook for client components:

```ts
"use client";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  // use t("tagline"), t("downloadResume"), etc.
}
```

### 5.3 Language switcher

The Navbar already has a globe icon button. Wire it up:

```tsx
"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "es" : "en";

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  // aria-label uses nav.toggleLanguage key
}
```

This triggers a soft navigation (`/en` ↔ `/es`) — no hard reload, Next.js handles the transition.

### 5.4 About section — highlighted words

The bio has specific words highlighted in accent color ("alive.", "natural,", "instant,", "breathe."). These differ per locale:

```ts
const highlightedWords: Record<Locale, string[]> = {
  en: ["alive.", "natural,", "instant,", "breathe."],
  es: ["vivas.", "natural,", "instantaneo,", "respirar."],
};
```

Keep this map in the About component. Use `useLocale()` to pick the right set.

### 5.5 Rich text in translations

For the hero tagline which has bold text (`**ideas breathe**`), use `next-intl`'s rich text support:

```tsx
t.rich("tagline", {
  bold: (chunks) => <strong className="text-accent">{chunks}</strong>,
});
```

In the JSON files, use XML-like tags:

```json
{
  "hero": {
    "tagline": "Obsessed with making <bold>ideas breathe</bold>"
  }
}
```

### 5.6 Resume download

The "Download Resume" button should serve the correct resume per locale if locale-specific resumes exist. For now, same resume for both locales. If a Spanish resume is added later, use:

```ts
const resumePath = locale === "es" ? "/resume-es.pdf" : "/resume.pdf";
```

---

## Phase 6: Files to Create

| File               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `i18n/config.ts`   | Locale constants and types               |
| `i18n/request.ts`  | next-intl server request config          |
| `i18n/routing.ts`  | Navigation helpers with locale awareness |
| `middleware.ts`    | Locale detection and routing             |
| `messages/en.json` | English translations                     |
| `messages/es.json` | Spanish translations                     |
| `app/sitemap.ts`   | Locale-aware sitemap                     |

## Phase 7: Files to Modify

| File                                               | Changes                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`                                   | Wrap with `createNextIntlPlugin`                                                                                          |
| `app/layout.tsx`                                   | Strip down to minimal root layout                                                                                         |
| `app/[locale]/layout.tsx`                          | New — current layout adapted with locale param, `NextIntlClientProvider`, dynamic `lang` attribute, locale-aware metadata |
| `app/[locale]/page.tsx`                            | New — current page moved here                                                                                             |
| `app/not-found.tsx`                                | Global not-found page                                                                                                     |
| `components/common/Navbar/navbar.tsx`              | Replace hardcoded nav items with `useTranslations("nav")`, wire language toggle                                           |
| `components/common/Footer/footer.tsx`              | Replace hardcoded text with `useTranslations("footer")` + `useTranslations("nav")`                                        |
| `components/custom/home/Hero/hero.tsx`             | Replace hardcoded tagline, button labels, scroll text with `useTranslations("hero")`                                      |
| `components/custom/home/Projects/projects.tsx`     | Replace hardcoded badge, title, description, project data text with `useTranslations("projects")`                         |
| `components/custom/home/Experience/experience.tsx` | Replace hardcoded title, description, experience data text with `useTranslations("experience")`                           |
| `components/custom/home/About/about.tsx`           | Replace hardcoded badge, title, description, bio with `useTranslations("about")`, locale-aware highlighted words          |
| `components/custom/home/Contact/contact.tsx`       | Replace "Copied!" with `useTranslations("contact")`                                                                       |

---

## Phase 8: Implementation Order

1. **Install dependencies** — `next-intl`, types
2. **Create i18n config files** — `config.ts`, `request.ts`, `routing.ts`
3. **Create message files** — `en.json`, `es.json` with all keys
4. **Create middleware** — locale detection and redirect
5. **Restructure app directory** — `[locale]` segment, move layout and page
6. **Update next.config.ts** — plugin wrapper
7. **Update layout** — dynamic `lang`, `NextIntlClientProvider`, metadata
8. **Integrate Navbar** — translations + language switcher wiring
9. **Integrate Hero** — translations with rich text
10. **Integrate Projects** — translations for all project data
11. **Integrate Experience** — translations for all experience data
12. **Integrate About** — translations + locale-aware highlights
13. **Integrate Contact** — translation for "Copied!" state
14. **Integrate Footer** — translations
15. **Add sitemap** — locale-aware entries
16. **Update tests** — wrap test renders with `NextIntlClientProvider`, mock translations
17. **Verify** — `pnpm lint` + `pnpm build` pass, both `/en` and `/es` render correctly

---

## Phase 9: Testing Strategy

### 9.1 Unit tests

Every component test must wrap the render with `NextIntlClientProvider` and supply messages:

```tsx
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";

function renderWithIntl(ui: React.ReactElement, locale = "en") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}
```

Create a shared test utility `utils/test-utils.tsx` with this helper.

### 9.2 What to test

- Components render correct translated text for each locale
- Language switcher toggles locale
- Navbar renders translated nav items
- Footer renders translated description
- Non-translatable content (name, tech labels) remains unchanged across locales

### 9.3 Build verification

- `pnpm build` must succeed — this validates all i18n keys exist in both locales
- Both `/en` and `/es` must be in the static output

---

## Out of Scope

- Projects page (`/projects`) and detail pages — separate spec
- Locale-specific resume PDF — same file for both locales for now
- View transitions between locale switches — future enhancement
- RTL support — not needed for en/es
- More than 2 locales — architecture supports it but not implementing now
