# Innovation Web Monorepo Templates

This repository is a pnpm workspace template for New Jersey Innovation Authority applications. It
includes independent Next.js App Router, static-first Astro, server-rendered Astro React, Vite
React, Hono API, and FastAPI applications, TypeScript, Python, Grove, Biome, Ruff, Vitest,
pytest, browser accessibility checks, Amplify configuration, Lambda-ready builds, and production
container targets.

![Homepage of the New Jersey Digital Service Starter template, showing the State header, primary navigation, and a hero section reading "A New Jersey foundation: Build clear, accessible public services" with an "Explore Grove" button](./screenshot.webp)

## Architecture

The root workspace owns shared developer tooling, dependency policy, CI, and deployment entry
points. Each application owns its framework, runtime, tests, and container:

- [`packages/nextjs-template`](packages/nextjs-template/README.md) is a Next.js App Router
  application using React and next-intl.
- [`packages/astro-template`](packages/astro-template/README.md) is a static-first Astro application
  using Grove's packaged USWDS browser behavior.
- [`packages/astro-react-template`](packages/astro-react-template/README.md) is a server-rendered
  Astro application using React Islands, Trussworks React-USWDS, and Grove.
- [`packages/vite-template`](packages/vite-template/README.md) is a Vite React and TypeScript
  single-page application using React Router and Trussworks React-USWDS.
- [`packages/hono-template`](packages/hono-template/README.md) is a Hono and TypeScript API
  application with Node.js, AWS Lambda, Amplify Hosting, and container targets.
- [`packages/fastapi-template`](packages/fastapi-template/README.md) is a FastAPI and Python API
  application with Uvicorn, AWS Lambda, and container targets.

The templates intentionally do not share application code. A derived repository can keep either
application, keep any combination, or add other workspace packages without changing the root
verification commands.

The four browser application templates install Grove through `@newjersey/njwds`. Their package
lifecycle scripts validate the installed distribution and generate an ignored
`public/assets/grove` directory before development, builds, production startup, and accessibility
tests. The Hono and FastAPI API templates have no Grove dependency.

The React applications use Trussworks components when their markup preserves Grove's documented
contract. They use React-owned Grove views for New Jersey-specific patterns and do not load USWDS
JavaScript.

## Installation

Use Node.js 26.7.0 and the pnpm version declared in `package.json`. The FastAPI package additionally
requires uv 0.11.2 or newer and Python 3.14; uv installs the pinned Python version when it is not
already available.

```bash
npm install --global pnpm@11.21.0
pnpm install --frozen-lockfile
```

All direct dependencies are exact versions. Add or update packages with pnpm's `--save-exact`
option, and commit the resulting `pnpm-lock.yaml`.

## Development

Run the application you are working on explicitly:

```bash
pnpm --filter @newjersey/nextjs-template dev
pnpm --filter @newjersey/astro-template dev
pnpm --filter @newjersey/astro-react-template dev
pnpm --filter @newjersey/vite-template dev
pnpm --filter @newjersey/hono-template dev
pnpm --filter @newjersey/fastapi-template dev
```

Each development server uses `http://localhost:3000`, so run one at a time unless you override a
framework's port.

Root commands verify every workspace package that implements the corresponding script:

