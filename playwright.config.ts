import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './src/config/env';

export default defineConfig({
	globalSetup: require.resolve('./global-setup'),
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// Отключить параллельные тесты на CI.
	workers: process.env.CI ? 1 : undefined,
	reporter: [["line"], ["allure-playwright"]],
	use: {
		storageState: 'state.json',
		baseURL: envConfig.BASE_URL,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		}
	],
});
