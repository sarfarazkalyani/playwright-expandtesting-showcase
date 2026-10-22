import { test, expect } from '../fixtures/baseFixture.js';
import invalidLoginData from '../data/invalidLoginData.json' assert { type: 'json' };

// Force this test file to start fresh without the global authenticated session cookies
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('ExpandTesting - Data-Driven Authentication Validation', () => {
  for (const data of invalidLoginData) {
    test(`Should reject login for user payload: ${data.username}`, async ({ loginPage }) => {
      await loginPage.navigateTo('/login');
      await loginPage.login(data.username, data.password);
      
      const errorText = await loginPage.getAlertMessage();
      expect(errorText).toContain(data.expectedError);
    });
  }
});
