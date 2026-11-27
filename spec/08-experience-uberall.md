# Experience: Uberall

Goal: add Uberall as the current job on top of the Experience section, close the Inaza card as a finished role, and fix the years in the About bio.

## Decisions

| Item        | Uberall                                                            | Inaza                                                                       |
| ----------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Role        | Senior Frontend Engineer                                           | Software Engineer & AI Adoption Lead                                        |
| Period (en) | Sep 2026 - Present                                                 | Jan 2026 - Sep 2026                                                         |
| Period (es) | Sep 2026 - Presente                                                | Ene 2026 - Sep 2026                                                         |
| Duration    | none (current role, `isCurrent`)                                   | 9 mos / 9 meses                                                             |
| Tags        | Next.js, React, TypeScript, TanStack Query, SSR, Claude Code       | Python, Vertex AI, Claude Code, Pydantic, Graph API, OCR                    |
| Highlights  | 4: next-gen Locator, widget + SSR service, a11y & SEO, AI workflow | 4: AI adoption lead, Claude Code playbook, email intake, document pipelines |
| Card color  | `GREEN_HEX`, number `#134E3A` dark / `#D1FAE5` light               | unchanged                                                                   |

- Card order: Uberall (04), Inaza (03), Litebox (02), Axon (01). Order is array order; the number derives from `EXPERIENCES.length`.
- Bio: "almost 5 years" → "5+ years" (en), "casi 5 años" → "más de 5 años" (es). The highlighted words stay the same.
- The downloadable resume PDF and the old `spec/04-homepage-i18n.md` tables are out of scope.
- Copy, character for character: the approved plan's "Copy" section.

---

## Phase 1: Data

- [x] Add the Uberall entry at index 0 of `EXPERIENCES` with `highlightCount: 4`
- [x] Update the Inaza `skills`

## Phase 2: Copy

- [x] Add `experience.uberall` before `experience.inaza` in `messages/en.json` and `messages/es.json`
- [x] Rewrite `experience.inaza` in both locales (past tense, closed period)
- [x] Update `about.bio` years in both locales

## Phase 3: Tests

- [x] `experience.test.tsx`: 4 articles, 4 skills lists, Uberall text and heading

## Phase 4: Verification

- [x] `experience` key sets of `en.json` and `es.json` are identical; each company has 4 highlights
- [x] `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm format:check` pass
- [x] Visual check at mobile / tablet / desktop × dark / light in `/` and `/es`: four cards in order, Uberall expanded first, scroll activates each card, tags wrap without overflow, bio highlights intact
