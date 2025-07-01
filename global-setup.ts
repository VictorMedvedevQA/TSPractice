import { chromium, expect } from '@playwright/test';

async function globalSetup(config) {
	const { baseURL, storageState } = config.projects[0].use;
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto('https://coding.pasv.us/user/login');
	await page.locator('#normal_login_email').fill('medvedevvictormsc@gmail.com');
	await page.locator('#normal_login_password').fill('cqhLuUczz2VQXcd');
	await page.locator('.login-form-button').click();
	await page.waitForSelector('.navbar-nav')
	await page.context().storageState({ path: storageState });
	await browser.close();
}

module.exports = globalSetup;
