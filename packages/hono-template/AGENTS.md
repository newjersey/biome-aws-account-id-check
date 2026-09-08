# Hono API Template

This package is a Hono and TypeScript API template for Node.js and AWS Lambda. Read `README.md` for
its route, runtime, test, build, Amplify, Lambda, and container contracts. Run all commands from the
repository root.

## Application Structure

- Keep the Fetch API application in `src/app.ts` independent of the Node.js listener.
- Keep the AWS Lambda adapter in `src/lambda.ts` independent of the shared application.
- Keep process environment access and validation in `src/config.ts`.
- Build container, Amplify Hosting, and Lambda artifacts from the same route tree.
- Add routes through Hono and return standards-based `Response` objects.
- Keep HTML responses semantic, responsive, and accessible without requiring client JavaScript.
- Return JSON for API errors and operational endpoints.

## Testing

- Add Vitest contract coverage for every route and environment boundary.
- Test both the direct Fetch API application and the Lambda adapter.
- Validate deployment manifests with structured parsers.
- Add Playwright production-server coverage for rendered pages, endpoint behavior, responsive
  layout, color schemes, and axe scans.
- Keep tests deterministic and assert observable response or browser behavior.
- Run `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:accessibility` before review.
