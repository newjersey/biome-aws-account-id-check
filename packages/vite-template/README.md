# Vite Template

This package is the template's Vite React and TypeScript single-page application. It demonstrates
Grove's standard page shell, locale-aware React Router routes, i18next translations, Trussworks
React-USWDS components, unit tests, and focused browser accessibility checks.

## Package Structure

- `src/main.tsx` bootstraps the React app, initializes i18next, and mounts the router.
- `src/App.tsx` renders the page shell and syncs the i18next language and `document.lang` with the active route locale.
- `src/components` contains stateless Grove and Trussworks presentation components.
- `src/pages` contains page-level components rendered by the route tree.
- `src/routes` defines canonical route paths, localized slug registration, and the routes configuration.
- `src/i18n` defines supported locales, localized path maps, the i18next configuration, and locale-aware navigation utilities.
- `content/<locale>` contains JSON message files per locale: `common`, `home`, `about`, `notfound`, and `pages`.

## Locales and Routing

Supported locales are defined in `src/i18n/locales.ts`. The default locale is `en-US`.

| Locale | Route prefix |
| --- | --- |
| English (United States) | `/en-US` |
| Spanish (United States) | `/es-US` |

`/` redirects to `/en-US`. Unrecognized first segments redirect to the equivalent path under `/en-US`. Each page can have a locale-specific slug defined in `LOCALIZED_PATHS_MAP` — for example, `/about` resolves to `/en-US/about` and `/es-US/quienes-somos`. Both slugs render the same component.

Adding a new locale requires one entry in `SUPPORTED_LOCALES`, one entry in `LOCALE_NAMES`, and a new content directory under `content/<locale>`. Adding a new page with translated slugs requires one entry in `CANONICAL_PATHS`, one entry in `LOCALIZED_PATHS_MAP`, and a route child in `routesConfig`.

## Internationalization

i18next is initialized in `src/i18n/config.ts` with all locale and namespace resources loaded statically from `content/`. Namespaces mirror the content filenames: `common`, `home`, `about`, `notfound`, `pages`. Components call `useTranslation` with the relevant namespace. `App.tsx` calls `i18n.changeLanguage` on every route change to keep translations and `document.documentElement.lang` in sync.

The `useLocalizeHref` hook (in `src/i18n/navigation.tsx`) returns a function that prepends the current locale prefix and applies any localized slug from `LOCALIZED_PATHS_MAP`. Pass it a canonical path from `src/routes/routePaths.tsx` to get a fully localized URL.

## Design Decisions

**Locale codes use BCP 47 region tags (`en-US`, not `en`).** Locale identifiers always include the
region subtag. This distinguishes regional variants (e.g. `es-US` vs `es-ES`), matches the
`lang` attribute format expected by browsers and assistive technology, and keeps locale codes
consistent across content files, i18next configuration, route prefixes, and `LOCALE_NAMES`.

**Content is stored in JSON files.** All user-facing copy lives in `content/<locale>/*.json`. Do
not use TypeScript, YAML, or any other format. JSON is intentionally chosen for future
compatibility with a CMS — the structure is easy to import, export, and diff against a CMS data
model without a conversion step.

**Translations are loaded with i18next.** Components access translated strings exclusively through
`useTranslation` and `t()` from `react-i18next`. Do not import content JSON directly in
components (except in tests). i18next is the project's translation library; do not introduce a second mechanism.

**Route paths are localized, not just page content.** Each page slug is translated per locale in
`LOCALIZED_PATHS_MAP`. A Spanish user sees `/es-US/quienes-somos`, not `/es-US/about`. This is
intentional: localized URLs are more meaningful to users, improve SEO in each language, and
reflect that localization is a first-class concern of the routing layer, not an afterthought.
Always add new pages to `LOCALIZED_PATHS_MAP` with a slug per supported locale.

## Grove and Trussworks

`@newjersey/njwds` supplies Grove's compiled CSS, images, fonts, and icon sprite. The

Grove supplies the application theme and assets. React components use Trussworks when its USWDS
markup preserves Grove's documented contract, then fall back to stateless Grove markup with
React-owned state for New Jersey-specific patterns. The application does not load USWDS JavaScript.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/vite-template dev
pnpm --filter @newjersey/vite-template test:watch
pnpm --filter @newjersey/vite-template preview
pnpm check
pnpm test
pnpm build
```

Vite's preview server is for local verification, not production hosting. Amplify publishes `dist`
as static files and requires a 200 rewrite from extensionless application routes to `index.html`.
The production Docker image serves the same build through an unprivileged nginx process.

Build and run the production container from the repository root:

```bash
docker build --file packages/vite-template/Dockerfile --target production --tag innovation-vite-template:local .
docker run --rm --publish 3000:3000 innovation-vite-template:local
```

Start its bind-mounted development container with:

```bash
docker compose --file packages/vite-template/compose.yaml up --build
```
