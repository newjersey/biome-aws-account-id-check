<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Next.js Template

This package is a Next.js App Router template using React, TypeScript, next-intl, Trussworks
React-USWDS, and Grove, the State of New Jersey design system built on USWDS. Read `README.md` for
package structure, locales, and Grove asset handling. Run all commands from the repository root.

## Component Discovery

Follow this sequence before creating or changing a frontend component:

1. Test API-level access with `gh repo view newjersey/njwds-docs` and
   `gh repo view newjersey/njwds`. Use `gh api` to inspect relevant documentation and source.
2. For each inaccessible repository, test its deployed equivalent: `https://grove.nj.gov/` for
   documentation and `https://storybook.grove.nj.gov/` for component examples.
3. Break the requested interface into the smallest useful atoms, molecules, and organisms.
4. Use `@trussworks/react-uswds` when its component preserves Grove's documented markup, styling,
   content, and accessibility contract.
5. When Trussworks does not provide the Grove-specific component or required variant, create a
   small stateful React controller around a stateless Grove view.
6. If Grove and Trussworks have no suitable primitive, inspect `uswds/uswds` and the USWDS
   component documentation for stateless markup or behavior that can be wrapped for React.
7. Build a custom component only after Grove, Trussworks, and USWDS have been ruled out.

## Grove Implementation

- Read all relevant Grove usage, content, pattern, and accessibility guidance before implementation.
- Match documented component markup and variants; do not detach or override component internals.
- Prefer Grove or USWDS component classes, utilities, tokens, and responsive classes over custom CSS.
- Avoid inline styles, hardcoded design values, and fixed dimensions when system utilities apply.
- Use Grove's compiled CSS as the application theme. Do not import a second USWDS theme.
- Do not load Grove or USWDS JavaScript; it would compete with Trussworks and React state.
- Keep presentation components stateless. Put state, effects, and event coordination in separate
  controller components that render stateless views.
- Keep each component focused on one responsibility and split it when it grows beyond that scope.
- Keep user-facing copy in topic modules under `content/messages/<locale>`.
- Preserve official names such as New Jersey, State of New Jersey, and New Jersey Innovation
  Authority in every locale.

## Component Contracts

- Pass component inputs through one structured props object with a named exported interface.
- Document module headers, function headers, interface headers, and every interface member with
  JSDoc that explains its purpose, accepted values, and optionality.
- Keep interface members readonly unless mutation is part of the documented contract.
- Do not add inline implementation comments; make the code explain itself through small named units.

## Accessibility and Responsive Behavior

- Meet or exceed WCAG 2.2 AA using semantic HTML before ARIA.
- Provide keyboard operation, visible focus, accessible names, announced errors, and correct focus
  management for every interaction.
- Never rely only on color, position, or visual appearance to communicate meaning.
- Design and verify mobile-first behavior at mobile, tablet, and desktop viewport sizes.
- Test the assembled implementation; design-system primitives do not make surrounding markup
  automatically accessible.

## Testing

- Add Vitest unit or component tests for every new frontend component.
- Add Playwright coverage for every new frontend component at mobile, tablet, and desktop viewports,
  including its rendered behavior, keyboard interaction when applicable, and automated axe scan.
- Keep tests deterministic and assert observable behavior rather than implementation details.
- Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` before review.
