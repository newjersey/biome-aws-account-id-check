# Repository Guidance

## Project Overview

This repository publishes `biome-aws-account-id-check`, a [Biome](https://biomejs.dev) GritQL
linter plugin. It flags string, JSX attribute, and numeric literals in JavaScript, TypeScript,
JSON, and CSS source that contain an exact 12-digit run — the format of an AWS account ID.

The plugin ships as two parallel variants under `plugins/`: `plugins/warn/` emits warnings, and
`plugins/error/` emits errors. Biome does not let a consuming `biome.json` override a plugin
diagnostic's severity, so severity is chosen by which variant a consumer registers, not by
configuration. Consumers register one or more of the six `.grit` files directly.

Read the nearest `AGENTS.md` before changing files. More specific instructions override this file.

## Scope and Limitations

Biome's GritQL plugin engine can only analyze JavaScript, TypeScript, JSX, TSX, JSON, JSONC, and
CSS syntax trees. It cannot scan Markdown, YAML, Terraform, Python, plain text, or any other file
type. Do not describe this plugin as scanning "the repository" in documentation; describe it as
scanning the file types Biome supports.

Within those file types, detection matches an exact 12-digit run of digits bounded by a
non-word character (or the start/end of the literal). An AWS account ID immediately adjacent to
another letter, digit, or underscore with no separator will not match. Document this limitation
wherever detection behavior is described.

## Environment

- Use the Node.js version in `.nvmrc`.
- Use the exact pnpm version in the root `packageManager` field.
- Install dependencies with `pnpm install --frozen-lockfile`.
- Add direct dependencies with exact versions and commit `pnpm-lock.yaml`.
- Never commit credentials, tokens, private keys, or real AWS account IDs.

## Commands

Run repository commands from the repository root:

```bash
pnpm check
pnpm test
```

`pnpm test` runs the Node.js built-in test runner (`node --test tests/`) against the real Biome
CLI in isolated temporary directories; it requires no additional test framework. Run `pnpm check`
and `pnpm test` before requesting review.

## Change Guidance

- Keep the `warn` and `error` variants of each language plugin behaviorally identical except for
  the `severity` argument to `register_diagnostic`. Update both when changing detection logic.
- Every plugin file name must stay `aws-account-id.grit`, since Biome derives the suppression
  name (`lint/plugin/aws-account-id`) from the file's base name. Consumers rely on that name being
  stable across the warn and error variants and across the three supported languages.
- When adding a new supported language or literal kind, add fixture cases in
  `tests/support/cases.ts` covering: an exact 12-digit match, a 12-digit match with a leading
  zero, an 11-digit non-match, a 13-digit non-match, and a 12-digit run embedded in a larger
  string. `tests/plugin.test.ts` runs every case through both severities automatically.
- Keep changes focused enough to review in one sitting.

## Repository References

- `README.md` explains installation, configuration, and the severity variants.
- `CONTRIBUTING.md` defines branch, commit, review, and contribution requirements.
- `SECURITY.md` defines vulnerability-reporting expectations.
- `.claude/rules/` contains path-scoped Claude guidance for TypeScript quality.
- `.github/` contains issue, pull-request, dependency, and CI configuration.

When these references disagree, follow the most specific document and update stale documentation
as part of the same change.

- Read `README.md` for installation and configuration.
- Read `CONTRIBUTING.md` for branches, commits, pull requests, and review expectations.
- Let Biome enforce formatting, linting, and import organization; do not reproduce those rules in
  agent instructions.
