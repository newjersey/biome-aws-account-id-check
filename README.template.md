# Project Name

Describe the public service, its users, and the outcome this application supports.

## Architecture

This project is a pnpm monorepo. Document the retained application packages, their frameworks,
external systems, data stores, and operational requirements here.

## Installation

Install the Node.js version in `.nvmrc`, the pnpm version in `package.json`, and uv when retaining a
Python package:

```bash
npm install --global pnpm@11.21.0
pnpm install --frozen-lockfile
```

## Development

Run the selected application package explicitly:

```bash
pnpm --filter <application-package-name> dev
```

Document its local URL and required environment variables here.

## Verification

```bash
pnpm check
pnpm test
pnpm build
pnpm test:accessibility
```

## Deployment

Describe the selected deployment environment here. Each deployed Amplify package requires an
application whose `AMPLIFY_MONOREPO_APP_ROOT` matches its entry in `amplify.yml`. Deploy the Hono
and FastAPI packages through Lambda (with a project-owned infrastructure stack) or a container
platform such as ECS Fargate; Amplify Hosting compute requires a Node.js entrypoint, so Python
server packages cannot deploy there. Document the project's actual AWS constraints (API Gateway
type, load balancer availability, and account guardrails) here.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for development, review, and
commit requirements.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Contact

Name the team responsible for this project and provide its supported contact channel.

To learn about working with the New Jersey Innovation Authority, visit
[innovation.nj.gov/join](https://innovation.nj.gov/join.html).

## Disclaimer

This project utilizes certain tools and technologies for development purposes. The inclusion of
these tools does not imply endorsement or recommendation. Users are encouraged to evaluate the
suitability of these tools for their own use.
