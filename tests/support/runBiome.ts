import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export type PluginSeverity = "warn" | "error";
export type PluginLanguage = "javascript" | "json" | "css";

/** A single plugin-category diagnostic reported by the Biome CLI. */
export interface PluginDiagnostic {
  readonly severity: "warning" | "error";
  readonly message: string;
}

/** The outcome of linting one fixture file with one plugin variant. */
export interface PluginRunResult {
  readonly exitCode: number;
  readonly diagnostics: readonly PluginDiagnostic[];
}

/** Inputs for {@link runPluginFixture}. */
export interface RunPluginFixtureOptions {
  readonly severity: PluginSeverity;
  readonly language: PluginLanguage;
  readonly fileName: string;
  readonly content: string;
}

interface BiomeJsonDiagnostic {
  readonly severity: string;
  readonly message: string;
  readonly category: string;
}

interface BiomeJsonReport {
  readonly diagnostics: readonly BiomeJsonDiagnostic[];
}

const REPO_ROOT = process.cwd();
const BIOME_BINARY_PATH = join(REPO_ROOT, "node_modules", ".bin", "biome");

/** Resolves the `.grit` file for one severity/language combination. */
function resolvePluginPath(
  options: Pick<RunPluginFixtureOptions, "severity" | "language">,
): string {
  return join(REPO_ROOT, "plugins", options.severity, options.language, "aws-account-id.grit");
}

/** Writes an isolated `biome.json` that registers exactly one plugin variant. */
function writeIsolatedConfig(directory: string, pluginPath: string): void {
  const config = {
    linter: {
      enabled: true,
      rules: { preset: "none" },
    },
    plugins: [pluginPath],
  };
  writeFileSync(join(directory, "biome.json"), JSON.stringify(config));
}

/**
 * Runs one AWS account ID plugin variant against one fixture file in an
 * isolated temporary directory, and returns the plugin-category diagnostics
 * the Biome CLI reported plus the process exit code.
 */
export function runPluginFixture(options: RunPluginFixtureOptions): PluginRunResult {
  const tempDirectory = mkdtempSync(join(tmpdir(), "biome-aws-account-id-check-"));

  try {
    const fixturePath = join(tempDirectory, options.fileName);
    writeFileSync(fixturePath, options.content);
    writeIsolatedConfig(tempDirectory, resolvePluginPath(options));

    const result = spawnSync(
      BIOME_BINARY_PATH,
      ["lint", "--reporter=json", "--config-path", tempDirectory, fixturePath],
      { encoding: "utf8" },
    );

    const report = JSON.parse(result.stdout) as BiomeJsonReport;
    const diagnostics = report.diagnostics
      .filter((diagnostic) => diagnostic.category === "plugin")
      .map(
        (diagnostic): PluginDiagnostic => ({
          severity: diagnostic.severity as PluginDiagnostic["severity"],
          message: diagnostic.message,
        }),
      );

    return {
      exitCode: result.status ?? 1,
      diagnostics,
    };
  } finally {
    rmSync(tempDirectory, { recursive: true, force: true });
  }
}
