import { expect, Page } from '@playwright/test';

export class InterviewPage {

	constructor(public page: Page) {
		this.page = page;
	}

	// get courseListItems() {
	// 	return this.page.locator('.row.align-items-stretch .mb-2.pb-2.mb-2.border-bottom .col-md-3 a');
	// }

	// async assertResponseAndLocatorsText(response, locator) {
	// 	const value = response.payload.filter(item => item.accessType === 'all').map(item => ({ name: item.name }))
	// 	const itemHeaders = await locator.elementHandles()
	// 	for (let i = 0; i < itemHeaders.length; i++) {
	// 		let text = await itemHeaders[i].innerText();
	// 		let assertText = value[i].name
	// 		console.log(`${text} - ${assertText}`)
	// 		await expect(text).toEqual(assertText)
	// 	}

	// }

}