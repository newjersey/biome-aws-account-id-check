# biome-aws-account-id-check

A [Biome](https://biomejs.dev) [GritQL linter plugin](https://biomejs.dev/linter/plugins/) that
flags 12-digit AWS account IDs in JavaScript, TypeScript, JSX, TSX, JSON, JSONC, and CSS source.

## Why

AWS account IDs are always exactly 12 digits. They are not secret, but committing them to source
control makes it easy to accidentally couple code to one account, leak account structure in public
repositories, or paste the wrong environment's ID into a script. This plugin catches them before
they land in a commit.

## Scope and limitations

Biome's GritQL plugin engine can only analyze the syntax trees it parses: JavaScript, TypeScript,
JSX, TSX, JSON, JSONC, and CSS. It **cannot** scan Markdown, YAML, Terraform, Python, `.env` files,
or any other file type — Biome plugins do not have a "plain text" mode. If your AWS account IDs
live in Terraform state, CloudFormation templates, or documentation, this plugin will not see them.

Within the supported file types, the plugin flags:

- JavaScript/TypeScript/JSX/TSX: string literals, JSX attribute string values, and numeric
  literals.
- JSON/JSONC: string values and number values.
- CSS: string literals (for example, a `content` declaration value).

Detection matches an exact run of 12 digits bounded by a non-word character (or the start/end of
the literal). This means:

- `"123456789012"` matches.
- `"012345678901"` matches — a leading zero is still 12 digits.
- `"arn:aws:iam::123456789012:role/Example"` matches — the colons on either side of the ID are
  non-word boundaries.
- `"12345678901"` (11 digits) and `"1234567890123"` (13 digits) do **not** match.
- `"id_123456789012"` does **not** match, because `_` is a word character and does not create a
  boundary immediately before the digit run. Separate an embedded ID with a non-word character
  (such as `-`, `:`, or a space) for the plugin to catch it.

The plugin cannot know whether a matched value is a real AWS account ID or an unrelated 12-digit
number (an order number, a phone number, a serial number). Treat diagnostics as a prompt to check,
not as proof of a leak, and use suppression comments (below) for confirmed false positives.

## Installation

```bash
npm install --save-dev biome-aws-account-id-check
```

## Usage

Biome does not let a consuming `biome.json` override a plugin diagnostic's severity, so this
package ships two behaviorally identical variants of each language plugin. Choose the paths that
match the severity you want:

```jsonc
// biome.json
{
  "plugins": [
    "./node_modules/biome-aws-account-id-check/plugins/warn/javascript/aws-account-id.grit",
    "./node_modules/biome-aws-account-id-check/plugins/warn/json/aws-account-id.grit",
    "./node_modules/biome-aws-account-id-check/plugins/warn/css/aws-account-id.grit",
  ],
}
```

To fail CI instead of warning, register the `error` variants instead:

```jsonc
// biome.json
{
  "plugins": [
    "./node_modules/biome-aws-account-id-check/plugins/error/javascript/aws-account-id.grit",
    "./node_modules/biome-aws-account-id-check/plugins/error/json/aws-account-id.grit",
    "./node_modules/biome-aws-account-id-check/plugins/error/css/aws-account-id.grit",
  ],
}
```

You do not have to register all three languages. Omit whichever `.grit` file does not apply to
your project.

### Restricting which files the plugin runs on

Biome lets you scope a plugin with an `includes` list. Because `includes` matches against the full
file path, exclusion patterns need a `**/` prefix to match a directory at any depth:

```jsonc
// biome.json
{
  "plugins": [
    {
      "path": "./node_modules/biome-aws-account-id-check/plugins/error/javascript/aws-account-id.grit",
      "includes": ["**", "!**/fixtures/**", "!**/*.test.ts"],
    },
  ],
}
```

### Suppressing a diagnostic

Biome's plugin name is a `.grit` file's base name without the extension. Every variant in this
package uses the same base name, `aws-account-id`, so the same suppression comment works
regardless of which severity or language variant a project registers:

```ts
// biome-ignore lint/plugin/aws-account-id: this is a fixture value, not a real account ID
const exampleAccountId = "123456789012";
```

See Biome's [suppression documentation](https://biomejs.dev/analyzer/suppressions/) for top-level
and range suppression forms.

## Development

Use the Node.js version in `.nvmrc` and the pnpm version pinned in `package.json`:

```bash
npm install --global pnpm@11.21.0
pnpm install --frozen-lockfile
```

```bash
pnpm format
pnpm lint
pnpm check
pnpm test
```

`pnpm test` runs the Node.js built-in test runner (`node --test tests/`). Each test spawns the real
`biome` CLI against a fixture file in an isolated temporary directory and inspects the JSON
reporter output — there is no mocking of Biome itself. See `tests/support/cases.ts` for the
boundary cases (exact match, leading zero, 11-digit and 13-digit non-matches, and embedded IDs)
covered for every language and severity.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the repository's development
and review standards.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Disclaimer

This project utilizes certain tools and technologies for development purposes. The inclusion of
these tools does not imply endorsement or recommendation. Users are encouraged to evaluate their
suitability.
