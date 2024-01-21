import {defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env?.['CI'],
  retries: 0,
  workers: 1,
  timeout: 1000 * 60 * 5,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    video: {
      mode: "on",
      size: {
        width: 1280,
        height: 720
      }
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    // {
    //   name: 'firefox',
    //   use: {...devices['Desktop Firefox']},
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {...devices['iPhone 12']},
    // },
  ],
});
