import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import {
  type GroveAssetLogger,
  type RequiredGroveAsset,
  resolveGroveDistributionDirectory,
  syncGroveAssets,
} from "./groveAssetSync";

/**
 * Required asset used by the isolated filesystem tests.
 */
const REQUIRED_ASSETS: readonly RequiredGroveAsset[] = [
  { relativePath: "css/styles.css", description: "test stylesheet" },
];

/**
 * Logger used when test assertions do not require output inspection.
 */
const DISCARD_LOGGER: GroveAssetLogger = {
  info: () => undefined,
};

/**
 * Verifies Grove distribution resolution follows the installed package location.
 */
const verifyDistributionResolution = () => {
  const packageJsonPath = path.join(
    "/workspace",
    "node_modules",
    "@newjersey",
    "njwds",
    "package.json",
  );
  let requestedSpecifier = "";

  const distributionDirectory = resolveGroveDistributionDirectory({
    resolvePackagePath: (specifier) => {
      requestedSpecifier = specifier;
      return packageJsonPath;
    },
  });

  expect(requestedSpecifier).toBe("@newjersey/njwds/package.json");
  expect(distributionDirectory).toBe(
    path.join("/workspace", "node_modules", "@newjersey", "njwds", "dist"),
  );
};

/**
 * Creates a complete source distribution for one filesystem test.
 *
 * @param sourceDirectory Source directory to populate.
 * @returns A promise that resolves after the fixture is written.
 */
const createSourceDistribution = async (sourceDirectory: string): Promise<void> => {
  await mkdir(path.join(sourceDirectory, "css"), { recursive: true });
  await writeFile(path.join(sourceDirectory, "css", "styles.css"), "new styles");
};

/**
 * Verifies synchronization replaces stale files with a complete source copy.
 */
const verifyDirectoryReplacement = async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "grove-sync-"));
  const sourceDirectory = path.join(temporaryDirectory, "source");
  const targetDirectory = path.join(temporaryDirectory, "target");

  try {
    await createSourceDistribution(sourceDirectory);
    await mkdir(targetDirectory, { recursive: true });
    await writeFile(path.join(targetDirectory, "stale.txt"), "stale");

    await syncGroveAssets({
      sourceDirectory,
      targetDirectory,
      requiredAssets: REQUIRED_ASSETS,
      logger: DISCARD_LOGGER,
    });

    await expect(readFile(path.join(targetDirectory, "css", "styles.css"), "utf8")).resolves.toBe(
      "new styles",
    );
    await expect(access(path.join(targetDirectory, "stale.txt"))).rejects.toThrow();
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
};

/**
 * Verifies validation preserves public assets when the installed source is incomplete.
 */
const verifyRequiredAssetValidation = async () => {
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "grove-sync-"));
  const sourceDirectory = path.join(temporaryDirectory, "source");
  const targetDirectory = path.join(temporaryDirectory, "target");

  try {
    await mkdir(sourceDirectory, { recursive: true });
    await mkdir(targetDirectory, { recursive: true });
    await writeFile(path.join(targetDirectory, "existing.txt"), "existing");

    await expect(
      syncGroveAssets({
        sourceDirectory,
        targetDirectory,
        requiredAssets: REQUIRED_ASSETS,
        logger: DISCARD_LOGGER,
      }),
    ).rejects.toThrow("Missing test stylesheet");
    await expect(readFile(path.join(targetDirectory, "existing.txt"), "utf8")).resolves.toBe(
      "existing",
    );
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true });
  }
};

/**
 * Registers the Grove asset synchronization tests.
 */
const defineGroveAssetSyncTests = () => {
  test(
    "resolves the distribution from the installed package location",
    verifyDistributionResolution,
  );
  test("replaces stale public assets", verifyDirectoryReplacement);
  test(
    "preserves public assets when the installed distribution is incomplete",
    verifyRequiredAssetValidation,
  );
};

describe("syncGroveAssets", defineGroveAssetSyncTests);
