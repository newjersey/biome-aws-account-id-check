import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const pages = [
  { name: "home", path: "/en-US" },
  { name: "about", path: "/en-US/about" },
  { name: "not found", path: "/en-US/does-not-exist" },
];

for (const { name, path } of pages) {
  test(`${name} page passes automated accessibility checks`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });
}
