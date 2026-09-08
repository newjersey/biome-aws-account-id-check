# Astro Template

This package is the template's static-first Astro application. It demonstrates Grove's standard
page shell, locale-aware content, official USWDS browser behavior, unit tests, and focused browser
accessibility checks without React or another client UI framework.

## Package Structure

- `src/pages` defines the English root, localized static routes, and static 404 page.
- `src/layouts` defines document metadata, language direction, Grove assets, and browser scripts.
- `src/components` contains server-rendered Astro components.
- `content/messages/<locale>` contains `shell`, `home`, `footer`, and `identifier` topic modules.
- `i18n` defines supported locales, language metadata, and canonical URLs.
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

## Grove Assets and Behavior

`@newjersey/njwds` supplies Grove's compiled CSS, JavaScript, images, fonts, and icon sprite. The
`sync:grove-assets` command validates the installed distribution and atomically replaces
`public/assets/grove`. The generated directory is ignored by Git and refreshed automatically.

The document loads Grove's `uswds-init.min.js` and `uswds.min.js`. These scripts are the sole state
owner for the responsive header and language selector. Application-owned TypeScript is limited to
same-page focus behavior and loading the optional feedback web component.

## Feedback Widget

The official Grove feedback widget is installed but disabled by default. Copy documented
`PUBLIC_*` values from `.env.example` into the build environment only after confirming the project
is ready to transmit public feedback.

The widget currently renders only for `en-US` and `es-US`. Other locales omit it instead of showing
an English fallback. Environment settings are embedded at build time, so changes require a rebuild.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/astro-template dev
pnpm --filter @newjersey/astro-template test:watch
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

The production build emits static files to `dist`. Amplify publishes that directory directly, while
the production Docker image serves it from an unprivileged nginx process.

Build and run this package's production container from the repository root:

```bash
docker build --file packages/astro-template/Dockerfile --target production --tag innovation-astro-template:local .
docker run --rm --publish 3000:3000 innovation-astro-template:local
```

Start its bind-mounted development container with the package-owned Compose file:

```bash
docker compose --file packages/astro-template/compose.yaml up --build
```
