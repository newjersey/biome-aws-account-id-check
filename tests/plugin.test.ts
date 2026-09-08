import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { casesFor } from "./support/cases.ts";
import { type PluginLanguage, type PluginSeverity, runPluginFixture } from "./support/runBiome.ts";

const LANGUAGES: readonly PluginLanguage[] = ["javascript", "json", "css"];
const SEVERITIES: readonly PluginSeverity[] = ["warn", "error"];

for (const language of LANGUAGES) {
  describe(`${language} plugin`, () => {
    for (const severity of SEVERITIES) {
      describe(`${severity} severity`, () => {
        for (const fixtureCase of casesFor(language)) {
          test(fixtureCase.name, () => {
            const result = runPluginFixture({
              severity,
              language,
              fileName: fixtureCase.fileName,
              content: fixtureCase.content,
            });

            assert.equal(result.diagnostics.length, fixtureCase.expectedMatchCount);

            const expectedSeverity = severity === "warn" ? "warning" : "error";
            for (const diagnostic of result.diagnostics) {
              assert.equal(diagnostic.severity, expectedSeverity);
            }

            const shouldFailLint = severity === "error" && fixtureCase.expectedMatchCount > 0;
            assert.equal(result.exitCode, shouldFailLint ? 1 : 0);
          });
        }
      });
    }
  });
}
