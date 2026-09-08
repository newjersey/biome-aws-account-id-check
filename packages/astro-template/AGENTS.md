# Astro Template

This package is a static-first Astro template using TypeScript and Grove, the State of New Jersey
design system built on USWDS. Read `README.md` for package structure, locales, Grove assets, and
browser behavior. Run all commands from the repository root.

## Component Discovery

Follow this sequence before creating or changing a frontend component:

1. Test API-level access with `gh repo view newjersey/njwds-docs` and
   `gh repo view newjersey/njwds`. Use `gh api` to inspect relevant documentation and source.
2. For each inaccessible repository, test its deployed equivalent: `https://grove.nj.gov/` for
   documentation and `https://storybook.grove.nj.gov/` for component examples.
3. Break the requested interface into the smallest useful Astro components. Prefer Grove's
   documented semantic markup, CSS primitives, and packaged USWDS behavior.
4. Use Grove's `uswds-init.min.js` and `uswds.min.js` for documented interactions when the
   server-rendered document is the sole DOM owner.
5. If Grove has no suitable primitive, inspect `uswds/uswds` and USWDS documentation before writing
   application-owned markup or browser behavior.
6. Add framework-free TypeScript only for behavior Grove and the platform do not supply.

## Grove Implementation

- Read relevant Grove usage, content, pattern, and accessibility guidance before implementation.
- Match documented markup and variants; do not detach or override component internals.
- Prefer Grove or USWDS classes, utilities, tokens, and responsive classes over custom CSS.
- Keep Astro components server-rendered and free of client-framework hydration.
- Do not register competing handlers for controls already owned by Grove's JavaScript.
- Keep each component focused on one responsibility and split it when it grows beyond that scope.
- Keep user-facing copy in topic modules under `content/messages/<locale>`.
- Preserve official names such as New Jersey, State of New Jersey, and New Jersey Innovation
  Authority in every locale.

## Component Contracts

- Pass component inputs through one structured `Props` interface.
- Document module headers, interface headers, and interface members when their purpose is not clear
  from the component and type names.
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

- Add Vitest coverage for configuration, data contracts, and nontrivial Astro component output.
- Use Astro's pinned Container API only in Node-environment tests; it is experimental and should not
  become an application runtime dependency.
- Add Playwright coverage for rendered behavior, keyboard interaction, reflow, and axe scans at
  mobile, tablet, and desktop viewports.
- Keep tests deterministic and assert observable behavior rather than implementation details.
- Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` before review.
