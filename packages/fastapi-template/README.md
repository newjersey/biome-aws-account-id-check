# FastAPI Template

This package is the template's FastAPI application for APIs and small server-rendered responses.
One shared ASGI application supports:

- a Uvicorn server for local development and containers; and
- an AWS Lambda handler through Mangum.

Amplify Hosting can build this pnpm monorepo, but its compute runtime requires a Node.js
entrypoint. Deploy this Python application through Lambda or a container instead of as an Amplify
Hosting compute artifact.

## Routes

- `GET /` returns a minimal accessible HTML page with "Hello, New Jersey." centered in the viewport.
- `GET /health` returns deterministic, uncached JSON for deployment health checks.
- Unmatched routes return a JSON `404` response.

## Structure

- `src/fastapi_template/app.py` defines the shared FastAPI application and response contracts.
- `src/fastapi_template/server.py` runs the application through Uvicorn.
- `src/fastapi_template/lambda_handler.py` connects the application to Mangum.
- `src/fastapi_template/config.py` validates `HOST` and `PORT`.
- `scripts/build.py` creates a self-contained manylinux Lambda artifact in `dist` for a chosen
  architecture.

## Commands

Run commands from the repository root:

```bash
pnpm --filter @newjersey/fastapi-template dev
pnpm --filter @newjersey/fastapi-template test
pnpm --filter @newjersey/fastapi-template typecheck
pnpm --filter @newjersey/fastapi-template preview
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

The server listens on port `3000` by default. Set `HOST` or `PORT` to override its configuration.
uv owns Python dependencies, Ruff, ty, and the local virtual environment. pnpm owns workspace
orchestration and Node-based tools such as Playwright.

`pnpm --filter @newjersey/fastapi-template test` runs pytest and reports statement and branch
coverage for `src/fastapi_template` and `scripts`. Coverage is informational only; no command
enforces a minimum threshold. Open the generated, ignored
`packages/fastapi-template/coverage/html/index.html` report for a browsable breakdown.

## Lambda

`pnpm --filter @newjersey/fastapi-template build` exports production dependencies from `uv.lock`,
installs Python 3.14 manylinux wheels into `dist` for the target architecture, and copies the
application package. This prevents local platform packages from leaking into the Lambda artifact.

`build` targets the `x86_64` architecture by default. Pass `--architecture arm64` to build the
`arm64` artifact instead:

```bash
pnpm --filter @newjersey/fastapi-template build --architecture arm64
```

`dist` is the deployable Lambda artifact: `fastapi_template.lambda_handler.handler` is its handler
and `dist` its code root. A project's own infrastructure (CDK, SAM, Terraform, or another tool)
owns the Lambda function resource, its runtime configuration, and the API Gateway, load balancer,
or other integration in front of it.

## Containers

Build and run the production image:

```bash
docker build --file packages/fastapi-template/Dockerfile --target production --tag innovation-fastapi-template:local .
docker run --rm --publish 3000:3000 innovation-fastapi-template:local
```

Start the bind-mounted development container:

```bash
docker compose --file packages/fastapi-template/compose.yaml up --build
```

The Dockerfile uses multi-architecture image indexes and does not force a platform. Build with
`--platform linux/amd64` when the deployment environment requires an amd64 image. This container
also runs on ECS Fargate or another container platform.
