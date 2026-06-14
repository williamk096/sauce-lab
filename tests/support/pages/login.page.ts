import { expect, Page } from '@playwright/test';

export class LoginPage {
  /**
   * Inicializa o page object de login com a página ativa do Playwright.
   */
  constructor(private readonly page: Page) {
    
  }

  /**
   * Acessa a página inicial do SauceDemo.
   */
  async go() {
    await this.page.goto('/');
  }

  /**
   * Preenche usuário/senha e envia o formulário de login.
   */
  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
        
  /**
   * Valida redirecionamento para inventário após login com sucesso.
   */
  async shouldBeOnInventory() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  /**
   * Valida a mensagem de erro exibida no login.
   */
  async shouldShowError(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}
