# Next.js Template

This package is the template's Next.js App Router application. It demonstrates Grove's standard
page shell, locale-aware content, Trussworks React-USWDS components, React-owned interactions, unit
tests, and focused browser accessibility checks.

## Package Structure

- `app/[locale]` composes locale-scoped routes, metadata, and document language direction.
- `components` contains the Grove presentation components and interactive controllers.
- `content/messages/<locale>` contains `shell`, `home`, `footer`, and `identifier` topic modules.
- `i18n` defines supported locales, routing, navigation, and next-intl request configuration.
- `scripts` contains the Grove asset synchronization operation and command entry point.
- `tests/accessibility` contains Playwright interaction and axe coverage.

## Locales

English uses unprefixed routes. Every non-English locale uses a locale-prefixed route:

| Language | Route |
| --- | --- |
| Arabic (Saudi Arabia) | `/ar-SA` |
| Simplified Chinese (China) | `/zh-CN` |
| English (United States) | `/` |
| Spanish (United States) | `/es-US` |
| French (France) | `/fr-FR` |
| Italian (Italy) | `/it-IT` |
| Russian (Russia) | `/ru-RU` |

Arabic renders right to left. Official names, including New Jersey, State of New Jersey, and New
Jersey Innovation Authority, remain unchanged in every locale.

To add a locale, update `i18n/locales.ts`, add every topic module under `content/messages`, compose
the locale in `content/messages/catalog.ts`, and extend the relevant unit and browser tests.

## Grove Assets

`@newjersey/njwds` is the source of Grove's compiled CSS, images, fonts, and icon sprite. The
`sync:grove-assets` command validates the installed distribution, prepares a complete copy, and
replaces `public/assets/grove` with rollback support. The generated directory is ignored by Git and
is refreshed automatically before development, builds, production startup, and accessibility tests.

Grove supplies the application theme and assets. React components use Trussworks when its USWDS
markup preserves Grove's documented contract, then fall back to stateless Grove markup with
React-owned state for New Jersey-specific patterns. The application does not load USWDS JavaScript.

## Feedback Widget

The official Grove feedback widget is installed but disabled by default. Copy the documented values
from `.env.example` into the deployment environment only after confirming the project is ready to
transmit public feedback and the support link is correct.

The upstream widget currently supports English and Spanish. This application renders it only for
`en-US` and `es-US`; other locales intentionally omit it rather than display an English fallback.
The browser suite intercepts widget requests so tests never transmit feedback.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/nextjs-template dev
pnpm --filter @newjersey/nextjs-template test:watch
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

The production build uses Next.js standalone output. The Dockerfile installs the exact pnpm version
with npm because Node.js 26 does not bundle Corepack, then uses a BuildKit cache mount for pnpm's
store. The root Amplify build specification installs the same pnpm version and builds this package
from the workspace root.

Build and run this package's production container from the repository root:

```bash
docker build --file packages/nextjs-template/Dockerfile --target production --tag innovation-nextjs-template:local .
docker run --rm --publish 3000:3000 innovation-nextjs-template:local
```

Start its bind-mounted development container with the package-owned Compose file:

```bash
docker compose --file packages/nextjs-template/compose.yaml up --build
```
