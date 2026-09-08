import { defineConfig, devices } from "@playwright/test";

/**
 * Whether the tests are running in continuous integration.
 */
// biome-ignore lint/style/noProcessEnv: Playwright configuration is a process boundary.
const IS_CONTINUOUS_INTEGRATION = process.env.CI === "true";
// biome-ignore lint/style/noProcessEnv: Playwright configuration is a process boundary.
const PLAYWRIGHT_PORT = process.env.PLAYWRIGHT_PORT ?? "3000";
const BASE_URL = `http://127.0.0.1:${PLAYWRIGHT_PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: IS_CONTINUOUS_INTEGRATION,
  retries: IS_CONTINUOUS_INTEGRATION ? 2 : 0,
  reporter: IS_CONTINUOUS_INTEGRATION ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "tablet-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `pnpm exec vite build --outDir dist-playwright && pnpm exec vite preview --outDir dist-playwright --host 127.0.0.1 --port ${PLAYWRIGHT_PORT} --strictPort`,
    env: {
      VITE_FEEDBACK_WIDGET_CONTACT_URL: "https://www.nj.gov/nj/feedback.html",
      VITE_FEEDBACK_WIDGET_ENABLED: "true",
      VITE_FEEDBACK_WIDGET_ONLY_SAVE_RATING_TO_ANALYTICS: "true",
      VITE_FEEDBACK_WIDGET_SHOW_COMMENT_DISCLAIMER: "true",
      VITE_FEEDBACK_WIDGET_SKIP_EMAIL_STEP: "true",
    },
    reuseExistingServer: false,
    url: BASE_URL,
  },
});
