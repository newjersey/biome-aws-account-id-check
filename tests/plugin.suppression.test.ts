import assert from "node:assert/strict";
import { test } from "node:test";
import { runPluginFixture } from "./support/runBiome.ts";

test("a suppression comment silences one line without silencing the next", () => {
  const content = [
    "// biome-ignore lint/plugin/aws-account-id: test fixture",
    'export const suppressed = "123456789012";',
    'export const unsuppressed = "987654321098";',
    "",
  ].join("\n");

  const result = runPluginFixture({
    severity: "error",
    language: "javascript",
    fileName: "suppression.ts",
    content,
  });

  assert.equal(result.diagnostics.length, 1);
  assert.equal(result.exitCode, 1);
});
