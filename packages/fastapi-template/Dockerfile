# syntax=docker/dockerfile:1.18

FROM ghcr.io/astral-sh/uv:0.12.5@sha256:e85be844203885286c60ffad8a858d48afb6c5a5c237ca0e67f12e74b8f174b1 AS uv

FROM python:3.14.7-slim-bookworm@sha256:23c59390fc717bf09f9336908199a0ae75d9c4264bf296123f94ad772fea3b52 AS base

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
WORKDIR /workspace/packages/fastapi-template

COPY --from=uv /uv /uvx /bin/
COPY packages/fastapi-template/pyproject.toml packages/fastapi-template/uv.lock ./

FROM base AS dependencies

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --locked --no-install-project

FROM dependencies AS development

COPY packages/fastapi-template ./

EXPOSE 3000
CMD ["uv", "run", "--locked", "uvicorn", "fastapi_template.app:app", "--host", "0.0.0.0", "--port", "3000", "--reload"]

FROM base AS production-dependencies

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --locked --no-dev --no-install-project

FROM production-dependencies AS production

ENV HOST=0.0.0.0
ENV PATH="/workspace/packages/fastapi-template/.venv/bin:$PATH"
ENV PORT=3000
ENV PYTHONPATH="/workspace/packages/fastapi-template/src"

COPY packages/fastapi-template/src ./src
COPY packages/fastapi-template/README.md ./

RUN groupadd --system --gid 1001 python \
  && useradd --system --uid 1001 --gid python fastapi \
  && chown --recursive fastapi:python /workspace/packages/fastapi-template

USER fastapi
EXPOSE 3000
CMD ["python", "-m", "fastapi_template.server"]
