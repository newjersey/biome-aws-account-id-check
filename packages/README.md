# Workspace Packages

This directory contains independently owned packages in the pnpm workspace.

## Packages

- [`nextjs-template`](nextjs-template/README.md) is the Next.js App Router and Grove template.
- [`astro-template`](astro-template/README.md) is the static-first Astro and Grove template.
- [`astro-react-template`](astro-react-template/README.md) is the server-rendered Astro, React
  Islands, Trussworks, and Grove template.
- [`vite-template`](vite-template/README.md) is the Vite React, React Router, and Grove template.
- [`hono-template`](hono-template/README.md) is the Hono and TypeScript API template for Node.js,
  AWS Lambda, Amplify Hosting, and containers.
- [`fastapi-template`](fastapi-template/README.md) is the FastAPI and Python API template for
  Uvicorn, AWS Lambda, and containers.

Add new packages only when they have a distinct responsibility, dependency boundary, and command
surface. Root verification commands discover matching scripts recursively. Development and runtime
commands remain package-local and must be run through an explicit filter.

Run installation and shared verification commands from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```
