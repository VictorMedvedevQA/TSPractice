import { expect } from '@playwright/test';
import { courseItemsName } from '@/common/pages/course.page.js';
import { MockApiUrls } from '@/common/apiRoutes/mockUrls.js';
import { test } from '@/common/helpers/pageObject.fixtures';
import { doGETRequest, doPOSTRequest } from '@/common/helpers/request-helper'; 
import * as dateFns from "date-fns";

test('Тест 1', async ({ request }) => {
	const startDate = dateFns.startOfISOWeek(dateFns.addWeeks(new Date(), 0));
	const startDate1 = dateFns.format(startDate, 'yyyy-MM-dd');

	console.log(startDate)
	let payload = {
		title: 'Book Title',
		author: 'John Doe',
	}
	// например, нужно проверить получение книг
	const res = await request.fetch('https://example.com/api/getBooks', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(payload)
	});

	const body = await res.json()

	expect(body).toHaveProperty('isAlive');
	expect(res.status).toBe(200)
})

//вызов doGETRequest для отправки запроса в тесте

test('Пример вызова doGETRequest', async ({ request }) => {

	// например, нужно проверить получение книг
	const response = await doGETRequest(
		request,
		'api/getBooks',
		undefined,
		{
			"line": "1234",
			"line2": "1 3",
			"line3": "14",
		},
		{
			'header1': 'value',
			'header2': 'value2',
		}
	)

	//console.log(await response.body)

	expect(response.status).toBe(200)
	expect(await response.body.items.length).toBeGreaterThan(0)
	// expect(response.body).toMatchObject(BOOKS_STRUCTURE);
})

test('Пример вызова doPOSTRequest', async ({ request }) => {

	// например, нужно проверить получение книг
	const response = await doPOSTRequest(
		request,
		'api/getBooks',
		undefined,
		{
			"line": "1234",
			"line2": "1 3",
			"line3": "14",
		},
		{
			'header1': 'value',
			'header2': 'value2',
		}
	)

	//console.log(await response.body)

	expect(response.status).toBe(200)
	expect(await response.body.items.length).toBeGreaterThan(0)
	// expect(response.body).toMatchObject(BOOKS_STRUCTURE);
})
