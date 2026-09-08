import "@testing-library/jest-dom/vitest";
import "@/i18n/config";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});
