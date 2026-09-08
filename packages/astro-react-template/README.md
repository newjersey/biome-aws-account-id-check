# Astro React Server Template

This package is the template's server-rendered Astro application. It demonstrates React Islands,
Trussworks React-USWDS, Grove's standard page shell, locale-aware content, a production API route,
unit tests, and browser accessibility checks on the same server artifact deployed to AWS Amplify.

## Package Structure

- `src/pages` defines server-rendered locale routes, the 404 page, and `/api/health`.
- `src/layouts` defines document metadata, language direction, and Grove assets.
- `src/components` composes the Astro page and its React hydration boundaries.
- `components` contains stateless Grove and Trussworks React views.
- `controllers` contains the React Islands that own browser behavior.
- `content/messages/<locale>` contains `shell`, `home`, `footer`, and `identifier` topic modules.
- `i18n` defines supported locales, language metadata, navigation, and canonical URLs.
- `scripts` contains the Grove asset synchronization operation.
- `tests/accessibility` contains Playwright interaction and axe coverage.

## Locales

English uses an unprefixed route. Every non-English locale uses a locale-prefixed route:

| Language | Route |
| --- | --- |
| Arabic (Saudi Arabia) | `/ar-SA` |
| Simplified Chinese (China) | `/zh-CN` |
| English (United States) | `/` |
| Spanish (United States) | `/es-US` |
| French (France) | `/fr-FR` |
| Italian (Italy) | `/it-IT` |
| Russian (Russia) | `/ru-RU` |

Arabic renders right to left. Official names remain unchanged in every locale.

To add a locale, update `i18n/locales.ts`, add every topic module under `content/messages`, compose
the locale in `content/messages/catalog.ts`, and extend unit and browser tests.

## React Islands and Grove

`@newjersey/njwds` supplies Grove's compiled CSS, images, fonts, and icon sprite. The
`sync:grove-assets` command validates the installed distribution and atomically replaces
`public/assets/grove`. The generated directory is ignored by Git and refreshed automatically.

Astro renders the banner, hero, graphic list, footer, and identifier React components to HTML
without sending their React code to the browser. The responsive header and focus coordinator load
immediately as React Islands. The optional feedback widget hydrates when the browser is idle.

The application does not load Grove or USWDS JavaScript. React controllers are the sole state owner
for the responsive header, language selector, focus behavior, and feedback web component.

## Feedback Widget

The official Grove feedback widget is installed but disabled by default. Copy documented
`PUBLIC_*` values from `.env.example` into the build environment only after confirming the project
is ready to transmit public feedback.

The widget currently renders only for `en-US` and `es-US`. Other locales omit it instead of showing
an English fallback. Environment settings are embedded at build time, so changes require a rebuild.

## Server Runtime

Every page is rendered on demand. `GET /api/health` provides a deterministic, uncached health
response for deployment checks without exposing environment or build details.

The `astro-aws-amplify` adapter emits `.amplify-hosting`, containing both static assets and the Node
compute entrypoint. Amplify publishes that directory directly. The production Docker image runs
the same generated entrypoint.

Adapter `runtimeEnv` configuration can propagate an explicit allowlist of server environment
variables into Amplify compute. Add only values the derived application actually requires.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/astro-react-template dev
pnpm --filter @newjersey/astro-react-template test:watch
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

Build and run this package's production container from the repository root:

```bash
docker build --file packages/astro-react-template/Dockerfile --target production --tag innovation-astro-react-template:local .
docker run --rm --publish 3000:3000 innovation-astro-react-template:local
```

Start its bind-mounted development container with the package-owned Compose file:

```bash
docker compose --file packages/astro-react-template/compose.yaml up --build
```
