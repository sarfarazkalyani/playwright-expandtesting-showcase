import { test, expect } from '../fixtures/baseFixture.js';

test.describe('ExpandTesting - Network Interception & Mocking Suite', () => {
  test('Network Interception: Intercept Notes API to simulate a 500 error handles smoothly', async ({ page }) => {
    await page.route('**/api/notes**', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Testing Server Failure' }),
      });
    });

    await page.goto('/notes-app');
    
    const errorBanner = page.locator('[data-testid="alert-message"], .alert-danger');
    await expect(errorBanner).toBeVisible();
  });
});
