import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {
    
  }

  async go() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
        
  async shouldBeOnInventory() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async shouldShowError(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }
}
