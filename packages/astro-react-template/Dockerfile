# syntax=docker/dockerfile:1.18

FROM node:26.7.0-bookworm-slim@sha256:cd565714d4da3e84bfd341e31448f81d47c6362198f152345297c9c1154e6341 AS base

ENV HUSKY=0
WORKDIR /workspace

RUN npm install --global pnpm@11.21.0

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/astro-react-template/package.json packages/astro-react-template/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter . --filter @newjersey/astro-react-template... --frozen-lockfile --store-dir=/pnpm/store

FROM dependencies AS development

COPY packages/astro-react-template packages/astro-react-template

WORKDIR /workspace/packages/astro-react-template
EXPOSE 3000
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM dependencies AS builder

COPY packages/astro-react-template packages/astro-react-template

RUN pnpm --filter @newjersey/astro-react-template build

FROM node:26.7.0-bookworm-slim@sha256:cd565714d4da3e84bfd341e31448f81d47c6362198f152345297c9c1154e6341 AS production

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs astro

COPY --from=builder --chown=astro:nodejs /workspace/packages/astro-react-template/.amplify-hosting ./.amplify-hosting

USER astro
EXPOSE 3000
CMD ["node", ".amplify-hosting/compute/default/entry.mjs"]
