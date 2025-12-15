import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  reporter: [["html", { outputFolder: "playwright-report" }]],
  use: {
    headless: true,
    screenshot: "on",
    video: "on",
    baseURL: "https://demoqa.com/books",
    viewport: { width: 1440, height: 900 },
  },
});
