import { test as base } from '@playwright/test';
import { CoursePage } from '../pages/course.page';
import { InterviewPage } from '../pages/interview.page';

export const test = base.extend<{
	coursePage: CoursePage;
	interviewPage: InterviewPage;
}>({
	coursePage: async ({ page }, use) => {
		await use(new CoursePage(page));
	},
	interviewPage: async ({ page }, use) => {
		await use(new InterviewPage(page));
	},
});
