# syntax=docker/dockerfile:1.18

FROM node:26.7.0-bookworm-slim@sha256:cd565714d4da3e84bfd341e31448f81d47c6362198f152345297c9c1154e6341 AS base

ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /workspace

RUN npm install --global pnpm@11.21.0

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/nextjs-template/package.json packages/nextjs-template/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter . --filter @newjersey/nextjs-template... --frozen-lockfile --store-dir=/pnpm/store

FROM dependencies AS development

COPY packages/nextjs-template packages/nextjs-template

WORKDIR /workspace/packages/nextjs-template
EXPOSE 3000
CMD ["pnpm", "dev", "--hostname", "0.0.0.0"]

FROM dependencies AS builder

COPY packages/nextjs-template packages/nextjs-template

RUN pnpm --filter @newjersey/nextjs-template build

FROM base AS production

ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /workspace/packages/nextjs-template/public ./packages/nextjs-template/public
COPY --from=builder --chown=nextjs:nodejs /workspace/packages/nextjs-template/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/packages/nextjs-template/.next/static ./packages/nextjs-template/.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "packages/nextjs-template/server.js"]
