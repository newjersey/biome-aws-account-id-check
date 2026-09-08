import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { build } from "esbuild";

import packageManifest from "@/package.json" with { type: "json" };
import { createAmplifyDeploymentManifest } from "@/scripts/amplifyManifest";

interface BundleParams {
  readonly entryPoint: string;
  readonly outfile: string;
}

const PACKAGE_ROOT = path.join(import.meta.dirname, "..");
const DIST_DIRECTORY = path.join(PACKAGE_ROOT, "dist");
const AMPLIFY_DIRECTORY = path.join(PACKAGE_ROOT, ".amplify-hosting");
const AMPLIFY_COMPUTE_DIRECTORY = path.join(AMPLIFY_DIRECTORY, "compute", "default");
const AMPLIFY_STATIC_DIRECTORY = path.join(AMPLIFY_DIRECTORY, "static");
const SERVER_BUNDLE = path.join(DIST_DIRECTORY, "server.mjs");
const LAMBDA_BUNDLE = path.join(DIST_DIRECTORY, "lambda.mjs");

const bundle = async ({ entryPoint, outfile }: BundleParams): Promise<void> => {
  await build({
    bundle: true,
    entryPoints: [path.join(PACKAGE_ROOT, entryPoint)],
    format: "esm",
    minify: true,
    outfile,
    platform: "node",
    target: "node22",
  });
};

await Promise.all([
  rm(DIST_DIRECTORY, { force: true, recursive: true }),
  rm(AMPLIFY_DIRECTORY, { force: true, recursive: true }),
]);
await mkdir(DIST_DIRECTORY, { recursive: true });
await Promise.all([
  bundle({
    entryPoint: "src/server.ts",
    outfile: SERVER_BUNDLE,
  }),
  bundle({
    entryPoint: "src/lambda.ts",
    outfile: LAMBDA_BUNDLE,
  }),
]);
await Promise.all([
  mkdir(AMPLIFY_COMPUTE_DIRECTORY, { recursive: true }),
  mkdir(AMPLIFY_STATIC_DIRECTORY, { recursive: true }),
]);
await copyFile(SERVER_BUNDLE, path.join(AMPLIFY_COMPUTE_DIRECTORY, "server.mjs"));
await writeFile(
  path.join(AMPLIFY_DIRECTORY, "deploy-manifest.json"),
  `${JSON.stringify(
    createAmplifyDeploymentManifest({
      frameworkVersion: packageManifest.dependencies.hono,
    }),
    null,
    2,
  )}\n`,
  "utf8",
);
