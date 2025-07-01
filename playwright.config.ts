import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

const envName = process.env.ENV;
dotenvConfig({ path: resolve(__dirname, `.env.${envName}`), override: true });

export default defineConfig({
	globalSetup: require.resolve('./global-setup'),

	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [["line"], ["allure-playwright"]],
	use: {
		storageState: 'state.json',
		trace: 'on-first-retry',
		baseURL: `${process.env.BASE_URL}`,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		}
	],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
