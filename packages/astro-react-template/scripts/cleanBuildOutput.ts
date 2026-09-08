/**
 * Removes the adapter artifact before a production build.
 */

import { rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const buildOutputPath = fileURLToPath(new URL("../.amplify-hosting", import.meta.url));

await rm(buildOutputPath, { force: true, recursive: true });
