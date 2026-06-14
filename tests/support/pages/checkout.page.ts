import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  /**
   * Inicializa o page object de inventário/carrinho/checkout.
   */
  constructor(private readonly page: Page) {}

  /**
   * Confirma que o produto esperado está visível na listagem.
   */
  async ensureProductIsVisible(productName: string) {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  /**
   * Adiciona o Sauce Labs Backpack ao carrinho e valida o badge.
   */
  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  }

  /**
   * Abre o carrinho e valida a URL da página.
   */
  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  /**
   * Inicia o checkout a partir do carrinho.
   */
  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  /**
   * Preenche os dados obrigatórios do checkout e avança para o overview.
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  /**
   * Confirma que o produto permanece no resumo final da compra.
   */
  async shouldContainProductInOverview(productName: string) {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  /**
   * Finaliza a compra no overview.
   */
  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  /**
   * Valida a conclusão do pedido e a mensagem de sucesso.
   */
  async shouldShowCheckoutComplete() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}