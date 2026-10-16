// Page Object Model (Playwright) - practicetestautomation
import { expect } from '@playwright/test';
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.getByRole('button', { name: 'Submit' });
    this.error = page.locator('#error');
  }
  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }
  async login(u, p) {
    await this.username.fill(u);
    await this.password.fill(p);
    await this.submit.click();
  }
  async expectSuccess() {
    await expect(this.page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
  }
  async expectError(text) {
    await expect(this.error).toHaveText(text);
  }
}
