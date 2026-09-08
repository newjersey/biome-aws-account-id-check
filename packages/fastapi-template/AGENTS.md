# FastAPI Template

This package is a FastAPI and Python template for Uvicorn, AWS Lambda, and containers. Read
`README.md` for its route, runtime, test, build, Lambda, and container contracts. Run all commands
from the repository root.

## Application Structure

- Keep the FastAPI application in `src/fastapi_template/app.py` independent of its server.
- Keep the Mangum AWS Lambda adapter in `src/fastapi_template/lambda_handler.py`.
- Keep process environment access and validation in `src/fastapi_template/config.py`.
- Build Lambda and container artifacts from the same application.
- Keep HTML responses semantic, responsive, and accessible without requiring client JavaScript.
- Return JSON for API errors and operational endpoints.

## Python Tooling

- Manage Python, application dependencies, Ruff, ty, and test dependencies with uv.
- Keep direct Python dependencies exact and commit `uv.lock`.
- Run Python commands with `uv run --locked`.
- Use Ruff for Python formatting and linting.
- Use ty with all diagnostics treated as errors for static type checking.

## Testing

- Add `pytest` contract coverage for every route and environment boundary.
- Test both the direct FastAPI application and the Mangum Lambda adapter.
- Add Playwright production-server coverage for rendered pages, endpoint behavior, responsive
  layout, color schemes, and axe scans.
- Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` before review.
- `pnpm test` also reports statement and branch coverage for `src/fastapi_template` and `scripts`;
  keep it at 100% but do not add an enforced coverage threshold.
