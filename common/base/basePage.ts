import { expect, Locator, Page } from '@playwright/test';

export class Base {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Проверка, что элемент виден
	 */
	async elementVisibility(target: Locator) {
		await expect(target).toBeVisible();
	}

	/**
	 * Сравнение фактического и ожидаемого скриншота
	 */

	async areScreenshotsMatch(
		target: Locator | Page,
		name?: string,
		increasedDiff = 1,
		options: Record<string, unknown> = {}
	) {
		const diffPixels = 100 * increasedDiff;
		await expect.soft(target).toHaveScreenshot(name ?? '', {
			maxDiffPixels: diffPixels,
			...options,
		});
	}
}