# Hono API Template

This package is the template's Hono application for APIs and small server-rendered responses. One
shared Fetch API application builds into three production targets:

- a Node.js server for local development and containers;
- an Amplify Hosting compute artifact; and
- an AWS Lambda handler through Hono's AWS Lambda adapter.

## Routes

- `GET /` returns a minimal accessible HTML page with "Hello, New Jersey." centered in the viewport.
  It uses the requested Public Sans-based font stack and follows the browser's light or dark color
  preference.
- `GET /health` returns deterministic, uncached JSON for deployment health checks.
- Unmatched routes return a JSON `404` response.

## Structure

- `src/app.ts` defines the shared Hono application and public response contracts.
- `src/server.ts` connects the Fetch API application to the Node.js HTTP server.
- `src/lambda.ts` connects the same application to Hono's AWS Lambda adapter.
- `src/config.ts` validates the Node server's `HOST` and `PORT` environment variables.
- `scripts/build.ts` bundles the Node and Lambda entrypoints and assembles `.amplify-hosting`.
- `tests/accessibility` verifies the bundled Node production server at mobile, tablet, and desktop
  viewport sizes.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/hono-template dev
pnpm --filter @newjersey/hono-template test:watch
pnpm --filter @newjersey/hono-template preview
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

The development and production Node servers listen on port `3000` by default. Set `HOST` or `PORT`
to override their listener configuration.

## Build Artifacts

`pnpm --filter @newjersey/hono-template build` creates:

- `dist/server.mjs`, the bundled Node server used by `start` and the production container;
- `dist/lambda.mjs`, the bundled Lambda handler; and
- `.amplify-hosting`, the self-contained Amplify Hosting compute deployment.

The route definitions remain in `src/app.ts`. Deployment adapters do not duplicate application
behavior.

## Amplify Hosting

Create an Amplify application with `AMPLIFY_MONOREPO_APP_ROOT` set to
`packages/hono-template`. The root `amplify.yml` selects the package build and publishes
`.amplify-hosting`.

The generated deployment manifest routes every request to `compute/default/server.mjs`. The bundle
starts the Node server on port `3000`, as required by Amplify Hosting compute.

## AWS Lambda

`dist/lambda.mjs` is the deployable Lambda artifact: `lambda.handler` is its handler, targeting the
Node.js 22 runtime. A project's own infrastructure (CDK, SAM, Terraform, or another tool) owns the
Lambda function resource, its architecture and runtime configuration, and the API Gateway, load
balancer, or other integration in front of it.

## Containers

Build and run the production container from the repository root:

```bash
docker build --file packages/hono-template/Dockerfile --target production --tag innovation-hono-template:local .
docker run --rm --publish 3000:3000 innovation-hono-template:local
```

Start its bind-mounted development container with the package-owned Compose file:

```bash
docker compose --file packages/hono-template/compose.yaml up --build
```

The production container copies only `dist/server.mjs`, runs as UID 1001, and exposes the same Node
artifact exercised by the accessibility suite and packaged for Amplify Hosting. The Dockerfile uses
multi-architecture image indexes and does not force a platform; build with
`--platform linux/amd64` when the deployment environment requires an amd64 image. This container
also runs on ECS Fargate or another container platform.
