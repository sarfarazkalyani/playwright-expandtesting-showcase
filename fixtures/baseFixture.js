import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect };
