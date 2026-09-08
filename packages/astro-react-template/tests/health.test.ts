/**
 * Verifies the public server health contract.
 */

import { describe, expect, it } from "vitest";

import { GET } from "@/src/pages/api/health";

describe("GET /api/health", () => {
  it("returns deterministic uncached service health", async () => {
    const response = await GET({} as Parameters<typeof GET>[0]);

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      service: "@newjersey/astro-react-template",
    });
  });
});
