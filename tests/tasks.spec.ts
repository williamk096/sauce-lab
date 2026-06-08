import { test } from '@playwright/test';
import { LoginPage } from './support/pages/login.page';

test.describe('SauceDemo Login', () => {
  test('deve logar com usuario valido', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.go();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.shouldBeOnInventory();
  });

  test('deve bloquear usuario locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.go();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.shouldShowError('Sorry, this user has been locked out.');
  });
  

});
