import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('Global Authentication Setup for ExpandTesting Secure Pages', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded' }); 
  await page.locator('#username').fill('practice');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('button[type="submit"]').click();

  const flashAlert = page.locator('#flash');
  await expect(flashAlert).toContainText('You logged into a secure area!');

  await page.context().storageState({ path: authFile });
});
