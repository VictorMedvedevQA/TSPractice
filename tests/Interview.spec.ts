import { expect } from '@playwright/test';
import { courseItemsName } from '../pages/course.page';
import { MockApiUrls } from '../supports/mockUrls';
import { test } from '../supports/pageObject.fixtures'


test.describe('First block', () => {

	test('Парсинг ответа метода server-prod.pasv.us/course', async ({ page, coursePage }) => {

		const responsePromise = page.waitForResponse(MockApiUrls.courseURL);
		await page.route(MockApiUrls.courseURL, route => {
			route.fulfill({
				path: "./fixtures/course.json"
			});
		});

		await page.goto('https://coding.pasv.us/course')

		const response = await responsePromise;
		const data = await response.json();

		coursePage.assertResponseAndLocatorsText(data, coursePage.courseListItems)
	});
});
