# Repository Guidance

## Project Overview

This repository is a pnpm workspace template for New Jersey Innovation Authority applications. The
root owns shared tooling, CI, dependency policy, and deployment configuration. Independent Next.js,
static Astro, server-rendered Astro React, and Vite applications live under `packages`.

Read the nearest `AGENTS.md` before changing files. More specific instructions override this file.

## Environment

- Use the Node.js version in `.nvmrc`.
- Use the exact pnpm version in the root `packageManager` field.
- Install dependencies from the repository root with `pnpm install --frozen-lockfile`.
- Add direct dependencies with exact versions and commit `pnpm-lock.yaml`.
- Never commit credentials, tokens, private keys, or generated build output.
- Do not commit any package's `public/assets/grove` directory; package lifecycle scripts generate
  it from the pinned `@newjersey/njwds` dependency.

## Commands

Run repository commands from the repository root:

```bash
pnpm check
pnpm test
pnpm format
pnpm build
pnpm test:accessibility
```

Run development, preview, start, and watch commands through an explicit package filter.
Run `pnpm check` and `pnpm test` before requesting review. Use `pnpm format` only when intentionally
rewriting files.

## Change Guidance

- Keep changes focused enough to review in one sitting.
- Preserve stack neutrality. Put framework, deployment, and application-specific rules in the
  derived repository rather than this template.
- Prefer existing tooling and repository patterns over adding dependencies or new configuration.
- Keep shared instructions brief and universally applicable. Link to detailed documentation instead
  of copying it into startup context.
- Add scoped `AGENTS.md` files only when a directory has rules that do not apply repository-wide.
- Keep `CLAUDE.md` as a sibling symlink to the authoritative `AGENTS.md`.

Before review, `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` must pass.

## Repository References

- `README.md` explains the template and initialization steps.
- `README.template.md` is the starting point for a derived repository's public documentation.
- `CONTRIBUTING.md` defines branch, commit, review, and contribution requirements.
- `SECURITY.md` defines vulnerability-reporting expectations.
- `.claude/rules/` contains path-scoped Claude guidance, including TypeScript quality rules.
- `.github/` contains issue, pull-request, dependency, and CI configuration.

When these references disagree, follow the most specific document and update stale documentation as
part of the same change.

- Read `README.md` for architecture, setup, and deployment.
- Read `CONTRIBUTING.md` for branches, commits, pull requests, and review expectations.
- Read the nearest package `AGENTS.md` before changing an application.
- Let Biome, Ruff, ty, and TypeScript enforce formatting, linting, and type safety; do not reproduce
  those rules in agent instructions.
