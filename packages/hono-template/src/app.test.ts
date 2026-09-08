/**
 * Verifies the public Hono route contracts.
 */

import { describe, expect, it } from "vitest";

import { app } from "@/src/app";

describe("GET /", () => {
  it("returns the centered New Jersey homepage", async () => {
    const response = await app.request("/");
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/html; charset=UTF-8");
    expect(html).toContain('<html lang="en-US">');
    expect(html).toContain("<h1>Hello, New Jersey.</h1>");
    expect(html).toContain("place-items: center");
    expect(html).toContain('"Public Sans Web", -apple-system, BlinkMacSystemFont');
    expect(html).toContain("color: #112f4e");
    expect(html).toContain("background: #ffffff");
    expect(html).toContain("@media (prefers-color-scheme: dark)");
  });
});

describe("HEAD /", () => {
  it("supports command-line header checks", async () => {
    const response = await app.request("/", {
      method: "HEAD",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/html; charset=UTF-8");
    await expect(response.text()).resolves.toBe("");
  });
});

describe("GET /health", () => {
  it("returns deterministic uncached service health", async () => {
    const response = await app.request("/health");

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      service: "@newjersey/hono-template",
    });
  });
});

describe("unmatched routes", () => {
  it("return a JSON not-found response", async () => {
    const response = await app.request("/unsupported");

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
    await expect(response.json()).resolves.toEqual({
      status: "not_found",
    });
  });
});
