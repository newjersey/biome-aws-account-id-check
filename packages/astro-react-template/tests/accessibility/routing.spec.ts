/**
 * Verifies production server routing and endpoint behavior.
 */

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

test("redirects the prefixed default locale to its canonical route", async ({ page }) => {
  await page.goto("/en-US");

  await expect.poll(() => new URL(page.url()).pathname).toBe("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
});

test("renders an accessible server not-found view", async ({ page }) => {
  const response = await page.goto("/unsupported");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
});

test("serves the production health contract", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(response.headers()["content-type"]).toBe("application/json; charset=utf-8");
  await expect(response.json()).resolves.toEqual({
    status: "ok",
    service: "@newjersey/astro-react-template",
  });
});

test("serves generated Grove assets from the adapter artifact", async ({ request }) => {
  const response = await request.get("/assets/grove/dist/css/styles.css");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("text/css");
});
