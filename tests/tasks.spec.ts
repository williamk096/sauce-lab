import { test } from '@playwright/test';
import { LoginPage } from './support/pages/login.page';
import { CheckoutPage } from './support/pages/checkout.page';

test.describe('SauceDemo Tasks', () => {
  test('deve localizar Sauce Labs Backpack e finalizar a compra', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.go();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.shouldBeOnInventory();

    await checkoutPage.ensureProductIsVisible('Sauce Labs Backpack');
    await checkoutPage.addBackpackToCart();
    await checkoutPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInformation('QA', 'Senior', '12345');
    await checkoutPage.shouldContainProductInOverview('Sauce Labs Backpack');
    await checkoutPage.finishCheckout();
    await checkoutPage.shouldShowCheckoutComplete();
  });
});
