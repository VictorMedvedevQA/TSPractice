import { test as setup, expect, Page } from '@playwright/test';

async function loginAndSave(
	page: Page,
	email: string,
	password: string,
	jsonPath: string
) {

	// Авторизация
	await page.goto('https://coding.pasv.us/user/login');
	await page.locator('#normal_login_email').fill('medvedevvictormsc@gmail.com');
	await page.locator('#normal_login_password').fill('cqhLuUczz2VQXcd');
	await page.locator('.login-form-button').click();
	await expect(page).toHaveURL("")

	// Сохраняем storage state для каждой роли в отдельный файл
	await page.context().storageState({ path: jsonPath })
	await page.context().close()
};

setup('customer 1', async ({ page }) => {
	loginAndSave(
		page,
		USER_CREDENTIALS.firstCustomer.email,
		USER_CREDENTIALS.firstCustomer.password
	)
});


setup('proffessional 1', async ({ page }) => {
	loginAndSave(
		page,
		USER_CREDENTIALS.firstProffi.email,
		USER_CREDENTIALS.firstProffi.password
	)
});

setup('admin', async ({ page }) => {
	loginAndSave(
		page,
		USER_CREDENTIALS.admin.email,
		USER_CREDENTIALS.admin.password
	)
});