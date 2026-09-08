import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

interface CenterOffset {
  readonly horizontal: number;
  readonly vertical: number;
}

const centerOffsetFor = async (locator: Locator): Promise<CenterOffset> => {
  const bounds = await locator.boundingBox();

  if (!bounds) {
    throw new Error("Expected the homepage heading to have rendered bounds.");
  }

  const viewport = locator.page().viewportSize();

  if (!viewport) {
    throw new Error("Expected the browser project to define a viewport.");
  }

  return {
    horizontal: Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2),
    vertical: Math.abs(bounds.y + bounds.height / 2 - viewport.height / 2),
  };
};

test("renders an accessible centered homepage in light mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Hello, New Jersey.");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
  const heading = page.getByRole("heading", {
    level: 1,
    name: "Hello, New Jersey.",
  });
  await expect(heading).toBeVisible();

  const offset = await centerOffsetFor(heading);
  expect(offset.horizontal).toBeLessThanOrEqual(1);
  expect(offset.vertical).toBeLessThanOrEqual(1);
  await expect(page.locator("body")).toHaveCSS("color", "rgb(17, 47, 78)");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
});

test("uses the requested dark color scheme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("body")).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(17, 47, 78)");
});

test("serves the production health contract", async ({ request }) => {
  const response = await request.get("/health");

  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(response.headers()["content-type"]).toBe("application/json; charset=utf-8");
  await expect(response.json()).resolves.toEqual({
    status: "ok",
    service: "@newjersey/fastapi-template",
  });
});
