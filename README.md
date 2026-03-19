# DRSM - Diego Sanchez Portfolio

[![CI](https://github.com/DiegoRSM03/drsm/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoRSM03/drsm/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://drsm.vercel.app)

Personal portfolio and hiring magnet for a Senior Frontend Engineer. Built with modern web technologies and a focus on performance, animations, and user experience.

**Live**: [drsm.vercel.app](https://drsm.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, GSAP
- **Deployment**: Vercel (SSG)

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/DiegoRSM03/drsm.git
cd drsm

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command      | Description                    |
| ------------ | ------------------------------ |
| `pnpm dev`   | Start development server       |
| `pnpm build` | Create production build        |
| `pnpm start` | Serve production build locally |
| `pnpm lint`  | Run ESLint                     |

## Project Structure

```
app/                    # Next.js App Router pages
components/
  common/               # Reusable UI components
  custom/               # Feature-specific components
contexts/               # React contexts
hooks/                  # Custom hooks
utils/                  # Utility functions
public/                 # Static assets
```

## Architecture

- **Server Components** by default for optimal performance
- **Client Components** only when required (hooks, animations, interactivity)
- **Static Site Generation** for fast initial loads
- **Component-driven** architecture with barrel exports

## License

MIT
