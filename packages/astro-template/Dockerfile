# syntax=docker/dockerfile:1.18

FROM node:26.7.0-bookworm-slim@sha256:cd565714d4da3e84bfd341e31448f81d47c6362198f152345297c9c1154e6341 AS base

ENV HUSKY=0
WORKDIR /workspace

RUN npm install --global pnpm@11.21.0

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/astro-template/package.json packages/astro-template/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter . --filter @newjersey/astro-template... --frozen-lockfile --store-dir=/pnpm/store

FROM dependencies AS development

COPY packages/astro-template packages/astro-template

WORKDIR /workspace/packages/astro-template
EXPOSE 3000
CMD ["pnpm", "dev", "--host", "0.0.0.0"]

FROM dependencies AS builder

COPY packages/astro-template packages/astro-template

RUN pnpm --filter @newjersey/astro-template build

FROM nginxinc/nginx-unprivileged:1.29.1-alpine@sha256:27985295bdb22a1ef8f712863210bd5877c0f3006494a593e86b3fe0fa55467e AS production

COPY packages/astro-template/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=101:101 /workspace/packages/astro-template/dist /usr/share/nginx/html

EXPOSE 3000
