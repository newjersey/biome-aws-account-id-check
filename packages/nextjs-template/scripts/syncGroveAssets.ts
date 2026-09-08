import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  type GroveAssetLogger,
  type LogInfo,
  type RequiredGroveAsset,
  resolveGroveDistributionDirectory,
  syncGroveAssets,
} from "./groveAssetSync";

/**
 * Node.js resolver scoped to this application package.
 */
const PACKAGE_REQUIRE = createRequire(import.meta.url);

/**
 * Root directory of the full-stack application package.
 */
const PACKAGE_ROOT_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Installed Grove distribution supplied by `@newjersey/njwds`.
 */
const GROVE_SOURCE_DIRECTORY = resolveGroveDistributionDirectory({
  resolvePackagePath: (specifier) => PACKAGE_REQUIRE.resolve(specifier),
});

/**
 * Generated public directory served by Next.js.
 */
const GROVE_TARGET_DIRECTORY = path.join(
  PACKAGE_ROOT_DIRECTORY,
  "public",
  "assets",
  "grove",
  "dist",
);

/**
 * Assets used directly by the application shell and example page.
 */
const REQUIRED_GROVE_ASSETS: readonly RequiredGroveAsset[] = [
  { relativePath: "css/styles.css", description: "Grove compiled stylesheet" },
  { relativePath: "img/sprite.svg", description: "Grove icon sprite" },
  { relativePath: "img/nj_state_seal.png", description: "Official Site Banner seal" },
  { relativePath: "img/nj-logo-gray-20.png", description: "New Jersey logo" },
  { relativePath: "img/logo-img.png", description: "Grove agency footer logo" },
  { relativePath: "img/hero.webp", description: "Grove landing-page hero image" },
  { relativePath: "img/circle-124.png", description: "Grove graphic-list image" },
];

/**
 * Writes an informational script message to standard output.
 *
 * @param params Log input.
 * @param params.message Message to write.
 */
const writeInfo: LogInfo = ({ message }) => {
  process.stdout.write(`${message}\n`);
};

/**
 * Creates the process-backed script logger.
 *
 * @returns The logger used by the command-line entry point.
 */
const createLogger = (): GroveAssetLogger => {
  return { info: writeInfo };
};

/**
 * Runs Grove asset synchronization and reports boundary failures.
 *
 * @returns A promise that resolves after synchronization finishes.
 */
const main = async (): Promise<void> => {
  try {
    await syncGroveAssets({
      sourceDirectory: GROVE_SOURCE_DIRECTORY,
      targetDirectory: GROVE_TARGET_DIRECTORY,
      requiredAssets: REQUIRED_GROVE_ASSETS,
      logger: createLogger(),
    });
  } catch (error) {
    const cause = error instanceof Error ? (error.stack ?? error.message) : String(error);
    process.stderr.write(`Failed to synchronize Grove assets.\n${cause}\n`);
    process.exitCode = 1;
  }
};

await main();
