---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mts"
  - "**/*.cts"
---

# TypeScript Quality

## Tooling

- Follow the repository's TypeScript, formatter, and linter configuration. Do not reproduce
  formatting rules manually.
- Run the nearest documented type-check, lint, and test commands before review.
- Keep direct dependencies exact and update the committed lockfile when dependencies change.

## Modules and Functions

- Use ES modules, static imports, and `import type` for type-only dependencies.
- Prefer named arrow functions. Extract callbacks containing logic into named functions.
- Keep functions focused and small. Separate side effects from pure transformation logic.
- Use a named parameter-object interface when a function needs more than two inputs.
- Avoid boolean parameters that switch between distinct behaviors; expose separate named operations.
- Initiate independent asynchronous work together and resolve it with `Promise.all` or
  `Promise.allSettled`.
- Await every promise. Use `async` and `await` instead of promise chains.

## Types and Boundaries

- Do not use `any`. Use `unknown` at untyped boundaries and narrow it explicitly.
- Use named interfaces for structured inputs and exported contracts.
- Make interface members `readonly` unless in-place mutation is an intentional part of the contract.
- Document exported functions, interfaces, and interface members with concise JSDoc.
- Prefer literal unions or discriminated unions over broad primitives and clusters of optional
  properties.
- Export types that cross module boundaries instead of requiring consumers to reconstruct them.
- Validate environment variables, external responses, files, and user input before business logic
  receives them.

## Errors and Effects

- Do not discard errors. Rethrow them with context or convert known failures into typed domain
  errors.
- Centralize environment access in a validated configuration boundary.
- Keep side effects explicit and localized. Prefer idempotent write operations where the domain
  permits them.
- Do not log secrets, credentials, tokens, or personal information.

## Structure and Tests

- Keep each module responsible for one concern and avoid circular dependencies.
- Depend on narrow interfaces for external services so tests can substitute controlled
  implementations.
- Co-locate focused unit tests with their module. Put cross-module integration and contract tests in
  the repository's designated test directories.
- Test observable behavior, boundary validation, failure paths, and accessibility-relevant output.
- Keep tests deterministic and independent of live network services.
