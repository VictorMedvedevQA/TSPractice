import { expect } from '@playwright/test';
import { courseItemsName } from '../../common/pages/course.page.ts';
import { MockApiUrls } from '../../common/apiRoutes/mockUrls.ts';
import { test } from '../../common/helpers/pageObject.fixtures.ts';
import { courseMock } from '../../common/mocks/course.ts';


test.describe('First block', () => {
	test('Цикл по courseItems.header', async ({ page }) => {
		await page.route(MockApiUrls.courseURL, async route => {
			route.fulfill({ json: courseMock });
		});
		await page.goto('https://coding.pasv.us/course')
		await page.waitForSelector('.align-items-stretch .border-bottom a')

		const elements = await page.locator('.align-items-stretch .border-bottom a').elementHandles();

		for (let i = 0; i < courseItemsName.length; i++) {
			let text = await elements[i].innerText();
			let assertText = courseItemsName[i].assertion;
			console.log(`text - ${text}`)
			console.log(`assertText - ${assertText}`)
			await expect(text).toEqual(assertText);
		}

	});

	test('Парсинг ответа метода server-prod.pasv.us/course', async ({ page, coursePage }) => {

		await page.route(MockApiUrls.courseURL, async route => {
			route.fulfill({ json: courseMock });
		});

		const responsePromise = page.waitForResponse('**/server-prod.pasv.us/course');

		await page.goto('https://coding.pasv.us/course')
		await page.waitForSelector('.row.align-items-stretch .mb-2.pb-2.mb-2.border-bottom .col-md-3 a')
		const response = await responsePromise;
		const data = await response.json();

		coursePage.assertResponseAndLocatorsText(data, coursePage.courseListItems)
	});
});