```bash
pnpm format
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

`pnpm check` runs Biome plus every package's formatter check, linter, and type checker. Browser
accessibility tests run sequentially so package-local servers do not compete for a port.

## Containers

All package Dockerfiles use pinned multi-architecture image indexes and leave the target platform
to the builder. Add `--platform linux/amd64` to a build command when the deployment environment
requires an amd64 image.

Each application owns its Dockerfile. Build and run the Next.js production image:

```bash
docker build --file packages/nextjs-template/Dockerfile --target production --tag innovation-nextjs-template:local .
docker run --rm --publish 3000:3000 innovation-nextjs-template:local
```

Start the Next.js development container with its package-owned Compose file:

```bash
docker compose --file packages/nextjs-template/compose.yaml up --build
```

Build and run the Astro production image:

```bash
docker build --file packages/astro-template/Dockerfile --target production --tag innovation-astro-template:local .
docker run --rm --publish 3000:3000 innovation-astro-template:local
```

Start the Astro development container with its package-owned Compose file:

```bash
docker compose --file packages/astro-template/compose.yaml up --build
```

Build and run the Astro React production image:

```bash
docker build --file packages/astro-react-template/Dockerfile --target production --tag innovation-astro-react-template:local .
docker run --rm --publish 3000:3000 innovation-astro-react-template:local
```

Start the Astro React development container with its package-owned Compose file:

```bash
docker compose --file packages/astro-react-template/compose.yaml up --build
```

Build and run the Vite production image:

```bash
docker build --file packages/vite-template/Dockerfile --target production --tag innovation-vite-template:local .
docker run --rm --publish 3000:3000 innovation-vite-template:local
```

Start the Vite development container with its package-owned Compose file:

```bash
docker compose --file packages/vite-template/compose.yaml up --build
```

Build and run the Hono production image:

```bash
docker build --file packages/hono-template/Dockerfile --target production --tag innovation-hono-template:local .
docker run --rm --publish 3000:3000 innovation-hono-template:local
```

Start the Hono development container with its package-owned Compose file:

```bash
docker compose --file packages/hono-template/compose.yaml up --build
```

Build and run the FastAPI production image:

```bash
docker build --file packages/fastapi-template/Dockerfile --target production --tag innovation-fastapi-template:local .
docker run --rm --publish 3000:3000 innovation-fastapi-template:local
```

Start the FastAPI development container with its package-owned Compose file:

```bash
docker compose --file packages/fastapi-template/compose.yaml up --build
```

The Next.js image runs its standalone Node.js server. The Astro React image runs the Node compute
entrypoint generated for Amplify. The Astro and Vite images serve static output from unprivileged
nginx processes. The Hono image runs its bundled Node.js server as an unprivileged user. The
FastAPI image runs Uvicorn as an unprivileged user. The Vite nginx configuration falls back to
`index.html` for React Router application routes.

## Amplify

`amplify.yml` defines five monorepo application roots. Create one Amplify application for each
deployed package, connected to the same repository and branch:

| Application | `AMPLIFY_MONOREPO_APP_ROOT` | Artifact |
| --- | --- | --- |
| Next.js | `packages/nextjs-template` | `packages/nextjs-template/.next` |
| Astro | `packages/astro-template` | `packages/astro-template/dist` |
| Astro React | `packages/astro-react-template` | `packages/astro-react-template/.amplify-hosting` |
| Vite | `packages/vite-template` | `packages/vite-template/dist` |
| Hono | `packages/hono-template` | `packages/hono-template/.amplify-hosting` |

Each Amplify application selects its matching entry from the shared build specification. The
builds remain independent while using the same frozen workspace lockfile.

The Hono build emits a self-contained Amplify Hosting compute artifact. It runs the same bundled
Node server used by the package's production container.

The FastAPI package is deliberately absent from `amplify.yml`. Amplify can execute Python during a
build, but Amplify Hosting compute requires a Node.js entrypoint. Deploy FastAPI through Lambda or
containers; an Amplify-hosted frontend can consume that API separately.

The Vite application also requires Amplify's recommended single-page application 200 rewrite from
extensionless routes to `/index.html`. Configure that rule in the Vite Amplify application's
Hosting rewrite settings while excluding requests for files with extensions.

## Lambda

The Hono and FastAPI packages each build a Lambda-ready handler and artifact:

```bash
pnpm --filter @newjersey/hono-template build
pnpm --filter @newjersey/fastapi-template build
```

Hono's build produces `dist/lambda.mjs` (handler `lambda.handler`, Node.js 22 runtime). FastAPI's
build produces a `dist` directory (handler `fastapi_template.lambda_handler.handler`, Python 3.14
runtime) for a target architecture; pass `--architecture arm64` to build the `arm64` artifact
instead of the `x86_64` default. The Hono targets use the same `src/app.ts` route tree through
target-specific adapters. FastAPI uses one ASGI application for Uvicorn, Mangum, Lambda, and
containers.

This template does not include Lambda function infrastructure, API Gateway configuration, or
networking. A derived project's own infrastructure (CDK, SAM, Terraform, or another tool) owns the
Lambda function resource and whatever sits in front of it.

## AWS Deployment Notes

Available deployment shapes vary by project and account. This template supports, in any
combination:

- **Amplify Hosting** for the browser application packages and the Hono Node.js target.
- **AWS Lambda** for the Hono and FastAPI handlers, behind an API Gateway a project's
  infrastructure provisions.
- **Containers** (any of the six packages) on ECS Fargate or another container platform, behind an
  internal load balancer where one is required.

Some New Jersey Innovation Authority AWS accounts restrict API Gateway to private REST APIs only
(no edge-optimized or regional REST APIs, and no HTTP APIs) and do not permit public load
balancers. Confirm current account constraints before choosing a deployment shape, and encode them
in the project's own infrastructure rather than in this template.

## Using This Template

After creating a repository from this template:

1. Choose which application packages the project needs and remove unused examples.
2. Replace repository and application metadata in the root and retained package manifests.
3. Replace starter content in each retained package's `content/messages` directory.
4. Update `README.template.md` and rename it to `README.md` when project documentation is ready.
5. Update the supported release information in `SECURITY.md`.
6. Configure one Amplify application for each deployed package, provision Lambda infrastructure for
   a deployed handler, or run a package's production container.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the repository's development
and review standards.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Acknowledgements

Credit goes to [Sanni](https://github.com/sannidhishukla) for starting the conversation
that led to these templates.

## Disclaimer

This project utilizes certain tools and technologies for development purposes. The inclusion of
these tools does not imply endorsement or recommendation. Users are encouraged to evaluate their
suitability.
