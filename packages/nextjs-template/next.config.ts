import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const MONOREPO_ROOT_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: MONOREPO_ROOT_DIRECTORY,
  turbopack: {
    root: MONOREPO_ROOT_DIRECTORY,
  },
};

export default withNextIntl(nextConfig);
