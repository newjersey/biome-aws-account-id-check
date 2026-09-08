# Astro React Server Template

This package is an Astro server template using React Islands, TypeScript, Trussworks React-USWDS,
and Grove, the State of New Jersey design system built on USWDS. Read `README.md` for package
structure, locales, hydration boundaries, Grove assets, API routes, and deployment behavior. Run
all commands from the repository root.

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
6. If Grove and Trussworks have no suitable primitive, inspect `uswds/uswds` and USWDS
   documentation for stateless markup or behavior that can be wrapped for React.
7. Build a custom component only after Grove, Trussworks, and USWDS have been ruled out.

## Grove Implementation

- Read relevant Grove usage, content, pattern, and accessibility guidance before implementation.
- Match documented markup and variants; do not detach or override component internals.
- Prefer Grove or USWDS classes, utilities, tokens, and responsive classes over custom CSS.
- Use Grove's compiled CSS as the application theme. Do not import a second USWDS theme.
- Do not load Grove or USWDS JavaScript; it would compete with React state.
- Render React presentation components without a client directive by default.
- Add a `client:*` directive only at the smallest controller boundary that requires browser state.
- Keep presentation components stateless. Put state, effects, and event coordination in separate
  controller components.
- Keep each component focused on one responsibility and split it when it grows beyond that scope.
- Keep user-facing copy in topic modules under `content/messages/<locale>`.
- Preserve official names such as New Jersey, State of New Jersey, and New Jersey Innovation
  Authority in every locale.

## Component Contracts

- Pass component inputs through one structured props object with a named exported interface.
- Document module headers, function headers, interface headers, and every interface member with
  JSDoc that explains its purpose, accepted values, and optionality.
- Keep interface members readonly unless mutation is part of the documented contract.
- Do not add inline implementation comments; use small named units for complex behavior.

## Accessibility and Responsive Behavior

- Meet or exceed WCAG 2.2 AA using semantic HTML before ARIA.
- Provide keyboard operation, visible focus, accessible names, announced errors, and correct focus
  management for every interaction.
- Never rely only on color, position, or visual appearance to communicate meaning.
- Design and verify mobile-first behavior at mobile, tablet, and desktop viewport sizes.
- Test the assembled implementation; design-system primitives do not make surrounding markup
  automatically accessible.

## Testing

- Add Vitest unit or component tests for every new frontend component and API contract.
- Add production-server coverage for pages, endpoints, static assets, and adapter output.
- Add Playwright coverage at mobile, tablet, and desktop viewports for rendered behavior, keyboard
  interaction, routing, reflow, and axe scans.
- Keep tests deterministic and assert observable behavior rather than implementation details.
- Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` before review.
