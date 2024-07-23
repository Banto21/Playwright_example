import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const isCI = !!process.env.CI;
// export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  globalSetup: require.resolve('./tests/global-setup.ts'),

  timeout: 1000 * 60,
  workers: isCI ? 1 : '50%',
  retries: isCI ? 2 : 0,
  forbidOnly: isCI,

  outputDir: '.test/spec/output',
  snapshotPathTemplate: '.test/spec/snaps/{projectName}/{testFilePath}/{arg}{ext}',
  testMatch: '*.spec.{ts,tsx}',

  testDir: './tests',
  
  fullyParallel: true,

  reporter: [
    ['html', {
      outputFolder: '.test/spec/results', 
      open: 'never',
    }],
    isCI ? ['github'] : ['line'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // video: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    storageState: 'state.json',
    baseURL: process.env.BASE_URL
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /global.setup\.ts/
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
