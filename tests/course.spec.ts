import { expect } from '@playwright/test';
import { courseItemsName } from '../pages/course.page';
import { MockApiUrls } from '../supports/mockUrls';
import { test } from '../supports/pageObject.fixtures';


test.describe('First block', () => {
	test('Цикл по courseItems.header', async ({ page, coursePage }) => {
		await page.route(MockApiUrls.courseURL, route => {
			route.fulfill({
				path: "./fixtures/course.json"
			});
		});
		await page.goto('https://coding.pasv.us/course')
		await page.waitForSelector('.align-items-stretch .border-bottom a')


		const elements = await page.locator('.align-items-stretch .border-bottom a').elementHandles()
		for (let i = 0; i < elements.length; i++) {
			// const element = elements[i];
			let text = await elements[i].innerText();
			let assertText = courseItemsName[i].assertion
			await expect(text).toEqual(assertText)
		}

	});
});

test.describe('Forst block', () => {

	// Стандартное использование классов в тесте
	// let examplesPage;

	// test.beforeEach(async ({ page }) => {
	// 	examplesPage = new ExamplesPage(page);
	// });

	// В текущем же тесте мы инициализируем класс через фикстуры

	// Бранч 1

	// Бранч 3

	test('Парсинг ответа метода server-prod.pasv.us/course', async ({ page, coursePage }) => {

		await page.route(MockApiUrls.courseURL, route => {
			route.fulfill({
				path: "./fixtures/course.json"
			});
		});

		const responsePromise = page.waitForResponse('**/server-prod.pasv.us/course');

		await page.goto('https://coding.pasv.us/course')
		await page.waitForSelector('.row.align-items-stretch .mb-2.pb-2.mb-2.border-bottom .col-md-3 a')

		const response = await responsePromise;
		const data = await response.json();

		coursePage.assertResponseAndLocatorsText(data, coursePage.courseListItems)
	});
});
