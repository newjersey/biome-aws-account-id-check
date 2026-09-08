/**
 * Verifies Node listener environment validation.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import { getServerConfig } from "@/src/config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getServerConfig", () => {
  it("uses production-friendly defaults", () => {
    vi.stubEnv("HOST", undefined);
    vi.stubEnv("PORT", undefined);

    expect(getServerConfig()).toEqual({
      hostname: "0.0.0.0",
      port: 3000,
    });
  });

  it("accepts configured listener values", () => {
    vi.stubEnv("HOST", "127.0.0.1");
    vi.stubEnv("PORT", "4100");

    expect(getServerConfig()).toEqual({
      hostname: "127.0.0.1",
      port: 4100,
    });
  });

  it.each(["0", "65536", "3000.5", "not-a-port"])("rejects invalid port %s", (port) => {
    vi.stubEnv("PORT", port);

    expect(() => getServerConfig()).toThrow("PORT must be an integer from 1 through 65535.");
  });
});
