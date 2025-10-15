import { expect, Locator, Page } from '@playwright/test';

interface CourseItems {
	courseName: string;
	assertion: string;
}

export const courseItemsName: CourseItems[] = [
	{
		"courseName": "JavaScript Practice",
		"assertion": "JavaScript Practice",
	},
	{
		"courseName": "React JS",
		"assertion": "React JS",
	},
	{
		"courseName": "Express JS",
		"assertion": "Express JS",
	},
	{
		"courseName": "HTML, CSS Syntax",
		"assertion": "HTML, CSS Syntax",
	},
	{
		"courseName": "Git and GitHub",
		"assertion": "Git and GitHub",
	},
	{
		"courseName": "TypeScript",
		"assertion": "TypeScript",
	},
	{
		"courseName": "JS2 Module",
		"assertion": "JS2 Module",
	},
	{
		"courseName": "SQL",
		"assertion": "SQL",
	}
]


export class CoursePage {

	constructor(public page: Page) { }

	get courseListItems() {
		return this.page.locator('.align-items-stretch .border-bottom a');
	}

	async assertResponseAndLocatorsText(response: { payload: any[]; }, locator: Locator) {
		const value = response.payload.filter(item => item.accessType === 'all').map(item => ({ name: item.name }));
		const itemHeaders = await locator.elementHandles();
		for (let i = 0; i < itemHeaders.length; i++) {
			let text = await itemHeaders[i].innerText();
			let assertText = value[i].name;
			console.log(`text - ${text}`)
			console.log(`assertText - ${assertText}`)
			await expect(text).toEqual(assertText);
		}
	}
}